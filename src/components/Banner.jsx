'use client';

import { useEffect, useState } from 'react';

export default function HeroBanner() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500&display=swap');

        .hero-section {
          font-family: 'DM Sans', sans-serif;
          position: relative;
          width: 100%;
          min-height: 100svh;
          background-color: #FFF7ED;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        /* Paw-print SVG tile background */
        .hero-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Ccircle cx='28' cy='22' r='5' fill='%23F97316' opacity='.08'/%3E%3Ccircle cx='50' cy='16' r='4' fill='%23F97316' opacity='.08'/%3E%3Ccircle cx='18' cy='34' r='4' fill='%23F97316' opacity='.08'/%3E%3Ccircle cx='60' cy='30' r='4' fill='%23F97316' opacity='.08'/%3E%3Cellipse cx='38' cy='46' rx='11' ry='13' fill='%23F97316' opacity='.08'/%3E%3C/svg%3E");
          background-size: 80px 80px;
          pointer-events: none;
        }

        /* warm ink-blot blob top-right */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .blob-1 {
          width: 520px; height: 520px;
          top: -160px; right: -120px;
          background: radial-gradient(circle, #FED7AA 0%, #FDBA74 60%, transparent 100%);
          opacity: .55;
        }
        .blob-2 {
          width: 360px; height: 360px;
          bottom: -100px; left: -80px;
          background: radial-gradient(circle, #FDE68A 0%, #FCD34D 60%, transparent 100%);
          opacity: .4;
        }

        /* Content */
        .hero-inner {
          position: relative;
          z-index: 10;
          max-width: 860px;
          margin: 0 auto;
          padding: 6rem 1.5rem 5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 2rem;
        }

        /* Eyebrow badge */
        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #FFF;
          border: 1.5px solid #FED7AA;
          border-radius: 999px;
          padding: 6px 18px;
          font-size: 0.8rem;
          font-weight: 500;
          color: #C2410C;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity .6s ease, transform .6s ease;
        }
        .eyebrow.show { opacity: 1; transform: translateY(0); }
        .eyebrow-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #F97316;
          animation: blink 1.6s ease-in-out infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: .2; }
        }

        /* Headline */
        .headline {
          font-family: 'Fraunces', serif;
          font-size: clamp(3rem, 8vw, 6.5rem);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #1C0A00;
          margin: 0;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity .7s ease .15s, transform .7s ease .15s;
        }
        .headline.show { opacity: 1; transform: translateY(0); }
        .headline em {
          font-style: italic;
          color: #F97316;
        }

        /* Description */
        .description {
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          color: #78350F;
          line-height: 1.7;
          max-width: 540px;
          margin: 0;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity .7s ease .28s, transform .7s ease .28s;
        }
        .description.show { opacity: 1; transform: translateY(0); }

        /* CTA */
        .cta-wrap {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity .7s ease .42s, transform .7s ease .42s;
        }
        .cta-wrap.show { opacity: 1; transform: translateY(0); }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: #F97316;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 1.05rem;
          font-weight: 500;
          padding: 18px 40px;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: transform .2s ease, box-shadow .2s ease;
          box-shadow: 0 4px 24px #F9731640;
        }
        .cta-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #fff;
          opacity: 0;
          transition: opacity .2s ease;
          border-radius: inherit;
        }
        .cta-btn:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 10px 36px #F9731655;
        }
        .cta-btn:hover::after { opacity: .08; }
        .cta-btn:active { transform: scale(.97); }

        .cta-paw {
          font-size: 1.3rem;
          transition: transform .3s ease;
        }
        .cta-btn:hover .cta-paw { transform: rotate(-12deg) scale(1.2); }

        /* Trust strip */
        .trust-strip {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
          justify-content: center;
          opacity: 0;
          transition: opacity .7s ease .56s;
        }
        .trust-strip.show { opacity: 1; }
        .trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: #92400E;
        }
        .trust-divider {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: #FCD34D;
        }

        @media (max-width: 480px) {
          .hero-inner { padding: 5rem 1.25rem 4rem; }
          .cta-btn { padding: 16px 32px; font-size: .95rem; }
        }
      `}</style>

      <section className="hero-section">
        <div className="blob blob-1" />
        <div className="blob blob-2" />

        <div className="hero-inner">
          {/* Eyebrow */}
          <span className={`eyebrow ${mounted ? 'show' : ''}`}>
            <span className="eyebrow-dot" />
            Pet Adoption
          </span>

          {/* Title */}
          <h1 className={`headline ${mounted ? 'show' : ''}`}>
            Every Pet Deserves<br />
            a <em>Loving</em> Home
          </h1>

          {/* Description */}
          <p className={`description ${mounted ? 'show' : ''}`}>
            Meet thousands of shelter animals ready to fill your life with joy.
            Find your perfect companion — a new best friend is just one click away.
          </p>

          {/* CTA */}
          <div className={`cta-wrap ${mounted ? 'show' : ''}`}>
            <button className="cta-btn">
              <span className="cta-paw">🐾</span>
              Adopt Now
            </button>
          </div>

          {/* Trust strip */}
          <div className={`trust-strip ${mounted ? 'show' : ''}`}>
            <span className="trust-item">✓ &nbsp;10,000+ pets available</span>
            <span className="trust-divider" />
            <span className="trust-item">✓ &nbsp;Health-checked</span>
            <span className="trust-divider" />
            <span className="trust-item">✓ &nbsp;Free adoption support</span>
          </div>
        </div>
      </section>
    </>
  );
}