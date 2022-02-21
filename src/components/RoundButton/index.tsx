import React from "react";
import '../../style/components/roundbutton.css';


export interface RoundButtonProps{
    className: string,
    icon: React.ReactNode,
    label: string
};

export default function RoundButton(props: RoundButtonProps){

    return(
        <button className={`Roundbutton-btn ${props.className}`}>
            <div className="Roundbutton-btn-icon">
                {props.icon}
            </div>            
            <p className="Roundbutton-btn-label">
                {props.label}
            </p>
        </button>
    );
}