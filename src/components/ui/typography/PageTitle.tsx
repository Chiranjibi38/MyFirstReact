import {type IH1Props} from "./PageTitle.contract";


export const H1 = ({className='text-green-900', children}: Readonly<IH1Props>) => {

    return <h1 className={`text-6xl font-semibold ${className}`}>
        {children}
    </h1>;
} 