import { SiPhp, SiLaravel, SiSpringboot, SiMysql, SiDocker, SiFlutter, SiFirebase, SiFigma } from "react-icons/si";

const STACK = [
  { name: "PHP", Icon: SiPhp },
  { name: "Laravel", Icon: SiLaravel },
  { name: "Spring Boot", Icon: SiSpringboot },
  { name: "MySQL", Icon: SiMysql },
  { name: "Docker", Icon: SiDocker },
  { name: "Firebase", Icon: SiFirebase },
  { name: "Flutter", Icon: SiFlutter },
  { name: "Figma", Icon: SiFigma },
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
          Shipping production systems since 2022 — now at iOne on the iOneCard platform, previously at
          BluePrint Technology and Inklusivity Technology. Bachelor’s in Management Information Systems,
          now studying for a Master of Information Technology at SETEC Institute.
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
