import MainLayout from './MainLayout'

import { useAuth } from '@/hooks/auth'
import Navbar from '../Navbar'

const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    return (
        <MainLayout>
            <Navbar user={user}></Navbar>
            {children}
        </MainLayout>
    )
}

export default AppLayout
