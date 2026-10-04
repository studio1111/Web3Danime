"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HERO_VIDEO_SRC = "/Web3Danime/hero.mp4";

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }
  .hero-video-layer {
    position: absolute; inset: 0; width: 100%; height: 100%;
    overflow: hidden; background: #000;
    z-index: 1; pointer-events: none;
  }
  .hero-video-layer video {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: cover; object-position: center;
  }
  .hero-video-vignette {
    position: absolute; inset: 0;
    background:
      radial-gradient(circle at center, rgba(0,0,0,.12) 0%, rgba(0,0,0,.42) 72%, rgba(0,0,0,.72) 100%),
      linear-gradient(180deg, rgba(0,0,0,.32) 0%, rgba(0,0,0,.12) 45%, rgba(0,0,0,.5) 100%);
  }
  .film-grain {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 50; opacity: 0.05; mix-blend-mode: overlay;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }
  .bg-grid-theme {
    background-size: 60px 60px;
    background-image:
      linear-gradient(to right, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px),
      linear-gradient(to bottom, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px);
    mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }
  .text-3d-matte {
    color: var(--color-foreground);
    text-shadow:
      0 10px 30px color-mix(in srgb, var(--color-foreground) 20%, transparent),
      0 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent);
  }
  .text-silver-matte {
    background: linear-gradient(180deg, var(--color-foreground) 0%, color-mix(in srgb, var(--color-foreground) 40%, transparent) 100%);
    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
    transform: translateZ(0);
    filter:
      drop-shadow(0 10px 20px color-mix(in srgb, var(--color-foreground) 15%, transparent))
      drop-shadow(0 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent));
  }
  .text-card-silver-matte {
    background: linear-gradient(180deg, #fff 0%, #a1a1aa 100%);
    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
    transform: translateZ(0);
    filter: drop-shadow(0 12px 24px rgba(0,0,0,.8)) drop-shadow(0 4px 8px rgba(0,0,0,.6));
  }
  .premium-depth-card {
    background: linear-gradient(145deg, #162c6d 0%, #0a101d 100%);
    box-shadow:
      0 40px 100px -20px rgba(0,0,0,.9),
      0 20px 40px -20px rgba(0,0,0,.8),
      inset 0 1px 2px rgba(255,255,255,.2),
      inset 0 -2px 4px rgba(0,0,0,.8);
    border: 1px solid rgba(255,255,255,.04);
    position: relative;
  }
  .card-sheen {
    position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
    background: radial-gradient(800px circle at var(--mouse-x,50%) var(--mouse-y,50%), rgba(255,255,255,.06) 0%, transparent 40%);
    mix-blend-mode: screen; transition: opacity .3s ease;
  }
  .iphone-bezel {
    background: #111;
    box-shadow:
      inset 0 0 0 2px #52525b, inset 0 0 0 7px #000,
      0 40px 80px -15px rgba(0,0,0,.9), 0 15px 25px -5px rgba(0,0,0,.7);
    transform-style: preserve-3d;
  }
  .hardware-btn {
    background: linear-gradient(90deg,#404040 0%,#171717 100%);
    box-shadow: -2px 0 5px rgba(0,0,0,.8), inset -1px 0 1px rgba(255,255,255,.15), inset 1px 0 2px rgba(0,0,0,.8);
    border-left: 1px solid rgba(255,255,255,.05);
  }
  .screen-glare { background: linear-gradient(110deg,rgba(255,255,255,.08) 0%,rgba(255,255,255,0) 45%); }
  .widget-depth {
    background: linear-gradient(180deg,rgba(255,255,255,.04) 0%,rgba(255,255,255,.01) 100%);
    box-shadow: 0 10px 20px rgba(0,0,0,.3), inset 0 1px 1px rgba(255,255,255,.05), inset 0 -1px 1px rgba(0,0,0,.5);
    border: 1px solid rgba(255,255,255,.03);
  }
  .floating-ui-badge {
    background: linear-gradient(135deg,rgba(255,255,255,.08) 0%,rgba(255,255,255,.01) 100%);
    backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
    box-shadow: 0 0 0 1px rgba(255,255,255,.1), 0 25px 50px -12px rgba(0,0,0,.8),
      inset 0 1px 1px rgba(255,255,255,.2), inset 0 -1px 1px rgba(0,0,0,.5);
  }
  .btn-modern-light,.btn-modern-dark { transition: all .4s cubic-bezier(.25,1,.5,1); }
  .btn-modern-light {
    background: linear-gradient(180deg,#fff 0%,#f1f5f9 100%); color:#0f172a;
    box-shadow: 0 0 0 1px rgba(0,0,0,.05), 0 2px 4px rgba(0,0,0,.1), 0 12px 24px -4px rgba(0,0,0,.3),
      inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,.06);
  }
  .btn-modern-light:hover { transform:translateY(-3px); }
  .btn-modern-light:active { transform:translateY(1px); background:linear-gradient(180deg,#f1f5f9,#e2e8f0); }
  .btn-modern-dark {
    background:linear-gradient(180deg,#27272a 0%,#18181b 100%); color:#fff;
    box-shadow: 0 0 0 1px rgba(255,255,255,.1), 0 2px 4px rgba(0,0,0,.6), 0 12px 24px -4px rgba(0,0,0,.9),
      inset 0 1px 1px rgba(255,255,255,.15), inset 0 -3px 6px rgba(0,0,0,.8);
  }
  .btn-modern-dark:hover { transform:translateY(-3px); background:linear-gradient(180deg,#3f3f46,#27272a); }
  .btn-modern-dark:active { transform:translateY(1px); background:#18181b; }
  .progress-ring { transform:rotate(-90deg); transform-origin:center; stroke-dasharray:402; stroke-dashoffset:402; stroke-linecap:round; }
  @media (prefers-reduced-motion: reduce) {
    .hero-video-layer video { display: none; }
  }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
}

export function CinematicHero({
  brandName = "Sobers",
  tagline1 = "Track the journey,",
  tagline2 = "not just the days.",
  cardHeading = "Accountability, redefined.",
  cardDescription = "Sobers empowers sponsors and sponsees in 12-step recovery programs with structured accountability, precise sobriety tracking, and beautiful visual timelines.",
  metricValue = 365,
  metricLabel = "Days Sober",
  ctaHeading = "Start your recovery.",
  ctaDescription = "Join thousands of others in the 12-step program and take control of your timeline today.",
  className,
  ...props
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const requestRef = useRef<number | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;
      if (requestRef.current !== null) cancelAnimationFrame(requestRef.current);

      requestRef.current = requestAnimationFrame(() => {
        const card = mainCardRef.current;
        const mockup = mockupRef.current;
        if (!card || !mockup) return;

        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);

        const xVal = (e.clientX / window.innerWidth - .5) * 2;
        const yVal = (e.clientY / window.innerHeight - .5) * 2;

        gsap.to(mockup, {
          rotationY: xVal * 12,
          rotationX: -yVal * 12,
          ease: "power3.out",
          duration: 1.2,
          overwrite: true,
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (requestRef.current !== null) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const ensurePlayback = () => {
      if (document.visibilityState === "hidden" || !video.paused) return;
      void video.play().catch(() => {
        // Browsers can delay autoplay until the media becomes ready or visible.
      });
    };

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.load();
    ensurePlayback();
    video.addEventListener("loadeddata", ensurePlayback);
    video.addEventListener("canplay", ensurePlayback);
    document.addEventListener("visibilitychange", ensurePlayback);

    return () => {
      video.removeEventListener("loadeddata", ensurePlayback);
      video.removeEventListener("canplay", ensurePlayback);
      document.removeEventListener("visibilitychange", ensurePlayback);
    };
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      gsap.set(".text-track", { autoAlpha:0, y:60, scale:.85, filter:"blur(20px)", rotationX:-20 });
      gsap.set(".text-days", { autoAlpha:1, clipPath:"inset(0 100% 0 0)" });
      gsap.set(".main-card", { y:window.innerHeight + 200, autoAlpha:1 });
      gsap.set([".card-left-text",".card-right-text",".mockup-scroll-wrapper",".floating-badge",".phone-widget"], { autoAlpha:0 });
      gsap.set(".cta-wrapper", { autoAlpha:0, scale:.8, filter:"blur(30px)" });

      const introTl = gsap.timeline({ delay:.3 });
      introTl
        .to(".text-track", { duration:1.8, autoAlpha:1, y:0, scale:1, filter:"blur(0px)", rotationX:0, ease:"expo.out" })
        .to(".text-days", { duration:1.4, clipPath:"inset(0 0% 0 0)", ease:"power4.inOut" }, "-=1");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start:"top top",
          end:"+=7000",
          pin:true,
          scrub:1,
          anticipatePin:1,
        },
      });

      const counter = { value: 0 };

      scrollTl
        .to([".hero-text-wrapper",".bg-grid-theme"], { scale:1.15, filter:"blur(20px)", opacity:.2, ease:"power2.inOut", duration:2 }, 0)
        .to(".hero-video-layer", { scale:1.15, filter:"blur(20px)", opacity:0, ease:"power2.inOut", duration:1.5 }, 1.25)
        .to(".main-card", { y:0, ease:"power3.inOut", duration:2 }, 0)
        .to(".main-card", { width:"100%", height:"100%", borderRadius:"0px", ease:"power3.inOut", duration:1.5 })
        .fromTo(".mockup-scroll-wrapper",
          { y:300, z:-500, rotationX:50, rotationY:-30, autoAlpha:0, scale:.6 },
          { y:0, z:0, rotationX:0, rotationY:0, autoAlpha:1, scale:1, ease:"expo.out", duration:2.5 },
          "-=.8"
        )
        .fromTo(".phone-widget",
          { y:40, autoAlpha:0, scale:.95 },
          { y:0, autoAlpha:1, scale:1, stagger:.15, ease:"back.out(1.2)", duration:1.5 },
          "-=1.5"
        )
        .to(".progress-ring", { strokeDashoffset:60, duration:2, ease:"power3.inOut" }, "-=1.2")
        .to(counter, {
          value: metricValue,
          duration:2,
          ease:"expo.out",
          onUpdate:() => {
            if (counterRef.current) counterRef.current.textContent = String(Math.round(counter.value));
          },
        }, "-=2")
        .fromTo(".floating-badge",
          { y:100, autoAlpha:0, scale:.7, rotationZ:-10 },
          { y:0, autoAlpha:1, scale:1, rotationZ:0, ease:"back.out(1.5)", duration:1.5, stagger:.2 },
          "-=2"
        )
        .fromTo(".card-left-text", { x:-50, autoAlpha:0 }, { x:0, autoAlpha:1, ease:"power4.out", duration:1.5 }, "-=1.5")
        .fromTo(".card-right-text", { x:50, autoAlpha:0, scale:.8 }, { x:0, autoAlpha:1, scale:1, ease:"expo.out", duration:1.5 }, "<")
        .to({}, { duration:2.5 })
        .set(".hero-text-wrapper", { autoAlpha:0 })
        .set(".cta-wrapper", { autoAlpha:1 })
        .to({}, { duration:1.5 })
        .to([".mockup-scroll-wrapper",".floating-badge",".card-left-text",".card-right-text"], {
          scale:.9, y:-40, z:-200, autoAlpha:0, ease:"power3.in", duration:1.2, stagger:.05,
        })
        .to(".main-card", {
          width:isMobile ? "92vw" : "85vw",
          height:isMobile ? "92vh" : "85vh",
          borderRadius:isMobile ? "32px" : "40px",
          ease:"expo.inOut",
          duration:1.8,
        }, "pullback")
        .to(".cta-wrapper", { scale:1, filter:"blur(0px)", ease:"expo.inOut", duration:1.8 }, "pullback")
        .to(".main-card", { y:-window.innerHeight-300, ease:"power3.in", duration:1.5 });
    }, containerRef);

    return () => ctx.revert();
  }, [metricValue]);

  return (
    <div
      ref={containerRef}
      className={cn("relative flex h-screen w-screen items-center justify-center overflow-hidden bg-background font-sans text-foreground antialiased", className)}
      style={{ perspective:"1500px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />

      <div className="hero-video-layer" aria-hidden="true">
        <video
          ref={heroVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          src={HERO_VIDEO_SRC}
        />
        <div className="hero-video-vignette" />
      </div>

      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme pointer-events-none absolute inset-0 z-0 opacity-50" aria-hidden="true" />

      <div className="hero-text-wrapper absolute z-10 flex w-screen flex-col items-center justify-center px-4 text-center">
        <h1 className="text-track gsap-reveal text-3d-matte mb-2 text-5xl font-bold tracking-tight md:text-7xl lg:text-[6rem]">{tagline1}</h1>
        <h1 className="text-days gsap-reveal text-silver-matte text-5xl font-extrabold tracking-tighter md:text-7xl lg:text-[6rem]">{tagline2}</h1>
      </div>

      <div className="cta-wrapper absolute z-10 flex w-screen flex-col items-center justify-center px-4 text-center gsap-reveal pointer-events-auto">
        <h2 className="text-silver-matte mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">{ctaHeading}</h2>
        <p className="mb-12 max-w-xl text-lg font-light leading-relaxed text-muted-foreground md:text-xl">{ctaDescription}</p>
        <div className="flex flex-col gap-6 sm:flex-row">
          <a href="#app-store" aria-label="Download on the App Store" className="btn-modern-light flex items-center justify-center gap-3 rounded-[1.25rem] px-8 py-4 group focus:outline-none focus:ring-2 focus:ring-blue-500">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-current"><path d="M16.77 12.49c-.02-2.26 1.85-3.35 1.94-3.4a4.18 4.18 0 0 0-3.3-1.79c-1.39-.15-2.74.83-3.45.83-.72 0-1.83-.81-3.01-.79a4.44 4.44 0 0 0-3.73 2.28c-1.61 2.79-.41 6.89 1.15 9.15.78 1.1 1.69 2.33 2.9 2.29 1.16-.05 1.6-.74 3-.74s1.8.74 3.01.72c1.25-.02 2.03-1.12 2.8-2.23a9.18 9.18 0 0 0 1.27-2.58 4 4 0 0 1-2.41-3.74Zm-2.26-6.67a3.98 3.98 0 0 0 .91-2.85 4.07 4.07 0 0 0-2.63 1.36 3.81 3.81 0 0 0-.94 2.75 3.36 3.36 0 0 0 2.66-1.26Z"/></svg>
            <span className="text-left"><span className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500">Download on the</span><span className="block text-xl font-bold leading-none">App Store</span></span>
          </a>
          <a href="#google-play" aria-label="Get it on Google Play" className="btn-modern-dark flex items-center justify-center gap-3 rounded-[1.25rem] px-8 py-4 group focus:outline-none focus:ring-2 focus:ring-blue-500">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6"><path fill="#34a853" d="M3 2.5v19l10.5-9.5L3 2.5Z"/><path fill="#4285f4" d="m13.5 12 3.4-3.1L20.6 11c.8.45.8 1.55 0 2l-3.7 2.1-3.4-3.1Z"/><path fill="#fbbc04" d="m3 21.5 10.5-9.5 3.4 3.1L6.1 22.8c-1.3.7-3.1-.2-3.1-1.3Z"/><path fill="#ea4335" d="M3 2.5 16.9 14.9l3.7-2.1c.8-.45.8-1.55 0-2l-3.7-2.1L6.1 1.2C4.8.5 3 .9 3 2.5Z"/></svg>
            <span className="text-left"><span className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400">Get it on</span><span className="block text-xl font-bold leading-none">Google Play</span></span>
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center" style={{ perspective:"1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative flex h-[92vh] w-[92vw] items-center justify-center overflow-hidden rounded-[32px] pointer-events-auto md:h-[85vh] md:w-[85vw] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-evenly px-4 py-6 lg:grid lg:grid-cols-3 lg:gap-8 lg:px-12 lg:py-0">
            <div className="card-right-text order-1 flex w-full justify-center lg:order-3 lg:justify-end">
              <h2 className="text-card-silver-matte text-5xl font-black uppercase tracking-tighter md:text-7xl lg:text-[8rem]">{brandName}</h2>
            </div>

            <div className="mockup-scroll-wrapper order-2 relative flex h-[380px] w-full items-center justify-center lg:order-2 lg:h-[600px]" style={{ perspective:"1000px" }}>
              <div className="relative flex h-full w-full scale-[.65] items-center justify-center md:scale-[.85] lg:scale-100">
                <div ref={mockupRef} className="iphone-bezel relative flex h-[580px] w-[280px] flex-col rounded-[3rem] will-change-transform">
                  <div className="hardware-btn absolute -left-[3px] top-[120px] z-0 h-[25px] w-[3px] rounded-l-md" aria-hidden="true" />
                  <div className="hardware-btn absolute -left-[3px] top-[160px] z-0 h-[45px] w-[3px] rounded-l-md" aria-hidden="true" />
                  <div className="hardware-btn absolute -left-[3px] top-[220px] z-0 h-[45px] w-[3px] rounded-l-md" aria-hidden="true" />
                  <div className="hardware-btn absolute -right-[3px] top-[170px] z-0 h-[70px] w-[3px] rounded-r-md" aria-hidden="true" />

                  <div className="absolute inset-[7px] z-10 overflow-hidden rounded-[2.5rem] bg-[#050914] text-white shadow-[inset_0_0_15px_rgba(0,0,0,1)]">
                    <div className="screen-glare pointer-events-none absolute inset-0 z-40" aria-hidden="true" />
                    <div className="absolute left-1/2 top-[5px] z-50 flex h-[28px] w-[100px] -translate-x-1/2 items-center justify-end rounded-full bg-black px-3 shadow-[inset_0_-1px_2px_rgba(255,255,255,.1)]">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,.8)] animate-pulse" />
                    </div>

                    <div className="relative flex h-full w-full flex-col px-5 pb-8 pt-12">
                      <div className="phone-widget mb-8 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Today</span>
                          <span className="text-xl font-bold tracking-tight text-white">Journey</span>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-bold text-neutral-200">JS</div>
                      </div>

                      <div className="phone-widget relative mx-auto mb-8 flex h-44 w-44 items-center justify-center drop-shadow-[0_15px_25px_rgba(0,0,0,.8)]">
                        <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
                          <circle cx="88" cy="88" r="64" fill="none" stroke="rgba(255,255,255,.03)" strokeWidth="12" />
                          <circle className="progress-ring" cx="88" cy="88" r="64" fill="none" stroke="#3b82f6" strokeWidth="12" />
                        </svg>
                        <div className="z-10 flex flex-col items-center text-center">
                          <span ref={counterRef} className="counter-val text-4xl font-extrabold tracking-tighter text-white">0</span>
                          <span className="mt-0.5 text-[8px] font-bold uppercase tracking-[.1em] text-blue-200/50">{metricLabel}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="phone-widget widget-depth flex items-center rounded-2xl p-3">
                          <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-400">✓</div>
                          <div className="flex-1"><div className="mb-2 h-2 w-20 rounded-full bg-neutral-300" /><div className="h-1.5 w-12 rounded-full bg-neutral-600" /></div>
                        </div>
                        <div className="phone-widget widget-depth flex items-center rounded-2xl p-3">
                          <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-500/10 text-emerald-400">✓</div>
                          <div className="flex-1"><div className="mb-2 h-2 w-16 rounded-full bg-neutral-300" /><div className="h-1.5 w-24 rounded-full bg-neutral-600" /></div>
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-1/2 h-1 w-[120px] -translate-x-1/2 rounded-full bg-white/20" />
                    </div>
                  </div>
                </div>

                <div className="floating-badge floating-ui-badge absolute left-[-15px] top-6 z-30 flex items-center gap-3 rounded-xl p-3 lg:left-[-80px] lg:top-12 lg:gap-4 lg:rounded-2xl lg:p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/10 text-base lg:h-10 lg:w-10 lg:text-xl">🔥</div>
                  <div><p className="text-xs font-bold tracking-tight text-white lg:text-sm">1 Year Streak</p><p className="text-[10px] font-medium text-blue-200/50 lg:text-xs">Milestone unlocked</p></div>
                </div>

                <div className="floating-badge floating-ui-badge absolute bottom-12 right-[-15px] z-30 flex items-center gap-3 rounded-xl p-3 lg:bottom-20 lg:right-[-80px] lg:gap-4 lg:rounded-2xl lg:p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-indigo-400/30 bg-indigo-500/10 text-base lg:h-10 lg:w-10 lg:text-lg">🤝</div>
                  <div><p className="text-xs font-bold tracking-tight text-white lg:text-sm">Sponsor Update</p><p className="text-[10px] font-medium text-blue-200/50 lg:text-xs">Shared successfully</p></div>
                </div>
              </div>
            </div>

            <div className="card-left-text order-3 flex w-full flex-col justify-center px-4 text-center lg:order-1 lg:px-0 lg:text-left">
              <h3 className="mb-0 text-2xl font-bold tracking-tight text-white md:text-3xl lg:mb-5 lg:text-4xl">{cardHeading}</h3>
              <p className="hidden max-w-sm text-sm font-normal leading-relaxed text-blue-100/70 md:block md:text-base lg:max-w-none lg:text-lg">{cardDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
