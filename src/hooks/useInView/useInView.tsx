import { useEffect } from "react";
import { createThreshold, UseInViewHook } from "@/hooks/useInView";

/**
 * Intersection Observer API wrapper hook.
 * Tracks the @observedRef viewport position.
 * @param observedRef
 * @param callback
 * @param init
 */
const useInView: UseInViewHook = (
  observedRef,
  callback,
  init = {},
) => {
  const { steps = 0, once = true, threshold, ...rest } = init;

  useEffect(() => {
    if (!("current" in observedRef) || !observedRef.current) {
      return null;
    }

    const observerInit = {
      threshold: threshold || createThreshold(steps),
      ...rest,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        callback(entry, observer);

        if (once && entry.isIntersecting) {
          observer.disconnect();
          return;
        }
      });
    }, observerInit);

    const target = observedRef.current as unknown as HTMLElement;
    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [observedRef, callback]);
};

export default useInView;
