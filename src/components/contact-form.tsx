'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { services } from '@/lib/services';
import { formatBrief, validateBrief, type Brief, type BriefErrors } from '@/lib/contact';
import { Icon } from './icon';

const subscribeToHydration = () => () => {};

export function ContactForm({ email }: { email?: string }) {
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const [errors, setErrors] = useState<BriefErrors>({});
  const [prepared, setPrepared] = useState('');
  const service = useRef<HTMLSelectElement>(null);
  const result = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get('dich-vu');
    const selected = services.find((item) => item.slug === query);
    if (selected && service.current) service.current.value = selected.name;
  }, []);
  function download() {
    const url = URL.createObjectURL(
      new Blob(['\ufeff' + prepared], { type: 'text/plain;charset=utf-8' }),
    );
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'DEV-ONE-yeu-cau-du-an.txt';
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <form
      className="contact-form"
      noValidate
      onChange={() => {
        if (prepared) setPrepared('');
      }}
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const brief: Brief = {
          name: String(data.get('name') ?? ''),
          contact: String(data.get('contact') ?? ''),
          company: String(data.get('company') ?? ''),
          service: String(data.get('service') ?? ''),
          message: String(data.get('message') ?? ''),
        };
        const nextErrors = validateBrief(brief);
        setErrors(nextErrors);
        const field = Object.keys(nextErrors)[0];
        if (field) {
          const element = form.elements.namedItem(field);
          if (element instanceof HTMLElement) element.focus();
          return;
        }
        setPrepared(formatBrief(brief));
        requestAnimationFrame(() => result.current?.focus());
      }}
    >
      <div className="form-topline">
        <span>CHIA SẺ Ý TƯỞNG CỦA BẠN</span>
        <Icon name="diagonal" />
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="contact-name">
            Họ và tên <span>*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            placeholder="Nguyễn Văn An"
            autoComplete="name"
            required
            maxLength={100}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'error-name' : undefined}
          />
          {errors.name && (
            <span className="field-error" id="error-name">
              {errors.name}
            </span>
          )}
        </div>
        <div className="field">
          <label htmlFor="contact-info">
            Email hoặc số điện thoại <span>*</span>
          </label>
          <input
            id="contact-info"
            name="contact"
            placeholder="Để chúng tôi có thể kết nối"
            required
            maxLength={254}
            aria-invalid={Boolean(errors.contact)}
            aria-describedby={errors.contact ? 'error-contact' : undefined}
          />
          {errors.contact && (
            <span className="field-error" id="error-contact">
              {errors.contact}
            </span>
          )}
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="contact-company">Doanh nghiệp</label>
          <input
            id="contact-company"
            name="company"
            placeholder="Tên doanh nghiệp của bạn"
            autoComplete="organization"
            maxLength={150}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? 'error-company' : undefined}
          />
          {errors.company && (
            <span className="field-error" id="error-company">
              {errors.company}
            </span>
          )}
        </div>
        <div className="field">
          <label htmlFor="contact-service">
            Bạn quan tâm đến <span>*</span>
          </label>
          <select
            id="contact-service"
            name="service"
            ref={service}
            defaultValue=""
            required
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? 'error-service' : undefined}
          >
            <option value="" disabled>
              Chọn dịch vụ
            </option>
            {services.map((item) => (
              <option key={item.slug}>{item.name}</option>
            ))}
            <option>Tôi cần được tư vấn thêm</option>
          </select>
          {errors.service && (
            <span className="field-error" id="error-service">
              {errors.service}
            </span>
          )}
        </div>
      </div>
      <div className="field">
        <label htmlFor="contact-message">
          Một chút về dự án của bạn <span>*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="Bạn muốn giải quyết bài toán gì? Hãy chia sẻ ý tưởng, nhu cầu hoặc mục tiêu của bạn…"
          minLength={20}
          maxLength={3000}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'error-message' : undefined}
        />
        {errors.message && (
          <span className="field-error" id="error-message">
            {errors.message}
          </span>
        )}
      </div>
      <p className="form-privacy">
        <Icon name="shield" /> Thông tin chỉ dùng để chuẩn bị yêu cầu của bạn.{' '}
        <Link href="/quyen-rieng-tu">Quyền riêng tư</Link>
      </p>
      <button className="button button-primary form-submit" type="submit" disabled={!hydrated}>
        Chuẩn bị yêu cầu tư vấn <Icon name="arrow" />
      </button>
      {!hydrated && (
        <p className="form-note">
          Vui lòng bật JavaScript để chuẩn bị và tải yêu cầu. Thông tin chưa được gửi.
        </p>
      )}
      <p className="form-note">
        {email
          ? 'Bạn có thể xem lại yêu cầu trước khi gửi bằng ứng dụng email.'
          : 'Tạo bản yêu cầu để lưu về máy. Kênh tiếp nhận trực tuyến sẽ được cập nhật sau.'}
      </p>
      {prepared && (
        <div className="brief-result" tabIndex={-1} ref={result} role="status">
          <strong>
            <Icon name="check" /> Bản yêu cầu của bạn đã sẵn sàng
          </strong>
          <p>
            Thông tin chưa được gửi đến DEV.ONE. Bạn có thể tải bản yêu cầu
            {email ? ' hoặc mở email để gửi.' : ' và giữ lại cho buổi trao đổi.'}
          </p>
          <div className="brief-actions">
            <button type="button" className="button button-secondary" onClick={download}>
              Tải bản yêu cầu <Icon name="download" />
            </button>
            {email && (
              <a
                className="text-link"
                href={`mailto:${email}?subject=${encodeURIComponent('Yêu cầu tư vấn dự án — DEV.ONE')}&body=${encodeURIComponent(prepared)}`}
              >
                Mở email để gửi <Icon name="diagonal" />
              </a>
            )}
          </div>
        </div>
      )}
    </form>
  );
}
