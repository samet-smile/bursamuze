
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>Array.from(c.querySelectorAll(s));
const header=$(".site-header");
if(header){addEventListener("scroll",()=>header.classList.toggle("sticky",scrollY>80),{passive:true})}
const drawer=$("#drawer");
$$("[data-menu]").forEach(b=>b.addEventListener("click",()=>{drawer?.classList.add("open");document.body.classList.add("menu-open")}));
$$("[data-close-menu]").forEach(b=>b.addEventListener("click",()=>{drawer?.classList.remove("open");document.body.classList.remove("menu-open")}));
const slides=$$(".hero-slide"), dots=$$(".slider-dots button");
if(slides.length){
  let idx=0;
  const show=n=>{
    idx=(n+slides.length)%slides.length;
    slides.forEach((s,i)=>s.classList.toggle("active",i===idx));
    dots.forEach((d,i)=>d.classList.toggle("active",i===idx));
  };
  dots.forEach((d,i)=>d.addEventListener("click",()=>show(i)));
  $("#heroPrev")?.addEventListener("click",()=>show(idx-1));
  $("#heroNext")?.addEventListener("click",()=>show(idx+1));
  setInterval(()=>show(idx+1),6500);
}
$$("[data-tab]").forEach(btn=>btn.addEventListener("click",()=>{const name=btn.dataset.tab;$$("[data-tab]").forEach(x=>x.classList.toggle("active",x===btn));$$("[data-tabpanel]").forEach(p=>p.hidden=p.dataset.tabpanel!==name)}));

/* Booking */
const modeBtns=$$("[data-booking-mode]");
modeBtns.forEach(btn=>btn.addEventListener("click",()=>{
  const mode=btn.dataset.bookingMode;
  modeBtns.forEach(x=>{x.classList.remove("active","green-active"); if(x===btn)x.classList.add(mode==="standing"?"green-active":"active")});
  $$(".booking-screen").forEach(s=>s.classList.toggle("active",s.id===mode));
  updateBooking(mode);
}));
$$(".session").forEach(s=>s.addEventListener("click",()=>{const row=s.parentElement;$$(".session",row).forEach(x=>x.classList.remove("active"));s.classList.add("active")}));
let zoom=1;
$$("[data-zoom]").forEach(b=>b.addEventListener("click",()=>{zoom=Math.max(.75,Math.min(1.35,zoom+(b.dataset.zoom==="in"?.1:-.1)));const map=$("#seatMap");if(map)map.style.transform=`scale(${zoom})`}));
function buildSeats(){
 const map=$("#seatMap"); if(!map)return;
 const rows="ABCDEFGH";
 map.innerHTML="";
 [...rows].forEach((r,ri)=>{
   const row=document.createElement("div");row.className="seat-row";
   row.innerHTML=`<b>${r}</b>`;
   for(let n=1;n<=14;n++){
     const b=document.createElement("button");b.type="button";b.className="seat";b.textContent=n;b.dataset.seat=`${r}${n}`;
     if((ri*14+n)%17===0)b.classList.add("full");
     if((r==="A"&&n===1)||(r==="A"&&n===14))b.classList.add("accessible");
     if(!b.classList.contains("full"))b.addEventListener("click",()=>{b.classList.toggle("selected");renderSeatChips();updateBooking("seated")});
     row.appendChild(b);
   }map.appendChild(row);
 });
}
function renderSeatChips(){const c=$("#selectedSeats");if(!c)return;const seats=$$(".seat.selected").map(s=>s.dataset.seat);c.innerHTML=seats.map(x=>`<span class="seat-chip"><i class="bi bi-ticket-perforated"></i> ${x}</span>`).join("")}
$$("[data-qty]").forEach(b=>b.addEventListener("click",()=>{const q=b.closest(".qty"),v=$("b",q);let n=parseInt(v.textContent)||0;n=Math.max(0,n+(b.dataset.qty==="plus"?1:-1));v.textContent=n;updateBooking("standing")}));
function updateBooking(mode){
 const isStanding=mode==="standing" || ($("#standing")?.classList.contains("active"));
 let count=0,total=0,desc="";
 if(isStanding){
   const rows=$$("#standing .ticket-row:not(.head)");
   rows.forEach((r,i)=>{const q=parseInt($(".qty b",r)?.textContent||"0");const price=[120,80,60,0][i]||0;count+=q;total+=q*price});
   desc=count?`${count} bilet`:"Bilet seçilmedi";
 }else{
   const seats=$$(".seat.selected");count=seats.length;total=count*120;desc=count?seats.map(s=>s.dataset.seat).join(", "):"Koltuk seçilmedi";
 }
 const service=count*8, grand=total+service;
 $$("[data-summary-count]").forEach(e=>e.textContent=desc);
 $$("[data-summary-price]").forEach(e=>e.textContent=total.toLocaleString("tr-TR")+" TL");
 $$("[data-summary-service]").forEach(e=>e.textContent=service.toLocaleString("tr-TR")+" TL");
 $$("[data-summary-total]").forEach(e=>e.textContent=grand.toLocaleString("tr-TR")+" TL");
}
buildSeats();renderSeatChips();updateBooking("seated");


function setupHorizontalCarousel(trackSel, prevSel, nextSel, step=0.8){
  const track=document.querySelector(trackSel), prev=document.querySelector(prevSel), next=document.querySelector(nextSel);
  if(!track)return;
  const scrollByAmount=()=>Math.max(240,track.clientWidth*step);
  prev?.addEventListener("click",()=>track.scrollBy({left:-scrollByAmount(),behavior:"smooth"}));
  next?.addEventListener("click",()=>track.scrollBy({left:scrollByAmount(),behavior:"smooth"}));
}
setupHorizontalCarousel("#categoryTrack","#categoryPrev","#categoryNext",.75);
setupHorizontalCarousel("#museumTrack","#museumPrev","#museumNext",.82);


/* ===== Events page filtering + dynamic future calendar ===== */
(function(){
  const grid=document.getElementById("eventGrid");
  if(!grid) return;

  const items=Array.from(grid.querySelectorAll("[data-event]"));
  const filterButtons=Array.from(document.querySelectorAll("#eventFilters [data-filter]"));
  const dateBtn=document.getElementById("dateFilterBtn");
  const calendarPanel=document.getElementById("eventCalendarPanel");
  const calendarDaysEl=document.getElementById("eventCalendarDays");
  const monthTitle=document.getElementById("calendarMonthTitle");
  const prevMonthBtn=document.getElementById("calendarPrevMonth");
  const nextMonthBtn=document.getElementById("calendarNextMonth");
  const countEl=document.getElementById("eventResultCount");
  const empty=document.getElementById("eventEmpty");
  const selectedDateLabel=document.getElementById("selectedDateLabel");

  let mode="all";
  let selectedDate="";

  const localISO=(date)=>{
    const y=date.getFullYear();
    const m=String(date.getMonth()+1).padStart(2,"0");
    const d=String(date.getDate()).padStart(2,"0");
    return `${y}-${m}-${d}`;
  };
  const parseISO=(iso)=>{
    const [y,m,d]=iso.split("-").map(Number);
    return new Date(y,m-1,d);
  };
  const today=new Date();
  today.setHours(0,0,0,0);
  const todayISO=localISO(today);
  const addDays=(date,n)=>{const x=new Date(date);x.setDate(x.getDate()+n);return x};
  const weekEndISO=localISO(addDays(today,6));

  const monthNames=["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
  const dayNames=["PAZ","PZT","SAL","ÇAR","PER","CUM","CMT"];

  // Start calendar from current month; past months cannot be navigated to.
  let calendarMonth=new Date(today.getFullYear(),today.getMonth(),1);

  const eventCounts=items.reduce((acc,item)=>{
    const date=item.dataset.date;
    if(date) acc[date]=(acc[date]||0)+1;
    return acc;
  },{});

  function matches(item){
    const date=item.dataset.date || "";
    if(selectedDate) return date===selectedDate;
    switch(mode){
      case "today": return date===todayISO;
      case "week": return date>=todayISO && date<=weekEndISO;
      case "child": return item.dataset.child==="true";
      case "atolye": return item.dataset.category==="atolye";
      case "gosteri": return item.dataset.category==="gosteri";
      case "free": return item.dataset.free==="true";
      case "school": return item.dataset.school==="true";
      default: return true;
    }
  }

  function apply(){
    let visible=0;
    items.forEach(item=>{
      const show=matches(item);
      item.hidden=!show;
      if(show) visible++;
    });
    if(countEl) countEl.textContent=visible;
    if(empty) empty.hidden=visible!==0;
  }

  function formatSelectedLabel(iso){
    const d=parseISO(iso);
    return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()} tarihindeki etkinlikler gösteriliyor.`;
  }

  function renderCalendar(){
    if(!calendarDaysEl) return;
    calendarDaysEl.innerHTML="";
    if(monthTitle) monthTitle.textContent=`${monthNames[calendarMonth.getMonth()]} ${calendarMonth.getFullYear()}`;

    const currentMonthStart=new Date(today.getFullYear(),today.getMonth(),1);
    if(prevMonthBtn){
      const isCurrent=calendarMonth.getFullYear()===currentMonthStart.getFullYear() &&
        calendarMonth.getMonth()===currentMonthStart.getMonth();
      prevMonthBtn.disabled=isCurrent;
      prevMonthBtn.classList.toggle("disabled",isCurrent);
    }

    const year=calendarMonth.getFullYear();
    const month=calendarMonth.getMonth();
    const lastDay=new Date(year,month+1,0).getDate();

    for(let day=1; day<=lastDay; day++){
      const date=new Date(year,month,day);
      date.setHours(0,0,0,0);

      // Do not render any date before today.
      if(date < today) continue;

      const iso=localISO(date);
      const btn=document.createElement("button");
      btn.type="button";
      btn.className="calendar-day-btn";
      btn.dataset.date=iso;
      if(iso===todayISO) btn.classList.add("today");
      if(iso===selectedDate) btn.classList.add("active");

      const count=eventCounts[iso]||0;
      btn.innerHTML=`<small>${dayNames[date.getDay()]}</small><b>${day}</b><span>${count} etkinlik</span>`;
      btn.addEventListener("click",()=>{
        selectedDate=iso;
        mode="date";
        filterButtons.forEach(b=>b.classList.remove("active"));
        dateBtn?.classList.add("active");
        if(selectedDateLabel) selectedDateLabel.textContent=formatSelectedLabel(iso);
        renderCalendar();
        apply();
        if(window.applyMuseumFilter) window.applyMuseumFilter();
      });

      calendarDaysEl.appendChild(btn);
    }

    if(!calendarDaysEl.children.length){
      const msg=document.createElement("div");
      msg.className="calendar-no-days";
      msg.textContent="Bu ay için gösterilecek ileri tarih bulunmuyor.";
      calendarDaysEl.appendChild(msg);
    }
  }

  function closeEventCalendar(){
    if(calendarPanel) calendarPanel.hidden=true;
    dateBtn?.classList.remove("active");
  }

  function setMode(next,button){
    closeEventCalendar();
    mode=next;
    selectedDate="";
    if(selectedDateLabel) selectedDateLabel.textContent="Bir gün seçerek o tarihteki etkinlikleri görüntüleyin.";
    filterButtons.forEach(b=>b.classList.toggle("active",b===button));
    dateBtn?.classList.remove("active");
    renderCalendar();
    apply();
  }

  filterButtons.forEach(button=>{
    button.addEventListener("click",()=>setMode(button.dataset.filter,button));
  });

  dateBtn?.addEventListener("click",()=>{
    calendarPanel.hidden=!calendarPanel.hidden;
    dateBtn.classList.toggle("active",!calendarPanel.hidden || !!selectedDate);
    if(!calendarPanel.hidden) renderCalendar();
  });

  document.getElementById("calendarClose")?.addEventListener("click",()=>{
    calendarPanel.hidden=true;
    dateBtn?.classList.toggle("active",!!selectedDate);
  });

  prevMonthBtn?.addEventListener("click",()=>{
    const candidate=new Date(calendarMonth.getFullYear(),calendarMonth.getMonth()-1,1);
    const currentMonthStart=new Date(today.getFullYear(),today.getMonth(),1);
    if(candidate < currentMonthStart) return;
    calendarMonth=candidate;
    renderCalendar();
  });

  nextMonthBtn?.addEventListener("click",()=>{
    calendarMonth=new Date(calendarMonth.getFullYear(),calendarMonth.getMonth()+1,1);
    renderCalendar();
  });

  document.getElementById("clearDateFilter")?.addEventListener("click",()=>{
    selectedDate="";
    mode="all";
    calendarMonth=new Date(today.getFullYear(),today.getMonth(),1);
    filterButtons.forEach(b=>b.classList.toggle("active",b.dataset.filter==="all"));
    dateBtn?.classList.remove("active");
    if(selectedDateLabel) selectedDateLabel.textContent="Bir gün seçerek o tarihteki etkinlikleri görüntüleyin.";
    renderCalendar();
    apply();
  });

  document.getElementById("resetEventFilters")?.addEventListener("click",()=>{
    selectedDate="";
    mode="all";
    calendarMonth=new Date(today.getFullYear(),today.getMonth(),1);
    filterButtons.forEach(b=>b.classList.toggle("active",b.dataset.filter==="all"));
    dateBtn?.classList.remove("active");
    calendarPanel.hidden=true;
    renderCalendar();
    apply();
  });

  window.closeEventCalendar = closeEventCalendar;
  renderCalendar();
  apply();
})();

/* ===== Etkinlikler V2: searchable museum filter ===== */
(() => {
  const combo = document.getElementById("museumCombobox");
  if(!combo) return;

  const trigger = document.getElementById("museumTrigger");
  const panel = document.getElementById("museumPanel");
  const search = document.getElementById("museumSearch");
  const selectedText = document.getElementById("museumSelectedText");
  const options = Array.from(combo.querySelectorAll(".museum-option"));
  const empty = document.getElementById("museumOptionEmpty");

  let selectedMuseum = "all";

  function openCombo(){
    if(typeof window.closeEventCalendar === "function") window.closeEventCalendar();
    combo.classList.add("open");
    trigger.setAttribute("aria-expanded","true");
    setTimeout(()=>search.focus(), 20);
  }
  function closeCombo(){
    combo.classList.remove("open");
    trigger.setAttribute("aria-expanded","false");
    search.value="";
    filterOptions("");
  }
  function filterOptions(q){
    q = q.trim().toLocaleLowerCase("tr-TR");
    let visible = 0;
    options.forEach(opt=>{
      const text = opt.textContent.trim().toLocaleLowerCase("tr-TR");
      const show = !q || text.includes(q);
      opt.style.display = show ? "flex" : "none";
      if(show) visible++;
    });
    if(empty) empty.style.display = visible ? "none" : "block";
  }
  function applyMuseumFilter(){
    const cards = Array.from(document.querySelectorAll("[data-museum]"));
    cards.forEach(card=>{
      const museumMatch = selectedMuseum === "all" || card.dataset.museum === selectedMuseum;
      card.dataset.museumVisible = museumMatch ? "1" : "0";
    });

    // Cooperate with existing filtering when present.
    if(typeof window.applyEventFilters === "function"){
      window.applyEventFilters();
      return;
    }

    cards.forEach(card=>{
      const museumMatch = card.dataset.museumVisible !== "0";
      const baseVisible = card.dataset.baseVisible !== "0";
      card.style.display = museumMatch && baseVisible ? "" : "none";
    });

    const visibleCount = cards.filter(c=>getComputedStyle(c).display !== "none").length;
    const counter = document.querySelector("[data-result-count], #resultCount, .result-count");
    if(counter){
      const number = counter.querySelector("b,strong");
      if(number) number.textContent = visibleCount;
    }
  }

  trigger.addEventListener("click", e=>{
    e.stopPropagation();
    combo.classList.contains("open") ? closeCombo() : openCombo();
  });
  panel.addEventListener("click", e=>e.stopPropagation());
  search.addEventListener("focus", ()=>{
    if(typeof window.closeEventCalendar === "function") window.closeEventCalendar();
  });
  search.addEventListener("click", ()=>{
    if(typeof window.closeEventCalendar === "function") window.closeEventCalendar();
  });
  search.addEventListener("input", ()=>filterOptions(search.value));

  options.forEach(opt=>{
    opt.addEventListener("click", ()=>{
      if(typeof window.closeEventCalendar === "function") window.closeEventCalendar();
      selectedMuseum = opt.dataset.museumValue || "all";
      options.forEach(o=>o.classList.toggle("active", o===opt));
      selectedText.textContent = opt.querySelector("span").textContent.trim();
      combo.dataset.selectedMuseum = selectedMuseum;
      closeCombo();
      applyMuseumFilter();
      document.dispatchEvent(new CustomEvent("museumfilterchange",{detail:{museum:selectedMuseum}}));
    });
  });

  document.addEventListener("click", closeCombo);
  document.addEventListener("keydown", e=>{
    if(e.key==="Escape") closeCombo();
  });

  window.getSelectedMuseumFilter = () => selectedMuseum;
  window.applyMuseumFilter = applyMuseumFilter;
})();

document.addEventListener("click", e=>{
  if(e.target.closest(".filter,[data-filter],.calendar-day,[data-date],#clearDateFilter")){
    setTimeout(()=>{
      const cards = document.querySelectorAll("[data-museum]");
      cards.forEach(card=>{
        const currentlyHidden = getComputedStyle(card).display === "none";
        card.dataset.baseVisible = currentlyHidden ? "0" : "1";
      });
      if(window.applyMuseumFilter) window.applyMuseumFilter();
    }, 15);
  }
});

/* ===== Etkinlikler V11: clear all filters ===== */
document.getElementById("clearAllEventFilters")?.addEventListener("click",()=>{
  if(typeof window.closeEventCalendar === "function") window.closeEventCalendar();

  // Reset normal event filters through existing reset flow.
  document.getElementById("resetEventFilters")?.click();

  // Reset museum combobox.
  const combo=document.getElementById("museumCombobox");
  if(combo){
    const allOpt=combo.querySelector('.museum-option[data-museum-value="all"]');
    if(allOpt) allOpt.click();
    combo.classList.remove("open");
  }

  // Ensure calendar closes and its selected state is cleared.
  const calendar=document.getElementById("eventCalendarPanel");
  if(calendar) calendar.hidden=true;
  document.getElementById("dateFilterBtn")?.classList.remove("active");

  // Restore scroll position in mobile filter strip to the beginning.
  document.querySelector(".mobile-filter-scroll")?.scrollTo({left:0,behavior:"smooth"});
});
