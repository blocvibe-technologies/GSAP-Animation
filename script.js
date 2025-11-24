// script.js
gsap.registerPlugin(ScrollTrigger);
const mm = gsap.matchMedia();

mm.add(
  {
    // desktop >= 1024px
    isDesktop: "(min-width: 1024px)",
    // tablet: 768px — 1023px
    isTablet: "(min-width: 768px) and (max-width: 1023px)",
    // mobile <= 767px
    isMobile: "(max-width: 767px)",
  },
  (ctx) => {
    const { isDesktop, isTablet } = ctx.conditions;

    // Stable initial state for logo
    gsap.set(".logo-container", {
      scale: 1,
      y: 0,
      transformOrigin: "50% 50%",
      willChange: "transform, opacity",
    });
    gsap.set(".logo-container", {
      css: {
        "--glowInnerLogo": 1,
        "--glowOuterSpread": 0.15,
        "--glowBlur": "28px",
      },
    });

    // Base states for other layers
    gsap.set(".foreground-group, .hill-group, .sky-img", {
      scale: 1,
      xPercent: 0,
      yPercent: 0,
      transformOrigin: "50% 70%",
      willChange: "transform",
    });

    const hero = document.querySelector(".hero-section");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: () => `+=${hero.clientHeight * 2}`,
        scrub: 1.0,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    if (isDesktop) {
      // Desktop — subtle, large viewport movement
      tl.to(
        ".logo-container",
        {
          scale: 1.5,
          yPercent: -10,
          ease: "power2.out",
          overwrite: "auto",
        },
        0
      );

      tl.to(
        ".foreground-group",
        {
          scale: 1.9,
          xPercent: 10,
          y: "30vh",
          ease: "power2.out",
          overwrite: "auto",
        },
        0
      );

      tl.to(
        ".hill-group",
        {
          scale: 2,
          xPercent: -8,
          yPercent: 60,
          ease: "power2.out",
          overwrite: "auto",
        },
        0
      );

      tl.to(".sky-img", { scale: 1.5, ease: "none", overwrite: "auto" }, 0);

      tl.to(
        ".logo-container",
        {
          "--glowOuter": 0,
          "--glowInner": 0,
          ease: "power2.out",
          duration: 0.4,
          overwrite: "auto",
        },
        0.3
      );
    } else if (isTablet) {
      // Tablet — between desktop and mobile: stronger than desktop but gentler than mobile
      tl.to(
        ".logo-container",
        {
          scale: 1.8,
          y: "-35vh", // use viewport units for tablet vertical move
          ease: "power2.out",
          overwrite: "auto",
        },
        0
      );

      tl.to(
        ".foreground-group",
        {
          scale: 1.85,
          xPercent: 12,
          y: "28vh",
          ease: "power2.out",
          overwrite: "auto",
        },
        0
      );

      tl.to(
        ".hill-group",
        {
          scale: 1.6,
          xPercent: -12,
          yPercent: 50,
          ease: "power2.out",
          overwrite: "auto",
        },
        0
      );

      tl.to(".sky-img", { scale: 1.5, ease: "none", overwrite: "auto" }, 0);

      // fade logo glow a bit later
      tl.to(
        ".logo-container",
        {
          "--glowOuter": 0,
          "--glowInner": 0,
          ease: "power2.out",
          duration: 0.35,
          overwrite: "auto",
        },
        0.28
      );
    } else {
      // Mobile — strongest foreground zoom, percent-based logo translation is fine
      tl.to(
        ".logo-container",
        {
          "--glowOuter": 0,
          "--glowInner": 0,
          ease: "power2.out",
          duration: 0.4,
          overwrite: "auto",
        },
        0.3
      );

      tl.to(
        ".logo-container",
        { scale: 2, yPercent: -50, ease: "power2.out", overwrite: "auto" },
        0
      );

      tl.to(
        ".foreground-group",
        {
          scale: 2,
          xPercent: 15,
          y: "25vh",
          ease: "power2.out",
          overwrite: "auto",
        },
        0
      );

      tl.to(
        ".hill-group",
        {
          scale: 1.18,
          xPercent: -15,
          y: "20vh",
          ease: "power2.out",
          overwrite: "auto",
        },
        0
      );

      tl.to(".sky-img", { scale: 1.5, ease: "none", overwrite: "auto" }, 0);
    }
    // end mm.add callback
  }
);
