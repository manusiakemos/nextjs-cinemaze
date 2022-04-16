import Head from 'next/head'
import MovieCard from '@/components/Movie-Card'
import Heading from '@/components/Heading'
import SearchBox from '@/components/Search-Box'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useApiService } from '@/hooks/api-service'
import AppLayout from '@/components/Layouts/AppLayout'

const WatchList = () => {
    const [watchList, setWatchList] = useState()

    const router = useRouter()

    useEffect(async () => {
        if (!router.isReady) {
            return null
        } else {
            const apiService = useApiService()
            const watchList = await apiService.getWatchList({router:router});
            setWatchList(watchList.data)
        }
    }, [router.isReady])
    //loading state

    let content = null

    content = (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {watchList?.watchlist?.map(item => {
                return (
                    <MovieCard movie={item.movie} key={item.movie.movie_id} />
                )
            })}
        </div>
    )

    return (
        <AppLayout>
            <Head>
                <title>Watchlist - Cinemaze</title>
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
            </div>
        </AppLayout>
    )
}

export default WatchList;
