# Đầu việc triển khai website DEV.ONE

Trạng thái cập nhật 26/09/2026: đã có bản production local. Các tiêu chí chưa đủ bằng chứng vẫn để mở. Đường dẫn dưới đây là dự kiến ban đầu; kiến trúc thực tế xem `../README.md`.

| Đầu việc | Trạng thái thực tế |
|---|---|
| T1 | Nội dung và thiết kế đã thể hiện trong website; chờ chủ doanh nghiệp review, không tạo wireframe riêng |
| T2 | Hoàn thành, build/lint/typecheck và responsive đã qua |
| T3 | WebGPU và WebGL 2 đã chạy; có Lighthouse, chưa có benchmark fps thiết bị thực |
| T4 | Có poster, reduced motion, pause, context fallback; chưa kiểm tra đủ thiết bị thực |
| T5–T6 | Trang dịch vụ, hành trình liên hệ, công ty, quy trình, FAQ đã triển khai |
| T7 | Hoàn thành luồng chuẩn bị/tải TXT và validation; gửi mạng thuộc T8 |
| T8 | Chờ kênh nhận chính thức và quyền tích hợp, chưa triển khai gửi server |
| T9 | Có metadata/OG/sitemap/robots; chờ domain để bật index |
| T10 | 4 unit + 7 E2E đã qua, có báo cáo; còn giới hạn trình duyệt/thiết bị và LCP mobile |

Bằng chứng và phần chưa hoàn thành: [verification.md](verification.md).

## T1 — Nội dung và wireframe
Mô tả: Chuyển thông tin doanh nghiệp thành nội dung và hành trình đọc trên desktop/mobile.
- [x] Nghiệm thu: Có thông điệp hero, sáu dịch vụ, luồng liên hệ; thông tin thiếu được đánh dấu và không hư cấu.
- [ ] Nghiệm thu: Wireframe 390/1440 px thể hiện hierarchy, font Be Vietnam Pro và vùng 3D.
- [ ] Kiểm chứng: Đối chiếu brief; review bản thiết kế và kế hoạch với chủ doanh nghiệp trước triển khai.
Phụ thuộc: Không. Tệp dự kiến: `content/company.ts`, `content/services.ts`, `design/wireframe.html`. Quy mô: M.

## T2 — Nền tảng và hero tĩnh
Mô tả: Khởi tạo stack đã được cho phép; tạo màn hình đầu có thể truy cập và điều hướng.
- [x] Nghiệm thu: Be Vietnam Pro và tokens được dùng nhất quán; hero, navigation và CTA hiển thị khi chưa tải 3D.
- [x] Nghiệm thu: Menu mobile thao tác được bằng bàn phím; không tràn ngang 360 px.
- [x] Kiểm chứng: Lint, typecheck, build; smoke test tải trang và menu trên desktop/mobile.
Phụ thuộc: T1; cho phép thêm các production dependencies đã đề xuất. Tệp dự kiến: manifest/lockfile do công cụ tạo, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `components/site-header.tsx`. Quy mô: M, cộng tệp scaffold tự sinh.

## T3 — Thử nghiệm lõi 3D
Mô tả: Kiểm chứng cảnh mô-đun đơn giản với renderer và vật liệu dự kiến trước khi làm chi tiết.
- [x] Nghiệm thu: Cùng scene chạy trên WebGPU và WebGL 2, hoặc có quyết định chọn WebGL 2 cùng bằng chứng.
- [ ] Nghiệm thu: Ghi kết quả thời gian tải/fps trên thiết bị xác định; không vượt ngân sách đã thống nhất.
- [ ] Kiểm chứng: Production build; test backend cưỡng bức và đo GPU/frame time trong trình duyệt.
Phụ thuộc: T2. Tệp dự kiến: `components/three/dev-one-scene.tsx`, `components/three/core-material.ts`, `tasks/3d-validation.md`. Quy mô: M.

## Checkpoint A — Khả thi về thiết kế và hiệu năng
- [x] Hero tĩnh đọc được, CTA hoạt động; đã chọn renderer bằng thử nghiệm.
- [x] Không có lỗi build; vấn đề tương thích có giải pháp cụ thể trước khi tăng độ phức tạp scene.

## T4 — Hoàn thiện trải nghiệm 3D và fallback
Mô tả: Tích hợp scene vào hero cùng poster và các chế độ chuyển động.
- [x] Nghiệm thu: Tải scene riêng; reduced motion, lỗi GPU và mất context trả về poster; có pause.
- [ ] Nghiệm thu: Dừng render khi ẩn tab/ngoài viewport, dispose khi unmount; mobile giảm chất lượng.
- [ ] Kiểm chứng: Smoke test từng chế độ, đo mạng và fps; nội dung/CTA vẫn truy cập được khi scene lỗi.
Phụ thuộc: T3. Tệp dự kiến: `components/hero-visual.tsx`, `components/three/dev-one-scene.tsx`, `components/three/use-scene-quality.ts`, `public/images/hero-poster.webp`. Quy mô: M.

## T5 — Từ dịch vụ đến yêu cầu tư vấn
Mô tả: Hoàn thiện nhóm dịch vụ và template trang chi tiết với CTA mang theo dịch vụ quan tâm.
- [x] Nghiệm thu: Sáu dịch vụ có nội dung riêng về bài toán, phạm vi và đầu ra; đường dẫn truy cập trực tiếp được.
- [x] Nghiệm thu: CTA chuyển đến liên hệ với lựa chọn phù hợp; truy cập từ bàn phím và mobile tốt.
- [x] Kiểm chứng: Build/static route check; test hành trình chọn dịch vụ → liên hệ và slug không tồn tại.
Phụ thuộc: T2. Tệp dự kiến: `content/services.ts`, `components/services-section.tsx`, `app/dich-vu/[slug]/page.tsx`, `tests/services.spec.ts`. Quy mô: M.

## T6 — Thông tin tạo tin cậy
Mô tả: Thêm giải pháp minh họa, quy trình, giới thiệu và FAQ đã xác nhận.
- [x] Nghiệm thu: Tên doanh nghiệp, Bắc Ninh và Nguyễn Tuấn Minh đúng brief; demo ghi nhãn rõ.
- [x] Nghiệm thu: Không có số liệu hoặc cam kết chưa xác minh; cấu trúc heading và bố cục mobile rõ ràng.
- [ ] Kiểm chứng: Review nội dung; kiểm tra 360/768/1440 px, keyboard và heading outline.
Phụ thuộc: T1, T2. Tệp dự kiến: `content/company.ts`, `components/solutions-section.tsx`, `components/process-section.tsx`, `components/about-section.tsx`, `components/faq-section.tsx`. Quy mô: M.

## Checkpoint B — Hành trình giới thiệu hoàn chỉnh
- [x] Trang chủ và trang dịch vụ có nội dung thật hoặc demo ghi nhãn, không có đường dẫn hỏng.
- [ ] Build và kiểm tra trọng yếu đạt; review hình ảnh desktop/mobile và khả năng đọc khi tắt animation.

## T7 — Biểu mẫu và trạng thái tương tác
Mô tả: Dựng biểu mẫu liên hệ có xác thực và trạng thái lỗi/thành công qua adapter tiếp nhận.
- [x] Nghiệm thu: Yêu cầu tên, ít nhất một kênh liên hệ và mô tả; giới hạn độ dài, lỗi gắn đúng trường.
- [ ] Nghiệm thu: Gửi lỗi giữ dữ liệu; chống nhấn gửi lặp; bản demo không trình bày như đã gửi thật.
- [ ] Kiểm chứng: Test dữ liệu hợp lệ/không hợp lệ, mất mạng, bàn phím và gửi hai lần.
Phụ thuộc: T5. Tệp dự kiến: `components/contact-form.tsx`, `lib/contact-validation.ts`, `lib/contact-client.ts`, `tests/contact-form.test.tsx`. Quy mô: M.

## T8 — Tiếp nhận yêu cầu thật
Mô tả: Kết nối form với nơi nhận đã chọn, xác thực server và cơ chế giới hạn gửi.
- [ ] Nghiệm thu: Chỉ báo thành công sau khi dịch vụ tiếp nhận xác nhận; lỗi cấu hình/provider được xử lý đúng.
- [ ] Nghiệm thu: Không lộ credentials hoặc ghi dữ liệu cá nhân vào log; quyền riêng tư phản ánh luồng dữ liệu thực tế.
- [ ] Kiểm chứng: Test server validation, giới hạn tần suất, timeout/lỗi provider; gửi thử end-to-end vào đích được cho phép.
Phụ thuộc: T7; chủ doanh nghiệp chọn nơi nhận và cho phép dùng dịch vụ/credentials, hợp đồng endpoint mới và dependency nếu cần. Tệp dự kiến: `app/api/contact/route.ts`, `lib/contact-delivery.ts`, `lib/contact-rate-limit.ts`, `app/quyen-rieng-tu/page.tsx`, `tests/contact-api.test.ts`. Quy mô: M.

## Checkpoint C — Liên hệ có thể vận hành
- [ ] Luồng gửi thành công/thất bại và nhận yêu cầu được kiểm chứng; mock không còn trong đường chạy production.
- [x] Nếu chưa có quyền tích hợp, ghi rõ giới hạn và không coi form là hoàn thành.

## T9 — SEO và thông tin chia sẻ
Mô tả: Hoàn thiện metadata, indexability và thông tin doanh nghiệp có cấu trúc.
- [ ] Nghiệm thu: Metadata duy nhất mỗi dịch vụ; sitemap/canonical theo domain đã xác nhận, không để domain giả.
- [ ] Nghiệm thu: Structured data và ảnh chia sẻ đúng thông tin được cung cấp; preview chưa phát hành không bị index ngoài ý muốn.
- [ ] Kiểm chứng: Inspect HTML và metadata, kiểm tra sitemap/robots và bản xem trước liên kết.
Phụ thuộc: T5, T6; domain thật trước phát hành. Tệp dự kiến: `app/layout.tsx`, `app/dich-vu/[slug]/page.tsx`, `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`. Quy mô: M.

## T10 — Kiểm thử, tối ưu và bàn giao preview
Mô tả: Đánh giá hành trình hoàn chỉnh trên production build, sửa trong phạm vi các vấn đề phát hiện.
- [ ] Nghiệm thu: Các tiêu chí trong plan đạt hoặc có giới hạn ghi rõ; không có lỗi console, CTA hỏng hay form báo thành công giả.
- [ ] Nghiệm thu: Bàn giao báo cáo responsive, accessibility, GPU/fallback, tải trang và hướng dẫn cập nhật nội dung.
- [ ] Kiểm chứng: Lint, typecheck, tests, production build; E2E luồng trọng yếu; Lighthouse và profile tương tác trên các thiết bị đã chọn.
Phụ thuộc: T4, T6, T8, T9. Tệp dự kiến: `tests/site.spec.ts`, `tasks/verification.md`, `README.md`; sửa lỗi ở các tệp liên quan theo từng phạm vi nhỏ. Quy mô: M.

## Checkpoint D — Sẵn sàng review phát hành
- [ ] Thông tin pháp lý, liên hệ, tài sản và nội dung được chủ doanh nghiệp xác nhận.
- [x] Bản preview cùng bằng chứng kiểm thử sẵn sàng để review.
- [ ] Chỉ push/deploy sau khi được cho phép riêng; theo dõi Core Web Vitals thực sau phát hành khi có đủ dữ liệu.

## Bổ sung — 3D toàn trang theo yêu cầu 26/09/2026

- [x] Bảng CRM/ERP có độ sâu, animation và tương tác tách/thu gọn lớp.
- [x] Bổ sung nguyên tắc làm việc và giới thiệu hệ sinh thái phần mềm.
- [x] Thêm nghiêng theo con trỏ cho dịch vụ, quy trình và phần công ty; khối CSS 3D cho phần giới thiệu.
- [x] Điều khiển chuyển động toàn trang, reduced motion phản ứng theo cài đặt thiết bị, dừng CSS animation ngoài viewport/tab ẩn.
- [x] Kiểm tra bàn phím, desktop/mobile, production build và 8 E2E; cập nhật bằng chứng trong verification.md.
