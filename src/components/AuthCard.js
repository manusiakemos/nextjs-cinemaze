const AuthCard = ({ appname, children }) => (
   <div className="flex flex-col font-bold justify-center items-center w-full min-h-screen">
        <h1 className="text-primary-500 text-4xl">
                        {appname}
                    </h1>
        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-gray-500 backdrop-filter backdrop-sepia-0 backdrop-blur-lg shadow-md overflow-hidden sm:rounded-lg">
            {children}
        </div>
   </div>
)

export default AuthCard
