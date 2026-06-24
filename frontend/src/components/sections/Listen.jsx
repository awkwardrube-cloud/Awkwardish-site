import { SITE } from "../../data/site";
import { ExternalLink, Headphones } from "lucide-react";

export const Listen = () => {
  return (
    <section
      id="listen"
      data-testid="listen-section"
      className="relative py-24 sm:py-32"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-3xl mx-auto reveal">
          <p className="font-script text-3xl text-[#E0578F]">— press play</p>
          <h2 className="font-display text-5xl sm:text-6xl text-[#1F1216] font-semibold leading-[0.95] mt-1">
            Sit with us a while.
          </h2>
          <p className="mt-6 text-lg text-[#341434]/80 leading-relaxed">
            Tap in, hit play, and let Ruby pour you a warm conversation. New
            episodes drop on Spotify — listen below or follow the show.
          </p>
        </div>

        {/* Player */}
        <div
          className="mt-14 reveal rounded-[36px] bg-[#341434] p-3 sm:p-5 shadow-cozy-lg border-4 border-[#1F1216]"
          data-testid="spotify-embed-wrap"
        >
          <div className="rounded-[28px] overflow-hidden bg-[#1F1216]">
            <iframe
              data-testid="spotify-embed"
              title="Awkwardish on Spotify"
              src={SITE.spotify.embedUrl}
              width="100%"
              height="500"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ display: "block" }}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={SITE.spotify.showUrl}
            target="_blank"
            rel="noreferrer"
            data-testid="open-spotify-cta"
            className="btn-press inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1DB954] text-[#0c1f12] font-semibold shadow-cozy hover:brightness-105"
          >
            <Headphones size={18} />
            Open on Spotify
            <ExternalLink size={15} />
          </a>
          <a
            href="#episodes"
            className="btn-press inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent border-2 border-[#341434] text-[#341434] font-semibold hover:bg-[#341434] hover:text-[#F5E9D7]"
          >
            Browse Episodes
          </a>
        </div>
      </div>
    </section>
  );
};
