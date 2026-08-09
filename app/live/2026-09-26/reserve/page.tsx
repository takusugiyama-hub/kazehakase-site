import Link from "next/link";

import livesData from "@/data/lives.json";

import { ReservationForm } from "@/components/live/ReservationForm";

import type { LiveEvent } from "@/types/content";


const LIVE_ID = "live-20260926";


function getLive(): LiveEvent | null {
  const live = (livesData as LiveEvent[]).find(
    (item) =>
      item.id === LIVE_ID &&
      item.published &&
      !item.cancelled,
  );

  return live ?? null;
}


function formatEventDate(date: string) {
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

  return `${year}.${String(month).padStart(
    2,
    "0",
  )}.${String(day).padStart(2, "0")} ${weekday}`;
}


export default function ReservationPage() {
  const live = getLive();

  if (!live) {
    return (
      <main className="reservation-page">
        <div className="reservation-page__container">
          <p className="reservation-page__label">
            RESERVATION
          </p>

          <h1 className="reservation-page__title">
            ご予約
          </h1>

          <p className="reservation-page__unavailable">
            現在、この公演のご予約は受け付けていません。
          </p>

          <div className="reservation-page__back">
            <Link href="/live">
              ← LIVE一覧へ
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const formattedDate =
    formatEventDate(live.date);

  return (
    <main className="reservation-page">
      <div className="reservation-page__container">

        {/* =====================================
            Header
        ===================================== */}

        <header className="reservation-page__header">
          <p className="reservation-page__label">
            RESERVATION
          </p>

          <h1 className="reservation-page__title">
            ご予約
          </h1>

          <div className="reservation-page__event">
            <h2 className="reservation-page__event-title">
              {live.title}
            </h2>

            <p className="reservation-page__event-date">
              {formattedDate}
            </p>

            <p className="reservation-page__event-place">
              {live.area} {live.venue}
            </p>

            {live.artists.length > 0 && (
              <p className="reservation-page__event-artists">
                {live.artists.join(" / ")}
              </p>
            )}

            {(live.open || live.start) && (
              <p className="reservation-page__event-time">
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
              <p className="reservation-page__event-price">
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
          </div>
        </header>


        {/* =====================================
            Form
        ===================================== */}

        {!live.soldOut ? (
          <section
            className="reservation-page__form-section"
            aria-label="予約フォーム"
          >
            <ReservationForm
              eventId={live.id}
              eventTitle={live.title}
              eventDate={live.date}
              venue={live.venue}
              area={live.area}
              open={live.open}
              start={live.start}
              advancePrice={live.advancePrice}
              doorPrice={live.doorPrice}
            />
          </section>
        ) : (
          <section className="reservation-page__sold-out">
            <p>
              SOLD OUT
            </p>
          </section>
        )}


        {/* =====================================
            Notes
        ===================================== */}

        {!live.soldOut && (
          <div className="reservation-page__notes">
            <p>
              料金は当日、会場にてお支払いください。
            </p>

            <p>
              ご予約後、確認メールをお送りします。
            </p>
          </div>
        )}


        {/* =====================================
            Back
        ===================================== */}

        <div className="reservation-page__back">
          <Link href={live.detailUrl}>
            ← イベント詳細へ戻る
          </Link>
        </div>
      </div>
    </main>
  );
}