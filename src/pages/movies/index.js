import Head from 'next/head'
import MovieCard from '@/components/Movie-Card'
import Heading from '@/components/Heading'
import SearchBox from '@/components/Search-Box'
import Paginate from '@/components/Paginate'
import { useRouter, withRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useApiService } from '@/hooks/api-service'
import GuestLayout from '@/components/Layouts/GuestLayout'

const Movies = props => {
    //loading state
    const router = useRouter();
    const [movies, setMovies] = useState();


    useEffect(async () => {
        if (!router.isReady) {
            return null
        } else {
            // const { user } = useAuth({ middleware: 'guest' })
            const apiService = useApiService()
            const getMovies = await apiService.getMovies({router:router});

            setMovies(getMovies)
        }
    }, [router])

    let content;

    content = (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {movies?.data?.map(movie => {
                return <MovieCard movie={movie} key={movie.movie_id} />
            })}
        </div>
    )

    return (
        <GuestLayout>
            <Head>
                <title>Movie - Cinemaze</title>
                <meta name="description" content="Movie news app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container mx-auto py-6 px-3">
                <div className="md:flex md:flex-row items-center justify-between">
                    {/* heading */}
                    <div className="grow w-full md:w-1/2">
                        <Heading className="text-center md:text-left capitalize tracking-wide font-sans">
                            movies
                        </Heading>
                    </div>
                    {/* search box */}
                    <div className="grow">
                        <SearchBox className="grow" />
                    </div>
                </div>
                <div className="py-6">{content}</div>

                <div className="py-6">
                    <Paginate data={movies} />
                </div>
            </div>
        </GuestLayout>
    )
}

export default withRouter(Movies)
