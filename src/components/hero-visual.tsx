'use client';

import dynamic from 'next/dynamic';
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { Icon } from './icon';
import { useMotionPreference } from './motion-controls';

const CoreScene = dynamic(() => import('./core-scene'), { ssr: false, loading: () => null });
class SceneBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function StaticCore() {
  return (
    <div className="static-core" aria-hidden="true">
      <div className="static-orbit" />
      <div className="static-orbit second" />
      <div className="static-symbol">
        <span className="bracket left" />
        <span className="core-pixels">
          <i />
          <i />
          <i />
        </span>
        <span className="bracket right" />
      </div>
      <div className="core-floor" />
    </div>
  );
}

export function HeroVisual() {
  const { paused: pagePaused } = useMotionPreference();
  const host = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  const [backend, setBackend] = useState('poster');
  const [forceWebGL, setForceWebGL] = useState(false);
  const failure = useCallback(() => setFailed(true), []);
  const ready = useCallback((value: string) => setBackend(value), []);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const small = window.matchMedia('(max-width: 767px)');
    const params = new URLSearchParams(window.location.search);
    let visible = true;
    const update = () => {
      const allow = !reduced.matches && !small.matches && params.get('graphics') !== 'off';
      setForceWebGL(params.get('renderer') === 'webgl');
      setEnabled(allow);
      setRunning(allow && visible && !document.hidden);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        update();
      },
      { threshold: 0.05 },
    );
    if (host.current) observer.observe(host.current);
    const timer = setTimeout(update, 500);
    reduced.addEventListener('change', update);
    small.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
      reduced.removeEventListener('change', update);
      small.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);
  const showScene = enabled && !failed;
  return (
    <div className="hero-visual" ref={host} data-backend={showScene ? backend : 'poster'}>
      <div className="scene-ambient" />
      <div className="scene-grid" />
      <div className={`poster ${showScene && backend !== 'poster' ? 'poster-hidden' : ''}`}>
        <StaticCore />
      </div>
      {showScene && (
        <div className="scene-canvas" aria-hidden="true">
          <SceneBoundary onError={failure}>
            <CoreScene
              running={running && !paused && !pagePaused}
              forceWebGL={forceWebGL}
              onFailure={failure}
              onReady={ready}
            />
          </SceneBoundary>
        </div>
      )}
      <div className="scene-coordinate">DEV.ONE / CONNECTED SYSTEMS</div>
      <div className="scene-tag tag-web">
        <span className="tag-icon">
          <Icon name="web" />
        </span>
        <span>
          Web Development<small>Trải nghiệm khác biệt</small>
        </span>
        <i />
      </div>
      <div className="scene-tag tag-mobile">
        <span className="tag-icon">
          <Icon name="mobile" />
        </span>
        <span>
          Mobile Application<small>Kết nối mọi điểm chạm</small>
        </span>
      </div>
      <div className="scene-tag tag-erp">
        <span className="tag-icon">
          <Icon name="layers" />
        </span>
        <span>
          CRM & ERP<small>Vận hành thông minh</small>
        </span>
        <i />
      </div>
      <div className="scene-caption">
        <span className="status-dot" /> IDEAS. CODE. POSSIBILITIES.
      </div>
      {showScene && (
        <button
          className="motion-toggle"
          onClick={() => setPaused(!paused)}
          aria-label={paused ? 'Tiếp tục chuyển động 3D' : 'Tạm dừng chuyển động 3D'}
          aria-pressed={paused}
        >
          <Icon name={paused ? 'play' : 'pause'} />
        </button>
      )}
    </div>
  );
}
