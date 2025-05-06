import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeTagFields {
    name?: EntryFieldTypes.Symbol;
}

export type TypeTagSkeleton = EntrySkeletonType<TypeTagFields, "tag">;
export type TypeTag<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeTagSkeleton, Modifiers, Locales>;
export type TypeTagWithoutLinkResolutionResponse = TypeTag<"WITHOUT_LINK_RESOLUTION">;
export type TypeTagWithoutUnresolvableLinksResponse = TypeTag<"WITHOUT_UNRESOLVABLE_LINKS">;
export type TypeTagWithAllLocalesResponse<Locales extends LocaleCode = LocaleCode> = TypeTag<"WITH_ALL_LOCALES", Locales>;
export type TypeTagWithAllLocalesAndWithoutLinkResolutionResponse<Locales extends LocaleCode = LocaleCode> = TypeTag<"WITHOUT_LINK_RESOLUTION" | "WITH_ALL_LOCALES", Locales>;
export type TypeTagWithAllLocalesAndWithoutUnresolvableLinksResponse<Locales extends LocaleCode = LocaleCode> = TypeTag<"WITHOUT_UNRESOLVABLE_LINKS" | "WITH_ALL_LOCALES", Locales>;
