// "use client";

// import * as React from "react";
// import { cn } from "@/shared/lib/cn";
// import { ProgressBar } from "./components/ProgressBar";

// type RootProps = {
//   children: React.ReactNode;
//   className?: string;
// };

// function Root({ children, className }: RootProps) {
//   return (
//     <main className={cn("min-h-dvh bg-white flex flex-col", className)}>
//       {children}
//     </main>
//   );
// }

// type HeaderProps = {
//   onBack?: () => void;
//   progress?: number;
//   title?: React.ReactNode;
//   description?: React.ReactNode;
//   className?: string;
// };

// function Header({
//   onBack,
//   progress,
//   title,
//   description,
//   className,
// }: HeaderProps) {
//   const showTopRow = !!onBack || typeof progress === "number";
//   const showText = !!title || !!description;

//   if (!showTopRow && !showText) return null;

//   return (
//     <header className={cn("px-5 pt-5", className)}>
//       {showTopRow && (
//         <div className="flex items-center gap-3">
//           {onBack && (
//             <button
//               type="button"
//               onClick={onBack}
//               className="p-2 -ml-2"
//               aria-label="뒤로가기"
//             >
//               ←
//             </button>
//           )}
//           {typeof progress === "number" && (
//             <div className="flex-1">
//               <ProgressBar value={progress} />
//             </div>
//           )}
//         </div>
//       )}

//       {showText && (
//         <div className={cn("space-y-2", showTopRow && "mt-6")}>
//           {title && <h1 className="text-xl font-bold leading-snug">{title}</h1>}
//           {description && (
//             <p className="text-sm text-neutral-500">{description}</p>
//           )}
//         </div>
//       )}
//     </header>
//   );
// }

// type ContentProps = {
//   children: React.ReactNode;
//   className?: string;
//   hasFooter?: boolean;
// };

// function Content({ children, className, hasFooter = true }: ContentProps) {
//   return (
//     <section
//       className={cn(
//         "flex-1 px-5 pt-8",
//         hasFooter ? "pb-28" : "pb-8",
//         className,
//       )}
//     >
//       {children}
//     </section>
//   );
// }

// type FooterProps = {
//   label: string;
//   disabled?: boolean;
//   onClick: () => void;
//   className?: string;
// };

// function Footer({ label, disabled, onClick, className }: FooterProps) {
//   return (
//     <footer className={cn("fixed inset-x-0 bottom-0 bg-white z-50", className)}>
//       <div className="max-w-mobile w-full mx-auto px-5 pt-3 pb-[calc(20px+env(safe-area-inset-bottom))]">
//         <button
//           type="button"
//           disabled={disabled}
//           onClick={onClick}
//           className={cn(
//             "h-12 w-full rounded-xl font-semibold",
//             disabled
//               ? "bg-neutral-95 text-label-subtle"
//               : "bg-black text-white",
//           )}
//         >
//           {label}
//         </button>
//       </div>
//     </footer>
//   );
// }

// export const OnboardingLayout = Object.assign(Root, {
//   Header,
//   Content,
//   Footer,
// });
