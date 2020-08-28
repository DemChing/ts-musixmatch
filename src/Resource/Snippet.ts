import MxMResource from "./Base";

export default class Snippet extends MxMResource {
    constructor(snippet: SnippetRaw) {
        super();
        if (snippet.snippet_id) this.id = snippet.snippet_id;
        if (snippet.snippet_body) this.body = snippet.snippet_body;
        if (snippet.snippet_language) this.language = snippet.snippet_language;
        if (snippet.updated_time) this.updatedTime = snippet.updated_time;

        this.handleTracking(snippet);
        this.handleIndicator(snippet);

    }
    id: number = 0;
    body: string;
    language: string;
    copyright: string;
    updatedTime: string;
}