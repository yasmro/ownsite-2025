import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeWorksFields {
    title: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.RichText;
    slug?: EntryFieldTypes.Symbol;
    photos?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    order?: EntryFieldTypes.Integer;
    category?: EntryFieldTypes.EntryLink<EntrySkeletonType>;
}

export type TypeWorksSkeleton = EntrySkeletonType<TypeWorksFields, "works">;
export type TypeWorks<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeWorksSkeleton, Modifiers, Locales>;
export type TypeWorksWithoutLinkResolutionResponse = TypeWorks<"WITHOUT_LINK_RESOLUTION">;
export type TypeWorksWithoutUnresolvableLinksResponse = TypeWorks<"WITHOUT_UNRESOLVABLE_LINKS">;
export type TypeWorksWithAllLocalesResponse<Locales extends LocaleCode = LocaleCode> = TypeWorks<"WITH_ALL_LOCALES", Locales>;
export type TypeWorksWithAllLocalesAndWithoutLinkResolutionResponse<Locales extends LocaleCode = LocaleCode> = TypeWorks<"WITHOUT_LINK_RESOLUTION" | "WITH_ALL_LOCALES", Locales>;
export type TypeWorksWithAllLocalesAndWithoutUnresolvableLinksResponse<Locales extends LocaleCode = LocaleCode> = TypeWorks<"WITHOUT_UNRESOLVABLE_LINKS" | "WITH_ALL_LOCALES", Locales>;
