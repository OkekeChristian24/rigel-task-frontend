import React from "react";
import '../../style/components/button.css';

export interface ButtonProps {
    onClick?: any,
    className: string,
    label: string
};

export default function Button(props: ButtonProps){
    const { onClick, className, label} = props;

    return(
        <button onClick={onClick} className={`button ${className}`}>
            {label}
        </button>
    );
}

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, React.AriaAttributes  {}

export const ButtonPrimary:React.FC<ButtonProps> = props => {
    const {children, ...rest} = props;

    return (
        <button {...rest}>{children}</button>
    )
}