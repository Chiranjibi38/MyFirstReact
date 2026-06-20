import Logo from "../../components/logo/Logo";
import { H1 } from "../ui/typography/PageTitle";
import ForgetPasswordForm from "./ForgetPasswordForm";
export default function ForgetPassword() {
    return (
        <>
        {/* Design */}
        <section className="w-full gap-5  p-5 flex h-screen">
            <div className="w-1/3 bg-black  flex flex-col h-full p-5 text-white items-center justify-center rounded-md mr-1 gap-5">
            <Logo />
             
            <div className="flex gap-5 flex-col w-full item-center justify-center">
            <H1 className="text-white">Forget Password</H1>
            <p className=" text-red-600">
           Please reset your password if you have forget it.
             </p>
            </div>
            </div>
            <div className="w-2/3 flex flex-col gap-10 bg-black p-10 rounded-md">
                <div className="flex border-b border-b-green-900/30 pb-5">
                <H1 className="text-green-900">
                    <em>Forgot your password?</em>
                </H1>

                </div>
                <ForgetPasswordForm />  

                <div className="flex w-full justify-center item-center ">
                
                <span className="text-lg  text-teal-800"> - Or -</span>
                </div>
        
                <div className="flex w-full items-center  justify-center">
                    <a 
                    href="/"
                    className="text-teal-700 w-full shadow border-teal-800/40 rounded-full p-2 text-center border  text-sm hover:underline hover:text-teal-800 hover:bg-teal-800/50 transition hover:scale-96">
                           Login
                    </a>

                </div>
                

            </div>

        </section>
        </>
        
    );
}
