import { createClient, type EntrySkeletonType } from "contentful";
import type { LocaleCode } from "contentful";
import type { Document } from "@contentful/rich-text-types";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import {
  documentToHtmlString,
  type Options,
} from "@contentful/rich-text-html-renderer";

const client = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});

/**
 * Contentfulから記事を取得する関数（ロケール対応）
 * @param contentType - 取得するコンテンツタイプ
 * @param locale - ロケールコード（例: 'en-US', 'ja'）
 * @returns 記事データの配列
 */
export async function fetchEntriesWithLocale<T extends EntrySkeletonType>(
  contentType: string,
  locale: LocaleCode
): Promise<Array<T["fields"]>> {
  const entries = await client.getEntries<T>({
    content_type: contentType,
    locale,
  });

  return entries.items.map((item) => item.fields);
}

/**
 * Contentfulから特定のエントリーを取得する関数
 * @param contentType - コンテンツタイプ
 * @param slug - エントリーのスラッグ
 * @param locale - ロケールコード（例: 'en-US', 'ja'）
 * @returns エントリーのデータ
 */
export async function fetchEntryWithLocaleBySlug<T extends EntrySkeletonType>(
  contentType: string,
  slug: string,
  locale: LocaleCode
): Promise<T["fields"] | null> {
  const entries = await client.getEntries<T>({
    content_type: contentType,
    ...(slug ? { "fields.slug": slug } : {}),
    locale,
  });

  if (entries.items.length > 0) {
    return entries.items[0].fields;
  }

  return null;
}

// HTML 変換オプションをカスタマイズ
const options: Options = {
  renderNode: {
    [BLOCKS.HEADING_1]: (node, next) => `<h1>${next(node.content)}</h1>`,
    [BLOCKS.HEADING_2]: (node, next) => `<h2>${next(node.content)}</h2>`,
    [BLOCKS.HEADING_3]: (node, next) => `<h3>${next(node.content)}</h3>`,
    [BLOCKS.HEADING_4]: (node, next) => `<h4>${next(node.content)}</h4>`,
    [BLOCKS.HEADING_5]: (node, next) => `<h5>${next(node.content)}</h5>`,
    [BLOCKS.HEADING_6]: (node, next) => `<h6>${next(node.content)}</h6>`,
    [BLOCKS.PARAGRAPH]: (node, next) => `<p>${next(node.content)}</p>`,
    [BLOCKS.QUOTE]: (node, next) =>
      `<blockquote>${next(node.content)}</blockquote>`,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { file, title } = node.data.target.fields;
      const url = file.url.startsWith("//") ? `https:${file.url}` : file.url;
      return `<img src="${url}" alt="${title || ""}" />`;
    },
    [INLINES.HYPERLINK]: (node, next) => {
      const url = node.data.uri;
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${next(
        node.content
      )}</a>`;
    },
  },
};

/**
 * ContentfulのリッチテキストをHTMLに変換する関数
 * @param doc - Contentfulのリッチテキストドキュメント
 * @returns HTML文字列
 */
export function renderRichText(doc: Document): string {
  return documentToHtmlString(doc, options);
}
