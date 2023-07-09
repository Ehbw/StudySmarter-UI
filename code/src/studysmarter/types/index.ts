export enum Endpoints {
    AUTH = "https://prod.studysmarter.de/api-token-auth/",
    STUDYSETS = "https://prod.studysmarter.de/studysets/",
    FLASHCARD = "https://prod.studysmarter.de/studysets/SETID/flashcards/CARDID",
    //https://prod.studysmarter.de/studysets/12808997/flashcards/185510965/
    TAGS = "https://prod.studysmarter.de/studysets/SETID/tags/?content_filter=flashcards",
    FLASHCARD_SEARCH = "https://prod.studysmarter.de/studysets/SETID/flashcards/?search=&s_bad=true&s_medium=true&s_good=true&s_trash=false&s_unseen=true&tag_ids=&quantity=600&created_by=&order=anti-chronological&cursor="
}

export type LoginResponse = {
    token: string;
    language: string;
    id: number;     
}

export type Tag = {
    id: number;
    flashcards_count: number;
    textbook_exercises_count: number;
    name: string;
    colour: number;
    created: string;
    partner_tag: boolean;
    studyset: number;
    updated: string;
}

export type Flashcard = {
    answer_html: {is_correct: boolean, text: string}[],
    community_applied_tag_ids: number[],
    creator: number,
    flashcard_images: {
        created: string,
        deleted: boolean,
        //Flashcard ID
        flashcardinfo: number, 
        id: number,
        image: string,
        image_file: null | string,
        image_string: string,
        localID: number,
        math_ml: string,
        presigned_url: string,
        width: number,
        xfdfString: null
    }[],
    hint_html: string[], //TODO: Find type, likely string
    id: number,
    is_reference: boolean,
    is_type_answer: boolean,
    original_studyset_id: number,
    original_studyset_name: null | string,
    original_studyset_subject_id: null | number,
    partner_logo: null | string,
    priority: number,
    question_html: string[],
    shared: number,
    slide_number: null | number,
    slideset_id: null | number,
    slideset_name: null | string,
    slidesetstats: null | any, //TODO: Find type
    solution_html: string,
    spaced_repetition: null | any, //TODO: Find type
    state: number,
    studysets: number[],
    tags: number[]
}

export type StrippedFlashcard = Omit<Flashcard, "partner_logo"|"shared"|"community_applied_tag_ids"|"originally_from_sso">

export type Studyset = {
    id: number;
    parent_studyset_id: number | null;
    name: string;
    colorId: number;
    shared: boolean;
    creator_id: number;
    icon: null | string; // Likely string?
    partner_studyset: boolean;
    partner: string;
    breadcrumbs: {name: string, id: number}[],
    level: number,
    language: string | 'en',
    created: string,
    class_levels: number[],
    target_groups: number[],
    subject: number,
    shortned_name: string | null;
    icon_name: null | string;
    countries: {
        id: number, 
        name: string, 
        class_levels: null | number[] | any, 
        school_types: {
            id: number,
            name: string,
            class_levels: null | number[] | any
        },
        states: {
            class_levels: null | number[] | any,
            id: number,
            name: string,
            school_types: [],
        }
    }[],
    country_ids: number[], 
    school_type_ids: number[],
    state_ids: number[],
    consumer_count: number,
    subtopic_count: number,
    contribution_group: number,
    university_logo: null | string,
    partner_logo: string,
    partner_logo_white: string,
    permission: {
        modify: boolean,
        share_flashcards: boolean,
        share_studyset: boolean
    },
    flashcard_daily_count: number,
    summary_count: number,
    slideset_count: number,
    exercise_count: number,
    flashcard_count: number,
    flashcard_bad_count: number,
    flashcard_medium_count: number,
    flashcard_good_count: number,
    flashcard_trash_count: number,
    flashcard_unseen_count: number,
    fixed_flashcard_order: null | boolean, // TODO: Find type, either boolean or array
    university_name: null | string,
    course_of_studies_name: null | string,
    user_count: number,
    studygroup_id: number,
    parent_studyset: null | number,
    creator_country_id: number, //381 is United Kingdom
    subject_suggestions: null | any, // TODO: Find type
    next_reptition: null | string, //Likely string timestamp
    repetition_count: number,
    unlearned_count: number,
    learned_count: number,
    relearning_count: number,
    mastered_count: number,
    published_at: string, // Timestamp,
    popularity_count: null | number,
    last_used: string,
    archived: boolean,
    slideset_order: any[],
    flashcard_ratings_counter: number,
    exam_date: null | string,
    is_favorite: boolean,
    archived_at: null | string,
    spaced_repetition: boolean,
    last_repetition_session: null | string,
    flashcard_daily_goal: number
}