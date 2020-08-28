import MxMResource from "./Base";
import Genre from "./Genre";

export default class Artist extends MxMResource {
    constructor(artist: ArtistRaw) {
        super();
        if (artist.artist_name) this.name = artist.artist_name;
        if (artist.artist_id || artist.artist_mbid) {
            if (artist.artist_id) this.id.musixmatch = artist.artist_id;
            if (artist.artist_mbid) this.id.musicbrainz = artist.artist_mbid;
        }
        if (artist.artist_rating) this.rating = artist.artist_rating;
        if (artist.updated_time) this.updatedTime = artist.updated_time;

        if (artist.artist_twitter_url) this.twitter = artist.artist_twitter_url;
        if (artist.artist_comment) this.comment = artist.artist_comment;
        if (artist.artist_country) this.country = artist.artist_country;
        if (artist.artist_alias_list && artist.artist_alias_list.length > 0) {
            this.alias = artist.artist_alias_list.map(alias => alias.artist_alias);
        }
        if (artist?.artist_credits?.artist_list && artist.artist_credits.artist_list.length > 0) {
            this.credits = artist.artist_credits.artist_list.map(art => new Artist(art.artist));
        }

        if (artist.primary_genres || artist.secondary_genres) {
            this.genres = {};
            if (artist?.primary_genres?.music_genre_list && artist.primary_genres.music_genre_list.length > 0) this.genres.primary = artist.primary_genres.music_genre_list.map(raw => new Genre(raw.music_genre));
            if (artist?.secondary_genres?.music_genre_list && artist.secondary_genres.music_genre_list.length > 0) this.genres.secondary = artist.secondary_genres.music_genre_list.map(raw => new Genre(raw.music_genre));
        }

        this.handleIndicator(artist);
    }
    name: string;
    id: {
        musixmatch?: number;
        musicbrainz?: string;
    } = {};
    rating: number;
    updatedTime: string;

    twitter?: string;
    comment?: string;
    country?: string;
    alias?: string[];
    credits?: Artist[];
    genres?: {
        primary?: Genre[];
        secondary?: Genre[];
    }
}