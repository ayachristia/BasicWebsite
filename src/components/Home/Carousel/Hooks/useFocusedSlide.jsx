export const useFocusedSlide = (slideIndex, startOffset, carouselCards, slidesPerView) => {
  
  const getFocusedSlideIndex = () => {
    let actualIndex = slideIndex - startOffset;
    
    while (actualIndex < 0) actualIndex += carouselCards.length;
    while (actualIndex >= carouselCards.length) actualIndex -= carouselCards.length;
    
    if (slidesPerView === 1) {
      return actualIndex;
    } else if (slidesPerView === 2) {
      return actualIndex;
    } else if (slidesPerView === 3) {
      let focusedIndex = actualIndex + 1; // For 3 slides, middle is position 1
      while (focusedIndex >= carouselCards.length) focusedIndex -= carouselCards.length;
      return focusedIndex;
    } else {
      let focusedIndex = actualIndex + 2; // For 5 slides, middle is position 2
      while (focusedIndex >= carouselCards.length) focusedIndex -= carouselCards.length;
      return focusedIndex;
    }
  }

  return getFocusedSlideIndex();
};