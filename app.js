firebase.initializeApp({
  apiKey:"AIzaSyAU9AWPfts0RZ2Ss6ue_ipaeI2hDSehVV8",
  authDomain:"family-tree-43418.firebaseapp.com",
  projectId:"family-tree-43418",
  storageBucket:"family-tree-43418.firebasestorage.app",
  messagingSenderId:"233247197134",
  appId:"1:233247197134:web:ef0f5d143b0fbe9e26cd9f"
});
const db=firebase.firestore();
const auth=firebase.auth();
const peopleCol=db.collection('families').doc('selina').collection('people');
const personRef=id=>peopleCol.doc(String(id));

const EDITORS=['machikozinvestments@gmail.com','davidtayi19@gmail.com'];
const SUPER_ADMIN='davidtayi19@gmail.com';
let currentUser=null,isEditor=false,isSuperAdmin=false;

function applyAuthState(){
  const signedIn=!!currentUser;
  const email=currentUser?.email||'';
  el('authSignIn').hidden=signedIn;
  el('authUser').hidden=!signedIn;
  el('authEmail').textContent=email;
  // Show/hide editor controls
  const editEls=['addBtn','saveBtn','deleteBtn','ePhotoInput','ePhotoRemove',
                 'eSpousePhotoInput','eSpousePhotoRemove','backupBtn'];
  editEls.forEach(id=>{const e=el(id);if(e)e.hidden=!isEditor||e._forceHidden;});
  const importWrap=el('importWrap');
  if(importWrap)importWrap.hidden=!isSuperAdmin;
  const restoreWrap=el('restoreWrap');
  if(restoreWrap)restoreWrap.hidden=!isSuperAdmin;
  el('eName').readOnly=!isEditor;
  el('eSpouse').readOnly=!isEditor;
  el('eDeceased').disabled=!isEditor;
  el('eSpouseDeceased').disabled=!isEditor;
  el('eParent').disabled=!isEditor;
  el('editor-header-label').textContent=isEditor?'Edit member':'View member';
}

function signInWithGoogle(){
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .catch(err=>{
      if(err.code==='auth/popup-closed-by-user'||err.code==='auth/cancelled-popup-request')return;
      toast('Sign-in failed: '+err.message,'err');
      console.error('Auth error:',err);
    });
}
function signOutUser(){auth.signOut();}

auth.onAuthStateChanged(user=>{
  currentUser=user;
  isEditor=!!(user&&EDITORS.includes(user.email));
  isSuperAdmin=!!(user&&user.email===SUPER_ADMIN);
  applyAuthState();
});

const el=id=>document.getElementById(id);


let family=[],selectedId=null,collapsed=new Set(),term='',migrationDone=false;

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

function toDoc(p){return{...p};}
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
  if(!migrationDone){migrationDone=true;migrateLocalPhotos();}
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
    const barL=Math.min(cx,...cxs),barR=Math.max(cx,...cxs);
    if(barL<barR)addLine(svg,barL,barY,barR,barY);
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
    if(p.photo){
      av=document.createElement('img');av.src=p.photo;av.alt=p.name;
      const pos=p.photoPos||{x:50,y:50};
      av.style.objectPosition=`${pos.x}% ${pos.y}%`;
    }else{
      av=document.createElement('div');av.textContent=initials(p.name);
    }
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

      let spAv;
      if(sp.photo){
        spAv=document.createElement('img');
        spAv.src=sp.photo;spAv.alt=sp.name;
        const spPos=sp.pos||{x:50,y:50};
        spAv.style.objectPosition=`${spPos.x}% ${spPos.y}%`;
      }else{
        spAv=document.createElement('div');
        spAv.textContent=initials(sp.name);
      }
      spAv.className='tn-av tn-sp-av'+(sp.deceased?' tn-av-dec':'');
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
  const img=el('ePhoto'),drag=el('ePhotoDrag'),fb=el('ePhotoFallback'),rm=el('ePhotoRemove'),hint=el('ePhotoDrag').nextElementSibling;
  if(p.photo){
    const pos=p.photoPos||{x:50,y:50};
    img.src=p.photo;img.style.objectPosition=`${pos.x}% ${pos.y}%`;
    drag.hidden=false;fb.hidden=true;rm.hidden=false;hint.hidden=false;
  }else{
    drag.hidden=true;fb.hidden=false;fb.textContent=initials(p.name);rm.hidden=true;hint.hidden=true;
  }
  // Spouse photo section — only show when a spouse name exists
  const sp=p.spouse;
  el('eSpousePhotoWrap').hidden=!sp?.name;
  if(sp?.name){
    const sImg=el('eSpousePhoto'),sDrag=el('eSpousePhotoDrag'),sFb=el('eSpousePhotoFallback'),sRm=el('eSpousePhotoRemove'),sHint=el('eSpousePhotoDrag').nextElementSibling;
    if(sp.photo){
      const sPos=sp.pos||{x:50,y:50};
      sImg.src=sp.photo;sImg.style.objectPosition=`${sPos.x}% ${sPos.y}%`;
      sDrag.hidden=false;sFb.hidden=true;sRm.hidden=false;sHint.hidden=false;
    }else{
      sDrag.hidden=true;sFb.hidden=false;sFb.textContent=initials(sp.name);sRm.hidden=true;sHint.hidden=true;
    }
  }
}

async function saveMember(){
  const p=byId(selectedId);if(!p)return;
  p.name=el('eName').value.trim()||'Unnamed';
  const spName=el('eSpouse').value.trim();
  const spDec=el('eSpouseDeceased').checked;
  if(spName){
    const spPhoto=p.spouse?.photo||null;
    const spPhotoHD=p.spouse?.photoHD||null;
    const spPos=p.spouse?.pos||null;
    p.spouse={name:spName};
    if(spDec)p.spouse.deceased=true;
    if(spPhoto)p.spouse.photo=spPhoto;
    if(spPhotoHD)p.spouse.photoHD=spPhotoHD;
    if(spPos)p.spouse.pos=spPos;
  }else{delete p.spouse;}
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
  localStorage.removeItem('photo_'+p.id);
  toast(name+' removed');
}

// ── Photos ────────────────────────────────────────────────────────────────────

async function compressImage(src,maxSide=300,quality=0.72){
  const blobUrl=src instanceof File?URL.createObjectURL(src):null;
  return new Promise((resolve,reject)=>{
    const img=new Image();
    img.onload=()=>{
      if(blobUrl)URL.revokeObjectURL(blobUrl);
      const scale=Math.min(1,maxSide/Math.max(img.width,img.height));
      const w=Math.round(img.width*scale),h=Math.round(img.height*scale);
      const c=document.createElement('canvas');
      c.width=w;c.height=h;
      c.getContext('2d').drawImage(img,0,0,w,h);
      resolve(c.toDataURL('image/jpeg',quality));
    };
    img.onerror=()=>{if(blobUrl)URL.revokeObjectURL(blobUrl);reject(new Error('load'));};
    img.src=blobUrl||src;
  });
}

async function bothSizes(src){
  // Returns [thumbnail, hdVersion] — compress once per size
  const [thumb,hd]=await Promise.all([
    compressImage(src,300,0.72),
    compressImage(src,800,0.90),
  ]);
  return[thumb,hd];
}

async function onPhoto(e){
  const f=e.target.files[0];if(!f)return;
  const p=byId(selectedId);if(!p)return;
  showSaving();
  try{
    const[thumb,hd]=await bothSizes(f);
    p.photo=thumb;p.photoHD=hd;p.photoPos={x:50,y:50};
    await saveToDB(p);
    showSaved();openEditor();renderTree();
  }catch(err){
    showSaveError();toast('Photo upload failed','err');
  }
  e.target.value='';
}

async function removePhoto(){
  const p=byId(selectedId);if(!p)return;
  showSaving();
  localStorage.removeItem('photo_'+p.id);
  delete p.photo;delete p.photoHD;delete p.photoPos;
  try{await saveToDB(p);showSaved();}
  catch(e){showSaveError();}
  openEditor();renderTree();
}

async function onSpousePhoto(e){
  const f=e.target.files[0];if(!f)return;
  const p=byId(selectedId);if(!p||!p.spouse)return;
  showSaving();
  try{
    const[thumb,hd]=await bothSizes(f);
    p.spouse.photo=thumb;p.spouse.photoHD=hd;p.spouse.pos={x:50,y:50};
    await saveToDB(p);
    showSaved();openEditor();renderTree();
  }catch(err){
    showSaveError();toast('Photo upload failed','err');
  }
  e.target.value='';
}

async function removeSpousePhoto(){
  const p=byId(selectedId);if(!p||!p.spouse)return;
  showSaving();
  delete p.spouse.photo;delete p.spouse.photoHD;delete p.spouse.pos;
  try{await saveToDB(p);showSaved();}
  catch(e){showSaveError();}
  openEditor();renderTree();
}

// ── Photo migration (localStorage → Firestore) ───────────────────────────────

async function migrateLocalPhotos(){
  const candidates=family.filter(p=>localStorage.getItem('photo_'+p.id));
  if(!candidates.length)return;
  let failed=0;
  for(const p of candidates){
    const local=localStorage.getItem('photo_'+p.id);
    try{
      // p.photo===local means withPhoto() pulled it from localStorage — needs saving to Firestore
      if(!p.photo||p.photo===local){
        const[thumb,hd]=await bothSizes(local);
        p.photo=thumb;p.photoHD=hd;
        await saveToDB(p);
      }
      localStorage.removeItem('photo_'+p.id);
    }catch(e){failed++;}
  }
  if(failed)toast(failed+' photo(s) could not be migrated — try refreshing','err');
  else renderTree();
}

// ── Photo backup ─────────────────────────────────────────────────────────────

function backupPhotos(){
  const count=family.filter(p=>p.photo||p.photoHD||p.spouse?.photo||p.spouse?.photoHD).length;
  if(!count){toast('No photos to back up','err');return;}
  const date=new Date().toISOString().slice(0,10);
  const blob=new Blob([JSON.stringify(family,null,2)],{type:'application/json'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download=`family-backup-${date}.json`;
  document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(a.href);
  toast(`Backup saved — ${count} people with photos`);
}

async function restorePhotos(e){
  const f=e.target.files[0];if(!f)return;
  const r=new FileReader();
  r.onload=async ev=>{
    try{
      const data=JSON.parse(ev.target.result);
      if(!Array.isArray(data))throw new Error('Invalid backup format');
      const photoCount=data.filter(p=>p.photo||p.photoHD||p.spouse?.photo||p.spouse?.photoHD).length;
      if(!photoCount){toast('No photos found in backup','err');e.target.value='';return;}
      if(!confirm(`Restore ${photoCount} people's photos from backup?\n\nThis will update photos in the database.`)){e.target.value='';return;}
      showSaving();
      let saved=0;
      for(const p of data){
        if(!p.id)continue;
        const updates={};
        if(p.photo)updates.photo=p.photo;
        if(p.photoHD)updates.photoHD=p.photoHD;
        if(p.spouse?.photo)updates['spouse.photo']=p.spouse.photo;
        if(p.spouse?.photoHD)updates['spouse.photoHD']=p.spouse.photoHD;
        if(Object.keys(updates).length>0){
          await personRef(p.id).update(updates);
          saved++;
        }
      }
      await loadFamily();
      showSaved();
      toast(`Restored photos for ${saved} people`);
      e.target.value='';
    }catch(err){
      console.error('Restore error:',err);
      showSaveError();
      toast('Failed to restore photos: '+err.message,'err');
      e.target.value='';
    }
  };
  r.readAsText(f);
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
  const photoPeople=family.filter(p=>p.photo||p.photoHD||p.spouse?.photo||p.spouse?.photoHD).length;
  const warn=photoPeople>0
    ?`This will REPLACE all current data and permanently delete ${photoPeople} people's photos. Make sure you have a backup.\n\nContinue?`
    :'This will REPLACE all current family data. Continue?';
  if(!confirm(warn)){e.target.value='';return;}
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

// ── Print helpers (shared) ────────────────────────────────────────────────────

function ptCollect(rootId,maxDepth){
  const arr=[];
  (function walk(id,d){
    if(d>maxDepth)return;
    const p=byId(id);if(!p)return;
    arr.push(p);
    childrenOf(id).forEach(c=>walk(c.id,d+1));
  })(rootId,0);
  return arr;
}

function ptAv(name,photo,photoHD,pos){
  const src=photoHD||photo;
  const style=pos&&pos.x&&pos.y?` style="object-position:${pos.x}% ${pos.y}%"`:'';
  if(src)return`<img class="pt-av" src="${src}" alt="${esc(name)}"${style}>`;
  return`<div class="pt-av pt-ini">${esc(initials(name))}</div>`;
}

function ptPersonHtml(p){
  const pos=p.photoPos||p.pos;
  return`<div class="pt-person${p.deceased?' dec':''}">${ptAv(p.name,p.photo,p.photoHD,pos)}<div class="pt-nm">${esc(p.name)}${p.deceased?' †':''}</div></div>`;
}

function ptNodeHtml(p,people){
  const kids=people.filter(x=>x.parentId===p.id);
  let h=`<div class="pt-unit"><div class="pt-couple">${ptPersonHtml(p)}`;
  if(p.spouse)h+=`<div class="pt-amp">&amp;</div>${ptPersonHtml(p.spouse)}`;
  h+=`</div>`;
  if(kids.length){
    h+=`<div class="pt-down"></div><div class="pt-row">`;
    kids.forEach(k=>h+=`<div class="pt-col">${ptNodeHtml(k,people)}</div>`);
    h+=`</div>`;
  }
  h+=`</div>`;
  return h;
}

function ptTitle(p){return p.name+(p.spouse?` & ${p.spouse.name}`:'')+' Family';}


const PT_CSS=`
*{box-sizing:border-box;margin:0;padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:#fff;color:#2b2b2b;}
.pt-page{position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:center;padding:14px 0;}
.pt-brand{font-size:10px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:#8B6B3D;opacity:.45;margin-bottom:6px;}
.pt-title{font-size:15px;font-weight:700;margin-bottom:20px;color:#3a2e24;letter-spacing:.2px;}
.pt-tree{display:flex;justify-content:center;position:relative;z-index:1;}
.pt-unit{display:flex;flex-direction:column;align-items:center;}
.pt-couple{display:flex;align-items:center;gap:5px;background:#f5f0e8;border:1.5px solid #d4c5b0;border-radius:7px;padding:7px 9px;}
.pt-person{display:flex;flex-direction:column;align-items:center;gap:3px;}
.pt-person.dec{opacity:.6;}
.pt-av{width:38px;height:38px;border-radius:50%;object-fit:cover;border:1.5px solid #c8b8a2;display:block;}
.pt-ini{background:#6b4f3a;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;}
.pt-nm{font-size:9.5px;font-weight:600;text-align:center;max-width:70px;line-height:1.3;}
.pt-amp{font-size:9px;color:#9a9388;align-self:center;padding:0 1px;}
.pt-down{width:0;height:16px;border-left:2px solid #b0a090;margin:0 auto;}
.pt-row{display:flex;align-items:flex-start;justify-content:center;}
.pt-col{display:flex;flex-direction:column;align-items:center;position:relative;padding:16px 5px 0;}
.pt-col::before{content:'';position:absolute;top:0;left:0;right:0;border-top:2px solid #b0a090;}
.pt-col:first-child::before{left:50%;}
.pt-col:last-child::before{right:50%;}
.pt-col:first-child:last-child::before{display:none;}
.pt-col::after{content:'';position:absolute;top:0;left:50%;width:0;height:16px;border-left:2px solid #b0a090;transform:translateX(-1px);}
`;

function ptOpenWindow(title,body,extraCss){
  const html=`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>${title}</title><style>${PT_CSS}${extraCss||''}</style></head><body>${body}</body></html>`;
  const blob=new Blob([html],{type:'text/html'});
  const url=URL.createObjectURL(blob);
  const win=window.open(url,'_blank');
  if(!win){toast('Allow pop-ups to use Print','err');return null;}
  return win;
}

// ── Print 9 sub-trees ─────────────────────────────────────────────────────────

function printFamilyTrees(){
  const root=roots()[0];
  if(!root){toast('No family data to print','err');return;}
  function section(rootId,maxDepth,title){
    const people=ptCollect(rootId,maxDepth);
    return`<section class="pt-page"><div class="pt-brand">Tayi Family Tree</div><h2 class="pt-title">${esc(title)}</h2><div class="pt-tree">${ptNodeHtml(byId(rootId),people)}</div></section>`;
  }
  let html=section(root.id,1,ptTitle(root)+' — Family Tree');
  childrenOf(root.id).forEach(c=>html+=section(c.id,99,ptTitle(c)+' — Family Tree'));
  const css=`@page{size:A4 landscape;margin:12mm;}.pt-page{page-break-after:always;}.pt-page:last-child{page-break-after:auto;}`;
  const win=ptOpenWindow('Family Tree — Print',html,css);
  if(win)setTimeout(()=>{win.focus();win.print();},400);
}

// ── Print full family poster ──────────────────────────────────────────────────

function printFullTree(){
  const root=roots()[0];
  if(!root){toast('No family data to print','err');return;}
  try{
    console.log('Starting poster generation...');
    const people=ptCollect(root.id,99);
    console.log('Collected '+people.length+' people');
    const heading=esc(root.name+(root.spouse?` & ${root.spouse.name}`:'')+' — Full Family Tree');
    console.log('Generating tree HTML...');
    const treeHtml=ptNodeHtml(root,people);
    console.log('Tree HTML length: '+treeHtml.length);
    const body=`
      <div class="poster-wrap">
        <div class="poster-brand">TAYI FAMILY TREE</div>
        <h1 class="poster-title">${heading}</h1>
        <div class="poster-tree pt-tree">${treeHtml}</div>
      </div>
      <div class="pt-hint">
        <strong>Print instructions:</strong> Press Ctrl+P → Save as PDF →
        take PDF to print shop and request <strong>3m wide × 2m tall</strong> large-format print.
      </div>
    `;
    console.log('Body HTML length: '+body.length);
    const css=`
      @page{size:3000mm 2000mm;margin:0;}
      html,body{width:3000mm;height:2000mm;margin:0;padding:0;overflow:hidden;}
      .poster-wrap{
        width:3000mm;height:2000mm;
        padding:60mm 80mm 40mm;
        display:flex;flex-direction:column;align-items:center;
        background:#fffdf9;
        overflow:hidden;
      }
      .poster-brand{
        font-size:18mm;font-weight:900;letter-spacing:8mm;
        color:#8B6B3D;opacity:.5;text-transform:uppercase;
        margin-bottom:12mm;
      }
      .poster-title{
        font-size:30mm;font-weight:700;color:#3a2e24;
        margin-bottom:30mm;letter-spacing:1mm;text-align:center;
      }
      .poster-tree{zoom:4.5;transform-origin:top center;flex-shrink:0;}
      .pt-hint{
        position:fixed;bottom:0;left:0;right:0;
        background:#f5f0e8;padding:12px 20px;font-size:13px;
        color:#5a4a3a;text-align:center;border-top:1px solid #d4c5b0;
      }
      @media print{.pt-hint{display:none;}}
    `;
    console.log('Opening window...');
    const win=ptOpenWindow('Family Tree — Poster (3m × 2m)',body,css);
    console.log('ptOpenWindow returned: '+(win?'success':'null'));
    if(win){
      console.log('Window opened, writing content...');
      win.document.write('<script>window.onload=function(){document.querySelector(".pt-hint").style.display="block";}<\/script>');
      console.log('Poster window ready');
    }
  }catch(e){
    console.error('Poster error:',e,e.stack);
    toast('Error: '+e.message,'err');
  }
}

// ── Expand / Collapse ─────────────────────────────────────────────────────────

function expandAll(){collapsed.clear();renderTree();}
function collapseAll(){
  collapsed=new Set(family.filter(p=>childrenOf(p.id).length).map(p=>p.id));
  renderTree();
}

// ── Photo drag to reposition ──────────────────────────────────────────────────

function initPhotoDrag(wrapperId, imgId, getPos, setPos) {
  const wrap=el(wrapperId), img=el(imgId);
  let dragging=false, startX, startY, startPx, startPy;
  wrap.addEventListener('pointerdown', e=>{
    if(!img.src)return;
    dragging=true;
    startX=e.clientX; startY=e.clientY;
    const pos=getPos(); startPx=pos.x; startPy=pos.y;
    wrap.setPointerCapture(e.pointerId);
    wrap.style.cursor='grabbing';
    e.preventDefault();
  });
  wrap.addEventListener('pointermove', e=>{
    if(!dragging)return;
    const rect=wrap.getBoundingClientRect();
    const scale=100/rect.width;
    const nx=Math.max(0, Math.min(100, startPx-(e.clientX-startX)*scale));
    const ny=Math.max(0, Math.min(100, startPy-(e.clientY-startY)*scale));
    img.style.objectPosition=`${nx}% ${ny}%`;
    setPos(nx, ny);
  });
  const stop=()=>{dragging=false; wrap.style.cursor='grab';};
  wrap.addEventListener('pointerup', stop);
  wrap.addEventListener('pointercancel', stop);
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
el('eSpousePhotoInput').addEventListener('change',onSpousePhoto);
el('eSpousePhotoRemove').addEventListener('click',removeSpousePhoto);
el('exportBtn').addEventListener('click',exportData);
el('importBtn').addEventListener('click',()=>el('importFile').click());
el('backupBtn').addEventListener('click',backupPhotos);
el('restoreBtn').addEventListener('click',()=>el('restoreFile').click());
el('restoreFile').addEventListener('change',restorePhotos);
el('importFile').addEventListener('change',importData);
el('expandBtn').addEventListener('click',expandAll);
el('collapseBtn').addEventListener('click',collapseAll);
el('printBtn').addEventListener('click',printFamilyTrees);
el('posterBtn').addEventListener('click',printFullTree);
el('authSignInBtn').addEventListener('click',signInWithGoogle);
el('authSignOut').addEventListener('click',signOutUser);

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

// Photo drag initialization
initPhotoDrag('ePhotoDrag','ePhoto',
  ()=>byId(selectedId)?.photoPos||{x:50,y:50},
  (x,y)=>{const p=byId(selectedId);if(p){p.photoPos={x,y};debouncedSave();}}
);
initPhotoDrag('eSpousePhotoDrag','eSpousePhoto',
  ()=>byId(selectedId)?.spouse?.pos||{x:50,y:50},
  (x,y)=>{const p=byId(selectedId);if(p?.spouse){p.spouse.pos={x,y};debouncedSave();}}
);
