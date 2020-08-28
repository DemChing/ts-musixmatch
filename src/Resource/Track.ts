import Genre from "./Genre";
import MxMResource from "./Base";
import { TrackingRequest, TrackRequest } from "../Request";

export default class Track extends MxMResource {
    constructor(track: TrackRaw, instance: string | TrackRequest) {
        super();
        if (track.track_name) this.name = track.track_name;
        if (track.track_id || track.track_xboxmusic_id || track.track_mbid || track.track_soundcloud_id || track.track_isrc || track.commontrack_id) {
            if (track.track_id) this.id.musixmatch = track.track_id;
            if (track.track_xboxmusic_id) this.id.xboxmusic = track.track_xboxmusic_id;
            if (track.track_mbid) this.id.musicbrainz = track.track_mbid;
            if (track.track_soundcloud_id) this.id.soundcloud = track.track_soundcloud_id;
            if (track.track_isrc) this.id.isrc = track.track_isrc;
            if (track.commontrack_id) this.id.commontrack = track.commontrack_id;
        }
        if (track.track_rating) this.rating = track.track_rating;
        if (track.num_favourite) this.favourite = track.num_favourite;

        if (track.album_id && track.album_name) {
            this.album = {
                id: track.album_id,
                name: track.album_name
            };
            let cover = this.handleCoverArt(track);
            if (cover && Object.keys(cover).length > 0) this.album.cover = cover;
        }
        if (track.artist_id && track.artist_name) {
            this.artist = {
                id: track.artist_id,
                name: track.artist_name,
            };
            if (track.artist_mbid) this.artist.mbid = track.artist_mbid;
        }
        if (track.subtitle_id) this.subtitleId = track.subtitle_id;
        if (track.lyrics_id) this.lyricsId = track.lyrics_id;
        if (track.primary_genres || track.secondary_genres) {
            this.genres = {};
            if (track?.primary_genres?.music_genre_list && track.primary_genres.music_genre_list.length > 0) this.genres.primary = track.primary_genres.music_genre_list.map(raw => new Genre(raw.music_genre));
            if (track?.secondary_genres?.music_genre_list && track.secondary_genres.music_genre_list.length > 0) this.genres.secondary = track.secondary_genres.music_genre_list.map(raw => new Genre(raw.music_genre));
        }
        if (track.updated_time) this.updatedTime = track.updated_time;
        if (track.first_release_date) this.releaseDate = track.first_release_date;

        this._request = typeof instance === "string" ? new TrackRequest(instance) : instance;
        this.handleIndicator(track);
    }
    private _request: TrackRequest;
    name: string;
    id: {
        musixmatch?: number;
        musicbrainz?: string;
        isrc?: string;
        commontrack?: number;
        xboxmusic?: string;
        spotify?: string;
        soundcloud?: number;
    } = {};
    rating: number;
    length: number;
    favourite: number = 0;
    updatedTime: string;

    releaseDate?: string;
    artist?: {
        id: number;
        name: string;
        mbid?: string;
    }
    album?: {
        id: number;
        name: string;
        cover?: {
            x100?: string;
            x350?: string;
            x500?: string;
            x800?: string;
        }
    }
    lyricsId?: number;
    subtitleId?: number;
    genres?: {
        primary?: Genre[];
        secondary?: Genre[];
    }

    buildTracking(base: string): string {
        return new TrackingRequest(this._request.getApikey())
            .build({
                base: base,
                artist: this.artist.name,
                track: this.name,
            })
    }

    getLyrics() {
        return this._request.getLyrics({
            id: this.id.musixmatch,
        })
    }

    getLyricsTranslated(language: string) {
        return this._request.getLyricsTranslated({
            id: this.id.musixmatch,
            language: language,
        })
    }

    getSubtitle() {
        return this._request.getSubtitle({
            id: this.id.musixmatch,
        })
    }

    getSubtitleTranslated(language: string) {
        return this._request.getSubtitleTranslated({
            id: this.id.musixmatch,
            language: language,
        })
    }

    getRichSync() {
        return this._request.getRichSync({
            id: this.id.musixmatch,
        })
    }
}