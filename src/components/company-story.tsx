import Link from 'next/link';
import { DepthSurface } from './depth-surface';
import { Icon } from './icon';
import { Reveal } from './reveal';

const values = [
  {
    icon: 'users',
    title: 'Hiểu trước khi xây',
    text: 'Bắt đầu từ người sử dụng và quy trình thực tế. Mỗi tính năng cần trả lời một nhu cầu rõ ràng của doanh nghiệp.',
    label: 'BUSINESS FIRST',
    shape: 'orbit',
  },
  {
    icon: 'layers',
    title: 'Thiết kế để phát triển',
    text: 'Chia hệ thống thành các phần có trách nhiệm rõ ràng, để có thể bổ sung chức năng theo từng giai đoạn.',
    label: 'BUILT TO EVOLVE',
    shape: 'stack',
  },
  {
    icon: 'shield',
    title: 'Chất lượng có kiểm chứng',
    text: 'Thống nhất tiêu chí nghiệm thu, kiểm thử những luồng quan trọng và làm rõ cách vận hành trước khi bàn giao.',
    label: 'QUALITY BY DESIGN',
    shape: 'cube',
  },
];

export function CompanyStory() {
  return (
    <>
      <section className="section values-section" id="gia-tri">
        <div className="container">
          <Reveal className="section-heading">
            <div>
              <span className="eyebrow">
                <span /> TƯ DUY ĐỨNG SAU SẢN PHẨM
              </span>
              <h2>
                Không chỉ viết phần mềm.
                <br />
                <span>Cùng tìm lời giải tốt hơn.</span>
              </h2>
            </div>
            <p>
              Ba nguyên tắc định hướng cách DEV.ONE
              <br />
              tiếp cận mỗi bài toán công nghệ.
            </p>
          </Reveal>
          <div className="values-grid">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.08}>
                <DepthSurface className="value-depth" strength={8}>
                  <article className="value-card">
                    <div className={`value-sculpture sculpture-${value.shape}`} aria-hidden="true">
                      <div className="sculpture-shape">
                        <i />
                        <i />
                        <i />
                        <i />
                        <i />
                        <i />
                      </div>
                      <span className="sculpture-center">
                        <Icon name={value.icon} />
                      </span>
                      <div className="sculpture-shadow" />
                    </div>
                    <span className="value-label">
                      0{index + 1} / {value.label}
                    </span>
                    <h3>{value.title}</h3>
                    <p>{value.text}</p>
                  </article>
                </DepthSurface>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section ecosystem-section" id="he-sinh-thai">
        <div className="container ecosystem-layout">
          <Reveal className="ecosystem-copy">
            <span className="eyebrow">
              <span /> KẾT NỐI ĐỂ ĐI XA HƠN
            </span>
            <h2>
              Nhiều điểm chạm.
              <br />
              <span>Một hệ sinh thái.</span>
            </h2>
            <p>
              Website, ứng dụng và hệ thống quản trị có thể cùng chia sẻ một luồng dữ liệu. Chúng
              tôi cùng bạn xác định những kết nối cần thiết để giảm thao tác lặp và tạo trải nghiệm
              nhất quán.
            </p>
            <ul>
              <li>
                <Icon name="check" /> Trải nghiệm khách hàng trên web và mobile
              </li>
              <li>
                <Icon name="check" /> Quy trình bán hàng và vận hành kết nối
              </li>
              <li>
                <Icon name="check" /> Tích hợp theo phạm vi và hệ thống hiện có
              </li>
            </ul>
            <Link className="text-link" href="/dich-vu/phan-mem-theo-yeu-cau">
              Khám phá phần mềm theo yêu cầu <Icon name="arrow" />
            </Link>
          </Reveal>
          <Reveal>
            <DepthSurface className="ecosystem-depth" strength={9}>
              <div
                className="ecosystem-art"
                aria-label="Minh họa các lớp của một hệ thống phần mềm"
              >
                <div className="ecosystem-orbit" aria-hidden="true" />
                <div className="ecosystem-orbit orbit-offset" aria-hidden="true" />
                <div className="system-stack" aria-hidden="true">
                  <div className="system-layer layer-interface">
                    <Icon name="web" />
                    <span>EXPERIENCE</span>
                    <div className="layer-traces" />
                  </div>
                  <div className="system-layer layer-business">
                    <Icon name="code" />
                    <span>BUSINESS LOGIC</span>
                    <div className="layer-traces" />
                  </div>
                  <div className="system-layer layer-data">
                    <Icon name="layers" />
                    <span>CONNECTED DATA</span>
                    <div className="layer-traces" />
                  </div>
                </div>
                <span className="system-label system-label-top">
                  <i /> Website & Mobile
                </span>
                <span className="system-label system-label-middle">
                  <i /> CRM & ERP
                </span>
                <span className="system-label system-label-bottom">
                  <i /> Dữ liệu & Tích hợp
                </span>
                <span className="ecosystem-caption">MÔ HÌNH KIẾN TRÚC MINH HỌA</span>
              </div>
            </DepthSurface>
          </Reveal>
        </div>
      </section>
    </>
  );
}
