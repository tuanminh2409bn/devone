import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateBrief, formatBrief } from '../src/lib/contact.ts';

const brief = {
  name: 'Khách thử nghiệm',
  contact: 'example@example.com',
  company: 'Công ty thử nghiệm',
  service: 'Hệ thống CRM',
  message: 'Tôi muốn xây dựng hệ thống quản lý khách hàng cho doanh nghiệp.',
};
test('accepts a complete brief with email or Vietnamese phone', () => {
  assert.deepEqual(validateBrief(brief), {});
  assert.deepEqual(validateBrief({ ...brief, contact: '+84 912 345 678' }), {});
});
test('reports required fields and rejects malformed contact', () => {
  const errors = validateBrief({
    name: ' ',
    contact: 'not-email',
    company: '',
    service: '',
    message: 'ngắn',
  });
  assert.deepEqual(Object.keys(errors).sort(), ['contact', 'message', 'name', 'service']);
});
test('rejects oversized fields rather than silently truncating', () => {
  const errors = validateBrief({
    ...brief,
    name: 'x'.repeat(101),
    contact: `${'x'.repeat(250)}@example.com`,
    company: 'x'.repeat(151),
    message: 'x'.repeat(3001),
  });
  assert.deepEqual(Object.keys(errors).sort(), ['company', 'contact', 'message', 'name']);
});
test('download preserves Vietnamese and makes delivery status explicit', () => {
  const result = formatBrief({ ...brief, name: '  Khách thử nghiệm  ', company: '' });
  assert.match(result, /Họ tên: Khách thử nghiệm\n/);
  assert.match(result, /Chưa cung cấp/);
  assert.match(result, /chưa được gửi tự động/);
  assert.ok(result.includes(brief.message));
});
