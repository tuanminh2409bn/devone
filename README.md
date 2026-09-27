# DEV.ONE — Website doanh nghiệp

Website tiếng Việt cho Công ty TNHH Công nghệ và Phần mềm DEV.ONE. Next.js App Router, TypeScript, Be Vietnam Pro, Motion, Three.js WebGPURenderer và React Three Fiber. Logo gốc do chủ doanh nghiệp cung cấp nằm trong `public/brand/`, được hiển thị bằng vùng cắt CSS, không chỉnh sửa tệp gốc.

## Chạy local

Dùng Node.js 22.18 trở lên (bộ kiểm thử dùng hỗ trợ TypeScript trực tiếp của Node), npm và lockfile đi kèm.

```sh
npm ci
npm run dev
```

Mở http://127.0.0.1:3000. Để chạy bản xuất tĩnh giống Firebase Hosting:

```sh
npm run build
npm run start
```

`npm run build` tạo thư mục `out/`; `npm run start` phục vụ các tệp này tại cổng 3000. Dừng server cũ trước khi build lại để tránh HTML cũ trỏ đến chunk đã đổi tên.

## Firebase Hosting

Site mặc định của project `devone-c340c` là [devone-c340c.web.app](https://devone-c340c.web.app). Build bằng URL này để xuất canonical, sitemap và robots cho đúng nơi phát hành:

```sh
SITE_URL=https://devone-c340c.web.app npm run build
firebase emulators:start --only hosting --project devone-c340c
firebase deploy --only hosting --project devone-c340c
```

Kiểm tra bản emulator trước khi chạy lệnh deploy. `firebase.json` phục vụ `out/`, dùng clean URLs cho các trang dịch vụ và đặt security headers; `/opengraph-image` có MIME `image/png`. Site này dùng static export nên biểu mẫu chỉ chuẩn bị/tải yêu cầu như mô tả bên dưới. Nếu chuyển sang domain riêng, đổi `SITE_URL` và build lại trước khi deploy. Bản triển khai trước có thể khôi phục bằng Firebase Hosting release history.

## Nội dung và cấu hình

- `src/app/page.tsx`: nội dung trang chủ, công ty, giám đốc, quy trình và FAQ.
- `src/lib/services.ts`: sáu dịch vụ; tự sinh trang `/dich-vu/[slug]`.
- `src/components/solutions.tsx`: ba giải pháp minh họa, dữ liệu giả lập có nhãn.
- `src/app/globals.css`: tokens, layout, responsive và reduced motion.
- `src/components/core-scene.tsx`: cảnh 3D lấy cảm hứng từ logo, vật liệu TSL, vòng quỹ đạo và tương tác con trỏ.
- `src/components/hero-visual.tsx`: tải riêng scene, chế độ đồ họa, trạng thái hiển thị và fallback CSS.
- `src/components/company-story.tsx`: nguyên tắc làm việc và mô hình hệ sinh thái phần mềm, với các khối CSS 3D.
- `src/components/depth-surface.tsx`: nghiêng theo con trỏ bằng spring và theo dõi viewport.
- `src/components/motion-controls.tsx`: điều khiển chuyển động toàn trang và theo dõi reduced motion theo thời gian thực.

Sao chép `.env.example` thành `.env.local`, điền thông tin chính thức rồi build lại:

| Biến | Ý nghĩa |
|---|---|
| `SITE_URL` | URL HTTPS đã xác nhận. Khi để trống, robots và metadata chặn index; sitemap trống. |
| `CONTACT_EMAIL` | Email công khai. Khi có giá trị, hiện liên kết email và nút mở ứng dụng email với nội dung yêu cầu. |
| `CONTACT_PHONE` | Số điện thoại công khai. Khi có giá trị, hiện liên kết gọi điện. |

Các biến này là thông tin công khai, không phải credentials. Không điền mật khẩu hoặc API key vào chúng.

## Trạng thái biểu mẫu

Biểu mẫu kiểm tra đầu vào và tạo tệp TXT trên thiết bị. Không có API tiếp nhận, database hay gửi email tự động. Nội dung chưa gửi được giữ trong bộ nhớ trình duyệt, không dùng localStorage; tải lại trang sẽ mất nội dung. Nút tải và thông báo luôn phân biệt rõ “đã chuẩn bị” với “đã gửi”. Khi JavaScript chưa chạy, nút submit bị vô hiệu hóa để tránh đưa thông tin lên URL.

Khi có email chính thức, khách có thể mở ứng dụng email và tự gửi. Để triển khai gửi trực tiếp cần chọn nhà cung cấp/đích nhận, phê duyệt credentials và hợp đồng endpoint; sau đó bổ sung server validation, giới hạn gửi, xử lý lỗi và cập nhật trang quyền riêng tư. Chưa có tích hợp nào được giả lập là đã hoạt động.

## Chế độ đồ họa

- Desktop: WebGPU nếu khả dụng, WebGL 2 dự phòng; DPR tối đa 1,5, không dùng mô hình hoặc texture tải ngoài.
- Dưới 768 px và `prefers-reduced-motion`: hình CSS tĩnh, không tải scene 3D.
- Có nút tạm dừng; dừng vòng render khi tab ẩn hoặc hero ngoài viewport.
- Nếu scene lỗi, mất WebGL context hoặc tốc độ trung bình ổn định dưới 25 fps, quay về hình tĩnh.
- `/?renderer=webgl`: kiểm thử backend WebGL 2.
- `/?graphics=off`: kiểm thử không có GPU.

Bảng giải pháp có nhiều lớp chiều sâu, thẻ dữ liệu nổi và nút **Tách lớp giao diện**. Thẻ dịch vụ, quy trình và phần công ty phản hồi theo con trỏ; hai phần giới thiệu bổ sung có hình cầu, khối lập phương và kiến trúc ba lớp bằng CSS 3D. Không cần tải mô hình 3D hoặc thêm dependency.

Nút **Tạm dừng chuyển động** ở góc màn hình dừng chuyển động toàn trang, bao gồm hero và phản hồi nghiêng. Các animation CSS dừng ngoài viewport hoặc khi tab ẩn; reduced motion được cập nhật ngay khi thiết bị thay đổi cài đặt. Mobile giảm góc nghiêng và khoảng cách giữa các lớp để giữ nội dung trong màn hình.

## Kiểm tra

```sh
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

Playwright tự khởi chạy server phục vụ bản xuất tĩnh ở cổng 3100. Bộ test bao gồm hành trình dịch vụ → biểu mẫu → tải tệp, validation, menu mobile, keyboard tabs, FAQ, 404, ảnh chia sẻ, no-JavaScript, reduced motion, WebGL/context loss và axe WCAG. Kết quả và giới hạn nằm trong `tasks/verification.md`.

## Trước khi phát hành

Cần xác nhận địa chỉ đầy đủ, thông tin liên hệ, nội dung giới thiệu/phạm vi dịch vụ; hoàn thiện kênh tiếp nhận nếu muốn gửi trực tiếp. Đo lại trên hosting và thiết bị thật, kiểm tra Safari/Firefox/iOS/Android.
