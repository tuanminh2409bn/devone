'use client';

import { createContext, useContext, useState, useSyncExternalStore, type ReactNode } from 'react';
import { MotionConfig } from 'motion/react';
import { Icon } from './icon';

const MotionPreference = createContext({ paused: false, reduced: false });
export const useMotionPreference = () => useContext(MotionPreference);

function subscribeVisibility(callback: () => void) {
  document.addEventListener('visibilitychange', callback);
  return () => document.removeEventListener('visibilitychange', callback);
}

function subscribeReducedMotion(callback: () => void) {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}

export function MotionControls({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  );
  const hidden = useSyncExternalStore(
    subscribeVisibility,
    () => document.hidden,
    () => false,
  );
  const stopped = paused || reduced;
  return (
    <MotionPreference.Provider value={{ paused, reduced }}>
      <MotionConfig reducedMotion={stopped ? 'always' : 'user'}>
        <div className="motion-root" data-motion={stopped || hidden ? 'paused' : 'running'}>
          {children}
          <button
            className="page-motion-toggle"
            type="button"
            aria-pressed={stopped}
            aria-label={
              reduced
                ? 'Đang giảm chuyển động theo thiết bị'
                : paused
                  ? 'Bật chuyển động toàn trang'
                  : 'Tạm dừng chuyển động toàn trang'
            }
            disabled={reduced}
            onClick={() => setPaused(!paused)}
          >
            <Icon name={stopped ? 'play' : 'pause'} />
            <span>
              {reduced ? 'Giảm chuyển động' : paused ? 'Bật chuyển động' : 'Tạm dừng chuyển động'}
            </span>
          </button>
        </div>
      </MotionConfig>
    </MotionPreference.Provider>
  );
}
