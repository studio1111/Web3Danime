"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const styles = `
.gsap-reveal{visibility:hidden}
.film-grain{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:50;opacity:.045;mix-blend-mode:overlay;background:url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>')}
.bg-grid-theme{background-size:60px 60px;background-image:linear-gradient(to right,color-mix(in srgb,var(--color-foreground) 5%,transparent) 1px,transparent 1px),linear-gradient(to bottom,color-mix(in srgb,var(--color-foreground) 5%,transparent) 1px,transparent 1px);mask-image:radial-gradient(ellipse at center,#000 0%,transparent 70%);-webkit-mask-image:radial-gradient(ellipse at center,#000 0%,transparent 70%)}
.text-3d-matte{color:var(--color-foreground);text-shadow:0 10px 30px color-mix(in srgb,var(--color-foreground) 20%,transparent),0 2px 4px color-mix(in srgb,var(--color-foreground) 10%,transparent)}
.text-silver-matte{background:linear-gradient(180deg,var(--color-foreground) 0%,color-mix(in srgb,var(--color-foreground) 40%,transparent) 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(0 10px 20px color-mix(in srgb,var(--color-foreground) 15%,transparent))}
.text-card-silver-matte{background:linear-gradient(180deg,#fff 0%,#a1a1aa 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(0 12px 24px rgba(0,0,0,.8))}
.premium-depth-card{background:linear-gradient(145deg,#162c6d 0%,#0a101d 100%);box-shadow:0 40px 100px -20px rgba(0,0,0,.9),0 20px 40px -20px rgba(0,0,0,.8),inset 0 1px 2px rgba(255,255,255,.2),inset 0 -2px 4px rgba(0,0,0,.8);border:1px solid rgba(255,255,255,.04)}
.card-sheen{position:absolute;inset:0;border-radius:inherit;pointer-events:none;z-index:50;background:radial-gradient(800px circle at var(--mouse-x,50%) var(--mouse-y,50%),rgba(255,255,255,.08),transparent 40%);mix-blend-mode:screen}
.iphone-bezel{background:#111;box-shadow:inset 0 0 0 2px #52525b,inset 0 0 0 7px #000,0 40px 80px -15px rgba(0,0,0,.9);transform-style:preserve-3d}
.hardware-btn{background:linear-gradient(90deg,#404040,#171717);box-shadow:-2px 0 5px rgba(0,0,0,.8),inset -1px 0 1px rgba(255,255,255,.15)}
.screen-glare{background:linear-gradient(110deg,rgba(255,255,255,.08),transparent 45%)}
.widget-depth{background:linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.01));box-shadow:0 10px 20px rgba(0,0,0,.3),inset 0 1px 1px rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.04)}
.floating-ui-badge{background:linear-gradient(135deg,rgba(255,255,255,.08),rgba(255,255,255,.01));backdrop-filter:blur(24px);box-shadow:0 0 0 1px rgba(255,255,255,.1),0 25px 50px -12px rgba(0,0,0,.8),inset 0 1px 1px rgba(255,255,255,.2)}
.btn-modern-light,.btn-modern-dark{transition:all .4s cubic-bezier(.25,1,.5,1)}
.btn-modern-light{background:linear-gradient(180deg,#fff,#f1f5f9);color:#0f172a;box-shadow:0 0 0 1px rgba(0,0,0,.05),0 12px 24px -4px rgba(0,0,0,.3),inset 0 1px 1px #fff}
.btn-modern-light:hover,.btn-modern-dark:hover{transform:translateY(-3px)}
.btn-modern-dark{background:linear-gradient(180deg,#27272a,#18181b);color:#fff;box-shadow:0 0 0 1px rgba(255,255,255,.1),0 12px 24px -4px rgba(0,0,0,.9),inset 0 1px 1px rgba(255,255,255,.15)}
.progress-ring{transform:rotate(-90deg);transform-origin:center;stroke-dasharray:402;stroke-dashoffset:402;stroke-linecap:round}
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement>{
  brandName?:string; tagline1?:string; tagline2?:string; cardHeading?:string;
  cardDescription?:React.ReactNode; metricValue?:number; metricLabel?:string;
  ctaHeading?:string; ctaDescription?:string;
}

export function CinematicHero({
  brandName="Web3Danime",
  tagline1="Build the future,",
  tagline2="not just another site.",
  cardHeading="Immersive by design.",
  cardDescription="A cinematic experience built around motion, depth and clarity.",
  metricValue=365,
  metricLabel="Days creating",
  ctaHeading="Make it cinematic.",
  ctaDescription="Bring your product, studio or idea to life with a tactile landing experience.",
  className,
  ...props
}:CinematicHeroProps){
  const containerRef=useRef<HTMLDivElement>(null);
  const mainCardRef=useRef<HTMLDivElement>(null);
  const mockupRef=useRef<HTMLDivElement>(null);
  const counterRef=useRef<HTMLSpanElement>(null);
  const frame=useRef<number>();

  useEffect(()=>{
    const move=(e:MouseEvent)=>{
      cancelAnimationFrame(frame.current);
      frame.current=requestAnimationFrame(()=>{
        const card=mainCardRef.current, phone=mockupRef.current;
        if(!card||!phone||window.scrollY>window.innerHeight*2)return;
        const r=card.getBoundingClientRect();
        card.style.setProperty("--mouse-x",`${e.clientX-r.left}px`);
        card.style.setProperty("--mouse-y",`${e.clientY-r.top}px`);
        gsap.to(phone,{rotationY:(e.clientX/window.innerWidth-.5)*24,rotationX:-(e.clientY/window.innerHeight-.5)*24,duration:1.2,ease:"power3.out",overwrite:true});
      });
    };
    window.addEventListener("mousemove",move,{passive:true});
    return()=>{window.removeEventListener("mousemove",move);cancelAnimationFrame(frame.current)};
  },[]);

  useEffect(()=>{
    const ctx=gsap.context(()=>{
      const mobile=window.innerWidth<768;
      gsap.set(".text-track",{autoAlpha:0,y:60,scale:.85,filter:"blur(20px)",rotationX:-20});
      gsap.set(".text-days",{autoAlpha:1,clipPath:"inset(0 100% 0 0)"});
      gsap.set(".main-card",{y:window.innerHeight+200,autoAlpha:1});
      gsap.set([".card-left-text",".card-right-text",".mockup-scroll-wrapper",".floating-badge",".phone-widget"],{autoAlpha:0});
      gsap.set(".cta-wrapper",{autoAlpha:0,scale:.8,filter:"blur(30px)"});

      const intro=gsap.timeline({delay:.25});
      intro.to(".text-track",{duration:1.5,autoAlpha:1,y:0,scale:1,filter:"blur(0px)",rotationX:0,ease:"expo.out"})
        .to(".text-days",{duration:1.2,clipPath:"inset(0 0% 0 0)",ease:"power4.inOut"},"-=.8");

      const scroll=gsap.timeline({
        scrollTrigger:{trigger:containerRef.current,start:"top top",end:"+=6500",pin:true,scrub:1,anticipatePin:1}
      });

      scroll.to([".hero-text-wrapper",".bg-grid-theme"],{scale:1.15,filter:"blur(20px)",opacity:.2,duration:2},0)
        .to(".main-card",{y:0,ease:"power3.inOut",duration:2},0)
        .to(".main-card",{width:"100%",height:"100%",borderRadius:0,duration:1.5,ease:"power3.inOut"})
        .fromTo(".mockup-scroll-wrapper",{y:300,z:-500,rotationX:50,rotationY:-30,autoAlpha:0,scale:.6},{y:0,z:0,rotationX:0,rotationY:0,autoAlpha:1,scale:1,duration:2.5,ease:"expo.out"},"-=.8")
        .fromTo(".phone-widget",{y:40,autoAlpha:0,scale:.95},{y:0,autoAlpha:1,scale:1,stagger:.15,duration:1.5,ease:"back.out(1.2)"},"-=1.5")
        .to(".progress-ring",{strokeDashoffset:60,duration:2,ease:"power3.inOut"},"-=1.2")
        .to({value:0},{value:metricValue,duration:2,ease:"expo.out",onUpdate:function(){if(counterRef.current)counterRef.current.textContent=Math.round(this.targets()[0].value).toString()}},"-=2")
        .fromTo(".floating-badge",{y:100,autoAlpha:0,scale:.7,rotationZ:-10},{y:0,autoAlpha:1,scale:1,rotationZ:0,stagger:.2,duration:1.5,ease:"back.out(1.5)"},"-=2")
        .fromTo(".card-left-text",{x:-50,autoAlpha:0},{x:0,autoAlpha:1,duration:1.5,ease:"power4.out"},"-=1.5")
        .fromTo(".card-right-text",{x:50,autoAlpha:0,scale:.8},{x:0,autoAlpha:1,scale:1,duration:1.5,ease:"expo.out"},"<")
        .to({},{duration:2})
        .set(".hero-text-wrapper",{autoAlpha:0})
        .set(".cta-wrapper",{autoAlpha:1})
        .to({},{duration:1.5})
        .to([".mockup-scroll-wrapper",".floating-badge",".card-left-text",".card-right-text"],{scale:.9,y:-40,z:-200,autoAlpha:0,duration:1.2,stagger:.05,ease:"power3.in"})
        .to(".main-card",{width:mobile?"92vw":"85vw",height:mobile?"92vh":"85vh",borderRadius:mobile?"32px":"40px",duration:1.8,ease:"expo.inOut"},"pullback")
        .to(".cta-wrapper",{scale:1,filter:"blur(0px)",duration:1.8,ease:"expo.inOut"},"pullback")
        .to(".main-card",{y:-window.innerHeight-300,duration:1.5,ease:"power3.in"});
    },containerRef);
    return()=>ctx.revert();
  },[metricValue]);

  return <div ref={containerRef} className={cn("relative flex h-screen w-screen items-center justify-center overflow-hidden bg-background font-sans text-foreground antialiased",className)} style={{perspective:"1500px"}} {...props}>
    <style dangerouslySetInnerHTML={{__html:styles}}/>
    <div className="film-grain" aria-hidden="true"/>
    <div className="bg-grid-theme pointer-events-none absolute inset-0 z-0 opacity-50" aria-hidden="true"/>

    <div className="hero-text-wrapper absolute z-10 flex w-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-track gsap-reveal text-3d-matte mb-2 text-5xl font-bold tracking-tight md:text-7xl lg:text-[6rem]">{tagline1}</h1>
      <h1 className="text-days gsap-reveal text-silver-matte text-5xl font-extrabold tracking-tighter md:text-7xl lg:text-[6rem]">{tagline2}</h1>
    </div>

    <div className="cta-wrapper absolute z-10 flex w-screen flex-col items-center justify-center px-4 text-center gsap-reveal">
      <h2 className="text-silver-matte mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">{ctaHeading}</h2>
      <p className="mb-12 max-w-xl text-lg font-light leading-relaxed text-muted-foreground md:text-xl">{ctaDescription}</p>
      <div className="flex flex-col gap-6 sm:flex-row">
        <a href="#app-store" className="btn-modern-light flex items-center justify-center gap-3 rounded-[1.25rem] px-8 py-4 font-bold">
          <span className="text-2xl"></span><span>App Store</span>
        </a>
        <a href="#google-play" className="btn-modern-dark flex items-center justify-center gap-3 rounded-[1.25rem] px-8 py-4 font-bold">
          <span className="text-xl">▶</span><span>Google Play</span>
        </a>
      </div>
    </div>

    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center" style={{perspective:"1500px"}}>
      <div ref={mainCardRef} className="main-card premium-depth-card relative flex h-[92vh] w-[92vw] items-center justify-center overflow-hidden rounded-[32px] pointer-events-auto md:h-[85vh] md:w-[85vw] md:rounded-[40px]">
        <div className="card-sheen" aria-hidden="true"/>
        <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-evenly px-4 py-6 lg:grid lg:grid-cols-3 lg:gap-8 lg:px-12 lg:py-0">
          <div className="card-right-text order-1 flex w-full justify-center lg:order-3 lg:justify-end">
            <h2 className="text-card-silver-matte text-5xl font-black uppercase tracking-tighter md:text-7xl lg:text-[6rem]">{brandName}</h2>
          </div>

          <div className="mockup-scroll-wrapper order-2 relative flex h-[380px] w-full items-center justify-center lg:order-2 lg:h-[600px]" style={{perspective:"1000px"}}>
            <div className="relative flex h-full w-full scale-[.62] items-center justify-center md:scale-75 lg:scale-100">
              <div ref={mockupRef} className="iphone-bezel relative flex h-[580px] w-[280px] flex-col rounded-[3rem] will-change-transform">
                <div className="hardware-btn absolute -left-[3px] top-[120px] z-0 h-[25px] w-[3px] rounded-l-md"/>
                <div className="hardware-btn absolute -left-[3px] top-[160px] z-0 h-[45px] w-[3px] rounded-l-md"/>
                <div className="relative m-2 flex flex-1 flex-col overflow-hidden rounded-[2.45rem] bg-slate-950">
                  <div className="screen-glare pointer-events-none absolute inset-0 z-20"/>
                  <div className="px-6 pt-10 text-xs text-slate-400">TODAY</div>
                  <div className="px-6 pt-3">
                    <div className="text-3xl font-semibold text-white">{cardHeading}</div>
                    <div className="mt-2 text-sm leading-6 text-slate-400">{cardDescription}</div>
                  </div>
                  <div className="phone-widget widget-depth mx-5 mt-7 rounded-3xl p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-sm text-slate-400">{metricLabel}</span>
                      <span className="text-xs text-emerald-300">LIVE</span>
                    </div>
                    <div className="flex items-center gap-5">
                      <svg width="88" height="88" viewBox="0 0 140 140" aria-hidden="true">
                        <circle cx="70" cy="70" r="64" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="8"/>
                        <circle className="progress-ring" cx="70" cy="70" r="64" fill="none" stroke="#60a5fa" strokeWidth="8"/>
                      </svg>
                      <div><span ref={counterRef} className="text-4xl font-bold text-white">0</span><div className="text-xs text-slate-500">{metricLabel}</div></div>
                    </div>
                  </div>
                  <div className="phone-widget mx-5 mt-4 grid grid-cols-2 gap-3">
                    <div className="widget-depth rounded-2xl p-4"><div className="text-xs text-slate-500">Focus</div><div className="mt-2 text-lg font-semibold text-white">94%</div></div>
                    <div className="widget-depth rounded-2xl p-4"><div className="text-xs text-slate-500">Progress</div><div className="mt-2 text-lg font-semibold text-white">+28%</div></div>
                  </div>
                  <div className="phone-widget mx-5 mt-auto mb-5 rounded-2xl bg-white/5 p-4 text-sm text-slate-300">Your timeline is moving forward.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-left-text order-3 flex w-full justify-center lg:order-1 lg:justify-start">
            <div className="max-w-xs">
              <div className="floating-badge inline-flex rounded-full px-4 py-2 text-xs text-slate-200">CINEMATIC UI</div>
              <p className="mt-5 text-lg leading-8 text-slate-300">Physical depth, responsive motion and a polished product story in one scroll-driven hero.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}
