import livesData from "@/data/lives.json";

import { ReservationPageClient } from "@/components/live/ReservationPageClient";
import type { LiveEvent } from "@/types/content";

type ReservationPageProps = {
  params: Promise<{
    live: string;
  }>;
};

export function generateStaticParams() {
  return (livesData as LiveEvent[])
    .filter(
      (live) =>
        live.published &&
        !live.cancelled &&
        live.reservation,
    )
    .map((live) => ({
      live: live.id,
    }));
}

export default async function ReservationPage({
  params,
}: ReservationPageProps) {
  const { live } = await params;

  return <ReservationPageClient liveId={live} />;
}
