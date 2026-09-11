import { createFileRoute } from "@tanstack/react-router";
import type { JwtPayload } from "@supabase/supabase-js";
import type { Show } from "../types/type.ts"
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";

export const Route = createFileRoute('/')({
    component: Index,
})

function Index():React.ReactNode {
    const claims : JwtPayload | null = useAuth()
    
    const [userLib, setUserLib] = useState<Show>()

    useEffect(() => {
	if (!claims) return;

	// TODO fetch from database using join to merge cache_shows and user_shows to lessen rate limit 
    },[])

    // If user is logged in, show welcome screen
    if (claims) {
	return (
	    <>
	    <Header />
	    <div>
	    <h1>Welcome!</h1>
	    <p>You are logged in as: {claims.email}</p>
	    </div>
	    </>
	)
    }
    return (
	<>
	<Header />
	<div>
	<p>Hello World</p>
	</div>
	</>
    )
}
