import { getCollection } from "astro:content";

/** Alle nieuwsberichten, nieuwste eerst. */
export async function getNieuws() {
  return (await getCollection("nieuws")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
}
