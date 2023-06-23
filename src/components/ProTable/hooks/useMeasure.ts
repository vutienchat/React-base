import type { RefObject } from 'react';
import { useLayoutEffect, useMemo, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

interface UseMeasureRect {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
}

const useMeasure = (ref: RefObject<HTMLDivElement>) => {
  const [rect, setRect] = useState<UseMeasureRect>({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  const observer = useMemo(
    () =>
      new ResizeObserver((entries) => {
        if (entries[0]) {
          const { x, y, width, height, top, left, bottom, right } =
            entries[0].contentRect;
          setRect({ x, y, width, height, top, left, bottom, right });
        }
      }),
    []
  );

  useLayoutEffect(() => {
    if (!ref.current) return;
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return rect;
};

export default useMeasure;
