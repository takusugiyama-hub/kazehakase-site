"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import livesData from "@/data/lives.json";

import { ReservationForm } from "@/components/live/ReservationForm";
import { formatEventDate } from "@/lib/date";
import type { LiveEvent } from "@/types/content";

export function ReservationPageClient() {
  const searchParams = useSearchParams();

  const liveId = searchParams.get("live");

  const live =
    (livesData as LiveEvent[]).find(
      (item) =>
        item.id === liveId &&
        item.published &&
        !item.cancelled &&
        item.reservation,
    ) ?? null;

  if (!live) {
    return (
      <main className="reservation-page">
        <div className="reservation-page__container">
          <header className="reservation-page__header">
            <p className="reservation-page__label">
              RESERVATION
            </p>

            <h1 className="reservation-page__title">
              ご予約
            </h1>
          </header>

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

  const backHref =
    live.detailUrl || "/live";

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
              {live.venue}
            </p>

            {live.address ? (
              <p className="reservation-page__event-place">
                {live.address}
              </p>
            ) : (
              live.area && (
                <p className="reservation-page__event-place">
                  {live.area}
                </p>
              )
            )}

            {live.artists.length > 0 && (
              <p className="reservation-page__event-artists">
                出演：
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

                {live.open &&
                  live.start && (
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

            {live.detailUrl && (
              <Link
                href={live.detailUrl}
                className="reservation-page__event-detail-link"
              >
                イベント詳細を見る
                <span aria-hidden="true"> →</span>
              </Link>
            )}
          </div>
        </header>

        {/* =====================================
            Event Notes
        ===================================== */}

        {!live.soldOut &&
          live.notes &&
          live.notes.length > 0 && (
            <div className="reservation-page__event-notes">
              <p className="reservation-page__notes-label">
                INFORMATION
              </p>

              {live.notes.map(
                (note, index) => (
                  <p
                    key={`${live.id}-note-${index}`}
                    className="reservation-page__event-note"
                  >
                    {note}
                  </p>
                ),
              )}
            </div>
          )}

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
            System Notes
        ===================================== */}

        {!live.soldOut && (
          <div className="reservation-page__system-notes">
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
          <Link href={backHref}>
            {live.detailUrl
              ? "← 特設ページへ戻る"
              : "← LIVE一覧へ戻る"}
          </Link>
        </div>
      </div>
    </main>
  );
}
