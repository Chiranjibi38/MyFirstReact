import Logo from "../../components/logo/Logo";
import { H1 } from "../ui/typography/PageTitle";
import RightSidePanel from "./RightSidePanel";
export default function ForgetPassword() {
    return (
        <>
        {/* Design */}
        <section className="w-full p-5 flex h-screen">
            <div className="w-1/3 bg-black  flex flex-col h-full p-5 text-white items-center justify-center rounded-md rounded-r-none gap-5">
            <Logo />
             
            <div className="flex gap-5 flex-col w-full item-center justify-center">
            <H1 className="text-white">Forget Password</H1>
            <p className=" text-red-600">
           Please reset your password if you have forget it.
             </p>
            </div>
            </div>

<RightSidePanel/>
        </section>
        </>
        
    );
}