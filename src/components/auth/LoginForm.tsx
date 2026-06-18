export default function LoginForm () {
return (
    <form action="" className="flex flex-col gap-5">
                <div className="flex w-full items-center">
                    <label htmlFor="username" className="w-1/3 font-semibold text-white">User Name:{" "} </label>
                    <div className="w-2/3 flex flex-col">
                     <input type="email" className="border border-gray-300 w-full p-2 rounded-md shadow bg-white"/>
                     <span className="text-red-600 text-sm italic"></span>
                    </div>
                </div>
                <div className="flex w-full items-center">
                    <label htmlFor="password" className="w-1/3 font-semibold text-white">Password:{" "} </label>
                    <div className="w-2/3 flex flex-col gap-1">
                    <input type="password" className="border border-gray-300 w-full p-2 rounded-md shadow bg-white"/>
                    <span className="text-red-800 text-sm italic"></span>
                    </div>
                    </div>
                    <div className="flex w-full items-center justify-end">
                    <a href="/forget-password" className="text-teal-500 hover:text-teal-600 hover:underline italic">Forgot password?</a>

                </div>
                <div className="flex w-full item-center gap-3">
                    <button className=" rounded-md cursor-pointer transition hover:scale-98 w-full bg-red-700 text-white flex items-center justify-center p-2">Reset</button>
                    <button className=" rounded-md cursor-pointer transition hover:scale-98 w-full bg-teal-800 text-white flex items-center justify-center p-2">Submit</button>
                </div>
               
            </form>
)

}