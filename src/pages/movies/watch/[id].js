import Head from 'next/head'
import Router, { useRouter, withRouter } from 'next/router'

import Axios from 'axios'

import CardDetail from '@/components/Watch/MovieCardDetail'
import MovieCard from '@/components/Movie-Card'
import Heading from '@/components/Heading'
import WatchFrame from '@/components/Watch/WatchFrame'
import { useAuth } from '@/hooks/auth'
import GuestLayout from '@/components/Layouts/GuestLayout'
import { useApiService } from '@/hooks/api-service'
import { useEffect, useState } from 'react'

const Movie = props => {
    const { user } = useAuth({ middleware: 'guest' })
    const [data, setData] = useState()
    const [watchMovie, setWatchMovie] = useState(false);

    const changeWatchMovieState = (val)=>{
        setWatchMovie(val);
    }

    const router = useRouter()
    useEffect(async () => {
        if (router.isReady) {
            const apiService = useApiService()
            const id = props.router.query.id
            let resData = await apiService.watchMovie({
                id: id,
            })
            setData(resData.data);
            setWatchMovie(false);
        }
    }, [props])

    const iframeWidget = () => {
        return (
            <div className="mb-6">
                <Heading>{data?.movie?.title}</Heading>
                <WatchFrame src={data?.movie?.iframe_link} />
            </div>
        )
    }

    return (
        <GuestLayout
            className="bg-cover bg-center bg-fixed w-full h-full"
            style={{ backgroundImage: `url('${data?.movie?.backdrop}')` }}>
            <Head>
                <title>Watch Movie - Cinemaze</title>
                <meta name="description" content="Movie news app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {data ? (
                <div className="container mx-auto py-6 px-3 md:px-0">

                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 lg:col-span-7">
                            {/* card detail */}
                            <div>
                                <CardDetail user={user} movie={data.movie} changeWatchMovieState={changeWatchMovieState} />
                            </div>
                        </div>

                        <div className="col-span-12 lg:col-span-5">
                            <Heading className="text-gray-100 mt-0 pt-0">
                                You may also like
                            </Heading>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {data?.suggest?.map(item => {
                                    return (
                                        <MovieCard
                                            key={`suggest-` + item.movie_id}
                                            movie={item}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                     {/* iframe */}
                     {user && watchMovie ? iframeWidget() : ''}
                </div>
            ) : (
                ''
            )}
        </GuestLayout>
    )
}

export default withRouter(Movie)
