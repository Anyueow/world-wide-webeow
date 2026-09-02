import type { ImpactItem } from "@/lib/types";

/**
 * ===========================================================================
 * NOT BUILT YET. Waiting on approval of the Experiences timeline first.
 * ===========================================================================
 *
 * The page at /impact already reads this array, so the section renders the
 * moment entries land here. Nothing else needs to change.
 *
 * Source list from the Notion spec, to be filled in with real URLs:
 *
 *   Research   NLP dialect bias mitigation paper
 *   Research   ESG scores versus S&P 500 returns
 *   Research   RAG model benchmarking capstone
 *   Research   Trend prediction from social media
 *   Project    Vera (GitHub repo and report)
 *   Project    Flood risk model (GitHub) and flood remediation doc
 *   Project    TradePulse stock prediction
 *   Project    FindHer live site
 *   Prototype  Tyle.ai Figma
 *   Prototype  FindHer Figma
 *   Prototype  Sandcastles Figma
 *   Prototype  Sherman Center Venture Co-op Airtable MVP
 *   Talk       AI Runtime, "Collaborating with AI: The Workflow Shift We
 *              Haven't Made Yet", June 16
 *   Press      Huntington Angels Network team page, plus any coverage
 */
export const impactItems: ImpactItem[] = [];

export function impactByType(): { type: string; items: ImpactItem[] }[] {
  const order = ["Research", "Project", "Prototype", "Talk", "Press"];
  const buckets = new Map<string, ImpactItem[]>();
  for (const item of impactItems) {
    const list = buckets.get(item.type) ?? [];
    list.push(item);
    buckets.set(item.type, list);
  }
  return order
    .filter((type) => buckets.has(type))
    .map((type) => ({ type, items: buckets.get(type)! }));
}
