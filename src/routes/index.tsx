import { createFileRoute } from "@tanstack/react-router";
import type { JwtPayload } from "@supabase/supabase-js";
import type { Show } from "../types/type.ts"
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import {supabase} from "../utils/supabase.ts"
import ShowCard from "../components/ShowCard.tsx";

export const Route = createFileRoute('/')({
    component: Index,
})

type UserShow = {
    id: number;
    user_id: string;
    mal_id: number;
    category: number | null;
    shows: Show;
};

function Index():React.ReactNode {
    const claims : JwtPayload | null = useAuth()

    const [userLib, setUserLib] = useState<UserShow[]>([])

    useEffect(() => {
	if (!claims) return;

	const getShows = async () => {
	    const { data, error } = await supabase
	    .from("user_shows")
	    .select(`*, shows (title, cover)`)
	    .eq("user_id", claims.sub);

	    console.log(data)
	    if (data) setUserLib(data);
	    if (error) console.error("userLib:", error);
	}
	getShows()
    },[])

    // If user is logged in, show welcome screen
    if (claims) {
	return (
	    <>
	    <Header />
	    <div>
	    <h1>Welcome!</h1>
	    <p>You are logged in as: {claims.email}</p>
	    <main className="grid lg:grid-cols-8 md:grid-cols-4 grid-cols-2 gap-3">
	    {userLib.map((s, key) => <ShowCard key={key} show={s.shows} />)}
	    </main>
	    </div>
	    </>
	)
    }
    return (
	<>
	<Header />
	<div>
	<p>You are not logged in</p>
	</div>
	</>
    )
}
