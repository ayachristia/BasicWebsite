export default function Form() {
    return (
        <>
        
        <form 
        action="https://formspree.io/f/xblovnzw" 
        method="POST"
        className="contact__form w-auto mx-auto px-4 py-4 d-flex flex-column gap-4"
        >
            
            <div className="form-group d-flex flex-column gap-1">
                <label htmlFor="name" className="formLabel text-start">
                    Name
                </label>
                <input 
                type="text" 
                id="name"
                name="name"
                className="form-input rounded-2"
                required
                aria-describedby="name-error"  
                placeholder="Name ..."/>
            </div>
            <div className="form-group d-flex flex-column gap-1">
                <label htmlFor="email" className="formLabel text-start">
                    Email
                </label>
                <input 
                type="email" 
                id="email"
                name="email"
                className="form-input rounded-2"
                required
                aria-describedby="email-error"  
                placeholder="Email ..."/>
            </div>
            <div className="form-group d-flex flex-column gap-1">
                <label htmlFor="subject" className="formLabel text-start">
                     Subject
                </label>
                <input 
                type="text" 
                id="subject"
                name="subject"
                className="form-input rounded-2"
                required
                aria-describedby="subject-error"  
                placeholder="Subject ..."/>
            </div>

            <div className="form-group d-flex flex-column gap-1">
                <label htmlFor="message" className="form-label text-start mb-0">
                    Message
                </label>
                <textarea 
                name="message" 
                id="message"
                className="form-textarea rounded-2"
                rows="5"
                required
                aria-describedby="message-error"
                placeholder="Message ...">

                </textarea>
            </div>

            <button type="submit" className="form-submit rounded-2 text-white border-0 py-1">
                Submit
            </button>

            <input type="hidden" name="_gotha" style={{display:'none'}}/>
        </form>
        </>
    )
}