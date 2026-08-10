import Image from "next/image";

import musicData from "@/data/music.json";

import {
  StreamingServiceLinks,
  type StreamingServiceUrls,
} from "@/components/music/StreamingServiceLinks";

import type {
  MusicRelease,
} from "@/types/content";


function formatReleaseDate(
  date?: string,
) {
  if (!date) {
    return "";
  }

  const [year, month, day] =
    date.split("-").map(Number);

  if (!year) {
    return date;
  }

  if (!month) {
    return String(year);
  }

  if (!day) {
    return `${year}.${String(
      month,
    ).padStart(2, "0")}`;
  }

  return `${year}.${String(
    month,
  ).padStart(2, "0")}.${String(
    day,
  ).padStart(2, "0")}`;
}


function hasStreamingLinks(
  links?: StreamingServiceUrls,
) {
  if (!links) {
    return false;
  }

  return Object.values(
    links,
  ).some(Boolean);
}


export default function MusicPage() {
  const releases =
    (musicData as MusicRelease[])
      .filter(
        (release) =>
          release.published,
      );

  const albums = releases.filter(
    (release) =>
      release.category === "album",
  );

  const compilations = releases.filter(
    (release) =>
      release.category ===
      "compilation",
  );

  const otherWorks = releases.filter(
    (release) =>
      release.category === "other",
  );


  return (
    <main className="music-page">
      <div className="music-page__container">

        {/* =====================================
            Header
        ===================================== */}

        <header className="music-page__header">
          <h1 className="music-page__label">
            MUSIC
          </h1>
        </header>


        {/* =====================================
            Albums
        ===================================== */}

        {albums.length > 0 && (
          <section className="music-page__section">
            <p className="music-page__section-label">
              ALBUM
            </p>

            <div className="music-page__albums">
              {albums.map(
                (release) => {
                  const formattedDate =
                    formatReleaseDate(
                      release.releaseDate,
                    );

                  return (
                    <article
                      key={release.id}
                      className="music-page__album"
                    >
                      <div className="music-page__cover">
                        {release.coverImage ? (
                          <Image
                            src={
                              release.coverImage
                            }
                            alt={`${release.title} ジャケット`}
                            fill
                            sizes="(max-width: 768px) 100vw, 42vw"
                          />
                        ) : (
                          <div className="music-page__cover-placeholder">
                            NO IMAGE
                          </div>
                        )}
                      </div>

                      <div className="music-page__album-content">
                        {release.subtitle && (
                          <p className="music-page__subtitle">
                            {
                              release.subtitle
                            }
                          </p>
                        )}

                        <h2 className="music-page__title">
                          {release.title}
                        </h2>

                        {formattedDate && (
                          <p className="music-page__date">
                            {formattedDate} RELEASE
                          </p>
                        )}


                        {/* =====================================
                            Tracklist
                        ===================================== */}

                        {release.tracks &&
                          release.tracks
                            .length > 0 && (
                            <div className="music-page__tracklist">
                              <p className="music-page__tracklist-label">
                                TRACKLIST
                              </p>

                              <ol className="music-page__tracks">
                                {release.tracks.map(
                                  (
                                    track,
                                    index,
                                  ) => (
                                    <li
                                      key={`${release.id}-${index}`}
                                    >
                                      <span className="music-page__track-number">
                                        {String(
                                          index +
                                            1,
                                        ).padStart(
                                          2,
                                          "0",
                                        )}
                                      </span>

                                      <span className="music-page__track-title">
                                        {
                                          track
                                        }
                                      </span>
                                    </li>
                                  ),
                                )}
                              </ol>
                            </div>
                          )}


                        {/* =====================================
                            Note
                        ===================================== */}

                        {release.note && (
                          <p className="music-page__note">
                            {release.note}
                          </p>
                        )}


                        {/* =====================================
                            Listen
                        ===================================== */}

                        {hasStreamingLinks(
                          release.links,
                        ) && (
                          <div className="music-page__listen">
                            <p className="music-page__listen-label">
                              LISTEN
                            </p>

                            <StreamingServiceLinks
                              links={
                                release.links ??
                                {}
                              }
                            />
                          </div>
                        )}
                      </div>
                    </article>
                  );
                },
              )}
            </div>
          </section>
        )}


        {/* =====================================
            Compilation / V.A.
        ===================================== */}

        {compilations.length > 0 && (
          <section className="music-page__section">
            <p className="music-page__section-label">
              VARIOUS ARTISTS / COMPILATION
            </p>

            <div className="music-page__compilations">
              {compilations.map(
                (release) => {
                  const formattedDate =
                    formatReleaseDate(
                      release.releaseDate,
                    );

                  return (
                    <article
                      key={release.id}
                      className="music-page__compilation"
                    >
                      <div className="music-page__compilation-cover">
                        {release.coverImage ? (
                          <Image
                            src={
                              release.coverImage
                            }
                            alt={`${release.title} ジャケット`}
                            fill
                            sizes="160px"
                          />
                        ) : (
                          <div className="music-page__cover-placeholder">
                            NO IMAGE
                          </div>
                        )}
                      </div>

                      <div className="music-page__compilation-content">
                        {release.subtitle && (
                          <p className="music-page__compilation-type">
                            {
                              release.subtitle
                            }
                          </p>
                        )}

                        <h2 className="music-page__compilation-title">
                          {release.title}
                        </h2>

                        {formattedDate && (
                          <p className="music-page__compilation-date">
                            {formattedDate}
                          </p>
                        )}

                        {release.participation && (
                          <p className="music-page__participation">
                            {
                              release.participation
                            }
                          </p>
                        )}

                        {release.note && (
                          <p className="music-page__compilation-note">
                            {release.note}
                          </p>
                        )}

                        {hasStreamingLinks(
                          release.links,
                        ) && (
                          <div className="music-page__compilation-links">
                            <StreamingServiceLinks
                              links={
                                release.links ??
                                {}
                              }
                            />
                          </div>
                        )}
                      </div>
                    </article>
                  );
                },
              )}
            </div>
          </section>
        )}


        {/* =====================================
            Other works
        ===================================== */}

        {otherWorks.length > 0 && (
          <section className="music-page__section">
            <p className="music-page__section-label">
              OTHER WORKS
            </p>

            <div className="music-page__other-list">
              {otherWorks.map(
                (release) => {
                  const formattedDate =
                    formatReleaseDate(
                      release.releaseDate,
                    );

                  return (
                    <article
                      key={release.id}
                      className="music-page__other-item"
                    >
                      <p className="music-page__other-date">
                        {formattedDate}
                      </p>

                      <div className="music-page__other-content">
                        <h2 className="music-page__other-title">
                          {release.title}
                        </h2>

                        {release.participation && (
                          <p className="music-page__other-participation">
                            {
                              release.participation
                            }
                          </p>
                        )}

                        {release.note && (
                          <p className="music-page__other-note">
                            {release.note}
                          </p>
                        )}

                        {hasStreamingLinks(
                          release.links,
                        ) && (
                          <div className="music-page__other-links">
                            <StreamingServiceLinks
                              links={
                                release.links ??
                                {}
                              }
                            />
                          </div>
                        )}
                      </div>
                    </article>
                  );
                },
              )}
            </div>
          </section>
        )}


        {/* =====================================
            Empty
        ===================================== */}

        {releases.length === 0 && (
          <p className="music-page__empty">
            現在公開中の作品はありません。
          </p>
        )}
      </div>
    </main>
  );
}