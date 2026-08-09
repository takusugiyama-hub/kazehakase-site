"use client";

import { FormEvent, useState } from "react";

const CONTACT_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbwsl-WSGHc8Ese9GA_baRbo6LGHz_WTMAf1nqRqSjZ1NSvcryPBPFq0vK0XHlnflNQKAA/exec";

export default function ContactPage() {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setIsSending(true);
    setIsSent(false);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const message = String(formData.get("message") ?? "");

    try {
      await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      form.reset();
      setIsSent(true);
    } catch {
      setError(
        "送信できませんでした。しばらく時間をおいて、もう一度お試しください。",
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <main className="contact-page">
      <div className="contact-page__container">
        <header className="contact-page__header">
          <h1 className="contact-page__label">
            CONTACT
          </h1>
        </header>

        <section className="contact-page__content">
          <p className="contact-page__lead">
            ライブ出演のご依頼、その他お問い合わせはこちらから。
          </p>

          {isSent ? (
            <div className="contact-page__complete">
              <p>お問い合わせありがとうございます。</p>
              <p>
                内容を確認のうえ、折り返しご連絡いたします。
              </p>
            </div>
          ) : (
            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >
              <div className="contact-form__field">
                <label htmlFor="name">
                  お名前
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                />
              </div>

              <div className="contact-form__field">
                <label htmlFor="email">
                  メールアドレス
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                />
              </div>

              <div className="contact-form__field">
                <label htmlFor="message">
                  お問い合わせ内容
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={8}
                  required
                />
              </div>

              {error && (
                <p className="contact-form__error">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="contact-form__submit"
                disabled={isSending}
              >
                {isSending ? "SENDING..." : "SEND"}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}