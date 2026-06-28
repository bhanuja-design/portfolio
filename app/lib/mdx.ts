export interface CaseStudySection {
  id: string;
  label: string;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function extractSectionHeadings(content: string): CaseStudySection[] {
  const headings: CaseStudySection[] = [];
  const usedIds = new Set<string>();
  const pattern = /^##\s+(.+)$/gm;

  for (const match of content.matchAll(pattern)) {
    const label = match[1].trim();
    let id = slugifyHeading(label);

    if (usedIds.has(id)) {
      let suffix = 2;
      while (usedIds.has(`${id}-${suffix}`)) {
        suffix += 1;
      }
      id = `${id}-${suffix}`;
    }

    usedIds.add(id);
    headings.push({ id, label });
  }

  return headings;
}

/** Replace `##` headings with id-bearing components so render uses parsed IDs only. */
export function injectSectionHeadingComponents(
  content: string,
  sections: CaseStudySection[]
): string {
  let sectionIndex = 0;

  return content.replace(/^##\s+(.+)$/gm, (_, rawLabel: string) => {
    const label = rawLabel.trim();
    const section = sections[sectionIndex];
    sectionIndex += 1;
    const id = section?.id ?? slugifyHeading(label);

    return `<SectionHeading id="${id}">${label}</SectionHeading>`;
  });
}

export function extractPlainText(value: unknown): string {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map(extractPlainText).join("");
  }

  if (value && typeof value === "object" && "props" in value) {
    const props = (value as { props?: { children?: unknown } }).props;

    if (props?.children !== undefined) {
      return extractPlainText(props.children);
    }
  }

  return "";
}
