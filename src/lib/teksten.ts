import { getCollection, getEntry, render } from "astro:content";

/** Eén tekstblok uit src/content/teksten/<id>.md, met frontmatter en gerenderde inhoud. */
export async function getTekst(id: string) {
  const entry = await getEntry("teksten", id);
  if (!entry) throw new Error(`Tekst ontbreekt: src/content/teksten/${id}.md`);
  const { Content } = await render(entry);
  return { ...entry.data, Content };
}

/** Alle diensten uit src/content/teksten/diensten/, op `volgorde`. */
export async function getDiensten() {
  const entries = (await getCollection("teksten", ({ id }) => id.startsWith("diensten/"))).sort(
    (a, b) => (a.data.volgorde ?? 99) - (b.data.volgorde ?? 99)
  );
  return Promise.all(
    entries.map(async (entry) => ({ ...entry.data, id: entry.id, Content: (await render(entry)).Content }))
  );
}

/** Contactlinks uit src/content/links.json, in de volgorde van het bestand. */
export async function getLinks() {
  return (await getCollection("links")).map(({ data }) => data);
}
