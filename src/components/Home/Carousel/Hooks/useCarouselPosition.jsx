import { useRef, useEffect } from 'react';

export const useCarouselPosition = (slideIndex, isTransitioning, setIsTransitioning, setSlideIndex, carouselCards, startOffset, slidesPerView) => {
  const trackRef = useRef(null)
  const slideWidth = useRef(0)

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
      // const translateX = -slideWidth.current * slideIndex;
      const halfSlideOffset = slidesPerView === 5 ? slideWidth.current * 0.5 : 0;
    const translateX = -slideWidth.current * slideIndex - halfSlideOffset;
    trackRef.current.style.transform = `translateX(${translateX}px)`;
      
      if (!isTransitioning) {
        const totalCards = carouselCards.length;
        
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

  return { trackRef, slideWidth, updateSlidesWidth, updatePosition };
};