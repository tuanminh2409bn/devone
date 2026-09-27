import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('without JavaScript content remains available and brief cannot submit to a URL', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3100/');
  await expect(page.locator('h1')).toContainText('giá trị thực');
  await expect(page.getByRole('button', { name: 'Chuẩn bị yêu cầu tư vấn' })).toBeDisabled();
  await page.getByLabel('Họ và tên').fill('Khách thử nghiệm');
  await page.getByLabel('Họ và tên').press('Enter');
  await expect(page).toHaveURL('http://127.0.0.1:3100/');
  await expect(page.getByText('Vui lòng bật JavaScript')).toBeVisible();
  await context.close();
});

test('service journey preserves chosen service and exports an honest brief', async ({ page }) => {
  const pageErrors: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  await page.goto('/?graphics=off');
  await page
    .getByRole('link')
    .filter({ has: page.getByRole('heading', { name: 'Hệ thống CRM', exact: true }) })
    .click();
  await expect(page.getByRole('heading', { name: 'Hệ thống CRM', exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Trao đổi về giải pháp' }).click();
  await expect(page.getByLabel('Bạn quan tâm đến')).toHaveValue('Hệ thống CRM');
  await page.getByRole('button', { name: 'Chuẩn bị yêu cầu tư vấn' }).click();
  await expect(page.getByLabel('Họ và tên')).toBeFocused();
  await expect(page.getByText('Vui lòng nhập email hoặc số điện thoại hợp lệ.')).toBeVisible();
  await page.getByLabel('Họ và tên').fill('Khách thử nghiệm');
  await page.getByLabel('Email hoặc số điện thoại').fill('example@example.com');
  await page
    .getByLabel('Một chút về dự án')
    .fill('Tôi cần xây dựng hệ thống quản lý khách hàng cho đội ngũ kinh doanh.');
  await page.getByRole('button', { name: 'Chuẩn bị yêu cầu tư vấn' }).click();
  await expect(page.getByRole('status')).toContainText('Thông tin chưa được gửi đến DEV.ONE.');
  const downloadEvent = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Tải bản yêu cầu' }).click();
  expect((await downloadEvent).suggestedFilename()).toBe('DEV-ONE-yeu-cau-du-an.txt');
  await page.getByLabel('Họ và tên').fill('Khách thay đổi');
  await expect(page.getByRole('status')).toHaveCount(0);
  expect(pageErrors).toEqual([]);
});

test('solution tabs support keyboard and FAQ expands', async ({ page }) => {
  await page.goto('/?graphics=off');
  await page.getByRole('tab', { name: 'Bán hàng & khách hàng' }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Quản trị & vận hành' })).toBeFocused();
  await expect(page.getByRole('tabpanel')).toContainText('Dữ liệu kết nối.');
  await page.getByRole('tab', { name: 'Sản phẩm số' }).click();
  await expect(page.getByRole('tabpanel').getByRole('link')).toHaveAttribute(
    'href',
    '/dich-vu/ung-dung-mobile',
  );
  await page.locator('summary').filter({ hasText: 'Tôi mới có ý tưởng' }).click();
  await expect(page.locator('details[open]')).toContainText('Bạn có thể bắt đầu bằng bài toán');
});

test('responsive layout and mobile menu', async ({ page }) => {
  await page.goto('/?graphics=off');
  for (const width of [320, 360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Mở menu' }).click();
  await expect(page.getByRole('navigation', { name: 'Điều hướng di động' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Mở menu' })).toBeFocused();
  await expect(page.getByRole('navigation', { name: 'Điều hướng di động' })).toBeHidden();
  await page.screenshot({ path: 'tasks/screenshots/mobile.png', fullPage: true });
});

test('reduced motion uses static artwork and page meets WCAG AA automated checks', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.hero-visual')).toHaveAttribute('data-backend', 'poster');
  await expect(page.locator('canvas')).toHaveCount(0);
  const accessibility = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(
    accessibility.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
    })),
  ).toEqual([]);
  await page.screenshot({ path: 'tasks/screenshots/desktop-static.png', fullPage: true });
});

test('all service pages render and unknown routes return 404', async ({ page, request }) => {
  const routes = [
    'phan-mem-theo-yeu-cau',
    'ung-dung-mobile',
    'thiet-ke-website',
    'he-thong-crm',
    'he-thong-erp',
    'gia-cong-phan-mem',
  ];
  for (const slug of routes) {
    const response = await page.goto(`/dich-vu/${slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
  }
  expect((await request.get('/dich-vu/khong-ton-tai')).status()).toBe(404);
  expect(await (await request.get('/robots.txt')).text()).toContain('Disallow: /');
  const socialImage = await request.get('/opengraph-image');
  expect(socialImage.status()).toBe(200);
  expect(socialImage.headers()['content-type']).toContain('image/png');
  await page.goto('/quyen-rieng-tu');
  await expect(page.locator('h1')).toContainText('Thông tin của bạn');
});

test('WebGL fallback renders, pauses, and recovers context loss to poster', async ({ page }) => {
  await page.goto('/?renderer=webgl');
  await expect(page.locator('.hero-visual')).toHaveAttribute('data-backend', 'webgl', {
    timeout: 20000,
  });
  await expect(page.locator('.poster')).toHaveCSS('opacity', '0');
  await page.getByRole('button', { name: 'Tạm dừng chuyển động 3D' }).click();
  await expect(page.getByRole('button', { name: 'Tiếp tục chuyển động 3D' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await page.screenshot({ path: 'tasks/screenshots/desktop.png', fullPage: false });
  await page
    .locator('canvas')
    .evaluate((canvas: HTMLCanvasElement) => canvas.dispatchEvent(new Event('webglcontextlost')));
  await expect(page.locator('.hero-visual')).toHaveAttribute('data-backend', 'poster');
  await expect(page.getByRole('link', { name: 'Cùng bắt đầu dự án' })).toBeVisible();
});

test('layered dashboard and global motion control remain usable with keyboard', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/?graphics=off');
  const layers = page.getByRole('button', { name: 'Tách lớp giao diện' });
  await layers.focus();
  await layers.press('Enter');
  await expect(page.locator('.workspace-stage')).toHaveAttribute('data-expanded', 'true');
  await expect(page.getByRole('button', { name: 'Thu gọn các lớp' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  const board = page.locator('.workspace-depth');
  await board.scrollIntoViewIfNeeded();
  const box = await board.boundingBox();
  expect(box).not.toBeNull();
  await board.hover({ position: { x: box!.width * 0.8, y: box!.height * 0.4 } });
  await expect(board.locator('.depth-surface-inner')).not.toHaveCSS('transform', 'none');
  await page.getByRole('button', { name: 'Tạm dừng chuyển động toàn trang' }).click();
  await expect(page.locator('.motion-root')).toHaveAttribute('data-motion', 'paused');
  await expect(board.locator('.depth-surface-inner')).toHaveCSS('transform', 'none');
  await expect(page.locator('.workspace-scene')).toHaveCSS('animation-play-state', 'paused');
  await page.getByRole('tab', { name: 'Quản trị & vận hành' }).click();
  await expect(page.locator('.workspace-demo')).toContainText('ERP WORKSPACE');
  await page.locator('#gia-tri').scrollIntoViewIfNeeded();
  await expect(page.getByRole('heading', { name: 'Hiểu trước khi xây' })).toBeVisible();
  await expect(page.locator('.sculpture-shape').first()).toHaveCSS(
    'animation-play-state',
    'paused',
  );
  await page.screenshot({ path: 'tasks/screenshots/company-3d.png', fullPage: false });
  await page.getByRole('button', { name: 'Bật chuyển động toàn trang' }).click();
  await expect(page.locator('.motion-root')).toHaveAttribute('data-motion', 'running');
  await expect(page.locator('.sculpture-shape').first()).toHaveCSS(
    'animation-play-state',
    'running',
  );
  await page.locator('#giai-phap').scrollIntoViewIfNeeded();
  await expect(page.locator('.solutions-layout').locator('..')).toHaveCSS('opacity', '1');
  await page.screenshot({ path: 'tasks/screenshots/dashboard-3d.png', fullPage: false });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.workspace-scene')).toHaveCSS('animation-name', 'none');
  await expect(
    page.getByRole('button', { name: 'Đang giảm chuyển động theo thiết bị' }),
  ).toBeDisabled();
  await page.getByRole('button', { name: 'Thu gọn các lớp' }).click();
  await expect(page.locator('.workspace-stage')).toHaveAttribute('data-expanded', 'false');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Tách lớp giao diện' }).click();
  await board.scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  await page.screenshot({ path: 'tasks/screenshots/dashboard-3d-mobile.png' });
  await page.locator('#he-sinh-thai').scrollIntoViewIfNeeded();
  await expect(page.getByRole('link', { name: 'Khám phá phần mềm theo yêu cầu' })).toBeVisible();
  await page.screenshot({ path: 'tasks/screenshots/ecosystem-mobile.png' });
  expect(errors).toEqual([]);
});
