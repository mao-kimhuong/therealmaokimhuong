"use client";

import { scrollToTarget } from "../../lib/gsap";
import { SITE } from "../../content";
import Wordmark from "./Wordmark";

const NAV = [
  { label: "About", target: "#about" },
  { label: "Services", target: "#services" },
  { label: "Projects", target: "#portfolio" },
  { label: "Contact", target: "#contact" },
];

export default function Footer() {
  return (
    <div className="footer-wrap" data-theme-section="light" data-footer>
      <footer className="footer" data-footer-inner>
        <div className="footer-top">
          <div className="footer-bracket" />
          <div className="footer-bracket is--2" />
          <div className="footer-content-w">
            <div className="footer__col">
              <p className="footer__links-label">[ Socials ]</p>
              <ul className="footer__links-list">
                <li><a className="footer__links-txt" data-underline-link href={SITE.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a className="footer__links-txt" data-underline-link href={SITE.telegram} target="_blank" rel="noopener noreferrer">Telegram</a></li>
                <li><a className="footer__links-txt" data-underline-link href={SITE.resume} target="_blank" rel="noopener noreferrer">Resume</a></li>
              </ul>
            </div>
            <div className="footer__col">
              <p className="footer__links-label">[ Nav ]</p>
              <ul className="footer__links-list">
                {NAV.map((n) => (
                  <li key={n.target}>
                    <button onClick={() => scrollToTarget(n.target)}>
                      <span className="footer__links-txt" data-underline-link>{n.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer__col">
              <p className="footer__links-label">[ Contact ]</p>
              <ul className="footer__links-list">
                <li><a className="footer__links-txt" data-underline-link href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
                <li><a className="footer__links-txt" data-underline-link href={SITE.telegram} target="_blank" rel="noopener noreferrer">{SITE.phone}</a></li>
              </ul>
            </div>
          </div>
          <div className="footer__wordmark">
            <Wordmark title={SITE.name} />
          </div>
        </div>
        <div className="footer-copy">
          <div className="footer-copy__left">
            <p className="footer-copy__label">Clean code, real impact</p>
            <p className="footer-copy__label">© {new Date().getFullYear()}, {SITE.name}</p>
          </div>
          <p className="footer-copy__label">Phnom Penh, Cambodia</p>
        </div>
      </footer>
    </div>
  );
}
