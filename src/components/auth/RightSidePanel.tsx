import LoginForm from "./LoginForm";
import { H1 } from "../ui/typography/PageTitle";
export default function RightSidePanel() {
    return (
        <div className="w-2/3 bg-black flex flex-col gap-10 p-10 rounded-l-none rounded-md">
            <div className="flex border-b border-b-green-900/30 pb-5">
            <H1 className="text-green-900">
                <em>Login Form</em>
            </H1>
            </div>
            <LoginForm/>
            </div>

    );
}
