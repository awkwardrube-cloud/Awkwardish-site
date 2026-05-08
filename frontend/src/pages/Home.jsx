import { Header } from "../components/sections/Header";
import { Hero } from "../components/sections/Hero";
import { Marquee } from "../components/sections/Marquee";
import { About } from "../components/sections/About";
import { Host } from "../components/sections/Host";
import { Listen } from "../components/sections/Listen";
import { Episodes } from "../components/sections/Episodes";
import { Merch } from "../components/sections/Merch";
import { Connect } from "../components/sections/Connect";
import { Newsletter } from "../components/sections/Newsletter";
import { Footer } from "../components/sections/Footer";
import { useReveal } from "../hooks/useReveal";

export default function Home() {
  useReveal();
  return (
    <div
      className="bg-paper relative overflow-hidden"
      data-testid="home-page"
    >
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Host />
        <Listen />
        <Episodes />
        <Merch />
        <Connect />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
