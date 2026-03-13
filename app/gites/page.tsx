import GitesGrid from "../../components/GitesGrid";
import { fetchGites } from "../../lib/airtable";

export default async function GitesPage() {
  const gites = await fetchGites();

  return <GitesGrid gites={gites} />;
}