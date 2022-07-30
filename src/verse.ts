import { EmbedBuilder } from "discord.js";
import quran from "./quran.json";

export type verse = {
  id: number[]; // Both start at zero
  en: string;
  ar: string;
  chapter: {
    en: string;
    ar: string;
  };
};

// Format verse object to embed
export function formatVerse(verse: verse, trigger?: string): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(0xf03036)
    .setAuthor({ name: "The Holy Quran | QuranBot" })
    .setTitle(`[${verse.id[0] + 1}:${verse.id[1] + 1}]`)
    .setDescription(verse.en)
    .addFields(
      { name: "Arabic", value: verse.ar },
      { name: "Chapter", value: `${verse.chapter.en} | ${verse.chapter.ar}` },
    )
    .setFooter({
      text: trigger ? `Heeded the phrase '${trigger}'` : "Trust Allah",
    });
}

// Get verse from chapter and verse ids
export function getVerse(chapterId: number, verseId: number): verse {
  return {
    id: [chapterId, verseId],
    en: quran[chapterId].verses[verseId].en,
    ar: quran[chapterId].verses[verseId].ar,
    chapter: {
      en: quran[chapterId].name.en,
      ar: quran[chapterId].name.ar,
    },
  };
}
// Above, as embed
export function getVerseEmbed(chapter: number, verse: number): EmbedBuilder {
  return formatVerse(getVerse(chapter, verse));
}

// Get random verse
export function randomVerse(): verse {
  const chapter = Math.floor(Math.random() * (quran.length - 1));
  return getVerse(
    chapter,
    Math.floor(Math.random() * (quran[chapter].verses.length - 1)),
  );
}
// Above, as embed
export function randomVerseEmbed(trigger?: string): EmbedBuilder {
  return formatVerse(randomVerse(), trigger);
}
