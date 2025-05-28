export default function Contact() {
    return (
        <>
        <section className="contact">
        <header className="contact__header">
            <h1 className="contact__headline">Get in contact with us</h1>
            <p className="contact__subtext">Send a message:</p>
        </header>

        <form 
        action="https://formspree.io/f/xblovnzw" 
        method="POST"
        className="contact__form">
            
            <div className="form-group">
                <label htmlFor="name" className="formLabel">
                    Name *
                </label>
                <input 
                type="text" 
                id="name"
                name="name"
                className="form-input"
                required
                aria-describedby="name-error"  />
            </div>
            <div className="form-group">
                <label htmlFor="email" className="formLabel">
                    Email *
                </label>
                <input 
                type="email" 
                id="email"
                name="email"
                className="form-input"
                required
                aria-describedby="email-error"  />
            </div>
            <div className="form-group">
                <label htmlFor="subject" className="formLabel">
                     *
                </label>
                <input 
                type="text" 
                id="subject"
                name="subject"
                className="form-input"
                required
                aria-describedby="subject-error"  />
            </div>

            <div className="form-group">
                <label htmlFor="message" className="form-label">
                    Message *
                </label>
                <textarea 
                name="message" 
                id="message"
                className="form-textarea"
                rows="5"
                required
                aria-describedby="message-error">

                </textarea>
            </div>

            <button type="submit" className="form-submit">
                Submit
            </button>

            <input type="hidden" name="_gotha" style={{display:'none'}}/>
        </form>
        </section>
        </>
    )
}

