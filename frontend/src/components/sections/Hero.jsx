import { SITE } from "../../data/site";
import { Headphones, ArrowRight, Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-[#F0A6BF]/40 blur-3xl pointer-events-none" />
      <div className="absolute top-40 -right-24 w-[380px] h-[380px] rounded-full bg-[#E1C9A7]/60 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-14 items-center">
        {/* Text */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#341434]/8 border border-[#341434]/10 text-[#341434]/80 text-xs font-medium tracking-wider uppercase mb-7">
            <Sparkles size={14} className="text-[#E0578F]" />
            A podcast for the messy middle
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[88px] leading-[0.95] text-[#1F1216] font-semibold">
            Awkward
            <span className="italic text-[#E0578F]">ish</span>
            <span className="block mt-2 text-[#4F2247] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-normal italic">
              cozy-chaotic.
              <br />
              <span className="not-italic">honest.</span>{" "}
              <span className="font-script text-[#E0578F] text-5xl sm:text-6xl lg:text-7xl">
                tender.
              </span>
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg sm:text-xl text-[#341434]/80 leading-relaxed">
            {SITE.brand.tagline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#listen"
              data-testid="hero-listen-cta"
              className="btn-press group inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#341434] text-[#F5E9D7] font-semibold shadow-cozy hover:bg-[#4F2247]"
            >
              <Headphones size={18} />
              Listen Now
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href={SITE.merch.url}
              target="_blank"
              rel="noreferrer"
              data-testid="hero-merch-cta"
              className="btn-press inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#F0A6BF] text-[#341434] font-semibold border-2 border-[#341434] hover:bg-[#E0578F] hover:text-[#F5E9D7]"
            >
              Shop the Merch
            </a>
          </div>

          <div className="mt-14 flex items-center gap-6 text-[#341434]/70 text-sm">
            <div className="flex -space-x-2">
              <div className="w-9 h-9 rounded-full bg-[#E1C9A7] border-2 border-[#F5E9D7]" />
              <div className="w-9 h-9 rounded-full bg-[#F0A6BF] border-2 border-[#F5E9D7]" />
              <div className="w-9 h-9 rounded-full bg-[#4F2247] border-2 border-[#F5E9D7]" />
            </div>
            <p className="leading-snug max-w-xs">
              For listeners who are{" "}
              <span className="font-semibold text-[#341434]">in progress</span>{" "}
              — and that's more than enough.
            </p>
          </div>
        </div>

        {/* Visual: layered logo + sticker tape */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
          <div className="relative">
            {/* Background card */}
            <div className="absolute -top-6 -left-6 w-[300px] h-[380px] sm:w-[340px] sm:h-[430px] rounded-[40px] bg-[#E1C9A7] rotate-[-6deg] shadow-cozy" />
            <div className="absolute -bottom-8 -right-6 w-[300px] h-[380px] sm:w-[340px] sm:h-[430px] rounded-[40px] bg-[#F0A6BF] rotate-[5deg] shadow-cozy" />

            {/* Main logo card */}
            <div className="relative w-[300px] h-[380px] sm:w-[340px] sm:h-[430px] rounded-[40px] overflow-hidden bg-[#341434] shadow-cozy-lg">
              <img
                src={SITE.brand.logoUrl}
                alt="Awkwardish podcast cover"
                className="w-full h-full object-cover"
              />
              {/* Sticker tape */}
              <div
                className="tape rounded-sm"
                style={{
                  top: 18,
                  left: "50%",
                  transform: "translateX(-50%) rotate(-3deg)",
                }}
              />
            </div>

            {/* Floating handwritten note */}
            <div className="float-slow absolute -bottom-10 -left-10 sm:-left-14 max-w-[180px] bg-[#F5E9D7] rounded-2xl p-4 shadow-cozy border border-[#341434]/10 rotate-[-6deg]">
              <p className="font-script text-2xl text-[#4F2247] leading-tight">
                hi. you're doing better than you think.
              </p>
            </div>

            {/* Sparkle badge */}
            <div className="float-slower absolute -top-4 -right-4 w-20 h-20 rounded-full bg-[#E0578F] text-[#F5E9D7] flex items-center justify-center font-display italic text-sm font-semibold rotate-12 shadow-cozy">
              new ep!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
