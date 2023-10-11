import { Flashcard, Studyset, Tag } from "./index.js"

export type TagRetval = {
    all_parent_tags: Tag[]
    studyset_tags: Tag[]
    untagged_items_counter: number
}

export type FlashcardRetval = {
    count: number;
    next: unknown | null;
    previous: unknown | null;
    results: Flashcard[];
}


export type StudySetRetval = {results: Studyset[]}
export type SubsetRetval = Studyset[]