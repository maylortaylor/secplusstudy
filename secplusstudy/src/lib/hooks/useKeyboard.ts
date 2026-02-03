'use client';

import { useEffect, useCallback } from 'react';

export interface KeyboardHandlers {
  onSpace?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onArrowUp?: () => void;
  onEscape?: () => void;
  onR?: () => void;
}

export function useKeyboard(handlers: KeyboardHandlers, enabled: boolean = true) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      switch (event.key) {
        case ' ':
          event.preventDefault();
          handlers.onSpace?.();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          handlers.onArrowLeft?.();
          break;
        case 'ArrowRight':
          event.preventDefault();
          handlers.onArrowRight?.();
          break;
        case 'ArrowUp':
          event.preventDefault();
          handlers.onArrowUp?.();
          break;
        case 'Escape':
          event.preventDefault();
          handlers.onEscape?.();
          break;
        case 'r':
        case 'R':
          if (!event.metaKey && !event.ctrlKey) {
            event.preventDefault();
            handlers.onR?.();
          }
          break;
      }
    },
    [handlers, enabled]
  );

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, enabled]);
}
