(function(){
'use strict';
const STORAGE_KEY='resumekit.resume.v1';
const emptyData=()=>({name:'',title:'',email:'',phone:'',location:'',website:'',summary:'',skills:'',extras:'',experience:[],education:[],projects:[]});
let data=emptyData();
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const clean=value=>String(value??'').trim();
function notify(message,type='success'){const el=$('#notice');el.className='alert alert-'+type;el.textContent=message;window.scrollTo({top:0,behavior:'smooth'});setTimeout(()=>el.classList.add('d-none'),3500)}
function readFields(){ $$('[data-field]').forEach(el=>{data[el.dataset.field]=el.value}); }
function writeFields(){ $$('[data-field]').forEach(el=>{el.value=data[el.dataset.field]||''}); }
function renderRepeat(type){
 const target=$('#'+(type==='experience'?'experienceList':type==='education'?'educationList':'projectList'));
 target.innerHTML='';
 const fields={experience:[['role','Role / position'],['company','Company'],['dates','Dates'],['location','Location'],['details','Highlights (one per line)']],education:[['degree','Degree / course'],['school','Institution'],['dates','Dates'],['details','Details (optional)']],projects:[['name','Project name'],['stack','Technologies'],['link','Project link'],['details','What you built / achieved']]};
 data[type].forEach((item,index)=>{
  const card=document.createElement('div');card.className='repeat-card';
  card.innerHTML='<div class="repeat-card-head"><span>'+type.slice(0,-1)+' '+(index+1)+'</span><button class="btn btn-sm btn-link text-danger p-0" type="button" data-remove="'+type+'" data-index="'+index+'"><i class="fa-regular fa-trash-can"></i> Remove</button></div>';
  fields[type].forEach(([key,placeholder])=>{const el=key==='details'?document.createElement('textarea'):document.createElement('input');el.className='form-control form-control-sm';el.placeholder=placeholder;el.value=item[key]||'';el.dataset.repeat=type;el.dataset.index=index;el.dataset.key=key;if(key==='details'){el.rows=type==='experience'?3:2}card.appendChild(el)});
  target.appendChild(card);
 });
}
function addItem(type){data[type].push({});renderRepeat(type);const last=$('#'+(type==='experience'?'experienceList':type==='education'?'educationList':'projectList'));last.lastElementChild?.scrollIntoView({behavior:'smooth',block:'nearest'})}
function collectRepeat(el){const {repeat,index,key}=el.dataset;data[repeat][Number(index)][key]=el.value}
function section(title,content){return content?'<section class="resume-section"><h2>'+title+'</h2>'+content+'</section>':''}
function entryHead(left,right){return '<div class="resume-entry-head"><span>'+escapeHtml(left)+'</span><span>'+escapeHtml(right)+'</span></div>'}
function bullets(text){const lines=String(text||'').split(/\n+/).map(clean).filter(Boolean);return lines.length?'<ul>'+lines.map(x=>'<li>'+escapeHtml(x)+'</li>').join('')+'</ul>':''}
function buildPreview(){
 const contact=[data.email,data.phone,data.location,data.website].filter(Boolean).map(escapeHtml).join(' · ');
 const experience=data.experience.filter(x=>Object.values(x).some(clean)).map(x=>'<div class="resume-entry">'+entryHead(x.role||'Position',x.dates||'')+'<div class="resume-entry-meta">'+[x.company,x.location].filter(Boolean).map(escapeHtml).join(' · ')+'</div>'+bullets(x.details)+'</div>').join('');
 const education=data.education.filter(x=>Object.values(x).some(clean)).map(x=>'<div class="resume-entry">'+entryHead(x.degree||'Education',x.dates||'')+'<div class="resume-entry-meta">'+escapeHtml(x.school||'')+'</div>'+(x.details?'<p>'+escapeHtml(x.details)+'</p>':'')+'</div>').join('');
 const projects=data.projects.filter(x=>Object.values(x).some(clean)).map(x=>'<div class="resume-entry">'+entryHead(x.name||'Project','')+'<div class="resume-entry-meta">'+[x.stack,x.link].filter(Boolean).map(escapeHtml).join(' · ')+'</div>'+bullets(x.details)+'</div>').join('');
 const skills=data.skills.split(',').map(clean).filter(Boolean);
 $('#resumePreview').className='resume-page template-'+$('#templateSelect').value;
 $('#resumePreview').innerHTML='<header><h1>'+escapeHtml(data.name||'Your Name')+'</h1><div class="resume-title">'+escapeHtml(data.title||'Professional Title')+'</div><div class="resume-contact">'+(contact||'Email · Phone · Location · Website')+'</div></header>'+
 section('Profile',data.summary?'<p>'+escapeHtml(data.summary)+'</p>':'')+
 section('Experience',experience)+section('Education',education)+section('Projects',projects)+
 section('Skills',skills.length?'<p>'+skills.map(escapeHtml).join(' · ')+'</p>':'')+
 section('Certifications & Achievements',data.extras?bullets(data.extras):'');
 runQuality();
}
function runQuality(){
 const checks=[
 ['name','Name added',!!clean(data.name)],
 ['contact','At least one contact method',!!(clean(data.email)||clean(data.phone))],
 ['summary','Professional summary added',clean(data.summary).length>=40],
 ['experience','Experience or project evidence added',data.experience.some(x=>clean(x.role)||clean(x.company))||data.projects.some(x=>clean(x.name))],
 ['skills','Skills section added',data.skills.split(',').filter(clean).length>=3]
 ];
 const passed=checks.filter(x=>x[2]).length;
 $('#qualityCount').textContent=passed+'/5';$('#qualityBar').style.width=(passed/5*100)+'%';
 $('#qualityList').innerHTML=checks.map(x=>'<li class="'+(x[2]?'pass':'fail')+'"><i class="fa-solid '+(x[2]?'fa-circle-check':'fa-circle-exclamation')+'"></i>'+x[1]+'</li>').join('');
}
function resumeText(){return [data.name,data.title,data.summary,data.skills,data.extras,...data.experience.flatMap(Object.values),...data.education.flatMap(Object.values),...data.projects.flatMap(Object.values)].join(' ').toLowerCase()}
function checkMatch(){
 const jd=clean($('#jobDescription').value).toLowerCase();
 if(!jd){$('#matchResults').innerHTML='<p class="small text-warning">Paste a job description first.</p>';return}
 const stop=new Set(('the and for with that this from your you are our will have has not but all can able about into their they them job role work team using use skills experience required preferred knowledge strong good plus years'.split(' ')));
 const words=jd.match(/[a-z][a-z+#.-]{2,}/g)||[];
 const keywords=[...new Set(words.filter(w=>!stop.has(w)))].filter(w=>w.length>2);
 const text=resumeText();const matched=keywords.filter(w=>text.includes(w));const missing=keywords.filter(w=>!text.includes(w)).slice(0,30);
 const score=keywords.length?Math.round(matched.length/keywords.length*100):0;
 $('#matchResults').innerHTML='<div class="d-flex align-items-center justify-content-between"><strong>Keyword overlap</strong><span class="fw-bold">'+score+'%</span></div><div class="progress my-2"><div class="progress-bar" style="width:'+score+'%"></div></div><p class="small text-secondary">'+matched.length+' of '+keywords.length+' extracted terms appear in your resume text. This is a basic keyword comparison, not an ATS score or hiring prediction.</p><div class="mb-2"><strong class="small text-success">Found</strong><div>'+(matched.length?matched.map(x=>'<span class="match-chip">'+escapeHtml(x)+'</span>').join(''):'<span class="small text-secondary">No overlap detected yet.</span>')+'</div></div><div><strong class="small text-warning">Consider addressing</strong><div>'+missing.map(x=>'<span class="match-chip">'+escapeHtml(x)+'</span>').join('')+'</div></div>';
}
function save(){readFields();try{localStorage.setItem(STORAGE_KEY,JSON.stringify({version:1,data,template:$('#templateSelect').value}));notify('Resume saved in this browser.','success')}catch(e){notify('Could not save. Browser storage may be unavailable or full.','danger')}}
function load(){try{const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');if(saved&&saved.data){data=Object.assign(emptyData(),saved.data);['experience','education','projects'].forEach(k=>{if(!Array.isArray(data[k]))data[k]=[]});$('#templateSelect').value=saved.template||'classic'}}catch(e){data=emptyData()}writeFields();['experience','education','projects'].forEach(renderRepeat);buildPreview()}
function downloadJson(){readFields();const blob=new Blob([JSON.stringify({version:1,data,template:$('#templateSelect').value},null,2)],{type:'application/json'});downloadBlob(blob,'resumekit-backup.json')}
function downloadBlob(blob,name){const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)}
function importJson(file){const reader=new FileReader();reader.onload=()=>{try{const parsed=JSON.parse(reader.result);const imported=parsed.data||parsed;if(!imported||typeof imported!=='object')throw new Error('Invalid file');data=Object.assign(emptyData(),imported);['experience','education','projects'].forEach(k=>{if(!Array.isArray(data[k]))data[k]=[]});if(parsed.template)$('#templateSelect').value=parsed.template;writeFields();['experience','education','projects'].forEach(renderRepeat);buildPreview();notify('Resume backup imported.','success')}catch(e){notify('This JSON file is not a valid ResumeKit backup.','danger')}};reader.readAsText(file)}
$$('[data-field]').forEach(el=>el.addEventListener('input',()=>{data[el.dataset.field]=el.value;buildPreview()}));
document.addEventListener('input',e=>{if(e.target.matches('[data-repeat]')){collectRepeat(e.target);buildPreview()}});
document.addEventListener('click',e=>{const add=e.target.closest('[data-add]');if(add)addItem(add.dataset.add);const remove=e.target.closest('[data-remove]');if(remove){data[remove.dataset.remove].splice(Number(remove.dataset.index),1);renderRepeat(remove.dataset.remove);buildPreview()}});
$('#saveBtn').addEventListener('click',save);
$('#backupBtn').addEventListener('click',downloadJson);
$('#downloadBtn').addEventListener('click',()=>{readFields();buildPreview();window.print()});
$('#newBtn').addEventListener('click',()=>{if(!confirm('Start a new resume? Export or save your current work first.'))return;data=emptyData();writeFields();['experience','education','projects'].forEach(renderRepeat);$('#jobDescription').value='';$('#matchResults').innerHTML='';buildPreview()});
$('#clearBtn').addEventListener('click',()=>{if(!confirm('Clear all resume information from this editor and its saved browser draft?'))return;data=emptyData();localStorage.removeItem(STORAGE_KEY);writeFields();['experience','education','projects'].forEach(renderRepeat);buildPreview();notify('Resume data cleared.','success')});
$('#templateSelect').addEventListener('change',buildPreview);
$('#matchBtn').addEventListener('click',()=>{readFields();checkMatch()});
$('#importInput').addEventListener('change',e=>{if(e.target.files[0])importJson(e.target.files[0]);e.target.value=''});
window.addEventListener('beforeunload',()=>{try{readFields();localStorage.setItem(STORAGE_KEY,JSON.stringify({version:1,data,template:$('#templateSelect').value}))}catch(e){}});
load();
})();