gsap.registerPlugin(ScrollTrigger);
const mm = gsap.matchMedia();

mm.add(
  {
    isDesktop: "(min-width: 768px)",
    isMobile: "(max-width: 767px)",
  },
  (ctx) => {
    const { isDesktop } = ctx.conditions;

    // set initial transforms so first frame is stable
    gsap.set(".logo-container", {
      scale: 1,
      yPercent: 0,
      transformOrigin: "50% 50%",
    });
    gsap.set(".foreground-group, .hill-group, .sky-img", {
      scale: 1,
      xPercent: 0,
      yPercent: 0,
    });

    // timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: () =>
          `+=${document.querySelector(".hero-section").clientHeight * 2}`, // dynamic end
        scrub: 1.0, // smooth but responsive — tweak 0.6 → 1.6
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // desktop vs mobile values
    if (isDesktop) {
      tl.to(
        ".logo-container",
        { scale: 1.5, yPercent: -30, ease: "power2.out" },
        0
      );
      tl.to(
        ".foreground-group",
        { scale: 1.3, xPercent: 5, yPercent: 10, ease: "power2.out" },
        0
      );
      tl.to(
        ".logo-container",
        {
          "--glowOuter": 0,
          "--glowInner": 0,
          ease: "power2.out",
          duration: 0.4,
        },
        0.3 // start fading when the logo starts moving up
      );
    } else {
      tl.to(
        ".logo-container",
        {
          "--glowOuter": 0,
          "--glowInner": 0,
          ease: "power2.out",
          duration: 0.4,
        },
        0.3 // start fading when the logo starts moving up
      );

      tl.to(
        ".logo-container",
        { scale: 1.18, yPercent: -5, ease: "power2.out" },
        0
      );
      tl.to(
        ".foreground-group",
        { scale: 1.08, xPercent: 2, yPercent: 8, ease: "power2.out" },
        0
      );
    }

    tl.to(
      ".hill-group",
      { scale: 1.25, xPercent: -5, yPercent: 10, ease: "power2.out" },
      0
    );

    // ensure the sky has a class .sky-img in the markup, animate scale gently
    tl.to(".sky-img", { scale: 1.5, ease: "none" }, 0);

    // optional: reduce tick rate if you have many animations (less CPU)
    // gsap.ticker.fps(60); // default is typically fine — only change if necessary
  }
); // mm.add end
