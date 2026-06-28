"use client";

import { useCallback, useRef, useState, type CSSProperties } from "react";

const GIF_SRC = "/truman-bow.gif";

export default function Footer() {
  const gifRef = useRef<HTMLImageElement>(null);
  const anchorRef = useRef<HTMLSpanElement>(null);
  const [gifStyle, setGifStyle] = useState<CSSProperties | null>(null);
  const [gifVisible, setGifVisible] = useState(false);

  const positionGif = useCallback(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;

    const rect = anchor.getBoundingClientRect();

    setGifStyle({
      right: Math.max(varGutter(), window.innerWidth - rect.right),
      bottom: window.innerHeight - rect.top + 12,
    });
  }, []);

  const restartGif = useCallback(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    positionGif();
    setGifVisible(true);

    const img = gifRef.current;
    if (!img) return;

    img.src = `${GIF_SRC}?t=${Date.now()}`;
  }, [positionGif]);

  const hideGif = useCallback(() => {
    setGifVisible(false);
  }, []);

  return (
    <footer
      className="footer shell text-sm text-text-body"
      onMouseEnter={restartGif}
      onMouseLeave={hideGif}
    >
      <div className="footer__inner content-grid">
        <p className="footer__signoff col-measure--10">
          ...oh and in case I don&apos;t see ya, good afternoon, good evening, and good night!
          <span ref={anchorRef} className="footer__gif-anchor" aria-hidden="true">
            <span
              className={`footer__gif${gifVisible ? " footer__gif--visible" : ""}`}
              style={gifStyle ?? undefined}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- animated GIF must loop via img */}
              <img
                ref={gifRef}
                className="footer__gif-img"
                src={GIF_SRC}
                alt=""
                width={450}
                height={373}
                decoding="async"
              />
            </span>
          </span>
        </p>
        <p className="footer__year">2026</p>
      </div>
    </footer>
  );
}

function varGutter() {
  const value = getComputedStyle(document.documentElement).getPropertyValue("--gutter").trim();
  const parsed = Number.parseFloat(value);

  return Number.isFinite(parsed) ? parsed : 24;
}
