import { describe, expect, it } from "vitest";
import { conditionPages } from "./conditions";
import { services } from "./services";

describe("service and condition coverage", () => {
  it("links every SEO condition page to at least one service", () => {
    const linkedSlugs = new Set(
      services.flatMap((service) => service.relatedConditions.map((condition) => condition.slug))
    );

    const uncoveredConditions = conditionPages
      .map((condition) => condition.slug)
      .filter((slug) => !linkedSlugs.has(slug));

    expect(uncoveredConditions).toEqual([]);
  });
});
