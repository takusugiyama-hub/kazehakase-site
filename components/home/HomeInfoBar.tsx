import Image from "next/image";
import Link from "next/link";

import livesData from "@/data/lives.json";

import type {
  LiveEvent,
} from "@/types/content";

function getTodayInJapan(): string {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function formatLiveDate(date: string) {
  const [year, month, day] = date
    .split("-")
    .map(Number);

  const parsedDate = new Date(
    Date.UTC(
      year,
      month - 1,
      day,
    ),
  );

  const weekday =
    new Intl.DateTimeFormat(
      "en-US",
      {
        weekday: "short",
        timeZone: "UTC",
      },
    )
      .format(parsedDate)
      .toUpperCase();

  return {
    date: `${year}.${String(
      month,
    ).padStart(2, "0")}.${String(
      day,
    ).padStart(2, "0")}`,
    weekday,
  };
}

function getNextLive(): LiveEvent | null {
  const today = getTodayInJapan();

  const upcomingLives = (
    livesData as LiveEvent[]
  )
    .filter(
      (live) =>
        live.published &&
        !live.cancelled &&
        live.date >= today,
    )
    .sort(
      (a, b) =>
        a.date.localeCompare(b.date),
    );

  return upcomingLives[0] ?? null;
}

export function HomeInfoBar() {
  const nextLive = getNextLive();

  if (!nextLive) {
    return null;
  }

  const formattedDate =
    formatLiveDate(nextLive.date);

  return (
    <section className="home-info-bar">
      <div className="home-info-bar__inner">
        {/* =====================================
            NEXT LIVE
        ===================================== */}

        <div className="home-info-bar__live">
          <p className="home-info-bar__label">
            NEXT LIVE
          </p>

          <p className="home-info-bar__date">
            <span className="home-info-bar__date-main">
              {formattedDate.date}
            </span>

            <span className="home-info-bar__weekday">
              {formattedDate.weekday}
            </span>
          </p>

          <p className="home-info-bar__venue">
            <span aria-hidden="true">
              @
            </span>{" "}
            {nextLive.venue}

            {nextLive.area && (
              <span>
                ・{nextLive.area}
              </span>
            )}
          </p>

          {(nextLive.open ||
            nextLive.start) && (
            <p className="home-info-bar__time">
              {nextLive.open && (
                <span>
                  OPEN {nextLive.open}
                </span>
              )}

              {nextLive.open &&
                nextLive.start && (
                  <span aria-hidden="true">
                    {" / "}
                  </span>
                )}

              {nextLive.start && (
                <span>
                  START {nextLive.start}
                </span>
              )}
            </p>
          )}

          {(nextLive.advancePrice ||
            nextLive.doorPrice) && (
            <p className="home-info-bar__price-line">
              {nextLive.advancePrice && (
                <span>
                  前売{" "}
                  {nextLive.advancePrice}
                </span>
              )}

              {nextLive.advancePrice &&
                nextLive.doorPrice && (
                  <span aria-hidden="true">
                    {" / "}
                  </span>
                )}

              {nextLive.doorPrice && (
                <span>
                  当日{" "}
                  {nextLive.doorPrice}
                </span>
              )}
            </p>
          )}
        </div>

        {/* =====================================
            LIVE DETAILS
        ===================================== */}

        <div
          className={`home-info-bar__live-details${
            nextLive.image
              ? " home-info-bar__live-details--with-image"
              : ""
          }`}
        >
          {nextLive.image && (
            <div className="home-info-bar__visual">
              <Image
                src={nextLive.image}
                alt={`${nextLive.title}のイベントビジュアル`}
                fill
                sizes="180px"
              />
            </div>
          )}

          <div className="home-info-bar__live-copy">
            <h2 className="home-info-bar__live-title">
              「{nextLive.title}」
            </h2>

            {nextLive.artists.length >
              0 && (
              <p className="home-info-bar__artists">
                出演：
                {nextLive.artists.join(
                  " / ",
                )}
              </p>
            )}

            <div className="home-info-bar__live-action">
              {nextLive.soldOut ? (
                <span className="home-info-bar__sold-out">
                  SOLD OUT
                </span>
              ) : (
                <Link
                  href={`/live/${nextLive.date}`}
                  className="home-info-bar__detail-link"
                >
                  詳細を見る
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}