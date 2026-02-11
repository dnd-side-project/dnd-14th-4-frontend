import { execFileSync } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";

const SVG_SRC_DIR = path.resolve("src/assets/svg");
const ICONS_DIR = path.resolve("src/shared/icons");
const OUT_FILE = path.join(ICONS_DIR, "index.ts");

function toPascalCase(name: string): string {
  const pascalName = name
    .replace(/\.[^.]+$/, "")
    .split(/[^a-zA-Z0-9]/)
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
  return `IcSvg${pascalName}`;
}

function toSnakeCaseFileName(name: string): string {
  const snakeName = name
    .replace(/\.[^.]+$/, "")
    .split(/[^a-zA-Z0-9]/)
    .filter(Boolean)
    .map((s) => s.toLowerCase())
    .join("_");
  return `ic_${snakeName}.tsx`;
}

async function cleanIconsDir() {
  await fs.mkdir(ICONS_DIR, { recursive: true });
  const files = await fs.readdir(ICONS_DIR);
  await Promise.all(
    files
      // 이전 생성물 정리: ic_*.tsx, *.tsx, index.ts 모두 제거
      .filter((f) => f === "index.ts" || f.endsWith(".tsx"))
      .map((f) => fs.rm(path.join(ICONS_DIR, f))),
  );
}

async function exists(p: string) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  try {
    // 입력/출력 폴더 보장
    await fs.mkdir(SVG_SRC_DIR, { recursive: true });
    await fs.mkdir(ICONS_DIR, { recursive: true });

    // 0) 지난 생성물 제거 → 중복 방지의 핵심
    await cleanIconsDir();

    // Windows에서 pnpm.cmd/svgr.cmd spawn EINVAL 이슈 회피:
    //    문자열 커맨드 + shell 실행으로 안정화
    const cmd = [
      "pnpm",
      "exec",
      "svgr",
      `"${SVG_SRC_DIR}"`,
      "--out-dir",
      `"${ICONS_DIR}"`,
      "--ext",
      "tsx",
      "--typescript",
      "--no-dimensions",
      "--icon",
      "--no-index",
      "--jsx-runtime",
      "automatic",
    ].join(" ");

    execFileSync(cmd, {
      stdio: "inherit",
      shell: true,
      windowsHide: true,
    });

    // 생성된(이번에 svgr가 만든) 파일만 읽기
    const generatedFiles = (await fs.readdir(ICONS_DIR)).filter(
      (f) => f.endsWith(".tsx") && !f.startsWith("index"),
    );

    // output deterministic
    generatedFiles.sort((a, b) => a.localeCompare(b));

    // export 중복 방지 세트
    const exportSet = new Set<string>();
    const exportLines: string[] = [
      "// (auto-generated) Do not edit manually.",
      "// Run `pnpm icons` to regenerate.\n",
    ];

    for (const file of generatedFiles) {
      const oldPath = path.join(ICONS_DIR, file);

      const newFileName = toSnakeCaseFileName(file);
      const newPath = path.join(ICONS_DIR, newFileName);
      const componentName = toPascalCase(file);

      //  rename 충돌 감지
      if (await exists(newPath)) {
        throw new Error(
          `[icons] 파일명 충돌: ${file} -> ${newFileName} (이미 존재)`,
        );
      }

      await fs.rename(oldPath, newPath);

      let content = await fs.readFile(newPath, "utf8");

      // stroke 색상은 currentColor로 통일
      content = content.replace(
        /(stroke)=['"]([^'"]+)['"]/g,
        (_m, p1) => `${p1}="currentColor"`,
      );

      // automatic runtime이면 React import 제거 가능
      content = content.replace(/^import \* as React from 'react';\r?\n/m, "");

      // 컴포넌트명 교체
      content = content.replace(/const Svg[^ ]+ =/, `const ${componentName} =`);
      content = content.replace(
        /export default Svg[^;]+;/,
        `export default ${componentName};`,
      );

      // SVGProps import 뒤에 한 줄 띄우기(가독성)
      const importMatch = content.match(
        /^(import type \{ SVGProps \} from 'react';\r?\n)/m,
      );
      if (importMatch && !content.startsWith(importMatch[0] + "\n")) {
        content = content.replace(importMatch[0], `${importMatch[0]}\n`);
      }

      await fs.writeFile(newPath, content);

      const exportLine = `export { default as ${componentName} } from './${newFileName.replace(
        ".tsx",
        "",
      )}';`;

      if (!exportSet.has(exportLine)) {
        exportSet.add(exportLine);
        exportLines.push(exportLine);
      }
    }

    exportLines.push("");
    await fs.writeFile(OUT_FILE, exportLines.join("\n"), "utf8");

    console.log(`[icons] 완료: ${exportSet.size}개 생성/갱신`);
  } catch (error) {
    console.error("An error occurred during icon build process:", error);
    process.exit(1);
  }
}

main();
