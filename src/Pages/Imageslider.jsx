import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Flip from "gsap/Flip";
import CustomEase from "gsap/CustomEase";
import "../../public/CSS/style.css";
import logo from "../../public/fav-icon.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// Register GSAP plugins (if not already globally registered)
gsap.registerPlugin(Flip, CustomEase);

const ImageGallerySlider = () => {
  const [currentMode, setCurrentMode] = useState("grid");
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeIndex, setActiveIndex] = useState(4);
  const [previousIndex, setPreviousIndex] = useState(4);
  const [slideDirection, setSlideDirection] = useState("right");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const preloaderRef = useRef(null);
  const preloaderCounterRef = useRef(null);
  const gridRef = useRef(null);
  const gridContainerRef = useRef(null);
  const sliderImageRef = useRef(null);
  const sliderImageNextRef = useRef(null);
  const sliderImageBgRef = useRef(null);
  const transitionOverlayRef = useRef(null);
  const contentRef = useRef(null);
  const contentTitleRef = useRef(null);
  const contentParagraphRef = useRef(null);
  const thumbnailsRef = useRef([]);
  const switchContainerRef = useRef(null);

  const imageUrls = [
    "/images/slider/im-28.jpg",
    "/images/slider/img-2222.jpg",
    "/images/slider/img-23.jpg",
    "/images/slider/img-17.jpg",
    "/images/slider/img-11.jpg",
    "/images/slider/img-51.jpg",
    "/images/slider/img-1.jpg",
    "/images/slider/img-2.jpg",
    "/images/slider/img-3.jpg",
    "/images/slider/img-14.jpg",
    "/images/slider/img-70.jpg",
    "/images/slider/img-22.jpg",
    "/images/slider/img-24.jpg",
    "/images/slider/img-30.jpg",
    "/images/slider/img-33.jpg",
    "/images/slider/img-34.jpg",
    "/images/slider/img-46.jpg",
    "/images/slider/img-57.jpg",
    "/images/slider/img-71.jpg",
    "/images/slider/img-60.jpg",
    "/images/slider/img-63.jpg",
    "/images/slider/img-69.jpg",
  ];

  const slideContent = [
    {
      title: "FASHION LIFESTYLE",
      paragraph:
        "Fashion is not just about what you wear; its a reflection of your soul, your passions, and your story.",
    },
    {
      title: "REDIFINING ELEGANCE",
      paragraph:
        "As a professional model, fashion for me is more than an industry — it's an art form, a voice, and a vision.",
    },
    {
      title: "CONFIDENCE MEETS COULTURE",
      paragraph:
        "In the world of high fashion, confidence is the ultimate accessory. As a model, I believe that true couture is not just about luxurious fabrics or intricate designs",
    },
    {
      title: "DEFINING BEAUTY BEYOND BOUNDARIES",
      paragraph:
        "In the world of high fashion, confidence is the ultimate accessory. As a model, I believe that true couture is not just about luxurious fabrics or intricate designs",
    },
    {
      title: "BOLD DREAMS,BEAUTIFUL REALITIES",
      paragraph:
        "In the world of high fashion, confidence is the ultimate accessory. As a model, I believe that true couture is not just about luxurious fabrics or intricate designs",
    },
    {
      title: "WHERE VISION MEETS VOGUE",
      paragraph:
        "In the world of high fashion, confidence is the ultimate accessory. As a model, I believe that true couture is not just about luxurious fabrics or intricate designs",
    },
  ];

  const TIMING = {
    BASE: 0.512,
    SHORTEST: 0.256,
    SHORT: 0.384,
    LONG: 0.768,
    LONGEST: 1.024,
    STAGGER_TINY: 0.032,
    STAGGER_SMALL: 0.064,
    STAGGER_MED: 0.128,
    PAUSE: 1.536,
  };

  useEffect(() => {
    let count = 0;
    const targetCount = 3;
    const duration = 2048;
    const increment = Math.ceil(targetCount / (duration / 128)); // Adjust increment based on target count
    const interval = 128;

    const counterInterval = setInterval(() => {
      count += increment;

      if (count <= targetCount) {
        if (preloaderCounterRef.current) {
          preloaderCounterRef.current.textContent = count;
        }
      } else {
        if (preloaderCounterRef.current) {
          preloaderCounterRef.current.textContent = targetCount;
        }
        clearInterval(counterInterval);

        setTimeout(() => {
          if (preloaderRef.current) {
            preloaderRef.current.classList.add("preloader-hidden");
          }
          setTimeout(() => {
            initApp();
          }, 256);
        }, 256);
      }
    }, interval);

    return () => clearInterval(counterInterval); // Cleanup on unmount
  }, []);

  const initApp = () => {
    if (
      typeof gsap === "undefined" ||
      typeof Flip === "undefined" ||
      typeof CustomEase === "undefined"
    ) {
      console.error("GSAP or Flip plugin not loaded");
      return;
    }

    CustomEase.create("mainEase", "M0,0 C0.65,0.05 0.36,1 1,1");
    CustomEase.create("sideEase", "M0,0 C0.86,0 0.07,1 1,1");
    CustomEase.create("natural", "M0,0 C0.34,0.01 0.2,1 1,1");
    CustomEase.create("naturalOut", "M0,0 C0.43,0.13 0.23,0.96 1,1");
    CustomEase.create("cinematic", "M0,0 C0.645,0.045 0.355,1 1,1");

    // Initial setup if needed, like setting initial content
    updateContent(activeIndex);
    if (thumbnailsRef.current[activeIndex]) {
      thumbnailsRef.current[activeIndex].classList.add("active");
    }
  };

  const getGridItemByIndex = (index) => {
    if (gridRef.current) {
      return gridRef.current.querySelector(`.grid-item[data-index="${index}"]`);
    }
    return null;
  };

  const updateContent = (index) => {
    const content = slideContent[index];
    if (contentTitleRef.current && contentParagraphRef.current) {
      contentTitleRef.current.textContent = content.title;
      contentParagraphRef.current.textContent = content.paragraph;
    }
  };

  const toggleView = (mode) => {
    if (isAnimating || currentMode === mode) return;
    setIsAnimating(true);
    setCurrentMode(mode);

    if (switchContainerRef.current) {
      const currentButton = switchContainerRef.current.querySelector(
        ".switch-button-current"
      );
      const newButton = switchContainerRef.current.querySelector(
        `.switch-button-${mode}`
      );
      if (currentButton)
        currentButton.classList.remove("switch-button-current");
      if (newButton) newButton.classList.add("switch-button-current");
    }

    if (mode === "slider") {
      showSliderView().then(() => setIsAnimating(false));
    } else {
      showGridView().then(() => setIsAnimating(false));
    }
  };

  const showSliderView = () => {
    return new Promise((resolve) => {
      const activeItem = getGridItemByIndex(activeIndex);
      if (
        !activeItem ||
        !sliderImageRef.current ||
        !sliderImageBgRef.current ||
        !contentRef.current
      ) {
        resolve();
        return;
      }
      const activeItemRect = activeItem.getBoundingClientRect();

      sliderImageRef.current.style.backgroundImage = `url(${imageUrls[activeIndex]})`;
      sliderImageBgRef.current.style.backgroundImage = `url(${imageUrls[activeIndex]})`;
      if (sliderImageNextRef.current) {
        sliderImageNextRef.current.style.backgroundImage = `url(${imageUrls[activeIndex]})`;
      }

      sliderImageRef.current.style.backgroundSize = "cover";
      sliderImageRef.current.style.backgroundPosition = "center";
      sliderImageBgRef.current.style.backgroundSize = "cover";
      sliderImageBgRef.current.style.backgroundPosition = "center";
      if (sliderImageNextRef.current) {
        sliderImageNextRef.current.style.backgroundSize = "cover";
        sliderImageNextRef.current.style.backgroundPosition = "center";
      }

      updateContent(activeIndex);

      gsap.set(sliderImageRef.current, {
        width: activeItemRect.width,
        height: activeItemRect.height,
        x: activeItemRect.left,
        y: activeItemRect.top,
        opacity: 1,
        visibility: "visible",
      });

      const heightState = Flip.getState(sliderImageRef.current);

      gsap.set(sliderImageRef.current, {
        height: "100vh",
        y: 0,
        width: activeItemRect.width,
        x: activeItemRect.left,
      });

      Flip.from(heightState, {
        duration: TIMING.BASE,
        ease: "mainEase",
        onComplete: () => {
          const widthState = Flip.getState(sliderImageRef.current);

          gsap.set(sliderImageRef.current, {
            width: "100vw",
            x: 0,
          });

          Flip.from(widthState, {
            duration: TIMING.BASE,
            ease: "mainEase",
            onComplete: () => {
              if (gridRef.current) {
                gsap.to(gridRef.current, {
                  opacity: 0,
                  duration: TIMING.SHORTEST,
                  ease: "power2.inOut",
                });
              }

              const contentTl = gsap.timeline({
                onComplete: resolve,
              });

              contentTl.to(
                contentRef.current,
                {
                  opacity: 1,
                  duration: TIMING.SHORT,
                  ease: "mainEase",
                },
                0
              );

              contentTl.to(
                contentTitleRef.current,
                {
                  y: 0,
                  duration: TIMING.BASE,
                  ease: "sideEase",
                },
                TIMING.STAGGER_TINY
              );

              contentTl.to(
                contentParagraphRef.current,
                {
                  opacity: 1,
                  duration: TIMING.BASE,
                  ease: "mainEase",
                },
                TIMING.STAGGER_SMALL
              );

              thumbnailsRef.current.forEach((thumb, index) => {
                contentTl.to(
                  thumb,
                  {
                    opacity: 1,
                    y: 0,
                    duration: TIMING.SHORT,
                    ease: "sideEase",
                  },
                  TIMING.STAGGER_MED + index * TIMING.STAGGER_TINY
                );
              });
            },
          });
        },
      });
    });
  };

  const showGridView = () => {
    return new Promise((resolve) => {
      const activeItem = getGridItemByIndex(activeIndex);
      if (
        !activeItem ||
        !sliderImageRef.current ||
        !sliderImageNextRef.current ||
        !sliderImageBgRef.current ||
        !transitionOverlayRef.current ||
        !contentRef.current
      ) {
        resolve();
        return;
      }
      const activeItemRect = activeItem.getBoundingClientRect();

      const contentTl = gsap.timeline({
        onComplete: () => {
          if (gridRef.current) {
            gsap.to(gridRef.current, {
              opacity: 1,
              duration: TIMING.SHORTEST,
              ease: "power2.inOut",
            });
          }

          gsap.set(
            [
              sliderImageNextRef.current,
              sliderImageBgRef.current,
              transitionOverlayRef.current,
            ],
            {
              opacity: 0,
              visibility: "hidden",
            }
          );

          const widthState = Flip.getState(sliderImageRef.current);

          gsap.set(sliderImageRef.current, {
            width: activeItemRect.width,
            x: activeItemRect.left,
            height: "100vh",
            y: 0,
          });

          Flip.from(widthState, {
            duration: TIMING.BASE,
            ease: "mainEase",
            onComplete: () => {
              const heightState = Flip.getState(sliderImageRef.current);

              gsap.set(sliderImageRef.current, {
                height: activeItemRect.height,
                y: activeItemRect.top,
              });

              Flip.from(heightState, {
                duration: TIMING.BASE,
                ease: "mainEase",
                onComplete: () => {
                  gsap.to(sliderImageRef.current, {
                    opacity: 0,
                    duration: TIMING.SHORTEST,
                    ease: "power2.inOut",
                    onComplete: () => {
                      if (sliderImageRef.current) {
                        sliderImageRef.current.style.visibility = "hidden";
                      }
                      resolve();
                    },
                  });
                },
              });
            },
          });
        },
      });

      thumbnailsRef.current.forEach((thumb, index) => {
        contentTl.to(
          thumb,
          {
            opacity: 0,
            y: 20,
            duration: TIMING.SHORT,
            ease: "sideEase",
          },
          index * TIMING.STAGGER_TINY
        );
      });

      contentTl.to(
        contentParagraphRef.current,
        {
          opacity: 0,
          duration: TIMING.SHORT,
          ease: "mainEase",
        },
        TIMING.STAGGER_TINY
      );

      contentTl.to(
        contentTitleRef.current,
        {
          y: "100%",
          duration: TIMING.SHORT,
          ease: "sideEase",
        },
        TIMING.STAGGER_SMALL
      );

      contentTl.to(
        contentRef.current,
        {
          opacity: 0,
          duration: TIMING.SHORT,
          ease: "mainEase",
        },
        TIMING.STAGGER_MED
      );
    });
  };

  const transitionToSlide = (index) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setSlideDirection(index > activeIndex ? "right" : "left");
    setPreviousIndex(activeIndex);
    setActiveIndex(index);

    if (thumbnailsRef.current[activeIndex]) {
      thumbnailsRef.current[activeIndex].classList.remove("active");
    }
    if (thumbnailsRef.current[index]) {
      thumbnailsRef.current[index].classList.add("active");
    }

    const newImageUrl = imageUrls[index];

    if (sliderImageNextRef.current) {
      sliderImageNextRef.current.style.backgroundImage = `url(${newImageUrl})`;
    }
    if (sliderImageBgRef.current) {
      sliderImageBgRef.current.style.backgroundImage = `url(${newImageUrl})`;
    }

    if (sliderImageRef.current) {
      sliderImageRef.current.style.backgroundSize = "cover";
      sliderImageRef.current.style.backgroundPosition = "center";
    }
    if (sliderImageBgRef.current) {
      sliderImageBgRef.current.style.backgroundSize = "cover";
      sliderImageBgRef.current.style.backgroundPosition = "center";
    }
    if (sliderImageNextRef.current) {
      sliderImageNextRef.current.style.backgroundSize = "cover";
      sliderImageNextRef.current.style.backgroundPosition = "center";
      sliderImageNextRef.current.style.visibility = "visible"; // Ensure next image is visible
    }

    gsap.set(
      [
        sliderImageNextRef.current,
        sliderImageBgRef.current,
        transitionOverlayRef.current,
      ],
      {
        visibility: "visible",
        opacity: 0,
      }
    );

    const xOffset = slideDirection === "right" ? "100%" : "-100%";
    const overlayStartColor =
      slideDirection === "right" ? "rgba(0,0,0,0)" : "rgba(0,0,0,0)";
    const overlayEndColor =
      slideDirection === "right" ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.8)";

    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
        updateContent(index);
        gsap.set(sliderImageRef.current, {
          backgroundImage: `url(${newImageUrl})`,
          x: 0, // Reset position of the current image
        });
        gsap.set(sliderImageNextRef.current, {
          x: xOffset,
          opacity: 0,
          visibility: "hidden",
        }); // Reset next image
      },
    });

    tl.to(
      transitionOverlayRef.current,
      {
        opacity: 1,
        duration: TIMING.SHORT,
        background: `linear-gradient(to right, ${overlayStartColor}, ${overlayEndColor})`,
        ease: "none",
      },
      0
    );

    tl.to(
      sliderImageRef.current,
      {
        x: xOffset,
        duration: TIMING.BASE,
        ease: "naturalOut",
      },
      0
    );

    tl.to(
      sliderImageBgRef.current,
      {
        x: "0%",
        duration: TIMING.LONGEST,
        ease: "cinematic",
      },
      0
    );

    tl.fromTo(
      sliderImageNextRef.current,
      {
        x: -xOffset,
        opacity: 1, // Make sure next image is visible during transition
      },
      {
        x: "0%",
        opacity: 1,
        duration: TIMING.BASE,
        ease: "naturalOut",
      },
      0
    );

    tl.to(
      transitionOverlayRef.current,
      {
        opacity: 0,
        duration: TIMING.SHORT,
        ease: "none",
      },
      TIMING.BASE
    );
  };

  return (
    <div className="wrapper">
      <div className="preloader" ref={preloaderRef}>
        <img src={logo} alt="" />
        <div className="preloader-counter" ref={preloaderCounterRef}>
          0
        </div>
      </div>

      <div className="container-fluid px-0 px-md-5">
      <div className="row">
          <div className="col-lg-12 text-center text-md-start">
          <h1 data-aos="fade-up" data-aos-duration="2000" class="aos-init aos-animate">"View All Model Shots in Slider Mode"</h1>
          </div>
        </div>
        <div className="container-slider-related ">
        
          <div className="grid-container" ref={gridContainerRef}>
            <div className="grid" id="grid" ref={gridRef}>
              {imageUrls.map((url, index) => (
                <div
                  key={index}
                  className="grid-item"
                  data-index={index}
                  onClick={() => {
                    if (currentMode === "slider") {
                      transitionToSlide(index);
                    }
                  }}
                >
                  <div
                    className="grid-item-img"
                    style={{ backgroundImage: `url(${url})` }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slide layers in stacking order */}
      {/* Base layer - current slide */}
      <div
        className="slider-image"
        id="slider-image"
        ref={sliderImageRef}
      ></div>
      {/* Background parallax layer */}
      <div
        className="slider-image-bg"
        id="slider-image-bg"
        ref={sliderImageBgRef}
      ></div>
      {/* Top layer - next slide */}
      <div
        className="slider-image-next"
        id="slider-image-next"
        ref={sliderImageNextRef}
      ></div>
      {/* Transition overlay */}
      <div
        className="transition-overlay"
        id="transition-overlay"
        ref={transitionOverlayRef}
      ></div>

      <div className="content" id="content" ref={contentRef}>
        <h1 className="content-title" ref={contentTitleRef}>
          <span>MONOCHROME SERIES</span>
        </h1>
        <div
          className="content-paragraph"
          id="content-paragraph"
          ref={contentParagraphRef}
        >
          Without color, we see differently. Form and texture speak louder. The
          world simplified to light and dark reveals truths that color often
          conceals. In this space between extremes, we find clarity. The
          photograph becomes a mirror reflecting not just what we see, but how
          we see.
        </div>
      </div>

      {/* desktop grid thumnail */}

      {/* <div className="thumbnails first-slider-grid" ref={(el) => (thumbnailsRef.current = el ? Array.from(el.children) : [])}>
        {imageUrls.map((url, index) => (
          <div
            key={index}
            className={`thumbnail ${index === 4 ? 'active' : ''}`}
            data-index={index}
            onClick={() => transitionToSlide(index)}
            ref={(el) => (thumbnailsRef.current[index] = el)}
          >
            <div
              className="thumbnail-img"
              style={{ backgroundImage: `url(${url})` }}
            ></div>
          </div>
        ))}
      </div> */}
      {/* for mobile desktop size thumnail */}

      <div className="wrapper second-slider-grid">
        {currentMode === "slider" && (
          <div className="mobile-thumbnails-container ">
            <Swiper
              className="mobile-thumbnail-swiper-container"
              spaceBetween={10}
              slidesPerView={"auto"}
              breakpoints={{
                0: {
                  slidesPerView: 6,
                },
                640: {
                  slidesPerView: 7,
                },
              }}
            >
              {imageUrls.map((url, index) => (
                <SwiperSlide
                  key={index}
                  className="mobile-thumbnail-swiper-slide"
                >
                  <div
                    className={`mobile-thumbnail-item ${
                      index === activeIndex ? "active" : ""
                    }`}
                    data-index={index}
                    onClick={() => transitionToSlide(index)}
                    ref={(el) => (thumbnailsRef.current[index] = el)}
                  >
                    <div
                      className="mobile-thumbnail-image"
                      style={{ backgroundImage: `url(${url})` }}
                    ></div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {currentMode !== "slider" && (
          <div
            className="desktop-thumbnails-grid"
            ref={(el) =>
              (thumbnailsRef.current = el ? Array.from(el.children) : [])
            }
          >
            {imageUrls.map((url, index) => (
              <div
                key={index}
                className={`desktop-thumbnail-grid-item ${
                  index === activeIndex ? "active" : ""
                }`}
                data-index={index}
                onClick={() => transitionToSlide(index)}
                ref={(el) => (thumbnailsRef.current[index] = el)}
              >
                <div
                  className="desktop-thumbnail-grid-image"
                  style={{ backgroundImage: `url(${url})` }}
                ></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* end mobile */}

      <div className="switch" id="switch" ref={switchContainerRef}>
        <button
          className={`switch-button switch-button-grid ${
            currentMode === "grid" ? "switch-button-current" : ""
          }`}
          onClick={() => toggleView("grid")}
        >
          <span className="indicator-dot"></span>
          GRID
        </button>
        <button
          className={`switch-button switch-button-slider ${
            currentMode === "slider" ? "switch-button-current" : ""
          }`}
          onClick={() => toggleView("slider")}
        >
          <span className="indicator-dot"></span>
          SLIDER
        </button>
      </div>
    </div>
  );
};

export default ImageGallerySlider;
