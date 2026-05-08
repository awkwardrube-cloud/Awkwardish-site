import { SITE } from "../../data/site";
import { Heart } from "lucide-react";

export const About = () => {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative py-24 sm:py-32"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4 reveal">
            <div className="sticky top-32">
              <p className="font-script text-3xl text-[#E0578F] mb-2">
                — about the show
              </p>
              <h2 className="font-display text-5xl sm:text-6xl text-[#1F1216] font-semibold leading-[0.95]">
                The space we
                <br />
                <span className="scribble italic text-[#4F2247]">needed.</span>
              </h2>
              <div className="mt-8 inline-flex items-center gap-2 text-[#341434]/70 text-sm">
                <Heart size={16} className="text-[#E0578F]" />
                <span>made with care, not perfection</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-7 reveal">
            {SITE.about.map((p, i) => (
              <p
                key={i}
                className="text-lg sm:text-xl text-[#341434]/85 leading-[1.7] font-body"
              >
                {p}
              </p>
            ))}

            {/* Manifesto callout */}
            <div className="mt-12 relative rounded-[32px] bg-[#341434] text-[#F5E9D7] p-8 sm:p-12 shadow-cozy-lg overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#E0578F]/30 blur-3xl" />
              <div className="absolute -bottom-12 -left-10 w-48 h-48 rounded-full bg-[#E1C9A7]/15 blur-3xl" />
              <div className="relative">
                <p className="font-script text-2xl text-[#F0A6BF] mb-4">
                  the awkwardish manifesto
                </p>
                {SITE.manifesto.map((m, i) => (
                  <p
                    key={i}
                    className="font-display text-2xl sm:text-3xl leading-snug italic mb-2 last:mb-0"
                  >
                    {m}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
