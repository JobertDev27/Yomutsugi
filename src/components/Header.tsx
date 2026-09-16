import { Link, useNavigate } from "@tanstack/react-router";
import type { JwtPayload } from "@supabase/supabase-js";
import { supabase } from "../utils/supabase"
import { useAuth } from "../hooks/useAuth";

export default function Header() {
    const claims : JwtPayload | null = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
	const { error } = await supabase.auth.signOut()

	if (error) {
	    console.error(error)
	    return
	}

	navigate({ to: "/" })
    }

    return <header className="flex flex-row w-full justify-between p-5" >

    <div  > <h1>Yomutsugi</h1> </div>
    <form className="flex justify-center items-center w-full">
    <input type="search" className="border-1 border-border w-full max-w-[550px] py-2 px-4 rounded-md" placeholder="Search..."/>	
    <button type="submit" className="border border-border py-2 px-4 bg-border rounded-r-lg">🔍︎</button>
    </form> 
    <nav className="flex flex-row gap-5 justify-center items-center">
    <Link to='/'>Library</Link>
    <Link to='/animes'>Browse</Link>
    {claims ? <button onClick={handleLogout}>Logout</button> : <Link to="/auth">Login</Link> }
    </nav>
    </header>
}
