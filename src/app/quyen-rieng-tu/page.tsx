import type { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = { title: 'Quyền riêng tư' };
export default function PrivacyPage() {
  return (
    <main id="noi-dung" className="legal-page container">
      <Link className="text-link" href="/">
        ← Về trang chủ
      </Link>
      <span className="eyebrow">DEV.ONE / QUYỀN RIÊNG TƯ</span>
      <h1>
        Thông tin của bạn,
        <br />
        được xử lý rõ ràng.
      </h1>
      <p>Thông tin dưới đây mô tả cách phiên bản website hiện tại xử lý dữ liệu.</p>
      <h2>Biểu mẫu chuẩn bị yêu cầu</h2>
      <p>
        Họ tên, thông tin liên hệ, doanh nghiệp, dịch vụ và nội dung dự án bạn nhập chỉ được xử lý
        trong trình duyệt để tạo bản yêu cầu. Website không tự động gửi những thông tin này đến
        DEV.ONE và không lưu vào cơ sở dữ liệu. Tải lại trang sẽ xóa nội dung chưa tải về.
      </p>
      <h2>Tải tài liệu và gửi email</h2>
      <p>
        Khi chọn tải bản yêu cầu, tài liệu được lưu trên thiết bị của bạn. Nếu có nút mở email, nội
        dung được chuyển đến ứng dụng email do bạn sử dụng; bạn quyết định có gửi hay không. Việc
        gửi và lưu email tuân theo cài đặt và chính sách của nhà cung cấp email của bạn.
      </p>
      <h2>Cookie và dịch vụ bên ngoài</h2>
      <p>
        Phiên bản này không tích hợp công cụ phân tích hành vi, quảng cáo hoặc cookie theo dõi.
        Phông chữ và tài sản thương hiệu được phục vụ cùng website. Máy chủ vận hành có thể ghi
        thông tin kỹ thuật như đường dẫn và địa chỉ IP trong nhật ký truy cập, tùy cấu hình hosting.
      </p>
      <h2>Thông tin doanh nghiệp</h2>
      <p>
        Công ty TNHH Công nghệ và Phần mềm DEV.ONE, TP. Bắc Ninh, Việt Nam. Giám đốc: Nguyễn Tuấn
        Minh.
      </p>
      <p>
        Nội dung này cần được cập nhật trước khi website bổ sung kênh tiếp nhận trực tuyến, công cụ
        phân tích hoặc dịch vụ xử lý dữ liệu khác.
      </p>
    </main>
  );
}
