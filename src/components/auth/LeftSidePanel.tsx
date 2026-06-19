import Logo from "../logo/Logo";
import { H1 } from "../ui/typography/PageTitle";
export default function LeftSidePanel() {
    return (
       <div className="w-1/3 bg-black rounded-r-none rounded-md p-10 items-center justify center flex flex-col gap-5 text-white">
        <Logo />
        <H1 className="text-green-100">
            Login Page
        </H1>   
             <p className="text-center p-5 text-pink-300" >
               Welcome!  please enter your username and password.

            </p>
            
            </div>
         
    );
}
