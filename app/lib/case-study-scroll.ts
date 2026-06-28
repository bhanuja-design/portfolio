import type { CaseStudySection } from "@/app/lib/mdx";

export type { CaseStudySection };

const NAV_MEDIA = "(min-width: 48rem)";
const BACK_LABEL_SELECTOR = ".case-study-back__label";
const MOBILE_NAV_SELECTOR = ".case-study-mobile-nav";
const SECTION_HEADING_CLASS = "case-study__section-heading";
const BODY_SELECTOR = ".case-study__body";

export function isCaseStudyNavVisible(): boolean {
  return window.matchMedia(NAV_MEDIA).matches;
}

/** Live Y position of the back label — the line section headings align to. */
export function getScrollAlignTop(): number {
  if (!isCaseStudyNavVisible()) {
    const mobileNav = document.querySelector(MOBILE_NAV_SELECTOR);
    if (mobileNav instanceof HTMLElement) {
      return Math.round(mobileNav.getBoundingClientRect().bottom + 8);
    }

    return Math.round(window.innerHeight * 0.12);
  }

  const backLabel = document.querySelector(BACK_LABEL_SELECTOR);
  if (backLabel instanceof HTMLElement) {
    return backLabel.getBoundingClientRect().top;
  }

  return Math.round(window.innerHeight * 0.2);
}

function getHeadingScrollTop(target: HTMLElement): number {
  const alignTop = getScrollAlignTop();
  return Math.max(0, Math.round(target.getBoundingClientRect().top + window.scrollY - alignTop));
}

function correctScrollAlignment(target: HTMLElement): number {
  const alignTop = getScrollAlignTop();
  const delta = target.getBoundingClientRect().top - alignTop;

  if (Math.abs(delta) > 0.5) {
    window.scrollBy({ top: delta, behavior: "instant" });
  }

  return Math.abs(target.getBoundingClientRect().top - getScrollAlignTop());
}

function finalizeScrollAlignment(target: HTMLElement, attempt = 0) {
  const remaining = correctScrollAlignment(target);

  if (remaining > 0.5 && attempt < 5) {
    window.requestAnimationFrame(() => finalizeScrollAlignment(target, attempt + 1));
  }
}

/**
 * Pick the section with the most content visible in the reading zone
 * (from the back-button line to the bottom of the viewport). This stays
 * accurate during fast scrolls where a single-line crossing test can skip
 * the penultimate section entirely.
 */
export function getActiveSectionId(
  sections: CaseStudySection[],
  alignTop = getScrollAlignTop()
): string | null {
  if (sections.length === 0) {
    return null;
  }

  const zoneTop = alignTop;
  const zoneBottom = window.innerHeight;
  const body = document.querySelector(BODY_SELECTOR);
  const bodyBottom =
    body?.lastElementChild instanceof HTMLElement
      ? body.lastElementChild.getBoundingClientRect().bottom
      : zoneBottom;

  let activeId = sections[0].id;
  let bestVisible = -1;

  for (let i = 0; i < sections.length; i++) {
    const startEl = document.getElementById(sections[i].id);
    const nextEl =
      i < sections.length - 1
        ? document.getElementById(sections[i + 1].id)
        : null;

    if (!startEl) {
      continue;
    }

    const sectionTop = startEl.getBoundingClientRect().top;
    const sectionBottom = nextEl
      ? nextEl.getBoundingClientRect().top
      : bodyBottom;

    const visibleTop = Math.max(sectionTop, zoneTop);
    const visibleBottom = Math.min(sectionBottom, zoneBottom);
    const visible = Math.max(0, visibleBottom - visibleTop);

    if (visible > bestVisible) {
      bestVisible = visible;
      activeId = sections[i].id;
    }
  }

  return activeId;
}

export function scrollToCaseStudySection(
  id: string,
  behavior: ScrollBehavior = "smooth"
): boolean {
  const target = document.getElementById(id);
  if (!target?.classList.contains(SECTION_HEADING_CLASS)) {
    return false;
  }

  window.scrollTo({
    top: getHeadingScrollTop(target),
    behavior,
  });

  const finalize = () => finalizeScrollAlignment(target);

  if (behavior === "instant") {
    window.requestAnimationFrame(finalize);
    return true;
  }

  if ("onscrollend" in window) {
    window.addEventListener("scrollend", finalize, { once: true });
  }

  globalThis.setTimeout(finalize, 900);
  return true;
}
