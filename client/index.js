$(function () {
    function serachTrack(artist, track, page) {
        $.ajax({
            url: "query",
            dataType: "json",
            data: {
                artist: artist,
                title: track,
                page: page || 1
            },
            success: (res) => {
                if (res.error) {
                    console.error(res)
                } else {
                    $("#search-result").remove();
                    let $tracks = $("<table id='search-result' class='table table-dark'><tr><th>#</th><th>Track</th><th>Artist</th></tr></table>")
                    res.data.map((row, i) => {
                        let $name = $(`<span class="text-light">${row.name}</span>`),
                            $artist = $(`<span class="text-light">${row.artist.name}</span>`),
                            $row = $(`<tr><td>${i + 1}</td><td></td><td></td></tr>`);
                        if (row.hasLyrics) {
                            let $lyrics = $(`<a class="text-warning pl-3" href="javascript:void(0)">[Lyrics]</a>`);
                            $lyrics.click(() => {
                                getLyrics(row.id.musixmatch, row.name, row.artist.name)
                            })
                            $name.append($lyrics);
                        } else {
                            $name = $(`<span class="text-light">${row.name}</span>`)
                        }
                        $tracks.append($row);
                        $row.find("td:nth-child(2)").append($name);
                        $row.find("td:nth-child(3)").append($artist);
                    })
                    $("body").append($tracks)
                }
            }
        })
    }

    function getLyrics(id, track, artist) {
        $.ajax({
            url: "query",
            dataType: "json",
            data: {
                id: id
            },
            success: (res) => {
                if (res.error) {
                    console.error(res)
                } else {
                    let $modal = $("#lyrics-modal");
                    $modal.find(".modal-title").text(`${track} - ${artist}`)
                    $modal.find(".modal-body").html(res.data.body.split("\n").reduce((p, c) => p += `<p>${c}</p>`, ""))
                    if (res.data.copyright) {
                        $modal.find(".modal-body").append(`<br><p class="copyright text-secondary">Copyright: ${res.data.copyright}</p>`)
                    }
                    if (res.data.tracking) {
                        if (res.data.tracking.pixel) $modal.find(".modal-body").append(`<img src="${res.data.tracking.pixel}">`)
                        else if (res.data.tracking.script) $modal.find(".modal-body").append(`<script src="${res.data.tracking.script}"></script>`)
                    }
                    $modal.modal("show")
                }
            }
        })
    }
    $("#query").on("submit", () => {
        serachTrack($("input[name=artist]").val(), $("input[name=track]").val());
        return false;
    })

    $("#lyrics-modal").modal();
})