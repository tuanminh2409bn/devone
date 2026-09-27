'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Icon } from './icon';
import { DepthSurface } from './depth-surface';

const solutions = [
  {
    tab: 'Bán hàng & khách hàng',
    title: 'Mọi cơ hội. Một góc nhìn.',
    body: 'Kết nối hành trình từ khách hàng tiềm năng đến hợp đồng. Theo dõi cơ hội, lịch sử trao đổi và công việc của đội ngũ trong một hệ thống CRM thống nhất.',
    slug: 'he-thong-crm',
    label: 'CRM WORKSPACE',
    columns: ['Khách hàng mới', 'Đang tư vấn', 'Đề xuất giải pháp'],
    cards: [
      ['An Phát Group', 'Website doanh nghiệp'],
      ['Minh Anh Retail', 'Quản lý khách hàng'],
      ['Green Logistics', 'Ứng dụng vận hành'],
    ],
  },
  {
    tab: 'Quản trị & vận hành',
    title: 'Dữ liệu kết nối. Vận hành liền mạch.',
    body: 'Liên kết các bộ phận bằng quy trình và dữ liệu nhất quán. Từ yêu cầu mua hàng đến phê duyệt và giao nhận, mỗi bước đều có thể theo dõi.',
    slug: 'he-thong-erp',
    label: 'ERP WORKSPACE',
    columns: ['Yêu cầu mới', 'Đang phê duyệt', 'Đang thực hiện'],
    cards: [
      ['Đề nghị mua hàng', 'Bộ phận vận hành'],
      ['Điều phối kho', 'Bộ phận kho vận'],
      ['Kế hoạch bàn giao', 'Bộ phận dự án'],
    ],
  },
  {
    tab: 'Sản phẩm số',
    title: 'Từ ý tưởng đến trải nghiệm thực tế.',
    body: 'Phát triển website và ứng dụng mobile theo hành trình người dùng. Một nền tảng phù hợp hôm nay, với cấu trúc sẵn sàng cho những bước phát triển tiếp theo.',
    slug: 'ung-dung-mobile',
    label: 'PRODUCT WORKSPACE',
    columns: ['Khám phá', 'Thiết kế', 'Phát triển'],
    cards: [
      ['Hành trình người dùng', 'Nghiên cứu trải nghiệm'],
      ['Ứng dụng khách hàng', 'Giao diện & tương tác'],
      ['Nền tảng dịch vụ', 'Web & Mobile'],
    ],
  },
];
export function Solutions() {
  const [active, setActive] = useState(0);
  const item = solutions[active];
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="solutions-layout">
      <div className="solution-copy">
        <div className="solution-tabs" role="tablist" aria-label="Nhóm giải pháp">
          {solutions.map((s, i) => (
            <button
              key={s.tab}
              id={`solution-tab-${i}`}
              role="tab"
              aria-selected={i === active}
              aria-controls="solution-panel"
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(event) => {
                if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) {
                  event.preventDefault();
                  const next =
                    event.key === 'Home'
                      ? 0
                      : event.key === 'End'
                        ? 2
                        : (active + (event.key === 'ArrowRight' ? 1 : 2)) % 3;
                  setActive(next);
                  document.getElementById(`solution-tab-${next}`)?.focus();
                }
              }}
            >
              {s.tab}
            </button>
          ))}
        </div>
        <div
          id="solution-panel"
          role="tabpanel"
          aria-labelledby={`solution-tab-${active}`}
          tabIndex={0}
        >
          <h3>{item.title}</h3>
          <p>{item.body}</p>
          <Link className="text-link" href={`/dich-vu/${item.slug}`}>
            Khám phá giải pháp <Icon name="arrow" />
          </Link>
        </div>
      </div>
      <div className="workspace-stage" data-expanded={expanded}>
        <div className="workspace-controls">
          <span>
            <i /> KHÔNG GIAN VẬN HÀNH 3D
          </span>
          <button type="button" aria-pressed={expanded} onClick={() => setExpanded(!expanded)}>
            <Icon name="layers" />
            {expanded ? 'Thu gọn các lớp' : 'Tách lớp giao diện'}
          </button>
        </div>
        <DepthSurface className="workspace-depth" strength={9}>
          <div className="workspace-scene">
            <div className="workspace-backplate backplate-one" aria-hidden="true" />
            <div className="workspace-backplate backplate-two" aria-hidden="true" />
            <div className="workspace-demo" aria-label="Giao diện minh họa, dữ liệu giả lập">
              <div className="demo-top">
                <span className="demo-mark">
                  D<span>.</span>
                </span>
                <span>{item.label}</span>
                <span className="demo-avatar">M</span>
              </div>
              <div className="demo-body">
                <div className="demo-sidebar">
                  <Icon name="grid" />
                  <Icon name="users" />
                  <Icon name="layers" />
                  <Icon name="web" />
                </div>
                <div className="demo-content">
                  <div className="demo-title">
                    <div>
                      <small>KHÔNG GIAN LÀM VIỆC</small>
                      <strong>
                        {active === 0
                          ? 'Cơ hội kinh doanh'
                          : active === 1
                            ? 'Quản lý vận hành'
                            : 'Phát triển sản phẩm'}
                      </strong>
                    </div>
                    <span className="demo-new">+ Tạo mới</span>
                  </div>
                  <div className="demo-summary">
                    <span>
                      Tổng quan <b>12</b>
                    </span>
                    <span>
                      Đang thực hiện <b>08</b>
                    </span>
                    <span>
                      Hoàn thành <b>04</b>
                    </span>
                  </div>
                  <div className="kanban" key={active}>
                    {item.columns.map((column, i) => (
                      <div className="kanban-column" key={column}>
                        <span className={`kanban-label label-${i}`}>
                          <i />
                          {column}
                          <b>{i + 2}</b>
                        </span>
                        <div className="kanban-card">
                          <span className="kanban-category">
                            {i === 0 ? 'MỚI' : i === 1 ? 'ƯU TIÊN' : 'ĐANG XỬ LÝ'}
                          </span>
                          <strong>{item.cards[i][0]}</strong>
                          <p>{item.cards[i][1]}</p>
                          <div className="kanban-card-bottom">
                            <span className="mini-avatar">{['A', 'M', 'G'][i]}</span>
                            <span>Đội ngũ DEV.ONE</span>
                          </div>
                        </div>
                        <div className="kanban-ghost">
                          <i />
                          <i />
                          <i />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="demo-note">
                <span className="status-dot" /> Giao diện minh họa · Dữ liệu giả lập
              </div>
            </div>
            <div className="workspace-satellite satellite-data" aria-hidden="true">
              <Icon name="layers" />
              <span>
                CONNECTED DATA<small>Dữ liệu đồng bộ</small>
              </span>
            </div>
            <div className="workspace-satellite satellite-flow" aria-hidden="true">
              <Icon name="check" />
              <span>
                ONE WORKFLOW<small>Luồng làm việc liền mạch</small>
              </span>
            </div>
          </div>
        </DepthSurface>
        <p className="workspace-hint">Di chuyển con trỏ để khám phá chiều sâu · Dữ liệu minh họa</p>
      </div>
    </div>
  );
}
