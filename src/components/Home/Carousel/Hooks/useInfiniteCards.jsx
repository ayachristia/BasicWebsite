export const useInfiniteCards = (carouselCards, slidesPerView) => {

    //creates clones depending on how many slides in view left and right
  const createInfiniteCards = () => {
    // const totalCards = carouselCards.length;
    const clonesNeeded = slidesPerView;
    
    const startClones = carouselCards.slice(-clonesNeeded);
    const endClones = carouselCards.slice(0, clonesNeeded);
    
    return [...startClones, ...carouselCards, ...endClones];
  }

  //puts created clones into variable
  const infiniteCards = createInfiniteCards();
  const startOffset = slidesPerView;

  return { infiniteCards, startOffset };
};