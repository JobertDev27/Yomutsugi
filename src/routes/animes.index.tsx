import { createFileRoute } from "@tanstack/react-router";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import type { Show } from "../types/type";
import { getAllAnime, getAnimeByTitle } from "../api/tenrai";
import ShowCard from "../components/ShowCard";

type searchParams = { title: string}

export const Route = createFileRoute('/animes/')({
    component: Animes,
})

function Animes():React.ReactNode {
    const [shows, setShows] = useState<Show[]>()
    const { title }: searchParams = Route.useSearch()
    console.log("title: ", title)
    
    useEffect(() => {
	const fetchShows = async () => {
	    const temp = title ? await getAnimeByTitle(title) : await getAllAnime()
	    console.log('shows: ', temp)
	    setShows(temp)
	}
	fetchShows()

    },[])

    return (
	<>
	<Header />
	<main className="grid lg:grid-cols-8 md:grid-cols-4 grid-cols-2 gap-3">
	{shows.map((s, key) => <ShowCard show={s} key={key} />)}	    
	</main>	
	</>
    )
}
