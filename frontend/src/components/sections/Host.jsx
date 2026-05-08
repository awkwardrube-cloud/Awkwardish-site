import { SITE } from "../../data/site";

export const Host = () => {
  return (
    <section
      id="host"
      data-testid="host-section"
      className="relative py-24 sm:py-32 bg-[#E1C9A7]/40"
    >
      <div className="absolute inset-0 bg-grain" />
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          {/* Photo */}
          <div className="lg:col-span-5 reveal">
            <div className="relative max-w-md mx-auto">
              <div className="absolute -inset-4 bg-[#F0A6BF] rounded-[42px] rotate-[-4deg]" />
              <div className="absolute -inset-4 bg-[#4F2247] rounded-[42px] rotate-[3deg] opacity-60" />
              <div className="relative rounded-[36px] overflow-hidden shadow-cozy-lg border-4 border-[#F5E9D7]">
                <img
                  src={SITE.host.photoUrl}
                  alt="Ruby Tobor-Vasquez, host of Awkwardish"
                  className="w-full h-auto object-cover"
                  data-testid="host-photo"
                />
              </div>
              <div className="float-slow absolute -bottom-8 -right-4 bg-[#341434] text-[#F5E9D7] rounded-2xl px-5 py-3 shadow-cozy rotate-[5deg]">
                <p className="font-script text-2xl leading-none text-[#F0A6BF]">
                  your host
                </p>
                <p className="font-display italic text-xl mt-1">Ruby ✿</p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-7 reveal">
            <p className="font-script text-3xl text-[#E0578F]">— meet</p>
            <h2 className="font-display text-5xl sm:text-6xl text-[#1F1216] font-semibold leading-[0.95] mt-1">
              {SITE.host.name}
            </h2>
            <p className="mt-3 text-[#4F2247] font-medium tracking-wide uppercase text-xs">
              {SITE.host.role}
            </p>

            <div className="mt-8 space-y-6">
              {SITE.host.bio.map((p, i) => (
                <p
                  key={i}
                  className="text-lg text-[#341434]/85 leading-[1.75] font-body"
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-10 grid sm:grid-cols-3 gap-4">
              {[
                { k: "Trauma‑Informed", v: "designer & advocate" },
                { k: "Bipolar I", v: "honest, lived nuance" },
                { k: "Community", v: "rooted, accessible" },
              ].map((c) => (
                <div
                  key={c.k}
                  className="rounded-2xl bg-[#F5E9D7] p-5 border border-[#341434]/10 shadow-cozy"
                >
                  <p className="font-display text-xl text-[#341434] font-semibold">
                    {c.k}
                  </p>
                  <p className="text-sm text-[#341434]/70 mt-1">{c.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
