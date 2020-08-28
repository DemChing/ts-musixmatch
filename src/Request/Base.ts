import axios from "axios";

const Domain = "https://api.musixmatch.com";
const BaseUrl = "ws/1.1";

const Alternatives = {
    album: ["id", "mbid"],
    track: ["id", "mbid", "commontrack", "isrc"],
    artist: ["id", "mbid"]
}

// Copy from https://developer.musixmatch.com/documentation/status-codes
const StatusCode = {
    200: "The request was successful.",
    400: "The request had bad syntax or was inherently impossible to be satisfied.",
    401: "Authentication failed, probably because of invalid/missing API key.",
    402: "The usage limit has been reached, either you exceeded per day requests limits or your balance is insufficient.",
    403: "You are not authorized to perform this operation.",
    404: "The requested resource was not found.",
    405: "The requested method was not found.",
    500: "Ops. Something were wrong.",
    503: "Our system is a bit busy at the moment and your request can’t be satisfied.",
}

export default class MxMRequest {
    constructor(apikey: string, endpoint: string) {
        this.apikey = apikey;
        this.endpoint = endpoint;
    }

    protected query(func: string, params?: { [key: string]: string | number | boolean }, ...acceptables: Acceptables[]): Promise<Result<ResponseRaw>> {
        return new Promise((resolve, reject) => {
            let result: Result<ResponseRaw> = {
                error: false,
            }, query = {
                apikey: this.apikey,
                format: "json",
            };
            if (!query.apikey) {
                result.error = true;
                result.message = "Missing Musixmatch API key";
                return reject(result);
            }
            acceptables.map(acceptable => {
                for (let key in acceptable) {
                    if (result.error) continue;
                    if (acceptable[key].required && !(key in params)) {
                        if (key == "id" && this.endpoint in Alternatives) {
                            result.error = Alternatives[this.endpoint].reduce((p, c) => p && !acceptables[c], true);
                            if (result.error) result.message = `You must specify value for any one of these fields: ["${Alternatives[this.endpoint].join(`", "`)}"].`
                        } else {
                            result.error = true;
                            result.message = `Missing required field "${key}".`
                        }
                    } else if (key in params) {
                        query[acceptable[key].key] = typeof params[key] === "boolean" ? (params[key] ? 1 : 0) : params[key];
                    }
                }
            })

            if (result.error) reject(result);
            else {
                axios.get(`${Domain}/${BaseUrl}/${this.endpoint}.${func}`, {
                    params: query
                }).then(res => {
                    let data = res.data as ResponseRaw;
                    result.data = data;
                    if (data?.message?.header.status_code != 200) {
                        result.error = true;
                        result.errorCode = data.message.header.status_code;
                        if (result.errorCode in StatusCode) {
                            result.message = StatusCode[result.errorCode];
                        }
                        if (data.message.header.hint) {
                            result.message = `${result.message || ""} ${data.message.header.hint}`.trim();
                        }
                        reject(result);
                    } else {
                        resolve(result);
                    }
                })
            }
        })
    }

    protected apikey: string;
    endpoint: string;

    getApikey(): string {
        return this.apikey;
    }
}