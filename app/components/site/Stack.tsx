import { SiPhp, SiLaravel, SiReact, SiMysql, SiRedis, SiDocker, SiFlutter } from "react-icons/si";

const STACK = [
  { name: "PHP", Icon: SiPhp },
  { name: "Laravel", Icon: SiLaravel },
  { name: "React", Icon: SiReact },
  { name: "MySQL", Icon: SiMysql },
  { name: "Redis", Icon: SiRedis },
  { name: "Docker", Icon: SiDocker },
  { name: "Flutter", Icon: SiFlutter },
];

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
          3+ years shipping production systems — now at iOne building the iOneCard fintech platform,
          previously at BluePrint Technology and Inklusivity Technology. 44 of 46 sprint tickets delivered
          on time, because consistency compounds.
        </p>
      </div>
      <div className="certifications-logos">
        {STACK.map(({ name, Icon }) => (
          <div key={name} className="certifications-logo">
            <Icon aria-hidden="true" />
            <span>{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
