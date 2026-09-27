# Kiểm chứng DEV.ONE — 26/09/2026

## Kết quả triển khai

Đã có bản production local: trang chủ, sáu trang dịch vụ, privacy, 404, Open Graph, favicon, metadata, sitemap/robots theo cấu hình. Logo gốc có SHA-256 trùng tệp được cung cấp. Giao diện có Be Vietnam Pro, cảnh 3D lấy cảm hứng từ logo, tab giải pháp, FAQ, menu responsive và biểu mẫu chuẩn bị/tải yêu cầu.

Kế hoạch được triển khai trong `/Volumes/Developer/Projects/dev.one`; workspace chưa là Git repository nên không có diff Git để đối chiếu. Không push/deploy, không credentials, không database hoặc dịch vụ gửi tin.

## Kiểm tra đã đạt

- `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run build`.
- `npm test`: 4/4, kiểm tra validation, giới hạn đầu vào, tiếng Việt và trạng thái chưa gửi.
- `npm run test:e2e`: 7/7 trên Chromium 153, production build, macOS arm64.
- E2E: luồng dịch vụ → giữ lựa chọn → lỗi form → tải TXT → sửa lại; keyboard tabs; FAQ; mobile menu/Escape; tất cả route dịch vụ; 404; robots preview; không JavaScript; reduced motion; WebGL 2; pause; sự kiện mất context trả về poster.
- Không tràn ngang tại 320, 360, 390, 768, 1024, 1440 px. Ảnh desktop/mobile trong `screenshots/`.
- Axe trên trang chủ reduced motion: không có vi phạm theo các nhóm WCAG 2 A/AA, 2.1 A/AA, 2.2 AA. Đây là kiểm tra tự động, không thay thế kiểm thử screen reader thực.
- WebGPU chạy trong Codex in-app browser; WebGL 2 cưỡng bức chạy trên Chromium. Backend được đọc từ thuộc tính định danh của renderer, không dựa vào tên class đã minify.

## Hiệu năng local

| Điều kiện | Performance | Accessibility | Best practices | LCP | TBT | CLS | Dung lượng tải |
|---|---:|---:|---:|---:|---:|---:|---:|
| Lighthouse mobile mô phỏng, tạm dừng tab 3D khác | 93 | 100 | 100 | 3,2 s | 20 ms | 0 | khoảng 330 KiB |
| Lighthouse desktop production sau restart | 100 | 100 | 100 | 0,7 s | 0 ms | 0 | khoảng 762 KiB |

Nguồn đo: `lighthouse-mobile-isolated.json`, `lighthouse-desktop-final.json`. Mobile dùng poster CSS, không tải scene. Tổng desktop gồm tải scene vẫn dưới ngân sách 1 MB + 2 MB đặt ra.

LCP mobile mô phỏng chưa đạt mục tiêu 2,5 s. Chưa có INP/Core Web Vitals ngoài thực tế hoặc bằng chứng 60 fps trên thiết bị đại diện. Cần đo trên hosting và thiết bị đích trước công bố các cam kết hiệu năng. Bộ tự giảm đồ họa có ngưỡng trung bình dưới 25 fps nhưng chưa benchmark đầy đủ trên mobile vật lý.

SEO Lighthouse 66 vì preview chủ động `noindex, nofollow` và robots disallow khi chưa có `SITE_URL`. Không bật index bằng domain bịa để nâng điểm.

Hai phép đo ban đầu không dùng làm kết quả cuối: `lighthouse-mobile.json` bị ảnh hưởng bởi tab WebGPU đang chạy; `lighthouse-desktop.json` chạy khi build thay chunk mà server cũ còn giữ HTML nên phát sinh lỗi tài sản. Đã dừng server, build xong, khởi động lại rồi đo desktop-final. Không còn lỗi tải tài sản trong lượt cuối.

## Giới hạn và quyết định so với kế hoạch

- T8 tiếp nhận thật chưa triển khai: thiếu email/hotline, đích nhận/provider và quyền dùng credentials. Form hiện thực sự tạo/tải tệp; không fake API success. Có hỗ trợ mailto khi điền email công khai, khách phải tự xác nhận gửi.
- Mobile dưới 768 px dùng poster CSS thay vì ép chạy 3D. Reduced motion và không JavaScript vẫn có nội dung HTML. Desktop có nút pause và dừng render khi không nhìn thấy.
- Cảnh 3D hiện có shader TSL, vật liệu và quỹ đạo; chưa có kịch bản tách/ghép theo scroll như ý tưởng mở rộng trong plan.
- Chưa kiểm tra Safari/Firefox, iOS/Android thực, screen reader hoặc GPU mất thiết bị WebGPU thực. Context-loss test là sự kiện WebGL mô phỏng.
- React Three Fiber hiện dùng `THREE.Clock`, sinh cảnh báo deprecation với Three.js 0.186. Không sửa vendor hoặc che cảnh báo. Không có runtime error trong hành trình E2E; cần theo dõi tương thích khi nâng phiên bản.
- Logo header/footer là ảnh gốc đặt trong vùng cắt CSS. Favicon và scene là ký hiệu hình học lấy cảm hứng từ logo; chưa có bộ vector logo chính thức.
- Chưa có thông tin liên hệ, địa chỉ đầy đủ, tên miền và dự án thật để công bố. Dữ liệu giải pháp có nhãn minh họa, không trình bày như hồ sơ khách hàng.

## Hạng mục còn lại trước phát hành

1. Chủ doanh nghiệp review nội dung và nhận diện; cung cấp thông tin liên hệ, địa chỉ đầy đủ và domain.
2. Chốt cách tiếp nhận: email do khách tự gửi hoặc API/server tiếp nhận thật; hoàn thiện kiểm thử tích hợp khi được cho phép.
3. Kiểm tra các trình duyệt/thiết bị thực; tối ưu LCP mobile theo kết quả hosting.
4. Xác nhận cấu hình index và quyền riêng tư; chỉ push/deploy khi được cho phép.

## Bổ sung 3D toàn trang — 26/09/2026

Đã thêm bảng giải pháp nhiều lớp, chuyển động nổi và tương tác tách/thu gọn; spring tilt ở thẻ dịch vụ/quy trình/công ty; hai phần giới thiệu nguyên tắc làm việc và hệ sinh thái phần mềm có CSS 3D. Dùng thư viện hiện có, không thêm production dependency. Nội dung kiến trúc và dữ liệu bảng được ghi rõ là minh họa.

Nút điều khiển chung dừng CSS animation, tilt và hero. Reduced motion phản ứng ngay khi hệ điều hành đổi cài đặt. CSS animation dừng khi phần tương ứng ngoài viewport hoặc tab ẩn. Mobile dùng góc và khoảng cách lớp nhỏ hơn.

- Lint, TypeScript, production build đạt; 4 unit test đã đạt trong lượt triển khai này.
- Toàn bộ 8 E2E đạt sau chỉnh sửa cuối. Test mới kiểm tra bật/tắt lớp bằng bàn phím, tilt, dừng/tiếp tục animation, chuyển tab khi đang dừng, reduced motion cập nhật trực tiếp, bảng mở rộng ở mobile không tràn ngang và không có page error.
- Ảnh: `screenshots/dashboard-3d.png`, `company-3d.png`, `dashboard-3d-mobile.png`, `ecosystem-mobile.png`.
- Lighthouse mobile production cuối: Performance **92**, Accessibility **100**, Best practices **100**; LCP **3,2 s**, TBT **10 ms**, CLS **0**, tải **339 KiB**. Nguồn: `lighthouse-mobile-motion.json`. Điểm desktop phía trên là baseline trước bổ sung, chưa đo lại desktop.
- Đã sửa nhãn nút điều khiển khớp chữ hiển thị và bỏ fade opacity ở thẻ dữ liệu để nội dung giữ tương phản khi animation dừng ngoài viewport.

Giới hạn LCP mobile, thiết bị/trình duyệt thực và kênh tiếp nhận trước phát hành vẫn như phần trên. Chưa có bằng chứng FPS trên thiết bị vật lý; không coi animation CSS là cam kết hiệu năng GPU.

## Chuẩn bị Firebase Hosting — 27/09/2026

Next.js dùng static export ra `out/`. Firebase Hosting phục vụ clean URLs và các security headers trước đây nằm trong Next.js runtime. Ảnh Open Graph không có phần mở rộng được trả về với MIME `image/png`. Build công khai dùng `SITE_URL=https://devone-c340c.web.app` để tạo canonical, sitemap và robots cho đúng site mặc định của project.

- Formatter, lint, TypeScript, 4 unit test, 8 E2E trên bản xuất tĩnh và build đều đạt.
- Firebase Hosting emulator: `/`, CRM, trang quyền riêng tư, `robots.txt`, `sitemap.xml`, ảnh Open Graph trả 200; đường dẫn dịch vụ không tồn tại trả 404. MIME của ảnh là `image/png`; robots cho phép index đúng domain.
- `npm audit --omit=dev --audit-level=high`: không có cảnh báo production dependency ở mức high/critical.
- Các báo cáo Lighthouse JSON được giữ tại máy phát triển, không đưa vào Git; ảnh kiểm thử có trong repository.

Nếu bản public có lỗi, khôi phục release trước trong Firebase Hosting release history; các lần deploy sau cần build lại với `SITE_URL` đúng domain. Bản build này vẫn cần thông tin liên hệ thật để có kênh nhận yêu cầu trực tiếp.
