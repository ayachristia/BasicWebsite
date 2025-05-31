import { useState, useEffect } from 'react';

export const useResponsiveSlides = () => {

    //slides per view for screensizes
  const getSlidesPerView = () => {
    if(window.innerWidth <= 768) return 1;
    if(window.innerWidth <= 1024) return 2;
    if(window.innerWidth <= 1400) return 3;
    return 5;
  }

  //setting slides per view initaly
  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView())

  //function that creates currentSlidesPerView and sets it on the slidesPerView variable
  useEffect(() => {
    const handleResize = () => {
      const currentSlidesPerView = getSlidesPerView();
      setSlidesPerView(currentSlidesPerView);
    }

    //event on window size that adds the current view from above
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  return { slidesPerView, getSlidesPerView };
};
