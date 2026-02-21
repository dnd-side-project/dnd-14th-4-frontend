"use client";

import { motion, type Transition } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import type { Rect } from "./constants";
import type { ForwardOverlay, ReturnOverlay } from "./useSearchBarTransition";

type TransitionConfig = { duration: number; ease: readonly number[] };

type Props = {
  /** 홈 → 검색: 바가 아래에서 위로 이동 */
  forward?: ForwardOverlay | null;
  /** 검색 → 홈: 바가 위에서 아래로 이동 */
  return?: ReturnOverlay | null;
  config: TransitionConfig;
};

const barContent = (
  <>
    <FiSearch className="h-5 w-5 shrink-0 text-neutral-400" />
    <span className="text-sm text-neutral-400">다양한 팩을 검색해보세요.</span>
  </>
);

function BarShape({
  initial,
  animate,
  transition,
  onAnimationComplete,
  children,
}: {
  initial: Rect;
  animate: Rect;
  transition: TransitionConfig;
  onAnimationComplete?: () => void;
  children: React.ReactNode;
}) {
  const motionTransition: Transition = {
    duration: transition.duration,
    ease: [...transition.ease] as [number, number, number, number],
  };
  return (
    <motion.div
      className="absolute rounded-xl bg-neutral-100"
      initial={initial}
      animate={animate}
      transition={motionTransition}
      onAnimationComplete={onAnimationComplete}
    >
      <div className="flex h-full items-center gap-2 px-3">{children}</div>
    </motion.div>
  );
}

export function SearchBarOverlay({ forward, return: returnOverlay, config }: Props) {
  return (
    <>
      {forward && (
        <motion.div
          className="fixed inset-0 z-[100] bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.05 }}
          aria-hidden
        >
          <BarShape
            initial={forward.barRect}
            animate={forward.targetStyle}
            transition={config}
            onAnimationComplete={forward.onComplete}
          >
            {barContent}
          </BarShape>
        </motion.div>
      )}

      {returnOverlay && (
        <motion.div
          className="fixed inset-0 z-[100] bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.05 }}
          aria-hidden
        >
          <BarShape
            initial={returnOverlay.initialStyle}
            animate={returnOverlay.targetRect}
            transition={config}
            onAnimationComplete={returnOverlay.onComplete}
          >
            {barContent}
          </BarShape>
        </motion.div>
      )}
    </>
  );
}
