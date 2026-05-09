import { SITE } from "../../data/site";
import { ShoppingBag, ArrowUpRight } from "lucide-react";

export const Merch = () => {
  return (
    <section
      id="merch"
      data-testid="merch-section"
      className="relative py-24 sm:py-32"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="reveal relative rounded-[40px] bg-[#F0A6BF] overflow-hidden border-4 border-[#1F1216] shadow-cozy-lg">
          <div className="absolute inset-0 bg-grain" />
          <div className="absolute top-10 right-10 font-script text-[#341434]/30 text-7xl rotate-12 select-none pointer-events-none">
            ✿ ✿ ✿
          </div>

          <div className="relative grid lg:grid-cols-12 gap-10 lg:gap-12 p-10 sm:p-14 lg:p-20 items-center">
            <div className="lg:col-span-7">
              <p className="font-script text-3xl text-[#341434]">
                — wear the warmth
              </p>
              <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[#1F1216] font-semibold leading-[0.95] mt-2">
                Cozy gear
                <br />
                for{" "}
                <span className="italic text-[#4F2247]">
                  the in‑progress crew.
                </span>
              </h2>
              <p className="mt-7 text-lg text-[#341434]/85 leading-relaxed max-w-xl">
                Every purchase from the Red Petal Project shop helps fund
                trauma‑informed community care, storytelling, and the show
                itself. Small soft acts → big soft ripples.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href={SITE.merch.url}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="merch-shop-cta"
                  className="btn-press inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#341434] text-[#F5E9D7] font-semibold shadow-cozy hover:bg-[#4F2247]"
                >
                  <ShoppingBag size={18} />
                  Visit the Shop
                  <ArrowUpRight size={16} />
                </a>
                <span className="text-[#341434]/70 text-sm font-medium">
                  awkwardishpod.square.site
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto w-full max-w-sm">
                {/* Tag mockup */}
                <div className="float-slow absolute -top-4 -left-2 bg-[#F5E9D7] rounded-2xl px-4 py-2 rotate-[-8deg] shadow-cozy border border-[#341434]/15 z-10">
                  <p className="font-script text-2xl text-[#4F2247] leading-none">
                    in progress
                  </p>
                </div>
                <div className="float-slower absolute -bottom-2 -right-4 bg-[#341434] text-[#F0A6BF] rounded-2xl px-4 py-2 rotate-[6deg] shadow-cozy z-10">
                  <p className="font-script text-2xl leading-none">
                    is enough
                  </p>
                </div>

                {/* Stack of card mockups */}
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-full h-full rounded-[32px] bg-[#4F2247]/40 rotate-[-6deg]" />
                  <div className="absolute top-3 left-3 w-full h-full rounded-[32px] bg-[#E1C9A7] rotate-[4deg]" />
                  <div className="relative rounded-[32px] bg-[#341434] aspect-[4/5] overflow-hidden shadow-cozy-lg flex flex-col items-center justify-center text-[#F5E9D7] p-8">
                    <span className="font-script text-4xl text-[#F0A6BF] mb-3">
                      awkward
                    </span>
                    <span className="font-display italic text-6xl text-[#F5E9D7] leading-none">
                      ish
                    </span>
                    <span className="mt-6 text-xs uppercase tracking-[0.3em] text-[#F5E9D7]/70">
                      cozy chaotic merch
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
