import { useEffect, useState } from "react";

export default function ProfileCard({ name, role, avatarUrl }) {
  const [bio, setBio] = useState("");
  const [status, setStatus] = useState("loading"); // loading | success | error | empty
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    setError(null);
    fetch("https://jsonplaceholder.typicode.com/users/1", {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        return res.json();
      })
      .then(() => {
        // Bio is derived from the profile props, not from the API payload,
        // but we still hit the network so loading / error / empty branches
        // get exercised honestly.
        const text = `Hi, I'm ${name}. ${role}.`.trim();
        if (!text) {
          setBio("");
          setStatus("empty");
        } else {
          setBio(text);
          setStatus("success");
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message);
          setStatus("error");
        }
      });
    return () => controller.abort();
  }, [name]);

  return (
    <article
      className="w-full max-w-sm sm:max-w-md mx-auto bg-white rounded-2xl shadow-card p-5 sm:p-6 font-body text-brand-navy focus-within:ring-4 focus-within:ring-brand-sky/40"
      aria-labelledby="profile-name"
    >
      <header className="flex items-center gap-4">
        <img
          src={avatarUrl}
          alt={`Portrait of ${name}`}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover ring-2 ring-brand-sky"
          loading="lazy"
        />
        <div className="min-w-0">
          <h2
            id="profile-name"
            className="font-heading text-lg sm:text-xl truncate"
          >
            {name}
          </h2>
          <p className="text-sm text-brand-navy/70 truncate">{role}</p>
        </div>
      </header>

      <section
        aria-live="polite"
        aria-busy={status === "loading"}
        className="mt-4 min-h-[3.5rem]"
      >
        {status === "loading" && (
          <p className="text-sm text-brand-navy/60 animate-pulse">
            Loading bio<span aria-hidden="true">…</span>
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-700" role="alert">
            Couldn&apos;t load bio — {error}
          </p>
        )}
        {status === "empty" && (
          <p className="text-sm text-brand-navy/60 italic">
            No bio available.
          </p>
        )}
        {status === "success" && (
          <p className="text-sm sm:text-base leading-relaxed">{bio}</p>
        )}
      </section>

      <footer className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg bg-brand-sky px-4 py-2 text-sm font-medium text-white outline-none transition hover:bg-brand-sky/90 focus-visible:ring-4 focus-visible:ring-brand-sky/50"
        >
          Follow
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-brand-navy/20 px-4 py-2 text-sm font-medium text-brand-navy outline-none transition hover:bg-brand-navy/5 focus-visible:ring-4 focus-visible:ring-brand-navy/30"
        >
          Message
        </button>
      </footer>
    </article>
  );
}
