"use client";

import {
  getActiveSectionId,
  scrollToCaseStudySection,
  type CaseStudySection,
} from "@/app/lib/case-study-scroll";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface CaseStudySectionNavContextValue {
  activeId: string;
  scrollToSection: (id: string) => void;
}

const CaseStudySectionNavContext =
  createContext<CaseStudySectionNavContextValue | null>(null);

export function CaseStudySectionNavProvider({
  sections,
  children,
}: {
  sections: CaseStudySection[];
  children: ReactNode;
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const isNavigatingRef = useRef(false);
  const navigateTimeoutRef = useRef<number | null>(null);

  const syncActiveSection = useCallback(() => {
    if (isNavigatingRef.current) {
      return;
    }

    const nextId = getActiveSectionId(sections);
    if (nextId) {
      setActiveId(nextId);
    }
  }, [sections]);

  const scrollToSection = useCallback((id: string) => {
    if (!scrollToCaseStudySection(id, "smooth")) {
      return;
    }

    isNavigatingRef.current = true;
    setActiveId(id);
    window.history.pushState(null, "", `#${id}`);

    if (navigateTimeoutRef.current !== null) {
      window.clearTimeout(navigateTimeoutRef.current);
    }

    navigateTimeoutRef.current = window.setTimeout(() => {
      isNavigatingRef.current = false;
      navigateTimeoutRef.current = null;
    }, 800);
  }, []);

  useEffect(() => {
    if (sections.length === 0) {
      return;
    }

    const hash = window.location.hash.slice(1);
    if (hash && sections.some((section) => section.id === hash)) {
      isNavigatingRef.current = true;
      window.requestAnimationFrame(() => {
        setActiveId(hash);
        scrollToCaseStudySection(hash, "instant");
        window.setTimeout(() => {
          isNavigatingRef.current = false;
        }, 100);
      });
    } else {
      window.requestAnimationFrame(() => syncActiveSection());
    }

    const onScroll = () => syncActiveSection();
    const onScrollEnd = () => syncActiveSection();
    const onResize = () => syncActiveSection();
    const onHashChange = () => {
      const nextHash = window.location.hash.slice(1);
      if (!nextHash || !sections.some((section) => section.id === nextHash)) {
        return;
      }

      isNavigatingRef.current = true;
      setActiveId(nextHash);
      scrollToCaseStudySection(nextHash, "smooth");
      window.setTimeout(() => {
        isNavigatingRef.current = false;
      }, 800);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("hashchange", onHashChange);

    if ("onscrollend" in window) {
      window.addEventListener("scrollend", onScrollEnd);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("hashchange", onHashChange);

      if ("onscrollend" in window) {
        window.removeEventListener("scrollend", onScrollEnd);
      }

      if (navigateTimeoutRef.current !== null) {
        window.clearTimeout(navigateTimeoutRef.current);
      }
    };
  }, [sections, syncActiveSection]);

  return (
    <CaseStudySectionNavContext.Provider value={{ activeId, scrollToSection }}>
      {children}
    </CaseStudySectionNavContext.Provider>
  );
}

export function useCaseStudySectionNav() {
  const context = useContext(CaseStudySectionNavContext);

  if (!context) {
    throw new Error(
      "useCaseStudySectionNav must be used within CaseStudySectionNavProvider"
    );
  }

  return context;
}
