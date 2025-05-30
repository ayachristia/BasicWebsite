import Form from "../components/Contact/Form";

export default function Contact() {
    return (
        <>
        <section className="contact text-center">

        <div className="contact__container">
            <div className="row">
                <header className="contact__header col-12">
                    <h1 className="contact__headline">Get in contact</h1>
                    <p className="contact__subtext">Send a message:</p>
                </header>

                <Form />
            </div>

        </div>
        </section>
        </>
    )
}

