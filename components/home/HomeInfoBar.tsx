"use client";

import { useJapanDate } from "@/lib/useJapanDate";
import Image from "next/image";
import Link from "next/link";

import { Listen } from "@/components/home/Listen";

import livesData from "@/data/lives.json";

import type { LiveEvent } from "@/types/content";
import {
  formatLiveDate,
} from "@/lib/date";




function getNextLive(today: string): LiveEvent | null {
  if (!today) return null;

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
  const today = useJapanDate();
  const nextLive = getNextLive(today);

  if (!nextLive) {
    return (
      <section className="home-info-bar">
        <div className="home-info-bar__inner">
          <Listen />
        </div>
      </section>
    );
  }

  const formattedDate =
    formatLiveDate(nextLive.date);

  return (
    <section className="home-info-bar">
      <div className="home-info-bar__inner">
        {/* =====================================
            NEXT LIVE
        ===================================== */}

        <div className="home-info-bar__schedule">
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
      （{nextLive.area}）
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

            {nextLive.artists.length > 0 && (
              <p className="home-info-bar__artists">
                出演：
                {nextLive.artists.join(" / ")}
              </p>
            )}

            {nextLive.soldOut ? (
  <span className="home-info-bar__status">
    SOLD OUT
  </span>
) : nextLive.detailUrl ? (
  <Link
    href={nextLive.detailUrl}
    className="home-info-bar__live-button"
  >
    詳細を見る
  </Link>
) : null}
          </div>
        </div>

        {/* =====================================
            LISTEN
        ===================================== */}

        <Listen />
      </div>
    </section>
  );
}