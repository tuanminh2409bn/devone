import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { services, getService } from '@/lib/services';
import { Icon } from '@/components/icon';

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const service = getService((await params).slug);
  return service
    ? {
        title: service.name,
        description: service.description,
        ...(process.env.SITE_URL ? { alternates: { canonical: `/dich-vu/${service.slug}` } } : {}),
      }
    : {};
}
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const service = getService((await params).slug);
  if (!service) notFound();
  return (
    <main id="noi-dung" className="service-page">
      <div className="container">
        <nav className="breadcrumb" aria-label="Đường dẫn">
          <Link href="/">Trang chủ</Link>
          <span>/</span>
          <Link href="/#dich-vu">Dịch vụ</Link>
          <span>/</span>
          <span>{service.name}</span>
        </nav>
        <div className="service-detail-hero">
          <div>
            <span className="eyebrow">
              <span /> DEV.ONE SOLUTIONS / {service.code}
            </span>
            <h1>{service.name}</h1>
            <h2>{service.short}</h2>
            <p>{service.description}</p>
            <Link className="button button-primary" href={`/?dich-vu=${service.slug}#lien-he`}>
              Trao đổi về giải pháp <Icon name="diagonal" />
            </Link>
          </div>
          <div className="service-detail-symbol" aria-hidden="true">
            <div />
            <Icon name={service.icon} />
            <span>{service.tags[0]}</span>
          </div>
        </div>
        <div className="detail-content">
          <section>
            <span className="eyebrow">BẮT ĐẦU TỪ BÀI TOÁN</span>
            <h2>
              Điều gì đang cản bước
              <br />
              doanh nghiệp của bạn?
            </h2>
            <p>{service.problem}</p>
            <p>
              Chúng tôi cùng bạn phân tích hiện trạng, xác định ưu tiên và thống nhất đầu ra trước
              khi phát triển. Giải pháp được xây dựng theo nhu cầu thực tế của từng dự án.
            </p>
          </section>
          <section className="deliverables">
            <span className="eyebrow">PHẠM VI THAM KHẢO</span>
            <h2>Cùng xây dựng những gì?</h2>
            <ul>
              {service.deliverables.map((item) => (
                <li key={item}>
                  <Icon name="check" />
                  {item}
                </li>
              ))}
            </ul>
            <p>Phạm vi, tiến độ và chi phí cụ thể được xác nhận sau bước khảo sát.</p>
          </section>
        </div>
        <section className="detail-next">
          <div>
            <span className="eyebrow">BƯỚC TIẾP THEO</span>
            <h2>Bắt đầu từ một cuộc trao đổi.</h2>
          </div>
          <Link className="button button-primary" href={`/?dich-vu=${service.slug}#lien-he`}>
            Chia sẻ nhu cầu <Icon name="arrow" />
          </Link>
        </section>
        <section className="related-services">
          <h2>Khám phá thêm</h2>
          <div>
            {services
              .filter((item) => item.slug !== service.slug)
              .slice(0, 3)
              .map((item) => (
                <Link key={item.slug} href={`/dich-vu/${item.slug}`}>
                  <Icon name={item.icon} />
                  <span>{item.name}</span>
                  <Icon name="diagonal" />
                </Link>
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}
