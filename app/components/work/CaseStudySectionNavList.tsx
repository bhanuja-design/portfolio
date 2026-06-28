"use client";

import type { CaseStudySection } from "@/app/lib/case-study-scroll";
import { useCaseStudySectionNav } from "@/app/components/work/CaseStudySectionNavProvider";

type CaseStudySectionNavVariant = "sidebar" | "mobile";

const navClassNames = {
  sidebar: {
    nav: "case-study-nav",
    list: "case-study-nav__list",
    item: "case-study-nav__item",
    button: "case-study-nav__button",
    buttonActive: "case-study-nav__button--active",
  },
  mobile: {
    nav: "case-study-mobile-nav",
    list: "case-study-mobile-nav__list",
    item: "case-study-mobile-nav__item",
    button: "case-study-mobile-nav__button",
    buttonActive: "case-study-mobile-nav__button--active",
  },
} as const;

interface CaseStudySectionNavListProps {
  sections: CaseStudySection[];
  variant: CaseStudySectionNavVariant;
}

export default function CaseStudySectionNavList({
  sections,
  variant,
}: CaseStudySectionNavListProps) {
  const { activeId, scrollToSection } = useCaseStudySectionNav();
  const classes = navClassNames[variant];

  if (sections.length === 0) {
    return null;
  }

  return (
    <nav className={classes.nav} aria-label="Case study sections">
      <ul className={classes.list}>
        {sections.map((section) => {
          const isActive = section.id === activeId;

          return (
            <li key={section.id} className={classes.item}>
              <button
                type="button"
                className={`${classes.button}${isActive ? ` ${classes.buttonActive}` : ""}`}
                aria-current={isActive ? "location" : undefined}
                onClick={() => scrollToSection(section.id)}
              >
                {section.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
