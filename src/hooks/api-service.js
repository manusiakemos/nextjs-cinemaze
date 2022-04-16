import axios from '@/lib/axios'
import { useRouter } from 'next/router'

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

const makeFullUrl = url => {
    return BASE_URL + url
}

const getPaginatedRequest = async ({ url, params }) => {
    let fullUrl = makeFullUrl(url)
    let res = await axios.get(fullUrl, {
        params: params,
    })
    const data = res.data
    return {
        totalCount: data.data.total,
        pageCount: Math.ceil(data.data.total / data.data.per_page),
        currentPage: data.data.current_page,
        perPage: data.data.per_page,
        data: data.data.data,
    }
}

const getRequest = async ({ url, params }) => {
    let fullUrl = makeFullUrl(url)
    let res = await axios.get(fullUrl, {
        params: params,
    })
    const resData = res.data
    return {
        data: resData.data,
    }
}

const postRequest = async ({ url, params }) => {
    let fullUrl = makeFullUrl(url)
    let res = await axios.post(fullUrl, params)
    const resData = res.data
    return {
        data: resData.data,
    }
}

export const useApiService = () => {
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const getHomeBg = async () => {
        let fullUrl = makeFullUrl('/api/v1/home-bg')
        let res = await axios.get(fullUrl)
        return res
    }

    const getMovies = async ({ router }) => {
        let res = await getPaginatedRequest({
            url: '/api/v1/movies',
            params: router.query,
        })

        return res
    }

    const watchMovie = async ({ id }) => {
        let url = `/api/v1/watch/${id}`
        const resData = await getRequest({ url: url })
        return resData
    }

    const getWatchList = async ({ router }) => {
        let res = await getRequest({
            url: '/api/v1/watchlist',
            params: router.query,
        })
        return res
    }

    const toggleWatchList = async({movie_id}) => {
        let res = await postRequest({
            url: `/api/v1/watchlist/toggle`,
            params:{
                movie_id : movie_id
            }
        });

        return res;
    }

    return {
        getHomeBg,
        getMovies,
        watchMovie,
        getWatchList,
        toggleWatchList,
    }
}
