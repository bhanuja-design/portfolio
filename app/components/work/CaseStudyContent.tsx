import { MDXRemote } from "next-mdx-remote/rsc";
import type { ComponentProps, ReactNode } from "react";
import {
  injectSectionHeadingComponents,
  slugifyHeading,
  extractPlainText,
  type CaseStudySection,
} from "@/app/lib/mdx";

function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="case-study__section-heading">
      {children}
    </h2>
  );
}

function SubsectionHeading({ children }: { children: ReactNode }) {
  const text = extractPlainText(children);

  return (
    <h3 id={slugifyHeading(text)} className="case-study__subsection-heading">
      {children}
    </h3>
  );
}

const mdxComponents = {
  SectionHeading,
  h1: () => null,
  h2: ({ children }: ComponentProps<"h2">) => (
    <h2 className="case-study__section-heading">{children}</h2>
  ),
  h3: ({ children }: ComponentProps<"h3">) => (
    <SubsectionHeading>{children}</SubsectionHeading>
  ),
  p: ({ children }: ComponentProps<"p">) => (
    <p className="case-study__paragraph">{children}</p>
  ),
  ul: ({ children }: ComponentProps<"ul">) => (
    <ul className="case-study__list">{children}</ul>
  ),
  ol: ({ children }: ComponentProps<"ol">) => (
    <ol className="case-study__list case-study__list--ordered">{children}</ol>
  ),
  li: ({ children }: ComponentProps<"li">) => (
    <li className="case-study__list-item">{children}</li>
  ),
  blockquote: ({ children }: ComponentProps<"blockquote">) => (
    <blockquote className="case-study__blockquote">{children}</blockquote>
  ),
};

interface CaseStudyContentProps {
  content: string;
  sections: CaseStudySection[];
}

export default function CaseStudyContent({
  content,
  sections,
}: CaseStudyContentProps) {
  const source = injectSectionHeadingComponents(content, sections);

  return (
    <div className="case-study__body">
      <MDXRemote source={source} components={mdxComponents} />
    </div>
  );
}
