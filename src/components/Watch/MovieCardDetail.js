import { useAuth } from '@/hooks/auth'
import Heading from '../Heading'
import KitButton from '../kit-button'
import { useState } from 'react'
import { useApiService } from '@/hooks/api-service'

const CardDetail = ({ movie, user, changeWatchMovieState }) => {
    const [liked, setliked] = useState(movie.liked);

    function getYoutubeId(e) {
        e.preventDefault()
        const regex = /https:\/\/www.youtube.com\/embed\/(.*)/gm

        // Alternative syntax using RegExp constructor
        // const regex = new RegExp('https:\\/\\/www.youtube.com\\/embed\\/(.*)', 'gm')

        const str = movie?.trailer_link
        let m
        let matches

        while ((m = regex.exec(str)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++
            }

            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                // console.log(`Found match, group ${groupIndex}: ${match}`);
                matches = match
            })
        }

        window.open(
            `https://www.youtube.com/watch?v=${matches}`,
            '_blank',
            'rel=noopener noreferrer',
        )
    }

    const loginButton = () => {
        if (!user) {
            return (
                <div>
                    <KitButton
                        className="bg-red-600 rounded capitalize font-normal"
                        variant={'link'}
                        href={'/login'}>
                        Login to watch movie
                    </KitButton>
                </div>
            )
        }
    }

    const watchButton = () => {
        if (user) {
            return (
                <div>
                    <KitButton
                        onClick={()=>{changeWatchMovieState(true)}}
                        className="bg-red-600 rounded capitalize font-normal"
                        variant={'rounded'}>
                       Watch movie
                    </KitButton>
                </div>
            )
        }
    }

    const toggleLike = async e => {
        setliked(!liked)

        const apiService = useApiService()

        await apiService.toggleWatchList({ movie_id: movie.movie_id })
    }

    return (
        <div className="backdrop-filter backdrop-blur-lg">
            <div className="rounded-xl overflow-clip shadow-lg py-3 px-6 bg-gray-400/20 ring-2 ring-red-100 hover:ring-red-5001shadow-warning-100/30 hover:shadow-primary-500/70 mt-3">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-4">
                        <img
                            className="aspect-[9/14] shadow-lg shadow-gray-300 backdrop-filter backdrop-blur rounded-lg"
                            src={movie?.poster}
                        />
                    </div>

                    <div className="col-span-12 md:col-span-8 px-6 text-sm">
                        <div className="flex justify-between">
                            <Heading className={`py-0 text-gray-100 text-xl`}>
                                {movie?.title}
                            </Heading>
                            {user ? (
                                <div className="love-wrapper">
                                    <div
                                        onClick={e => toggleLike()}
                                        className="love cursor-pointer transform duration-150 hover:scale-110">
                                        {!liked ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                width="32"
                                                height="32">
                                                <path
                                                    fill="none"
                                                    d="M0 0H24V24H0z"
                                                />
                                                <path
                                                    fill="red"
                                                    d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                width="32"
                                                height="32">
                                                <path
                                                    fill="none"
                                                    d="M0 0H24V24H0z"
                                                />
                                                <path
                                                    fill="red"
                                                    d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228z"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                ''
                            )}
                        </div>

                        <div className="flex items-center gap-4 py-3">
                            <div className="rounded px-2 py-1 bg-yellow-400 text-yellow-900 text-sm flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24">
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path
                                        d="M12 18.26l-7.053 3.948 1.575-7.928L.587 8.792l8.027-.952L12 .5l3.386 7.34 8.027.952-5.935 5.488 1.575 7.928z"
                                        fill="rgba(55,54,51,1)"
                                    />
                                </svg>
                                <span className="ml-1">{movie?.imdb}</span>
                            </div>
                            <div className="ml-1 text-gray-300 text-sm flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24">
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path
                                        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-8h4v2h-6V7h2v5z"
                                        fill="rgba(255,255,255,1)"
                                    />
                                </svg>{' '}
                                <span className="ml-1">
                                    {movie?.duration} min
                                </span>
                            </div>
                        </div>

                        <p className="text-gray-200 py-3">{movie?.desc}</p>

                        <div className="flex flex-col justify-center py-3 text-gray-300">
                            <div className="block mb-1">
                                <span className="text-gray-100">Country</span> :{' '}
                                {movie?.countries}
                            </div>
                            <div className="block mb-1">
                                <span className="text-gray-100">Genre</span> :{' '}
                                {movie?.genres}
                            </div>
                            <div className="block mb-1">
                                <span className="text-gray-100">Release</span> :{' '}
                                {movie?.release}
                            </div>
                            <div className="block mb-1">
                                <span className="text-gray-100">Cast</span> :{' '}
                                {movie?.actors}
                            </div>
                        </div>

                        <div className="py-3 flex gap-4 font-normal">
                            <KitButton
                                onClick={e => getYoutubeId(e)}
                                className="bg-red-600 rounded capitalize font-normal"
                                variant={'rounded'}>
                                Watch trailer
                            </KitButton>
                            {/* login button jika belum login dan ingin nonton */}
                            {loginButton()}
                            {watchButton()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardDetail
