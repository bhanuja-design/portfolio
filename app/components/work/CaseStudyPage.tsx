import CaseStudyContent from "@/app/components/work/CaseStudyContent";
import CaseStudyHeader from "@/app/components/work/CaseStudyHeader";
import CaseStudyMobileNav from "@/app/components/work/CaseStudyMobileNav";
import CaseStudySidebar from "@/app/components/work/CaseStudySidebar";
import { CaseStudySectionNavProvider } from "@/app/components/work/CaseStudySectionNavProvider";
import { extractSectionHeadings } from "@/app/lib/mdx";
import type { ProjectDetail } from "@/app/lib/projects";

export default function CaseStudyPage({ metadata, content }: ProjectDetail) {
  const sections = extractSectionHeadings(content);

  return (
    <CaseStudySectionNavProvider sections={sections}>
      <main className="case-study min-w-0">
        <div className="case-study__frame">
          <CaseStudySidebar sections={sections} />
          <article className="case-study__main">
            <div className="case-study__stack">
              <CaseStudyHeader project={metadata} />
              <CaseStudyMobileNav sections={sections} />
              <CaseStudyContent content={content} sections={sections} />
            </div>
          </article>
          <div className="case-study__rail" aria-hidden="true" />
        </div>
      </main>
    </CaseStudySectionNavProvider>
  );
}
