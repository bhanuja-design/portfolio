"use client";

import CaseStudySectionNavList from "@/app/components/work/CaseStudySectionNavList";
import type { CaseStudySection } from "@/app/lib/case-study-scroll";

interface CaseStudyNavProps {
  sections: CaseStudySection[];
}

export default function CaseStudyNav({ sections }: CaseStudyNavProps) {
  return <CaseStudySectionNavList sections={sections} variant="sidebar" />;
}
