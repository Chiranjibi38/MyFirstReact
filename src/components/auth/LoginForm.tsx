import{TextInput} from "../ui/form/Input";
import {FormLabel} from "../ui/form/Label";
import { useState, useEffect } from "react";
import type { ICredentials } from "./Auth.contract";
import { Link } from "react-router";

export default function LoginForm () {
    const [credentials]= useState<ICredentials>({
        username:"",
        password:""
    })
    const [loading, setLoading] = useState<boolean>(false)
        
    useEffect(() => {
        console.log("I am always excuted")
    })
      useEffect(() => {
        console.log("I am only called for the first time when component is mounted ")
        return()=> {
            setLoading(true);
        }
    }, [])

     useEffect(() => {
        console.log("I am only called  when credential state is manipulated ")
    }, [credentials, loading])
    

    return (
    <form action="" className="flex flex-col gap-5">
                <div className="flex w-full items-center">
                     <FormLabel htmlFor="username">User Name :</FormLabel>
                     <div className="w-2/3 flex flex-col">
                     <TextInput type="email" name="username" />
                     <span className="text-red-600 text-sm italic"></span>
                    </div>
                </div>
                <div className="flex w-full items-center">
                    <FormLabel htmlFor="password">Password :</FormLabel>
                    <div className="w-2/3 flex flex-col gap-1">    
                    <TextInput type="email" name="username"/>
                    <span className="text-red-800 text-sm italic"></span>
                    </div>
                </div>
                <div className="flex w-full items-center justify-end">
                    <Link to="/forget-password" className="text-teal-500 hover:text-teal-600 hover:underline italic">Forgot password?</Link>

                </div>
                <div className="flex w-full item-center gap-3">
                    <button className=" rounded-md cursor-pointer transition hover:scale-98 w-full bg-red-700 text-white flex items-center justify-center p-2">Reset</button>
                    <button className=" rounded-md cursor-pointer transition hover:scale-98 w-full bg-teal-800 text-white flex items-center justify-center p-2">Submit</button>
                </div>
               
            </form>
)

}
