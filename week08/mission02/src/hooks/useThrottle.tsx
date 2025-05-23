import { useRef, useCallback } from "react";

export function useThrottle<
  T extends (...args: Parameters<T>) => ReturnType<T>
>(fn: T, delay: number): (...args: Parameters<T>) => ReturnType<T> | undefined {
  const lastCall = useRef(0);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCall.current > delay) {
        lastCall.current = now;
        return fn(...args);
      }
    },
    [fn, delay]
  );
}
