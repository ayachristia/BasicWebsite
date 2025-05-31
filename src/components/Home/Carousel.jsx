import { useEffect, useState, useRef } from "react";
import { carouselCards } from "../../data"
import CarouselCard from "./CarouselCard"

export default function Carousel() {

    const [slideIndex, setSlideIndex] = useState(0);
    const trackRef = useRef(null)
    const slideWidth = useRef(0)
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Function to get how many slides are visible at once
    const getSlidesPerView = () => {
        if(window.innerWidth <= 768) return 1;
        if(window.innerWidth <= 1024) return 2;
        return 3; // Desktop shows 3 slides
    }

    const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView())
    const [isInView, setIsInView] = useState(false)
    const carouselRef = useRef(null)

    // Create infinite scroll array with clones
    const createInfiniteCards = () => {
        const totalCards = carouselCards.length;
        const clonesNeeded = slidesPerView;
        
        // Add clones at the beginning (last slides)
        const startClones = carouselCards.slice(-clonesNeeded);
        // Add clones at the end (first slides)  
        const endClones = carouselCards.slice(0, clonesNeeded);
        
        return [...startClones, ...carouselCards, ...endClones];
    }

    const infiniteCards = createInfiniteCards();
    const startOffset = slidesPerView; // Offset to account for clones at start

    // Calculate the index of the middle/focused slide (based on original array)
    const getFocusedSlideIndex = () => {
        let actualIndex = slideIndex - startOffset;
        
        // Handle wrapping for display
        while (actualIndex < 0) actualIndex += carouselCards.length;
        while (actualIndex >= carouselCards.length) actualIndex -= carouselCards.length;
        
        if (slidesPerView === 1) {
            return actualIndex;
        } else if (slidesPerView === 2) {
            return actualIndex;
        } else {
            // For 3 slides, the middle one is in focus
            let focusedIndex = actualIndex + 1;
            while (focusedIndex >= carouselCards.length) focusedIndex -= carouselCards.length;
            return focusedIndex;
        }
    }

    const updateSlidesWidth = () => {
        if(trackRef.current){
            const firstSlide = trackRef.current.querySelector('.carousel__slide');
            if(firstSlide) {
                slideWidth.current = firstSlide.offsetWidth;
            }
        }
    }

    const updatePosition = () => {
        if(trackRef.current){
            const translateX = -slideWidth.current * slideIndex;
            trackRef.current.style.transform = `translateX(${translateX}px)`;
            
            // Handle infinite scroll wrapping
            if (!isTransitioning) {
                const totalCards = carouselCards.length;
                const maxIndex = infiniteCards.length - slidesPerView;
                
                // If we're at the end clones, jump to the real beginning
                if (slideIndex >= totalCards + startOffset) {
                    setTimeout(() => {
                        setIsTransitioning(true);
                        trackRef.current.style.transition = 'none';
                        setSlideIndex(startOffset);
                        setTimeout(() => {
                            trackRef.current.style.transition = 'transform 0.5s ease-in-out';
                            setIsTransitioning(false);
                        }, 50);
                    }, 500);
                }
                // If we're at the start clones, jump to the real end
                else if (slideIndex <= startOffset - 1) {
                    setTimeout(() => {
                        setIsTransitioning(true);
                        trackRef.current.style.transition = 'none';
                        setSlideIndex(totalCards + startOffset - 1);
                        setTimeout(() => {
                            trackRef.current.style.transition = 'transform 0.5s ease-in-out';
                            setIsTransitioning(false);
                        }, 50);
                    }, 500);
                }
            }
        }
    }

    const showSlides = (direction) => {
        if (isTransitioning) return;
        
        const newIndex = slideIndex + direction;
        setSlideIndex(newIndex);
    }

    const handleIndicatorClick = (targetOriginalIndex) => {
        if (isTransitioning) return;
        
        // Calculate which slideIndex would put the clicked slide in focus
        let targetSlideIndex;
        
        if (slidesPerView === 1) {
            targetSlideIndex = targetOriginalIndex + startOffset;
        } else if (slidesPerView === 2) {
            targetSlideIndex = targetOriginalIndex + startOffset;
        } else {
            // For 3 slides, to focus on slide X, we need slideIndex = X - 1 + startOffset
            targetSlideIndex = targetOriginalIndex + startOffset - 1;
        }
        
        setSlideIndex(targetSlideIndex);
    }

    useEffect(() => {
        const handleResize = () => {
            const newSlidesPerView = getSlidesPerView();
            setSlidesPerView(newSlidesPerView);
            updateSlidesWidth();
            updatePosition();
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    // Intersection Observer to detect when carousel is in view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
                // Auto-focus when in view so keyboard navigation works
                if (entry.isIntersecting && carouselRef.current) {
                    carouselRef.current.focus();
                }
            },
            {
                threshold: 0.3, // Trigger when 30% of carousel is visible
                rootMargin: '0px 0px -100px 0px' // Adjust this to fine-tune when it activates
            }
        );

        if (carouselRef.current) {
            observer.observe(carouselRef.current);
        }

        return () => {
            if (carouselRef.current) {
                observer.unobserve(carouselRef.current);
            }
        };
    }, [])

    useEffect(()=>{
        const timer = setTimeout(() => {
            setSlidesPerView(getSlidesPerView());
            updateSlidesWidth();
            // Initialize to show the first real slide
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
            // Only respond to arrow keys if carousel is in view
            if (!isInView) return;
            
            if (e.key === 'ArrowRight') {
                e.preventDefault(); // Prevent page scroll
                showSlides(1);
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault(); // Prevent page scroll
                showSlides(-1);
            }
        };

        // Add event listener to document so it works globally when carousel is in view
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [slideIndex, isTransitioning, isInView])

    const focusedSlideIndex = getFocusedSlideIndex();

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
                // Calculate if this slide is the focused one
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