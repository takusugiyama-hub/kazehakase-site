import Image from "next/image";
import { RandomLyric } from "./RandomLyric";

export function Hero() {
  return (
    <section className="hero" aria-label="風博士">
      <Image
        src="/images/artist-kazehakase.jpg"
        alt="鳥取砂丘でギターを持つ風博士"
        fill
        priority
        className="hero__image"
        sizes="100vw"
      />

      <div className="hero__content">
        <RandomLyric />
      </div>
    </section>
  );
}