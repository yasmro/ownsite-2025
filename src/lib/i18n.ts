export const LANGS = {
  ja: "日本語",
  en: "English",
} as const;

export type Lang = keyof typeof LANGS;
export type Multilingual = Record<Lang, string>;

export function useTranslations(lang: Lang) {
  return function t(multilingual: Multilingual): string {
    return multilingual[lang];
  };
}
