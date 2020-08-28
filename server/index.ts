import { createServer } from "http";
import { parse } from "url";
import { readFileSync } from "fs";
import { extname } from "path";
import { exec } from "child_process";
import { TrackRequest } from "../src/Request";

let apikey = process.env.MUSIXMATCH_APIKEY || "",
    port = process.env.PORT || 3000,
    browser = process.env.browser || "chrome";

for (let i = 2; i < process.argv.length; i++) {
    if (/^\d{4}$/.test(process.argv[i])) port = process.argv[i];
    else if (/chrome|firefox/i.test(process.argv[i])) browser = process.argv[i].toLowerCase();
    else if (/\\|\/|\./i.test(process.argv[i])) browser = process.argv[i];
    else if (/^[a-f0-9]+$/i.test(process.argv[i]) && process.argv[i].length > 20) apikey = process.argv[i];
}

if (!apikey) throw "Please specify you API key";


createServer((req, res) => {
    let data = "";
    req.on("data", (chunk) => {
        data += chunk
    })
    req.on("end", () => {
        let URL = parse(req.url, true),
            contentType = "text/html";

        if (/^\/query/.test(URL.pathname)) {
            contentType = "application/json";

            res.writeHead(200, {
                "Content-Type": contentType
            })

            let handleRequest = (result: Result<any>) => {
                return res.end(JSON.stringify(result));
            }
            let promise: Promise<Result<any>>;
            let trackQ = new TrackRequest(apikey);
            if (URL.query.artist || URL.query.title) {
                promise = trackQ.search(URL.query)
            } else if (URL.query.id) {
                promise = trackQ.getLyrics(URL.query)
            }

            promise
                .then(handleRequest)
                .catch(handleRequest)
        } else if (URL.pathname == "/favicon.ico") {
            res.writeHead(404);
        } else {
            let path = `/client${URL.pathname == "/" ? "/index.html" : URL.pathname}`,
                ext = extname(path);
            switch (ext) {
                case "js":
                    contentType = "text/javascript";
                    break;
                case "css":
                    contentType = "text/css";
                    break;
                case "json":
                    contentType = "application/json";
                    break;
                case "png":
                    contentType = "image/png";
                    break;
                case "jpg":
                    contentType = "image/jpg";
                    break;
                case "wav":
                    contentType = "audio/wav";
                    break;
            }
            res.writeHead(200, {
                "Content-Type": contentType
            })
            res.end(readFileSync(`.${path}`, "utf8"))
        }
    })
}).listen(port)

let url = `http://localhost:${port}`,
    cmd = `${process.platform == "darwin" ? "open" : process.platform == "win32" ? "start" : "xdg-open"} ${browser} ${url}`;
exec(cmd, (err) => {
    if (err) {
        console.log(`Open browser fail, please access this url manually: ${url}`)
    }
})