// components/Carousel.jsx
import { useEffect, useState, useRef } from "react";
import { carouselCards } from "@/data";
import CarouselCard from "./CarouselCard"
import { useResponsiveSlides } from "./Hooks/useResponsiveSlides";
import { useInfiniteCards } from "./Hooks/useInfiniteCards";
import { useFocusedSlide } from "./Hooks/useFocusedSlide";
import { useCarouselPosition } from "./Hooks/useCarouselPosition";
import { useIntersectionObserver } from "./Hooks/useIntersectionObserver";

export default function Carousel() {
    const [slideIndex, setSlideIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const carouselRef = useRef(null)

    // Custom hooks
    const { slidesPerView } = useResponsiveSlides();
    const { infiniteCards, startOffset } = useInfiniteCards(carouselCards, slidesPerView);
    const focusedSlideIndex = useFocusedSlide(slideIndex, startOffset, carouselCards, slidesPerView);
    const { trackRef, updateSlidesWidth, updatePosition } = useCarouselPosition(
        slideIndex, 
        isTransitioning, 
        setIsTransitioning, 
        setSlideIndex, 
        carouselCards, 
        startOffset,
        slidesPerView
    );
    const isInView = useIntersectionObserver(carouselRef);

    const showSlides = (direction) => {
        if (isTransitioning) return;
        
        const newIndex = slideIndex + direction;
        setSlideIndex(newIndex);
    }

    const handleIndicatorClick = (targetOriginalIndex) => {
        if (isTransitioning) return;
        
        let targetSlideIndex;
        
        if (slidesPerView === 1) {
            targetSlideIndex = targetOriginalIndex + startOffset;
        } else if (slidesPerView === 2) {
            targetSlideIndex = targetOriginalIndex + startOffset;
        } else {
            targetSlideIndex = targetOriginalIndex + startOffset - 1;
        }
        
        setSlideIndex(targetSlideIndex);
    }

    useEffect(() => {
        const handleResize = () => {
            updateSlidesWidth();
            updatePosition();
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    useEffect(()=>{
        const timer = setTimeout(() => {
            updateSlidesWidth();
            setSlideIndex(startOffset);
            setTimeout(() => updatePosition(), 50);
        }, 100);
        
        return () => clearTimeout(timer);
    }, [])

    useEffect(()=>{
        updatePosition()
    }, [slideIndex])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isInView) return;
            
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                showSlides(1);
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                showSlides(-1);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [slideIndex, isTransitioning, isInView])

    return (
        <>
        <section 
        className="carousel d-flex flex-column align-items-center position-relative" 
        tabIndex={0}
        ref={carouselRef}
        >
                                    <h1 className="carousel__headline">Services we offer</h1>

            <div className="carousel__container position-relative">
            <section 
            className="carousel__track d-flex" 
            ref={trackRef}
            >
            {infiniteCards.map((card, index)=>{
                const isSlideInFocus = () => {
                const actualCardIndex = (index - startOffset + carouselCards.length) % carouselCards.length;
                return actualCardIndex === focusedSlideIndex;
                };
                return (
                <div
                key={`${card.id}-${index}`}
                className={`carousel__slide ${isSlideInFocus() ? 'carousel__slide--focused' : ''}`}
                >
                <div className="carousel__content d-flex">
                < CarouselCard
                asset={card.asset}
                headline={card.headline}
                text={card.text}
                title={card.title}
                focused={isSlideInFocus()}
                />
                </div>
                </div>
                )
            })}
            </section>

            <div className="carousel__nav d-flex position-absolute bottom-0 start-50 translate-middle-x gap-3">
                <div className="carousel__dots d-flex">
                    {carouselCards.map((_, index) => (
                    <span
                    key={index}
                    className={`carousel__dot ${index === focusedSlideIndex ? 'active' : ''}`}
                    onClick={()=> handleIndicatorClick(index)}>
                    </span>
                    ))}
                </div>

                        <div className="carousel__numbers d-flex align-items-center">
                            <p className="carousel__current-number mb-0">{focusedSlideIndex + 1}</p>
                            <div 
                            className="carousel__line"
                            style={{
                            background: `linear-gradient(to right, 
                            ${Array.from({length: carouselCards.length}, (_, i) => 
                            i === focusedSlideIndex 
                            ? 'rgb(187, 145, 246)' 
                            : '#C5C5C5'
                            ).map((color, i) => 
                            `${color} ${(i / carouselCards.length) * 100}%, ${color} ${((i + 1) / carouselCards.length) * 100}%`
                            ).join(', ')})`,
                            }}
                            ></div>
                            <p className="carousel__total-number mb-0">{carouselCards.length}</p>
                        </div>
            </div>
            </div>
            
        </section>
        </>
    )
}
