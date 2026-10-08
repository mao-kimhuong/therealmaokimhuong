import Intro from "./components/site/Intro";
import Header from "./components/site/Header";
import Hero from "./components/site/Hero";
import About from "./components/site/About";
import ServicesIntro from "./components/site/ServicesIntro";
import Services from "./components/site/Services";
import Portfolio from "./components/site/Portfolio";
import Stack from "./components/site/Stack";
import Contact from "./components/site/Contact";
import Footer from "./components/site/Footer";
import SiteAnimations from "./components/site/SiteAnimations";

export default function HomePage() {
  return (
    <>
      <Intro />
      <main className="main-wrapper">
        <Header />
        <Hero />
        <About />
        <ServicesIntro />
        <Services />
        <Portfolio />
        <Stack />
        <Contact />
        <Footer />
      </main>
      <SiteAnimations />
    </>
  );
}
