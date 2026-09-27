import type { Metadata } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { MotionControls } from '@/components/motion-controls';
import './globals.css';

const beVietnam = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-be-vietnam',
});
const siteUrl = process.env.SITE_URL;
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl || 'http://localhost:3000'),
  title: { default: 'DEV.ONE — Phần mềm cho cách bạn vận hành', template: '%s | DEV.ONE' },
  description:
    'DEV.ONE tại Bắc Ninh phát triển phần mềm theo yêu cầu, ứng dụng mobile, website, CRM và ERP. Cùng biến ý tưởng của bạn thành giải pháp thực tế.',
  robots: { index: Boolean(siteUrl), follow: Boolean(siteUrl) },
  ...(siteUrl ? { alternates: { canonical: '/' } } : {}),
  openGraph: {
    title: 'DEV.ONE — Công nghệ vững chắc. Đồng hành cùng phát triển.',
    description: 'Phát triển phần mềm, Mobile, Website, CRM & ERP theo yêu cầu.',
    locale: 'vi_VN',
    type: 'website',
    ...(siteUrl ? { url: siteUrl } : {}),
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={beVietnam.variable}>
      <body>
        <a className="skip-link" href="#noi-dung">
          Bỏ qua điều hướng
        </a>
        <MotionControls>
          <SiteHeader />
          {children}
          <SiteFooter />
        </MotionControls>
      </body>
    </html>
  );
}
