'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Icon } from './icon';

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="DEV.ONE — Trang chủ">
      <span className="brand-crop">
        <Image
          src="/brand/dev-one-original.png"
          alt="DEV.ONE — Software Outsourcing"
          width={1254}
          height={1254}
          priority
          sizes="240px"
        />
      </span>
    </Link>
  );
}
const links = [
  ['Dịch vụ', '/#dich-vu'],
  ['Giải pháp', '/#giai-phap'],
  ['Quy trình', '/#quy-trinh'],
  ['Về chúng tôi', '/#ve-dev-one'],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('keydown', close);
    document.addEventListener('pointerdown', outside);
    return () => {
      document.removeEventListener('keydown', close);
      document.removeEventListener('pointerdown', outside);
    };
  }, [open]);
  return (
    <header className="site-header" ref={header}>
      <div className="container header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Điều hướng chính">
          {links.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <Link className="header-cta" href="/#lien-he">
          Trao đổi dự án <Icon name="diagonal" />
        </Link>
        <button
          className="menu-toggle"
          aria-label={open ? 'Đóng menu' : 'Mở menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
          ref={toggle}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>
      <nav id="mobile-menu" className="mobile-nav" aria-label="Điều hướng di động" hidden={!open}>
        {[...links, ['Trao đổi dự án', '/#lien-he']].map(([label, href]) => (
          <Link key={href} href={href} onClick={() => setOpen(false)}>
            {label}
            <Icon name="arrow" />
          </Link>
        ))}
      </nav>
    </header>
  );
}
