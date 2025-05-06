import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeCategoryFields {
    name?: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.Text;
    relatedWork?: EntryFieldTypes.EntryLink<EntrySkeletonType>;
}

export type TypeCategorySkeleton = EntrySkeletonType<TypeCategoryFields, "category">;
export type TypeCategory<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeCategorySkeleton, Modifiers, Locales>;
export type TypeCategoryWithoutLinkResolutionResponse = TypeCategory<"WITHOUT_LINK_RESOLUTION">;
export type TypeCategoryWithoutUnresolvableLinksResponse = TypeCategory<"WITHOUT_UNRESOLVABLE_LINKS">;
export type TypeCategoryWithAllLocalesResponse<Locales extends LocaleCode = LocaleCode> = TypeCategory<"WITH_ALL_LOCALES", Locales>;
export type TypeCategoryWithAllLocalesAndWithoutLinkResolutionResponse<Locales extends LocaleCode = LocaleCode> = TypeCategory<"WITHOUT_LINK_RESOLUTION" | "WITH_ALL_LOCALES", Locales>;
export type TypeCategoryWithAllLocalesAndWithoutUnresolvableLinksResponse<Locales extends LocaleCode = LocaleCode> = TypeCategory<"WITHOUT_UNRESOLVABLE_LINKS" | "WITH_ALL_LOCALES", Locales>;
