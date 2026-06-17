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

function clone(x){return JSON.parse(JSON.stringify(x));}
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

function toDoc(p){const{photo,...data}=p;return data;}

async function saveToDB(p){await personRef(p.id).set(toDoc(p));}

async function seedDefaults(){
  const batch=db.batch();
  DEFAULT_FAMILY.forEach(p=>batch.set(personRef(p.id),toDoc(p)));
  await batch.commit();
}

function withPhoto(p){
  const photo=localStorage.getItem('photo_'+p.id);
  return photo?{...p,photo}:p;
}

el('tree').innerHTML='<div class="empty">Connecting…</div>';
peopleCol.onSnapshot(snapshot=>{
  if(snapshot.empty){seedDefaults();return;}
  family=snapshot.docs.map(d=>withPhoto(d.data()));
  if(selectedId&&!byId(selectedId)){selectedId=null;el('editor').hidden=true;}
  render();
},()=>{el('tree').innerHTML='<div class="empty">Connection error — please refresh.</div>';});

function render(){renderStats();renderTree();}
function renderStats(){el('stats').textContent=family.length+' people · '+(maxDepth()+1)+' generations';}
function toggle(id){collapsed.has(id)?collapsed.delete(id):collapsed.add(id);renderTree();}
function select(id){selectedId=id;openEditor();renderTree();}

function renderTree(){
  const host=el('tree');host.innerHTML='';
  if(!family.length){host.innerHTML='<div class="empty">No members yet. Click "+ Add member".</div>';return;}
  for(const r of roots())host.appendChild(renderNode(r));
}

function renderNode(p){
  const wrap=document.createElement('div');wrap.className='node';
  const kids=childrenOf(p.id);const hasKids=kids.length>0;
  const expanded=term?true:!collapsed.has(p.id);
  const row=document.createElement('div');
  row.className='rowline'+(p.id===selectedId?' selected':'');
  if(term){if(selfMatch(p))row.classList.add('hit');else if(!branchMatch(p))row.classList.add('dim');}
  const caret=document.createElement('button');caret.className='caret'+(hasKids?'':' leaf');
  caret.textContent=hasKids?(expanded?'▾':'▸'):'•';
  if(hasKids)caret.addEventListener('click',e=>{e.stopPropagation();toggle(p.id);});
  row.appendChild(caret);
  let av;
  if(p.photo){av=document.createElement('img');av.src=p.photo;av.alt=p.name;}else{av=document.createElement('div');av.textContent=initials(p.name);}
  av.className='avatar';row.appendChild(av);
  const meta=document.createElement('div');meta.className='meta';
  const name=document.createElement('div');name.className='name';name.appendChild(document.createTextNode(p.name));
  if(p.deceased){const d=document.createElement('span');d.className='dagger';d.textContent='†';name.appendChild(d);}
  meta.appendChild(name);
  const bits=[];if(p.spouse)bits.push('& '+p.spouse.name+(p.spouse.deceased?' †':''));
  const sub=document.createElement('div');sub.className='sub';sub.textContent=bits.join('');
  if(hasKids){const c=document.createElement('span');c.className='count';c.textContent=(bits.length?' · ':'')+kids.length+(kids.length===1?' child':' children');sub.appendChild(c);}
  if(sub.textContent)meta.appendChild(sub);
  row.appendChild(meta);
  row.addEventListener('click',()=>select(p.id));
  wrap.appendChild(row);
  if(hasKids&&expanded){const ch=document.createElement('div');ch.className='children';for(const k of kids)ch.appendChild(renderNode(k));wrap.appendChild(ch);}
  return wrap;
}

function openEditor(){
  const p=byId(selectedId);const ed=el('editor');
  if(!p){ed.hidden=true;return;}ed.hidden=false;
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
  await saveToDB(p);
  openEditor();
}

async function addMember(){
  const parentId=(selectedId&&byId(selectedId))?selectedId:(roots()[0]?roots()[0].id:null);
  const id='p'+Date.now().toString(36)+Math.floor(Math.random()*1e4).toString(36);
  const newPerson={id,name:'New member',parentId};
  family.push(newPerson);
  if(parentId)collapsed.delete(parentId);
  selectedId=id;
  openEditor();renderTree();
  await saveToDB(newPerson);
  el('eName').focus();el('eName').select();
}

async function deleteMember(){
  const p=byId(selectedId);if(!p)return;
  const kids=childrenOf(p.id);
  const msg=kids.length?('Delete '+p.name+'? Their '+kids.length+' child(ren) will move up to the parent above.'):('Delete '+p.name+'?');
  if(!confirm(msg))return;
  const batch=db.batch();
  for(const c of kids)batch.set(personRef(c.id),toDoc({...c,parentId:p.parentId}));
  batch.delete(personRef(p.id));
  localStorage.removeItem('photo_'+p.id);
  selectedId=null;el('editor').hidden=true;
  await batch.commit();
}

function onPhoto(e){
  const f=e.target.files[0];if(!f)return;
  const r=new FileReader();
  r.onload=ev=>{
    const p=byId(selectedId);
    if(p){localStorage.setItem('photo_'+p.id,ev.target.result);p.photo=ev.target.result;openEditor();renderTree();}
  };
  r.readAsDataURL(f);e.target.value='';
}
function removePhoto(){
  const p=byId(selectedId);
  if(p){localStorage.removeItem('photo_'+p.id);delete p.photo;openEditor();renderTree();}
}

function exportData(){
  const data=family.map(({photo,...rest})=>rest);
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='family-data.json';
  document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(a.href);
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
    }catch(err){alert('That file is not a valid family-data.json export.');}
  };
  r.readAsText(f);e.target.value='';
}

function expandAll(){collapsed.clear();renderTree();}
function collapseAll(){collapsed=new Set(family.filter(p=>childrenOf(p.id).length).map(p=>p.id));renderTree();}

el('addBtn').addEventListener('click',addMember);
el('saveBtn').addEventListener('click',saveMember);
el('deleteBtn').addEventListener('click',deleteMember);
el('ePhotoInput').addEventListener('change',onPhoto);
el('ePhotoRemove').addEventListener('click',removePhoto);
el('exportBtn').addEventListener('click',exportData);
el('importBtn').addEventListener('click',()=>el('importFile').click());
el('importFile').addEventListener('change',importData);
el('expandBtn').addEventListener('click',expandAll);
el('collapseBtn').addEventListener('click',collapseAll);
el('search').addEventListener('input',e=>{term=norm(e.target.value);renderTree();});
