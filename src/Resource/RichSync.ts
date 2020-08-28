import MxMResource from "./Base";

export default class RichSync extends MxMResource {
    constructor(richsync: RichSyncRaw) {
        super();
        if (richsync.richsync_id) this.id = richsync.richsync_id;
        if (richsync.richsync_body) this.body = richsync.richsync_body;
        if (richsync.richsync_length) this.length = richsync.richsync_length;
        if (richsync.richsync_language_description) this.language = richsync.richsync_language_description;
        if (richsync.richsync_language) this.languageCode = richsync.richsync_language;
        if (richsync.writer_list) this.writers = richsync.writer_list;
        if (richsync.publisher_list) this.publishers = richsync.publisher_list;
        if (richsync.lyrics_copyright) this.copyright = richsync.lyrics_copyright;
        if (richsync.updated_time) this.updatedTime = richsync.updated_time;

        if (richsync.instrumental) this.isInstrumental = true;
        if (richsync.explicit) this.isExplicit = true;
        if (richsync.restricted) this.isRestricted = true;

        this.handleTracking(richsync);
        this.handleIndicator(richsync);
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
}