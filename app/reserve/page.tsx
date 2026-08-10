import { Suspense } from "react";

import { ReservationPageClient } from "@/components/live/ReservationPageClient";

export default function ReservationPage() {
  return (
    <Suspense
      fallback={
        <main className="reservation-page">
          <div className="reservation-page__container">
            <p className="reservation-page__label">
              RESERVATION
            </p>

            <p className="reservation-page__unavailable">
              読み込み中です。
            </p>
          </div>
        </main>
      }
    >
      <ReservationPageClient />
    </Suspense>
  );
}