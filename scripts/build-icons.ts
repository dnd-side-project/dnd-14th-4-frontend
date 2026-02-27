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
    // 기존 아이콘 파일명 규칙: 구분자 없이 소문자 연속 (예: arrow_right_small.svg -> ic_arrowrightsmall.tsx)
    .join("");
  return `ic_${snakeName}.tsx`;
}

async function exists(p: string) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

function runSvgr(sourceSvgPath: string) {
  const cmd = [
    "pnpm",
    "exec",
    "svgr",
    `"${sourceSvgPath}"`,
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
}

async function getExportedComponentName(iconPath: string) {
  const content = await fs.readFile(iconPath, "utf8");
  const match = content.match(/export default ([A-Za-z0-9_]+);/);
  return match?.[1] ?? null;
}

async function main() {
  try {
    // 입력/출력 폴더 보장
    await fs.mkdir(SVG_SRC_DIR, { recursive: true });
    await fs.mkdir(ICONS_DIR, { recursive: true });

    const svgFiles = (await fs.readdir(SVG_SRC_DIR))
      .filter((file) => file.endsWith(".svg"))
      .sort((a, b) => a.localeCompare(b));

    let createdCount = 0;
    let skippedCount = 0;

    for (const svgFile of svgFiles) {
      const sourceSvgPath = path.join(SVG_SRC_DIR, svgFile);
      const outputFileName = toSnakeCaseFileName(svgFile);
      const outputIconPath = path.join(ICONS_DIR, outputFileName);

      // 기존 아이콘은 유지하고 신규 SVG만 생성
      if (await exists(outputIconPath)) {
        skippedCount += 1;
        continue;
      }

      runSvgr(sourceSvgPath);

      // svgr은 기본적으로 PascalCase 파일명으로 생성됨 (예: add_big.svg -> AddBig.tsx)
      const svgrOutputName = `${toPascalCase(svgFile).replace(/^IcSvg/, "")}.tsx`;
      const svgrOutputPath = path.join(ICONS_DIR, svgrOutputName);
      const componentName = toPascalCase(svgFile);

      if (!(await exists(svgrOutputPath))) {
        throw new Error(`[icons] 생성 결과를 찾을 수 없음: ${svgrOutputName}`);
      }

      await fs.rename(svgrOutputPath, outputIconPath);

      let content = await fs.readFile(outputIconPath, "utf8");

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

      await fs.writeFile(outputIconPath, content, "utf8");
      createdCount += 1;
    }

    // index.ts는 현재 아이콘 파일 전체를 기준으로 재생성
    const iconFiles = (await fs.readdir(ICONS_DIR))
      .filter((file) => file.endsWith(".tsx"))
      .sort((a, b) => a.localeCompare(b));

    const exportSet = new Set<string>();
    const exportLines: string[] = [
      "// (auto-generated) Do not edit manually.",
      "// Run `pnpm icons` to regenerate.\n",
    ];

    for (const iconFile of iconFiles) {
      const iconPath = path.join(ICONS_DIR, iconFile);
      const componentName = await getExportedComponentName(iconPath);

      if (!componentName) {
        throw new Error(`[icons] export default를 찾을 수 없음: ${iconFile}`);
      }

      const exportLine = `export { default as ${componentName} } from './${iconFile.replace(
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

    console.log(
      `[icons] 완료: 신규 ${createdCount}개 추가, 기존 ${skippedCount}개 유지`,
    );
  } catch (error) {
    console.error("An error occurred during icon build process:", error);
    process.exit(1);
  }
}

main();
