// script.js
gsap.registerPlugin(ScrollTrigger);
const mm = gsap.matchMedia();

mm.add(
  {
    isDesktop: "(min-width: 768px)",
    isMobile: "(max-width: 767px)",
  },
  (ctx) => {
    const { isDesktop } = ctx.conditions;

    // Set stable initial state
    gsap.set(".logo-container", {
      scale: 1,
      yPercent: 0,
      transformOrigin: "50% 50%",
    });

    // Use bottom-centre origin for depth/zoom feeling
    gsap.set(".foreground-group, .hill-group, .sky-img", {
      scale: 1,
      xPercent: 0,
      yPercent: 0,
      transformOrigin: "50% 70%",
      willChange: "transform",
    });

    // Base timeline used for the hero-section scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: () => `+=${document.querySelector(".hero-section").clientHeight * 2}`,
        scrub: 1.0,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    if (isDesktop) {
      // Desktop — focus on vertical zoom with minimal horizontal shift
      tl.to(
        ".logo-container",
        { scale: 1.5, yPercent: '-50vh', ease: "power2.out", overwrite: "auto" },
        0
      );

      tl.to(
        ".foreground-group",
        {
          scale: 1.9,     // gentle but noticeable zoom
          xPercent:10,    // tiny horizontal nudge only
          y: "35vh",      // vertical movement in viewport units
          ease: "power2.out",
          overwrite: "auto",
        },
        0
      );

      // Hills tuned for desktop (subtle, to support depth)
      tl.to(
        ".hill-group",
        {
          scale: 1.28,
          xPercent: -15,
          yPercent:60 ,      // small upward shift
          ease: "power2.out",
          overwrite: "auto",
        },
        0
      );

      // gentle sky scale (background)
      tl.to(".sky-img", { scale: 1.5, ease: "none", overwrite: "auto" }, 0);

      // logo glow fade (timed slightly later)
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
    } else {
      // Mobile — stronger foreground zoom but keep horizontal minimal
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
          scale: 2,        // stronger zoom on mobile
          xPercent: 15,     // keep horizontal movement very small
          y: "25vh",      // move up (negative moves up)
          ease: "power2.out",
          overwrite: "auto",
        },
        0
      );

      // Hills tuned for mobile (different sign if you want them to move in opposite direction)
      tl.to(
        ".hill-group",
        {
          scale: 1.18,
          xPercent: -15,
          y: "20vh",    // mobile hill vertical offset — keeps depth consistent
          ease: "power2.out",
          overwrite: "auto",
        },
        0
      );

      // sky background for mobile
      tl.to(".sky-img", { scale: 1.5, ease: "none", overwrite: "auto" }, 0);
    }

    // end mm.add callback
  }
);
