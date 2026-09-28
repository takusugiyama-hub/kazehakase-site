"use client";

import { useSyncExternalStore } from "react";
import { getTodayInJapan } from "@/lib/date";

// 静的公開後も日本時間の日付変更・タブへの復帰時に表示を更新する。
function subscribeToJapanDate(onChange: () => void) {
  let timer: ReturnType<typeof setTimeout>;
  const schedule = () => {
    clearTimeout(timer);
    const nextMidnight = Date.parse(`${getTodayInJapan()}T00:00:00+09:00`) + 86_400_000;
    timer = setTimeout(refresh, Math.min(60_000, Math.max(1, nextMidnight - Date.now())));
  };
  const refresh = () => {
    onChange();
    schedule();
  };
  schedule();
  window.addEventListener("focus", refresh);
  document.addEventListener("visibilitychange", refresh);
  return () => {
    clearTimeout(timer);
    window.removeEventListener("focus", refresh);
    document.removeEventListener("visibilitychange", refresh);
  };
}

// 初回描画では古い公演を表示しない。
function getServerDate() {
  return "";
}

export function useJapanDate() {
  return useSyncExternalStore(
    subscribeToJapanDate,
    getTodayInJapan,
    getServerDate,
  );
}
