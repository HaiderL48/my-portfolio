"use client";

import { useState } from "react";
import { contactContent } from "@/lib/site-data";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const type = String(data.get("projectType") ?? "");
    const budget = String(data.get("budget") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = encodeURIComponent(`Project inquiry — ${type}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject type: ${type}\nBudget: ${budget}\n\n${message}`,
    );

    window.location.href = `mailto:${contactContent.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="text-sm text-foreground/70 leading-relaxed">
        Your email client should open with a draft message. If it didn&apos;t,
        email me directly at{" "}
        <a
          href={`mailto:${contactContent.email}`}
          className="text-primary font-semibold hover:underline"
        >
          {contactContent.email}
        </a>
        .
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <label className="block space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-foreground/50">
            Name
          </span>
          <input
            name="name"
            required
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-foreground/50">
            Email
          </span>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-foreground/50">
          Project type
        </span>
        <select
          name="projectType"
          required
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          {contactContent.projectTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <label className="block space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-foreground/50">
          Budget range (optional)
        </span>
        <select
          name="budget"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          {contactContent.budgetRanges.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </label>

      <label className="block space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-foreground/50">
          Brief description
        </span>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary/30"
          placeholder="What are you building? Timeline? Links to references?"
        />
      </label>

      <button
        type="submit"
        className="w-full sm:w-auto rounded-2xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition"
      >
        Send message
      </button>
    </form>
  );
}
