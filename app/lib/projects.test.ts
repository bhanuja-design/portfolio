import { describe, expect, it } from "vitest";
import { getProjectBySlug } from "@/app/lib/projects";

describe("getProjectBySlug", () => {
  it("loads a valid project slug", () => {
    const project = getProjectBySlug("project-1");

    expect(project).not.toBeNull();
    expect(project?.metadata.slug).toBe("project-1");
  });

  it("rejects invalid slug values", () => {
    expect(getProjectBySlug(".")).toBeNull();
    expect(getProjectBySlug("..")).toBeNull();
    expect(getProjectBySlug("")).toBeNull();
    expect(getProjectBySlug("not-a-project")).toBeNull();
  });

  it("normalizes path segments without escaping the projects directory", () => {
    const direct = getProjectBySlug("project-1");
    const viaParent = getProjectBySlug("../project-1");

    expect(viaParent?.metadata.slug).toBe(direct?.metadata.slug);
    expect(getProjectBySlug("../../package.json")).toBeNull();
  });
});
