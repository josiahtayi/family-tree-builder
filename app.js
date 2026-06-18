firebase.initializeApp({
  apiKey:"AIzaSyAU9AWPfts0RZ2Ss6ue_ipaeI2hDSehVV8",
  authDomain:"family-tree-43418.firebaseapp.com",
  projectId:"family-tree-43418",
  storageBucket:"family-tree-43418.firebasestorage.app",
  messagingSenderId:"233247197134",
  appId:"1:233247197134:web:ef0f5d143b0fbe9e26cd9f"
});
const db=firebase.firestore();
const peopleCol=db.collection('families').doc('selina').collection('people');
const personRef=id=>peopleCol.doc(String(id));
const storage=firebase.storage();
const photoRef=id=>storage.ref('photos/'+id);

const el=id=>document.getElementById(id);

const DEFAULT_FAMILY=[
{"id":"1.0","name":"Selina","parentId":null,"spouse":{"name":"David","deceased":true}},
{"id":"2.1","name":"George","parentId":"1.0","deceased":true,"spouse":{"name":"Elizabeth","deceased":true}},
{"id":"2.2","name":"Josaya","parentId":"1.0","spouse":{"name":"Jane"}},
{"id":"2.3","name":"Gloria","parentId":"1.0"},
{"id":"2.4","name":"Gciniwe","parentId":"1.0","spouse":{"name":"Eliot","deceased":true}},
{"id":"2.5","name":"Tengiwe","parentId":"1.0"},
{"id":"2.6","name":"Sinikiwe","parentId":"1.0"},
{"id":"2.7","name":"Toleni","parentId":"1.0","spouse":{"name":"Anna"}},
{"id":"2.8","name":"Khumbulani","parentId":"1.0","spouse":{"name":"Washington"}},
{"id":"2.1.1","name":"Patience","parentId":"2.1"},
{"id":"2.1.2","name":"Bekezela","parentId":"2.1","spouse":{"name":"Mazvitashe"}},
{"id":"2.1.3","name":"Blessing","parentId":"2.1"},
{"id":"2.1.1.1","name":"Ngonidzashe","parentId":"2.1.1"},
{"id":"2.1.1.2","name":"Leo","parentId":"2.1.1"},
{"id":"2.1.1.3","name":"Lewis","parentId":"2.1.1"},
{"id":"2.1.2.1","name":"Rutendo","parentId":"2.1.2"},
{"id":"2.1.2.2","name":"Selma","parentId":"2.1.2"},
{"id":"2.1.2.3","name":"Sheunesu George","parentId":"2.1.2"},
{"id":"2.1.2.4","name":"Summer","parentId":"2.1.2"},
{"id":"2.1.3.1","name":"Christie Elizabeth","parentId":"2.1.3"},
{"id":"2.2.1","name":"Nyasha","parentId":"2.2","spouse":{"name":"Rajeewa"}},
{"id":"2.2.2","name":"Selina","parentId":"2.2","spouse":{"name":"Anthony"}},
{"id":"2.2.3","name":"Jessica","parentId":"2.2","spouse":{"name":"Sandro Carlos"}},
{"id":"2.2.4","name":"Munyaradzi Josaya","parentId":"2.2"},
{"id":"2.2.5","name":"John","parentId":"2.2"},
{"id":"2.2.1.1","name":"Reon","parentId":"2.2.1"},
{"id":"2.2.1.2","name":"Raegan","parentId":"2.2.1"},
{"id":"2.2.1.3","name":"Rhema","parentId":"2.2.1"},
{"id":"2.2.2.1","name":"Ezra","parentId":"2.2.2"},
{"id":"2.2.3.1","name":"Juliana Shamiso","parentId":"2.2.3"},
{"id":"2.3.1","name":"Sitshengisiwe","parentId":"2.3"},
{"id":"2.3.2","name":"Tarisai","parentId":"2.3","spouse":{"name":"Judith Moreen"}},
{"id":"2.3.3","name":"Tsitsi","parentId":"2.3","spouse":{"name":"Nyasha Josiah"}},
{"id":"2.3.4","name":"Tariro","parentId":"2.3"},
{"id":"2.3.5","name":"Blessing","parentId":"2.3","spouse":{"name":"Graham"}},
{"id":"2.3.1.1","name":"Anotida Hanitra","parentId":"2.3.1"},
{"id":"2.3.2.1","name":"Anopa Douglas","parentId":"2.3.2"},
{"id":"2.3.2.2","name":"Jordan Takura","parentId":"2.3.2"},
{"id":"2.3.3.1","name":"Mikayla Ariella","parentId":"2.3.3"},
{"id":"2.3.4.1","name":"Atipaishe","parentId":"2.3.4"},
{"id":"2.3.4.2","name":"Nilsa","parentId":"2.3.4"},
{"id":"2.4.1","name":"Ronald","parentId":"2.4","spouse":{"name":"Caroline"}},
{"id":"2.4.2","name":"Constance","parentId":"2.4"},
{"id":"2.4.3","name":"Melody","parentId":"2.4"},
{"id":"2.4.4","name":"Angeline","parentId":"2.4","deceased":true},
{"id":"2.4.5","name":"Fortunate","parentId":"2.4"},
{"id":"2.4.1.1","name":"Ronald","parentId":"2.4.1"},
{"id":"2.4.1.2","name":"Queen","parentId":"2.4.1"},
{"id":"2.4.2.1","name":"Bradley","parentId":"2.4.2"},
{"id":"2.4.2.2","name":"Barney","parentId":"2.4.2"},
{"id":"2.4.2.3","name":"Anisha","parentId":"2.4.2"},
{"id":"2.4.3.1","name":"Tinashe Ben","parentId":"2.4.3"},
{"id":"2.4.3.2","name":"Anashe","parentId":"2.4.3"},
{"id":"2.4.5.1","name":"Jaden","parentId":"2.4.5"},
{"id":"2.4.5.2","name":"Joey","parentId":"2.4.5"},
{"id":"2.5.1","name":"Sarati Thelma","parentId":"2.5"},
{"id":"2.5.2","name":"Manuel Achim","parentId":"2.5"},
{"id":"2.5.1.1","name":"Ethan Mufaro","parentId":"2.5.1"},
{"id":"2.5.1.2","name":"Ethal Ruvarashe","parentId":"2.5.1"},
{"id":"2.6.1","name":"Maenzanise","parentId":"2.6","spouse":{"name":"Anna Panduleni Itula"}},
{"id":"2.6.2","name":"Munashe","parentId":"2.6","deceased":true},
{"id":"2.6.3","name":"Vongai","parentId":"2.6"},
{"id":"2.6.4","name":"Joseph","parentId":"2.6","spouse":{"name":"Martha"}},
{"id":"2.6.1.1","name":"Jerry","parentId":"2.6.1"},
{"id":"2.6.1.2","name":"Robyn Sinikiwe","parentId":"2.6.1"},
{"id":"2.6.1.3","name":"Ishmael","parentId":"2.6.1"},
{"id":"2.6.1.4","name":"Munashe","parentId":"2.6.1"},
{"id":"2.6.4.1","name":"Gabriel","parentId":"2.6.4"},
{"id":"2.7.1","name":"Panashe","parentId":"2.7"},
{"id":"2.7.2","name":"Anesu","parentId":"2.7"},
{"id":"2.7.3","name":"Dean","parentId":"2.7"},
{"id":"2.7.4","name":"Gamuchirai","parentId":"2.7"},
{"id":"2.8.1","name":"Ruvimbo","parentId":"2.8"},
{"id":"2.8.2","name":"Elsa","parentId":"2.8"},
{"id":"2.8.3","name":"Ashton","parentId":"2.8"}
];

let family=[],selectedId=null,collapsed=new Set(),term='';

// ── Utilities ─────────────────────────────────────────────────────────────────

function debounce(fn,ms){let t;return(...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),ms);};}
const byId=id=>family.find(p=>p.id===id);
const childrenOf=id=>family.filter(p=>p.parentId===id);
function roots(){const ids=new Set(family.map(p=>p.id));return family.filter(p=>!p.parentId||!ids.has(p.parentId));}
function initials(n){return(n||'?').trim().split(/\s+/).map(w=>w[0]||'').join('').slice(0,2).toUpperCase();}
function depthOf(id){let d=0,p=byId(id);while(p&&p.parentId&&byId(p.parentId)){d++;p=byId(p.parentId);}return d;}
function maxDepth(){return family.reduce((m,p)=>Math.max(m,depthOf(p.id)),0);}
const norm=s=>(s||'').toLowerCase();
function selfMatch(p){return!!term&&(norm(p.name).includes(term)||norm(p.spouse?.name).includes(term));}
function branchMatch(p){return selfMatch(p)||childrenOf(p.id).some(branchMatch);}
function descendants(id){const s=new Set();(function r(x){for(const c of childrenOf(x)){s.add(c.id);r(c.id);}})(id);return s;}
function esc(s){return(s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}

// ── Toast notifications ───────────────────────────────────────────────────────

function toast(msg,type='ok'){
  const t=document.createElement('div');
  t.className='toast toast-'+(type==='err'?'err':'ok');
  t.textContent=msg;
  document.body.appendChild(t);
  requestAnimationFrame(()=>t.classList.add('show'));
  setTimeout(()=>{t.classList.remove('show');setTimeout(()=>t.remove(),250);},2500);
}

// ── Save status ───────────────────────────────────────────────────────────────

let saveStatusTimer;
function showSaving(){
  const s=el('saveStatus');clearTimeout(saveStatusTimer);
  s.textContent='Saving…';s.className='save-status saving';
}
function showSaved(){
  const s=el('saveStatus');
  s.textContent='Saved ✓';s.className='save-status saved';
  saveStatusTimer=setTimeout(()=>{s.textContent='';s.className='save-status';},2000);
}
function showSaveError(){
  const s=el('saveStatus');
  s.textContent='Save failed — check connection';s.className='save-status error';
}

// ── Firestore helpers ─────────────────────────────────────────────────────────

function toDoc(p){
  const doc={...p};
  // Never write base64 data URLs to Firestore (migration safety net)
  if(doc.photo&&doc.photo.startsWith('data:'))delete doc.photo;
  return doc;
}
async function saveToDB(p){await personRef(p.id).set(toDoc(p));}
async function seedDefaults(){
  const batch=db.batch();
  DEFAULT_FAMILY.forEach(p=>batch.set(personRef(p.id),toDoc(p)));
  await batch.commit();
}
function withPhoto(p){
  // Fall back to localStorage for photos uploaded before cloud storage migration
  if(p.photo)return p;
  const local=localStorage.getItem('photo_'+p.id);
  return local?{...p,photo:local}:p;
}

// ── Real-time listener ────────────────────────────────────────────────────────

el('tree').innerHTML='<div class="empty">Connecting…</div>';
peopleCol.onSnapshot(snapshot=>{
  if(snapshot.empty){seedDefaults();return;}
  family=snapshot.docs.map(d=>withPhoto(d.data()));
  if(selectedId&&!byId(selectedId)){selectedId=null;el('editor').hidden=true;}
  render();
},()=>{el('tree').innerHTML='<div class="empty">Connection error — please refresh.</div>';});

// ── Render ────────────────────────────────────────────────────────────────────

function render(){renderStats();renderTree();}
function renderStats(){el('stats').textContent=family.length+' people · '+(maxDepth()+1)+' generations';}
function toggle(id){collapsed.has(id)?collapsed.delete(id):collapsed.add(id);renderTree();}

function select(id){
  selectedId=id;openEditor();renderTree();
  requestAnimationFrame(()=>{
    const node=document.querySelector('.tn-sel');
    if(node)node.scrollIntoView({block:'nearest',behavior:'smooth'});
  });
}

function isMobile(){return window.innerWidth<=720;}

function setBackdrop(show){
  el('editorBackdrop').classList.toggle('show',show);
}

function closeEditor(){
  selectedId=null;
  el('editor').hidden=true;
  setBackdrop(false);
  renderTree();
}

// ── Diagram layout constants ──────────────────────────────────────────────────

const NW=110;  // slot width per person (px)
const NH=96;   // node visual height, used for SVG connector anchor
const RH=158;  // vertical distance between generation rows
const PAD=24;  // canvas edge padding
const AV_R=23; // avatar radius (half of 46px avatar)

// Couples need 2 slots minimum so the spouse node has room
function hasSp(id){const p=byId(id);return !!(p&&p.spouse);}

function slots(id){
  if(collapsed.has(id))return hasSp(id)?2:1;
  const kids=childrenOf(id);
  const childSlots=kids.length?kids.reduce((s,k)=>s+slots(k.id),0):0;
  return Math.max(hasSp(id)?2:1, childSlots||1);
}

// pos[id] = { cx, x, sx, y }
// cx = center of the couple unit (used for parent↔child connectors)
// x  = center of the person node
// sx = center of the spouse node (null if no spouse)
function calcLayout(){
  const pos={};
  function place(id,left,depth){
    const s=slots(id);
    const cx=left+s*NW/2;
    const y=PAD+depth*RH;
    const sp=hasSp(id);
    pos[id]={cx, x:sp?cx-NW/2:cx, sx:sp?cx+NW/2:null, y};
    if(!collapsed.has(id)){
      let kl=left;
      for(const k of childrenOf(id)){place(k.id,kl,depth+1);kl+=slots(k.id)*NW;}
    }
  }
  let left=PAD;
  for(const r of roots()){place(r.id,left,0);left+=slots(r.id)*NW;}
  return pos;
}

// ── SVG helpers ───────────────────────────────────────────────────────────────

function addLine(svg,x1,y1,x2,y2,color='#d9cfc0',width=1.5){
  const l=document.createElementNS('http://www.w3.org/2000/svg','line');
  l.setAttribute('x1',x1);l.setAttribute('y1',y1);
  l.setAttribute('x2',x2);l.setAttribute('y2',y2);
  l.setAttribute('stroke',color);l.setAttribute('stroke-width',width);
  l.setAttribute('stroke-linecap','round');
  svg.appendChild(l);
}

function addCircle(svg,cx,cy,r,fill,stroke){
  const c=document.createElementNS('http://www.w3.org/2000/svg','circle');
  c.setAttribute('cx',cx);c.setAttribute('cy',cy);c.setAttribute('r',r);
  c.setAttribute('fill',fill);c.setAttribute('stroke',stroke);
  c.setAttribute('stroke-width',1.5);
  svg.appendChild(c);
}

// ── Tree renderer (diagram) ───────────────────────────────────────────────────

function renderTree(){
  const host=el('tree');
  host.innerHTML='';
  if(!family.length){host.innerHTML='<div class="empty">No members yet. Click "+ Add member".</div>';return;}

  const pos=calcLayout();
  const allPos=Object.values(pos);
  if(!allPos.length)return;

  // Canvas size — account for spouse nodes extending NW/2 beyond the cx
  const W=Math.max(...allPos.map(p=>p.sx??p.x))+NW/2+PAD;
  const H=Math.max(...allPos.map(p=>p.y))+NH+PAD*2;

  const canvas=document.createElement('div');
  canvas.style.cssText=`position:relative;width:${W}px;height:${H}px`;

  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('width',W);svg.setAttribute('height',H);
  svg.style.cssText='position:absolute;top:0;left:0;pointer-events:none';

  // Parent → children connectors (all anchored on cx)
  for(const p of family){
    if(!pos[p.id]||collapsed.has(p.id))continue;
    const kids=childrenOf(p.id).filter(k=>pos[k.id]);
    if(!kids.length)continue;
    const{cx,y:py}=pos[p.id];
    const barY=py+NH+(RH-NH)*0.42;
    addLine(svg,cx,py+NH,cx,barY);
    const cxs=kids.map(k=>pos[k.id].cx);
    if(kids.length>1)addLine(svg,Math.min(...cxs),barY,Math.max(...cxs),barY);
    for(const k of kids)addLine(svg,pos[k.id].cx,barY,pos[k.id].cx,pos[k.id].y);
  }

  // Marriage lines between person and spouse nodes
  for(const p of family){
    if(!pos[p.id]||!pos[p.id].sx)continue;
    const{x,sx,y}=pos[p.id];
    const lineY=y+6+AV_R; // vertical center of the avatar circle
    addLine(svg,x+AV_R,lineY,sx-AV_R,lineY,'#c8b8a2',1.5);
    // Small ring at midpoint
    addCircle(svg,(x+sx)/2,lineY,4,'#fff','#c8b8a2');
  }

  canvas.appendChild(svg);

  // Render person nodes and (if applicable) spouse nodes
  for(const p of family){
    if(!pos[p.id])continue;
    const{x,sx,y}=pos[p.id];
    const kids=childrenOf(p.id);
    const isSelected=p.id===selectedId;
    const visible=!term||branchMatch(p);
    const matched=term&&selfMatch(p);
    const cls=(term&&!visible?' tn-dim':'')+(matched?' tn-hit':'');

    // ── Person node ──
    const node=document.createElement('div');
    node.className='tn'+(isSelected?' tn-sel':'')+cls;
    node.style.cssText=`left:${x-NW/2}px;top:${y}px;width:${NW}px`;

    let av;
    if(p.photo){av=document.createElement('img');av.src=p.photo;av.alt=p.name;}
    else{av=document.createElement('div');av.textContent=initials(p.name);}
    av.className='tn-av'+(p.deceased?' tn-av-dec':'');
    node.appendChild(av);

    const nm=document.createElement('div');nm.className='tn-name';
    nm.appendChild(document.createTextNode(p.name));
    if(p.deceased){const d=document.createElement('span');d.className='tn-dagger';d.textContent=' †';nm.appendChild(d);}
    node.appendChild(nm);

    if(kids.length){
      const tog=document.createElement('button');
      tog.type='button';tog.className='tn-tog';
      tog.textContent=collapsed.has(p.id)?('▸ '+kids.length):'▾';
      tog.title=collapsed.has(p.id)?'Expand':'Collapse';
      tog.addEventListener('click',e=>{e.stopPropagation();toggle(p.id);});
      node.appendChild(tog);
    }

    const addBtn=document.createElement('button');
    addBtn.type='button';addBtn.className='tn-add';
    addBtn.textContent='+';addBtn.title='Add child to '+p.name;
    addBtn.addEventListener('click',e=>{e.stopPropagation();addChildTo(p.id);});
    node.appendChild(addBtn);

    node.addEventListener('click',()=>select(p.id));
    canvas.appendChild(node);

    // ── Spouse node (if present) ──
    if(p.spouse&&sx!==null){
      const sp=p.spouse;
      const spNode=document.createElement('div');
      spNode.className='tn tn-sp'+(isSelected?' tn-sel':'')+cls;
      spNode.style.cssText=`left:${sx-NW/2}px;top:${y}px;width:${NW}px`;

      const spAv=document.createElement('div');
      spAv.className='tn-av tn-sp-av'+(sp.deceased?' tn-av-dec':'');
      spAv.textContent=initials(sp.name);
      spNode.appendChild(spAv);

      const spNm=document.createElement('div');spNm.className='tn-name';
      spNm.appendChild(document.createTextNode(sp.name));
      if(sp.deceased){const d=document.createElement('span');d.className='tn-dagger';d.textContent=' †';spNm.appendChild(d);}
      spNode.appendChild(spNm);

      // Clicking the spouse node opens the person's editor (spouse is edited there)
      spNode.addEventListener('click',()=>select(p.id));
      canvas.appendChild(spNode);
    }
  }

  host.appendChild(canvas);
}

// ── Editor ────────────────────────────────────────────────────────────────────

function openEditor(){
  const p=byId(selectedId);const ed=el('editor');
  if(!p){ed.hidden=true;return;}
  ed.hidden=false;
  setBackdrop(isMobile());
  el('eName').value=p.name||'';
  el('eSpouse').value=p.spouse?.name||'';
  el('eDeceased').checked=!!p.deceased;
  el('eSpouseDeceased').checked=!!p.spouse?.deceased;
  const sel=el('eParent');const skip=descendants(p.id);skip.add(p.id);
  const opts=['<option value="">— Top of tree —</option>'];
  family.filter(q=>!skip.has(q.id)).slice().sort((a,b)=>a.name.localeCompare(b.name)).forEach(q=>{
    opts.push('<option value="'+q.id+'">'+'·'.repeat(depthOf(q.id))+' '+esc(q.name)+(q.spouse?' & '+esc(q.spouse.name):'')+'</option>');
  });
  sel.innerHTML=opts.join('');sel.value=p.parentId||'';
  const img=el('ePhoto'),fb=el('ePhotoFallback'),rm=el('ePhotoRemove');
  if(p.photo){img.src=p.photo;img.hidden=false;fb.hidden=true;rm.hidden=false;}
  else{img.hidden=true;fb.hidden=false;fb.textContent=initials(p.name);rm.hidden=true;}
}

async function saveMember(){
  const p=byId(selectedId);if(!p)return;
  p.name=el('eName').value.trim()||'Unnamed';
  const spName=el('eSpouse').value.trim();
  const spDec=el('eSpouseDeceased').checked;
  if(spName){p.spouse={name:spName};if(spDec)p.spouse.deceased=true;}else{delete p.spouse;}
  p.deceased=el('eDeceased').checked;
  p.parentId=el('eParent').value||null;
  showSaving();
  try{await saveToDB(p);showSaved();openEditor();}
  catch(e){showSaveError();toast('Failed to save — check your connection','err');}
}

const debouncedSave=debounce(saveMember,700);

// ── Add members ───────────────────────────────────────────────────────────────

async function addChildTo(parentId){
  const id='p'+Date.now().toString(36)+Math.floor(Math.random()*1e4).toString(36);
  const newPerson={id,name:'New member',parentId};
  family.push(newPerson);
  if(parentId)collapsed.delete(parentId);
  selectedId=id;
  openEditor();renderTree();
  await saveToDB(newPerson);
  el('eName').focus();el('eName').select();
}

async function addMember(){
  const parentId=(selectedId&&byId(selectedId))?selectedId:(roots()[0]?roots()[0].id:null);
  await addChildTo(parentId);
}

// ── Delete ────────────────────────────────────────────────────────────────────

async function deleteMember(){
  const p=byId(selectedId);if(!p)return;
  const kids=childrenOf(p.id);
  const msg=kids.length
    ?('Delete '+p.name+'? Their '+kids.length+' child(ren) will move up to the parent above.')
    :('Delete '+p.name+'?');
  if(!confirm(msg))return;
  const name=p.name;
  const batch=db.batch();
  for(const c of kids)batch.set(personRef(c.id),toDoc({...c,parentId:p.parentId}));
  batch.delete(personRef(p.id));
  selectedId=null;el('editor').hidden=true;
  await batch.commit();
  try{await photoRef(p.id).delete();}catch(e){/* no photo in Storage — ignore */}
  localStorage.removeItem('photo_'+p.id);
  toast(name+' removed');
}

// ── Photos ────────────────────────────────────────────────────────────────────

async function onPhoto(e){
  const f=e.target.files[0];if(!f)return;
  const p=byId(selectedId);if(!p)return;
  showSaving();
  try{
    const snap=await photoRef(p.id).put(f);
    const url=await snap.ref.getDownloadURL();
    p.photo=url;
    await saveToDB(p);
    showSaved();
    openEditor();renderTree();
  }catch(err){
    showSaveError();toast('Photo upload failed — check your connection','err');
  }
  e.target.value='';
}
async function removePhoto(){
  const p=byId(selectedId);if(!p)return;
  showSaving();
  try{await photoRef(p.id).delete();}catch(e){/* not in Storage — ignore */}
  localStorage.removeItem('photo_'+p.id);
  delete p.photo;
  try{await saveToDB(p);showSaved();}
  catch(e){showSaveError();}
  openEditor();renderTree();
}

// ── Export / Import ───────────────────────────────────────────────────────────

function exportData(){
  const data=family.map(({photo:_photo,...rest})=>rest);
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='family-data.json';
  document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(a.href);
  toast('Downloaded family-data.json');
}

async function importData(e){
  const f=e.target.files[0];if(!f)return;
  const r=new FileReader();
  r.onload=async ev=>{
    try{
      const data=JSON.parse(ev.target.result);
      if(!Array.isArray(data))throw 0;
      const existing=await peopleCol.get();
      const batch=db.batch();
      existing.forEach(d=>batch.delete(d.ref));
      data.forEach(p=>batch.set(personRef(p.id),toDoc(p)));
      await batch.commit();
      selectedId=null;collapsed.clear();el('editor').hidden=true;
      toast('Data imported — '+data.length+' people loaded');
    }catch(err){toast('That file is not a valid family-data.json export','err');}
  };
  r.readAsText(f);e.target.value='';
}

// ── Expand / Collapse ─────────────────────────────────────────────────────────

function expandAll(){collapsed.clear();renderTree();}
function collapseAll(){
  collapsed=new Set(family.filter(p=>childrenOf(p.id).length).map(p=>p.id));
  renderTree();
}

// ── Keyboard shortcuts ────────────────────────────────────────────────────────

document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&selectedId)closeEditor();
  if((e.ctrlKey||e.metaKey)&&e.key==='s'){e.preventDefault();if(selectedId)saveMember();}
});

// ── Event listeners ───────────────────────────────────────────────────────────

el('editorBackdrop').addEventListener('click',closeEditor);
el('addBtn').addEventListener('click',addMember);
el('saveBtn').addEventListener('click',saveMember);
el('deleteBtn').addEventListener('click',deleteMember);
el('closeEditor').addEventListener('click',closeEditor);
el('ePhotoInput').addEventListener('change',onPhoto);
el('ePhotoRemove').addEventListener('click',removePhoto);
el('exportBtn').addEventListener('click',exportData);
el('importBtn').addEventListener('click',()=>el('importFile').click());
el('importFile').addEventListener('change',importData);
el('expandBtn').addEventListener('click',expandAll);
el('collapseBtn').addEventListener('click',collapseAll);

// Auto-save: debounced for text fields, immediate for checkboxes/selects
el('eName').addEventListener('input',debouncedSave);
el('eSpouse').addEventListener('input',debouncedSave);
el('eDeceased').addEventListener('change',saveMember);
el('eSpouseDeceased').addEventListener('change',saveMember);
el('eParent').addEventListener('change',saveMember);

// Search with clear button
el('search').addEventListener('input',e=>{
  term=norm(e.target.value);
  el('searchClear').hidden=!term;
  renderTree();
});
el('searchClear').addEventListener('click',()=>{
  el('search').value='';term='';
  el('searchClear').hidden=true;
  renderTree();el('search').focus();
});
