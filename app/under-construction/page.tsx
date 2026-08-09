import type { Metadata } from "next";
import Image from "next/image";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "風博士 | Under Construction",
  description: "風博士のウェブサイトは現在準備中です。",
  robots: {
    index: false,
    follow: false,
  },
};

export default function UnderConstructionPage() {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <Image
          src="/images/kazehakase-logo.png"
          alt="風博士"
          width={240}
          height={120}
          className={styles.logo}
          priority
        />

        <p className={styles.english}>UNDER CONSTRUCTION</p>

        <div className={styles.message}>
          <p>ただいま、準備中です。</p>
          <p>
            新しいウェブサイトを
            <br />
            もうすぐ公開します。
          </p>
        </div>
      </div>
    </main>
  );
}