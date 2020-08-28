# ts-musixmatch
> :warning: This is NOT an official Typescript wrapper for Musixmatch API. Please use it with caution.

> :warning: The type of some fields in actual response are not the same as stated in the document/[API Playground](https://playground.musixmatch.com/). This wrapper only cares about the actual response so you may encounter errors if the API updated. 

This wrapper handles the request and response from the official API. It renames the request parameters and fields in response.

## Prerequisite

This wrapper rely on NPM package `axios`. If you clone this repository from Github, you have to run `npm install` to install all dependencies.

You may need to install `typescript` or `ts-node` if neccessary.

## Usage

To make requests, you need to initiate the `Musixmatch` class.
```typescript
import Musixmatch from "./src";

let musixmatch = new Musixmatch(apikey);
musixmatch.Album.get(params); // Get an album
musixmatch.Track.get(params); // Get a track
```

Or you may import the related class only.
```typescript
import { TrackRequest } from "./src/Request";
// or import TrackRequest from "./src/Request/Track";

let req = new TrackRequest(apikey);
req.get(params); // Get a track
```

## Requests

### Album
- `get(params)`: Return information of the album
    - `params.id`: Musixmatch album ID
    - `params.mbid`: MusicBrainz album ID

- `getTrack(params)`: Return all tracks in the album
    - `params.id`: Musixmatch album ID
    - `params.mbid`: MusicBrainz album ID
    - `params.hasLyrics`: Filter tracks with lyrics only (`boolean`)
    - `params.page`: Page number for paginated results
    - `params.limit`: Page size for paginated results (`[1-100]`)

### Artist
- `get(params)`: Return information of the artist
    - `params.id`: Musixmatch artist ID
    - `params.mbid`: MusicBrainz artist ID

- `search(params)`: Search artists
    - `params.name`: Artist name
    - `params.id`: Musixmatch artist ID
    - `params.mbid`: MusicBrainz artist ID
    - `params.page`: Page number for paginated results
    - `params.limit`: Page size for paginated results (`[1-100]`)

- `getAlbum(params)`: Return albums of the artist
    - `params.id`: Musixmatch artist ID
    - `params.mbid`: MusicBrainz artist ID
    - `params.groupAlbum`: Group albums by name (`boolean`)
    - `params.sortRelease`: Sort by album release date (`boolean`)
    - `params.page`: Page number for paginated results
    - `params.limit`: Page size for paginated results (`[1-100]`)
    
- `getRelated(params)`: Return related artists of the artist
    - `params.id`: Musixmatch artist ID
    - `params.mbid`: MusicBrainz artist ID
    - `params.page`: Page number for paginated results
    - `params.limit`: Page size for paginated results (`[1-100]`)


### Chart
- `getArtist(params)`: Return top artists of the country
    - `params.country`: [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) Country code
    - `params.page`: Page number for paginated results
    - `params.limit`: Page size for paginated results (`[1-100]`)

- `getTrack(params)`: Return top tracks of the country
    - `params.country`: [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) Country code
    - `params.chart`: Type of chart (`top`: Editorial chart, `hot`: Most viewed lyrics in last 2 hour, `mxmweekly`: Most viewed lyrics in last 7 days, `mxmweekly_new`: Most viewed lyrics for new releases in last 7 days)
    - `params.hasLyrics`: Filter tracks with lyrics only (`boolean`)
    - `params.page`: Page number for paginated results
    - `params.limit`: Page size for paginated results (`[1-100]`)

### Genre
- `get()`: Return all music genres

### Track
- `get(params)`: Return information of the track
    - `params.id`: Musixmatch track ID
    - `params.mbid`: MusicBrainz track ID
    - `params.isrc`: Track ISRC identifier
    - `params.commontrack`: Musixmatch commontrack ID

- `search(params)`: Search tracks
    - `params.title`: Track name
    - `params.artist`: Artist name
    - `params.lyrics`: Lyrics in track
    - `params.titleOrArtist`: Track name or artist name
    - `params.writer`: Writer name
    - `params.query`: Track name, artist name or lyrics
    - `params.artistId`: Musixmatch artist ID
    - `params.genreId`: Musixmatch genre ID
    - `params.lyricsLang`: [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) language code of the lyrics language
    - `params.hasLyrics`: Filter tracks with lyrics only (`boolean`)
    - `params.releaseAfter`: Track release after that date (`YYYYMMDD`)
    - `params.releaseBefore`: Track release before that date (`YYYYMMDD`)
    - `params.sortTrack`: Sort by track rating (`asc|desc`)
    - `params.sortArtist`: Sort by artist rating (`asc|desc`)
    - `params.quorum`: Search only a part of the given query string (`[0.1-0.9]`)
    - `params.page`: Page number for paginated results
    - `params.limit`: Page size for paginated results (`[1-100]`)

- `getLyrics(params)`: Return lyrics of the track
    - `params.id`: Musixmatch track ID
    - `params.mbid`: MusicBrainz track ID
    - `params.isrc`: Track ISRC identifier
    - `params.commontrack`: Musixmatch commontrack ID
    
- `getLyricsTranslated(params)`: Return translated lyrics of the track
    - `params.id`: Musixmatch track ID
    - `params.mbid`: MusicBrainz track ID
    - `params.isrc`: Track ISRC identifier
    - `params.commontrack`: Musixmatch commontrack ID
    - `params.language`: [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) language code of the lyrics language
    - `params.completed`: Translated percentage, `0.7` for `70%` (`[0-1]`)

- `getSnippet(params)`: Snippet of the lyrics
    - `params.id`: Musixmatch track ID
    - `params.mbid`: MusicBrainz track ID
    - `params.isrc`: Track ISRC identifier
    - `params.commontrack`: Musixmatch commontrack ID

- `getSubtitle(params)`: Return information of the track
    - `params.id`: Musixmatch track ID
    - `params.mbid`: MusicBrainz track ID
    - `params.isrc`: Track ISRC identifier
    - `params.commontrack`: Musixmatch commontrack ID
    - `params.length`: Length of the subtitle in seconds
    - `params.deviation`: Maximum deviation for `params.length` in seconds
    - `params.format`: Format of the lyrics (`lrc`,`dfxp`,`stledu`)

- `getSubtitleTranslated(params)`: Return information of the track
    - `params.id`: Musixmatch track ID
    - `params.mbid`: MusicBrainz track ID
    - `params.isrc`: Track ISRC identifier
    - `params.commontrack`: Musixmatch commontrack ID
    - `params.length`: Length of the subtitle in seconds
    - `params.deviation`: Maximum deviation for `params.length` in seconds
    - `params.format`: Format of the lyrics (`lrc`,`dfxp`,`stledu`)
    - `params.language`: [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) language code of the lyrics language
    - `params.completed`: Translated percentage, `0.7` for `70%` (`[0-1]`)

- `getRichSync(params)`: Return information of the track
    - `params.id`: Musixmatch track ID
    - `params.mbid`: MusicBrainz track ID
    - `params.isrc`: Track ISRC identifier
    - `params.commontrack`: Musixmatch commontrack ID
    - `params.length`: Length of the sync in seconds
    - `params.deviation`: Maximum deviation for `params.length` in seconds

### Tracking
> This part is important for those who wish to use lyrics provided by Musixmatch. You can check more information about the rights clearance [here](https://developer.musixmatch.com/documentation/rights-clearance-on-your-existing-catalog).

- `getUrl(domain)`: Return base url for the tracking script
    - `domain`: Your domain name

- `build(params)`: Build url for the tracking script
    - `params.base`: Base url retrieve from `getUrl()`
    - `params.artist`: Artist name
    - `params.track`: Track name

## Resource

This section describe what fields are included in different resources. Only major fields are listed. You may need to check the corresponding source file in `src/Resource` for complete list.

If the resource contains the field `tracking`, you can get it by calling `Resource.getTracking(type)` where `type` could be `script`, `html` or `pixel`. To know more about the tracking, check this [section](#rights-clearance).

No guarantee is made for the resource to contain all fields listed below. It depends on whether Musixmatch return those data.

### Album
- `name`: Album name
- `id`: Identifier of the album
    - `id.musixmatch`: Musixmatch album ID
    - `id.musicbrainz`: MusicBrainz album ID
- `artist`: Artist information
    - `artist.name`: Artist name
    - `artist.id`: Musixmatch artist ID
    - `artist.mbid`: MusicBrainz artist ID
- `releaseDate`: Album release date
- `releaseType`: Album release type (eg Single)

### Artist
- `name`: Artist name
- `id`: Identifier of the album
    - `id.musixmatch`: Musixmatch artist ID
    - `id.musicbrainz`: MusicBrainz artist ID
- `alias`: May contain artist's nickname or artist name in other languages

### Lyrics
- `id`: Musixmatch lyrics ID
- `body`: Lyrics content
- `tracking`: Tracking data
- `translated`: Translated lyrics (Only available when using `TrackRequest.getLyricsTranslated()`)
    - `translated.language`: Language of the translation
    - `translated.body`: Translated content
    - `translated.tracking`: Tracking data

### RichSync
- `id`: Musixmatch richsync ID
- `body`: Richsync content (Details [here](https://developer.musixmatch.com/documentation/api-reference/track-richsync-get))

### Subtitle
- `id`: Musixmatch subtitle ID
- `body`: Subtitle content
- `tracking`: Tracking data

### Track
- `name` Track name
- `id`: Identifier of the album
    - `id.musixmatch`: Musixmatch track ID
    - `id.musicbrainz`: MusicBrainz track ID
    - `id.isrc`: Track ISRC identifier
    - `id.commontrack`: Musixmatch commontrack ID
- `artist`: Artist information
    - `artist.name`: Artist name
    - `artist.id`: Musixmatch artist ID
    - `artist.mbid`: MusicBrainz artist ID
- `releaseDate`: Track release date
- `album`: Album information
    - `album.name`: Album name
    - `album.id`: Musixmatch album ID

Some methods can be called directly for convenient.
- `getLyrics()`: Return lyrics of current track
- `getLyricsTranslated(language)`: Return translated lyrics of current track
    - `language`: [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) language code
- `getSubtitle()`: Return subtitle of current track
- `getSubtitleTranslated(language)`: Return translated subtitle of current track
    - `language`: [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) language code
- `getRichSync()`: Return richsync of current track
- `buildTracking(base)`: Build url for the tracking script
    - `base`: Base url retrieve from `TrackingRequest.getUrl()`

## Demo

This repository provides a simple demo for how to work with the API. If you have already installed `ts-node` globally, you can simply run this:

```
npm run server [YOUR_MUSIXMATCH_APIKEY]
// or
ts-node --files server [YOUR_MUSIXMATCH_APIKEY]
```

The script will try to open `Chrome` and access the demo page at `http://localhost:3000`. You can also specify a 4-digit number to replace the default port `3000`.

If you see a message like `Open browser fail, please access this url manually: {URL}`, please visit that url yourself.

You may want to set enviroment variable `MUSIXMATCH_APIKEY` and `PORT` so you don't need to input them every time.

> For those who don't have `ts-node` installed, you may need to compile the files to Javascript and run it yourself.

## Rights Clearance

> Please respect the copyright.

You are required to add tracking when using some data provided by Musixmatch. Please follow the official instructions [here](https://developer.musixmatch.com/documentation/api-reference/track-lyrics-get), [here](https://developer.musixmatch.com/documentation/api-reference/tracking-url-get) and [here](https://developer.musixmatch.com/documentation/rights-clearance-on-your-existing-catalog).

## Useful Links

- `Musixmatch SDK`: [Github](https://github.com/musixmatch/musixmatch-sdk)
- `Developer Portal`: [Page](https://developer.musixmatch.com/)
- `API Playground`: [Page](https://playground.musixmatch.com/)

## Support

If this repository helps you, you can give me some support.

<a href="https://www.buymeacoffee.com/demching" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-red.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>