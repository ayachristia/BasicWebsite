import { Link, NavLink } from "react-router"
import "/src/Styles/style.scss"
import navLogo from "/navLogo.svg"
import Button from "./UniversalComponents/Button"
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navigation() {
    return (
        <>
        <header className="primaryHeader">
            <div className="container-fluid h-100">
                <div className="row align-items-center h-100">

                    <div className="col-auto"><Link to="/">
                        <div className="d-flex align-items-center gap-2">
                            
                            <img src={navLogo} alt="Logo image" className="h-100"/>
                        <p className="mb-0 text-black">JK Developers</p>
                            
                        
                        </div></Link>
                    </div>

                    <div className="col d-flex justify-content-end justify-content-lg-center">
                                <nav className="navbar navbar-expand-lg p-0 w-100 ">

                                    <button 
                                    className="navbar-toggler border-0 p-0 d-lg-none ms-auto"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#navbarNav"
                                    >
                                    <GiHamburgerMenu className="navbar-toggler-icon"/>
                                    </button>

                                    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                                    <div className="navigation d-flex gap-4 gap-lg-5 flex-column flex-lg-row">
                                        < NavLink className="navigation__item" to="/">About us</NavLink>
                                        < NavLink className="navigation__item" to="/list">Services</NavLink>
                                        < NavLink className="navigation__item" to="/case">Case Studies</NavLink>
                                        < NavLink className="navigation__item" to="/blog">Blog</NavLink>
                                        < NavLink className="navigation__item" to="/how">How it works</NavLink>
                                        < NavLink className="navigation__item" to="/contact">Hire</NavLink>
                                        <Button text="Contact us" path="contact" className="button--navigation2 d-block d-lg-none" />
                                    </div>
                                    </div>
                                </nav>

                    </div>
                    
                    <div className="col-auto d-none d-lg-block">
                    <Button text="Contact us" path="contact" className="button--navigation" />
                    </div>

                </div>
            </div>

        


        

        </header>
        
        </>
    )
}
