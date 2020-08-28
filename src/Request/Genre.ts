import MxMRequest from "./Base";
import Genre from "../Resource/Genre";

export default class GenreRequest extends MxMRequest {
    constructor(apikey: string) {
        super(apikey, "music.genres");
    }

    get(params?: { [key: string]: string | number }): Promise<Result<Genre[]>> {
        return this.query("get", params)
            .then((res: Result<ResponseRaw>) => {
                let genres: Genre[] = [],
                    result: Result<Genre[]> = {
                        error: false,
                    };
                if (res?.data?.message?.body && !Array.isArray(res.data.message.body) && res.data.message.body.music_genre_list) {
                    let list = res.data.message.body.music_genre_list;
                    genres = list.map(raw => new Genre(raw.music_genre));
                }
                result.data = genres;
                return result;
            })
    }
}