import Image from "next/image";
import Link from "next/link";
import { PastLiveArchive } from "@/components/live/PastLiveArchive";
import livesData from "@/data/lives.json";
import {
  formatLiveDate,
  getTodayInJapan,
} from "@/lib/date";
import type { LiveEvent } from "@/types/content";



export default function LivePage() {
  const today = getTodayInJapan();

  const lives = (livesData as LiveEvent[])
    .filter((live) => live.published)
    .sort((a, b) =>
      a.date.localeCompare(b.date),
    );

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
                const reservationHref =
                  live.reservationUrl ||
                  (live.reservation
                    ? `/reserve/${encodeURIComponent(live.id)}`
                    : "");

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
                            aria-label={`${live.title}の特設ページを見る`}
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

  {live.address && (
    <p className="live-page__address">
      {live.address}
    </p>
  )}
</div>

                      {live.artists.length > 0 && (
                        <p className="live-page__artists">
                          出演：{live.artists.join(" / ")}
                        </p>
                      )}

                      {live.description &&
  live.description.length > 0 && (
    <div className="live-page__description">
      {live.description.map(
        (line, index) => (
          <p
            key={`${live.id}-description-${index}`}
            className="live-page__description-line"
          >
            {line}
          </p>
        ),
      )}
    </div>
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

                      {live.notes &&
                        live.notes.length > 0 && (
                          <div className="live-page__information">
                            <p className="live-page__information-label">
                              INFORMATION
                            </p>

                            <div className="live-page__information-list">
                              {live.notes.map(
                                (note, index) => (
                                  <p
                                    key={`${live.id}-note-${index}`}
                                    className="live-page__information-item"
                                  >
                                    {note}
                                  </p>
                                ),
                              )}
                            </div>
                          </div>
                        )}

                      <div className="live-page__actions">
                        {live.cancelled ? (
                          <p className="live-page__status">
                            CANCELLED
                          </p>
                        ) : (
                          <>
                            {live.soldOut ? (
                              <span className="live-page__status">
                                SOLD OUT
                              </span>
                            ) : (
                              reservationHref && (
                                <Link
                                  href={reservationHref}
                                  className="live-page__reservation-link"
                                >
                                  ご予約はこちら
                                </Link>
                              )
                            )}

                            {live.detailUrl && (
                              <Link
                                href={live.detailUrl}
                                className="live-page__detail-link"
                              >
                                特設ページ
                                <span aria-hidden="true">
                                  {" →"}
                                </span>
                              </Link>
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
      PAST（現在過去のライブをまとめ中。故に、掲載されていないものもあるかもしれません。）
    </p>

    <PastLiveArchive
      lives={pastLives}
    />
  </section>
)}
      </div>
    </main>
  );
}
