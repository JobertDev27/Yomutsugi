import type { Show, Tenrai } from "../types/type";

const url: string = "https://api.tenrai.org/v1/";

function _apiMapper(data: Tenrai): Show {
    return {
	id: data.mal_id,
	title: data.title,
	cover: data.images.webp.large_image_url,
	ep: data.episodes,
	status: data.status,
	aired: data.aired.string,
	duration: data.duration,
	rating: data.rating,
	score: data.score,
	rank: data.rank,
	season: data.season,
	year: data.year,
	//genres: data.genres[],
	//themes: data.themes[],
	desc: data.synopsis,
	scored_by: data.scored_by,
    };
}

export async function getAllAnime(): Promise<Show[]> {
    const res = await fetch(`${url}anime`);
    const json = await res.json();
    return json.data.map(_apiMapper);
}

export async function getAnimeByTitle(title?: string): Promise<Show> {
    const res = await fetch(`${url}anime?q=${title}`);
    const json = await res.json();
    return _apiMapper(json.data);
}


export async function getAnimeById(id: string): Promise<Show> {
    const res = await fetch(`${url}anime/${id}`);
    const json = await res.json();
    return _apiMapper(json.data);
}
