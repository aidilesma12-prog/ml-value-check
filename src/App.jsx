import { useState, useRef, useEffect } from "react";

const WA_NUMBER = "60176891967";
const BRAND = "ML Value Check";

/* ── DATA dari spreadsheet ─────────────────────────────────── */
const SKIN_TYPES = [
  { key:"epic",      label:"Epic Skin",           icon:"🔵", spend:25,  value:100,  code:1 },
  { key:"collector", label:"Collector Skin",       icon:"💎", spend:300, value:2000, code:2 },
  { key:"legend",    label:"Legend Skin",          icon:"🌟", spend:400, value:2000, code:3 },
  { key:"naruto",    label:"Naruto Skin",          icon:"🍃", spend:320, value:2000, code:3 },
  { key:"exorcist",  label:"Exorcist Skin",        icon:"⚔️", spend:350, value:700,  code:4 },
  { key:"skin1111",  label:"11.11 Skin",           icon:"🛍️", spend:250, value:750,  code:3 },
  { key:"zodiac",    label:"Zodiac Skin",          icon:"♈", spend:250, value:0,    code:2 },
  { key:"starlight", label:"Starlight",            icon:"⭐", spend:35,  value:70,   code:1 },
  { key:"kof",       label:"KOF",                  icon:"🥊", spend:500, value:2000, code:4 },
  { key:"mworld",    label:"M-World",              icon:"🏆", spend:300, value:600,  code:3 },
  { key:"hxh",       label:"Hunter X Hunter",      icon:"🎯", spend:450, value:0,    code:4 },
  { key:"axtitan",   label:"Attack X Titan",       icon:"⚡", spend:450, value:450,  code:4 },
  { key:"jjk",       label:"Jujutsu Kaisen",       icon:"🌀", spend:450, value:0,    code:4 },
  { key:"saintseiya",label:"Saint Seiya",          icon:"🛡️", spend:400, value:400,  code:3 },
  { key:"sanrio",    label:"Sanrio",               icon:"🎀", spend:220, value:0,    code:3 },
  { key:"starwars",  label:"Star Wars",            icon:"🚀", spend:400, value:0,    code:4 },
  { key:"transformer",label:"Transformer",         icon:"🤖", spend:350, value:0,    code:4 },
  { key:"kungfu",    label:"Kung Fu Panda",        icon:"🐼", spend:400, value:400,  code:3 },
  { key:"starlightprem",label:"Starlight Premium", icon:"💫", spend:85,  value:85,   code:2 },
  { key:"christmas", label:"Christmas",            icon:"🎄", spend:100, value:0,    code:1 },
  { key:"luckybox",  label:"Lucky Box",            icon:"🎁", spend:200, value:200,  code:2 },
  { key:"saber",     label:"Saber",                icon:"⚔️", spend:160, value:0,    code:2 },
  { key:"summer",    label:"Summer",               icon:"🌊", spend:100, value:0,    code:1 },
  { key:"lunarfest", label:"Lunar Fest",           icon:"🧧", spend:120, value:0,    code:1 },
  { key:"create",    label:"Create",               icon:"🎨", spend:150, value:0,    code:2 },
  { key:"halloween", label:"Halloween",            icon:"🎃", spend:100, value:0,    code:1 },
  { key:"mdt",       label:"MDT",                  icon:"🏅", spend:100, value:0,    code:2 },
  { key:"msc",       label:"Msc",                  icon:"🎖️", spend:120, value:120,  code:2 },
  { key:"valentine", label:"Valentine",            icon:"💝", spend:100, value:200,  code:1 },
  { key:"blazing",   label:"Blazing",              icon:"🔥", spend:200, value:0,    code:2 },
  { key:"champion",  label:"Champion",             icon:"🏆", spend:300, value:0,    code:3 },
  { key:"dragontamer",label:"Dragon Tamer",        icon:"🐉", spend:180, value:0,    code:2 },
  { key:"venom",     label:"Venom",                icon:"🕸️", spend:180, value:0,    code:2 },
  { key:"lightborn", label:"LightBorn",            icon:"✨", spend:250, value:0,    code:2 },
  { key:"covenant",  label:"Covenant",             icon:"🔮", spend:250, value:0,    code:2 },
  { key:"fmvp",      label:"FMVP",                 icon:"🥇", spend:120, value:240,  code:3 },
  { key:"pace",      label:"P.Ace",                icon:"🃏", spend:100, value:0,    code:2 },
  { key:"stun",      label:"Stun",                 icon:"⚡", spend:300, value:0,    code:3 },
  { key:"spongebob", label:"SpongeBob",            icon:"🧽", spend:500, value:0,    code:4 },
  { key:"sparkle",   label:"Sparkle",              icon:"💠", spend:300, value:300,  code:2 },
  { key:"clours",    label:"Clours",               icon:"🎪", spend:100, value:0,    code:1 },
  { key:"titans",    label:"Titans",               icon:"💪", spend:400, value:0,    code:3 },
  { key:"misterbender",label:"Misterbender",       icon:"🌪️", spend:250, value:0,    code:3 },
  { key:"dawning",   label:"Dawning",              icon:"🌅", spend:350, value:0,    code:3 },
  { key:"aspirant",  label:"Aspirant",             icon:"🎯", spend:350, value:700,  code:3 },
  { key:"zenith",    label:"Zenith",               icon:"🔷", spend:350, value:0,    code:3 },
  { key:"prime",     label:"Prime",                icon:"⭐", spend:300, value:0,    code:3 },
  { key:"metrozero", label:"MetroZero",            icon:"🏙️", spend:250, value:0,    code:3 },
  { key:"misbun",    label:"Misbun",               icon:"🏸", spend:250, value:0,    code:3 },
  { key:"ducati",    label:"Ducati",               icon:"🏍️", spend:500, value:500,  code:3 },
  { key:"neobeast",  label:"NeoBeast",             icon:"👾", spend:100, value:0,    code:3 },
  { key:"abyss",     label:"Abyss",                icon:"🌑", spend:500, value:500,  code:4 },
  { key:"seoul",     label:"Seoul",                icon:"🇰🇷", spend:250, value:1000, code:3 },
  { key:"nexussea",  label:"NexusSea",             icon:"🌊", spend:300, value:0,    code:3 },
  { key:"bleach",    label:"Bleach",               icon:"⚔️", spend:500, value:0,    code:4 },
  { key:"kishin",    label:"Kishin",               icon:"👹", spend:400, value:400,  code:4 },
  { key:"allstar",   label:"All Star",             icon:"🌟", spend:500, value:500,  code:4 },
];

const RECALL_TYPES = [
  { key:"grands",    label:"Grands Recall",    icon:"👑", spend:250, value:200 },
  { key:"exquisite", label:"Exquisite Recall", icon:"💎", spend:180, value:126 },
  { key:"deluxe",    label:"Deluxe Recall",    icon:"✨", spend:30,  value:18  },
  { key:"gamakici",  label:"Gamakici",         icon:"🐸", spend:200, value:140 },
  { key:"tesla",     label:"Tesla Towers",     icon:"⚡", spend:250, value:175 },
];

const NONMATCH_TYPES = [
  { key:"loadingscarlet", label:"Loading Effect - Scarlet Shine", icon:"🔴", spend:100, value:50 },
  { key:"loadingdeluxe",  label:"Loading Effect - Deluxe",        icon:"🔶", spend:60,  value:30 },
  { key:"namacolour",     label:"Nama Colour - Deluxe",           icon:"🎨", spend:30,  value:15 },
  { key:"dynportrait",    label:"Dynamic Portrait - Deluxe",      icon:"🖼️", spend:80,  value:40 },
  { key:"avatarborder",   label:"Avatar Border - Exquisite",      icon:"🔲", spend:50,  value:25 },
];

const TIERS = [
  { min:0,      max:500,    label:"Casual Player",     emoji:"🎮", color:"#4fc3f7" },
  { min:500,    max:5000,   label:"Dedicated Grinder", emoji:"⚔️", color:"#81c784" },
  { min:5000,   max:15000,  label:"Spender",           emoji:"💳", color:"#ffb74d" },
  { min:15000,  max:30000,  label:"Big Whale",         emoji:"🐋", color:"#ce93d8" },
  { min:30000,  max:Infinity,label:"Sultan",           emoji:"👑", color:"#ffd54f" },
];

const REAL_WORLD = [
  { min:0,      label:"teh tarik dan roti canai",  emoji:"🍵" },
  { min:50,     label:"set combo McDonald's",       emoji:"🍔" },
  { min:200,    label:"sebulan Spotify",            emoji:"🎵" },
  { min:800,    label:"haul Shopee gila-gila",      emoji:"🛍️" },
  { min:2000,   label:"game Nintendo Switch",       emoji:"🕹️" },
  { min:5000,   label:"sebuah PS5",                 emoji:"🎮" },
  { min:8000,   label:"iPhone 15 Pro",              emoji:"📱" },
  { min:20000,  label:"laptop gaming",              emoji:"💻" },
  { min:50000,  label:"duit muka Myvi",             emoji:"🚗" },
  { min:100000, label:"deposit rumah",              emoji:"🏠" },
];

function getRW(s){ let r=REAL_WORLD[0]; for(const x of REAL_WORLD){if(s>=x.min)r=x;} return r; }
function getTier(v){ return TIERS.find(t=>v>=t.min&&v<t.max)||TIERS[0]; }
function fmt(n){ return "RM "+Number(n.toFixed(0)).toLocaleString("ms-MY"); }

function useCountUp(target, dur=1400, delay=0){
  const [val,setVal]=useState(0);
  useEffect(()=>{
    let start=null,raf;
    const t=setTimeout(()=>{
      const step=(ts)=>{
        if(!start)start=ts;
        const p=Math.min((ts-start)/dur,1);
        const e=p===1?1:1-Math.pow(2,-10*p);
        setVal(Math.round(e*target));
        if(p<1)raf=requestAnimationFrame(step);
      };
      raf=requestAnimationFrame(step);
    },delay);
    return()=>{clearTimeout(t);cancelAnimationFrame(raf);};
  },[target,dur,delay]);
  return val;
}

/* ── Share Card Canvas ─────────────────────────────────────── */
function generateShareCard(result, totalSkins){
  const canvas = document.createElement("canvas");
  canvas.width = 1080; canvas.height = 1920;
  const ctx = canvas.getContext("2d");

  // Background gradient
  const bg = ctx.createLinearGradient(0,0,1080,1920);
  bg.addColorStop(0,"#050810");
  bg.addColorStop(0.5,"#0d1040");
  bg.addColorStop(1,"#050810");
  ctx.fillStyle = bg; ctx.fillRect(0,0,1080,1920);

  // Grid lines
  ctx.strokeStyle="rgba(124,77,255,0.08)"; ctx.lineWidth=1;
  for(let x=0;x<1080;x+=44){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,1920);ctx.stroke();}
  for(let y=0;y<1920;y+=44){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(1080,y);ctx.stroke();}

  // Top glow
  const glow=ctx.createRadialGradient(540,0,0,540,0,600);
  glow.addColorStop(0,"rgba(233,30,140,0.25)"); glow.addColorStop(1,"transparent");
  ctx.fillStyle=glow; ctx.fillRect(0,0,1080,1920);

  // Brand pill
  ctx.fillStyle="rgba(233,30,140,0.15)";
  roundRect(ctx,340,80,400,56,28); ctx.fill();
  ctx.strokeStyle="rgba(233,30,140,0.4)"; ctx.lineWidth=1.5;
  roundRect(ctx,340,80,400,56,28); ctx.stroke();
  ctx.fillStyle="#e91e8c"; ctx.font="bold 22px Arial";
  ctx.textAlign="center"; ctx.fillText("⚡ ML VALUE CHECK", 540, 116);

  // Tier emoji big
  ctx.font="120px Arial"; ctx.textAlign="center";
  ctx.fillText(result.tier.emoji, 540, 320);

  // Glow under emoji
  const tierGlow=ctx.createRadialGradient(540,260,0,540,260,180);
  tierGlow.addColorStop(0,result.tier.color+"55"); tierGlow.addColorStop(1,"transparent");
  ctx.fillStyle=tierGlow; ctx.fillRect(300,130,480,280);

  // Tier label
  ctx.fillStyle=result.tier.color;
  ctx.font="bold 52px Arial"; ctx.textAlign="center";
  ctx.fillText(result.tier.label, 540, 400);

  // Divider
  const div=ctx.createLinearGradient(140,0,940,0);
  div.addColorStop(0,"transparent"); div.addColorStop(0.5,"rgba(233,30,140,0.5)"); div.addColorStop(1,"transparent");
  ctx.strokeStyle=div; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(140,440); ctx.lineTo(940,440); ctx.stroke();

  // Main value card
  ctx.fillStyle="rgba(233,30,140,0.08)";
  roundRect(ctx,80,470,920,180,24); ctx.fill();
  ctx.strokeStyle="rgba(233,30,140,0.25)"; ctx.lineWidth=1.5;
  roundRect(ctx,80,470,920,180,24); ctx.stroke();
  ctx.fillStyle="rgba(255,255,255,0.35)"; ctx.font="24px Arial"; ctx.textAlign="center";
  ctx.fillText("NILAI AKAUN SEMASA", 540, 520);
  // Gradient text simulation
  ctx.fillStyle="#ffffff"; ctx.font="bold 90px Arial"; ctx.textAlign="center";
  ctx.fillText(fmt(result.currentValue), 540, 610);

  // Stats grid
  const stats=[
    {label:"Total Duit Habis",  val:fmt(result.totalSpend),   color:"#ffffff", x:270, y:720},
    {label:"Estimated Resell",  val:fmt(result.resaleValue),  color:"#81c784", x:810, y:720},
    {label:"Duit Hangus 🔥",    val:fmt(result.burned),       color:"#ff6b35", x:270, y:870},
    {label:"Jumlah Skin",       val:totalSkins+" skin",       color:"#ce93d8", x:810, y:870},
  ];
  stats.forEach(s=>{
    ctx.fillStyle="rgba(255,255,255,0.04)";
    roundRect(ctx,s.x-190,s.y-70,380,160,18); ctx.fill();
    ctx.strokeStyle="rgba(255,255,255,0.07)"; ctx.lineWidth=1;
    roundRect(ctx,s.x-190,s.y-70,380,160,18); ctx.stroke();
    ctx.fillStyle="rgba(255,255,255,0.35)"; ctx.font="20px Arial"; ctx.textAlign="center";
    ctx.fillText(s.label, s.x, s.y-20);
    ctx.fillStyle=s.color; ctx.font="bold 36px Arial";
    ctx.fillText(s.val, s.x, s.y+30);
  });

  // Money burn bar
  const burnPct=result.totalSpend>0?result.burned/result.totalSpend:0;
  ctx.fillStyle="rgba(255,255,255,0.06)";
  roundRect(ctx,80,960,920,20,10); ctx.fill();
  const barGrad=ctx.createLinearGradient(80,0,80+920*burnPct,0);
  barGrad.addColorStop(0,"#ff6b35"); barGrad.addColorStop(1,"#e91e8c");
  ctx.fillStyle=barGrad;
  roundRect(ctx,80,960,920*burnPct,20,10); ctx.fill();
  ctx.fillStyle="rgba(255,255,255,0.3)"; ctx.font="20px Arial"; ctx.textAlign="left";
  ctx.fillText("Duit Hangus: "+Math.round(burnPct*100)+"%", 80, 1010);

  // Real world
  const rw=getRW(result.totalSpend);
  ctx.fillStyle="rgba(255,213,79,0.06)";
  roundRect(ctx,80,1040,920,180,24); ctx.fill();
  ctx.strokeStyle="rgba(255,213,79,0.2)"; ctx.lineWidth=1.5;
  roundRect(ctx,80,1040,920,180,24); ctx.stroke();
  ctx.fillStyle="rgba(255,255,255,0.3)"; ctx.font="22px Arial"; ctx.textAlign="center";
  ctx.fillText("KALAU BELI BENDA LAIN...", 540, 1090);
  ctx.font="60px Arial"; ctx.fillText(rw.emoji, 540, 1160);
  ctx.fillStyle="#ffd54f"; ctx.font="bold 38px Arial";
  ctx.fillText(rw.label, 540, 1210);

  // Skin paling mahal
  ctx.fillStyle="rgba(255,255,255,0.04)";
  roundRect(ctx,80,1250,920,120,18); ctx.fill();
  ctx.fillStyle="rgba(255,255,255,0.3)"; ctx.font="22px Arial"; ctx.textAlign="center";
  ctx.fillText("SKIN PALING MAHAL", 540, 1295);
  ctx.fillStyle="#ce93d8"; ctx.font="bold 36px Arial";
  ctx.fillText(result.mostExpensive||"—", 540, 1340);

  // Bottom watermark
  const wmGrad=ctx.createLinearGradient(240,0,840,0);
  wmGrad.addColorStop(0,"#e91e8c"); wmGrad.addColorStop(1,"#7c4dff");
  ctx.fillStyle=wmGrad; ctx.font="bold 32px Arial"; ctx.textAlign="center";
  ctx.fillText("mlvaluecheck.com", 540, 1820);
  ctx.fillStyle="rgba(255,255,255,0.2)"; ctx.font="22px Arial";
  ctx.fillText("Kira nilai akaun ML kau sekarang! 🔥", 540, 1860);

  return canvas.toDataURL("image/png");
}

function roundRect(ctx,x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y);
  ctx.lineTo(x+w-r,y);
  ctx.quadraticCurveTo(x+w,y,x+w,y+r);
  ctx.lineTo(x+w,y+h-r);
  ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
  ctx.lineTo(x+r,y+h);
  ctx.quadraticCurveTo(x,y+h,x,y+h-r);
  ctx.lineTo(x,y+r);
  ctx.quadraticCurveTo(x,y,x+r,y);
  ctx.closePath();
}

/* ── Background ────────────────────────────────────────────── */
function Orbs(){
  return(
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
      <div style={{position:"absolute",top:"-20%",left:"-15%",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(233,30,140,.14) 0%,transparent 65%)",animation:"oPulse 9s ease-in-out infinite"}}/>
      <div style={{position:"absolute",bottom:"-20%",right:"-10%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(124,77,255,.12) 0%,transparent 65%)",animation:"oPulse 11s 3s ease-in-out infinite"}}/>
    </div>
  );
}

/* ── ROOT ──────────────────────────────────────────────────── */
export default function App(){
  const [page,setPage]=useState("home");
  const [skinInputs,setSkinInputs]=useState({});
  const [recallInputs,setRecallInputs]=useState({});
  const [nonmatchInputs,setNonmatchInputs]=useState({});
  const [result,setResult]=useState(null);
  const [visible,setVisible]=useState(true);
  const [activeTab,setActiveTab]=useState("skin");

  function goPage(p){
    setVisible(false);
    setTimeout(()=>{setPage(p);setVisible(true);},120);
  }

  function handleSkin(key,val){ setSkinInputs(p=>({...p,[key]:val.replace(/\D/g,"")})); }
  function handleRecall(key,val){ setRecallInputs(p=>({...p,[key]:val.replace(/\D/g,"")})); }
  function handleNonmatch(key,val){ setNonmatchInputs(p=>({...p,[key]:val.replace(/\D/g,"")})); }

  function calculate(){
    let totalSpend=0, currentValue=0;
    let mostExpensive={label:"—",spend:0};

    SKIN_TYPES.forEach(s=>{
      const n=parseInt(skinInputs[s.key])||0;
      totalSpend+=n*s.spend; currentValue+=n*s.value;
      if(n>0&&s.spend>mostExpensive.spend) mostExpensive={label:`${s.label} (${fmt(s.spend)})`,spend:s.spend};
    });
    RECALL_TYPES.forEach(r=>{
      const n=parseInt(recallInputs[r.key])||0;
      totalSpend+=n*r.spend; currentValue+=n*r.value;
    });
    NONMATCH_TYPES.forEach(r=>{
      const n=parseInt(nonmatchInputs[r.key])||0;
      totalSpend+=n*r.spend; currentValue+=n*r.value;
    });

    const resaleValue=Math.round(currentValue*0.4);
    const burned=totalSpend-resaleValue;
    const tier=getTier(totalSpend);
    const rw=getRW(totalSpend);

    const totalSkins=
      Object.values(skinInputs).reduce((s,v)=>s+(parseInt(v)||0),0)+
      Object.values(recallInputs).reduce((s,v)=>s+(parseInt(v)||0),0)+
      Object.values(nonmatchInputs).reduce((s,v)=>s+(parseInt(v)||0),0);

    setResult({totalSpend,currentValue,resaleValue,burned,tier,rw,mostExpensive:mostExpensive.label,totalSkins});
    goPage("result");
  }

  const hasAny=
    Object.values(skinInputs).some(v=>parseInt(v)>0)||
    Object.values(recallInputs).some(v=>parseInt(v)>0)||
    Object.values(nonmatchInputs).some(v=>parseInt(v)>0);

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body{height:100%;background:#050810}
        body{color:#e8eaf6;font-family:'Plus Jakarta Sans',sans-serif;-webkit-font-smoothing:antialiased}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#e91e8c33;border-radius:2px}
        input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none}
        input[type=number]{-moz-appearance:textfield}
        @keyframes oPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimTxt{0%{background-position:0%}100%{background-position:200%}}
        @keyframes barSlide{from{width:0}to{width:var(--bw)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.2}}
        @keyframes popIn{0%{transform:scale(.8);opacity:0}60%{transform:scale(1.05)}100%{transform:scale(1);opacity:1}}
        @keyframes pulseGlow{0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,.4)}50%{box-shadow:0 0 0 8px rgba(37,211,102,0)}}
        .s1{animation:fadeUp .5s .05s cubic-bezier(.22,1,.36,1) both}
        .s2{animation:fadeUp .5s .12s cubic-bezier(.22,1,.36,1) both}
        .s3{animation:fadeUp .5s .19s cubic-bezier(.22,1,.36,1) both}
        .s4{animation:fadeUp .5s .26s cubic-bezier(.22,1,.36,1) both}
        .s5{animation:fadeUp .5s .33s cubic-bezier(.22,1,.36,1) both}
        .s6{animation:fadeUp .5s .40s cubic-bezier(.22,1,.36,1) both}
        .s7{animation:fadeUp .5s .47s cubic-bezier(.22,1,.36,1) both}
        .glass{background:rgba(255,255,255,.028);border:1px solid rgba(255,255,255,.07);border-radius:18px;backdrop-filter:blur(20px)}
        .glass-pink{background:linear-gradient(135deg,rgba(233,30,140,.07),rgba(124,77,255,.05));border:1px solid rgba(233,30,140,.15);border-radius:18px;backdrop-filter:blur(20px)}
        .glass-green{background:rgba(37,211,102,.05);border:1px solid rgba(37,211,102,.18);border-radius:16px}
        .inp-card{padding:12px 16px 10px;border-radius:12px;border:1px solid rgba(255,255,255,.06);background:rgba(255,255,255,.02);transition:all .2s;position:relative;overflow:hidden}
        .inp-card::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:rgba(255,255,255,.07);transition:background .2s}
        .inp-card:focus-within{border-color:rgba(233,30,140,.35);background:rgba(233,30,140,.04)}
        .inp-card:focus-within::before{background:linear-gradient(#e91e8c,#7c4dff)}
        .inp{width:100%;background:transparent;border:none;outline:none;color:#fff;font-family:'JetBrains Mo 
