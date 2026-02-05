import Link from "next/link";
import Image from "next/image";

// Placeholder type
interface Film {
    title: string;
    director?: string;
    poster?: string;
    slug: string;
}

export const FilmGrid = () => {
    // Placeholder data - eventually this comes from client.queries.filmConnection()
    const films: Film[] = [
        {
            title: "Our Hero, Balthazar",
            director: "Unknown",
            // poster: "/path/to/poster.jpg", // No poster yet
            slug: "our-hero-balthazar",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {films.map((film) => (
                <Link
                    key={film.slug}
                    href={`/films/${film.slug}`}
                    className="group relative aspect-[2/3] bg-white/5 border border-white/10 hover:border-white/30 transition-colors flex items-center justify-center overflow-hidden"
                >
                    {film.poster ? (
                        <Image src={film.poster} fill alt={film.title} className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                        <div className="text-center p-4">
                            <h3 className="font-display text-2xl uppercase tracking-tighter group-hover:tracking-normal transition-all duration-500">
                                {film.title}
                            </h3>
                            {film.director && <p className="text-xs opacity-50 mt-2">{film.director}</p>}
                        </div>
                    )}
                </Link>
            ))}
        </div>
    );
};
