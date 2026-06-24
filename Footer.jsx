import { SITE } from "../../data/site";
import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer
      data-testid="site-footer"
      className="relative bg-[#1F1216] text-[#F5E9D7] pt-20 pb-10 overflow-hidden"
    >
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#E0578F]/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center">
          <p className="font-script text-3xl text-[#F0A6BF] mb-4">
            — until next time
          </p>
          <h2 className="font-display text-5xl sm:text-7xl font-semibold leading-[0.95]">
            be{" "}
            <span className="italic text-[#F0A6BF]">awkward</span>,
            <br />
            tenderly.
          </h2>
          <p className="mt-7 max-w-xl mx-auto text-[#F5E9D7]/70 text-lg leading-relaxed">
            {SITE.brand.short}
          </p>
        </div>

        <div className="mt-16 pt-8 border-t border-[#F5E9D7]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#F5E9D7]/60">
          <p>
            © {new Date().getFullYear()} Awkwardish · A Red Petal Project Inc.
            production.
          </p>
          <p className="inline-flex items-center gap-1.5">
            crafted with{" "}
            <Heart size={14} className="text-[#E0578F] fill-[#E0578F]" />
            for the messy middle
          </p>
        </div>
      </div>
    </footer>
  );
};
