import {CSSProperties} from "react";

export class AuthStyles {
    public static formContainer = {
        maxWidth: '450px',
        width: '100vw',
        margin: 'auto',
        display: 'flex',
        textAlign: 'left',
        justifyContent: 'center',
        alignItems: 'center'
    } as CSSProperties;

    public static h1Style: CSSProperties = {
        padding: "0 5%",
        maxWidth: '450px',
        margin: 'auto',
        width: '100vw',

    }

    public static inputStyle: CSSProperties = {
        width: '100%',
        color: 'rgba(0,0,0,.25)'
    }

    public static formStyle: CSSProperties = {
        padding: "0 5%",
        width: '100%'
    }
}
