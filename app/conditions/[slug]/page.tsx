import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConditionPage } from "@/components/condition-page";
import { conditionBySlug, conditionPages } from "@/lib/content/conditions";

type ConditionRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return conditionPages.map((condition) => ({ slug: condition.slug }));
}

export async function generateMetadata({ params }: ConditionRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const condition = conditionBySlug.get(slug);

  if (!condition) {
    return {};
  }

  return {
    title: condition.title,
    description: condition.metaDescription,
    alternates: {
      canonical: `/conditions/${condition.slug}`,
    },
    openGraph: {
      title: condition.title,
      description: condition.metaDescription,
      type: "article",
    },
  };
}

export default async function ConditionRoute({ params }: ConditionRouteProps) {
  const { slug } = await params;
  const condition = conditionBySlug.get(slug);

  if (!condition) {
    notFound();
  }

  return <ConditionPage condition={condition} />;
}
