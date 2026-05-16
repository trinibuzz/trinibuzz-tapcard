import DigitalCardPage from "../card/[slug]/page";

export default function RootSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  return <DigitalCardPage params={params} />;
}