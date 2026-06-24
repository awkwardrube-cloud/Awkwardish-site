import { useState } from "react";
import { Mail, CheckCircle2, Loader2 } from "lucide-react";
import { subscribeNewsletter } from "../../lib/api";

const isValidEmail = (e) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test((e || "").trim());

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage("That email looks a little off — mind double‑checking?");
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const res = await subscribeNewsletter({
        email: email.trim(),
        first_name: firstName.trim() || null,
      });
      setStatus("success");
      setMessage(res.message || "You're in. ✿");
      setEmail("");
      setFirstName("");
    } catch (err) {
      setStatus("error");
      const detail =
        err?.response?.data?.detail ||
        "Something went sideways. Try again in a moment?";
      setMessage(detail);
    }
  };

  return (
    <section
      id="newsletter"
      data-testid="newsletter-section"
      className="relative py-24 sm:py-32"
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="reveal relative rounded-[40px] bg-[#341434] text-[#F5E9D7] overflow-hidden shadow-cozy-lg">
          <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#E0578F]/25 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-24 w-[440px] h-[440px] rounded-full bg-[#E1C9A7]/15 blur-3xl pointer-events-none" />

          <div className="relative grid lg:grid-cols-12 gap-10 lg:gap-14 p-10 sm:p-14 lg:p-20 items-center">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5E9D7]/10 border border-[#F5E9D7]/15 text-[#F0A6BF] text-xs font-medium tracking-wider uppercase mb-6">
                <Mail size={14} />
                tender check‑ins
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[0.95]">
                Soft notes,
                <br />
                <span className="italic text-[#F0A6BF]">straight to your inbox.</span>
              </h2>
              <p className="mt-7 text-lg text-[#F5E9D7]/80 leading-relaxed max-w-md">
                Every now and then, a gentle email — new episodes, lived‑experience
                reflections, and small reminders that being in progress is
                already enough.
              </p>
              <p className="mt-3 font-script text-2xl text-[#F0A6BF]">
                no spam. just warmth.
              </p>
            </div>

            <div className="lg:col-span-6">
              <form
                onSubmit={onSubmit}
                data-testid="newsletter-form"
                className="rounded-[28px] bg-[#F5E9D7] text-[#1F1216] p-7 sm:p-9 shadow-cozy"
                noValidate
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-[#4F2247] mb-2">
                      First name <span className="text-[#341434]/50 normal-case font-normal">(optional)</span>
                    </span>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Ruby"
                      data-testid="newsletter-firstname-input"
                      className="w-full px-4 py-3 rounded-2xl bg-[#F5E9D7] border-2 border-[#341434]/15 focus:border-[#4F2247] focus:outline-none text-[#1F1216] placeholder:text-[#341434]/40 transition-colors"
                      disabled={status === "loading"}
                    />
                  </label>
                  <label className="block">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-[#4F2247] mb-2">
                      Email *
                    </span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@gmail.com"
                      data-testid="newsletter-email-input"
                      className="w-full px-4 py-3 rounded-2xl bg-[#F5E9D7] border-2 border-[#341434]/15 focus:border-[#4F2247] focus:outline-none text-[#1F1216] placeholder:text-[#341434]/40 transition-colors"
                      disabled={status === "loading"}
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  data-testid="newsletter-submit"
                  disabled={status === "loading"}
                  className="btn-press mt-5 w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#341434] text-[#F5E9D7] font-semibold shadow-cozy hover:bg-[#4F2247] disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      sending love…
                    </>
                  ) : status === "success" ? (
                    <>
                      <CheckCircle2 size={18} />
                      you're in ✿
                    </>
                  ) : (
                    <>
                      <Mail size={16} />
                      Subscribe
                    </>
                  )}
                </button>

                {status === "success" && (
                  <p
                    data-testid="newsletter-success"
                    className="mt-4 text-sm text-[#1F1216] bg-[#F0A6BF]/40 border border-[#E0578F]/30 px-4 py-3 rounded-2xl"
                  >
                    {message}
                  </p>
                )}
                {status === "error" && (
                  <p
                    data-testid="newsletter-error"
                    className="mt-4 text-sm text-[#341434] bg-[#E1C9A7]/60 border border-[#4F2247]/15 px-4 py-3 rounded-2xl"
                  >
                    {message}
                  </p>
                )}

                <p className="mt-4 text-xs text-[#341434]/60">
                  By subscribing you agree to receive emails from Awkwardish.
                  Unsubscribe anytime.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
