/**
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║  NUVORA SPORT — v7.0  « FINAL ECOSYSTEM »                              ║
 * ║  Intelligence Platform · Sports SaaS × Club Intranet                   ║
 * ║  Onboarding · Camera Pairing · 3D Tactical Pitch · AI Coach            ║
 * ║  7 Modules · Multi-Role · Real-Time Training & Match Simulation        ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 */
import { useState, useEffect, useRef, useCallback } from "react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts";
import {
  Brain, Bell, User, Shield, Activity, Heart, Moon, Cpu, Search,
  Target, Clock, Star, Trophy, Layers, Flame, Globe, ChevronDown,
  ChevronUp, Zap, CheckCircle, MessageSquare, Send, Euro, X,
  Building2, AlertTriangle, TrendingUp, TrendingDown, Users,
  Sparkles, Video, Wifi, Camera, Lock, Unlock, Plus, ArrowRight,
  BarChart2, BookOpen, RefreshCw, Eye, Award, Gauge,
  Crosshair, Command, Repeat, ArrowRightLeft, Stethoscope,
  MapPin, Calendar, Settings, LogOut, ChevronRight, Play,
  Pause, Radio, Swords, AlertCircle, FileText, Download,
  PieChart, Smile, Frown, Meh, ThumbsUp, Filter, Upload
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════
//  DESIGN SYSTEM v7  ·  VOLCANIC NEBULA  ·  ECOSYSTEM GRADE
// ═══════════════════════════════════════════════════════════════════
const C = {
  void:'#000000', deep:'#05010f', surface:'rgba(10,4,22,0.98)',
  card:'rgba(14,6,28,0.92)', cardL:'rgba(20,10,38,0.85)',
  border:'rgba(255,255,255,0.06)', borderV:'rgba(120,50,230,0.35)',
  volt:'#7c3aed', voltL:'#a78bfa', voltD:'#4c1d95',
  crim:'#dc2626', crimL:'#f87171',
  emb:'#ea580c', embL:'#fb923c',
  cyan:'#06b6d4', cyanL:'#67e8f9',
  emer:'#10b981', emerL:'#34d399',
  amber:'#f59e0b', rose:'#f43f5e',
  text:'#faf5ff', sub:'#9ca3af', faint:'#374151',
  gV:'linear-gradient(135deg,#7c3aed,#dc2626)',
  gE:'linear-gradient(135deg,#10b981,#06b6d4)',
  gA:'linear-gradient(135deg,#f59e0b,#ea580c)',
  gF:'linear-gradient(135deg,#7c3aed,#ea580c,#dc2626)',
  gN:'linear-gradient(135deg,#06b6d4,#7c3aed)',
};

const ROLES = {
  director:    { label:'Directeur Sportif',    color:'#f59e0b', icon:'🏆', modules:['dashboard','athletes','analytics','management','comms'] },
  headcoach:   { label:'Entraîneur Principal', color:'#7c3aed', icon:'⚡', modules:['dashboard','training','match','athletes','analytics','health','comms'] },
  assistant:   { label:'Entraîneur Adjoint',   color:'#8b5cf6', icon:'🎯', modules:['dashboard','training','match','athletes','comms'] },
  medical:     { label:'Staff Médical',         color:'#10b981', icon:'🩺', modules:['dashboard','health','athletes','comms'] },
  analyst:     { label:'Analyste Vidéo',        color:'#06b6d4', icon:'📊', modules:['dashboard','training','match','analytics','comms'] },
  physio:      { label:'Préparateur Physique',  color:'#f97316', icon:'💪', modules:['dashboard','training','health','athletes','comms'] },
  athlete:     { label:'Joueur',                color:'#a78bfa', icon:'⚽', modules:['dashboard','personal','health','comms'] },
};

const PLAYERS_DATA = [
  { id:1, name:'A. Moreau',    num:10, pos:'ATT', nationality:'🇫🇷', age:24, wellness:94, form:96, fatigue:12, risk:'low',  fitness:92, speed:94, technique:97, bx:0.50, by:0.15 },
  { id:2, name:'K. Silva',     num:9,  pos:'ATT', nationality:'🇧🇷', age:26, wellness:78, form:82, fatigue:48, risk:'med',  fitness:80, speed:88, technique:85, bx:0.35, by:0.18 },
  { id:3, name:'T. Okafor',    num:11, pos:'ATT', nationality:'🇳🇬', age:22, wellness:88, form:85, fatigue:25, risk:'low',  fitness:91, speed:96, technique:82, bx:0.65, by:0.18 },
  { id:4, name:'D. Laurent',   num:8,  pos:'MID', nationality:'🇫🇷', age:28, wellness:91, form:90, fatigue:20, risk:'low',  fitness:88, speed:82, technique:93, bx:0.50, by:0.38 },
  { id:5, name:'R. Benzara',   num:6,  pos:'MID', nationality:'🇩🇿', age:25, wellness:62, form:71, fatigue:65, risk:'high', fitness:65, speed:78, technique:88, bx:0.32, by:0.42 },
  { id:6, name:'L. Petit',     num:7,  pos:'MID', nationality:'🇫🇷', age:27, wellness:85, form:88, fatigue:30, risk:'low',  fitness:87, speed:85, technique:90, bx:0.68, by:0.42 },
  { id:7, name:'M. Konate',    num:5,  pos:'DEF', nationality:'🇨🇮', age:23, wellness:90, form:87, fatigue:18, risk:'low',  fitness:93, speed:86, technique:78, bx:0.30, by:0.62 },
  { id:8, name:'J. Hartmann',  num:4,  pos:'DEF', nationality:'🇩🇪', age:29, wellness:87, form:89, fatigue:22, risk:'low',  fitness:89, speed:80, technique:83, bx:0.45, by:0.66 },
  { id:9, name:'C. Alvarez',   num:3,  pos:'DEF', nationality:'🇪🇸', age:31, wellness:72, form:75, fatigue:50, risk:'med',  fitness:76, speed:75, technique:85, bx:0.55, by:0.66 },
  { id:10, name:'N. Tremblay', num:2,  pos:'DEF', nationality:'🇫🇷', age:26, wellness:93, form:91, fatigue:15, risk:'low',  fitness:90, speed:87, technique:80, bx:0.70, by:0.62 },
  { id:11, name:'P. Guimarães',num:1,  pos:'GK',  nationality:'🇧🇷', age:30, wellness:95, form:93, fatigue:10, risk:'low',  fitness:91, speed:70, technique:95, bx:0.50, by:0.88 },
];

const MATCH_EVENTS = [
  { t:8,  type:'shot',     msg:'Tir cadré — Moreau',   team:'home', icon:'⚡' },
  { t:17, type:'corner',   msg:'Coup de pied de coin',  team:'away', icon:'🚩' },
  { t:23, type:'goal',     msg:'⚽ BUT! A. Moreau (1-0)', team:'home', icon:'🎯', score:[1,0] },
  { t:31, type:'yellow',   msg:'Carton jaune — Benzara',team:'home', icon:'🟡' },
  { t:38, type:'foul',     msg:'Faute technique',        team:'away', icon:'⚠️' },
  { t:44, type:'goal',     msg:'⚽ BUT! K. Silva (2-0)',  team:'home', icon:'🎯', score:[2,0] },
  { t:52, type:'sub',      msg:'Remplacement: Konate → Diallo', team:'home', icon:'🔄' },
  { t:58, type:'goal',     msg:'⚽ BUT! (2-1)',           team:'away', icon:'💥', score:[2,1] },
  { t:67, type:'shot',     msg:'Tir hors cadre',         team:'away', icon:'❌' },
  { t:73, type:'goal',     msg:'⚽ BUT! L. Petit (3-1)', team:'home', icon:'🎯', score:[3,1] },
  { t:81, type:'red',      msg:'Carton rouge adverse',   team:'away', icon:'🟥' },
  { t:89, type:'whistle',  msg:'Coup de sifflet final',  team:'none', icon:'🏁' },
];

const AI_MESSAGES = [
  { t:5,  txt:'Analyse en cours — pression haute adverse à 78% sur les 10 premières minutes. Recommandation: jeu long direct pour casser les lignes.' },
  { t:18, txt:'🔴 ALERTE: K. Silva présente une asymétrie de foulée anormale. Ratio charge ACWR = 1.8 (seuil critique). Prévoir remplacement avant 60\'.', alert:true },
  { t:26, txt:'Formation 4-3-3 adverse détectée. Zones faibles identifiées: couloir gauche (coverage 42%). Recommandation: surcharge droite + centre.' },
  { t:40, txt:'Stats mi-temps: possession 58%, passes précises 87%, distance couverte 43km. Pression intense — R. Benzara montre des signes de fatigue (FC moy 178bpm).' },
  { t:55, txt:'Données GPS: K. Okafor vitesse max 32.4 km/h, volume de sprint +23% vs baseline. Performance exceptionnelle — exploiter ce couloir.' },
  { t:65, txt:'⚠️ TACTIQUE: Suite au but encaissé, l\'adversaire bascule en 4-4-2 bas. Recommandation: jeu de possession, déplacer le bloc, créer espaces dans le dos.' },
  { t:75, txt:'Win probability: 94.2% ✅. 3 remplacements recommandés pour gérer la fatigue: Silva, Benzara, Konate. Conservation du résultat prioritaire.' },
];

const HEALTH_DATA = PLAYERS_DATA.map(p => ({
  ...p,
  sleepScore: Math.floor(55 + Math.random()*40),
  hrv: Math.floor(45 + Math.random()*55),
  muscleFatigue: Math.floor(20 + p.fatigue * 0.7 + Math.random()*20),
  mentalLoad: Math.floor(40 + Math.random()*50),
  rpe: (4 + Math.random()*5).toFixed(1),
  acwr: (0.8 + Math.random()*1.2).toFixed(2),
}));

const PERF_CHART = Array.from({length:12},(_,i)=>({
  sem:`S${i+1}`, charge:Math.floor(60+Math.random()*35), forme:Math.floor(65+Math.random()*30),
  wellbeing:Math.floor(60+Math.random()*35), blessures:Math.floor(Math.random()*3),
}));

const RADAR_TEAM = [
  {sub:'Technique',A:88,B:74},{sub:'Physique',A:85,B:80},{sub:'Tactique',A:91,B:68},
  {sub:'Vitesse',A:82,B:88},{sub:'Pressing',A:89,B:65},{sub:'Mental',A:86,B:72},
];

// ═══════════════════════════════════════════════════════════════════
//  GLOBAL CSS
// ═══════════════════════════════════════════════════════════════════
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body{background:#000;color:#faf5ff;overflow:hidden}
::-webkit-scrollbar{width:3px;height:3px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:#7c3aed50;border-radius:3px}
.nv{font-family:'Syne',sans-serif;-webkit-font-smoothing:antialiased}
.mono{font-family:'JetBrains Mono',monospace}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideRight{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:translateX(0)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes spin2{to{transform:rotate(-360deg)}}
@keyframes lava{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes neonPulse{0%,100%{box-shadow:0 0 12px #7c3aed40,0 0 24px #7c3aed20}50%{box-shadow:0 0 24px #7c3aed80,0 0 48px #7c3aed40}}
@keyframes scanLine{0%{top:0;opacity:.8}100%{top:100%;opacity:0}}
@keyframes popIn{0%{transform:scale(.85);opacity:0}60%{transform:scale(1.02)}100%{transform:scale(1);opacity:1}}
@keyframes chatIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
@keyframes ring{0%,100%{transform:rotate(0)}15%{transform:rotate(12deg)}35%{transform:rotate(-10deg)}55%{transform:rotate(6deg)}}
@keyframes drift{0%,100%{transform:translate(0,0)}33%{transform:translate(20px,-14px)}66%{transform:translate(-10px,10px)}}
@keyframes progressFill{from{width:0}}
@keyframes progressH{from{height:0}}
@keyframes glitch{0%,90%,100%{transform:translate(0)}92%{transform:translate(-2px,1px)}95%{transform:translate(2px,-1px)}}
@keyframes shimmer{0%{left:-100%}100%{left:130%}}
@keyframes heartbeat{0%,100%{transform:scale(1)}14%{transform:scale(1.12)}28%{transform:scale(1)}}
@keyframes alertPulse{0%,100%{background:rgba(220,38,38,0.08)}50%{background:rgba(220,38,38,0.18)}}
@keyframes typewriter{from{width:0}to{width:100%}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes cameraGlow{0%,100%{border-color:rgba(6,182,212,0.4)}50%{border-color:rgba(6,182,212,0.9)}}

.gc{background:rgba(14,6,28,0.92);backdrop-filter:blur(24px) saturate(1.5);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.06);border-radius:18px;box-shadow:0 4px 32px rgba(0,0,0,.8),inset 0 1px 0 rgba(255,255,255,.04);position:relative;overflow:hidden;transition:border-color .25s,box-shadow .25s,transform .22s}
.gc::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent);pointer-events:none}
.gc:hover{border-color:rgba(124,58,237,0.3);box-shadow:0 12px 48px rgba(0,0,0,.85),0 0 0 1px rgba(124,58,237,.12);transform:translateY(-1px)}
.lava{position:relative;border-radius:20px;padding:1.5px;background:linear-gradient(135deg,#7c3aed,#dc2626,#ea580c,#7c3aed);background-size:300% 300%;animation:lava 5s ease infinite}
.lava-i{background:rgba(14,6,28,0.92);backdrop-filter:blur(24px);border-radius:19px;padding:20px;height:100%}
.snav{display:flex;align-items:center;gap:11px;padding:10px 14px;border-radius:12px;cursor:pointer;border:1px solid transparent;transition:all .2s;width:100%;background:transparent;font-family:'Syne',sans-serif;font-weight:600;font-size:11.5px;color:#9ca3af;text-align:left}
.snav:hover:not(.sav){background:rgba(255,255,255,.04);border-color:rgba(255,255,255,.06);color:#faf5ff}
.sav{background:rgba(124,58,237,0.14);border-color:rgba(124,58,237,0.35);color:#a78bfa;box-shadow:inset 0 1px 0 rgba(124,58,237,.18)}
.badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:99px;font-size:9px;font-weight:700;letter-spacing:1.2px;font-family:'JetBrains Mono',monospace}
.btn{display:inline-flex;align-items:center;gap:8px;padding:10px 22px;border-radius:12px;border:none;cursor:pointer;font-family:'Syne',sans-serif;font-weight:700;font-size:13px;transition:all .2s}
.btn-volt{background:linear-gradient(135deg,#7c3aed,#6d28d9);color:#fff;box-shadow:0 4px 20px rgba(124,58,237,0.4)}
.btn-volt:hover{transform:translateY(-1px);box-shadow:0 8px 30px rgba(124,58,237,0.6)}
.btn-ghost{background:rgba(255,255,255,.06);color:#faf5ff;border:1px solid rgba(255,255,255,.1)}
.btn-ghost:hover{background:rgba(255,255,255,.1)}
.input-field{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:12px 16px;color:#faf5ff;font-family:'Syne',sans-serif;font-size:14px;width:100%;outline:none;transition:border-color .2s}
.input-field:focus{border-color:#7c3aed;box-shadow:0 0 0 3px rgba(124,58,237,.12)}
.input-field::placeholder{color:#4b5563}
.select-field{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:12px 16px;color:#faf5ff;font-family:'Syne',sans-serif;font-size:14px;width:100%;outline:none;cursor:pointer;appearance:none;transition:border-color .2s}
.select-field:focus{border-color:#7c3aed}
.chip{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;cursor:pointer;transition:all .18s;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.04);color:#9ca3af}
.chip.active{background:rgba(124,58,237,.15);border-color:rgba(124,58,237,.4);color:#a78bfa}
.progress-bar{height:6px;border-radius:99px;background:rgba(255,255,255,.08);overflow:hidden;position:relative}
.progress-fill{height:100%;border-radius:99px;animation:progressFill .8s ease forwards}
.anim-fadeUp{animation:fadeUp .5s ease forwards}
.anim-popIn{animation:popIn .4s cubic-bezier(.4,0,.2,1) forwards}
.risk-low{color:#34d399;border-color:rgba(52,211,153,.3);background:rgba(52,211,153,.08)}
.risk-med{color:#fbbf24;border-color:rgba(251,191,36,.3);background:rgba(251,191,36,.08)}
.risk-high{color:#f87171;border-color:rgba(248,113,113,.3);background:rgba(248,113,113,.08);animation:alertPulse 2s ease infinite}
.scrollable{overflow-y:auto;scrollbar-width:thin;scrollbar-color:#7c3aed20 transparent}
.tooltip-custom{background:rgba(10,4,22,.98)!important;border:1px solid rgba(124,58,237,.3)!important;border-radius:10px!important;font-family:'Syne',sans-serif!important;font-size:11px!important}
.camera-feed{border:1.5px solid rgba(6,182,212,0.4);border-radius:12px;animation:cameraGlow 2s ease infinite;overflow:hidden;position:relative}
`;

// ═══════════════════════════════════════════════════════════════════
//  UTILITY COMPONENTS
// ═══════════════════════════════════════════════════════════════════
const Chip = ({children, active, onClick, color='volt'}) => (
  <button className={`chip ${active?'active':''}`} onClick={onClick}
    style={active ? {background:`rgba(${color==='volt'?'124,58,237':color==='cyan'?'6,182,212':color==='emer'?'16,185,129':'234,88,12'},.15)`,borderColor:`rgba(${color==='volt'?'124,58,237':color==='cyan'?'6,182,212':color==='emer'?'16,185,129':'234,88,12'},.4)`,color:`${color==='volt'?'#a78bfa':color==='cyan'?'#67e8f9':color==='emer'?'#34d399':'#fb923c'}`}:{}}>{children}</button>
);

const Badge = ({children, color='volt'}) => {
  const colors = {volt:'rgba(124,58,237,.12) border-rgba(124,58,237,.3) #a78bfa',crim:'rgba(220,38,38,.1) border-rgba(220,38,38,.3) #f87171',emer:'rgba(16,185,129,.1) border-rgba(16,185,129,.25) #34d399',amber:'rgba(245,158,11,.1) border-rgba(245,158,11,.25) #fbbf24',cyan:'rgba(6,182,212,.1) border-rgba(6,182,212,.25) #67e8f9'};
  const bg = {volt:'rgba(124,58,237,.12)',crim:'rgba(220,38,38,.1)',emer:'rgba(16,185,129,.1)',amber:'rgba(245,158,11,.1)',cyan:'rgba(6,182,212,.1)'};
  const bd = {volt:'rgba(124,58,237,.3)',crim:'rgba(220,38,38,.3)',emer:'rgba(16,185,129,.25)',amber:'rgba(245,158,11,.25)',cyan:'rgba(6,182,212,.25)'};
  const tx = {volt:'#a78bfa',crim:'#f87171',emer:'#34d399',amber:'#fbbf24',cyan:'#67e8f9'};
  return <span className="badge" style={{background:bg[color],border:`1px solid ${bd[color]}`,color:tx[color]}}>{children}</span>;
};

const MetricCard = ({label, value, unit, delta, icon, color=C.volt, delay=0}) => (
  <div className="gc anim-fadeUp" style={{padding:'18px 20px',animationDelay:`${delay}ms`}}>
    <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:12}}>
      <span style={{fontSize:11,color:C.sub,fontWeight:600,letterSpacing:'0.06em',textTransform:'uppercase'}}>{label}</span>
      <div style={{width:32,height:32,borderRadius:10,background:`${color}18`,display:'flex',alignItems:'center',justifyContent:'center',color}}>{icon}</div>
    </div>
    <div style={{display:'flex',alignItems:'flex-end',gap:6}}>
      <span style={{fontSize:28,fontWeight:800,color:C.text,lineHeight:1}}>{value}</span>
      {unit && <span style={{fontSize:12,color:C.sub,marginBottom:3}}>{unit}</span>}
    </div>
    {delta !== undefined && (
      <div style={{marginTop:8,display:'flex',alignItems:'center',gap:4,fontSize:11,color:delta>=0?C.emer:C.crim}}>
        {delta>=0?<TrendingUp size={11}/>:<TrendingDown size={11}/>}
        <span>{delta>=0?'+':''}{delta}% vs sem. préc.</span>
      </div>
    )}
  </div>
);

const StatBar = ({label, value, max=100, color=C.volt, showPct=true}) => (
  <div style={{marginBottom:12}}>
    <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}>
      <span style={{fontSize:11,color:C.sub,fontWeight:600}}>{label}</span>
      {showPct && <span className="mono" style={{fontSize:11,color}}>{value}%</span>}
    </div>
    <div className="progress-bar">
      <div className="progress-fill" style={{width:`${value}%`,background:color}}/>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════
//  SPLASH SCREEN
// ═══════════════════════════════════════════════════════════════════
function SplashScreen({onDone}) {
  const [phase, setPhase] = useState(0); // 0=init 1=logo 2=text 3=fade
  const canvasRef = useRef();
  useEffect(() => {
    const t1 = setTimeout(()=>setPhase(1),200);
    const t2 = setTimeout(()=>setPhase(2),1100);
    const t3 = setTimeout(()=>setPhase(3),2600);
    const t4 = setTimeout(onDone, 3400);
    return ()=>[t1,t2,t3,t4].forEach(clearTimeout);
  },[]);
  useEffect(()=>{
    const c = canvasRef.current; if(!c) return;
    const ctx = c.getContext('2d');
    c.width = window.innerWidth; c.height = window.innerHeight;
    let frame, t=0;
    const pts = Array.from({length:80},()=>({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.4,vy:(Math.random()-.5)*0.4,r:Math.random()*1.5+0.5}));
    function draw(){
      ctx.clearRect(0,0,c.width,c.height);
      ctx.fillStyle='#05010f'; ctx.fillRect(0,0,c.width,c.height);
      pts.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=c.width; if(p.x>c.width)p.x=0;
        if(p.y<0)p.y=c.height; if(p.y>c.height)p.y=0;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(124,58,237,${0.3+Math.sin(t+p.x)*0.2})`; ctx.fill();
      });
      pts.forEach((a,i)=>pts.slice(i+1).forEach(b=>{
        const d=Math.hypot(a.x-b.x,a.y-b.y);
        if(d<100){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=`rgba(124,58,237,${(1-d/100)*0.15})`;ctx.lineWidth=.5;ctx.stroke();}
      }));
      t+=0.015;
      frame=requestAnimationFrame(draw);
    }
    draw(); return()=>cancelAnimationFrame(frame);
  },[]);
  return (
    <div style={{position:'fixed',inset:0,background:'#05010f',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',zIndex:100,transition:'opacity .8s',opacity:phase===3?0:1}}>
      <canvas ref={canvasRef} style={{position:'absolute',inset:0,pointerEvents:'none'}}/>
      <div style={{position:'relative',textAlign:'center'}}>
        <div style={{opacity:phase>=1?1:0,transform:phase>=1?'scale(1)':'scale(.7)',transition:'all .9s cubic-bezier(.4,0,.2,1)'}}>
          <div style={{width:100,height:100,margin:'0 auto 24px',borderRadius:28,background:C.gF,display:'flex',alignItems:'center',justifyContent:'center',fontSize:44,boxShadow:'0 0 60px rgba(124,58,237,0.6)',animation:phase>=1?'neonPulse 2s ease infinite':'none'}}>⚡</div>
          <div style={{fontSize:52,fontWeight:900,letterSpacing:'-0.03em',color:'#faf5ff',lineHeight:1}}>NUVORA<span style={{color:'#7c3aed'}}>.</span></div>
          <div style={{fontSize:15,letterSpacing:'0.28em',color:'#6d28d9',fontWeight:700,marginTop:6,fontFamily:'JetBrains Mono'}}>SPORT ECOSYSTEM</div>
        </div>
        <div style={{opacity:phase>=2?1:0,transform:phase>=2?'translateY(0)':'translateY(12px)',transition:'all .7s ease .2s',marginTop:28}}>
          <div style={{fontSize:13,color:C.sub,letterSpacing:'0.12em'}}>INTELLIGENCE · PERFORMANCE · COHÉSION</div>
          <div style={{marginTop:16,display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
            <div style={{width:32,height:2,background:'linear-gradient(90deg,transparent,#7c3aed)',borderRadius:99}}/>
            <div style={{width:8,height:8,borderRadius:'50%',background:'#7c3aed',animation:'pulse 1s ease infinite'}}/>
            <div style={{width:32,height:2,background:'linear-gradient(90deg,#7c3aed,transparent)',borderRadius:99}}/>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  AUTH SCREEN
// ═══════════════════════════════════════════════════════════════════
function AuthScreen({onLogin}) {
  const [tab, setTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const handle = () => { setLoading(true); setTimeout(onLogin, 1800); };
  return (
    <div style={{minHeight:'100vh',background:'#05010f',display:'flex',alignItems:'center',justifyContent:'center',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',top:'20%',left:'15%',width:400,height:400,background:'radial-gradient(circle,rgba(124,58,237,0.12),transparent 70%)',borderRadius:'50%',animation:'drift 8s ease infinite',pointerEvents:'none'}}/>
      <div style={{position:'absolute',bottom:'15%',right:'10%',width:300,height:300,background:'radial-gradient(circle,rgba(220,38,38,0.08),transparent 70%)',borderRadius:'50%',animation:'drift 12s ease infinite reverse',pointerEvents:'none'}}/>
      <div className="anim-fadeUp" style={{width:420,position:'relative'}}>
        <div style={{textAlign:'center',marginBottom:36}}>
          <div style={{fontSize:30,fontWeight:900,color:'#faf5ff'}}>NUVORA<span style={{color:'#7c3aed'}}>.</span></div>
          <div style={{fontSize:11,color:C.sub,letterSpacing:'0.2em',marginTop:4}}>SPORT ECOSYSTEM</div>
        </div>
        <div className="gc" style={{padding:32}}>
          <div style={{display:'flex',gap:8,marginBottom:28,background:'rgba(255,255,255,.04)',borderRadius:12,padding:4}}>
            {['login','register'].map(t=>(
              <button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:'9px',borderRadius:9,border:'none',cursor:'pointer',fontSize:12,fontWeight:700,fontFamily:'Syne,sans-serif',transition:'all .2s',background:tab===t?'rgba(124,58,237,.2)':' transparent',color:tab===t?'#a78bfa':'#9ca3af',borderColor:tab===t?'rgba(124,58,237,.4)':'transparent',boxShadow:tab===t?'inset 0 1px 0 rgba(124,58,237,.2)':'none'}}>
                {t==='login'?'Se connecter':'Créer un compte'}
              </button>
            ))}
          </div>
          {tab==='login' ? (
            <div style={{display:'flex',flexDirection:'column',gap:14}}>
              <div><label style={{fontSize:11,color:C.sub,fontWeight:600,letterSpacing:'0.06em',display:'block',marginBottom:6}}>EMAIL</label>
                <input className="input-field" defaultValue="directeur@psg.fr" placeholder="email@club.com"/></div>
              <div><label style={{fontSize:11,color:C.sub,fontWeight:600,letterSpacing:'0.06em',display:'block',marginBottom:6}}>MOT DE PASSE</label>
                <input className="input-field" type="password" defaultValue="••••••••" placeholder="••••••••"/></div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <label style={{display:'flex',alignItems:'center',gap:7,fontSize:12,color:C.sub,cursor:'pointer'}}>
                  <div style={{width:16,height:16,borderRadius:4,background:'rgba(124,58,237,.2)',border:'1px solid rgba(124,58,237,.4)',display:'flex',alignItems:'center',justifyContent:'center'}}><CheckCircle size={10} color="#7c3aed"/></div>Se souvenir
                </label>
                <span style={{fontSize:12,color:'#7c3aed',cursor:'pointer'}}>Mot de passe oublié ?</span>
              </div>
              <button className="btn btn-volt" onClick={handle} style={{width:'100%',justifyContent:'center',marginTop:6,height:46}}>
                {loading?<div style={{width:18,height:18,border:'2px solid rgba(255,255,255,.3)',borderTopColor:'#fff',borderRadius:'50%',animation:'spin .7s linear infinite'}}/>:<><Lock size={14}/>Se connecter à l'écosystème</>}
              </button>
            </div>
          ):(
            <div style={{display:'flex',flexDirection:'column',gap:14}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                <div><label style={{fontSize:11,color:C.sub,fontWeight:600,letterSpacing:'0.06em',display:'block',marginBottom:6}}>PRÉNOM</label><input className="input-field" placeholder="Prénom"/></div>
                <div><label style={{fontSize:11,color:C.sub,fontWeight:600,letterSpacing:'0.06em',display:'block',marginBottom:6}}>NOM</label><input className="input-field" placeholder="Nom"/></div>
              </div>
              <div><label style={{fontSize:11,color:C.sub,fontWeight:600,letterSpacing:'0.06em',display:'block',marginBottom:6}}>EMAIL PROFESSIONNEL</label><input className="input-field" placeholder="email@club.com"/></div>
              <div><label style={{fontSize:11,color:C.sub,fontWeight:600,letterSpacing:'0.06em',display:'block',marginBottom:6}}>MOT DE PASSE</label><input className="input-field" type="password" placeholder="••••••••"/></div>
              <button className="btn btn-volt" onClick={handle} style={{width:'100%',justifyContent:'center',marginTop:6,height:46}}>
                {loading?<div style={{width:18,height:18,border:'2px solid rgba(255,255,255,.3)',borderTopColor:'#fff',borderRadius:'50%',animation:'spin .7s linear infinite'}}/>:<><Zap size={14}/>Créer mon accès</>}
              </button>
            </div>
          )}
        </div>
        <div style={{textAlign:'center',marginTop:20,fontSize:11,color:C.faint}}>
          <Shield size={10} style={{display:'inline',marginRight:5}}/>Connexion chiffrée TLS 1.3 · RGPD · ISO 27001
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  CLUB CREATION WIZARD
// ═══════════════════════════════════════════════════════════════════
const SPORTS = ['Football','Basketball','Rugby','Handball','Volleyball','Hockey','Tennis','Athlétisme'];
const PLANS = [
  {id:'starter',name:'Starter',price:'490€',desc:'Jusqu\'à 30 membres',features:['5 modules','2 caméras','Stockage 1TB','Support email'],color:'#06b6d4'},
  {id:'pro',name:'Pro',price:'990€',desc:'Jusqu\'à 100 membres',features:['7 modules complets','10 caméras','Stockage 5TB','Support prioritaire','API externe'],color:'#7c3aed',best:true},
  {id:'elite',name:'Elite',price:'Sur devis',desc:'Effectif illimité',features:['Modules custom','Caméras illimitées','Infrastructure dédiée','Account manager','Intégration CRM/ERP'],color:'#f59e0b'},
];

function ClubWizard({onDone}) {
  const [step, setStep] = useState(0);
  const [plan, setPlan] = useState('pro');
  const [sport, setSport] = useState('Football');
  const [colors, setColors] = useState('#dc2626');
  const [loading, setLoading] = useState(false);
  const steps = ['Identité du club','Abonnement','Compte administrateur','Confirmation'];

  const handleNext = () => {
    if(step < steps.length-1) setStep(s=>s+1);
    else { setLoading(true); setTimeout(onDone,1500); }
  };

  return (
    <div style={{minHeight:'100vh',background:'#05010f',display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
      <div style={{width:'100%',maxWidth:700}}>
        <div style={{textAlign:'center',marginBottom:36}}>
          <div style={{fontSize:26,fontWeight:900,color:'#faf5ff',marginBottom:4}}>NUVORA<span style={{color:'#7c3aed'}}>.</span></div>
          <div style={{fontSize:13,color:C.sub}}>Création du compte club · Étape {step+1}/{steps.length}</div>
        </div>
        {/* Progress */}
        <div style={{display:'flex',gap:8,marginBottom:32}}>
          {steps.map((s,i)=>(
            <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:6}}>
              <div style={{width:'100%',height:3,borderRadius:99,background:i<=step?C.volt:'rgba(255,255,255,.08)',transition:'background .4s'}}/>
              <span style={{fontSize:9,color:i===step?'#a78bfa':i<step?C.sub:C.faint,fontWeight:700,letterSpacing:'0.06em',textAlign:'center'}}>{s.toUpperCase()}</span>
            </div>
          ))}
        </div>

        <div className="gc anim-popIn" style={{padding:32}}>
          {step===0 && (
            <div style={{display:'flex',flexDirection:'column',gap:18}}>
              <div style={{fontSize:18,fontWeight:800,color:C.text,marginBottom:4}}>🏟️ Identité du club</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
                <div><label style={{fontSize:11,color:C.sub,fontWeight:600,letterSpacing:'0.06em',display:'block',marginBottom:6}}>NOM OFFICIEL DU CLUB</label><input className="input-field" defaultValue="Paris Saint-Germain"/></div>
                <div><label style={{fontSize:11,color:C.sub,fontWeight:600,letterSpacing:'0.06em',display:'block',marginBottom:6}}>ACRONYME</label><input className="input-field" defaultValue="PSG" style={{letterSpacing:'0.1em'}}/></div>
                <div><label style={{fontSize:11,color:C.sub,fontWeight:600,letterSpacing:'0.06em',display:'block',marginBottom:6}}>VILLE</label><input className="input-field" defaultValue="Paris"/></div>
                <div><label style={{fontSize:11,color:C.sub,fontWeight:600,letterSpacing:'0.06em',display:'block',marginBottom:6}}>PAYS</label>
                  <select className="select-field"><option>🇫🇷 France</option><option>🇪🇸 Espagne</option><option>🇩🇪 Allemagne</option><option>🇮🇹 Italie</option><option>🏴󠁧󠁢󠁥󠁮󠁧󠁿 Angleterre</option></select></div>
                <div><label style={{fontSize:11,color:C.sub,fontWeight:600,letterSpacing:'0.06em',display:'block',marginBottom:6}}>ANNÉE DE FONDATION</label><input className="input-field" defaultValue="1970"/></div>
                <div><label style={{fontSize:11,color:C.sub,fontWeight:600,letterSpacing:'0.06em',display:'block',marginBottom:6}}>STADE / SALLE</label><input className="input-field" defaultValue="Parc des Princes"/></div>
              </div>
              <div><label style={{fontSize:11,color:C.sub,fontWeight:600,letterSpacing:'0.06em',display:'block',marginBottom:8}}>SPORT PRINCIPAL</label>
                <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                  {SPORTS.map(s=><Chip key={s} active={sport===s} onClick={()=>setSport(s)}>{s}</Chip>)}
                </div>
              </div>
              <div style={{display:'flex',gap:16,alignItems:'flex-end'}}>
                <div style={{flex:1}}><label style={{fontSize:11,color:C.sub,fontWeight:600,letterSpacing:'0.06em',display:'block',marginBottom:8}}>COULEUR PRINCIPALE DU CLUB</label>
                  <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
                    {['#dc2626','#2563eb','#16a34a','#7c3aed','#ea580c','#0891b2','#be185d','#000000'].map(col=>(
                      <div key={col} onClick={()=>setColors(col)} style={{width:32,height:32,borderRadius:8,background:col,cursor:'pointer',border:colors===col?'2px solid #fff':'2px solid transparent',boxShadow:colors===col?`0 0 12px ${col}80`:''}}/>
                    ))}
                  </div>
                </div>
                <div style={{width:80,height:80,borderRadius:20,background:colors,display:'flex',alignItems:'center',justifyContent:'center',fontSize:28,fontWeight:900,color:'#fff',boxShadow:`0 8px 32px ${colors}50`,transition:'all .3s'}}>⚡</div>
              </div>
            </div>
          )}
          {step===1 && (
            <div>
              <div style={{fontSize:18,fontWeight:800,color:C.text,marginBottom:20}}>💎 Choisissez votre formule</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:14}}>
                {PLANS.map(p=>(
                  <div key={p.id} onClick={()=>setPlan(p.id)} style={{padding:'20px',borderRadius:16,border:`2px solid ${plan===p.id?p.color:'rgba(255,255,255,0.06)'}`,background:plan===p.id?`${p.color}0d`:'rgba(255,255,255,.02)',cursor:'pointer',position:'relative',transition:'all .25s'}}>
                    {p.best && <div style={{position:'absolute',top:-10,left:'50%',transform:'translateX(-50%)',background:p.color,color:'#fff',fontSize:9,fontWeight:700,padding:'3px 10px',borderRadius:99,letterSpacing:'0.1em',whiteSpace:'nowrap'}}>RECOMMANDÉ</div>}
                    <div style={{fontSize:13,fontWeight:800,color:p.color,marginBottom:4}}>{p.name}</div>
                    <div style={{fontSize:22,fontWeight:900,color:C.text,marginBottom:2}}>{p.price}<span style={{fontSize:11,fontWeight:400,color:C.sub}}>{p.price!=='Sur devis'?'/mois':''}</span></div>
                    <div style={{fontSize:11,color:C.sub,marginBottom:14}}>{p.desc}</div>
                    {p.features.map((f,i)=><div key={i} style={{display:'flex',alignItems:'center',gap:7,marginBottom:6,fontSize:11,color:C.sub}}><CheckCircle size={10} color={p.color}/>{f}</div>)}
                  </div>
                ))}
              </div>
            </div>
          )}
          {step===2 && (
            <div style={{display:'flex',flexDirection:'column',gap:16}}>
              <div style={{fontSize:18,fontWeight:800,color:C.text,marginBottom:4}}>👤 Compte Administrateur Principal</div>
              <div style={{padding:14,background:'rgba(124,58,237,.08)',border:'1px solid rgba(124,58,237,.2)',borderRadius:12,fontSize:12,color:'#a78bfa'}}>
                <Shield size={12} style={{display:'inline',marginRight:6}}/>L'administrateur aura accès complet à tous les modules et pourra créer les comptes membres.
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
                <div><label style={{fontSize:11,color:C.sub,fontWeight:600,letterSpacing:'0.06em',display:'block',marginBottom:6}}>PRÉNOM</label><input className="input-field" defaultValue="Jean-Pierre"/></div>
                <div><label style={{fontSize:11,color:C.sub,fontWeight:600,letterSpacing:'0.06em',display:'block',marginBottom:6}}>NOM</label><input className="input-field" defaultValue="Dupont"/></div>
                <div><label style={{fontSize:11,color:C.sub,fontWeight:600,letterSpacing:'0.06em',display:'block',marginBottom:6}}>FONCTION</label>
                  <select className="select-field"><option>Directeur Sportif</option><option>Président</option><option>Directeur Général</option><option>DSI</option></select></div>
                <div><label style={{fontSize:11,color:C.sub,fontWeight:600,letterSpacing:'0.06em',display:'block',marginBottom:6}}>TÉLÉPHONE</label><input className="input-field" defaultValue="+33 6 12 34 56 78"/></div>
                <div style={{gridColumn:'1/-1'}}><label style={{fontSize:11,color:C.sub,fontWeight:600,letterSpacing:'0.06em',display:'block',marginBottom:6}}>EMAIL PROFESSIONNEL</label><input className="input-field" defaultValue="j.dupont@psg.fr"/></div>
                <div><label style={{fontSize:11,color:C.sub,fontWeight:600,letterSpacing:'0.06em',display:'block',marginBottom:6}}>MOT DE PASSE</label><input className="input-field" type="password" defaultValue="NuvoraPSG2025!"/></div>
                <div><label style={{fontSize:11,color:C.sub,fontWeight:600,letterSpacing:'0.06em',display:'block',marginBottom:6}}>CONFIRMATION</label><input className="input-field" type="password" defaultValue="NuvoraPSG2025!"/></div>
              </div>
            </div>
          )}
          {step===3 && (
            <div style={{textAlign:'center',padding:'20px 0'}}>
              <div style={{width:80,height:80,margin:'0 auto 20px',borderRadius:'50%',background:'rgba(16,185,129,.12)',border:'2px solid rgba(16,185,129,.4)',display:'flex',alignItems:'center',justifyContent:'center',animation:'heartbeat 1.5s ease infinite'}}>
                <CheckCircle size={36} color={C.emer}/>
              </div>
              <div style={{fontSize:22,fontWeight:800,color:C.text,marginBottom:8}}>Club prêt à l'activation</div>
              <div style={{fontSize:13,color:C.sub,marginBottom:24}}>Paris Saint-Germain · Football · Plan Pro · 100 membres max</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,textAlign:'left',marginBottom:24}}>
                {[['7 modules activés','Brain','#7c3aed'],['Analyse IA temps réel','Cpu','#06b6d4'],['Pitch 3D tactique','Layers','#10b981'],['Réseau intranet club','Users','#f59e0b'],['Caméras intelligentes','Camera','#ea580c'],['Chiffrement AES-256','Shield','#dc2626']].map(([t,I,c])=>(
                  <div key={t} style={{display:'flex',alignItems:'center',gap:10,padding:'12px 14px',background:`${c}0d`,borderRadius:12,border:`1px solid ${c}25`}}>
                    <CheckCircle size={14} color={c}/><span style={{fontSize:12,fontWeight:600,color:C.sub}}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div style={{marginTop:28,display:'flex',justifyContent:'space-between'}}>
            {step>0 ? <button className="btn btn-ghost" onClick={()=>setStep(s=>s-1)}><ArrowRight size={14} style={{transform:'rotate(180deg)'}}/> Retour</button> : <div/>}
            <button className="btn btn-volt" onClick={handleNext} style={{minWidth:160,justifyContent:'center'}}>
              {loading ? <div style={{width:16,height:16,border:'2px solid rgba(255,255,255,.3)',borderTopColor:'#fff',borderRadius:'50%',animation:'spin .7s linear infinite'}}/> : step===steps.length-1 ? <><Unlock size={14}/>Activer l'écosystème</> : <>Suivant <ArrowRight size={14}/></>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  CAMERA SETUP
// ═══════════════════════════════════════════════════════════════════
const CAMERAS = [
  {id:1,name:'Caméra Entraînement A',location:'Terrain Principal',type:'4K PTZ',ip:'192.168.1.41',status:'available'},
  {id:2,name:'Caméra Entraînement B',location:'Terrain Secondaire',type:'4K Fixed',ip:'192.168.1.42',status:'available'},
  {id:3,name:'Caméra Match Principale',location:'Tribune Haute',type:'8K PTZ',ip:'192.168.1.50',status:'available'},
  {id:4,name:'Caméra But Nord',location:'Derrière le but N.',type:'4K Fixed',ip:'192.168.1.51',status:'available'},
  {id:5,name:'Caméra But Sud',location:'Derrière le but S.',type:'4K Fixed',ip:'192.168.1.52',status:'available'},
  {id:6,name:'Caméra Vestiaire',location:'Vestiaire équipe',type:'FHD',ip:'192.168.1.60',status:'available'},
];

function CameraSetup({onDone}) {
  const [cams, setCams] = useState(CAMERAS.map(c=>({...c,state:'idle'})));
  const [done, setDone] = useState(false);

  const connect = (id) => {
    setCams(cs=>cs.map(c=>c.id===id?{...c,state:'connecting'}:c));
    const steps = ['scan','auth','stream'];
    steps.forEach((s,i)=>setTimeout(()=>{
      setCams(cs=>cs.map(c=>c.id===id?{...c,state:i===steps.length-1?'connected':s}:c));
    }, (i+1)*800));
  };

  const allConnected = cams.every(c=>c.state==='connected');

  return (
    <div style={{minHeight:'100vh',background:'#05010f',display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
      <div style={{width:'100%',maxWidth:720}}>
        <div style={{textAlign:'center',marginBottom:32}}>
          <div style={{fontSize:26,fontWeight:900,color:'#faf5ff',marginBottom:4}}>NUVORA<span style={{color:'#7c3aed'}}>.</span></div>
          <div style={{fontSize:16,fontWeight:700,color:C.text,marginBottom:6}}>📹 Configuration des caméras intelligentes</div>
          <div style={{fontSize:13,color:C.sub}}>Connectez vos caméras pour activer l'analyse vidéo temps réel</div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:24}}>
          {cams.map(cam=>(
            <div key={cam.id} className="gc" style={{padding:'16px 20px',display:'flex',alignItems:'center',gap:16}}>
              <div style={{width:44,height:44,borderRadius:12,background:cam.state==='connected'?'rgba(16,185,129,.12)':cam.state==='idle'?'rgba(255,255,255,.04)':'rgba(6,182,212,.1)',border:`1px solid ${cam.state==='connected'?'rgba(16,185,129,.4)':cam.state==='idle'?'rgba(255,255,255,.08)':'rgba(6,182,212,.4)'}`,display:'flex',alignItems:'center',justifyContent:'center',transition:'all .4s',animation:cam.state!=='idle'&&cam.state!=='connected'?'cameraGlow 1s ease infinite':'none'}}>
                <Camera size={20} color={cam.state==='connected'?C.emer:cam.state==='idle'?C.faint:C.cyan}/>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:700,color:C.text}}>{cam.name}</div>
                <div style={{fontSize:11,color:C.sub,marginTop:2}}>{cam.location} · {cam.type} · {cam.ip}</div>
                {cam.state!=='idle'&&cam.state!=='connected'&&(
                  <div style={{marginTop:8}}>
                    <div className="progress-bar" style={{height:3}}>
                      <div style={{height:'100%',borderRadius:99,background:`linear-gradient(90deg,${C.cyan},${C.volt})`,width:cam.state==='scan'?'33%':cam.state==='auth'?'66%':'90%',transition:'width 1s ease'}}/>
                    </div>
                    <div style={{fontSize:9,color:C.cyan,marginTop:4,fontFamily:'JetBrains Mono',letterSpacing:'0.08em'}}>
                      {cam.state==='scan'?'SCAN RÉSEAU...':cam.state==='auth'?'AUTHENTIFICATION...':'FLUX VIDÉO...'}
                    </div>
                  </div>
                )}
              </div>
              <div>
                {cam.state==='idle' && <button className="btn btn-ghost" onClick={()=>connect(cam.id)} style={{fontSize:11,padding:'7px 16px'}}><Wifi size={12}/>Connecter</button>}
                {(cam.state==='scan'||cam.state==='auth'||cam.state==='stream'||cam.state==='connecting') && <div style={{width:20,height:20,border:'2px solid rgba(6,182,212,.3)',borderTopColor:C.cyan,borderRadius:'50%',animation:'spin .7s linear infinite'}}/>}
                {cam.state==='connected' && <Badge color="emer"><CheckCircle size={10}/>EN LIGNE</Badge>}
              </div>
            </div>
          ))}
        </div>
        <div style={{display:'flex',gap:12}}>
          <button className="btn btn-ghost" onClick={()=>cams.forEach(c=>connect(c.id))} style={{flex:1,justifyContent:'center'}}>
            <Wifi size={14}/>Tout connecter
          </button>
          <button className="btn btn-volt" onClick={onDone} style={{flex:1,justifyContent:'center',opacity:allConnected?1:.6}}>
            <ArrowRight size={14}/>{allConnected?'Accéder à l\'écosystème':'Passer cette étape'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  MEMBER CREATION
// ═══════════════════════════════════════════════════════════════════
function MemberSetup({onDone}) {
  const [members, setMembers] = useState([
    {id:1,name:'Carlos Mendes',role:'headcoach',email:'c.mendes@psg.fr',phone:'+33 6 11 22 33 44'},
    {id:2,name:'Dr. Sophie Martin',role:'medical',email:'s.martin@psg.fr',phone:'+33 6 22 33 44 55'},
    {id:3,name:'Lucas Fontaine',role:'analyst',email:'l.fontaine@psg.fr',phone:'+33 6 33 44 55 66'},
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newRole, setNewRole] = useState('athlete');
  const [newName, setNewName] = useState('');

  const addMember = () => {
    if(!newName) return;
    setMembers(m=>[...m,{id:Date.now(),name:newName,role:newRole,email:`${newName.toLowerCase().replace(' ','.')}@psg.fr`,phone:'+33 6 00 00 00 00'}]);
    setNewName(''); setShowForm(false);
  };

  return (
    <div style={{minHeight:'100vh',background:'#05010f',display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
      <div style={{width:'100%',maxWidth:700}}>
        <div style={{textAlign:'center',marginBottom:32}}>
          <div style={{fontSize:26,fontWeight:900,color:'#faf5ff',marginBottom:4}}>NUVORA<span style={{color:'#7c3aed'}}>.</span></div>
          <div style={{fontSize:16,fontWeight:700,color:C.text,marginBottom:6}}>👥 Membres du club</div>
          <div style={{fontSize:13,color:C.sub}}>Créez les comptes de votre staff et de vos joueurs</div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:16}}>
          {members.map((m,i)=>{
            const R = ROLES[m.role];
            return (
              <div key={m.id} className="gc anim-fadeUp" style={{padding:'14px 18px',display:'flex',alignItems:'center',gap:14,animationDelay:`${i*80}ms`}}>
                <div style={{width:40,height:40,borderRadius:12,background:`${R.color}18`,border:`1px solid ${R.color}35`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>{R.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:700,color:C.text}}>{m.name}</div>
                  <div style={{fontSize:11,color:C.sub,marginTop:1}}>{m.email} · {m.phone}</div>
                </div>
                <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:5}}>
                  <span className="badge" style={{background:`${R.color}12`,border:`1px solid ${R.color}30`,color:R.color}}>{R.label.toUpperCase()}</span>
                  <span style={{fontSize:10,color:C.faint}}>{ROLES[m.role].modules.length} modules</span>
                </div>
              </div>
            );
          })}
        </div>
        {showForm && (
          <div className="gc anim-fadeUp" style={{padding:'18px',marginBottom:14}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}}>
              <div><label style={{fontSize:11,color:C.sub,fontWeight:600,letterSpacing:'0.06em',display:'block',marginBottom:5}}>NOM COMPLET</label><input className="input-field" value={newName} onChange={e=>setNewName(e.target.value)} placeholder="Prénom Nom"/></div>
              <div><label style={{fontSize:11,color:C.sub,fontWeight:600,letterSpacing:'0.06em',display:'block',marginBottom:5}}>RÔLE</label>
                <select className="select-field" value={newRole} onChange={e=>setNewRole(e.target.value)}>
                  {Object.entries(ROLES).map(([k,v])=><option key={k} value={k}>{v.icon} {v.label}</option>)}
                </select>
              </div>
            </div>
            {newRole && <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:12}}>
              {ROLES[newRole].modules.map(mod=><span key={mod} className="badge" style={{background:'rgba(124,58,237,.1)',border:'1px solid rgba(124,58,237,.25)',color:'#a78bfa'}}>{mod}</span>)}
            </div>}
            <div style={{display:'flex',gap:8}}>
              <button className="btn btn-volt" onClick={addMember} style={{fontSize:12,padding:'8px 18px'}}><Plus size={12}/>Créer le compte</button>
              <button className="btn btn-ghost" onClick={()=>setShowForm(false)} style={{fontSize:12,padding:'8px 18px'}}>Annuler</button>
            </div>
          </div>
        )}
        <div style={{display:'flex',gap:10}}>
          <button className="btn btn-ghost" onClick={()=>setShowForm(!showForm)} style={{flex:1,justifyContent:'center',fontSize:12}}><Plus size={13}/>Ajouter un membre</button>
          <button className="btn btn-volt" onClick={onDone} style={{flex:1,justifyContent:'center',fontSize:12}}><Zap size={13}/>Lancer l'écosystème ({members.length} membres)</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  3D TACTICAL PITCH COMPONENT
// ═══════════════════════════════════════════════════════════════════
function TacticalPitch3D({mode='training', showHeat=false, showFormation=true}) {
  const canvasRef = useRef();
  const animRef = useRef();
  const stateRef = useRef({
    players: PLAYERS_DATA.map(p=>({...p,cx:p.bx,cy:p.by,tx:p.bx,ty:p.by})),
    ball:{x:0.5,y:0.5,tx:0.5,ty:0.5},
    t:0
  });

  useEffect(()=>{
    const canvas = canvasRef.current; if(!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;
    const s = stateRef.current;

    const POS_COLORS = {ATT:'#f87171',MID:'#60a5fa',DEF:'#34d399',GK:'#fbbf24'};

    function drawPitch(){
      // Grass stripes
      for(let i=0;i<8;i++){
        ctx.fillStyle = i%2===0?'#1a5c2a':'#1d6430';
        ctx.fillRect(0, i*(H/8), W, H/8);
      }
      ctx.strokeStyle='rgba(255,255,255,0.75)';
      ctx.lineWidth=1.5;
      // Outer border
      ctx.strokeRect(10,10,W-20,H-20);
      // Center line
      ctx.beginPath(); ctx.moveTo(W/2,10); ctx.lineTo(W/2,H-10); ctx.stroke();
      // Center circle
      ctx.beginPath(); ctx.arc(W/2,H/2,Math.min(W,H)*0.12,0,Math.PI*2); ctx.stroke();
      // Center dot
      ctx.beginPath(); ctx.arc(W/2,H/2,3,0,Math.PI*2); ctx.fillStyle='rgba(255,255,255,0.8)'; ctx.fill();
      // Penalty areas
      const pa=W*0.15, ph=H*0.35, pad=H*0.325;
      ctx.strokeRect(10, pad, pa, ph);
      ctx.strokeRect(W-10-pa, pad, pa, ph);
      // Goal areas
      const ga=pa*0.45, gh=H*0.2, gad=(H-gh)/2;
      ctx.strokeRect(10, gad, ga, gh);
      ctx.strokeRect(W-10-ga, gad, ga, gh);
      // Penalty spots
      ctx.beginPath(); ctx.arc(10+pa*0.65,H/2,3,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(W-10-pa*0.65,H/2,3,0,Math.PI*2); ctx.fill();
      // Penalty arc
      ctx.beginPath(); ctx.arc(10+pa*0.65,H/2,Math.min(W,H)*0.1,Math.PI*0.25,Math.PI*1.75); ctx.stroke();
      ctx.beginPath(); ctx.arc(W-10-pa*0.65,H/2,Math.min(W,H)*0.1,Math.PI*1.25,Math.PI*0.75); ctx.stroke();
      // Goals
      ctx.strokeStyle='rgba(255,255,255,0.9)'; ctx.lineWidth=2;
      ctx.strokeRect(0,gad,10,gh); ctx.strokeRect(W-10,gad,10,gh);
    }

    function drawHeatMap(){
      const zones = [{x:0.25,y:0.5,r:0.18,c:'rgba(234,88,12,.22)'},{x:0.75,y:0.5,r:0.22,c:'rgba(220,38,38,.18)'},{x:0.5,y:0.25,r:0.14,c:'rgba(245,158,11,.20)'},{x:0.5,y:0.75,r:0.14,c:'rgba(245,158,11,.18)'},{x:0.15,y:0.5,r:0.12,c:'rgba(234,88,12,.15)'}];
      zones.forEach(z=>{
        const grd = ctx.createRadialGradient(z.x*W,z.y*H,0,z.x*W,z.y*H,z.r*W);
        grd.addColorStop(0,z.c); grd.addColorStop(1,'transparent');
        ctx.fillStyle=grd; ctx.fillRect(0,0,W,H);
      });
    }

    function drawFormationLines(players){
      const byPos = {ATT:[],MID:[],DEF:[],GK:[]};
      players.forEach(p=>byPos[p.pos].push(p));
      Object.entries(byPos).forEach(([pos,ps])=>{
        if(ps.length<2) return;
        ctx.strokeStyle=pos==='ATT'?'rgba(248,113,113,.25)':pos==='MID'?'rgba(96,165,250,.25)':pos==='DEF'?'rgba(52,211,153,.25)':'rgba(251,191,36,.25)';
        ctx.lineWidth=1;
        ctx.setLineDash([4,4]);
        ctx.beginPath();
        ps.sort((a,b)=>a.cy-b.cy).forEach((p,i)=>{
          if(i===0) ctx.moveTo(p.cx*W, p.cy*H);
          else ctx.lineTo(p.cx*W, p.cy*H);
        });
        ctx.stroke(); ctx.setLineDash([]);
      });
    }

    function drawPlayer(p){
      const x=p.cx*W, y=p.cy*H, r=14;
      // Shadow
      ctx.beginPath(); ctx.ellipse(x,y+r,r*0.7,r*0.25,0,0,Math.PI*2);
      ctx.fillStyle='rgba(0,0,0,.35)'; ctx.fill();
      // Circle
      ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2);
      const grd=ctx.createRadialGradient(x-3,y-3,1,x,y,r);
      const pc = POS_COLORS[p.pos]||'#a78bfa';
      grd.addColorStop(0,'rgba(255,255,255,0.3)'); grd.addColorStop(1,pc+'dd');
      ctx.fillStyle=grd; ctx.fill();
      ctx.strokeStyle='rgba(255,255,255,0.8)'; ctx.lineWidth=1.5; ctx.stroke();
      // Number
      ctx.fillStyle='#fff'; ctx.font=`bold 9px 'JetBrains Mono'`;
      ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(p.num, x, y);
      // Name label
      ctx.font=`600 8px 'Syne'`; ctx.fillStyle='rgba(255,255,255,0.85)';
      ctx.fillText(p.name.split(' ')[1]||p.name, x, y+r+9);
      // Fatigue ring if high
      if(p.fatigue>50){
        ctx.beginPath(); ctx.arc(x,y,r+3,0,Math.PI*2*(p.fatigue/100));
        ctx.strokeStyle='rgba(248,113,113,0.7)'; ctx.lineWidth=2; ctx.stroke();
      }
    }

    function drawBall(ball){
      const x=ball.x*W, y=ball.y*H, r=8;
      ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2);
      const grd=ctx.createRadialGradient(x-2,y-2,1,x,y,r);
      grd.addColorStop(0,'#ffffff'); grd.addColorStop(0.6,'#e0e0e0'); grd.addColorStop(1,'#a0a0a0');
      ctx.fillStyle=grd; ctx.fill();
      ctx.strokeStyle='rgba(0,0,0,.5)'; ctx.lineWidth=1; ctx.stroke();
      // Ball glow
      ctx.shadowColor='rgba(255,255,255,0.6)'; ctx.shadowBlur=10;
      ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.stroke();
      ctx.shadowBlur=0;
    }

    function getTrainingPos(p, t) {
      const base = {x:p.bx*W, y:p.by*H};
      const drill = Math.sin(t*0.8+p.id) * 25;
      const drill2 = Math.cos(t*0.6+p.id*0.7) * 20;
      if(p.pos==='ATT') return {x:base.x+Math.sin(t*1.2+p.id)*30,y:base.y+Math.cos(t*0.9+p.id)*25};
      if(p.pos==='MID') return {x:base.x+drill,y:base.y+drill2};
      if(p.pos==='DEF') return {x:base.x+Math.sin(t*0.7+p.id)*15,y:base.y+Math.cos(t*0.5+p.id)*10};
      return base;
    }

    function animate(){
      s.t += 0.012;
      ctx.clearRect(0,0,W,H);
      drawPitch();
      if(showHeat) drawHeatMap();
      if(showFormation) drawFormationLines(s.players);

      s.players.forEach(p=>{
        const target = mode==='training'
          ? getTrainingPos(p, s.t)
          : {x:(p.bx+(Math.sin(s.t*0.5+p.id)*0.06))*W, y:(p.by+(Math.cos(s.t*0.4+p.id*1.1)*0.04))*H};
        p.cx += (target.x/W - p.cx) * 0.04;
        p.cy += (target.y/H - p.cy) * 0.04;
        drawPlayer(p);
      });

      // Ball movement
      if(mode==='match'){
        s.ball.tx = 0.5+Math.sin(s.t*0.7)*0.3;
        s.ball.ty = 0.5+Math.cos(s.t*0.9)*0.25;
      } else {
        s.ball.tx = 0.5+Math.sin(s.t*1.2)*0.12;
        s.ball.ty = 0.5+Math.cos(s.t*0.8)*0.1;
      }
      s.ball.x += (s.ball.tx - s.ball.x)*0.05;
      s.ball.y += (s.ball.ty - s.ball.y)*0.05;
      drawBall(s.ball);

      animRef.current = requestAnimationFrame(animate);
    }
    animate();
    return ()=>cancelAnimationFrame(animRef.current);
  },[mode, showHeat, showFormation]);

  return (
    <div style={{perspective:'1200px',perspectiveOrigin:'50% -10%',position:'relative'}}>
      <div style={{transform:'rotateX(42deg)',transformOrigin:'50% 50%',borderRadius:8,overflow:'hidden',boxShadow:'0 60px 120px rgba(0,0,0,0.9), 0 0 0 2px rgba(255,255,255,0.1)'}}>
        <canvas ref={canvasRef} style={{display:'block',width:'100%',height:300}}/>
      </div>
      {/* Position legend */}
      <div style={{position:'absolute',top:12,right:12,display:'flex',flexDirection:'column',gap:4}}>
        {[['ATT','#f87171','Attaquant'],['MID','#60a5fa','Milieu'],['DEF','#34d399','Défenseur'],['GK','#fbbf24','Gardien']].map(([pos,col,label])=>(
          <div key={pos} style={{display:'flex',alignItems:'center',gap:5,background:'rgba(0,0,0,.6)',padding:'3px 8px',borderRadius:6}}>
            <div style={{width:8,height:8,borderRadius:'50%',background:col}}/>
            <span style={{fontSize:9,color:'rgba(255,255,255,.7)',fontFamily:'JetBrains Mono'}}>{pos}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  DASHBOARD MODULE
// ═══════════════════════════════════════════════════════════════════
function DashboardModule() {
  const [alive, setAlive] = useState(true);
  useEffect(()=>{const i=setInterval(()=>setAlive(a=>!a),1200);return()=>clearInterval(i);},[]);
  return (
    <div style={{padding:'28px 32px',height:'100%',overflowY:'auto'}} className="scrollable">
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:28}}>
        <div>
          <div style={{fontSize:22,fontWeight:900,color:C.text}}>Tableau de bord <span style={{color:'#7c3aed'}}>PSG</span></div>
          <div style={{fontSize:12,color:C.sub,marginTop:3}}>Vue globale de l'écosystème · {new Date().toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'})}</div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{width:8,height:8,borderRadius:'50%',background:C.emer,animation:'pulse 1.2s ease infinite'}}/>
          <span style={{fontSize:11,color:C.emer,fontWeight:700,fontFamily:'JetBrains Mono'}}>LIVE</span>
          <span style={{fontSize:11,color:C.sub}}>{new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})}</span>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginBottom:20}}>
        <MetricCard label="Joueurs actifs" value="28" icon={<Users size={16}/>} color={C.volt} delta={3} delay={0}/>
        <MetricCard label="Forme globale" value="87" unit="/100" icon={<Zap size={16}/>} color={C.emer} delta={2.4} delay={80}/>
        <MetricCard label="Risque blessure" value="2" unit="joueurs" icon={<AlertTriangle size={16}/>} color={C.amber} delta={-1} delay={160}/>
        <MetricCard label="Prochain match" value="3" unit="jours" icon={<Clock size={16}/>} color={C.cyan} delay={240}/>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'2fr 1.2fr',gap:16,marginBottom:16}}>
        <div className="gc" style={{padding:'20px 24px'}}>
          <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:16,display:'flex',alignItems:'center',gap:8}}>
            <BarChart2 size={14} color={C.volt}/> Charge & Forme — 12 semaines
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <ComposedChart data={PERF_CHART} margin={{top:4,right:4,left:-20,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.05)"/>
              <XAxis dataKey="sem" tick={{fill:C.sub,fontSize:9}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:C.sub,fontSize:9}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{background:'rgba(10,4,22,.98)',border:'1px solid rgba(124,58,237,.3)',borderRadius:10,fontFamily:'Syne',fontSize:11}}/>
              <Area type="monotone" dataKey="charge" fill="rgba(234,88,12,.15)" stroke={C.emb} strokeWidth={2}/>
              <Line type="monotone" dataKey="forme" stroke={C.volt} strokeWidth={2} dot={false}/>
              <Line type="monotone" dataKey="wellbeing" stroke={C.emer} strokeWidth={1.5} dot={false} strokeDasharray="4 2"/>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="gc" style={{padding:'20px 24px'}}>
          <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:16,display:'flex',alignItems:'center',gap:8}}>
            <Crosshair size={14} color={C.cyan}/> Analyse tactique équipe
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <RadarChart data={RADAR_TEAM} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="rgba(255,255,255,.08)"/>
              <PolarAngleAxis dataKey="sub" tick={{fill:C.sub,fontSize:9}}/>
              <Radar name="PSG" dataKey="A" stroke={C.volt} fill={C.volt} fillOpacity={.22} strokeWidth={2}/>
              <Radar name="Adverse" dataKey="B" stroke={C.crim} fill={C.crim} fillOpacity={.1} strokeWidth={1.5} strokeDasharray="4 2"/>
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Alerts */}
      <div className="gc" style={{padding:'16px 20px'}}>
        <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:12,display:'flex',alignItems:'center',gap:8}}><Bell size={14} color={C.amber}/>Alertes & Recommandations IA</div>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {[
            {t:'BLESSURE',msg:'R. Benzara — ACWR 1.82 · Mise au repos recommandée 48h',c:C.crim,icon:'🔴'},
            {t:'PERFORMANCE',msg:'A. Moreau — Forme exceptionnelle (96/100) · Titulaire recommandé',c:C.emer,icon:'🟢'},
            {t:'CHARGE',msg:'C. Alvarez — Charge cumulée élevée · Réduire intensité demain',c:C.amber,icon:'🟡'},
            {t:'RÉCUPÉRATION',msg:'Séance de récupération active recommandée pour 8 joueurs',c:C.cyan,icon:'🔵'},
          ].map((a,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 14px',background:`${a.c}08`,border:`1px solid ${a.c}20`,borderRadius:10}}>
              <span style={{fontSize:16}}>{a.icon}</span>
              <div style={{flex:1}}>
                <span className="badge" style={{background:`${a.c}15`,border:`1px solid ${a.c}30`,color:a.c,marginRight:8}}>{a.t}</span>
                <span style={{fontSize:11,color:C.sub}}>{a.msg}</span>
              </div>
              <Brain size={14} color={a.c} style={{opacity:.6}}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  TRAINING MODULE
// ═══════════════════════════════════════════════════════════════════
function TrainingModule() {
  const [showHeat, setShowHeat] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [sessionRunning, setSessionRunning] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [activePlayer, setActivePlayer] = useState(PLAYERS_DATA[0]);
  useEffect(()=>{
    if(!sessionRunning) return;
    const i = setInterval(()=>setElapsed(e=>e+1),1000);
    return()=>clearInterval(i);
  },[sessionRunning]);
  const fmt = s=>`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  return (
    <div style={{padding:'24px 28px',height:'100%',overflow:'hidden',display:'flex',flexDirection:'column',gap:16}}>
      {/* Header */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexShrink:0}}>
        <div>
          <div style={{fontSize:20,fontWeight:900,color:C.text,display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:10,height:10,borderRadius:'50%',background:sessionRunning?C.emer:C.faint,animation:sessionRunning?'pulse 1s ease infinite':''}}/>
            Entraînement en cours
          </div>
          <div style={{fontSize:11,color:C.sub,marginTop:2}}>Séance de préparation physique · Terrain principal</div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div className="mono" style={{fontSize:22,fontWeight:700,color:sessionRunning?C.emer:C.sub}}>{fmt(elapsed)}</div>
          <button className="btn btn-ghost" onClick={()=>setSessionRunning(r=>!r)} style={{fontSize:12,padding:'8px 16px'}}>
            {sessionRunning?<><Pause size={12}/>Pause</>:<><Play size={12}/>Reprendre</>}
          </button>
          <Chip active={showHeat} onClick={()=>setShowHeat(h=>!h)} color="emb">🔥 Heatmap</Chip>
          <Chip active={showForm} onClick={()=>setShowForm(f=>!f)}>📐 Formation</Chip>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 340px',gap:14,flex:1,overflow:'hidden'}}>
        {/* Pitch */}
        <div style={{display:'flex',flexDirection:'column',gap:12,overflow:'hidden'}}>
          <div className="gc" style={{padding:'16px'}}>
            <TacticalPitch3D mode="training" showHeat={showHeat} showFormation={showForm}/>
          </div>
          {/* Live sensors */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}}>
            {[
              {label:'Distance moy.',value:'4.2 km',icon:<Gauge size={14}/>,c:C.volt},
              {label:'FC moyenne',value:'158 bpm',icon:<Heart size={14}/>,c:C.crim},
              {label:'Vitesse max',value:'31.8 km/h',icon:<Zap size={14}/>,c:C.amber},
              {label:'Accélérations',value:'47',icon:<TrendingUp size={14}/>,c:C.emer},
            ].map((m,i)=>(
              <div key={i} className="gc" style={{padding:'12px 14px',display:'flex',alignItems:'center',gap:10}}>
                <div style={{color:m.c}}>{m.icon}</div>
                <div><div className="mono" style={{fontSize:14,fontWeight:700,color:C.text}}>{m.value}</div>
                  <div style={{fontSize:9,color:C.sub,fontWeight:600,letterSpacing:'0.06em'}}>{m.label.toUpperCase()}</div></div>
              </div>
            ))}
          </div>
        </div>
        {/* Right panel */}
        <div style={{display:'flex',flexDirection:'column',gap:10,overflowY:'auto'}} className="scrollable">
          {/* AI analysis live */}
          <div className="lava"><div className="lava-i" style={{padding:'14px 16px'}}>
            <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:12}}>
              <Brain size={14} color={C.volt}/><span style={{fontSize:11,fontWeight:700,color:C.voltL,letterSpacing:'0.06em'}}>ANALYSE IA · TEMPS RÉEL</span>
              <div style={{marginLeft:'auto',width:7,height:7,borderRadius:'50%',background:C.emer,animation:'pulse 1s ease infinite'}}/>
            </div>
            {['Détection geste: foulée asymétrique K. Silva (risque genou +34%)',
              'Intensité globale: Zone 3 (83%) — Cohérente avec objectif séance',
              'R. Benzara : FC trop élevée pour la phase de récupération. Ralentir.',
              'Correction recommandée : A. Moreau — posture tir : épaule gauche basse'
             ].map((txt,i)=>(
              <div key={i} style={{display:'flex',gap:8,marginBottom:8,padding:'8px 10px',background:'rgba(0,0,0,.3)',borderRadius:8}}>
                <Sparkles size={10} color={C.voltL} style={{marginTop:2,flexShrink:0}}/>
                <span style={{fontSize:10,color:C.sub,lineHeight:1.5}}>{txt}</span>
              </div>
            ))}
          </div></div>
          {/* Player cards */}
          <div className="gc" style={{padding:'14px 16px'}}>
            <div style={{fontSize:11,fontWeight:700,color:C.sub,letterSpacing:'0.06em',marginBottom:10}}>JOUEURS · ÉTAT TEMPS RÉEL</div>
            <div style={{display:'flex',flexDirection:'column',gap:6}}>
              {PLAYERS_DATA.slice(0,7).map(p=>(
                <div key={p.id} onClick={()=>setActivePlayer(p)} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 10px',borderRadius:10,cursor:'pointer',background:activePlayer?.id===p.id?'rgba(124,58,237,.1)':'transparent',border:`1px solid ${activePlayer?.id===p.id?'rgba(124,58,237,.3)':'transparent'}`,transition:'all .2s'}}>
                  <div style={{width:28,height:28,borderRadius:8,background:`${p.risk==='high'?'rgba(220,38,38,.15)':p.risk==='med'?'rgba(245,158,11,.15)':'rgba(16,185,129,.12)'}`,border:`1px solid ${p.risk==='high'?'rgba(220,38,38,.4)':p.risk==='med'?'rgba(245,158,11,.35)':'rgba(16,185,129,.3)'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,color:p.risk==='high'?C.crim:p.risk==='med'?C.amber:C.emer,fontFamily:'JetBrains Mono'}}>{p.num}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:11,fontWeight:700,color:C.text,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{p.name}</div>
                    <div style={{height:3,background:'rgba(255,255,255,.06)',borderRadius:99,marginTop:4,overflow:'hidden'}}>
                      <div style={{height:'100%',width:`${p.wellness}%`,background:p.risk==='high'?C.crim:p.risk==='med'?C.amber:C.emer,borderRadius:99,transition:'width .4s'}}/>
                    </div>
                  </div>
                  <span style={{fontSize:10,fontFamily:'JetBrains Mono',color:p.risk==='high'?C.crim:p.risk==='med'?C.amber:C.emer,fontWeight:700}}>{p.wellness}%</span>
                </div>
              ))}
            </div>
          </div>
          {/* Video detection */}
          <div className="gc" style={{padding:'14px 16px'}}>
            <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:10}}>
              <Camera size={13} color={C.cyan}/><span style={{fontSize:11,fontWeight:700,color:C.sub,letterSpacing:'0.06em'}}>DÉTECTION VIDÉO IA</span>
            </div>
            <div className="camera-feed" style={{height:90,display:'flex',alignItems:'center',justifyContent:'center',position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,#0a1a0a,#0d2010)',opacity:.9}}/>
              <div style={{position:'absolute',top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${C.cyan},transparent)`,animation:'scanLine 2s linear infinite'}}/>
              <div style={{position:'relative',textAlign:'center'}}>
                <div style={{fontSize:9,fontFamily:'JetBrains Mono',color:C.cyan,letterSpacing:'0.12em'}}>TRACKING ACTIF · 11 JOUEURS</div>
                <div style={{fontSize:8,color:'rgba(6,182,212,.5)',marginTop:3}}>YOLOv8 · MediaPipe Pose · 30fps</div>
                <div style={{display:'flex',gap:6,justifyContent:'center',marginTop:6}}>
                  {['POSTURE','SPRINT','DISTANCE','ZONE'].map(t=><span key={t} className="badge" style={{background:'rgba(6,182,212,.1)',border:'1px solid rgba(6,182,212,.25)',color:C.cyanL,fontSize:7}}>{t}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  MATCH MODULE
// ═══════════════════════════════════════════════════════════════════
function MatchModule() {
  const [matchTime, setMatchTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState([0,0]);
  const [events, setEvents] = useState([]);
  const [aiMsgs, setAiMsgs] = useState([]);
  const [aiTyping, setAiTyping] = useState(false);
  const [userMsg, setUserMsg] = useState('');
  const [showHeat, setShowHeat] = useState(false);
  const chatRef = useRef();

  const pushAI = useCallback(txt=>{
    setAiTyping(true);
    setTimeout(()=>{
      setAiTyping(false);
      setAiMsgs(m=>[...m,{from:'ai',txt,t:Date.now()}]);
      setTimeout(()=>chatRef.current?.scrollTo({top:99999,behavior:'smooth'}),100);
    },1200+Math.random()*600);
  },[]);

  useEffect(()=>{
    if(!playing) return;
    const i = setInterval(()=>{
      setMatchTime(t=>{
        const nt = t+1;
        MATCH_EVENTS.forEach(ev=>{
          if(ev.t===nt){ setEvents(es=>[ev,...es]); if(ev.score) setScore(ev.score); }
        });
        AI_MESSAGES.forEach(am=>{
          if(am.t===nt) pushAI(am.txt);
        });
        if(nt>=90) { setPlaying(false); return 90; }
        return nt;
      });
    },400);
    return()=>clearInterval(i);
  },[playing,pushAI]);

  const sendMsg = () => {
    if(!userMsg.trim()) return;
    const q = userMsg;
    setAiMsgs(m=>[...m,{from:'user',txt:q,t:Date.now()}]);
    setUserMsg('');
    pushAI(`Analyse en cours pour: "${q}". Selon les données GPS et vidéo temps réel, recommandation: adapter le bloc défensif et augmenter la pression sur le côté gauche adverse. Win probability actuelle: ${score[0]>score[1]?'78':'51'}%.`);
  };

  const homeWin = score[0]>score[1];

  return (
    <div style={{padding:'20px 24px',height:'100%',overflow:'hidden',display:'flex',flexDirection:'column',gap:12}}>
      {/* Score bar */}
      <div className="gc" style={{padding:'14px 24px',flexShrink:0,background:`linear-gradient(135deg,rgba(124,58,237,0.12),rgba(220,38,38,0.08))`}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div style={{width:36,height:36,borderRadius:10,background:'rgba(220,38,38,.2)',border:'1px solid rgba(220,38,38,.4)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>⭐</div>
            <div><div style={{fontSize:14,fontWeight:800,color:C.text}}>PSG</div><div style={{fontSize:10,color:C.sub}}>Domicile</div></div>
          </div>
          <div style={{textAlign:'center',flex:1}}>
            <div style={{fontSize:32,fontWeight:900,color:C.text,fontFamily:'JetBrains Mono',letterSpacing:'-0.02em'}}>
              {score[0]} <span style={{color:C.faint,fontSize:20}}>–</span> {score[1]}
            </div>
            <div style={{display:'flex',alignItems:'center',gap:8,justifyContent:'center',marginTop:4}}>
              {playing ? <>
                <div style={{width:8,height:8,borderRadius:'50%',background:C.emer,animation:'pulse .8s ease infinite'}}/>
                <span className="mono" style={{fontSize:14,color:C.emer,fontWeight:700}}>{matchTime}'</span>
              </> : matchTime===0 ? <span style={{fontSize:11,color:C.sub}}>Coup d'envoi</span> : matchTime>=90 ? <span className="badge" style={{background:'rgba(16,185,129,.1)',border:'1px solid rgba(16,185,129,.3)',color:C.emer}}>MATCH TERMINÉ</span> : <span className="mono" style={{fontSize:14,color:C.amber}}>{matchTime}' (PAUSE)</span>}
            </div>
          </div>
          <div style={{textAlign:'right',display:'flex',flexDirection:'row-reverse',alignItems:'center',gap:12}}>
            <div style={{width:36,height:36,borderRadius:10,background:'rgba(6,182,212,.15)',border:'1px solid rgba(6,182,212,.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>🦁</div>
            <div><div style={{fontSize:14,fontWeight:800,color:C.text}}>Marseille</div><div style={{fontSize:10,color:C.sub}}>Visiteur</div></div>
          </div>
        </div>
        {/* Win probability bar */}
        <div style={{marginTop:12}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
            <span style={{fontSize:9,color:C.sub,fontFamily:'JetBrains Mono'}}>WIN PROBABILITY</span>
            <span style={{fontSize:9,color:C.sub,fontFamily:'JetBrains Mono'}}>{homeWin||score[0]===score[1]?`PSG: ${Math.min(95,50+score[0]*18-score[1]*12+matchTime*0.1).toFixed(1)}%`:`Marseille: ${(50+score[1]*18-score[0]*12).toFixed(1)}%`}</span>
          </div>
          <div style={{height:6,borderRadius:99,background:'rgba(255,255,255,.08)',overflow:'hidden'}}>
            <div style={{height:'100%',width:`${Math.min(95,50+score[0]*18-score[1]*12+matchTime*0.1)}%`,background:`linear-gradient(90deg,${C.volt},${C.crim})`,borderRadius:99,transition:'width 1.5s ease'}}/>
          </div>
        </div>
        <div style={{display:'flex',gap:10,marginTop:10,justifyContent:'center'}}>
          <button className="btn btn-volt" onClick={()=>setPlaying(p=>!p)} style={{fontSize:11,padding:'7px 18px'}}>
            {playing?<><Pause size={11}/>Pause</>:<><Play size={11}/>{matchTime===0?'Coup d\'envoi':'Reprendre'}</>}
          </button>
          <button className="btn btn-ghost" onClick={()=>{setMatchTime(0);setPlaying(false);setScore([0,0]);setEvents([]);setAiMsgs([]);}} style={{fontSize:11,padding:'7px 14px'}}><RefreshCw size={11}/>Reset</button>
          <Chip active={showHeat} onClick={()=>setShowHeat(h=>!h)} color="emb">🔥 Heatmap</Chip>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 380px',gap:12,flex:1,overflow:'hidden',minHeight:0}}>
        {/* Left: pitch + events */}
        <div style={{display:'flex',flexDirection:'column',gap:10,overflow:'hidden'}}>
          <div className="gc" style={{padding:14,flexShrink:0}}>
            <TacticalPitch3D mode="match" showHeat={showHeat} showFormation={true}/>
          </div>
          {/* Events feed */}
          <div className="gc" style={{padding:'14px 16px',flex:1,overflowY:'auto'}} ref={e=>{}}>
            <div style={{fontSize:11,fontWeight:700,color:C.sub,letterSpacing:'0.06em',marginBottom:8}}>ÉVÉNEMENTS DU MATCH</div>
            <div style={{display:'flex',flexDirection:'column',gap:6}}>
              {events.length===0 && <div style={{fontSize:11,color:C.faint,textAlign:'center',padding:'20px 0'}}>En attente du coup d'envoi...</div>}
              {events.map((ev,i)=>(
                <div key={i} className="anim-fadeUp" style={{display:'flex',alignItems:'center',gap:10,padding:'7px 10px',background:ev.team==='home'?'rgba(124,58,237,.07)':ev.team==='away'?'rgba(220,38,38,.07)':'rgba(255,255,255,.03)',borderRadius:8}}>
                  <span className="mono" style={{fontSize:9,color:C.sub,minWidth:20}}>{ev.t}'</span>
                  <span style={{fontSize:14}}>{ev.icon}</span>
                  <span style={{fontSize:11,color:ev.team==='home'?C.voltL:ev.team==='away'?C.crimL:C.sub}}>{ev.msg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: AI Coach chat */}
        <div style={{display:'flex',flexDirection:'column',gap:0,overflow:'hidden'}}>
          <div className="lava" style={{flex:1,display:'flex',flexDirection:'column',minHeight:0}}>
            <div className="lava-i" style={{flex:1,display:'flex',flexDirection:'column',padding:'14px 16px',minHeight:0}}>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12,flexShrink:0}}>
                <div style={{width:32,height:32,borderRadius:10,background:'rgba(124,58,237,.2)',border:'1px solid rgba(124,58,237,.4)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <Brain size={16} color={C.voltL}/>
                </div>
                <div>
                  <div style={{fontSize:12,fontWeight:700,color:C.voltL}}>Coach IA · Nuvora Oracle</div>
                  <div style={{fontSize:9,color:C.sub}}>Connecté aux caméras + GPS + Biomécaniques</div>
                </div>
                <div style={{marginLeft:'auto',width:7,height:7,borderRadius:'50%',background:C.emer,animation:'pulse .8s ease infinite'}}/>
              </div>
              <div ref={chatRef} style={{flex:1,overflowY:'auto',display:'flex',flexDirection:'column',gap:8,minHeight:0}} className="scrollable">
                <div style={{padding:'10px 12px',background:'rgba(124,58,237,.1)',borderRadius:10,fontSize:11,color:C.voltL}}>
                  <Brain size={10} style={{display:'inline',marginRight:5}}/>Système connecté. Je surveille les 11 joueurs via 3 caméras. Données GPS actives. Prêt pour l'analyse temps réel.
                </div>
                {aiMsgs.map((m,i)=>(
                  <div key={i} className="anim-chatIn" style={{display:'flex',justifyContent:m.from==='user'?'flex-end':'flex-start'}}>
                    <div style={{maxWidth:'85%',padding:'9px 12px',borderRadius:12,fontSize:10,lineHeight:1.5,background:m.from==='user'?'rgba(124,58,237,.2)':'rgba(255,255,255,.05)',color:m.from==='user'?C.voltL:C.sub,border:`1px solid ${m.from==='user'?'rgba(124,58,237,.3)':'rgba(255,255,255,.06)'}`,animation:'chatIn .3s ease'}}>
                      {m.from==='ai'&&<><Brain size={9} style={{display:'inline',marginRight:4}}/></>}{m.txt}
                    </div>
                  </div>
                ))}
                {aiTyping && (
                  <div style={{display:'flex',gap:4,padding:'8px 12px',background:'rgba(255,255,255,.04)',borderRadius:10,width:'fit-content'}}>
                    {[0,1,2].map(i=><div key={i} style={{width:5,height:5,borderRadius:'50%',background:C.voltL,animation:`pulse .8s ease ${i*0.15}s infinite`}}/>)}
                  </div>
                )}
              </div>
              <div style={{display:'flex',gap:8,marginTop:10,flexShrink:0}}>
                <input className="input-field" value={userMsg} onChange={e=>setUserMsg(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendMsg()} placeholder="Interroger l'IA coach..." style={{fontSize:11,padding:'9px 12px'}}/>
                <button className="btn btn-volt" onClick={sendMsg} style={{padding:'9px 14px',flexShrink:0}}><Send size={13}/></button>
              </div>
            </div>
          </div>
          {/* Live stats */}
          <div className="gc" style={{padding:'12px 16px',marginTop:10}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
              {[['Possession','58%','42%'],['Tirs (cadrés)','8 (5)','4 (2)'],['Passes préc.','88%','74%'],['Distance','47km','43km']].map(([l,h,a])=>(
                <div key={l} style={{background:'rgba(255,255,255,.03)',borderRadius:8,padding:'8px 10px'}}>
                  <div style={{fontSize:9,color:C.faint,fontWeight:600,marginBottom:5,textAlign:'center'}}>{l}</div>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:11,fontWeight:700}}>
                    <span style={{color:C.voltL}}>{h}</span>
                    <span style={{color:C.sub,fontSize:9}}>vs</span>
                    <span style={{color:C.crimL}}>{a}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  HEALTH MODULE
// ═══════════════════════════════════════════════════════════════════
function HealthModule() {
  const [selected, setSelected] = useState(null);
  const p = selected || HEALTH_DATA[0];
  return (
    <div style={{padding:'24px 28px',height:'100%',overflowY:'auto'}} className="scrollable">
      <div style={{marginBottom:24}}>
        <div style={{fontSize:20,fontWeight:900,color:C.text,display:'flex',alignItems:'center',gap:10,marginBottom:4}}>
          <Stethoscope size={20} color={C.emer}/>Module Santé & Prévention des Blessures
        </div>
        <div style={{fontSize:12,color:C.sub}}>Surveillance biomédicale temps réel · IA prédictive · Algorithme ACWR</div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:18}}>
        {[['Effectif disponible','26/28','players',C.emer],['En rééducation','2','players',C.amber],['Alertes actives','3','alerts',C.crim],['ACWR moyen équipe','1.12','/1.5 crit.',C.volt]].map(([l,v,u,c])=>(
          <div key={l} className="gc" style={{padding:'14px 16px'}}>
            <div style={{fontSize:10,color:C.sub,fontWeight:600,letterSpacing:'0.06em',marginBottom:8}}>{l.toUpperCase()}</div>
            <div style={{fontSize:24,fontWeight:800,color:c}}>{v}</div>
            <div style={{fontSize:10,color:C.faint}}>{u}</div>
          </div>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 340px',gap:14}}>
        {/* Player grid */}
        <div>
          <div style={{fontSize:12,fontWeight:700,color:C.sub,letterSpacing:'0.06em',marginBottom:10}}>TABLEAU DE SANTÉ — EFFECTIF COMPLET</div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {HEALTH_DATA.map(hp=>(
              <div key={hp.id} onClick={()=>setSelected(hp)} className="gc" style={{padding:'14px 16px',cursor:'pointer',border:`1px solid ${selected?.id===hp.id?'rgba(124,58,237,.4)':'rgba(255,255,255,.05)'}`,background:selected?.id===hp.id?'rgba(124,58,237,.06)':'rgba(14,6,28,.92)',display:'flex',alignItems:'center',gap:12,animation:hp.risk==='high'?'alertPulse 2s ease infinite':'none'}}>
                <div style={{width:34,height:34,borderRadius:10,background:`${hp.risk==='high'?'rgba(220,38,38,.15)':hp.risk==='med'?'rgba(245,158,11,.1)':'rgba(16,185,129,.1)'}`,border:`1px solid ${hp.risk==='high'?'rgba(220,38,38,.4)':hp.risk==='med'?'rgba(245,158,11,.3)':'rgba(16,185,129,.25)'}`,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:12,color:hp.risk==='high'?C.crim:hp.risk==='med'?C.amber:C.emer,fontFamily:'JetBrains Mono'}}>{hp.num}</div>
                <div style={{flex:1}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:5}}>
                    <span style={{fontSize:12,fontWeight:700,color:C.text}}>{hp.name}</span>
                    <span style={{fontSize:9,color:C.faint}}>{hp.pos} · {hp.nationality}</span>
                    <span className={`badge risk-${hp.risk}`}>{hp.risk==='low'?'✅ OK':hp.risk==='med'?'⚠️ SUIVI':'🔴 ALERTE'}</span>
                  </div>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:6}}>
                    {[['Forme',hp.form,C.volt],['Wellness',hp.wellness,C.emer],['Fatigue',hp.fatigue,hp.fatigue>50?C.crim:C.amber],['ACWR',parseFloat(hp.acwr)*50,hp.acwr>1.5?C.crim:C.emer]].map(([l,v,c])=>(
                      <div key={l}>
                        <div style={{fontSize:9,color:C.faint,marginBottom:2}}>{l}</div>
                        <div style={{height:3,background:'rgba(255,255,255,.06)',borderRadius:99}}>
                          <div style={{height:'100%',width:`${Math.min(v,100)}%`,background:c,borderRadius:99}}/>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div className="mono" style={{fontSize:13,fontWeight:700,color:hp.risk==='high'?C.crim:hp.risk==='med'?C.amber:C.emer}}>{hp.wellness}</div>
                  <div style={{fontSize:9,color:C.faint}}>/100</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Detail panel */}
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          <div className="gc" style={{padding:'18px 20px'}}>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
              <div style={{width:48,height:48,borderRadius:14,background:`${p.risk==='high'?'rgba(220,38,38,.15)':'rgba(124,58,237,.15)'}`,border:`1px solid ${p.risk==='high'?'rgba(220,38,38,.4)':'rgba(124,58,237,.4)'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,fontWeight:800,color:p.risk==='high'?C.crim:C.volt,fontFamily:'JetBrains Mono'}}>{p.num}</div>
              <div><div style={{fontSize:14,fontWeight:800,color:C.text}}>{p.name}</div>
                <div style={{fontSize:11,color:C.sub}}>{p.nationality} · {p.pos} · {p.age} ans</div></div>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              <StatBar label="Wellness global" value={p.wellness} color={p.wellness>80?C.emer:p.wellness>60?C.amber:C.crim}/>
              <StatBar label="Forme sportive" value={p.form} color={C.volt}/>
              <StatBar label="Fatigue cumulée" value={p.fatigue} color={p.fatigue>60?C.crim:p.fatigue>40?C.amber:C.emer}/>
              <StatBar label="Sommeil (qualité)" value={p.sleepScore} color={C.cyan}/>
              <StatBar label="HRV (récupération)" value={p.hrv} max={100} color={C.emer}/>
              <StatBar label="Charge musculaire" value={p.muscleFatigue} color={p.muscleFatigue>70?C.crim:C.amber}/>
            </div>
          </div>
          <div className="lava"><div className="lava-i" style={{padding:'14px 16px'}}>
            <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:10}}><Brain size={13} color={C.voltL}/><span style={{fontSize:11,fontWeight:700,color:C.voltL}}>RECOMMANDATIONS IA</span></div>
            <div style={{display:'flex',flexDirection:'column',gap:7}}>
              {p.risk==='high'?[
                '⛔ Mise au repos obligatoire 48-72h',
                '🧊 Cryothérapie corps entier recommandée',
                '📋 Bilan physio complet avant reprise',
                '💊 Révision charge semaine suivante (-30%)',
              ]:p.risk==='med'?[
                '⚠️ Charge réduite demain (-20%)',
                '💤 Prioriser 9h de sommeil ce soir',
                '🧘 Stretching actif + hydrothérapie',
                '📊 Réévaluation dans 24h',
              ]:[
                '✅ Joueur en parfaite condition',
                '🏃 Peut supporter charge pleine',
                '💪 Objectif dépassement de perf possible',
                '📈 Maintenir le programme actuel',
              ]}.map((t,i)=>(
                <div key={i} style={{display:'flex',gap:7,fontSize:10,color:C.sub,padding:'6px 8px',background:'rgba(0,0,0,.3)',borderRadius:7}}>{t}</div>
              ))}
            </div>
          </div></div>
          <div className="gc" style={{padding:'14px 16px'}}>
            <div style={{fontSize:11,fontWeight:700,color:C.sub,letterSpacing:'0.06em',marginBottom:10}}>ACWR · CHARGE AIGUË/CHRONIQUE</div>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
              <div className="mono" style={{fontSize:28,fontWeight:900,color:p.acwr>1.5?C.crim:p.acwr>1.3?C.amber:C.emer}}>{p.acwr}</div>
              <div style={{flex:1}}>
                <div style={{height:8,background:'rgba(255,255,255,.06)',borderRadius:99,overflow:'hidden'}}>
                  <div style={{height:'100%',width:`${Math.min(parseFloat(p.acwr)/2*100,100)}%`,background:p.acwr>1.5?C.crim:p.acwr>1.3?C.amber:C.emer,borderRadius:99}}/>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',marginTop:3}}>
                  <span style={{fontSize:8,color:C.emer,fontFamily:'JetBrains Mono'}}>0.8 OK</span>
                  <span style={{fontSize:8,color:C.amber,fontFamily:'JetBrains Mono'}}>1.3 ⚠️</span>
                  <span style={{fontSize:8,color:C.crim,fontFamily:'JetBrains Mono'}}>1.5 🔴</span>
                </div>
              </div>
            </div>
            <div style={{fontSize:10,color:C.sub}}>RPE: <strong style={{color:C.text}}>{p.rpe}/10</strong> · Charge mentale: <strong style={{color:C.text}}>{p.mentalLoad}%</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  ANALYTICS MODULE
// ═══════════════════════════════════════════════════════════════════
function AnalyticsModule() {
  const [tab, setTab] = useState('perf');
  return (
    <div style={{padding:'24px 28px',height:'100%',overflowY:'auto'}} className="scrollable">
      <div style={{marginBottom:20}}>
        <div style={{fontSize:20,fontWeight:900,color:C.text,marginBottom:4,display:'flex',alignItems:'center',gap:10}}><BarChart2 size={20} color={C.cyan}/>Analytics & Reporting IA</div>
        <div style={{display:'flex',gap:8}}>
          {[['perf','Performance'],['tactic','Tactique'],['compare','Comparateur'],['report','Rapports']].map(([k,l])=>(
            <Chip key={k} active={tab===k} onClick={()=>setTab(k)} color="cyan">{l}</Chip>
          ))}
          <button className="btn btn-ghost" style={{fontSize:11,padding:'5px 14px',marginLeft:'auto'}}><Download size={12}/>Exporter PDF</button>
        </div>
      </div>
      {tab==='perf' && (
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
          <div className="gc" style={{padding:'20px 22px'}}>
            <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:16}}>📈 Progression physique — 12 semaines</div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={PERF_CHART}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.05)"/>
                <XAxis dataKey="sem" tick={{fill:C.sub,fontSize:9}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fill:C.sub,fontSize:9}} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{background:'rgba(10,4,22,.98)',border:'1px solid rgba(6,182,212,.3)',borderRadius:10,fontFamily:'Syne',fontSize:11}}/>
                <Area type="monotone" dataKey="forme" stroke={C.cyan} fill="rgba(6,182,212,.12)" strokeWidth={2}/>
                <Area type="monotone" dataKey="wellbeing" stroke={C.emer} fill="rgba(16,185,129,.08)" strokeWidth={1.5}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="gc" style={{padding:'20px 22px'}}>
            <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:16}}>⚡ Charge d'entraînement hebdomadaire</div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={PERF_CHART}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.05)"/>
                <XAxis dataKey="sem" tick={{fill:C.sub,fontSize:9}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fill:C.sub,fontSize:9}} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{background:'rgba(10,4,22,.98)',border:'1px solid rgba(234,88,12,.3)',borderRadius:10,fontFamily:'Syne',fontSize:11}}/>
                <Bar dataKey="charge" radius={[4,4,0,0]}>
                  {PERF_CHART.map((e,i)=><Cell key={i} fill={e.charge>85?C.crim:e.charge>70?C.emb:C.volt}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="gc" style={{padding:'20px 22px',gridColumn:'1/-1'}}>
            <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:16}}>🎯 Profilage tactique — PSG vs Adversaire</div>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={RADAR_TEAM} cx="50%" cy="50%" outerRadius="75%">
                <PolarGrid stroke="rgba(255,255,255,.07)"/>
                <PolarAngleAxis dataKey="sub" tick={{fill:C.sub,fontSize:10,fontFamily:'Syne'}}/>
                <PolarRadiusAxis tick={false} axisLine={false}/>
                <Radar name="PSG" dataKey="A" stroke={C.volt} fill={C.volt} fillOpacity={.2} strokeWidth={2}/>
                <Radar name="Adversaire" dataKey="B" stroke={C.crim} fill={C.crim} fillOpacity={.08} strokeWidth={1.5}/>
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      {tab==='tactic' && (
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
          {[['Possession (avg)','58.4%','vs 46.2% objectif',C.volt],['Distance couverte','47.2 km','par match, +3.1km moy',C.cyan],['Tirs cadrés','68.4%','précision sur 10 matchs',C.emer],['Pressing réussi','74%','récupérations hautes',C.amber]].map(([l,v,d,c])=>(
            <div key={l} className="gc" style={{padding:'18px 20px'}}>
              <div style={{fontSize:11,color:C.sub,fontWeight:600,letterSpacing:'0.06em',marginBottom:8}}>{l.toUpperCase()}</div>
              <div style={{fontSize:32,fontWeight:900,color:c,marginBottom:4}}>{v}</div>
              <div style={{fontSize:11,color:C.faint}}>{d}</div>
            </div>
          ))}
          <div className="gc" style={{padding:'18px 20px',gridColumn:'1/-1'}}>
            <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:12}}>🔥 Zones d'activité — Heatmap collective</div>
            <div style={{height:140,background:'#1a5c2a',borderRadius:10,position:'relative',overflow:'hidden',border:'1px solid rgba(255,255,255,.1)'}}>
              {[{x:'20%',y:'40%',r:'80px',c:'rgba(234,88,12,.5)'},{x:'60%',y:'35%',r:'100px',c:'rgba(245,158,11,.45)'},{x:'40%',y:'60%',r:'70px',c:'rgba(220,38,38,.4)'},{x:'10%',y:'50%',r:'50px',c:'rgba(124,58,237,.4)'},{x:'80%',y:'50%',r:'60px',c:'rgba(124,58,237,.35)'}].map((z,i)=>(
                <div key={i} style={{position:'absolute',left:z.x,top:z.y,width:z.r,height:z.r,borderRadius:'50%',background:z.c,filter:'blur(20px)',transform:'translate(-50%,-50%)'}}/>
              ))}
              <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',color:'rgba(255,255,255,.15)',fontSize:11,fontFamily:'JetBrains Mono'}}>TERRAIN · 105m × 68m</div>
            </div>
          </div>
        </div>
      )}
      {tab==='compare' && (
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          <div className="gc" style={{padding:'18px 20px'}}>
            <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:16}}>⚖️ Comparateur de joueurs</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 60px 1fr',gap:12,alignItems:'center'}}>
              <div style={{padding:'16px',background:'rgba(124,58,237,.08)',borderRadius:12,border:'1px solid rgba(124,58,237,.2)',textAlign:'center'}}>
                <div style={{fontSize:16,fontWeight:800,color:C.voltL}}>A. Moreau</div>
                <div style={{fontSize:11,color:C.sub}}>ATT · #10</div>
                {['Technique','Vitesse','Physique','Impact','Mental'].map((s,i)=>{
                  const vals=[97,94,92,96,90];
                  return <div key={s} style={{marginTop:8}}>
                    <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:C.sub,marginBottom:3}}><span>{s}</span><span style={{color:C.voltL,fontFamily:'JetBrains Mono'}}>{vals[i]}</span></div>
                    <div className="progress-bar"><div className="progress-fill" style={{width:`${vals[i]}%`,background:C.volt}}/></div>
                  </div>;
                })}
              </div>
              <div style={{textAlign:'center',fontSize:11,fontWeight:700,color:C.sub}}>VS</div>
              <div style={{padding:'16px',background:'rgba(220,38,38,.06)',borderRadius:12,border:'1px solid rgba(220,38,38,.2)',textAlign:'center'}}>
                <div style={{fontSize:16,fontWeight:800,color:C.crimL}}>K. Silva</div>
                <div style={{fontSize:11,color:C.sub}}>ATT · #9</div>
                {['Technique','Vitesse','Physique','Impact','Mental'].map((s,i)=>{
                  const vals=[85,88,80,82,78];
                  return <div key={s} style={{marginTop:8}}>
                    <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:C.sub,marginBottom:3}}><span>{s}</span><span style={{color:C.crimL,fontFamily:'JetBrains Mono'}}>{vals[i]}</span></div>
                    <div className="progress-bar"><div className="progress-fill" style={{width:`${vals[i]}%`,background:C.crim}}/></div>
                  </div>;
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      {tab==='report' && (
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          <div className="gc" style={{padding:'14px 18px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{width:40,height:40,borderRadius:10,background:'rgba(124,58,237,.1)',border:'1px solid rgba(124,58,237,.25)',display:'flex',alignItems:'center',justifyContent:'center'}}><FileText size={18} color={C.volt}/></div>
              <div><div style={{fontSize:13,fontWeight:700,color:C.text}}>Rapport post-match · PSG vs Marseille</div><div style={{fontSize:11,color:C.sub}}>Généré le {new Date().toLocaleDateString('fr-FR')} · 24 pages · PDF</div></div>
            </div>
            <button className="btn btn-ghost" style={{fontSize:11,padding:'7px 14px'}}><Download size={12}/>Télécharger</button>
          </div>
          {['Rapport d\'entraînement S18','Bilan médical mensuel — Mars 2025','Analyse tactique 5 derniers matchs','Rapport financier performance/coût'].map(r=>(
            <div key={r} className="gc" style={{padding:'12px 18px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <FileText size={14} color={C.sub}/>
                <span style={{fontSize:12,color:C.text}}>{r}</span>
              </div>
              <div style={{display:'flex',gap:8}}>
                <button className="btn btn-ghost" style={{fontSize:10,padding:'5px 12px'}}><Eye size={11}/>Voir</button>
                <button className="btn btn-ghost" style={{fontSize:10,padding:'5px 12px'}}><Download size={11}/></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  COMMUNICATION MODULE
// ═══════════════════════════════════════════════════════════════════
const CHANNELS = [
  {id:'general', name:'# général', unread:3},
  {id:'staff', name:'# staff-technique', unread:0},
  {id:'medical', name:'🔒 medical', unread:1},
  {id:'tactics', name:'📋 tactique', unread:5},
];

const CHAT_MSGS = [
  {from:'Carlos Mendes',role:'headcoach',txt:'Séance demain à 9h30. Focus sur la transition défensive. Tout le monde doit être là.',t:'08:45'},
  {from:'Dr. Sophie Martin',role:'medical',txt:'Benzara est suivi. Je recommande de ne pas le faire jouer avant mercredi au minimum.',t:'09:12'},
  {from:'Lucas Fontaine',role:'analyst',txt:'J\'ai uploadé l\'analyse vidéo du match de Lyon. Zones de pressing intéressantes à exploiter.',t:'10:03'},
  {from:'Carlos Mendes',role:'headcoach',txt:'Parfait Lucas. Réunion tactique 14h pour en discuter.',t:'10:08'},
  {from:'Nuvora IA',role:'ai',txt:'📊 Analyse automatique disponible: la possession adverse dans notre moitié de terrain a augmenté de 12% vs la semaine dernière.',t:'10:15'},
];

function CommunicationModule() {
  const [channel, setChannel] = useState('general');
  const [mood, setMood] = useState({});
  const [msg, setMsg] = useState('');
  const [msgs, setMsgs] = useState(CHAT_MSGS);

  const sendMsg = () => {
    if(!msg.trim()) return;
    setMsgs(m=>[...m,{from:'Vous',role:'director',txt:msg,t:new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})}]);
    setMsg('');
  };

  return (
    <div style={{padding:'24px 28px',height:'100%',overflow:'hidden',display:'flex',flexDirection:'column',gap:14}}>
      <div style={{fontSize:20,fontWeight:900,color:C.text,flexShrink:0,display:'flex',alignItems:'center',gap:10}}>
        <MessageSquare size={20} color={C.volt}/>Communication & Cohésion d'équipe
      </div>
      <div style={{display:'grid',gridTemplateColumns:'200px 1fr 280px',gap:12,flex:1,overflow:'hidden',minHeight:0}}>
        {/* Channels */}
        <div className="gc" style={{padding:'14px 12px',overflowY:'auto'}} className="scrollable">
          <div style={{fontSize:10,color:C.faint,fontWeight:700,letterSpacing:'0.1em',marginBottom:10,padding:'0 4px'}}>CANAUX</div>
          {CHANNELS.map(ch=>(
            <button key={ch.id} className={`snav ${channel===ch.id?'sav':''}`} onClick={()=>setChannel(ch.id)} style={{justifyContent:'space-between',marginBottom:4}}>
              <span>{ch.name}</span>
              {ch.unread>0 && <span style={{background:C.volt,color:'#fff',fontSize:9,padding:'1px 6px',borderRadius:99,fontWeight:700}}>{ch.unread}</span>}
            </button>
          ))}
          <div style={{margin:'14px 0 8px',fontSize:10,color:C.faint,fontWeight:700,letterSpacing:'0.1em',padding:'0 4px'}}>MEMBRES ACTIFS</div>
          {['Carlos Mendes','Dr. S. Martin','L. Fontaine','A. Moreau','K. Silva'].map((n,i)=>(
            <div key={n} style={{display:'flex',alignItems:'center',gap:8,padding:'6px 8px',borderRadius:8,cursor:'pointer'}}>
              <div style={{width:7,height:7,borderRadius:'50%',background:[C.emer,C.emer,C.amber,C.emer,C.faint][i]}}/>
              <span style={{fontSize:11,color:C.sub}}>{n}</span>
            </div>
          ))}
        </div>
        {/* Chat */}
        <div className="gc" style={{padding:'14px 16px',display:'flex',flexDirection:'column',minHeight:0}}>
          <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:12,flexShrink:0,borderBottom:'1px solid rgba(255,255,255,.05)',paddingBottom:10}}>
            {CHANNELS.find(c=>c.id===channel)?.name} · <span style={{color:C.sub,fontWeight:400,fontSize:11}}>{msgs.length} messages</span>
          </div>
          <div style={{flex:1,overflowY:'auto',display:'flex',flexDirection:'column',gap:10}} className="scrollable">
            {msgs.map((m,i)=>(
              <div key={i} style={{display:'flex',gap:10,animation:'chatIn .3s ease'}}>
                <div style={{width:32,height:32,borderRadius:10,flexShrink:0,background:m.role==='ai'?'rgba(124,58,237,.15)':m.role==='headcoach'?'rgba(234,88,12,.15)':m.role==='medical'?'rgba(16,185,129,.12)':'rgba(6,182,212,.12)',border:`1px solid ${m.role==='ai'?'rgba(124,58,237,.35)':m.role==='headcoach'?'rgba(234,88,12,.3)':m.role==='medical'?'rgba(16,185,129,.25)':'rgba(6,182,212,.25)'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:13}}>
                  {m.role==='ai'?'🤖':m.role==='headcoach'?'⚡':m.role==='medical'?'🩺':'💼'}
                </div>
                <div style={{flex:1}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
                    <span style={{fontSize:12,fontWeight:700,color:C.text}}>{m.from}</span>
                    <span className="mono" style={{fontSize:9,color:C.faint}}>{m.t}</span>
                  </div>
                  <div style={{fontSize:12,color:C.sub,lineHeight:1.5,padding:'9px 12px',background:'rgba(255,255,255,.03)',borderRadius:'4px 12px 12px 12px'}}>{m.txt}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{display:'flex',gap:8,marginTop:12,flexShrink:0}}>
            <input className="input-field" value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendMsg()} placeholder="Écrire un message..." style={{fontSize:12}}/>
            <button className="btn btn-volt" onClick={sendMsg} style={{padding:'10px 16px',flexShrink:0}}><Send size={13}/></button>
          </div>
        </div>
        {/* Mood tracker */}
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          <div className="gc" style={{padding:'14px 16px',flex:1}}>
            <div style={{fontSize:11,fontWeight:700,color:C.sub,letterSpacing:'0.06em',marginBottom:12}}>MOOD TRACKER · ÉQUIPE</div>
            {PLAYERS_DATA.slice(0,8).map(p=>(
              <div key={p.id} style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
                <span style={{fontSize:10,color:C.faint,minWidth:22,fontFamily:'JetBrains Mono'}}>#{p.num}</span>
                <span style={{fontSize:10,color:C.sub,flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{p.name}</span>
                <div style={{display:'flex',gap:4}}>
                  {[Smile,Meh,Frown].map((Icon,mi)=>(
                    <button key={mi} onClick={()=>setMood(m=>({...m,[p.id]:mi}))} style={{width:22,height:22,borderRadius:6,border:`1px solid ${mood[p.id]===mi?[C.emer,C.amber,C.crim][mi]:'rgba(255,255,255,.08)'}`,background:mood[p.id]===mi?`${[C.emer,C.amber,C.crim][mi]}15`:'transparent',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .18s'}}>
                      <Icon size={11} color={mood[p.id]===mi?[C.emer,C.amber,C.crim][mi]:'#374151'}/>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div style={{marginTop:12,padding:'10px',background:'rgba(124,58,237,.08)',borderRadius:10,fontSize:10,color:C.voltL}}>
              <Brain size={10} style={{display:'inline',marginRight:5}}/>
              Cohésion équipe: <strong>78/100</strong> · Moral en hausse (+5% cette semaine)
            </div>
          </div>
          <div className="gc" style={{padding:'14px 16px'}}>
            <div style={{fontSize:11,fontWeight:700,color:C.sub,letterSpacing:'0.06em',marginBottom:10}}>VOTE ANONYME</div>
            <div style={{fontSize:11,color:C.text,marginBottom:10}}>Comment évaluez-vous l'ambiance du groupe cette semaine ?</div>
            {[['Excellente',78,C.emer],['Bonne',15,C.volt],['Neutre',7,C.sub]].map(([l,v,c])=>(
              <div key={l} style={{marginBottom:8}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}>
                  <span style={{fontSize:10,color:C.sub}}>{l}</span>
                  <span className="mono" style={{fontSize:10,color:c}}>{v}%</span>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{width:`${v}%`,background:c}}/></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  MANAGEMENT MODULE
// ═══════════════════════════════════════════════════════════════════
function ManagementModule() {
  const [tab, setTab] = useState('roster');
  return (
    <div style={{padding:'24px 28px',height:'100%',overflowY:'auto'}} className="scrollable">
      <div style={{marginBottom:20}}>
        <div style={{fontSize:20,fontWeight:900,color:C.text,marginBottom:12,display:'flex',alignItems:'center',gap:10}}><Building2 size={20} color={C.amber}/>Management du Club</div>
        <div style={{display:'flex',gap:8}}>
          {[['roster','Effectif & Rôles'],['calendar','Calendrier'],['finance','Performance/Coût'],['settings','Accès & RBAC']].map(([k,l])=>(
            <Chip key={k} active={tab===k} onClick={()=>setTab(k)} color="amber">{l}</Chip>
          ))}
        </div>
      </div>
      {tab==='roster' && (
        <div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:16}}>
            {Object.entries(ROLES).slice(0,3).map(([k,r])=>(
              <div key={k} className="gc" style={{padding:'16px 18px'}}>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
                  <span style={{fontSize:22}}>{r.icon}</span>
                  <div><div style={{fontSize:12,fontWeight:700,color:C.text}}>{r.label}</div>
                    <div style={{fontSize:10,color:C.sub}}>Accès: {r.modules.length} modules</div></div>
                </div>
                <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                  {r.modules.map(m=><span key={m} className="badge" style={{background:`${r.color}12`,border:`1px solid ${r.color}25`,color:r.color,fontSize:7}}>{m}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div className="gc" style={{padding:'16px 20px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
              <div style={{fontSize:13,fontWeight:700,color:C.text}}>Membres du club ({PLAYERS_DATA.length + 4})</div>
              <button className="btn btn-volt" style={{fontSize:11,padding:'7px 14px'}}><Plus size={12}/>Inviter</button>
            </div>
            {[{name:'Carlos Mendes',role:'headcoach',since:'2022'},{name:'Dr. Sophie Martin',role:'medical',since:'2021'},{name:'Lucas Fontaine',role:'analyst',since:'2023'},...PLAYERS_DATA.slice(0,5).map(p=>({name:p.name,role:'athlete',since:'2024'}))].map((m,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 0',borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                <div style={{width:32,height:32,borderRadius:9,background:`${ROLES[m.role].color}18`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:15}}>{ROLES[m.role].icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,fontWeight:700,color:C.text}}>{m.name}</div>
                  <div style={{fontSize:10,color:C.sub}}>Depuis {m.since}</div>
                </div>
                <span className="badge" style={{background:`${ROLES[m.role].color}12`,border:`1px solid ${ROLES[m.role].color}30`,color:ROLES[m.role].color}}>{ROLES[m.role].label}</span>
                <div style={{display:'flex',gap:6}}>
                  <button className="btn btn-ghost" style={{fontSize:10,padding:'4px 10px'}}><Eye size={10}/></button>
                  <button className="btn btn-ghost" style={{fontSize:10,padding:'4px 10px'}}><Settings size={10}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {tab==='calendar' && (
        <div style={{display:'grid',gridTemplateColumns:'1fr 280px',gap:14}}>
          <div className="gc" style={{padding:'18px 20px'}}>
            <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:14}}>📅 Planning Avril 2025</div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {[
                {d:'Lun 7',type:'training',label:'Entraînement · 9h30–12h00',c:C.volt},
                {d:'Mar 8',type:'medical',label:'Bilans médicaux équipe · 9h00',c:C.emer},
                {d:'Mer 9',type:'training',label:'Séance tactique · 10h00–12h30',c:C.volt},
                {d:'Jeu 10',type:'rest',label:'Récupération active',c:C.cyan},
                {d:'Ven 11',type:'match',label:'MATCH · PSG vs Lyon · 21h00',c:C.crim},
                {d:'Sam 12',type:'rest',label:'Repos post-match',c:C.faint},
                {d:'Dim 13',type:'training',label:'Reprise légère · 10h00',c:C.volt},
              ].map(ev=>(
                <div key={ev.d} style={{display:'flex',gap:12,padding:'10px 14px',background:`${ev.c}08`,borderRadius:10,border:`1px solid ${ev.c}20`,alignItems:'center'}}>
                  <span className="mono" style={{fontSize:10,color:ev.c,minWidth:44,fontWeight:700}}>{ev.d}</span>
                  <div style={{width:6,height:6,borderRadius:'50%',background:ev.c,flexShrink:0}}/>
                  <span style={{fontSize:12,color:C.text}}>{ev.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="gc" style={{padding:'16px 18px'}}>
            <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:12}}>📊 Statistiques planning</div>
            {[['Entraînements/sem','4.2',C.volt],['Matchs ce mois','5',C.crim],['Jours récup','8',C.emer],['Séances médicales','3',C.cyan]].map(([l,v,c])=>(
              <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                <span style={{fontSize:11,color:C.sub}}>{l}</span>
                <span className="mono" style={{fontSize:13,fontWeight:700,color:c}}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {tab==='finance' && (
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
          {PLAYERS_DATA.slice(0,6).map(p=>(
            <div key={p.id} className="gc" style={{padding:'14px 18px',display:'flex',gap:12,alignItems:'center'}}>
              <div style={{textAlign:'center',width:44}}>
                <div className="mono" style={{fontSize:16,fontWeight:700,color:p.form>85?C.emer:p.form>75?C.amber:C.crim}}>{p.form}</div>
                <div style={{fontSize:8,color:C.faint}}>FORME</div>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:12,fontWeight:700,color:C.text}}>{p.name}</div>
                <div style={{fontSize:10,color:C.sub,marginBottom:4}}>{p.pos} · {p.nationality}</div>
                <div style={{display:'flex',gap:8,fontSize:9}}>
                  <span style={{color:C.sub}}>Coût efficacité:</span>
                  <span style={{color:p.form>85?C.emer:C.amber,fontWeight:700}}>{p.form>85?'Excellent':'Bon'}</span>
                </div>
              </div>
              <div style={{textAlign:'right'}}>
                <div className="mono" style={{fontSize:13,fontWeight:700,color:C.amber}}>€{Math.floor(p.form*0.42+p.wellness*0.18)}k</div>
                <div style={{fontSize:9,color:C.faint}}>impact/match</div>
              </div>
            </div>
          ))}
        </div>
      )}
      {tab==='settings' && (
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          <div className="gc" style={{padding:'18px 22px'}}>
            <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:14}}>🔐 Contrôle d'accès (RBAC) · JWT</div>
            {Object.entries(ROLES).map(([k,r])=>(
              <div key={k} style={{display:'flex',alignItems:'flex-start',gap:12,padding:'12px 0',borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                <span style={{fontSize:18,width:28}}>{r.icon}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:4}}>{r.label}</div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                    {r.modules.map(m=><span key={m} className="badge" style={{background:`${r.color}12`,border:`1px solid ${r.color}25`,color:r.color,fontSize:8}}>{m}</span>)}
                  </div>
                </div>
                <div style={{display:'flex',gap:6,flexShrink:0}}>
                  <button className="btn btn-ghost" style={{fontSize:10,padding:'4px 10px'}}>Modifier</button>
                </div>
              </div>
            ))}
          </div>
          <div className="gc" style={{padding:'16px 20px'}}>
            <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:10}}>🔒 Sécurité</div>
            {[['Chiffrement données','AES-256',C.emer],['Authentification','JWT + MFA',C.volt],['Backup automatique','Toutes les 6h',C.cyan],['Conformité','RGPD · ISO 27001',C.amber]].map(([l,v,c])=>(
              <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'9px 0',borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                <span style={{fontSize:11,color:C.sub}}>{l}</span>
                <span style={{fontSize:11,fontWeight:700,color:c}}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  SIDEBAR
// ═══════════════════════════════════════════════════════════════════
const NAV = [
  {id:'dashboard',icon:<Layers size={15}/>,label:'Tableau de bord'},
  {id:'training',icon:<Zap size={15}/>,label:'Entraînement LIVE',badge:'LIVE'},
  {id:'match',icon:<Swords size={15}/>,label:'Match LIVE',badge:'LIVE'},
  {id:'health',icon:<Stethoscope size={15}/>,label:'Santé & Prévention'},
  {id:'analytics',icon:<BarChart2 size={15}/>,label:'Analytics & IA'},
  {id:'comms',icon:<MessageSquare size={15}/>,label:'Communication',badge:'9'},
  {id:'management',icon:<Building2 size={15}/>,label:'Management Club'},
];

function Sidebar({active, setActive}) {
  return (
    <div style={{width:218,background:'rgba(6,2,14,0.98)',borderRight:'1px solid rgba(255,255,255,.04)',padding:'20px 12px',display:'flex',flexDirection:'column',flexShrink:0}}>
      <div style={{marginBottom:24,paddingLeft:6}}>
        <div style={{fontSize:18,fontWeight:900,color:'#faf5ff',lineHeight:1}}>NUVORA<span style={{color:'#7c3aed'}}>.</span></div>
        <div style={{fontSize:8,color:C.sub,letterSpacing:'0.2em',marginTop:3}}>SPORT ECOSYSTEM</div>
      </div>
      {/* Club badge */}
      <div style={{display:'flex',alignItems:'center',gap:9,padding:'10px 12px',background:'rgba(220,38,38,.06)',borderRadius:12,border:'1px solid rgba(220,38,38,.15)',marginBottom:18}}>
        <div style={{width:28,height:28,borderRadius:8,background:'rgba(220,38,38,.2)',border:'1px solid rgba(220,38,38,.4)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>⭐</div>
        <div><div style={{fontSize:11,fontWeight:700,color:C.text}}>PSG</div>
          <div style={{fontSize:9,color:C.sub}}>Plan Pro · 28 membres</div></div>
        <div style={{marginLeft:'auto',width:7,height:7,borderRadius:'50%',background:C.emer,animation:'pulse 1.5s ease infinite'}}/>
      </div>
      {/* Nav */}
      <div style={{display:'flex',flexDirection:'column',gap:2,flex:1}}>
        {NAV.map(n=>(
          <button key={n.id} className={`snav ${active===n.id?'sav':''}`} onClick={()=>setActive(n.id)}>
            {n.icon}
            <span style={{flex:1}}>{n.label}</span>
            {n.badge && <span style={{background:n.badge==='LIVE'?C.crim:C.volt,color:'#fff',fontSize:8,padding:'2px 5px',borderRadius:5,fontWeight:700,animation:n.badge==='LIVE'?'pulse 1.5s ease infinite':''}}>{n.badge}</span>}
          </button>
        ))}
      </div>
      {/* Bottom user */}
      <div style={{borderTop:'1px solid rgba(255,255,255,.04)',paddingTop:12,marginTop:12}}>
        <div style={{display:'flex',alignItems:'center',gap:9,padding:'8px 6px',cursor:'pointer'}}>
          <div style={{width:32,height:32,borderRadius:10,background:'rgba(245,158,11,.15)',border:'1px solid rgba(245,158,11,.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>🏆</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:11,fontWeight:700,color:C.text,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>Jean-Pierre Dupont</div>
            <div style={{fontSize:9,color:C.sub}}>Directeur Sportif</div>
          </div>
          <Settings size={12} color={C.faint}/>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  TOPBAR
// ═══════════════════════════════════════════════════════════════════
function TopBar({module}) {
  const [notifs] = useState(4);
  const [time, setTime] = useState(new Date());
  useEffect(()=>{const i=setInterval(()=>setTime(new Date()),30000);return()=>clearInterval(i);},[]);
  const titles = {dashboard:'Vue Globale',training:'Entraînement Live',match:'Match Live',health:'Santé & Prévention',analytics:'Analytics & Reporting IA',comms:'Communication & Cohésion',management:'Management du Club'};
  return (
    <div style={{height:56,background:'rgba(6,2,14,0.97)',borderBottom:'1px solid rgba(255,255,255,.04)',display:'flex',alignItems:'center',padding:'0 28px',gap:16,flexShrink:0}}>
      <div style={{fontSize:14,fontWeight:800,color:C.text,flex:1}}>{titles[module]||'Dashboard'}</div>
      <div style={{display:'flex',alignItems:'center',gap:14}}>
        <div style={{display:'flex',alignItems:'center',gap:8,background:'rgba(255,255,255,.04)',borderRadius:10,padding:'7px 14px',border:'1px solid rgba(255,255,255,.06)'}}>
          <Search size={13} color={C.sub}/>
          <input placeholder="Rechercher joueur, session…" style={{background:'transparent',border:'none',outline:'none',color:C.text,fontSize:12,width:180,fontFamily:'Syne,sans-serif'}}/>
        </div>
        <div style={{position:'relative',cursor:'pointer'}}>
          <Bell size={18} color={C.sub}/>
          {notifs>0 && <div style={{position:'absolute',top:-4,right:-4,width:14,height:14,borderRadius:'50%',background:C.crim,fontSize:8,fontWeight:700,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center'}}>{notifs}</div>}
        </div>
        <span className="mono" style={{fontSize:11,color:C.faint}}>{time.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})}</span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════════════════════════════════
function MainApp() {
  const [module, setModule] = useState('dashboard');
  const MODULES = {dashboard:<DashboardModule/>,training:<TrainingModule/>,match:<MatchModule/>,health:<HealthModule/>,analytics:<AnalyticsModule/>,comms:<CommunicationModule/>,management:<ManagementModule/>};
  return (
    <div style={{display:'flex',height:'100vh',overflow:'hidden',background:'#05010f'}}>
      <Sidebar active={module} setActive={setModule}/>
      <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden'}}>
        <TopBar module={module}/>
        <div style={{flex:1,overflow:'hidden'}} key={module}>
          {MODULES[module]}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  ROOT — FLOW ORCHESTRATOR
// ═══════════════════════════════════════════════════════════════════
export default function NuvoraEcosystem() {
  const [screen, setScreen] = useState('splash');
  // splash → auth → club_wizard → camera_setup → member_setup → app

  useEffect(()=>{
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);
    return()=>document.head.removeChild(style);
  },[]);

  return (
    <div className="nv">
      {screen==='splash'   && <SplashScreen onDone={()=>setScreen('auth')}/>}
      {screen==='auth'     && <AuthScreen onLogin={()=>setScreen('club_wizard')}/>}
      {screen==='club_wizard' && <ClubWizard onDone={()=>setScreen('camera_setup')}/>}
      {screen==='camera_setup' && <CameraSetup onDone={()=>setScreen('member_setup')}/>}
      {screen==='member_setup' && <MemberSetup onDone={()=>setScreen('app')}/>}
      {screen==='app'      && <MainApp/>}
    </div>
  );
}