import { EXPERIENCE, SKILL_BLOCKS } from "../../content";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Stack() {
  return (
    <section className="certification" data-theme-section="dark">
      <div className="certification-header-w">
        <h2 className="certified-big-txt" data-split-random>
          Experience &amp; Stack
        </h2>
      </div>
      <div className="certification-content-w">
        <p>
          Shipping production systems since 2022. Bachelor’s in Management Information Systems,
          now studying for a Master of Information Technology at SETEC Institute.
        </p>
      </div>

      <div className="stack-block">
        <h3 className="stack-block__label">
          [ Experience ]<span className="stack-block__count">{pad(EXPERIENCE.length)}</span>
        </h3>
        <ul className="experience-list">
          {EXPERIENCE.map((job) => (
            <li key={job.company} className="experience-row">
              <span className="experience-row__role">{job.role}</span>
              <span className="experience-row__company">{job.company}</span>
              <span className="experience-row__dates">{job.dates}</span>
            </li>
          ))}
        </ul>
      </div>

      {SKILL_BLOCKS.map((block) => (
        <div key={block.title} className="stack-block">
          <h3 className="stack-block__label">
            [ {block.title} ]<span className="stack-block__count">{pad(block.groups.length)}</span>
          </h3>
          <div className="skill-grid">
            {block.groups.map((group, i) => (
              <div key={group.layer} className={`skill-card ${"wide" in group && group.wide ? "is--wide" : ""}`} data-stagger>
                <div className="skill-card__head">
                  <span className="skill-card__num">{pad(i + 1)}</span>
                  <h4 className="skill-card__title">{group.layer}</h4>
                </div>
                <ul className="skill-chips">
                  {group.items.map((item) => (
                    <li key={item} className="skill-chip" data-stagger-item>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
