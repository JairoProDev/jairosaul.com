import React, { memo, ComponentType } from 'react';

export function withMemo<T extends object>(
  Component: ComponentType<T>,
  propsAreEqual?: (prevProps: Readonly<T>, nextProps: Readonly<T>) => boolean
) {
  return memo(Component, propsAreEqual);
}

export function withOptimization<T extends object>(
  Component: ComponentType<T>,
  options: {
    propsAreEqual?: (prevProps: Readonly<T>, nextProps: Readonly<T>) => boolean;
    displayName?: string;
  } = {}
) {
  const MemoizedComponent = memo(Component, options.propsAreEqual);
  
  if (options.displayName) {
    MemoizedComponent.displayName = options.displayName;
  }
  
  return MemoizedComponent;
}

// Hook para optimizar re-renders
export function useOptimizedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  deps: React.DependencyList
): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback(callback, deps);
}

// Hook para optimizar valores computados
export function useOptimizedMemo<T>(
  factory: () => T,
  deps: React.DependencyList
): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useMemo(factory, deps);
}
