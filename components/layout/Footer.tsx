import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__credits">
          <p className="site-footer__copyright">
            © {new Date().getFullYear()} 風博士
          </p>

          <p className="site-footer__made-by">
            made by{" "}
            <a
              href="https://manoii.jp"
              target="_blank"
              rel="noopener noreferrer"
            >
              まのいいりょうし
            </a>
          </p>
        </div>

        <nav
          className="site-footer__navigation"
          aria-label="フッターメニュー"
        >
          <Link href="/">HOME</Link>
          <Link href="/live">LIVE</Link>
          <Link href="/music">MUSIC</Link>
          <Link href="/biography">BIOGRAPHY</Link>
          <Link href="/contact">CONTACT</Link>
        </nav>
      </div>
    </footer>
  );
}