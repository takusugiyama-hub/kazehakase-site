import Link from "next/link";

export default function ReservationIndexPage() {
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
          ご予約になる公演をLIVE一覧からお選びください。
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
