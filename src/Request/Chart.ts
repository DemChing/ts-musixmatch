import MxMRequest from "./Base";
import Track from "../Resource/Track";
import Artist from "../Resource/Artist";

type ArtistParams = {
    country?: string;
    page?: number;
    limit?: number;
}

type TrackParams = ArtistParams & {
    chart?: "top" | "hot" | "mxmweekly" | "mxmweekly_new";
    hasLyrics?: boolean;
}

const ArtistAcceptable: Acceptables = {
    country: { key: "country" },
    page: { key: "page" },
    limit: { key: "page_size" },
}

const TrackAcceptable: Acceptables = {
    country: { key: "country" },
    page: { key: "page" },
    limit: { key: "page_size" },
    chart: { key: "chart_name" },
    hasLyrics: { key: "f_has_lyrics" },
}

export default class ChartRequest extends MxMRequest {
    constructor(apikey: string) {
        super(apikey, "chart");
    }

    getTrack(params?: TrackParams): Promise<Result<Track[]>> {
        let result: Result<Track[]> = {
            error: false,
        };
        if (params.limit && (params.limit < 1 || params.limit > 100)) {
            result.error = true;
            result.message = `"limit" should be between 1 and 100`;
            return Promise.reject(result);
        }
        return this.query("tracks.get", params, TrackAcceptable).then((res: Result<ResponseRaw>) => {
            if (res?.data?.message?.body && !Array.isArray(res.data.message.body) && res.data.message.body.track_list) {
                result.data = res.data.message.body.track_list.map(raw => new Track(raw.track, this.apikey));
            }
            return result;
        });
    }

    getArtist(params?: ArtistParams): Promise<Result<Artist[]>> {
        let result: Result<Artist[]> = {
            error: false,
        };
        if (params.limit && (params.limit < 1 || params.limit > 100)) {
            result.error = true;
            result.message = `"limit" should be between 1 and 100`;
            return Promise.reject(result);
        }
        return this.query("artists.get", params, ArtistAcceptable)
            .then((res: Result<ResponseRaw>) => {
                if (res?.data?.message?.body && !Array.isArray(res.data.message.body) && res.data.message.body.artist_list) {
                    result.data = res.data.message.body.artist_list.map(raw => new Artist(raw.artist));
                }
                return result;
            });
    }
}