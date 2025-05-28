import { Link } from "react-router";

export default function Button({text, path, className}) {
    return (
        <>
        <Link to={`/${path}`} className={`button ${className}`}>
        {text}
        </Link>
        </>
    )
}