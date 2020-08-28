import MxMRequest from "./Base";
import { createHash } from "crypto";

export default class Tracking extends MxMRequest {
    constructor(apikey: string) {
        super(apikey, "tracking");
    }

    getUrl(domain: string): Promise<Result<string>> {
        return this.query("url.get", { domain }, { domain: { key: "domain" } })
            .then((res: Result<ResponseRaw>) => {
                let result: Result<string> = {
                    error: false,
                };
                if (res?.data?.message?.body && !Array.isArray(res.data.message.body) && res.data.message.body.url) {
                    result.data = res.data.message.body.url;
                }
                return result;
            });
    }

    build(params: { base: string, artist: string, track: string }): string {
        const { base, artist, track } = params
        let url = `${base}?artist_name=${encodeURIComponent(artist)}&track_name=${encodeURIComponent(track)}`,
            md5 = createHash("md5").update(`${url}${this.apikey}`).digest("hex");

        return `${url}&s=${md5}`;
    }
}