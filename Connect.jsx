import { SITE } from "../../data/site";
import { Instagram, Facebook, Youtube, AtSign } from "lucide-react";

const ICON = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  threads: AtSign,
};

export const Connect = () => {
  return (
    <section
      id="connect"
      data-testid="connect-section"
      className="relative py-24 sm:py-32 bg-[#E1C9A7]/40"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto reveal">
          <p className="font-script text-3xl text-[#E0578F]">— stay close</p>
          <h2 className="font-display text-5xl sm:text-6xl text-[#1F1216] font-semibold leading-[0.95] mt-1">
            Follow along.
          </h2>
          <p className="mt-6 text-lg text-[#341434]/80 leading-relaxed">
            Find Awkwardish across the internet — softly chaotic content,
            episode drops, and gentle reminders included.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SITE.socials.map((s, i) => {
            const Icon = ICON[s.icon] || AtSign;
            return (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                data-testid={`social-link-${s.icon}`}
                className="reveal group relative rounded-[28px] bg-[#F5E9D7] p-7 border border-[#341434]/10 shadow-cozy hover:-translate-y-2 transition-all duration-500 hover:bg-[#341434] hover:text-[#F5E9D7]"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#341434] text-[#F5E9D7] group-hover:bg-[#F0A6BF] group-hover:text-[#341434] flex items-center justify-center transition-colors">
                  <Icon size={22} />
                </div>
                <p className="mt-5 font-display text-2xl font-semibold text-[#1F1216] group-hover:text-[#F5E9D7] transition-colors">
                  {s.label}
                </p>
                <p className="mt-1 text-sm text-[#341434]/70 group-hover:text-[#F5E9D7]/70 transition-colors break-all">
                  {s.handle}
                </p>
                <span className="absolute top-7 right-7 text-[#4F2247] group-hover:text-[#F0A6BF] transition-colors">
                  →
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
