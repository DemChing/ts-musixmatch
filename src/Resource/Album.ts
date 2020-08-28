import MxMResource from "./Base";
import Genre from "./Genre";

export default class Album extends MxMResource {
    constructor(album: AlbumRaw) {
        super();
        if (album.album_name) this.name = album.album_name;
        if (album.album_id || album.album_mbid) {
            if (album.album_id) this.id.musixmatch = album.album_id;
            if (album.album_mbid) this.id.musicbrainz = album.album_mbid;
        }
        if (album.album_rating) this.rating = album.album_rating;
        if (album.album_copyright) this.copyright = album.album_copyright;
        if (album.album_pline) this.pline = album.album_pline;
        if (album.album_label) this.label = album.album_label;
        if (album.updated_time) this.updatedTime = album.updated_time;
        if (album.album_release_date) this.releaseDate = album.album_release_date;
        if (album.album_release_type) this.releaseType = album.album_release_type;

        let cover = this.handleCoverArt(album);
        if (cover && Object.keys(cover).length > 0) this.cover = cover;

        if (album.artist_id && album.artist_name) {
            this.artist = {
                id: album.artist_id,
                name: album.artist_name,
            };
            if (album.artist_mbid) this.artist.mbid = album.artist_mbid;
        }
        if (album.primary_genres || album.secondary_genres) {
            this.genres = {};
            if (album?.primary_genres?.music_genre_list && album.primary_genres.music_genre_list.length > 0) this.genres.primary = album.primary_genres.music_genre_list.map(raw => new Genre(raw.music_genre));
            if (album?.secondary_genres?.music_genre_list && album.secondary_genres.music_genre_list.length > 0) this.genres.secondary = album.secondary_genres.music_genre_list.map(raw => new Genre(raw.music_genre));
        }

        this.handleIndicator(album);
    }
    name: string;
    id: {
        musixmatch?: number;
        musicbrainz?: string;
    } = {};
    rating: number;
    copyright: string;
    updatedTime: string;

    pline?: string;
    label?: string;
    cover?: CoverArt;
    releaseDate?: string;
    releaseType?: string;
    artist?: {
        id: number;
        name: string;
        mbid?: string;
    }
    genres?: {
        primary?: Genre[];
        secondary?: Genre[];
    }
}
