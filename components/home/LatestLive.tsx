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


export function LatestLive() {
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

  const latestLive =
    upcomingLives[0];

  if (!latestLive) {
    return null;
  }

  return (
    <section className="latest-live">
      <div className="container">
        <p className="section-label">
          NEXT LIVE
        </p>

        <h2 className="latest-live__title">
          {latestLive.title}
        </h2>

        <dl className="latest-live__details">
          <div>
            <dt>DATE</dt>

            <dd>
              {latestLive.date}
            </dd>
          </div>

          <div>
            <dt>VENUE</dt>

            <dd>
              {latestLive.venue}

              {latestLive.area && (
                <>
                  {" / "}
                  {latestLive.area}
                </>
              )}
            </dd>
          </div>

          {latestLive.open && (
            <div>
              <dt>OPEN</dt>

              <dd>
                {latestLive.open}
              </dd>
            </div>
          )}

          {latestLive.start && (
            <div>
              <dt>START</dt>

              <dd>
                {latestLive.start}
              </dd>
            </div>
          )}

          {(latestLive.advancePrice ||
            latestLive.doorPrice) && (
            <div>
              <dt>PRICE</dt>

              <dd>
                {latestLive.advancePrice && (
                  <span>
                    前売{" "}
                    {
                      latestLive.advancePrice
                    }
                  </span>
                )}

                {latestLive.advancePrice &&
                  latestLive.doorPrice && (
                    <span
                      aria-hidden="true"
                    >
                      {" / "}
                    </span>
                  )}

                {latestLive.doorPrice && (
                  <span>
                    当日{" "}
                    {
                      latestLive.doorPrice
                    }
                  </span>
                )}
              </dd>
            </div>
          )}
        </dl>

        {latestLive.soldOut ? (
          <p className="latest-live__status">
            SOLD OUT
          </p>
        ) : latestLive.reservationUrl ? (
          <a
            href={
              latestLive.reservationUrl
            }
            className="latest-live__reservation"
          >
            予約する
          </a>
        ) : latestLive.detailUrl ? (
          <a
            href={
              latestLive.detailUrl
            }
            className="latest-live__reservation"
          >
            詳細を見る
          </a>
        ) : null}
      </div>
    </section>
  );
}