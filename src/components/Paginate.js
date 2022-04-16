import ReactPaginate from 'react-paginate'
import { useRouter, withRouter } from 'next/router'

const Paginate = ({ data }) => {
    const router = useRouter()
    const pagginationHandler = page => {
        router.query.page = page.selected + 1
        router.push({
            pathname: router.pathname,
            query: router.query,
        })
    }

    let content = null;

    if (router.isReady && data) {
        content = (
            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'. . .'}
                breakClassName={'text-gray-100 text-lg flex items-center'}
                activeClassName={'bg-primary-700 p-3'}
                containerClassName={
                    'flex justify-center items-center text-white gap-2 font-semibold uppercase text-sm'
                }
                pageClassName={
                    'px-4 py-2 border-2 hover:bg-primary-500 rounded text-sm hidden md:block'
                }
                initialPage={data.currentPage - 1}
                pageCount={data.pageCount}
                onPageChange={pagginationHandler}
            />
        )
    }
    return content
}

export default withRouter(Paginate);
