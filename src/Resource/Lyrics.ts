import MxMResource from "./Base";

export default class Lyrics extends MxMResource {
    constructor(lyrics: LyricsRaw) {
        super();
        if (lyrics.lyrics_id) this.id = lyrics.lyrics_id;
        if (lyrics.lyrics_body) this.body = lyrics.lyrics_body;
        if (lyrics.lyrics_language_description) this.language = lyrics.lyrics_language_description;
        if (lyrics.lyrics_language) this.languageCode = lyrics.lyrics_language;
        if (lyrics.lyrics_copyright) this.copyright = lyrics.lyrics_copyright;
        if (lyrics.updated_time) this.updatedTime = lyrics.updated_time;
        if (lyrics.writer_list) this.writers = lyrics.writer_list;
        if (lyrics.publisher_list) this.publishers = lyrics.publisher_list;

        if (lyrics.translated_lyrics) {
            this.translated.language = lyrics.translated_lyrics.selected_language;
            this.translated.body = lyrics.translated_lyrics.lyrics_body;
            if (lyrics.translated_lyrics.pixel_tracking_url || lyrics.translated_lyrics.script_tracking_url || lyrics.translated_lyrics.html_tracking_url) {
                this.translated.tracking = this.handleTracking(lyrics.translated_lyrics, false);
            }
        }

        this.handleTracking(lyrics);
        this.handleIndicator(lyrics);
    }
    id: number = 0;
    body: string;
    language?: string;
    languageCode?: string;
    copyright: string;
    updatedTime: string;
    writers?: string[];
    publishers?: string[];
    translated?: {
        language: string;
        body: string;
        tracking: Trackings;
    };
}