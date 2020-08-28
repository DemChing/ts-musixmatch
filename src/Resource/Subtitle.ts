import MxMResource from "./Base";

export default class Subtitle extends MxMResource {
    constructor(subtitle: SubtitleRaw, translated?: SubtitleRaw) {
        super();
        if (subtitle.subtitle_id) this.id = subtitle.subtitle_id;
        if (subtitle.subtitle_body) this.body = subtitle.subtitle_body;
        if (subtitle.subtitle_length) this.length = subtitle.subtitle_length;
        if (subtitle.subtitle_language_description) this.language = subtitle.subtitle_language_description;
        if (subtitle.subtitle_language) this.languageCode = subtitle.subtitle_language;
        if (subtitle.writer_list) this.writers = subtitle.writer_list;
        if (subtitle.publisher_list) this.publishers = subtitle.publisher_list;
        if (subtitle.lyrics_copyright) this.copyright = subtitle.lyrics_copyright;
        if (subtitle.updated_time) this.updatedTime = subtitle.updated_time;

        if (translated) {
            this.translated = new Subtitle(translated);
        }

        this.handleTracking(subtitle);
        this.handleIndicator(subtitle);
    }
    id: number = 0;
    body: string;
    length: number;
    language?: string;
    languageCode?: string;
    copyright: string;
    updatedTime: string;
    writers?: string[];
    publishers?: string[];
    translated?: Subtitle;
}