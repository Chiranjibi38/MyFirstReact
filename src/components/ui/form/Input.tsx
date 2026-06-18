import type {ITextInputProps} from "./Form.contract";
export const TextInput=({type='text', name, className='',errMsg=""}:Readonly<ITextInputProps>) =>{
    return (
        <>
    <input 
        type={type }
        name={name}
        placeholder={`Enter your ${name}....`}
        
        className={`border border-gray-300 w-full p-2 rounded-md shadow bg-white 4{className}`}
        /> 
        <span className="text-red-800 text-sm italic"></span>
        </>
    );
}