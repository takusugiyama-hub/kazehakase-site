export function getTodayInJapan(): string {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function formatLiveDate(date: string) {
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

  return {
    date: `${year}.${String(month).padStart(
      2,
      "0",
    )}.${String(day).padStart(2, "0")}`,
    weekday,
  };
}

export function formatEventDate(
  date: string,
): string {
  const formatted =
    formatLiveDate(date);

  return `${formatted.date} ${formatted.weekday}`;
}