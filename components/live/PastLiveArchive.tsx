"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatLiveDate } from "@/lib/date";
import type { LiveEvent } from "@/types/content";

type Props = {
  lives: LiveEvent[];
};

export function PastLiveArchive({
  lives,
}: Props) {
  const livesByYear = useMemo(() => {
    const groups = new Map<
      string,
      LiveEvent[]
    >();

    lives.forEach((live) => {
      const year =
        live.date.slice(0, 4);

      const current =
        groups.get(year) ?? [];

      current.push(live);

      groups.set(year, current);
    });

    return Array.from(groups.entries()).sort(
      ([yearA], [yearB]) =>
        yearB.localeCompare(yearA),
    );
  }, [lives]);

  const newestYear =
    livesByYear[0]?.[0] ?? "";

  const [openYears, setOpenYears] =
    useState<Set<string>>(
      () =>
        new Set(
          newestYear
            ? [newestYear]
            : [],
        ),
    );

  const toggleYear = (
    year: string,
  ) => {
    setOpenYears((current) => {
      const next =
        new Set(current);

      if (next.has(year)) {
        next.delete(year);
      } else {
        next.add(year);
      }

      return next;
    });
  };

  return (
    <div className="live-page__archive">
      {livesByYear.map(
        ([year, yearLives]) => {
          const isOpen =
            openYears.has(year);

          const panelId =
            `past-live-${year}`;

          return (
            <section
              key={year}
              className={`live-page__year${
                isOpen
                  ? " live-page__year--open"
                  : ""
              }`}
            >
              <button
                type="button"
                className="live-page__year-button"
                onClick={() =>
                  toggleYear(year)
                }
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span className="live-page__year-number">
                  {year}
                </span>

                <span className="live-page__year-count">
                  {yearLives.length}{" "}
                  {yearLives.length === 1
                    ? "LIVE"
                    : "LIVES"}
                </span>

                <span
                  className="live-page__year-toggle"
                  aria-hidden="true"
                >
                  {isOpen ? "−" : "＋"}
                </span>
              </button>

              <div
                id={panelId}
                className="live-page__year-content"
                hidden={!isOpen}
              >
                <div className="live-page__past-list">
                  {yearLives.map(
                    (live) => {
                      const content = (
                        <>
                          <p className="live-page__past-date">
                            {formatLiveDate(live.date).date}
                          </p>

                          <p className="live-page__past-place">
                            {live.area && (
                              <>
                                {live.area}
                                {"　"}
                              </>
                            )}

                            {live.venue}
                          </p>

                          <p className="live-page__past-title">
                            {live.title}
                          </p>

                          {live.detailUrl && (
                            <span
                              className="live-page__past-detail"
                            >
                              特設ページ
                              <span aria-hidden="true"> →</span>
                            </span>
                          )}
                        </>
                      );

                      if (
                        live.detailUrl
                      ) {
                        return (
                          <Link
                            key={
                              live.id
                            }
                            href={
                              live.detailUrl
                            }
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
                    },
                  )}
                </div>
              </div>
            </section>
          );
        },
      )}
    </div>
  );
}