import { describe, expect, it, vi, beforeEach } from "vitest";
import { getActiveSectionId } from "@/app/lib/case-study-scroll";
import type { CaseStudySection } from "@/app/lib/mdx";

const ZONE_TOP = 100;
const VIEWPORT_HEIGHT = 800;

function mockRect(top: number, bottom: number): DOMRect {
  return {
    top,
    bottom,
    left: 0,
    right: 0,
    width: 0,
    height: bottom - top,
    x: 0,
    y: top,
    toJSON: () => ({}),
  } as DOMRect;
}

function mockHeading(id: string, top: number, bottom: number): HTMLElement {
  const element = document.createElement("h2");
  element.id = id;
  element.className = "case-study__section-heading";
  element.getBoundingClientRect = vi.fn(() => mockRect(top, bottom));
  return element;
}

function mountCaseStudyDom(
  headings: Array<{ id: string; top: number; bottom: number }>,
  bodyBottom = 2000
) {
  document.body.innerHTML = `
    <div class="case-study__body">
      <p class="case-study__paragraph">Tail content</p>
    </div>
  `;

  const body = document.querySelector(".case-study__body")!;
  const tail = body.lastElementChild as HTMLElement;
  tail.getBoundingClientRect = vi.fn(() => mockRect(bodyBottom - 40, bodyBottom));

  for (const heading of headings) {
    body.insertBefore(
      mockHeading(heading.id, heading.top, heading.bottom),
      tail
    );
  }

  window.innerHeight = VIEWPORT_HEIGHT;
}

describe("getActiveSectionId", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("returns null when there are no sections", () => {
    expect(getActiveSectionId([], ZONE_TOP)).toBeNull();
  });

  it("returns the first section when it is the only match", () => {
    const sections: CaseStudySection[] = [
      { id: "overview", label: "Overview" },
    ];

    mountCaseStudyDom([{ id: "overview", top: 120, bottom: 500 }]);

    expect(getActiveSectionId(sections, ZONE_TOP)).toBe("overview");
  });

  it("picks the section with the most visible content in the reading zone", () => {
    const sections: CaseStudySection[] = [
      { id: "overview", label: "Overview" },
      { id: "problem", label: "Problem" },
      { id: "solution", label: "Solution" },
    ];

    mountCaseStudyDom([
      { id: "overview", top: -200, bottom: 80 },
      { id: "problem", top: 80, bottom: 520 },
      { id: "solution", top: 520, bottom: 900 },
    ]);

    expect(getActiveSectionId(sections, ZONE_TOP)).toBe("problem");
  });

  it("skips sections whose heading elements are missing", () => {
    const sections: CaseStudySection[] = [
      { id: "missing", label: "Missing" },
      { id: "overview", label: "Overview" },
    ];

    mountCaseStudyDom([{ id: "overview", top: 150, bottom: 600 }]);

    expect(getActiveSectionId(sections, ZONE_TOP)).toBe("overview");
  });
});
