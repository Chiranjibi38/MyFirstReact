import type { IFormLabelProps } from "./Form.contract";

export const FormLabel= ({htmlFor="", className="", children}: Readonly<IFormLabelProps>) => {

    return (
        <label htmlFor={htmlFor} className={`w-1/3 font-semibold  text-white ${className}`}>
            {children}
        </label>
    );
}  
