import Image from "next/image";
import Link from "next/link";

export default function LiveDetailPage() {
  return (
    <article className="live-detail">
      {/* =====================================
    Hero
===================================== */}

<section className="live-detail__hero">
  <div className="live-detail__hero-image">
    <Image
      src="/images/live/2026-09-26/visual.jpg"
      alt="歌うように描き、描くように歌う イベントビジュアル"
      fill
      priority
      sizes="100vw"
    />
  </div>

  <div className="live-detail__hero-copy">
    <p className="live-detail__eyebrow">
      2026.09.26 SAT
    </p>

    <h1 className="live-detail__title">
      <span>歌うように描き、</span>
      <span>描くように歌う</span>
    </h1>

    <p className="live-detail__catch">
    </p>

    <p className="live-detail__venue-name">
      クラフト館岩井窯 参考館にて
    </p>

    <Link
  href="/reserve?live=live-20260926"
  className="live-detail__hero-reservation"
>
  RESERVATION
  <span aria-hidden="true"> →</span>
</Link>
  </div>
</section>

<section className="live-detail__section live-detail__intro">
  <div className="live-detail__narrow live-detail__intro-copy">
    <p className="live-detail__lead">
      歌と絵が出会う夜です。
    </p>

    <p>
      岩井窯の参考館で、
      <br />
      お待ちしています。
    </p>
  </div>

  <div className="live-detail__intro-image">
    <Image
      src="/images/live/2026-09-26/iwaigama.jpg"
      alt="クラフト館岩井窯 参考館"
      fill
      sizes="100vw"
    />
  </div>
</section>

      {/* =====================================
          About this night
      ===================================== */}

      <section className="live-detail__section live-detail__about">
        <div className="live-detail__container">
          <p className="live-detail__section-label">
            THIS NIGHT
          </p>

          <div className="live-detail__about-grid">
            <h2 className="live-detail__section-title">
              この夜について
            </h2>

            <div className="live-detail__body">
              <p>
                風博士とChimaの歌に、
                近藤康平がその場で絵を描きます。
              </p>

              <p>
                演奏と絵は別々に進むのではなく、
                一曲ごとにひとつの時間として重なります。
              </p>

              <p>
                歌と絵と場所と食。
                それぞれが少しずつ響き合う夜になればと思っています。
              </p>
            </div>
          </div>
        </div>
      </section>

{/* =====================================
    People
===================================== */}

<section className="live-detail__section live-detail__people">
  <div className="live-detail__container">
    <p className="live-detail__section-label">
      PEOPLE
    </p>

    <div className="live-detail__people-grid">
      {/* 風博士 */}
      <article className="live-detail__person">
        <p className="live-detail__person-category">
          歌う人
        </p>

        <Link
          href="/biography"
          className="live-detail__person-image"
          aria-label="風博士のプロフィールを見る"
        >
          <Image
            src="/images/live/2026-09-26/kazehakase.jpg"
            alt="風博士"
            fill
            sizes="(max-width: 768px) 100vw, 30vw"
          />
        </Link>

        <div className="live-detail__person-meta">
          <h2 className="live-detail__person-name">
            風博士
          </h2>

          <p className="live-detail__person-role">
            歌とギター。 この夜の歌を、風景の中へ置いていきます。
          </p>

          <Link
            href="/biography"
            className="live-detail__person-link"
          >
            風博士について
            <span aria-hidden="true"> →</span>
          </Link>
        </div>
      </article>

      {/* Chima */}
      <article className="live-detail__person">
        <p className="live-detail__person-category">
          歌う人
        </p>

        <a
          href="#"
          className="live-detail__person-image"
          aria-label="Chimaのプロフィールを見る"
        >
          <Image
            src="/images/live/2026-09-26/chima.jpg"
            alt="Chima"
            fill
            sizes="(max-width: 768px) 100vw, 30vw"
          />
        </a>

        <div className="live-detail__person-meta">
          <h2 className="live-detail__person-name">
            Chima
          </h2>

          <p className="live-detail__person-role">
            歌と音。 透明な声とともに、この夜の風景をつくります。

          </p>

          <a
            href="https://chimala.net/"
            className="live-detail__person-link"
          >
            OFFICIAL SITE
            <span aria-hidden="true"> →</span>
          </a>
        </div>
      </article>

      {/* 近藤康平 */}
      <article className="live-detail__person">
        <p className="live-detail__person-category">
          描く人
        </p>

        <a
          href="#"
          className="live-detail__person-image"
          aria-label="近藤康平のプロフィールを見る"
        >
          <Image
            src="/images/live/2026-09-26/kohei-kondo.jpg"
            alt="近藤康平"
            fill
            sizes="(max-width: 768px) 100vw, 30vw"
          />
        </a>

        <div className="live-detail__person-meta">
          <h2 className="live-detail__person-name">
            近藤康平
          </h2>

          <p className="live-detail__person-role">
            ライブドローイング。 音楽を受け取り、その場で一枚の絵へと変えていきます。

          </p>
{/*
          <p className="live-detail__person-note">
            今回のイベントビジュアルを制作。
          </p>
*/}
          <a
            href="https://www.instagram.com/kondo1975/"
            className="live-detail__person-link"
          >

            INSTAGRAM
            <span aria-hidden="true"> →</span>
          </a>
        </div>
      </article>
    </div>
  </div>
</section>

      {/* =====================================
          Drawing
      ===================================== */}

      <section className="live-detail__section live-detail__drawing">
        <div className="live-detail__container">
          <p className="live-detail__section-label">
            DRAWING
          </p>

          <div className="live-detail__feature-grid">
            <h2 className="live-detail__section-title">
              一曲ごとに、
              <br />
              一枚の絵。
            </h2>

            <div className="live-detail__body">
              <p>
                ライブドローイングでは、
                一曲が終わるごとに一枚の作品が完成します。
              </p>

              <p>
                その場、その瞬間、その歌から生まれた絵です。
              </p>

              <p>
                完成した作品は、
                ライブ終了後に会場でご購入いただけます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          Place
      ===================================== */}

      <section className="live-detail__section live-detail__place">
        <div className="live-detail__container">
          <p className="live-detail__section-label">
            PLACE
          </p>

          <div className="live-detail__media-grid">
            <div className="live-detail__media-image">
              <Image
                src="/images/live/2026-09-26/place.jpg"
                alt="クラフト館岩井窯・参考館"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="live-detail__media-copy">
              <h2 className="live-detail__section-title">
                クラフト館岩井窯
                <br />
                参考館
              </h2>

              <div className="live-detail__body">
                <p>
                  山本教行氏が作品制作のために、
                  世界各地から集めてきた手工芸品や参考資料が
                  展示されている場所です。
                </p>

                <p>
                  長い時間をかけて集められたものたちに囲まれながら、
                  この夜だけの歌と絵が生まれます。
                </p>

                <p>
                  この場所で開催できることそのものが、
                  今回のイベントの大切な一部です。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          Food
      ===================================== */}

      <section className="live-detail__section live-detail__food">
        <div className="live-detail__container">
          <p className="live-detail__section-label">
            FOOD
          </p>

          <div className="live-detail__media-grid live-detail__media-grid--reverse">
            <div className="live-detail__media-image">
              <Image
                src="/images/live/2026-09-26/curry.jpg"
                alt="まのいいカレー"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="live-detail__media-copy">
              <h2 className="live-detail__section-title">
                まのいいカレー
              </h2>

              <div className="live-detail__body">
                <p>
                  岩井窯では、「花まつり」と「ふゆむかえまつり」が毎年開かれています。
                </p>
                
                <p>
                  これまでに数度、
                  「まのいいりょうし」として
                  手作りのスパイスカレーで出店してきました。
                </p>

                <p>
                  この夜も鍋を仕込みます。
                  音楽と絵だけでなく、
                  お腹も満たして帰っていただけたらうれしいです。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* =====================================
    Information
===================================== */}

<section className="live-detail__section live-detail__information">
  <div className="live-detail__container">

    <p className="live-detail__section-label">
      INFORMATION
    </p>

    <div className="live-detail__info-layout">

      <h2 className="live-detail__section-title">
        開催情報
      </h2>

      <div className="live-detail__info-content">

        {/* 日付 */}
        <p className="live-detail__info-date">
          2026.09.26
          <span>SAT</span>
        </p>

        {/* 会場 */}
        <p className="live-detail__info-place">
          <a
            href="https://maps.app.goo.gl/NBzNhN3c9nY9P1C88"
            target="_blank"
            rel="noopener noreferrer"
          >
            クラフト館岩井窯 参考館
            <span
              className="live-detail__external"
              aria-hidden="true"
            >
              ↗
            </span>
          </a>
        </p>

        {/* 出演 */}
        <p className="live-detail__info-artists">
          Chima（from 札幌）
          <span> / </span>
          風博士
          <span> / </span>
          近藤康平（ライブドローイング）
        </p>

        {/* 時間・料金 */}
        <div className="live-detail__info-meta">
          <p>
            OPEN 17:30
            <span> / </span>
            START 18:30
          </p>

          <p>
            前売 3,500円
            <span> / </span>
            当日 4,000円
          </p>
        </div>

      </div>

    </div>
  </div>
</section>

      {/* =====================================
          Reservation
      ===================================== */}

      <section className="live-detail__section live-detail__reservation">
  <div className="live-detail__narrow">
    <p className="live-detail__section-label">
      RESERVATION
    </p>

    <h2 className="live-detail__section-title">
      ご予約
    </h2>

    <p className="live-detail__reservation-intro">
      ご予約はこちらから承ります。
    </p>

    <Link
  href="/reserve?live=live-20260926"
  className="live-detail__reservation-link"
>
  このライブを予約する
</Link>
  </div>
</section>
    </article>
  );
}