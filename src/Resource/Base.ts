export default class MxMResource {
    protected handleTracking(raw: { [k: string]: any } & TrackingRaw, self: boolean = true): Trackings {
        let tracking: Trackings = {};
        if (raw.script_tracking_url) tracking.script = raw.script_tracking_url;
        if (raw.pixel_tracking_url) tracking.pixel = raw.pixel_tracking_url;
        if (raw.html_tracking_url) tracking.html = raw.html_tracking_url;
        if (self) this.tracking = tracking;
        return tracking;
    }

    protected handleIndicator(raw: { [k: string]: any } & IndicatorRaw) {
        if (typeof raw.instrumental === "number") this.isInstrumental = !!raw.instrumental;
        if (typeof raw.explicit === "number") this.isExplicit = !!raw.explicit;
        if (typeof raw.restricted === "number") this.isRestricted = !!raw.restricted;
        if (typeof raw.verified === "number") this.isVerified = !!raw.verified;
        if (typeof raw.can_edit === "number") this.isEditable = !!raw.can_edit;
        if (typeof raw.locked === "number") this.isLocked = !!raw.locked;
        if (typeof raw.managed === "number") this.isManaged = !!raw.managed;
        if (typeof raw.has_lyrics === "number") this.hasLyrics = !!raw.has_lyrics;
        if (typeof raw.has_subtitles === "number") this.hasSubtitles = !!raw.has_subtitles;
        if (typeof raw.has_richsync === "number") this.hasRichSync = !!raw.has_richsync;
    }

    protected handleCoverArt(raw: { [k: string]: any }): CoverArt {
        let cover: CoverArt;
        if (raw.album_coverart_100x100 || raw.album_coverart_350x350 || raw.album_coverart_500x500 || raw.album_coverart_800x800) {
            cover = {};
            if (raw.album_coverart_100x100) cover.x100 = raw.album_coverart_100x100;
            if (raw.album_coverart_350x350) cover.x350 = raw.album_coverart_350x350;
            if (raw.album_coverart_500x500) cover.x500 = raw.album_coverart_500x500;
            if (raw.album_coverart_800x800) cover.x800 = raw.album_coverart_800x800;
        }
        return cover;
    }

    tracking?: Trackings;
    isInstrumental?: boolean;
    isExplicit?: boolean;
    isRestricted?: boolean;
    isVerified?: boolean;
    isEditable?: boolean;
    isLocked?: boolean;
    isManaged?: boolean;

    hasSubtitles?: boolean;
    hasLyrics?: boolean;
    hasRichSync?: boolean;

    getTracking(type: "script" | "html" | "pixel" = "script"): string {
        if (this.tracking) {
            return this.tracking[type] || this.tracking.script || this.tracking[Object.keys
            (this.tracking)[0]] || "";
        }
        return "";
    }
}