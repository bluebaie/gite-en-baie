import Hero from "../components/Hero";
import Section2Featured from "../components/Section2Featured";
import { fetchGites } from "../lib/airtable";
import { computeGlobalRatings } from "../lib/ratings";
import Section3Experience from "../components/Section3Experience";
import Section4Reviews from "../components/Section4Reviews";
import Section5Discover from "../components/Section5Discover";
import Section6Contact from "../components/Section6Contact";
import Section7Partners from "@/components/Section7Partners";

export default async function HomePage() {
  const all = await fetchGites();
  const highlights = all.filter((g) => g.misEnAvant);
  const ratings = computeGlobalRatings(all);

  return (
    <>
      <Hero ratings={ratings} />
      <Section2Featured highlights={highlights} />
      <Section3Experience />
      <Section4Reviews />
      <Section5Discover />
      <Section6Contact />
      <Section7Partners />
      </>
  );
}