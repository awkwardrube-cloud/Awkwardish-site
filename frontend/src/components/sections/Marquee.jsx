import { SITE } from "../../data/site";

export const Marquee = () => {
  const items = [...SITE.marquee, ...SITE.marquee];
  return (
    <div
      data-testid="marquee"
      className="relative overflow-hidden bg-[#341434] py-5 border-y-2 border-[#1F1216]"
    >
      <div className="marquee-track flex whitespace-nowrap">
        {items.map((t, i) => (
          <div
            key={i}
            className="flex items-center gap-8 px-8 font-display italic text-2xl sm:text-3xl text-[#F5E9D7]"
          >
            <span>{t}</span>
            <span className="text-[#E0578F]">✿</span>
          </div>
        ))}
      </div>
    </div>
  );
};
