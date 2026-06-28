"use client";

import CaseStudySectionNavList from "@/app/components/work/CaseStudySectionNavList";
import type { CaseStudySection } from "@/app/lib/case-study-scroll";

interface CaseStudyMobileNavProps {
  sections: CaseStudySection[];
}

export default function CaseStudyMobileNav({ sections }: CaseStudyMobileNavProps) {
  return <CaseStudySectionNavList sections={sections} variant="mobile" />;
}
