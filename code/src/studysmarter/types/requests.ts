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

export type CreateFlashCardRetval = {
    ai_generated: unknown | null;
    answer_html: {
        text: string;
        is_correct: boolean;
    }[];
    question_html: {
        text: string;
        is_correct: boolean;
    }[];
    community_applied_tag_ids: number[];
    created: string;
    creator: number;
    flashcard_image_ids: null | number[] | unknown;
    hint_html: string[];
    id: number;
    is_reference: boolean;
    is_type_answer: boolean;
    original_studyset_id: number;
    partner_logo: null | string | unknown;
    priority: number;
    shared: number;
    slide_number: null | number;
    slideset_id: null | number;
    slideset_name: null | string;
    solution_html: string;
    spaced_repetition: unknown | null;
    state: number;
    studysets: number[];
    tags: number[];
    time_to_answer: number;
    updated: string;
}

export type EditFlashCardRetval = CreateFlashCardRetval
export type StudySetRetval = {results: Studyset[]}
export type SubsetRetval = Studyset[]