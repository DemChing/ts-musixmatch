export default class Genre {
    constructor(genre: GenreRaw) {
        if (genre.music_genre_id) this.id = genre.music_genre_id;
        if (genre.music_genre_name) this.name = genre.music_genre_name;
        if (genre.music_genre_parent_id) this.parent = genre.music_genre_parent_id;
        if (genre.music_genre_vanity) this.vanity = genre.music_genre_vanity;
        if (genre.music_genre_name_extended) this.extended = genre.music_genre_name_extended;
    }
    id: number;
    parent: number = 0;
    name: string;
    vanity: string;
    extended: string;
}