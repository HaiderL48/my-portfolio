import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;
const listeners = new Set<() => void>();

export function registerLenis(lenis: Lenis) {
  lenisInstance = lenis;
  lenis.on("scroll", () => {
    listeners.forEach((fn) => fn());
  });
  listeners.forEach((fn) => fn());
}

export function unregisterLenis() {
  lenisInstance = null;
  listeners.clear();
}

/** Scroll position — works with Lenis and native scroll. */
export function getScrollTop() {
  if (lenisInstance) {
    return lenisInstance.scroll;
  }
  return window.scrollY;
}

export function subscribeScroll(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
