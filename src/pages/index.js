import Head from 'next/head'
import Navbar from '@/components/Navbar'
import SearchBox from '@/components/Search-Box'
import Axios from '@/lib/axios'
import { useAuth } from '@/hooks/auth'
import { useApiService } from '@/hooks/api-service'
import { useState, useEffect } from 'react'

const Home = () => {
    const [highlight, sethighlight] = useState()
    const { user } = useAuth({ middleware: 'guest' })

    useEffect(async () => {
        const apiService = useApiService()
        const res = await apiService.getHomeBg()
        if (res.data) {
            sethighlight(res.data)
        } else {
            let x = { data: { image_path: '' } }
            sethighlight(x)
        }
    }, [])
    return (
        <div
            className="bg-cover bg-center"
            style={{
                backgroundImage: `url('${highlight?.data?.image_path}')`,
            }}>
            <Head>
                <title> Home - Cinemaze</title>
                <meta name="description" content="Movie news app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="w-full min-h-screen backdrop-filter backdrop-sepia-0 bg-gradient-to-b from-black/70 to-primary-500/20 relative">
                <Navbar user={user} />
                <div className="absolute inset-0 inset-y-1/2 w-full  flex justify-center">
                    <div className="w-1/2 md:w-1/3">
                        <SearchBox />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Home
