import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypePortfolioFields {
    title?: EntryFieldTypes.Symbol;
    jaTitle?: EntryFieldTypes.Symbol;
    createdAt?: EntryFieldTypes.Date;
    category?: EntryFieldTypes.EntryLink<EntrySkeletonType>;
    abstract?: EntryFieldTypes.Text;
    thumbnail?: EntryFieldTypes.AssetLink;
    tags?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<EntrySkeletonType>>;
    description?: EntryFieldTypes.Text;
    photos?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    slug?: EntryFieldTypes.Symbol;
    score?: EntryFieldTypes.Integer;
}

export type TypePortfolioSkeleton = EntrySkeletonType<TypePortfolioFields, "portfolio">;
export type TypePortfolio<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypePortfolioSkeleton, Modifiers, Locales>;
export type TypePortfolioWithoutLinkResolutionResponse = TypePortfolio<"WITHOUT_LINK_RESOLUTION">;
export type TypePortfolioWithoutUnresolvableLinksResponse = TypePortfolio<"WITHOUT_UNRESOLVABLE_LINKS">;
export type TypePortfolioWithAllLocalesResponse<Locales extends LocaleCode = LocaleCode> = TypePortfolio<"WITH_ALL_LOCALES", Locales>;
export type TypePortfolioWithAllLocalesAndWithoutLinkResolutionResponse<Locales extends LocaleCode = LocaleCode> = TypePortfolio<"WITHOUT_LINK_RESOLUTION" | "WITH_ALL_LOCALES", Locales>;
export type TypePortfolioWithAllLocalesAndWithoutUnresolvableLinksResponse<Locales extends LocaleCode = LocaleCode> = TypePortfolio<"WITHOUT_UNRESOLVABLE_LINKS" | "WITH_ALL_LOCALES", Locales>;
