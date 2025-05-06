import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeWhatICanDoFields {
    title?: EntryFieldTypes.Symbol;
    relatedSkills?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    description?: EntryFieldTypes.Text;
    order?: EntryFieldTypes.Integer;
    relatedWork?: EntryFieldTypes.EntryLink<EntrySkeletonType>;
    workSlug?: EntryFieldTypes.Symbol;
    iconClassName?: EntryFieldTypes.Symbol;
}

export type TypeWhatICanDoSkeleton = EntrySkeletonType<TypeWhatICanDoFields, "whatICanDo">;
export type TypeWhatICanDo<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeWhatICanDoSkeleton, Modifiers, Locales>;
export type TypeWhatICanDoWithoutLinkResolutionResponse = TypeWhatICanDo<"WITHOUT_LINK_RESOLUTION">;
export type TypeWhatICanDoWithoutUnresolvableLinksResponse = TypeWhatICanDo<"WITHOUT_UNRESOLVABLE_LINKS">;
export type TypeWhatICanDoWithAllLocalesResponse<Locales extends LocaleCode = LocaleCode> = TypeWhatICanDo<"WITH_ALL_LOCALES", Locales>;
export type TypeWhatICanDoWithAllLocalesAndWithoutLinkResolutionResponse<Locales extends LocaleCode = LocaleCode> = TypeWhatICanDo<"WITHOUT_LINK_RESOLUTION" | "WITH_ALL_LOCALES", Locales>;
export type TypeWhatICanDoWithAllLocalesAndWithoutUnresolvableLinksResponse<Locales extends LocaleCode = LocaleCode> = TypeWhatICanDo<"WITHOUT_UNRESOLVABLE_LINKS" | "WITH_ALL_LOCALES", Locales>;
