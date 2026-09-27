export type Brief = {
  name: string;
  contact: string;
  company: string;
  service: string;
  message: string;
};
export type BriefErrors = Partial<Record<keyof Brief, string>>;
export function validateBrief(brief: Brief): BriefErrors {
  const errors: BriefErrors = {};
  if (brief.name.trim().length < 2 || brief.name.trim().length > 100)
    errors.name = 'Vui lòng nhập họ tên từ 2 đến 100 ký tự.';
  const contact = brief.contact.trim();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
  const phone = contact.replace(/[\s().-]/g, '');
  const isPhone = /^\+?\d{9,15}$/.test(phone);
  if (contact.length > 254 || (!isEmail && !isPhone))
    errors.contact = 'Vui lòng nhập email hoặc số điện thoại hợp lệ.';
  if (brief.company.length > 150) errors.company = 'Tên doanh nghiệp tối đa 150 ký tự.';
  if (!brief.service || brief.service.length > 100)
    errors.service = 'Vui lòng chọn dịch vụ cần tư vấn.';
  if (brief.message.trim().length < 20 || brief.message.length > 3000)
    errors.message = 'Hãy mô tả nhu cầu trong khoảng 20 đến 3.000 ký tự.';
  return errors;
}
export function formatBrief(brief: Brief) {
  return `YÊU CẦU TƯ VẤN DỰ ÁN — DEV.ONE\n\nHọ tên: ${brief.name.trim()}\nLiên hệ: ${brief.contact.trim()}\nDoanh nghiệp: ${brief.company.trim() || 'Chưa cung cấp'}\nDịch vụ: ${brief.service}\n\nNỘI DUNG DỰ ÁN\n${brief.message.trim()}\n\nBản yêu cầu được chuẩn bị tại website DEV.ONE. Tài liệu này chưa được gửi tự động.`;
}
