
// ---------- CONFIG ----------
const reverse = new Set(["CONF4","PROJ4","FOC4"]);
const dims = ["EST","EMO","ENR","CONF","MOT","OBJ","PLAN","PROJ","FOC","APT","ATT"];
const labels = {
  EST:"Estime de soi", EMO:"Émotions", ENR:"Énergie/Relâchement",
  CONF:"Confiance", MOT:"Motivation", OBJ:"Objectifs", PLAN:"Planification",
  PROJ:"Projection passé/futur", FOC:"Focus présent", APT:"Aptitudes mentales",
  ATT:"Attitude"
};
const blocks = {
  SOI:["EST","EMO","ENR"],
  SENS:["CONF","MOT","OBJ","PLAN"],
  CONC:["PROJ","FOC","APT"],
  COMP:["ATT"]
};
const blockLabels = {SOI:"Soi", SENS:"Sens", CONC:"Concentration", COMP:"Comportement"};
const bands = [
  {min:85, label:"Excellence"},
  {min:75, label:"Solide"},
  {min:60, label:"Correct"},
  {min:40, label:"Fragile"},
  {min:0,  label:"Critique"}
];
const coachText = {
  EST:{low:"Ta valeur ne dépend pas du résultat. Journal des qualités + victoire du jour.", mid:"Bonne base. Stabilise via 1 feedback positif/jour.", high:"Atout majeur. Reste en auto-référence plutôt que la comparaison."},
  EMO:{low:"Priorité régulation : STOP + respiration 4-6-8 + nommer l’émotion → action.", mid:"Ajoute un débrief émotionnel post-défi (3 lignes).", high:"Belle maîtrise. Ancrage rapide (mot-clé + souffle)."},
  ENR:{low:"Cycle 50/10, routine sommeil (heures fixes) et récup active.", mid:"Structure des micro-pauses planifiées.", high:"Excellent pacing. Crée des pics intentionnels avant moments clés."},
  CONF:{low:"Remplace le doute par preuves : 10 réussites + auto-talk “capable parce que…”.", mid:"Plan B systématique + check-list de préparation.", high:"Confiance stable ; garde l’humilité d’apprentissage."},
  MOT:{low:"Clarifie le pourquoi + micro-habitudes 10–15 min/j.", mid:"Pacte d’engagement hebdo (jour/heure).", high:"Moteur puissant ; réduis les frictions inutiles."},
  OBJ:{low:"Passe en SMART-ERS : 1 objectif → 3 critères → 1 indicateur.", mid:"Clarifie l’échéance et la mesure.", high:"Ajoute un objectif process (comportement) au résultat."},
  PLAN:{low:"Plan hebdo visuel : 3 créneaux fixes + priorités A-B-C.", mid:"Décompose T+1/T+7/T+30 et anticipe obstacles.", high:"Organisation solide ; mets des marges avant échéances."},
  PROJ:{low:"Échec→Leçon→Action. Visualise un scénario réaliste.", mid:"Souvenirs positifs 60s/jour en visualisation.", high:"Varie les canaux : visuel, auditif, kinesthésique."},
  FOC:{low:"Rituel d’entrée : 3 souffles + mot-clé + mode avion.", mid:"Pomodoro 25/5 + ancrage sensoriel.", high:"Checkpoints toutes 15 min pour maintenir l’intensité."},
  APT:{low:"Mémoire (rappels actifs), adaptabilité (scénarios A/B), calme (expiration longue).", mid:"Flexibilité via micro-défis.", high:"Mets ce socle au service de la créativité sous pression."},
  ATT:{low:"Actions petites mais quotidiennes ; responsabilisation.", mid:"Demande 1 feedback/semaine.", high:"Sois modèle en équipe en partageant tes routines."}
};

// ---------- FORM BUILD ----------
const ITEMS = [
  {id:"EST1", text:"Je pense avoir de la valeur, même quand je fais des erreurs.", dim:"EST"},
  {id:"EST2", text:"Je me respecte dans mes choix, même si les autres ne sont pas d’accord.", dim:"EST"},
  {id:"EST3", text:"Je crois que mes qualités sont au moins aussi importantes que mes défauts.", dim:"EST"},
  {id:"EST4", text:"Je suis fier(ère) de qui je suis et de ce que je représente.", dim:"EST"},
  {id:"EST5", text:"Je me compare rarement aux autres pour juger ma valeur.", dim:"EST"},
  {id:"EST6", text:"Je me sens digne de réussir et d’être heureux(se).", dim:"EST"},

  {id:"EMO1", text:"Je reconnais facilement ce que je ressens (colère, stress, joie, peur…).", dim:"EMO"},
  {id:"EMO2", text:"Quand je suis en colère, je réussis à garder le contrôle.", dim:"EMO"},
  {id:"EMO3", text:"Je sais exprimer mes émotions sans blesser les autres.", dim:"EMO"},
  {id:"EMO4", text:"Je me sers de mes émotions comme une force plutôt qu’un frein.", dim:"EMO"},
  {id:"EMO5", text:"Je sais me calmer rapidement après un moment difficile.", dim:"EMO"},
  {id:"EMO6", text:"Je comprends l’impact de mes émotions sur ma performance.", dim:"EMO"},

  {id:"ENR1", text:"Je sais trouver de l’énergie quand j’en ai besoin (examen, match…).", dim:"ENR"},
  {id:"ENR2", text:"Je sais aussi me détendre après un effort intense.", dim:"ENR"},
  {id:"ENR3", text:"Je gère bien mon niveau de fatigue.", dim:"ENR"},
  {id:"ENR4", text:"J’utilise des techniques (respiration, relaxation, pause mentale) pour récupérer.", dim:"ENR"},
  {id:"ENR5", text:"Mon énergie reste stable, même dans les journées chargées.", dim:"ENR"},
  {id:"ENR6", text:"J’équilibre moments d’effort et de repos.", dim:"ENR"},

  {id:"CONF1", text:"Je crois en mes capacités, même face à des défis.", dim:"CONF"},
  {id:"CONF2", text:"Je garde confiance en moi après un échec.", dim:"CONF"},
  {id:"CONF3", text:"Je me sens capable de progresser si je m’entraîne ou travaille.", dim:"CONF"},
  {id:"CONF4", text:"J’ai tendance à douter de moi.", dim:"CONF"},
  {id:"CONF5", text:"Je me sens compétent(e) pour réussir ce que j’entreprends.", dim:"CONF"},
  {id:"CONF6", text:"Je me fais confiance dans mes prises de décision.", dim:"CONF"},

  {id:"MOT1", text:"Je trouve des raisons de continuer même quand c’est difficile.", dim:"MOT"},
  {id:"MOT2", text:"Je me sens motivé(e) à travailler régulièrement, pas seulement à la dernière minute.", dim:"MOT"},
  {id:"MOT3", text:"J’ai une source d’inspiration qui me pousse à agir.", dim:"MOT"},
  {id:"MOT4", text:"Je garde ma motivation même si je rencontre des obstacles.", dim:"MOT"},
  {id:"MOT5", text:"Je me sens naturellement engagé(e) dans mes projets.", dim:"MOT"},
  {id:"MOT6", text:"Je sais relancer ma motivation quand je me sens fatigué(e).", dim:"MOT"},

  {id:"OBJ1", text:"Je me fixe des objectifs précis à court terme.", dim:"OBJ"},
  {id:"OBJ2", text:"Je me fixe aussi des objectifs à long terme.", dim:"OBJ"},
  {id:"OBJ3", text:"Mes objectifs sont réalistes et atteignables.", dim:"OBJ"},
  {id:"OBJ4", text:"Mes objectifs me motivent vraiment.", dim:"OBJ"},
  {id:"OBJ5", text:"Je sais mesurer si j’ai atteint un objectif ou non.", dim:"OBJ"},
  {id:"OBJ6", text:"Je révise mes objectifs quand les conditions changent.", dim:"OBJ"},

  {id:"PLAN1", text:"J’organise mes tâches de manière structurée.", dim:"PLAN"},
  {id:"PLAN2", text:"Je sais découper un gros projet en étapes claires.", dim:"PLAN"},
  {id:"PLAN3", text:"Je respecte en général mon planning.", dim:"PLAN"},
  {id:"PLAN4", text:"Je prévois du temps dédié pour m’entraîner/réviser.", dim:"PLAN"},
  {id:"PLAN5", text:"Je sais prioriser les tâches importantes.", dim:"PLAN"},
  {id:"PLAN6", text:"J’anticipe les difficultés possibles dans mes projets.", dim:"PLAN"},

  {id:"PROJ1", text:"Je tire des leçons de mes expériences passées.", dim:"PROJ"},
  {id:"PROJ2", text:"Je me projette facilement dans mes objectifs futurs.", dim:"PROJ"},
  {id:"PROJ3", text:"Je visualise mentalement mes réussites avant un défi.", dim:"PROJ"},
  {id:"PROJ4", text:"J’ai du mal à tourner la page après un échec.", dim:"PROJ"},
  {id:"PROJ5", text:"Je me sers de souvenirs positifs pour me motiver.", dim:"PROJ"},
  {id:"PROJ6", text:"Je peux imaginer clairement le chemin vers mes objectifs.", dim:"PROJ"},

  {id:"FOC1", text:"Je suis concentré(e) sur l’instant présent.", dim:"FOC"},
  {id:"FOC2", text:"Je ne me disperse pas pendant une tâche importante.", dim:"FOC"},
  {id:"FOC3", text:"Je reste concentré(e) même avec des distractions.", dim:"FOC"},
  {id:"FOC4", text:"Je me laisse souvent emporter par mes pensées.", dim:"FOC"},
  {id:"FOC5", text:"Je sais ramener mon attention quand je la perds.", dim:"FOC"},
  {id:"FOC6", text:"Je reste engagé(e) jusqu’au bout dans ce que je fais.", dim:"FOC"},

  {id:"APT1", text:"J’ai une bonne mémoire pour retenir l’essentiel.", dim:"APT"},
  {id:"APT2", text:"Je sais garder ma concentration longtemps.", dim:"APT"},
  {id:"APT3", text:"Je m’adapte rapidement à une situation nouvelle.", dim:"APT"},
  {id:"APT4", text:"Je garde mon calme dans les moments difficiles.", dim:"APT"},
  {id:"APT5", text:"Je trouve facilement des solutions créatives.", dim:"APT"},
  {id:"APT6", text:"Je reste mentalement fort(e) quand d’autres abandonnent.", dim:"APT"},

  {id:"ATT1", text:"Je prends mes responsabilités, même quand c’est difficile.", dim:"ATT"},
  {id:"ATT2", text:"Je garde une attitude positive dans la plupart des situations.", dim:"ATT"},
  {id:"ATT3", text:"J’accepte les critiques constructives et je progresse grâce à elles.", dim:"ATT"},
  {id:"ATT4", text:"Je cherche à m’améliorer en permanence.", dim:"ATT"},
  {id:"ATT5", text:"Mon comportement inspire confiance aux autres.", dim:"ATT"},
  {id:"ATT6", text:"Je transforme mes erreurs en opportunités d’apprentissage.", dim:"ATT"}
];

// build form
const scale = [1,2,3,4,5];
const form = document.getElementById("form");
const byDim = {};
ITEMS.forEach(q => { if(!byDim[q.dim]) byDim[q.dim]=[]; byDim[q.dim].push(q); });
Object.keys(byDim).forEach(dim => {
  const card = document.createElement("div"); card.className="card";
  const h = document.createElement("h2"); h.textContent = labels[dim]; card.appendChild(h);
  const grid = document.createElement("div"); grid.className = "grid";
  byDim[dim].forEach(q => {
    const lab = document.createElement("label"); lab.htmlFor = q.id; lab.textContent = q.text;
    const sel = document.createElement("select"); sel.id = q.id;
    sel.innerHTML = `<option value="">—</option>` + scale.map(v=>`<option>${v}</option>`).join("");
    grid.appendChild(lab); grid.appendChild(sel);
  });
  card.appendChild(grid);
  form.appendChild(card);
});

document.getElementById("dateTag").textContent = "Date : " + new Date().toLocaleDateString();

function pctFromMean(m){ return ((m - 1)/4)*100; }
function bandLabel(v){ for(const b of bands) if(v >= b.min) return b.label; return "n/a"; }

document.getElementById("calc").onclick = () => {
  const dimPct = {};
  for(const d of dims){
    const ids = (byDim[d]||[]).map(x=>x.id);
    const vals=[];
    ids.forEach(id=>{
      const raw=document.getElementById(id).value;
      if(raw){
        let v=Number(raw);
        if(reverse.has(id)) v=6-v;
        vals.push(v);
      }
    });
    if(vals.length>=4){
      const mean=vals.reduce((a,b)=>a+b,0)/vals.length;
      dimPct[d]=Math.round(pctFromMean(mean));
    } else dimPct[d]=null;
  }

  const blockPct = {};
  const avg = arr => Math.round(arr.reduce((a,b)=>a+b,0)/arr.length);
  for(const [code, list] of Object.entries(blocks)){
    const vals = list.map(d => dimPct[d]).filter(v => v!=null);
    blockPct[code] = vals.length ? avg(vals) : null;
  }
  const gvals = Object.values(blockPct).filter(v => v!=null);
  const global = gvals.length ? avg(gvals) : null;

  renderResults(dimPct, blockPct, global);
  document.getElementById("pdf").disabled = global==null;
};

function renderResults(dimPct, blockPct, global){
  document.getElementById("results").style.display="block";
  document.getElementById("details").style.display="block";
  document.getElementById("coach").style.display="block";

  document.getElementById("globalPct").textContent = global!=null?`${global}%`:"NA";
  document.getElementById("globalBar").style.width = (global||0)+'%';
  document.getElementById("globalBand").textContent = global!=null?bandLabel(global):"NA";

  const bb = document.getElementById("blocksBars"); bb.innerHTML="";
  for(const [code,val] of Object.entries(blockPct)){
    const wrap=document.createElement("div");
    wrap.innerHTML = `<div class="bar-label"><span>${blockLabels[code]}</span><b>${val??"NA"}%</b></div>
      <div class="bar"><span style="width:${val||0}%"></span></div>`;
    bb.appendChild(wrap);
  }

  const db=document.getElementById("dimsBars"); db.innerHTML="";
  dims.forEach(d=>{
    const v=dimPct[d];
    const card=document.createElement("div"); card.className="card";
    card.innerHTML = `<div class="bar-label"><span>${labels[d]}</span><b>${v??"NA"}%</b></div>
      <div class="bar"><span style="width:${v||0}%"></span></div>
      <div class="help">${v!=null?("Bande : <b>"+bandLabel(v)+"</b>"):"Au moins 4 réponses requises"}</div>`;
    db.appendChild(card);
  });

  drawRadar(dimPct);

  const coach = document.getElementById("coachTxt"); coach.innerHTML="";
  dims.forEach(d=>{
    const v = dimPct[d];
    let txt = "—";
    if(v!=null){
      if(v<60) txt = coachText[d].low;
      else if(v<75) txt = coachText[d].mid;
      else txt = coachText[d].high;
    }
    const box=document.createElement("div"); box.className="card";
    box.innerHTML = `<h3 style="margin-top:0">${labels[d]}</h3><p>${txt}</p>`;
    coach.appendChild(box);
  });
}

function drawRadar(dimPct){
  const svg=document.getElementById("radar"); svg.innerHTML="";
  const W=480,H=480,cx=W/2,cy=H/2,R=200;
  const order=["EST","EMO","ENR","CONF","MOT","OBJ","PLAN","PROJ","FOC","APT","ATT"];
  const n = order.length;
  for(let i=1;i<=4;i++){
    const r=(R/4)*i;
    const c=document.createElementNS("http://www.w3.org/2000/svg","circle");
    c.setAttribute("cx",cx); c.setAttribute("cy",cy); c.setAttribute("r",r);
    c.setAttribute("fill","none"); c.setAttribute("stroke","#e7f0f9");
    svg.appendChild(c);
  }
  order.forEach((code,idx)=>{
    const ang=((Math.PI*2)/n)*idx - Math.PI/2;
    const x=cx+R*Math.cos(ang), y=cy+R*Math.sin(ang);
    const l=document.createElementNS("http://www.w3.org/2000/svg","line");
    l.setAttribute("x1",cx); l.setAttribute("y1",cy); l.setAttribute("x2",x); l.setAttribute("y2",y);
    l.setAttribute("stroke","#d9e8f6"); svg.appendChild(l);
    const lx=cx+(R+18)*Math.cos(ang), ly=cy+(R+18)*Math.sin(ang);
    const t=document.createElementNS("http://www.w3.org/2000/svg","text");
    t.setAttribute("x",lx); t.setAttribute("y",ly);
    t.setAttribute("text-anchor", Math.cos(ang)>0.3 ? "start" : (Math.cos(ang)<-0.3 ? "end" : "middle"));
    t.setAttribute("dominant-baseline","middle"); t.setAttribute("font-size","11");
    t.textContent = labels[code]; svg.appendChild(t);
  });
  let pts=[];
  order.forEach((code,idx)=>{
    const v=(dimPct[code]??0)/100;
    const ang=((Math.PI*2)/n)*idx - Math.PI/2;
    const r=R*v, x=cx+r*Math.cos(ang), y=cy+r*Math.sin(ang);
    pts.push(`${x},${y}`);
  });
  const p=document.createElementNS("http://www.w3.org/2000/svg","polygon");
  p.setAttribute("points", pts.join(" "));
  p.setAttribute("fill","#22a6f244"); p.setAttribute("stroke","#22a6f2"); p.setAttribute("stroke-width","2");
  svg.appendChild(p);
}

// PDF via impression navigateur
document.getElementById("pdf").onclick = () => { window.print(); };
