import { ImageResponse } from 'next/og';
export const dynamic = 'force-static';
export const alt = 'DEV.ONE — Your idea. Our technology.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '70px 80px',
        background: '#080e1a',
        color: 'white',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <span style={{ fontSize: 45, fontWeight: 700 }}>
          DEV<span style={{ color: '#5b91ff' }}>.ONE</span>
        </span>
        <span style={{ color: '#8599ba', fontSize: 17, letterSpacing: 4 }}>
          SOFTWARE OUTSOURCING
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: 77,
          lineHeight: 1.18,
          letterSpacing: -3,
        }}
      >
        <span>Your idea.</span>
        <span style={{ color: '#8eb4ff' }}>Our technology.</span>
      </div>
      <div
        style={{ display: 'flex', justifyContent: 'space-between', color: '#95a8c8', fontSize: 18 }}
      >
        <span>Software · Mobile · Website · CRM & ERP</span>
        <span>BAC NINH, VIETNAM ↗</span>
      </div>
    </div>,
    size,
  );
}
