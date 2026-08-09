import Image from "next/image";
import Link from "next/link";

import livesData from "@/data/lives.json";

import type { LiveEvent } from "@/types/content";


function getTodayInJapan(): string {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}


function formatLiveDate(date: string) {
  const [year, month, day] =
    date.split("-").map(Number);

  const parsedDate = new Date(
    Date.UTC(year, month - 1, day),
  );

  const weekday =
    new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      timeZone: "UTC",
    })
      .format(parsedDate)
      .toUpperCase();

  return {
    date: `${year}.${String(month).padStart(
      2,
      "0",
    )}.${String(day).padStart(2, "0")}`,
    weekday,
  };
}


export default function LivePage() {
  const today = getTodayInJapan();

  const lives = (livesData as LiveEvent[])
    .filter((live) => live.published)
    .sort((a, b) => a.date.localeCompare(b.date));

  const upcomingLives = lives.filter(
    (live) => live.date >= today,
  );

  const pastLives = lives
    .filter((live) => live.date < today)
    .reverse();

  return (
    <main className="live-page">
      <div className="live-page__container">

        {/* =====================================
            Header
        ===================================== */}

        <header className="live-page__header">
          <h1 className="live-page__label">
            LIVE
          </h1>
        </header>


        {/* =====================================
            Upcoming
        ===================================== */}

        <section className="live-page__section">
          <p className="live-page__section-label">
            UPCOMING
          </p>

          {upcomingLives.length > 0 ? (
            <div className="live-page__list">
              {upcomingLives.map((live) => {
                const formattedDate =
                  formatLiveDate(live.date);

                return (
                  <article
                    key={live.id}
                    className="live-page__item"
                  >
                    {live.image && (
                      <>
                        {live.detailUrl ? (
                          <Link
                            href={live.detailUrl}
                            className="live-page__image"
                            aria-label={`${live.title}の詳細を見る`}
                          >
                            <Image
                              src={live.image}
                              alt=""
                              fill
                              sizes="(max-width: 768px) 100vw, 32vw"
                            />
                          </Link>
                        ) : (
                          <div className="live-page__image">
                            <Image
                              src={live.image}
                              alt=""
                              fill
                              sizes="(max-width: 768px) 100vw, 32vw"
                            />
                          </div>
                        )}
                      </>
                    )}

                    <div className="live-page__content">
                      <p className="live-page__date">
                        <span className="live-page__date-main">
                          {formattedDate.date}
                        </span>

                        <span className="live-page__weekday">
                          {formattedDate.weekday}
                        </span>
                      </p>

                      <h2 className="live-page__item-title">
                        {live.title}
                      </h2>

                      <div className="live-page__place">
                        <p className="live-page__venue">
                          {live.venue}
                        </p>

                        {live.area && (
                          <p className="live-page__area">
                            {live.area}
                          </p>
                        )}
                      </div>

                      {live.artists.length > 0 && (
                        <p className="live-page__artists">
                          {live.artists.join(" / ")}
                        </p>
                      )}

                      {(live.open || live.start) && (
                        <p className="live-page__meta">
                          {live.open && (
                            <span>
                              OPEN {live.open}
                            </span>
                          )}

                          {live.open && live.start && (
                            <span aria-hidden="true">
                              {" / "}
                            </span>
                          )}

                          {live.start && (
                            <span>
                              START {live.start}
                            </span>
                          )}
                        </p>
                      )}

                      {(live.advancePrice ||
                        live.doorPrice) && (
                        <p className="live-page__meta">
                          {live.advancePrice && (
                            <span>
                              前売 {live.advancePrice}
                            </span>
                          )}

                          {live.advancePrice &&
                            live.doorPrice && (
                              <span aria-hidden="true">
                                {" / "}
                              </span>
                            )}

                          {live.doorPrice && (
                            <span>
                              当日 {live.doorPrice}
                            </span>
                          )}
                        </p>
                      )}

                      <div className="live-page__actions">
                        {live.cancelled ? (
                          <p className="live-page__status">
                            CANCELLED
                          </p>
                        ) : (
                          <>
                            {live.detailUrl && (
                              <Link
                                href={live.detailUrl}
                                className="live-page__detail-link"
                              >
                                詳細を見る
                                <span aria-hidden="true">
                                  {" →"}
                                </span>
                              </Link>
                            )}

                            {live.soldOut && (
                              <span className="live-page__status">
                                SOLD OUT
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="live-page__empty">
              現在、予定されている公演はありません。
            </p>
          )}
        </section>


        {/* =====================================
            Past
        ===================================== */}

        {pastLives.length > 0 && (
          <section className="live-page__section live-page__section--past">
            <p className="live-page__section-label">
              PAST
            </p>

            <div className="live-page__past-list">
              {pastLives.map((live) => {
                const formattedDate =
                  formatLiveDate(live.date);

                const content = (
                  <>
                    <p className="live-page__past-date">
                      {formattedDate.date}
                    </p>

                    <p className="live-page__past-title">
                      {live.title}
                    </p>

                    <p className="live-page__past-venue">
                      {live.venue}
                    </p>

                    {live.detailUrl && (
                      <span
                        className="live-page__past-arrow"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    )}
                  </>
                );

                if (live.detailUrl) {
                  return (
                    <Link
                      key={live.id}
                      href={live.detailUrl}
                      className="live-page__past-item"
                    >
                      {content}
                    </Link>
                  );
                }

                return (
                  <div
                    key={live.id}
                    className="live-page__past-item live-page__past-item--static"
                  >
                    {content}
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}