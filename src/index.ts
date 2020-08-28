import { AlbumRequest, ArtistRequest, ChartRequest, GenreRequest, TrackRequest, TrackingRequest } from "./Request";

export default class Musixmatch {
    constructor(apikey: string) {
        this.Album = new AlbumRequest(apikey);
        this.Artist = new ArtistRequest(apikey);
        this.Chart = new ChartRequest(apikey);
        this.Genre = new GenreRequest(apikey);
        this.Track = new TrackRequest(apikey);
        this.Tracking = new TrackingRequest(apikey);
    }

    Album: AlbumRequest;
    Artist: ArtistRequest;
    Chart: ChartRequest;
    Genre: GenreRequest;
    Track: TrackRequest;
    Tracking: TrackingRequest;
}