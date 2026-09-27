# Kế hoạch website DEV.ONE

Ngày lập: 26/09/2026. Trạng thái: đã triển khai bản production local; tiếp nhận trực tuyến và phát hành còn chờ thông tin. Xem [verification.md](verification.md) để biết kết quả thực tế và các khác biệt so với kế hoạch.

## Mục tiêu và phạm vi

Website giới thiệu CÔNG TY TNHH CÔNG NGHỆ VÀ PHẦN MỀM DEV.ONE, trụ sở tại TP. Bắc Ninh, giám đốc Nguyễn Tuấn Minh, theo thông tin chủ doanh nghiệp cung cấp. Thể hiện năng lực gia công và phát triển phần mềm theo yêu cầu; dẫn khách hàng từ tìm hiểu dịch vụ đến gửi yêu cầu tư vấn.

Giả định: tiếng Việt là ngôn ngữ chính; khách hàng mục tiêu là doanh nghiệp cần website, ứng dụng mobile, CRM, ERP hoặc phần mềm riêng. Nội dung cần đủ rõ để người xem hiểu dịch vụ và tìm thấy nút liên hệ ngay ở màn hình đầu.

Workspace hiện trống, chưa có Git, manifest hoặc stack sẵn có. Đây là kế hoạch, chưa cài thư viện, tạo backend, dùng credentials hay triển khai hosting.

## Hướng sáng tạo: DEV.ONE — Từ ý tưởng đến hệ thống vận hành

- Phong cách công nghệ cao, chính xác, có chiều sâu; nền midnight navy `#070B14`, bề mặt `#101827`, chữ `#F4F7FB`, điểm nhấn cyan `#5DE4FF` và xanh điện `#506BFF`. Kiểm tra tương phản khi triển khai.
- Font Be Vietnam Pro xuyên suốt, hỗ trợ đầy đủ dấu tiếng Việt; dùng 400/500/600/700, tiêu đề lớn với khoảng cách thoáng, tránh chữ quá mảnh và dòng quá dài.
- Bố cục desktop 12 cột, chiều rộng nội dung tối đa khoảng 1280 px; mobile một cột, CTA dễ chạm, không tràn ngang ở 360 px.
- Wordmark DEV.ONE dạng chữ là phương án tạm khi chưa có logo chính thức. Ảnh văn phòng, nhân sự, dự án dùng tài sản thật đã được phép công bố.
- Kết hợp nền tối với một vùng sáng cho thông tin doanh nghiệp để tạo nhịp đọc. Tránh lặp lại quá nhiều thẻ kính và nền chuyển sắc.

### Màn hình mở đầu

Nội dung bên trái, lõi 3D bên phải; trên mobile, ưu tiên tiêu đề và CTA trước phần minh họa.

> Phần mềm được thiết kế cho cách doanh nghiệp bạn vận hành.
>
> DEV.ONE phát triển website, ứng dụng mobile, CRM, ERP và phần mềm theo yêu cầu — từ ý tưởng ban đầu đến triển khai và đồng hành vận hành.

CTA chính: **Trao đổi dự án** → biểu mẫu liên hệ. CTA phụ: **Khám phá giải pháp** → nhóm dịch vụ. Dòng định danh: **DEV.ONE · Bắc Ninh, Việt Nam**.

Thông điệp về đồng hành vận hành là nội dung đề xuất; chủ doanh nghiệp cần xác nhận phạm vi dịch vụ thực tế trước công bố.

## Cấu trúc nội dung

| Khu vực | Nội dung | Hành động / kết quả mong muốn |
|---|---|---|
| Header | Logo, Dịch vụ, Giải pháp, Quy trình, Về DEV.ONE, Liên hệ | Điều hướng gọn và CTA luôn dễ tìm |
| Hero | Thông điệp chính, định danh, lõi 3D, hai CTA | Hiểu công ty làm gì và bắt đầu tìm hiểu |
| Dịch vụ | Gia công phần mềm; phần mềm theo yêu cầu; ứng dụng mobile; website; CRM; ERP | Chọn dịch vụ và đi đến mô tả cụ thể |
| Giải pháp | Ví dụ luồng bán hàng CRM, vận hành ERP, trải nghiệm mobile/web | Liên hệ công nghệ với nhu cầu kinh doanh |
| Năng lực / dự án | Bài toán → cách giải quyết → phạm vi bàn giao; kết quả chỉ khi có bằng chứng | Tạo tin cậy bằng thông tin có thể xác minh |
| Quy trình | Khảo sát → phân tích → thiết kế → phát triển/kiểm thử → bàn giao/đồng hành | Hiểu cách hợp tác và các mốc phản hồi |
| Về DEV.ONE | Tên pháp lý, TP. Bắc Ninh, giám đốc Nguyễn Tuấn Minh, cách làm việc | Nhận diện doanh nghiệp và người chịu trách nhiệm |
| FAQ | Cách nhận báo giá, đầu vào cần chuẩn bị, thay đổi phạm vi, bàn giao/bảo trì | Giải đáp trước khi liên hệ; điều khoản do công ty xác nhận |
| Liên hệ | Tên, email hoặc điện thoại, dịch vụ quan tâm, mô tả nhu cầu; ngân sách tùy chọn | Gửi yêu cầu với trạng thái thành công/thất bại rõ ràng |
| Footer | Thông tin pháp lý đã xác nhận, kênh liên hệ thật, quyền riêng tư | Củng cố tin cậy và minh bạch dữ liệu |

Không tự tạo số năm kinh nghiệm, số dự án, logo khách hàng, chứng nhận, lời chứng thực hay SLA. Khi chưa có portfolio, dùng mô hình minh họa được ghi rõ là demo hoặc bỏ mục dự án. Không giả định DEV.ONE là tên miền đã sở hữu.

### Phạm vi phát hành đầu

- Trang chủ có đầy đủ hành trình giới thiệu → tìm hiểu → liên hệ.
- Nhóm trang chi tiết dịch vụ `/dich-vu/[slug]` từ một template chung, mỗi trang có bài toán, phạm vi, đầu ra và CTA riêng.
- Trang quyền riêng tư phản ánh đúng dữ liệu thu thập và bên xử lý thực tế.
- Giới thiệu, quy trình và liên hệ đặt trên trang chủ ở bản đầu. Dự án chi tiết chỉ mở khi có hồ sơ thật.
- Blog, CMS, đăng nhập, cổng khách hàng và đa ngôn ngữ để giai đoạn sau nếu phát sinh nhu cầu.

## Kịch bản chuyển động và 3D

| Thành phần | Hiệu ứng đề xuất | Giới hạn và phương án dự phòng |
|---|---|---|
| Lõi DEV.ONE | Cụm hình học mô-đun với vật liệu kim loại/kính, viền sáng tiết chế; các vệ tinh Web, Mobile, CRM, ERP liên kết quanh lõi | Một canvas chủ đạo; tiêu đề và CTA là HTML, không phụ thuộc canvas |
| Tương tác hero | Xoay nhẹ theo con trỏ, các mô-đun tách/ghép theo một đoạn cuộn ngắn | Không bắt giữ cuộn; trên thiết bị cảm ứng giảm chuyển động |
| Ánh sáng và vật liệu | Shader TSL tạo dòng sáng di chuyển, phản chiếu môi trường và glow nhẹ | Giảm hoặc bỏ hậu kỳ khi vượt ngân sách GPU |
| Dịch vụ | Reveal theo nhóm, hover/focus viền sáng; nhấn chọn dẫn đến trang dịch vụ | Nội dung luôn truy cập được bằng bàn phím, không lệ thuộc hover |
| Quy trình | Đường tiến trình sáng dần theo vị trí đọc | Luồng nội dung vẫn tuyến tính khi JavaScript hoặc animation tắt |
| CTA và menu | Chuyển trạng thái ngắn, phản hồi rõ khi chạm hoặc focus | Không dùng con trỏ thay thế, âm thanh tự phát hay loading intro chặn trang |

Chuyển động giao diện khoảng 160–240 ms, reveal 400–600 ms, biên độ nhỏ. Có nút tạm dừng chuyển động trang trí kéo dài; tôn trọng `prefers-reduced-motion` bằng hình tĩnh và bỏ parallax. Dừng render khi canvas ngoài màn hình hoặc tab ẩn; giải phóng tài nguyên khi unmount. Nếu mất context hoặc không hỗ trợ đồ họa, hiển thị poster tĩnh có bố cục tương đương.

### Quyết định công nghệ cần thử nghiệm sớm

Đề xuất Next.js App Router + TypeScript, CSS Modules/CSS variables cho giao diện, Motion cho chuyển động UI, Three.js + React Three Fiber cho cảnh 3D. Giữ nội dung tĩnh ở server; tách scene vào client và tải riêng sau nội dung chính. Chốt bộ phiên bản tương thích khi triển khai, không dùng nhãn “latest” làm tiêu chí chất lượng.

WebGPURenderer của Three.js ưu tiên WebGPU và có backend WebGL 2 dự phòng. Thử nghiệm ngay một scene nhỏ dùng TSL trên hai backend; chỉ giữ các hiệu ứng hoạt động ổn định trên cả hai. Không mặc định shader hoặc thư viện hậu kỳ viết cho WebGLRenderer sẽ tương thích. Nếu spike không đạt, chọn WebGL 2 ổn định cho bản đầu và giữ hướng mở rộng WebGPU. Nguồn: [Three.js WebGPURenderer](https://threejs.org/manual/pages/webgpurenderer).

Be Vietnam Pro được tự phục vụ qua `next/font`, giới hạn các độ đậm cần thiết để giảm chi phí tải; kiểm tra dấu tiếng Việt và layout shift. Nguồn: [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts).

Motion phụ trách reveal, trạng thái và chuyển động UI; CSS đảm nhiệm tương tác đơn giản. Không thêm nhiều animation engine trùng nhiệm vụ. Nguồn: [Motion for React](https://motion.dev/docs/react).

Không cần database hoặc CMS cho bản giới thiệu đầu. Nội dung nằm trong module dữ liệu có kiểu. Form chỉ cần backend tối thiểu cùng dịch vụ tiếp nhận được chủ doanh nghiệp chọn; việc sử dụng credentials và kết nối dịch vụ thật cần được cho phép riêng.

## Tiêu chí nghiệm thu

- Nội dung chính có sẵn trong HTML; navigation, trang dịch vụ và đường đến liên hệ hoạt động cả khi 3D lỗi.
- Hiển thị tốt tại 360, 390, 768, 1024 và 1440 px; kiểm tra Chrome, Safari, Firefox, iOS Safari và Android Chrome. Ghi rõ thiết bị và phiên bản thực tế khi test.
- Be Vietnam Pro hiển thị đúng tiếng Việt; menu, form và CTA sử dụng được bằng bàn phím, có focus rõ; tương phản mục tiêu WCAG AA.
- Kiểm tra cả WebGPU, WebGL 2, không GPU, reduced motion, mất context và tab ẩn. Mục tiêu 60 fps trên desktop đại diện, ít nhất 30 fps ở cấu hình mobile giảm chất lượng; nếu không đạt thì dùng poster. Chọn thiết bị đo cụ thể ở bước thử nghiệm.
- Ngân sách đề xuất: tổng tải lần đầu trước 3D không quá 1 MB nén; phần 3D tải bổ sung không quá 2 MB nén, không chặn tiêu đề và CTA. Đo qua production build, không suy từ kích thước source.
- Mục tiêu Core Web Vitals sau có dữ liệu thực: LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1 ở phân vị 75, tách mobile/desktop. Trước phát hành dùng Lighthouse và kiểm tra tương tác thực; không coi Lighthouse là bằng chứng INP ngoài thực tế. Nguồn: [Web Vitals](https://web.dev/articles/vitals).
- Form có kiểm tra dữ liệu ở server, giới hạn độ dài/tần suất và chống gửi lặp; giữ nội dung khi gửi lỗi. Chỉ báo thành công khi hệ thống tiếp nhận đã xác nhận. Không ghi toàn bộ thông tin khách hàng vào log.
- Title/description từng trang, canonical theo domain thật, sitemap, robots, ảnh chia sẻ và Organization structured data chỉ dùng thông tin đã xác minh.
- Typecheck, lint, production build và test luồng trọng yếu đạt; mọi giới hạn kiểm thử phải được ghi nhận rõ.

## Trình tự và mốc bàn giao

1. Chốt nội dung, nhận diện và wireframe desktop/mobile.
2. Dựng hero tĩnh cùng điều hướng; thử nghiệm 3D và fallback sớm.
3. Hoàn thiện dịch vụ, giải pháp, quy trình và giới thiệu doanh nghiệp.
4. Hoàn thiện liên hệ; kết nối tiếp nhận sau khi chốt đích đến và quyền truy cập.
5. Tinh chỉnh motion, accessibility, SEO và hiệu năng; kiểm thử toàn bộ luồng.
6. Bàn giao bản preview để review; triển khai công khai là bước riêng khi được cho phép.

Các đầu việc có phụ thuộc và cách kiểm chứng nằm trong [todo.md](todo.md). Ước lượng tham khảo: 10–15 ngày làm việc cho một lập trình viên giàu kinh nghiệm với tài sản/nội dung sẵn có và phản hồi trong ngày. Mô hình 3D thiết kế riêng phức tạp hoặc thiếu nội dung có thể kéo dài; đây chưa phải cam kết tiến độ.

## Rủi ro và cách xử lý

| Rủi ro | Cách xử lý |
|---|---|
| 3D đẹp nhưng chậm, nóng máy | Spike sớm; giới hạn DPR, vật liệu và hậu kỳ; tự giảm chất lượng, dừng render và fallback |
| Giao diện thu hút nhưng dịch vụ khó hiểu | Thông điệp và CTA bằng HTML rõ ràng; mô tả theo bài toán và đầu ra |
| Thiếu tài sản hoặc dữ liệu doanh nghiệp | Dùng wordmark và demo có nhãn; không hư cấu thông tin; chốt trước xuất bản |
| Form mất yêu cầu hoặc báo thành công giả | Kiểm thử tiếp nhận thật có cho phép, xử lý lỗi/thử lại và giới hạn gửi |
| Tăng phạm vi do blog/CMS/đa ngôn ngữ | Để ngoài bản đầu; đánh giá riêng khi có nhu cầu |

## Thông tin cần bổ sung trước khi phát hành

- Logo hoặc cho phép dùng wordmark; email, hotline/Zalo chính thức.
- Địa chỉ đầy đủ dùng để công bố, tên pháp lý và mã số doanh nghiệp đã xác nhận.
- Domain đã sở hữu hoặc dự kiến; đơn vị hosting và nơi nhận yêu cầu tư vấn.
- Hồ sơ dự án, ảnh nhân sự/văn phòng và quyền sử dụng; ảnh giám đốc nếu muốn công bố.
- Phạm vi bảo hành, bảo trì, quyền sở hữu mã nguồn và cam kết dịch vụ thực tế.

Thông tin còn thiếu không ngăn việc làm bản thiết kế. Thêm dependencies production, dùng credentials, thay đổi hợp đồng/schema, push và deploy phải theo phạm vi được người dùng cho phép.
