import MxMRequest from "./Base";
import Track from "../Resource/Track";
import Lyrics from "../Resource/Lyrics";
import Snippet from "../Resource/Snippet";
import Subtitle from "../Resource/Subtitle";
import RichSync from "../Resource/RichSync";

type GetParams = {
    id?: number;
    commontrack?: number;
    isrc?: string;
    mbid?: string;
}

type LengthParams = {
    length?: number;
    deviation?: number;
}

type SubtitleParams = LengthParams & {
    format?: "lrc" | "dfxp" | "stledu"
}

type TranslateParam = {
    language: string;
    completed?: number;
}

type SearchParams = {
    title?: string;
    artist?: string;
    lyrics?: string;
    titleOrArtist?: string;
    writer?: string;
    query?: string;
    artistId?: number;
    genreId?: number;
    lyricsLang?: string;
    hasLyrics?: boolean;
    releaseAfter?: string;
    releaseBefore?: string;
    sortArtist?: "asc" | "desc";
    sortTrack?: "asc" | "desc";
    quorum?: number;
    page?: number;
    limit?: number;
}

const GetAcceptable: Acceptables = {
    id: { key: "track_id", required: true },
    commontrack: { key: "commontrack_id" },
    isrc: { key: "track_isrc" },
    mbid: { key: "track_mbid" },
}

const SubtitleAcceptable: Acceptables = {
    length: { key: "f_subtitle_length" },
    deviation: { key: "f_subtitle_length_max_deviation" },
    format: { key: "subtitle_format" },
}

const TranslateAcceptable: Acceptables = {
    language: { key: "selected_language", required: true },
    completed: { key: "min_completed" },
}

const RichSyncAcceptable: Acceptables = {
    length: { key: "f_richsync_length" },
    deviation: { key: "f_richsync_length_max_deviation" },
}

const SearchAcceptable: Acceptables = {
    title: { key: "q_track" },
    artist: { key: "q_artist" },
    lyrics: { key: "q_lyrics" },
    titleOrArtist: { key: "q_track_artist" },
    writer: { key: "q_writer" },
    query: { key: "q" },
    artistId: { key: "f_artist_id" },
    genreId: { key: "f_music_genre_id" },
    lyricsLang: { key: "f_lyrics_language" },
    hasLyrics: { key: "f_has_lyrics" },
    releaseAfter: { key: "f_track_release_group_first_release_date_min" },
    releaseBefore: { key: "f_track_release_group_first_release_date_max" },
    sortArtist: { key: "s_artist_rating" },
    sortTrack: { key: "s_track_rating" },
    quorum: { key: "quorum_factor" },
    page: { key: "page" },
    limit: { key: "page_size" },
}

export default class TrackRequest extends MxMRequest {
    constructor(apikey: string) {
        super(apikey, "track");
    }

    get(params?: GetParams): Promise<Result<Track>> {
        return this.query("get", params, GetAcceptable)
            .then((res: Result<ResponseRaw>) => {
                let result: Result<Track> = {
                    error: false,
                };
                if (res?.data?.message?.body && !Array.isArray(res.data.message.body) && res.data.message.body.track) {
                    result.data = new Track(res.data.message.body.track, this);
                }
                return result;
            });
    }

    search(params?: SearchParams): Promise<Result<Track[]>> {
        let result: Result<Track[]> = {
            error: false,
        };
        if (params.limit && (params.limit < 1 || params.limit > 100)) {
            result.error = true;
            result.message = `"limit" should be between 1 and 100`;
            return Promise.reject(result);
        } else if (params.quorum && (params.quorum < 0.1 || params.limit > 0.9)) {
            result.error = true;
            result.message = `"quorum" should be between 0.1 and 0.9`;
            return Promise.reject(result);
        }
        return this.query("search", params, SearchAcceptable).then((res: Result<ResponseRaw>) => {
            if (res?.data?.message?.body && !Array.isArray(res.data.message.body) && res.data.message.body.track_list) {
                result.data = res.data.message.body.track_list.map(raw => new Track(raw.track, this));
            }
            return result;
        });
    }

    getLyrics(params?: GetParams): Promise<Result<Lyrics>> {
        return this.query("lyrics.get", params, GetAcceptable)
            .then((res: Result<ResponseRaw>) => {
                let result: Result<Lyrics> = {
                    error: false,
                };
                if (res?.data?.message?.body && !Array.isArray(res.data.message.body) && res.data.message.body.lyrics) {
                    result.data = new Lyrics(res.data.message.body.lyrics);
                }
                return result;
            });
    }

    getLyricsTranslated(params?: GetParams & TranslateParam): Promise<Result<Lyrics>> {
        let result: Result<Lyrics> = {
            error: false,
        };
        if (params.completed && (params.completed < 0 || params.completed > 1)) {
            result.error = true;
            result.message = `"completed" should be between 0 and 1`;
            return Promise.reject(result);
        }
        return this.query("lyrics.translation.get", params, GetAcceptable, TranslateAcceptable)
            .then((res: Result<ResponseRaw>) => {
                if (res?.data?.message?.body && !Array.isArray(res.data.message.body) && res.data.message.body.lyrics) {
                    result.data = new Lyrics(res.data.message.body.lyrics);
                }
                return result;
            });
    }

    getSnippet(params?: GetParams): Promise<Result<Snippet>> {
        return this.query("snippet.get", params, GetAcceptable)
            .then((res: Result<ResponseRaw>) => {
                let result: Result<Snippet> = {
                    error: false,
                };
                if (res?.data?.message?.body && !Array.isArray(res.data.message.body) && res.data.message.body.snippet) {
                    result.data = new Snippet(res.data.message.body.snippet);
                }
                return result;
            });
    }

    getSubtitle(params?: GetParams & SubtitleParams): Promise<Result<Subtitle>> {
        return this.query("subtitle.get", params, GetAcceptable, SubtitleAcceptable)
            .then((res: Result<ResponseRaw>) => {
                let result: Result<Subtitle> = {
                    error: false,
                };
                if (res?.data?.message?.body && !Array.isArray(res.data.message.body) && res.data.message.body.subtitle) {
                    result.data = new Subtitle(res.data.message.body.subtitle);
                }
                return result;
            });
    }

    getSubtitleTranslated(params?: GetParams & SubtitleParams & TranslateParam): Promise<Result<Subtitle>> {
        let result: Result<Subtitle> = {
            error: false,
        };
        if (params.completed && (params.completed < 0 || params.completed > 1)) {
            result.error = true;
            result.message = `"completed" should be between 0 and 1`;
            return Promise.reject(result);
        }
        return this.query("subtitle.get", params, GetAcceptable, SubtitleAcceptable, TranslateAcceptable)
            .then((res: Result<ResponseRaw>) => {
                if (res?.data?.message?.body && !Array.isArray(res.data.message.body) && res.data.message.body.subtitle && res.data.message.body.subtitle_translated) {
                    result.data = new Subtitle(res.data.message.body.subtitle, res.data.message.body.subtitle_translated);
                }
                return result;
            });
    }

    getRichSync(params?: GetParams & LengthParams): Promise<Result<RichSync>> {
        return this.query("richsync.get", params, GetAcceptable, RichSyncAcceptable)
            .then((res: Result<ResponseRaw>) => {
                let result: Result<RichSync> = {
                    error: false,
                };
                if (res?.data?.message?.body && !Array.isArray(res.data.message.body) && res.data.message.body.richsync) {
                    result.data = new RichSync(res.data.message.body.richsync);
                }
                return result;
            });
    }
}