import { createFileRoute } from '@tanstack/react-router'
import { getAnimeById } from '../api/tenrai'
import type { Show } from '../types/type'
import {useEffect, useRef, useState} from "react"

import starIcon from '../assets/star.png'
import userIcon from '../assets/user.png'
import { supabase } from '../utils/supabase'
import type { JwtPayload } from '@supabase/supabase-js'
import { useAuth } from '../hooks/useAuth'

export const Route = createFileRoute('/animes/$animeId')({
    loader: async ({ params }) => {
	console.log('LOADER RAN', params.animeId)
	return getAnimeById(params.animeId)
    },
    component: RouteComponent,
})

function RouteComponent() {
    const claims: JwtPayload | null = useAuth()
    const anime: Show = Route.useLoaderData()
    console.log(anime)

    const textRef = useRef<HTMLParagraphElement>(null)
    const [expanded, setExpanded] = useState<boolean>(false)
    const [isOverflowing, setIsOverflowing] = useState<boolean>(false)
    const [inLibrary, setInLibrary] = useState<boolean>(false)

    useEffect(() => {
	const el = textRef.current
	if (!el) return;

	setIsOverflowing(el.scrollHeight > el.clientHeight)

	async function checkShow() {
	    const { data, error } = await supabase.from('user_shows').select().eq('user_id', claims?.sub).eq('mal_id', anime.id)

	    if (error) alert(error);
	    if (data!.length > 1) setInLibrary(true)
		console.log('data for user is', data)
	    console.log('length is', data?.length)
	}
	checkShow()
    }, [])

    const addToLib = async () => {
	console.log("claims sub:", claims?.sub)
	console.log("anime id:", anime.id)
	const { error } = await supabase
	.from('user_shows')
	.insert({ user_id: claims?.sub, mal_id: anime.id })

	if (error) {
	    console.error(error)
	    return
	}
	setInLibrary(true)
    }

    const removeInLib = async () => {
	const response = await supabase
	.from('user_shows')
	.delete()
	.eq('user_id', claims?.sub)
	.eq('mal_id', anime.id)

	console.log(response)
	setInLibrary(false)
    }

    return <main className='flex flex-col flex-1 justify-center items-center pt-10 mt-10'>
    <section className='flex flex-col justify-center border-border border-2 max-w-[1000px] p-5 mt-10! gap-2'>
    <div className='w-full flex mb-4! justify-center items-center'>
    <img src={anime.cover} className='max-h-100' />
    </div>
    <h1 className='font-bold text-xl'>{anime.title}</h1>
    <p> <span className='font-bold'>Ranked:</span> #{anime.rank}</p>

    <div className='flex items-center gap-2'>
    <p className='font-bold text-md'>Ratings: {anime.score}</p>
    <img className='w-[1rem]' src={starIcon} />
    <p>({anime.scored_by.toLocaleString()}</p>
	<img className='w-[1rem]' src={userIcon} />
	<p>)</p>
	</div>
	<button onClick={() => inLibrary ? removeInLib() : addToLib()} className='bg-prim-text text-bg! max-w-fit rounded-2xl px-5 py-1 my-2! cursor-pointer'>{inLibrary ? 'Remove From Library' : 'Add To Library'}</button>
	<p>{anime.ep}</p>
	<h2 className='font-bold text-lg'>Synopsis</h2>
	<p
	ref={textRef}
	className={expanded ? "" : "max-h-24 overflow-hidden"}
	>
	{anime.desc}
	</p>

	{isOverflowing && (
	    <button className='text-blue-200! max-w-fit cursor-pointer' onClick={() => setExpanded(prev => !prev)}>
	    {expanded ? "Read less" : "Read more"}
	    </button>
	)}
	<h2 className='font-bold'>More Information</h2>
	<p> <span className='font-bold'>Status:</span> {anime.status}</p>
	<p> <span className='font-bold'>Aired:</span> {anime.aired}</p>
	<p> <span className='font-bold'>Show Rating:</span> {anime.rating}</p>
	<p> <span className='font-bold'>Duration:</span> {anime.duration}</p>
	<p> <span className='font-bold'>Year Released:</span> {anime.year}</p>
	</section>
	</main>

}
