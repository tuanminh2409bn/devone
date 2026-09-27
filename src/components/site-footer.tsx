import Link from 'next/link';
import { Brand } from './site-header';
import { Icon } from './icon';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <Brand />
            <p>
              Công nghệ vững chắc.
              <br />
              Đồng hành cùng phát triển.
            </p>
          </div>
          <div className="footer-company">
            <span className="eyebrow">DEV.ONE COMPANY</span>
            <p>
              CÔNG TY TNHH CÔNG NGHỆ
              <br />
              VÀ PHẦN MỀM DEV.ONE
            </p>
            <span>
              <Icon name="pin" /> TP. Bắc Ninh, Việt Nam
            </span>
          </div>
          <div className="footer-links">
            <Link href="/#dich-vu">
              Dịch vụ <Icon name="diagonal" />
            </Link>
            <Link href="/#ve-dev-one">
              Về DEV.ONE <Icon name="diagonal" />
            </Link>
            <Link href="/#lien-he">
              Trao đổi dự án <Icon name="diagonal" />
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} DEV.ONE. All rights reserved.</span>
          <span>Thiết kế bằng tâm huyết. Phát triển bằng công nghệ.</span>
          <Link href="/quyen-rieng-tu">Quyền riêng tư</Link>
        </div>
      </div>
    </footer>
  );
}
