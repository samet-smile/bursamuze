
import { animate, inView, stagger } from "https://cdn.jsdelivr.net/npm/motion@12.23.12/+esm";
if(!matchMedia("(prefers-reduced-motion: reduce)").matches){
  inView("[data-motion]",el=>{
    animate(el,{opacity:[.2,1],transform:["translateY(22px)","translateY(0px)"]},{duration:.55,ease:[.2,.75,.2,1]});
  },{margin:"-8% 0px"});
  const hero=document.querySelector(".hero-copy");
  if(hero)animate(hero.children,{opacity:[0,1],transform:["translateY(24px)","translateY(0)"]},{delay:stagger(.07),duration:.55});
  const glow=document.querySelector(".hero-glow");
  if(glow)animate(glow,{transform:["translate3d(0,0,0) scale(1)","translate3d(-50px,35px,0) scale(1.15)","translate3d(15px,-15px,0) scale(.95)"]},{duration:11,repeat:Infinity,direction:"alternate",ease:"ease-in-out"});
  const pass=document.querySelector(".floating-pass");
  if(pass)animate(pass,{transform:["translateY(0) rotate(3deg)","translateY(-16px) rotate(1deg)","translateY(0) rotate(3deg)"]},{duration:4.8,repeat:Infinity,ease:"ease-in-out"});
}
