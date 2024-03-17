// const urlParams = request.getParameter("")
var carousels= document.querySelectorAll(`.carousel`)
carousels.forEach((carousel,index) => {
  const prevButton = document.querySelector(`.prev-button${index}`)
  const nextButton = document.querySelector(`.next-button${index}`)
  // const CAROUSEL_LENGTH =document.querySelectorAll(".cell").length-1;
  const CAROUSEL_LENGTH =carousel.dataset.id-1;
  let current = 0;
  console.log(carousel.dataset.id)
  const nextEvent = () => {

    if (current !== CAROUSEL_LENGTH) {
      carousel.style.transform = `translateX(${(current + 1) * -350}px)`;
      current++;
    } else {
      current = 0;
      carousel.style.transform = `translateX(0px)`;
    }
  };
  
  const prevEvent = () => {
    if (current !== 0) {
      current--;
      carousel.style.transform = `translateX(${current * -350}px)`;
    } else {
      current = CAROUSEL_LENGTH;
      carousel.style.transform = `translateX(${CAROUSEL_LENGTH * -350}px)`;
    }
  };
  nextButton.addEventListener("click", nextEvent);
  prevButton.addEventListener("click", prevEvent);
  
})

// const nextEvent = () => {
//   if (current !== CAROUSEL_LENGTH) {
//     carousel.style.transform = `translateX(${(current + 1) * -400}px)`;
//     current++;
//   } else {
//     current = 0;
//     carousel.style.transform = `translateX(0px)`;
//   }
// };

// const prevEvent = () => {
//   if (current !== 0) {
//     current--;
//     carousel.style.transform = `translateX(${current * -400}px)`;
//   } else {
//     current = CAROUSEL_LENGTH;
//     carousel.style.transform = `translateX(${CAROUSEL_LENGTH * -400}px)`;
//   }
// };
// nextButton.addEventListener("click", nextEvent);
// prevButton.addEventListener("click", prevEvent);
