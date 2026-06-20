import{TextInput} from "../ui/form/Input";
import {FormLabel} from "../ui/form/Label";

export default function ForgetPasswordForm () {
    return (
    <form action="" className="flex flex-col gap-5 ">
                <div className="flex w-full items-center">
                     <FormLabel htmlFor="username" >User Name :</FormLabel>
                     <div className="w-2/3 flex flex-col">
                     <TextInput type="email" name="username" />
                     <span className="text-red-600 text-sm italic"></span>
                    </div>
                </div>
              
                
                
                <div className="flex w-full item-center gap-3">
                    <button className=" rounded-md cursor-pointer transition hover:scale-98 w-full bg-red-700 text-white flex items-center justify-center p-2">Reset</button>
                    <button className=" rounded-md cursor-pointer transition hover:scale-98 w-full bg-teal-800 text-white flex items-center justify-center p-2">Submit</button>
                </div>
               
            </form>
);

}
