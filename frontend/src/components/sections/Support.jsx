import { SITE } from "../../data/site";
import { Coffee, Heart, ArrowUpRight } from "lucide-react";

export const Support = () => {
  const s = SITE.support;
  return (
    <section
      id="support"
      data-testid="support-section"
      className="relative py-20 sm:py-24"
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="reveal relative rounded-[36px] bg-[#F5E9D7] border-2 border-[#341434]/12 overflow-hidden shadow-cozy-lg">
          {/* warm wash */}
          <div className="absolute -top-32 -right-24 w-[360px] h-[360px] rounded-full bg-[#F0A6BF]/35 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-20 w-[320px] h-[320px] rounded-full bg-[#E1C9A7]/60 blur-3xl pointer-events-none" />

          <div className="relative grid lg:grid-cols-12 gap-10 p-10 sm:p-14 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#341434]/8 border border-[#341434]/10 text-[#341434]/80 text-xs font-medium tracking-wider uppercase mb-5">
                <Heart size={13} className="text-[#E0578F]" />
                support the show
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#1F1216] font-semibold leading-[0.95]">
                Buy Ruby a coffee.
                <br />
                <span className="font-script text-[#E0578F] text-5xl sm:text-6xl">
                  {s.tagline}.
                </span>
              </h2>
              <p className="mt-6 text-lg text-[#341434]/80 leading-relaxed max-w-xl">
                {s.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="support-kofi-cta"
                  className="btn-press group inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#341434] text-[#F5E9D7] font-semibold shadow-cozy hover:bg-[#4F2247]"
                >
                  <Coffee size={18} className="text-[#F0A6BF]" />
                  Tip on Ko‑fi
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
                <span className="text-[#341434]/65 text-sm font-medium">
                  ko-fi.com/{s.handle}
                </span>
              </div>
            </div>

            {/* Decorative coffee card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto w-full max-w-[280px]">
                <div className="absolute -top-4 -left-4 w-full h-full rounded-[28px] bg-[#F0A6BF] rotate-[-5deg]" />
                <div className="absolute -bottom-4 -right-4 w-full h-full rounded-[28px] bg-[#E1C9A7] rotate-[4deg]" />
                <div className="relative rounded-[28px] bg-[#341434] aspect-square flex flex-col items-center justify-center text-[#F5E9D7] p-8 shadow-cozy-lg">
                  <div className="w-20 h-20 rounded-full bg-[#F0A6BF]/15 border border-[#F0A6BF]/30 flex items-center justify-center mb-4">
                    <Coffee size={36} className="text-[#F0A6BF]" />
                  </div>
                  <p className="font-script text-3xl text-[#F0A6BF] leading-tight text-center">
                    one coffee
                  </p>
                  <p className="font-display italic text-3xl mt-1 text-center">
                    one episode
                  </p>
                  <p className="font-script text-2xl text-[#F5E9D7]/70 mt-3 text-center">
                    one ripple ✿
                  </p>
                </div>
                {/* sticker */}
                <div className="float-slow absolute -top-3 -right-2 bg-[#F5E9D7] text-[#341434] rounded-full px-4 py-1.5 rotate-[10deg] shadow-cozy border border-[#341434]/15">
                  <p className="font-script text-xl leading-none text-[#4F2247]">
                    thank you
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
