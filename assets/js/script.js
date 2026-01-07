'use strict';

/**
 * Typewriting Effect for the Paragraph
 */
document.addEventListener("DOMContentLoaded", () => {
  const heroText = document.querySelector(".hero-text"); // Select the hero-text element
  const text = "Explore on the world's best & largest NFT marketplace"; // The text to animate
  let index = 0; // Start at the first character

  

  // Ensure the element exists
  if (heroText) {
    function typeWriterEffect() {
      if (index < text.length) {
        heroText.textContent += text.charAt(index); // Add one letter at a time
        index++;
        setTimeout(typeWriterEffect, 100); // Typing speed (100ms per letter)
      } else {
        setTimeout(() => {
          heroText.textContent = ""; // Clear the text after typing is complete
          index = 0; // Reset index
          typeWriterEffect(); // Restart typing animation
        }, 2000); // Pause before restarting (2 seconds)
      }
    }

    typeWriterEffect(); // Start the typing effect
  } else {
    console.error('Element with class "hero-text" not found.');
  }
});

/**
 * NAVBAR TOGGLE FOR MOBILE
 */

const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");

navToggler.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});



/**
 * HEADER & BACK TOP BTN
 * header and back top btn visible when window scroll down to 200px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElementOnScroll = function () {
  if (window.scrollY > 200) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

window.addEventListener("scroll", activeElementOnScroll);



/**
 * SLIDER
 */

const sliders = document.querySelectorAll("[data-slider]");

const sliderInit = function (currentSlider) {

  const sliderContainer = currentSlider.querySelector("[data-slider-container]");
  const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
  const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

  const totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue("--slider-item"));
  const totalSliderItems = sliderContainer.childElementCount - totalSliderVisibleItems;

  let currentSlidePos = 0;

  

  const moveSliderItem = function () {
    sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
  }

  /**
   * NEXT SLIDE
   */
  const slideNext = function () {
    const slideEnd = currentSlidePos >= totalSliderItems;

    if (slideEnd) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }

    moveSliderItem();
  }

  sliderNextBtn.addEventListener("click", slideNext);

  /**
   * PREVIOUS SLIDE
   */
  const slidePrev = function () {
    if (currentSlidePos <= 0) {
      currentSlidePos = totalSliderItems;
    } else {
      currentSlidePos--;
    }

    moveSliderItem();
  }

  sliderPrevBtn.addEventListener("click", slidePrev);

  const dontHaveExtraItem = totalSliderItems <= 0;
  if (dontHaveExtraItem) {
    sliderNextBtn.setAttribute("disabled", "");
    sliderPrevBtn.setAttribute("disabled", "");
  }

  /**
   * AUTO SLIDE
   */

  let autoSlideInterval;

  const startAutoSlide = () => autoSlideInterval = setInterval(slideNext, 3000);
  startAutoSlide();
  const stopAutoSlide = () => clearInterval(autoSlideInterval);

  currentSlider.addEventListener("mouseover", stopAutoSlide);

  currentSlider.addEventListener("mouseout", startAutoSlide);

  /**
   * RESPONSIVE
   */

  window.addEventListener("resize", moveSliderItem);

}

for (let i = 0, len = sliders.length; i < len; i++) { sliderInit(sliders[i]); }



/**
 * ACCORDION
 */

const accordions = document.querySelectorAll("[data-accordion]");

let lastActiveAccordion;

const accordionInit = function (currentAccordion) {

  const accordionBtn = currentAccordion.querySelector("[data-accordion-btn]");

  accordionBtn.addEventListener("click", function () {

    if (currentAccordion.classList.contains("active")) {
      currentAccordion.classList.toggle("active");
    } else {
      if (lastActiveAccordion) lastActiveAccordion.classList.remove("active");
      currentAccordion.classList.add("active");
    }

    lastActiveAccordion = currentAccordion;

  });

}

for (let i = 0, len = accordions.length; i < len; i++) { accordionInit(accordions[i]); }