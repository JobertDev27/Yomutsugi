export type Show = {
    id: number;
    title: string;
    cover: string;
    ep: number;
    status: string;
    aired: string;
    duration: string;
    rating: string;
    score: number;
    rank: number;
    season: string;
    year: number;
    //genres: string[];
    //themes: string[];
    desc: string;
    scored_by: number;
}

export type Tenrai = {
    mal_id: number;
    title: string;
    episodes: number;
    status: string;
    aired: string;
    duration: string;
    rating: string;
    score: number;
    rank: number;
    season: string;
    year: number;
    genres: string[];
    themes: string[];
    synopsis: string;
    scored_by: number;
    images: {
	webp: {
	    image_url: string;
	    large_image_url: string;
	    small_image_url: string;
	};
    };
};
