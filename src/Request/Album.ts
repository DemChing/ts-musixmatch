import MxMRequest from "./Base";
import Album from "../Resource/Album";
import Track from "../Resource/Track";

type GetParams = {
    id?: number;
    mbid?: string;
}

type TrackParams = GetParams & {
    hasLyrics?: boolean;
    page?: number;
    limit?: number;
}

const GetAcceptable: Acceptables = {
    id: { key: "album_id", required: true },
    mbid: { key: "album_mbid" },
}

const TrackAcceptable: Acceptables = {
    hasLyrics: { key: "f_has_lyrics" },
    page: { key: "page" },
    limit: { key: "page_size" },
}

export default class AlbumRequest extends MxMRequest {
    constructor(apikey: string) {
        super(apikey, "album");
    }

    get(params?: GetParams): Promise<Result<Album>> {
        return this.query("get", params, GetAcceptable)
            .then((res: Result<ResponseRaw>) => {
                let result: Result<Album> = {
                    error: false,
                };
                if (res?.data?.message?.body && !Array.isArray(res.data.message.body) && res.data.message.body.album) {
                    result.data = new Album(res.data.message.body.album);
                }
                return result;
            });
    }

    getTrack(params?: TrackParams): Promise<Result<Track[]>> {
        return this.query("tracks.get", params, GetAcceptable, TrackAcceptable)
            .then((res: Result<ResponseRaw>) => {
                let result: Result<Track[]> = {
                    error: false,
                };
                if (res?.data?.message?.body && !Array.isArray(res.data.message.body) && res.data.message.body.track_list) {
                    result.data = res.data.message.body.track_list.map(raw => new Track(raw.track, this.apikey));
                }
                return result;
            });
    }
}