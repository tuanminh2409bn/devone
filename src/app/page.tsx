import Link from 'next/link';
import { HeroVisual } from '@/components/hero-visual';
import { Icon } from '@/components/icon';
import { Reveal } from '@/components/reveal';
import { DepthSurface } from '@/components/depth-surface';
import { CompanyStory } from '@/components/company-story';
import { Solutions } from '@/components/solutions';
import { ContactForm } from '@/components/contact-form';
import { services } from '@/lib/services';

const steps = [
  [
    'Lắng nghe & thấu hiểu',
    'Bắt đầu từ mục tiêu kinh doanh, người dùng và những vấn đề bạn thực sự muốn giải quyết.',
  ],
  [
    'Phân tích & thiết kế',
    'Làm rõ yêu cầu, thống nhất phạm vi và trực quan hóa giải pháp trước khi viết mã.',
  ],
  [
    'Phát triển & kiểm thử',
    'Triển khai theo từng giai đoạn, kiểm thử liên tục và cùng bạn đánh giá kết quả.',
  ],
  [
    'Bàn giao & đồng hành',
    'Bàn giao theo tiêu chí đã thống nhất, hướng dẫn sử dụng và lên kế hoạch vận hành.',
  ],
];
const faqs = [
  [
    'Tôi mới có ý tưởng, DEV.ONE có thể hỗ trợ không?',
    'Có. Bạn có thể bắt đầu bằng bài toán cần giải quyết, nhóm người dùng và mục tiêu dự kiến. Từ đó, chúng tôi cùng bạn làm rõ yêu cầu và đề xuất phạm vi triển khai phù hợp.',
  ],
  [
    'Chi phí và thời gian phát triển được xác định như thế nào?',
    'Chi phí và thời gian phụ thuộc vào phạm vi tính năng, độ phức tạp, yêu cầu tích hợp và tài sản sẵn có. Kế hoạch và báo giá cụ thể được trao đổi sau khi làm rõ nhu cầu của bạn.',
  ],
  [
    'Có thể phát triển theo từng giai đoạn không?',
    'Có thể chia sản phẩm thành các giai đoạn, ưu tiên những chức năng giải quyết nhu cầu quan trọng trước. Mỗi giai đoạn cần có phạm vi, đầu ra và tiêu chí nghiệm thu rõ ràng.',
  ],
  [
    'Mã nguồn, bảo hành và bảo trì được bàn giao ra sao?',
    'Phạm vi bàn giao mã nguồn, tài liệu, bảo hành và bảo trì được xác định trong thỏa thuận của từng dự án. Những nội dung này cần được làm rõ trước khi bắt đầu triển khai.',
  ],
];

export default function Home() {
  return (
    <main id="noi-dung">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'DEV.ONE',
            legalName: 'CÔNG TY TNHH CÔNG NGHỆ VÀ PHẦN MỀM DEV.ONE',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Bắc Ninh',
              addressCountry: 'VN',
            },
          }).replace(/</g, '\\u003c'),
        }}
      />
      <section className="hero">
        <div className="container hero-main">
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span className="status-dot" /> YOUR IDEA. OUR TECHNOLOGY.
            </div>
            <h1>
              Từ ý tưởng.
              <br />
              Đến <span>giá trị thực.</span>
            </h1>
            <p>
              Phần mềm được thiết kế cho cách
              <br className="desktop-break" /> doanh nghiệp bạn vận hành.
            </p>
            <p className="hero-description">
              DEV.ONE đồng hành phát triển phần mềm, ứng dụng và nền tảng số — để công nghệ trở
              thành lợi thế của bạn.
            </p>
            <div className="hero-actions">
              <Link href="#lien-he" className="button button-primary">
                Cùng bắt đầu dự án <Icon name="diagonal" />
              </Link>
              <Link href="#dich-vu" className="button button-quiet">
                Khám phá dịch vụ <Icon name="arrow" />
              </Link>
            </div>
            <div className="hero-location">
              <Icon name="pin" />
              <span>Từ Bắc Ninh. Kết nối mọi ý tưởng.</span>
            </div>
          </div>
          <HeroVisual />
        </div>
        <div className="container hero-bottom">
          <span className="hero-bottom-label">
            TỪNG DÒNG CODE.
            <br />
            <b>MỘT BƯỚC TIẾN.</b>
          </span>
          <div className="capabilities">
            <span>Software Development</span>
            <i />
            <span>Mobile Application</span>
            <i />
            <span>Website</span>
            <i />
            <span>CRM & ERP</span>
          </div>
          <a href="#dich-vu" className="scroll-cue" aria-label="Khám phá dịch vụ bên dưới">
            <span>KHÁM PHÁ</span>
            <Icon name="arrow" />
          </a>
        </div>
      </section>

      <section id="dich-vu" className="section services-section">
        <div className="container">
          <Reveal className="section-heading">
            <div>
              <span className="eyebrow">
                <span /> 01 — CHÚNG TÔI LÀM GÌ
              </span>
              <h2>
                Giải pháp riêng.
                <br />
                <span>Cho tầm nhìn của bạn.</span>
              </h2>
            </div>
            <p>
              Từ một website đến hệ thống vận hành toàn diện.
              <br />
              Chúng tôi xây dựng công nghệ phù hợp với
              <br className="desktop-break" /> từng bài toán của doanh nghiệp.
            </p>
          </Reveal>
          <div className="services-grid">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 0.07}>
                <DepthSurface className="service-depth">
                  <Link href={`/dich-vu/${service.slug}`} className="service-card">
                    <div className="service-card-top">
                      <span className="service-icon">
                        <Icon name={service.icon} />
                      </span>
                      <span className="service-number">/{service.code}</span>
                    </div>
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                    <div className="service-bottom">
                      <span>{service.tags[0]}</span>
                      <span className="service-arrow">
                        <Icon name="diagonal" />
                      </span>
                    </div>
                  </Link>
                </DepthSurface>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="giai-phap" className="section solutions-section">
        <div className="container">
          <Reveal className="section-heading">
            <div>
              <span className="eyebrow">
                <span /> 02 — CÔNG NGHỆ ĐI VÀO THỰC TẾ
              </span>
              <h2>
                Phức tạp phía sau.
                <br />
                <span>Đơn giản khi sử dụng.</span>
              </h2>
            </div>
            <span className="section-side-note">
              BUILT AROUND YOUR BUSINESS <Icon name="diagonal" />
            </span>
          </Reveal>
          <Reveal>
            <Solutions />
          </Reveal>
        </div>
      </section>

      <section id="quy-trinh" className="section process-section">
        <div className="container">
          <Reveal className="section-heading">
            <div>
              <span className="eyebrow">
                <span /> 03 — CÁCH CHÚNG TÔI ĐỒNG HÀNH
              </span>
              <h2>
                Một hành trình rõ ràng.
                <br />
                <span>Một mục tiêu chung.</span>
              </h2>
            </div>
            <p>
              Bạn hiểu doanh nghiệp của mình.
              <br />
              Chúng tôi cùng bạn biến hiểu biết đó
              <br />
              thành sản phẩm có thể sử dụng.
            </p>
          </Reveal>
          <div className="process-grid">
            {steps.map(([title, body], i) => (
              <Reveal key={title} delay={i * 0.08}>
                <DepthSurface className="process-depth" strength={5}>
                  <article className="process-step">
                    <div className="step-top">
                      <span>0{i + 1}</span>
                      <Icon name="arrow" />
                    </div>
                    <div className="step-line">
                      <i />
                    </div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </article>
                </DepthSurface>
              </Reveal>
            ))}
          </div>
          <div className="process-footnote">
            <Icon name="check" />
            <span>Phạm vi minh bạch</span>
            <i />
            <Icon name="check" />
            <span>Phản hồi xuyên suốt</span>
            <i />
            <Icon name="check" />
            <span>Bàn giao có tiêu chí</span>
          </div>
        </div>
      </section>

      <section id="ve-dev-one" className="about-section">
        <div className="container about-layout">
          <DepthSurface className="about-depth" strength={7}>
            <div className="about-art">
              <div className="about-grid" />
              <span className="about-coordinate">BASED IN BAC NINH / VIETNAM</span>
              <div className="about-monogram">
                dev<span>.</span>
                <br />
                one<span>↗</span>
              </div>
              <div className="about-location">
                <span className="status-dot" /> BẮC NINH, VIỆT NAM
              </div>
              <div className="about-orbit" />
            </div>
          </DepthSurface>
          <Reveal className="about-copy">
            <span className="eyebrow">
              <span /> 04 — VỀ DEV.ONE
            </span>
            <h2>
              Công nghệ vững chắc.
              <br />
              <span>Đồng hành cùng phát triển.</span>
            </h2>
            <p>
              Chúng tôi tin rằng phần mềm tốt bắt đầu từ sự thấu hiểu. Thấu hiểu con người, quy
              trình và mục tiêu đứng sau mỗi yêu cầu.
            </p>
            <p>
              <strong>Công ty TNHH Công nghệ và Phần mềm DEV.ONE</strong> có trụ sở tại TP. Bắc
              Ninh, phát triển phần mềm theo yêu cầu cho doanh nghiệp. Với chúng tôi, mỗi dự án là
              một cơ hội tạo ra giá trị thực bằng công nghệ.
            </p>
            <div className="director">
              <span className="director-avatar">NM</span>
              <div>
                <strong>Nguyễn Tuấn Minh</strong>
                <span>Giám đốc · DEV.ONE</span>
              </div>
            </div>
            <Link href="#lien-he" className="text-link">
              Kết nối với DEV.ONE <Icon name="arrow" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CompanyStory />

      <section className="section faq-section">
        <div className="container faq-layout">
          <Reveal>
            <span className="eyebrow">
              <span /> TRƯỚC KHI BẮT ĐẦU
            </span>
            <h2>
              Có thể bạn
              <br />
              <span>đang băn khoăn.</span>
            </h2>
            <p>
              Một vài điều để chúng ta
              <br />
              hiểu nhau hơn.
            </p>
          </Reveal>
          <div className="faq-list">
            {faqs.map(([question, answer], i) => (
              <details key={question}>
                <summary>
                  <span className="faq-number">0{i + 1}</span>
                  <h3>{question}</h3>
                  <Icon name="plus" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="lien-he" className="section contact-section">
        <div className="container contact-layout">
          <Reveal className="contact-copy">
            <span className="eyebrow">
              <span /> BẮT ĐẦU MỘT ĐIỀU CÓ Ý NGHĨA
            </span>
            <h2>
              Ý tưởng của bạn.
              <br />
              <span>
                Bước tiếp theo,
                <br />
                cùng DEV.ONE.
              </span>
            </h2>
            <p>
              Hãy kể về dự án bạn đang ấp ủ.
              <br />
              Chúng ta sẽ cùng tìm một hướng đi phù hợp.
            </p>
            <div className="contact-place">
              <Icon name="pin" />
              <div>
                <strong>DEV.ONE COMPANY</strong>
                <span>TP. Bắc Ninh, Việt Nam</span>
              </div>
            </div>
            {process.env.CONTACT_PHONE && (
              <a
                className="contact-phone"
                href={`tel:${process.env.CONTACT_PHONE.replace(/[^+\d]/g, '')}`}
              >
                {process.env.CONTACT_PHONE}
              </a>
            )}
            {process.env.CONTACT_EMAIL && (
              <a className="contact-phone" href={`mailto:${process.env.CONTACT_EMAIL}`}>
                {process.env.CONTACT_EMAIL}
              </a>
            )}
            <div className="contact-decoration" aria-hidden="true">
              Let’s build<span>↗</span>
            </div>
          </Reveal>
          <Reveal>
            <ContactForm email={process.env.CONTACT_EMAIL} />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
