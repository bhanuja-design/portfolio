import { describe, expect, it } from "vitest";
import {
  extractSectionHeadings,
  injectSectionHeadingComponents,
  slugifyHeading,
} from "@/app/lib/mdx";

describe("slugifyHeading", () => {
  it("lowercases and hyphenates text", () => {
    expect(slugifyHeading("Overview")).toBe("overview");
    expect(slugifyHeading("  Problem Space  ")).toBe("problem-space");
  });

  it("strips non-word characters", () => {
    expect(slugifyHeading("What's Next?")).toBe("whats-next");
    expect(slugifyHeading("Design & Research")).toBe("design-research");
  });
});

describe("extractSectionHeadings", () => {
  it("returns empty array when no h2 headings exist", () => {
    expect(extractSectionHeadings("# Title\n\nBody copy.")).toEqual([]);
  });

  it("extracts ## headings in document order", () => {
    const content = `
## Overview
Intro

## Problem
Details

### Subsection
`;

    expect(extractSectionHeadings(content)).toEqual([
      { id: "overview", label: "Overview" },
      { id: "problem", label: "Problem" },
    ]);
  });

  it("deduplicates ids for repeated labels", () => {
    const content = `
## Results
First

## Results
Second
`;

    expect(extractSectionHeadings(content)).toEqual([
      { id: "results", label: "Results" },
      { id: "results-2", label: "Results" },
    ]);
  });

  it("handles three or more duplicate labels", () => {
    const content = "## Goals\n\n## Goals\n\n## Goals\n";

    expect(extractSectionHeadings(content)).toEqual([
      { id: "goals", label: "Goals" },
      { id: "goals-2", label: "Goals" },
      { id: "goals-3", label: "Goals" },
    ]);
  });
});

describe("injectSectionHeadingComponents", () => {
  it("replaces ## headings with SectionHeading components using section ids", () => {
    const sections = [
      { id: "overview", label: "Overview" },
      { id: "problem", label: "Problem" },
    ];
    const content = "## Overview\n\nIntro\n\n## Problem\n\nDetails";

    expect(injectSectionHeadingComponents(content, sections)).toBe(
      "<SectionHeading id=\"overview\">Overview</SectionHeading>\n\nIntro\n\n<SectionHeading id=\"problem\">Problem</SectionHeading>\n\nDetails"
    );
  });

  it("falls back to slugifyHeading when sections are missing", () => {
    const content = "## Extra section\n\nBody";

    expect(injectSectionHeadingComponents(content, [])).toBe(
      "<SectionHeading id=\"extra-section\">Extra section</SectionHeading>\n\nBody"
    );
  });

  it("keeps injection order aligned with extractSectionHeadings", () => {
    const content = "## First\n\n## Second\n\n### Subsection";
    const sections = extractSectionHeadings(content);
    const injected = injectSectionHeadingComponents(content, sections);

    expect(injected).toContain('<SectionHeading id="first">First</SectionHeading>');
    expect(injected).toContain('<SectionHeading id="second">Second</SectionHeading>');
    expect(injected).toContain("### Subsection");
  });
});
