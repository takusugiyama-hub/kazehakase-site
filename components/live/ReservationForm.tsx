"use client";

import {
  FormEvent,
  useState,
} from "react";

type ReservationFormProps = {
  eventId: string;
  eventTitle: string;
  eventDate: string;

  venue: string;
  area: string;

  open?: string;
  start?: string;

  advancePrice?: string;
  doorPrice?: string;
};

type SubmitStatus =
  | "idle"
  | "submitting"
  | "success"
  | "error";

type SubmissionResult = {
  reservationNumber: string;
  guests: string;
};

function formatEventDate(date: string) {
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

  return `${year}.${String(month).padStart(
    2,
    "0",
  )}.${String(day).padStart(2, "0")} ${weekday}`;
}

export function ReservationForm({
  eventId,
  eventTitle,
  eventDate,
  venue,
  area,
  open,
  start,
  advancePrice,
  doorPrice,
}: ReservationFormProps) {
  const [status, setStatus] =
    useState<SubmitStatus>("idle");

  const [errorMessage, setErrorMessage] =
    useState("");

  const [result, setResult] =
    useState<SubmissionResult | null>(null);

  const formattedEventDate =
    formatEventDate(eventDate);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (status === "submitting") {
      return;
    }

    const endpoint =
      process.env.NEXT_PUBLIC_RESERVATION_ENDPOINT;

    if (!endpoint) {
      setStatus("error");

      setErrorMessage(
        "現在、予約フォームの送信先を準備しています。",
      );

      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const website = String(
      formData.get("website") ?? "",
    ).trim();

    if (website) {
      return;
    }

    const guests = String(
      formData.get("guests") ?? "1",
    );

   formData.append("eventId", eventId);
    formData.append("eventTitle", eventTitle);
    formData.append("eventDate", eventDate);

    formData.append("venue", venue);
    formData.append("area", area);
    formData.append("open", open ?? "");
    formData.append("start", start ?? "");
    formData.append(
    "advancePrice",
    advancePrice ?? "",
    );
    formData.append(
    "doorPrice",
    doorPrice ?? "",
    );

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}`,
        );
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(
          data.message ||
            "予約処理に失敗しました。",
        );
      }

      setResult({
        reservationNumber:
          data.reservationNumber,
        guests,
      });

      setStatus("success");
      form.reset();
    } catch (error) {
      console.error(
        "Reservation submission failed:",
        error,
      );

      setStatus("error");

      setErrorMessage(
        "送信できませんでした。時間をおいて、もう一度お試しください。",
      );
    }
  }

  if (status === "success" && result) {
    return (
      <div
        className="reservation-form__complete"
        role="status"
      >
        <p className="reservation-form__complete-label">
          THANK YOU
        </p>

        <h2>
          ご予約ありがとうございます。
        </h2>

        <div className="reservation-form__complete-event">
          <p className="reservation-form__complete-title">
            「{eventTitle}」
          </p>

          <p>
            {formattedEventDate}
          </p>

          <p>
            {result.guests}名様
          </p>
        </div>

        <div className="reservation-form__number">
          <p className="reservation-form__number-label">
            予約番号
          </p>

          <p className="reservation-form__number-value">
            {result.reservationNumber}
          </p>
        </div>

        <p className="reservation-form__complete-message">
          確認メールをお送りしました。
          <br />
          ご予約内容の変更・キャンセルは、
          <br />
          確認メールへそのままご返信ください。
        </p>

        <p className="reservation-form__complete-closing">
          当日お会いできることを
          <br />
          楽しみにしています。
        </p>
      </div>
    );
  }

  return (
    <form
      className="reservation-form"
      onSubmit={handleSubmit}
    >
      <div
        className="reservation-form__honeypot"
        aria-hidden="true"
      >
        <label htmlFor="reservation-website">
          Website
        </label>

        <input
          id="reservation-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="reservation-form__field">
        <label htmlFor="reservation-name">
          お名前
          <span
            className="reservation-form__required"
            aria-hidden="true"
          >
            *
          </span>
        </label>

        <input
          id="reservation-name"
          name="name"
          type="text"
          autoComplete="name"
          required
        />
      </div>

      <div className="reservation-form__field">
        <label htmlFor="reservation-email">
          メールアドレス
          <span
            className="reservation-form__required"
            aria-hidden="true"
          >
            *
          </span>
        </label>

        <input
          id="reservation-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
        />
      </div>

      <div className="reservation-form__field">
        <label htmlFor="reservation-guests">
          ご予約人数
          <span
            className="reservation-form__required"
            aria-hidden="true"
          >
            *
          </span>
        </label>

        <div className="reservation-form__select">
          <select
            id="reservation-guests"
            name="guests"
            defaultValue="1"
            required
          >
            <option value="1">1名</option>
            <option value="2">2名</option>
            <option value="3">3名</option>
            <option value="4">4名</option>
            <option value="5">5名</option>
            <option value="6">6名</option>
          </select>
        </div>
      </div>

      <div className="reservation-form__field">
        <label htmlFor="reservation-message">
          メッセージ
          <span className="reservation-form__optional">
            任意
          </span>
        </label>

        <textarea
          id="reservation-message"
          name="message"
          rows={5}
        />
      </div>

      {status === "error" && (
        <p
          className="reservation-form__error"
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      <div className="reservation-form__submit">
        <button
          type="submit"
          disabled={status === "submitting"}
        >
          {status === "submitting"
            ? "送信しています…"
            : "予約する"}
        </button>
      </div>

      <p className="reservation-form__required-note">
        * 必須項目
      </p>
    </form>
  );
}