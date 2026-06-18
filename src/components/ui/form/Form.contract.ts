
import type {HTMLInputTypeAttribute, ReactNode} from "react";
export interface IFormLabelProps{
    htmlFor?: string,
     className?: string,
      children: ReactNode
    }

    export interface ITextInputProps {
      type:HTMLInputTypeAttribute,
      name:string,
      className?:string,
      errMsg?: string
    }