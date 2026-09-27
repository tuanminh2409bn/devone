import Link from 'next/link';
export default function NotFound() {
  return (
    <main id="noi-dung" className="not-found container">
      <span className="eyebrow">404 / DEV.ONE</span>
      <h1>
        Trang này chưa có
        <br />
        trong hành trình.
      </h1>
      <p>Hãy quay về trang chủ để khám phá các giải pháp của DEV.ONE.</p>
      <Link className="button button-primary" href="/">
        Về trang chủ →
      </Link>
    </main>
  );
}
