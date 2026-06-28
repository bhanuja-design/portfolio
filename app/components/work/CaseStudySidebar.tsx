import CaseStudyBackLink from "@/app/components/work/CaseStudyBackLink";
import CaseStudyNav from "@/app/components/work/CaseStudyNav";
import type { CaseStudySection } from "@/app/lib/case-study-scroll";

interface CaseStudySidebarProps {
  sections: CaseStudySection[];
}

export default function CaseStudySidebar({ sections }: CaseStudySidebarProps) {
  return (
    <aside className="case-study__sidebar">
      <CaseStudyBackLink />
      <CaseStudyNav sections={sections} />
    </aside>
  );
}
