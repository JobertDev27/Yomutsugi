import { Link } from "@tanstack/react-router";
import type { Show } from "../types/type";

type ShowProps = {
    show: Show;
}

export default function ShowCard({show}: ShowProps): React.ReactNode {
    return <Link to="/animes/$animeId" params={{animeId: String(show.id)}}>
	<div className="relative">
	    <img className="max-h-[290px] w-full  min-h-25" src={show.cover} alt={`${show.title} cover`} />
	    <div className="absolute bottom-0 left-0 p-2 w-full bg-linear-to-t from-[rgba(0,0,0,0.8)] backdrop-blur-sm">
	    <p className="font-bold">{show.title}</p> 
	    </div>
	</div>
    </Link>


}
