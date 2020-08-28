import MxMRequest from "./Base";
import Artist from "../Resource/Artist";
import Album from "../Resource/Album";

type GetParams = {
    id?: number;
    mbid?: string;
}

type RelatedParams = GetParams & {
    page?: number;
    limit?: number;
}

type SearchParams = RelatedParams & {
    name?: string;
}

type AlbumParams = RelatedParams & {
    groupAlbum?: boolean;
    sortRelease?: "asc" | "desc";
}

const GetAcceptable: Acceptables = {
    id: { key: "artist_id", required: true },
    mbid: { key: "artist_mbid" },
}

const SearchAcceptable: Acceptables = {
    name: { key: "q_artist" },
    id: { key: "f_artist_id" },
    mbid: { key: "f_artist_mbid" },
    page: { key: "page" },
    limit: { key: "page_size" },
}

const AlbumAcceptable: Acceptables = {
    groupAlbum: { key: "g_album_name" },
    sortRelease: { key: "s_release_date" },
    page: { key: "page" },
    limit: { key: "page_size" },
}

const RelatedAcceptable: Acceptables = {
    page: { key: "page" },
    limit: { key: "page_size" },
}

export default class ArtistRequest extends MxMRequest {
    constructor(apikey: string) {
        super(apikey, "artist");
    }

    get(params?: GetParams): Promise<Result<Artist>> {
        return this.query("get", params, GetAcceptable)
            .then((res: Result<ResponseRaw>) => {
                let result: Result<Artist> = {
                    error: false,
                };
                if (res?.data?.message?.body && !Array.isArray(res.data.message.body) && res.data.message.body.artist) {
                    result.data = new Artist(res.data.message.body.artist);
                }
                return result;
            });
    }

    search(params?: SearchParams): Promise<Result<Artist[]>> {
        let result: Result<Artist[]> = {
            error: false,
        };
        if (params.limit && (params.limit < 1 || params.limit > 100)) {
            result.error = true;
            result.message = `"limit" should be between 1 and 100`;
            return Promise.reject(result);
        }
        return this.query("search", params, SearchAcceptable).then((res: Result<ResponseRaw>) => {
            if (res?.data?.message?.body && !Array.isArray(res.data.message.body) && res.data.message.body.artist_list) {
                result.data = res.data.message.body.artist_list.map(raw => new Artist(raw.artist));
            }
            return result;
        });
    }

    getAlbum(params?: AlbumParams): Promise<Result<Album[]>> {
        let result: Result<Album[]> = {
            error: false,
        };
        if (params.limit && (params.limit < 1 || params.limit > 100)) {
            result.error = true;
            result.message = `"limit" should be between 1 and 100`;
            return Promise.reject(result);
        }
        return this.query("albums.get", params, GetAcceptable, AlbumAcceptable).then((res: Result<ResponseRaw>) => {
            if (res?.data?.message?.body && !Array.isArray(res.data.message.body) && res.data.message.body.album_list) {
                result.data = res.data.message.body.album_list.map(raw => new Album(raw.album));
            }
            return result;
        });
    }

    getRelated(params?: RelatedParams): Promise<Result<Artist[]>> {
        let result: Result<Artist[]> = {
            error: false,
        };
        if (params.limit && (params.limit < 1 || params.limit > 100)) {
            result.error = true;
            result.message = `"limit" should be between 1 and 100`;
            return Promise.reject(result);
        }
        return this.query("related.get", params, GetAcceptable, RelatedAcceptable).then((res: Result<ResponseRaw>) => {
            if (res?.data?.message?.body && !Array.isArray(res.data.message.body) && res.data.message.body.artist_list) {
                result.data = res.data.message.body.artist_list.map(raw => new Artist(raw.artist));
            }
            return result;
        });
    }
}