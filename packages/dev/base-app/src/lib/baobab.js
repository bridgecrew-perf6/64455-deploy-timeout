import { useState, useEffect } from 'react';
import Baobab from 'baobab';
import { useRoot } from 'baobab-react/hooks';
import defaults from './defaults';

const isDevelopment = process.env.NODE_ENV !== 'production';

export * from 'baobab-react/hooks';

export const tree = new Baobab(defaults, {
  immutable: isDevelopment // perf. improvement
});

export function useTree(fn) {
  if (typeof fn === 'function') fn(tree);
  return tree;
}

export function treeContext() {
  return useRoot(tree);
}
    
export function useCursor(path, fn) {
  if (typeof fn !== 'function') {
    if (arguments.length === 2 && !tree.exists(path)) {
      tree.set(path, fn);
    }
    fn = (tree, value) => [value, (v) => tree.set(path, v)];
  }

  const [state, setState] = useState((previousData) => {
    const cursor = tree.select(path);
    const currentData = cursor.get();
    const initial = typeof previousData === 'undefined';
    return fn(currentData, currentData, cursor, initial);
  });

  async function handler(e) {
    const { currentData, previousData } = e.data;
    const initial = typeof previousData === 'undefined';
    setState(await fn(currentData, previousData, e.target, initial));
  };

  useEffect(() => {
    const cursor = tree.select(path);
    cursor.on('update', handler);
    return () => cursor.off('update', handler);
  }, [path, fn]);

  return state;
}

export function useCursors(cursors, fn) {
  const [state, setState] = useState(() => {
    const mapping = typeof cursors === 'function' ? cursors(context) : cursors;
    return fn(tree.project(mapping), tree);
  });

  useEffect(() => {
    const mapping = typeof cursors === 'function' ? cursors(context) : cursors;
    const watcher = tree.watch(mapping);
    watcher.on('update', () => {
      setState(fn(tree.project(mapping), tree));
    });
    return () => watcher.release();
  }, [cursors, fn]);

  return state;
}
