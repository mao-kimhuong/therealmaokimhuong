import { LINKS } from "../../content";
import BracketHeading from "./BracketHeading";
import ScribbleButton from "./ScribbleButton";

export default function About() {
  return (
    <section id="about" className="about" data-theme-section="dark">
      <div className="about-header-wrap">
        <h1 className="about-header__h" data-split-rolling>
          Creative full-stack development
        </h1>
        <p className="about-header__p" data-split-lines>
          Fast, reliable products built end-to-end — from the database to the pixels people actually use.
        </p>
      </div>
      <div className="about-content-wrap">
        <BracketHeading>About me</BracketHeading>
        <p data-split-lines>
          I’m Mao Kim Huong, a full-stack developer in Phnom Penh, Cambodia. I build web platforms, APIs and
          business systems on PHP, Laravel, ThinkPHP5 and FastAdmin — and I like owning them end-to-end,
          from schema design to the screen a user taps.
        </p>
        <p data-split-lines>
          Right now I’m building the iOneCard platform at iOne: 10+ production modules, REST APIs for its iOS
          and Android apps, and the admin portal behind them. Every project gets the same
          care, whether it’s a startup MVP or a system thousands of people rely on.
        </p>
        <ScribbleButton href={LINKS.quote} variant="dark-blue">
          Get a quote
        </ScribbleButton>
      </div>
    </section>
  );
}
