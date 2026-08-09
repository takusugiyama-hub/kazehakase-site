"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MobileMenu } from "./MobileMenu";

const navigation = [
  { label: "HOME", href: "/" },
  { label: "LIVE", href: "/live" },
  { label: "MUSIC", href: "/music" },
  { label: "BIOGRAPHY", href: "/biography" },
  { label: "CONTACT", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`site-header${
        isScrolled ? " site-header--scrolled" : ""
      }`}
    >
      <div className="site-header__inner">
        <Link
          href="/"
          className="site-header__logo"
          aria-label="風博士 ホーム"
        >
          <Image
            src="/images/kazehakase-logo.png"
            alt="風博士"
            width={180}
            height={70}
            priority
          />

          <span className="site-header__logo-en">
            KAZEHAKASE
          </span>
        </Link>

        <nav
          className="site-header__navigation"
          aria-label="メインメニュー"
        >
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <MobileMenu items={navigation} />
      </div>
    </header>
  );
}