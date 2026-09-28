"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import livesData from "@/data/lives.json";

import { ReservationForm } from "@/components/live/ReservationForm";
import { formatEventDate } from "@/lib/date";
import type { LiveEvent } from "@/types/content";

type ReservationPageClientProps = {
  liveId: string | null;
};

// 公演日は日本時間として扱う。端末のタイムゾーンには依存しない。
function getReservationTiming(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;

  const midnight = Date.parse(`${date}T00:00:00+09:00`);
  if (!Number.isFinite(midnight)) return null;
  // Date.parse が存在しない日付を翌月に繰り上げた場合も受付を開かない。
  if (new Date(midnight + 9 * 60 * 60 * 1000).toISOString().slice(0, 10) !== date) {
    return null;
  }

  const dayEnd = midnight + 24 * 60 * 60 * 1000;
  // 当日予約は受け付けず、公演当日の日本時間0時で締め切る。
  return { closesAt: midnight, dayEnd };
}

export function ReservationPageClient({
  liveId,
}: ReservationPageClientProps) {

  const live =
    (livesData as LiveEvent[]).find(
      (item) =>
        item.id === liveId &&
        item.published &&
        !item.cancelled &&
        item.reservation,
    ) ?? null;

  const timing = live ? getReservationTiming(live.date) : null;
  const closesAt = timing?.closesAt ?? null;
  const dayEnd = timing?.dayEnd ?? null;
  // 静的HTMLと初回描画を一致させ、時刻確認前にはフォームを出さない。
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const update = () => {
      clearTimeout(timer);
      const current = Date.now();
      setNow(current);
      const nextBoundary = [closesAt, dayEnd].find(
        (value): value is number => value !== null && value > current,
      );
      // 長時間の表示、端末時刻の変更、スリープからの復帰にも対応する。
      timer = setTimeout(update, Math.min(
        nextBoundary === undefined ? 60_000 : nextBoundary - current,
        60_000,
      ));
    };
    update();
    window.addEventListener("focus", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("focus", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, [closesAt, dayEnd]);

  const accepting = now !== null && closesAt !== null && now < closesAt;
  const pastEvent = now !== null && dayEnd !== null && now >= dayEnd;

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

        {accepting && !live.soldOut &&
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

        {!accepting ? (
          <section className="reservation-page__unavailable" aria-live="polite">
            {now === null ? (
              <p>予約受付状況を確認しています。</p>
            ) : pastEvent ? (
              <>
                <p>この公演は終了しました。</p>
                <p>ご来場いただいたみなさま、ありがとうございました。</p>
              </>
            ) : (
              <>
                <p>この公演の予約受付は終了しました。</p>
                <p>こちらのフォームでのご予約は、公演前日まで承ります。</p>
                <p>当日のご来場については、各公演の詳細ページに記載のお問い合わせ先へご確認ください。</p>
              </>
            )}
          </section>
        ) : !live.soldOut ? (
          <section
            className="reservation-page__form-section"
            aria-label="予約フォーム"
            onSubmitCapture={(event) => {
              const current = Date.now();
              if (closesAt === null || current >= closesAt) {
                event.preventDefault();
                event.stopPropagation();
                setNow(current);
              }
            }}
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

        {accepting && !live.soldOut && (
          <div className="reservation-page__system-notes">
            <p>
              こちらのフォームでのご予約は、公演前日まで承ります。
            </p>

            <p>
              当日のご来場については、各公演の詳細ページに記載のお問い合わせ先へご確認ください。
            </p>

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
