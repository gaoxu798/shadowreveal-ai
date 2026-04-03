/* ─────────────────────────────────────────────────────────────
   Single source of truth for gallery items.
   Imported by both components/Gallery.tsx and
   app/gallery/[id]/page.tsx so slugs & metadata stay in sync.
───────────────────────────────────────────────────────────── */
export type GalleryItem = {
  id: number;
  slug: string;
  imageUrl: string;
  prompt: string;
  author: string;
  date: string;
  /** Full SEO title used on the individual theory page */
  seoTitle: string;
  /** Full SEO description used on the individual theory page */
  seoDescription: string;
};

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    slug: "immortal-queen-ancient-throne",
    imageUrl: "/images/gallery/reveal_01.jpg",
    prompt: "Ancient queen enthroned in a ruined temple, crimson eyes cold as dying stars, spike crown forged from erased history, scepter of forbidden authority resting in her palm.",
    author: "D·Raven",
    date: "2026-03-28",
    seoTitle: "Imu Face Reveal Theory: Immortal Queen on the Ancient Throne — ShadowReveal.AI",
    seoDescription: "Fan theory visualization of Im-sama as an immortal queen seated on a ruined ancient throne, crimson eyes and spike crown. AI-generated Imu face reveal concept art.",
  },
  {
    id: 2,
    slug: "sovereign-profile-thorn-crown",
    imageUrl: "/images/gallery/reveal_02.jpg",
    prompt: "She never looks directly at you. The sovereign gazes into the void she created — thorn crown, black silk hair, eyes that have witnessed 800 years of obedient silence.",
    author: "Void_Scribe",
    date: "2026-03-29",
    seoTitle: "Imu Face Reveal Theory: Sovereign Profile with Thorn Crown — ShadowReveal.AI",
    seoDescription: "Side-profile AI visualization of Imu from One Piece wearing a thorn crown, gazing into the void. Atmospheric dark-fantasy Imu face reveal concept.",
  },
  {
    id: 3,
    slug: "void-sovereign-mother-flame",
    imageUrl: "/images/gallery/reveal_03.jpg",
    prompt: "Standing atop the ruins of truth — one hand gripping the scepter of dominion, the other cradling a swirling void. The Mother Flame's mistress, red-eyed and absolute.",
    author: "SeaKing_IX",
    date: "2026-03-30",
    seoTitle: "Imu Face Reveal Theory: Void Sovereign Wielding the Mother Flame — ShadowReveal.AI",
    seoDescription: "AI-generated full-body reveal of Im-sama wielding void energy and the scepter of dominion. Inspired by the Mother Flame arc in One Piece.",
  },
  {
    id: 4,
    slug: "shadow-eyes-scale-of-dominion",
    imageUrl: "/images/gallery/reveal_04.jpg",
    prompt: "She holds the world in her shadow. A lone figure stands at her chest — not a decoration, but a reminder of scale. Her face remains darkness. Only the eyes are real.",
    author: "PoneGlyph",
    date: "2026-03-30",
    seoTitle: "Imu Face Reveal Theory: Shadow Sovereign and the Scale of Dominion — ShadowReveal.AI",
    seoDescription: "Haunting Imu face reveal concept: the sovereign's face obscured in shadow, crimson eyes glowing, a lone figure dwarfed by her scale of power.",
  },
  {
    id: 5,
    slug: "dark-king-crimson-throne",
    imageUrl: "/images/gallery/reveal_05.jpg",
    prompt: "Not every theory agrees on gender. Some claim the sovereign is a king — alabaster-skinned, crimson-eyed, with a scepter carved from the bones of the D. Clan.",
    author: "WillOfD__",
    date: "2026-03-31",
    seoTitle: "Imu Face Reveal Theory: The Dark King on the Crimson Throne — ShadowReveal.AI",
    seoDescription: "Alternative Imu face reveal theory: Im-sama visualized as a male dark king with crimson eyes, seated on a bone-carved throne. AI-generated One Piece fan art.",
  },
  {
    id: 6,
    slug: "hooded-void-entity-single-eye",
    imageUrl: "/images/gallery/reveal_06.jpg",
    prompt: "No face. One eye. A purple maelstrom of erased centuries orbiting an outstretched hand. This is what remains when a person becomes a concept — the Void Century, given form and crowned.",
    author: "AncientWeapon",
    date: "2026-04-01",
    seoTitle: "Imu Face Reveal Theory: Hooded Void Entity with One Crimson Eye — ShadowReveal.AI",
    seoDescription: "Faceless Imu visualization: a hooded sovereign with one glowing eye, surrounded by floating runes and void energy. AI-generated Imu face reveal for One Piece fans.",
  },
  {
    id: 7,
    slug: "ancient-patriarch-white-beard",
    imageUrl: "/images/gallery/reveal_07.jpg",
    prompt: "Before the world had a name for evil, there was this face. Ancient, white-bearded, crimson-eyed — the original architect of order, seated on a throne of crumbling history, still holding the orb.",
    author: "NikasProphecy",
    date: "2026-04-01",
    seoTitle: "Imu Face Reveal Theory: The Ancient White-Bearded Patriarch — ShadowReveal.AI",
    seoDescription: "Ancient Imu face reveal theory: Im-sama as an immortal patriarch with white beard and crimson eyes, the original architect of the World Government. AI fan concept.",
  },
];

/** Look up a single item by slug — used in the dynamic route */
export function getItemBySlug(slug: string): GalleryItem | undefined {
  return GALLERY_ITEMS.find((item) => item.slug === slug);
}
