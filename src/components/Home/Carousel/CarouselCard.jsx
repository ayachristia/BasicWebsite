export default function CarouselCard({asset,headline,text,title}) {
    return (
        <>
        <article className="serviceCard  d-flex">
            <section className="serviceCard__container d-flex flex-column">
            <div className="serviceCard__imgContainer d-flex justify-content-center align-items-center mb-3">
            <img src={asset} alt={title} className="serviceCard__img" />
            </div>

            <h3 className="serviceCard__headline mb-3">{headline}</h3>
            <p className="serviceCard__text d-flex flex-wrap">{text}</p>
            </section>
            
        </article>
        </>
    )
}