import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import KitButton from '@/components/kit-button'
import MainLayout from '@/components/Layouts/MainLayout'

const Login = () => {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/',
    })

    const [username, setUsername] = useState('manusiakemos')
    const [password, setPassword] = useState('password')
    const [spa, setSpa] = useState(true)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const appname = process.env.NEXT_APP_NAME ?? 'cinemaze';

    useEffect(() => {
        if (router.query.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.query.reset))
        } else {
            setStatus(null)
        }
    })

    const submitForm = async event => {
        event.preventDefault()

        login({ username, password, spa, setErrors, setStatus })
    }

    return (
        <MainLayout>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-screen">
                <div
                    className="hidden md:block"
                    style={{
                        background: `url('/images/cinema.jpg')`,
                        backgroundPosition: 'left center',
                        backgroundSize: 'cover',
                    }}></div>
                <div className="px-3">
                    <AuthCard appname={appname}>
                        {/* Session Status */}
                        <AuthSessionStatus className="mb-4" status={status} />

                        {/* Validation Errors */}
                        <AuthValidationErrors
                            className="mb-4"
                            errors={errors}
                        />

                        <form
                            onSubmit={submitForm}
                            className="text-gray-300 px-6 py-3">
                            {/* Username Address */}
                            <div>
                                <Label htmlFor="username">Username</Label>

                                <Input
                                    id="username"
                                    type="text"
                                    value={username}
                                    className="block mt-1 w-full"
                                    onChange={event =>
                                        setUsername(event.target.value)
                                    }
                                    required
                                    autoFocus
                                />
                            </div>

                            {/* Password */}
                            <div className="mt-4">
                                <Label htmlFor="password">Password</Label>

                                <Input
                                    id="password"
                                    type="text"
                                    value={password}
                                    className="block mt-1 w-full"
                                    onChange={event =>
                                        setPassword(event.target.value)
                                    }
                                    required
                                    autoComplete="current-password"
                                />
                            </div>

                            {/* Remember Me */}
                            <div className="block mt-4">
                                <label
                                    htmlFor="remember_me"
                                    className="inline-flex items-center">
                                    <input
                                        id="remember_me"
                                        type="checkbox"
                                        name="remember"
                                        className="rounded border-gray-300 text-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />

                                    <span className="ml-2 text-sm text-gray-300">
                                        Remember me
                                    </span>
                                </label>
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                {/* <Link href="/forgot-password">
                            <a className="underline text-sm text-gray-600 hover:text-gray-900">
                                Forgot your password?
                            </a>
                        </Link> */}

                                <KitButton
                                    variant="rounded"
                                    className="ml-3 bg-primary-500 text-sm">
                                    Login
                                </KitButton>
                            </div>
                        </form>
                    </AuthCard>
                </div>
            </div>
        </MainLayout>
    )
}

export default Login
