import MainLayout from './MainLayout'

import { useAuth } from '@/hooks/auth'
import Navbar from '../Navbar'

const GuestLayout = ({ children, style, blur }) => {
    const { user } = useAuth({ middleware: 'guest' })
    let fBlur = 'backdrop-blur-3xl'
    if (blur) {
        fBlur = 'backdrop-blur-' + blur
    }
    return (
        <div
            className="bg-cover bg-center bg-fixed w-full h-full antialiased"
            style={
                style
                    ? style
                    : { backgroundImage: `url('/images/glass-bg.jpg')` }
            }>
            <main
                className={`w-full min-h-screen backdrop-filter backdrop-sepia-0 bg-black/30 ${fBlur} relative`}>
                <Navbar user={user}></Navbar>

                {children}
            </main>
        </div>
    )
}

export default GuestLayout
