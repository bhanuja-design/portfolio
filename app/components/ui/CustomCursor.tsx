"use client";

import { Eye, Mail, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type CursorMode = "default" | "link" | "pronounce" | "view" | "email";

const pillConfig = {
  pronounce: {
    icon: Volume2,
    label: "BAH-NOO-JAH",
    maxWidth: 200,
  },
  view: {
    icon: Eye,
    label: "VIEW CASE STUDY",
    maxWidth: 240,
  },
  email: {
    icon: Mail,
    label: "COPY EMAIL",
    maxWidth: 220,
  },
} as const;

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>("default");
  const [isPressed, setIsPressed] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);
  const isPointerActiveRef = useRef(false);
  const isPageVisibleRef = useRef(true);
  const emailCopiedTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onEmailCopied = () => {
      setEmailCopied(true);

      if (emailCopiedTimeout.current !== null) {
        clearTimeout(emailCopiedTimeout.current);
      }

      emailCopiedTimeout.current = setTimeout(() => {
        setEmailCopied(false);
        emailCopiedTimeout.current = null;
      }, 2000);
    };

    window.addEventListener("email-copied", onEmailCopied);

    return () => {
      window.removeEventListener("email-copied", onEmailCopied);
      if (emailCopiedTimeout.current !== null) {
        clearTimeout(emailCopiedTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    const isCoarsePointer = window.matchMedia(
      "(hover: none), (pointer: coarse), (max-width: 768px)"
    ).matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isCoarsePointer || prefersReducedMotion) {
      return;
    }

    document.documentElement.classList.add("has-custom-cursor");

    const stopAnimation = () => {
      if (frame.current !== null) {
        cancelAnimationFrame(frame.current);
        frame.current = null;
      }
    };

    const shouldAnimate = () =>
      isPageVisibleRef.current && isPointerActiveRef.current;

    const startAnimation = () => {
      if (!shouldAnimate() || frame.current !== null) {
        return;
      }

      frame.current = requestAnimationFrame(animate);
    };

    const onMove = (event: MouseEvent) => {
      target.current = { x: event.clientX, y: event.clientY };
      isPointerActiveRef.current = true;
      setIsActive(true);
      startAnimation();
    };

    const onOver = (event: MouseEvent) => {
      const targetElement = event.target as HTMLElement;

      if (targetElement.closest('[data-cursor="pronounce"]')) {
        setCursorMode("pronounce");
        return;
      }

      if (targetElement.closest('[data-cursor="view"]')) {
        setCursorMode("view");
        return;
      }

      if (targetElement.closest('[data-cursor="email"]')) {
        setCursorMode("email");
        return;
      }

      const interactive = targetElement.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor="pointer"]'
      );

      setCursorMode(interactive ? "link" : "default");
    };

    const onLeave = () => {
      isPointerActiveRef.current = false;
      stopAnimation();
      setIsActive(false);
      setIsPressed(false);
      setCursorMode("default");
    };

    const onDown = () => setIsPressed(true);
    const onUp = () => setIsPressed(false);

    const onVisibilityChange = () => {
      isPageVisibleRef.current = document.visibilityState === "visible";

      if (isPageVisibleRef.current) {
        startAnimation();
        return;
      }

      stopAnimation();
    };

    const animate = () => {
      if (!shouldAnimate()) {
        frame.current = null;
        return;
      }

      position.current.x += (target.current.x - position.current.x) * 0.2;
      position.current.y += (target.current.y - position.current.y) * 0.2;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${Math.round(position.current.x)}px`;
        cursorRef.current.style.top = `${Math.round(position.current.y)}px`;
      }

      frame.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      stopAnimation();
    };
  }, []);

  const isPill =
    cursorMode === "pronounce" ||
    cursorMode === "view" ||
    cursorMode === "email";
  const isLink = cursorMode === "link";
  const scale = isPressed ? 0.7 : 1;

  const opacity = !isActive
    ? 0
    : isPressed
      ? 1
      : isLink
        ? undefined
        : 1;

  const pill = isPill ? pillConfig[cursorMode] : null;
  const PillIcon = pill?.icon;
  const pillLabel =
    cursorMode === "email" && emailCopied ? "Copied!" : (pill?.label ?? "");

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`custom-cursor${isPill ? " custom-cursor--pill" : ""}${isLink ? " custom-cursor--link" : ""}${isPressed ? " custom-cursor--pressed" : ""}`}
      style={{
        opacity: isPill ? (isActive ? 1 : 0) : opacity,
        visibility: isActive ? "visible" : "hidden",
        transform: `translate(-50%, -50%) scale(${scale})`,
      }}
    >
      <span className="custom-cursor__icon">
        {PillIcon ? (
          <PillIcon size={16} strokeWidth={2} absoluteStrokeWidth />
        ) : null}
      </span>
      <span
        className="custom-cursor__label"
        style={{ maxWidth: pill ? pill.maxWidth : 0 }}
      >
        {pillLabel}
      </span>
    </div>
  );
}
