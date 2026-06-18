export const FormLabel= ({htmlFor="", className="", children}: Readonly<IFormLabelProps>) => {

    return (
        <label htmlFor={htmlFor} className={`w-1/3 font-semibold ${className}`}>
        {children}
            </label>
    );
}  