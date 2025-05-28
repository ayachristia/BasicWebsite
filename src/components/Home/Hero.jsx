import heroImage from "/heroImage.svg";
import Button from "../UniversalComponents/Button";
export default function Hero() {
    return (
        <>
        <section className="hero">
            <div className="container">
                <div className="row align-items-center justify-content-center">

                    <div className="col-12 order-2 col-md-5 order-md-1">
                        <header className="hero__header text-center text-md-start">
                             <h1 className="hero__headline">
                                 <span className="hero__headline--top">
                                 Great <span className="hero__headline--soft">Product</span> is
                                 </span>
                                 <span className="hero__headline--bottom">
                                 built by great <span className="hero__headline--dark">teams</span>
                                 </span>
                             </h1>
                             <p className="hero__text">
                                 We help build and manage a team of world-class developers to bring your vision to life
                             </p>

                             <Button text="Lets get started!" path="how" className="button--primary" />
                        </header>
                    </div>

                    <div className="col-12 order-1 col-md-7  order-md2">
                        <section className="hero__imgcontainer">
                        <img src={heroImage} alt="aTeamWorkingTogether" aria-label="teamWork" className="hero__img"/>
                        </section>
                    </div>

                </div>
            </div>


        </section>
        </>
    )
}