(() => {
  'use strict';
  const $ = (q, root = document) => root.querySelector(q);
  const $$ = (q, root = document) => [...root.querySelectorAll(q)];
  const uid = (prefix = 'id') => `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`;
  const esc = value => String(value ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const iso = d => { const x = new Date(d); return `${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,'0')}-${String(x.getDate()).padStart(2,'0')}`; };
  const todayISO = () => iso(new Date());
  const addDays = (base, days) => { const d = new Date(base); d.setDate(d.getDate()+days); return iso(d); };
  const money = n => new Intl.NumberFormat('en-PH',{style:'currency',currency:'PHP',maximumFractionDigits:0}).format(Number(n)||0);
  const fmtDate = (s, opts={month:'short',day:'numeric',year:'numeric'}) => s ? new Intl.DateTimeFormat('en-PH',opts).format(new Date(`${s}T00:00:00`)) : '—';
  const fmtTime = t => { if(!t) return '—'; const [h,m]=t.split(':').map(Number); return new Intl.DateTimeFormat('en-PH',{hour:'numeric',minute:'2-digit'}).format(new Date(2000,0,1,h,m)); };
  const initials = n => String(n||'?').split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join('').toUpperCase();
  const phoneDigits = s => String(s||'').replace(/\D/g,'');
  const statusClass = s => `status-${String(s||'pending').toLowerCase().replace(/\s+/g,'-')}`;
  const statusColor = {Confirmed:'#3e74a8',Pending:'#b97720',Completed:'#287a5d',Cancelled:'#d05b5b','No-show':'#705b92'};
  const softColor = {Confirmed:'#eaf3fb',Pending:'#fff3da',Completed:'#e7f6ee',Cancelled:'#fdecec','No-show':'#f0eafa'};

  const ICONS = {
    tooth:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8.4 3.1c1.4 0 2.2.9 3.6.9s2.2-.9 3.6-.9c3.2 0 5.3 2.6 4.5 6.1-.5 2.1-1.6 3.8-2.2 6.9-.5 2.6-1.1 4.8-2.7 4.8-1.8 0-1.5-5.8-3.2-5.8s-1.4 5.8-3.2 5.8c-1.6 0-2.2-2.2-2.7-4.8-.6-3.1-1.7-4.8-2.2-6.9-.8-3.5 1.3-6.1 4.5-6.1Z"/><path d="M8 6c1.1.6 2.4.9 4 .9"/></svg>',
    grid:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></svg>',
    calendar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>',
    'calendar-check':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M16 3v4M8 3v4M3 10h18m5 5 2 2 4-4"/></svg>',
    'calendar-plus':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M16 3v4M8 3v4M3 10h18m-9 3v5m-2.5-2.5h5"/></svg>',
    users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    'user-plus':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8" cy="7" r="4"/><path d="M19 8v6m-3-3h6"/></svg>',
    chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 3v18h18"/><path d="m7 16 4-5 3 3 5-7"/></svg>',
    settings:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 8.5 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 8.5a1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3a2 2 0 1 1 4 0v.09A1.7 1.7 0 0 0 15.5 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.14.36.35.7.6 1 .28.25.64.39 1.01.4H21a2 2 0 1 1 0 4h-.09A1.7 1.7 0 0 0 19.4 15Z"/></svg>',
    search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
    plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
    download:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v12m-5-5 5 5 5-5M5 21h14"/></svg>',
    upload:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 16V4m-5 5 5-5 5 5M5 21h14"/></svg>',
    print:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v7H6z"/></svg>',
    edit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z"/></svg>',
    trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h18M8 6V4h8v2m3 0-1 15H6L5 6m5 4v7m4-7v7"/></svg>',
    close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 6 12 12M18 6 6 18"/></svg>',
    menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    'chevron-left':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>',
    'chevron-right':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>',
    clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    peso:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 4h7a5 5 0 0 1 0 10H8m-3-6h11M5 11h9M8 4v16"/></svg>',
    check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 4 4L19 6"/></svg>',
    alert:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10.3 3.5 2.2 18a2 2 0 0 0 1.8 3h16a2 2 0 0 0 1.8-3L13.7 3.5a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4m0 4h.01"/></svg>'
  };
  function hydrateIcons(root=document){ $$('[data-icon]',root).forEach(el=>{ const name=el.dataset.icon; if(ICONS[name]) el.innerHTML=ICONS[name]; }); }

  const db=new ClinicDB();
  const state={patients:[],appointments:[],dentists:[],services:[],settings:{},view:'dashboard',calendarDate:new Date(),agendaDate:todayISO()};

  async function loadData(){
    [state.patients,state.appointments,state.dentists,state.services]=await Promise.all(['patients','appointments','dentists','services'].map(s=>db.all(s)));
    state.settings=(await db.get('settings','clinic'))||{};
  }
  const patientName=id=>{ const p=state.patients.find(x=>x.id===id); return p?`${p.firstName} ${p.lastName}`:'Unknown patient'; };
  const dentistName=id=>state.dentists.find(x=>x.id===id)?.name||'Unassigned';
  const serviceName=id=>state.services.find(x=>x.id===id)?.name||'General visit';
  const serviceById=id=>state.services.find(x=>x.id===id);

  function toast(title,message='',type='success'){
    const el=document.createElement('div'); el.className=`toast ${type}`;
    el.innerHTML=`<div class="toast-icon">${ICONS[type==='error'?'alert':'check']}</div><div><strong>${esc(title)}</strong><span>${esc(message)}</span></div><button aria-label="Close">×</button>`;
    $('#toastStack').append(el); $('button',el).onclick=()=>el.remove(); setTimeout(()=>el.remove(),4200);
  }
  function emptyState(title,text){ return `<div class="empty"><div class="empty-icon">${ICONS.calendar}</div><strong>${esc(title)}</strong><span>${esc(text)}</span></div>`; }

  function showView(view){
    state.view=view;
    $$('.view').forEach(x=>x.classList.remove('active')); $(`#${view}View`).classList.add('active');
    $$('.nav-btn').forEach(x=>x.classList.toggle('active',x.dataset.view===view));
    const title={dashboard:'Dashboard',appointments:'Appointments',patients:'Patients',calendar:'Calendar',reports:'Reports',settings:'Settings'}[view];
    $('#pageTitle').textContent=title; $('#sidebar').classList.remove('open');
    if(view==='calendar') renderCalendar(); if(view==='reports') renderReports();
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function renderHeader(){
    $('#todayLabel').textContent=new Intl.DateTimeFormat('en-PH',{weekday:'long',month:'long',day:'numeric',year:'numeric'}).format(new Date());
    const full=state.settings.clinicName||'EverSmile Dental Clinic'; $('#brandName').textContent=full.replace(/ Dental Clinic$/i,''); $('#sideClinicName').textContent=full;
    $('#sideClinicInfo').innerHTML=`${esc(fmtTime(state.settings.openTime))}–${esc(fmtTime(state.settings.closeTime))}<br>${db.fallback?'Fallback local storage':'IndexedDB local database'}`;
    $('#storageLabel').textContent=db.fallback?'Local storage':'Database online';
  }

  function renderDashboard(){
    const today=todayISO(), todays=state.appointments.filter(a=>a.date===today && a.status!=='Cancelled');
    const confirmed=todays.filter(a=>a.status==='Confirmed').length;
    const pending=todays.filter(a=>a.status==='Pending').length;
    const month=new Date().getMonth(), year=new Date().getFullYear();
    const monthly=state.appointments.filter(a=>{const d=new Date(`${a.date}T00:00:00`);return d.getMonth()===month&&d.getFullYear()===year;});
    const revenue=monthly.filter(a=>a.status==='Completed').reduce((s,a)=>s+Number(a.amount||0),0);
    const stats=[
      {label:"Today's appointments",value:todays.length,icon:'calendar-check',color:'#0c7776',soft:'#e0f3f0',trend:`${confirmed} confirmed`},
      {label:'Registered patients',value:state.patients.length,icon:'users',color:'#3e74a8',soft:'#eaf3fb',trend:'Active records'},
      {label:'Pending confirmation',value:pending,icon:'clock',color:'#b97720',soft:'#fff3da',trend:'Needs action'},
      {label:'Monthly revenue',value:money(revenue),icon:'peso',color:'#287a5d',soft:'#e7f6ee',trend:'Completed visits'}
    ];
    $('#statsGrid').innerHTML=stats.map(s=>`<div class="stat-card" style="--accent:${s.color};--accent-soft:${s.soft}"><div class="stat-top"><div class="stat-icon">${ICONS[s.icon]}</div><span class="stat-trend">${esc(s.trend)}</span></div><div class="stat-value">${esc(s.value)}</div><div class="stat-label">${esc(s.label)}</div></div>`).join('');
    const sorted=todays.sort((a,b)=>a.time.localeCompare(b.time)); $('#todayCountLabel').textContent=`${sorted.length} scheduled patient${sorted.length===1?'':'s'}`;
    $('#todaySchedule').innerHTML=sorted.length?sorted.map(a=>`<div class="schedule-row"><div class="schedule-time"><strong>${fmtTime(a.time)}</strong><span>${serviceById(a.serviceId)?.duration||30} min</span></div><div class="schedule-bar" style="--row-color:${statusColor[a.status]||'#0c7776'}"></div><div class="schedule-main"><strong>${esc(patientName(a.patientId))}</strong><span>${esc(serviceName(a.serviceId))} · ${esc(dentistName(a.dentistId))}</span></div><span class="badge ${statusClass(a.status)}">${esc(a.status)}</span></div>`).join(''):emptyState('No appointments today','Add a visit to start today’s schedule.');
    const future=state.appointments.filter(a=>a.date>today&&a.date<=addDays(new Date(),7)&&!['Cancelled','Completed'].includes(a.status)).sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time)).slice(0,4);
    $('#upcomingList').innerHTML=future.length?future.map(a=>{const d=new Date(`${a.date}T00:00:00`);return `<div class="mini-item"><div class="mini-date"><strong>${d.getDate()}</strong><span>${d.toLocaleString('en',{month:'short'})}</span></div><div><strong>${esc(patientName(a.patientId))}</strong><span>${fmtTime(a.time)} · ${esc(serviceName(a.serviceId))}</span></div></div>`}).join(''):emptyState('Clear week','No upcoming visits in the next seven days.');
  }

  function filteredAppointments(){
    const q=$('#apptSearch').value.trim().toLowerCase(), status=$('#apptStatusFilter').value, date=$('#apptDateFilter').value;
    return state.appointments.filter(a=>{
      const hay=`${patientName(a.patientId)} ${dentistName(a.dentistId)} ${serviceName(a.serviceId)} ${a.notes||''}`.toLowerCase();
      return (!q||hay.includes(q))&&(!status||a.status===status)&&(!date||a.date===date);
    }).sort((a,b)=>(b.date+b.time).localeCompare(a.date+a.time));
  }
  function renderAppointments(){
    const rows=filteredAppointments();
    $('#appointmentsTable').innerHTML=rows.length?`<table><thead><tr><th>Patient</th><th>Schedule</th><th>Service</th><th>Dentist</th><th>Status</th><th>Amount</th><th>Actions</th></tr></thead><tbody>${rows.map(a=>`<tr><td><div class="person"><div class="person-avatar">${esc(initials(patientName(a.patientId)))}</div><div><strong>${esc(patientName(a.patientId))}</strong><span>${esc(state.patients.find(p=>p.id===a.patientId)?.phone||'No phone')}</span></div></div></td><td><strong>${fmtDate(a.date,{month:'short',day:'numeric',year:'numeric'})}</strong><br><span style="color:var(--muted);font-size:9px">${fmtTime(a.time)}</span></td><td>${esc(serviceName(a.serviceId))}</td><td>${esc(dentistName(a.dentistId))}</td><td><span class="badge ${statusClass(a.status)}">${esc(a.status)}</span></td><td>${money(a.amount)}</td><td><div class="action-group"><button class="action-btn edit-appt" data-id="${a.id}" title="Edit">${ICONS.edit}</button><button class="action-btn delete delete-appt" data-id="${a.id}" title="Delete">${ICONS.trash}</button></div></td></tr>`).join('')}</tbody></table>`:emptyState('No appointments found','Try clearing the filters or add a new appointment.');
  }

  function filteredPatients(){
    const q=$('#patientSearch').value.trim().toLowerCase(), sort=$('#patientSort').value;
    let rows=state.patients.filter(p=>`${p.firstName} ${p.lastName} ${p.phone} ${p.email} ${p.address}`.toLowerCase().includes(q));
    if(sort==='recent') rows.sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt)));
    else if(sort==='visits') rows.sort((a,b)=>state.appointments.filter(x=>x.patientId===b.id).length-state.appointments.filter(x=>x.patientId===a.id).length);
    else rows.sort((a,b)=>`${a.lastName}${a.firstName}`.localeCompare(`${b.lastName}${b.firstName}`));
    return rows;
  }
  function renderPatients(){
    const rows=filteredPatients();
    $('#patientsGrid').innerHTML=rows.length?rows.map(p=>{
      const appts=state.appointments.filter(a=>a.patientId===p.id); const last=appts.filter(a=>a.date<=todayISO()).sort((a,b)=>b.date.localeCompare(a.date))[0];
      return `<div class="patient-card"><div class="patient-top"><div class="patient-ident"><div class="person-avatar">${esc(initials(`${p.firstName} ${p.lastName}`))}</div><div style="min-width:0"><strong>${esc(p.firstName)} ${esc(p.lastName)}</strong><span>${esc(p.sex||'Not specified')} · ${p.birthDate?`${Math.max(0,new Date().getFullYear()-new Date(p.birthDate).getFullYear())} yrs`:'Age not set'}</span></div></div><div class="action-group"><button class="action-btn edit-patient" data-id="${p.id}">${ICONS.edit}</button><button class="action-btn delete delete-patient" data-id="${p.id}">${ICONS.trash}</button></div></div><div class="patient-meta"><div><span>Phone</span><span>${esc(p.phone||'—')}</span></div><div><span>Email</span><span>${esc(p.email||'—')}</span></div><div><span>Total visits</span><span>${appts.length}</span></div><div><span>Last appointment</span><span>${last?fmtDate(last.date,{month:'short',day:'numeric',year:'numeric'}):'No visits yet'}</span></div></div><button class="btn btn-secondary btn-small book-patient" data-id="${p.id}" style="width:100%;margin-top:13px">Book appointment</button></div>`;
    }).join(''):emptyState('No patients found','Try a different search or create a new patient record.');
  }

  function renderCalendar(){
    const y=state.calendarDate.getFullYear(),m=state.calendarDate.getMonth();
    $('#calendarMonth').textContent=new Intl.DateTimeFormat('en-PH',{month:'long',year:'numeric'}).format(state.calendarDate);
    const start=new Date(y,m,1), first=new Date(y,m,1-start.getDay()); let html='';
    for(let i=0;i<42;i++){
      const d=new Date(first);d.setDate(first.getDate()+i);const key=iso(d), events=state.appointments.filter(a=>a.date===key).sort((a,b)=>a.time.localeCompare(b.time));
      html+=`<div class="day ${d.getMonth()!==m?'other':''} ${key===todayISO()?'today':''}" data-date="${key}"><div class="day-number">${d.getDate()}</div><div class="day-events">${events.slice(0,3).map(a=>`<div class="day-event" style="--event-color:${statusColor[a.status]||'#0c7776'};--event-soft:${softColor[a.status]||'#e0f3f0'}">${fmtTime(a.time)} ${esc(patientName(a.patientId))}</div>`).join('')}${events.length>3?`<div style="font-size:8px;color:var(--muted)">+${events.length-3} more</div>`:''}</div></div>`;
    }
    $('#calendarGrid').innerHTML=html; renderAgenda(state.agendaDate);
  }
  function renderAgenda(date){
    state.agendaDate=date; $('#agendaTitle').textContent=fmtDate(date,{weekday:'long',month:'short',day:'numeric'});
    const rows=state.appointments.filter(a=>a.date===date).sort((a,b)=>a.time.localeCompare(b.time));
    $('#dayAgenda').innerHTML=rows.length?rows.map(a=>`<div class="schedule-row" style="grid-template-columns:60px 4px 1fr"><div class="schedule-time"><strong>${fmtTime(a.time)}</strong><span>${a.status}</span></div><div class="schedule-bar" style="--row-color:${statusColor[a.status]}"></div><div class="schedule-main"><strong>${esc(patientName(a.patientId))}</strong><span>${esc(serviceName(a.serviceId))}<br>${esc(dentistName(a.dentistId))}</span></div></div>`).join(''):emptyState('No visits','Click this day to add a booking.');
  }

  function reportAppointments(){
    const range=$('#reportRange').value;if(range==='all') return state.appointments;
    const cutoff=new Date(); cutoff.setDate(cutoff.getDate()-Number(range)); const key=iso(cutoff); return state.appointments.filter(a=>a.date>=key&&a.date<=todayISO());
  }
  function renderReports(){
    const rows=reportAppointments(), completed=rows.filter(a=>a.status==='Completed'), revenue=completed.reduce((s,a)=>s+Number(a.amount||0),0), rate=rows.length?Math.round(completed.length/rows.length*100):0;
    const unique=new Set(rows.map(a=>a.patientId)).size;
    $('#reportCards').innerHTML=[['Total appointments',rows.length,`${completed.length} completed`],['Collected revenue',money(revenue),'Completed treatments only'],['Completion rate',`${rate}%`,`${unique} unique patients`]].map((x,i)=>`<div class="card report-card"><h3>${x[0]}</h3><span>${x[2]}</span><div class="big-number">${x[1]}</div><div class="progress"><div style="width:${i===2?rate:Math.min(100,rows.length*7+10)}%"></div></div></div>`).join('');
    const months=[];for(let i=5;i>=0;i--){const d=new Date();d.setMonth(d.getMonth()-i);months.push({y:d.getFullYear(),m:d.getMonth(),label:d.toLocaleString('en',{month:'short'})});}
    const vals=months.map(x=>rows.filter(a=>{const d=new Date(`${a.date}T00:00:00`);return d.getFullYear()===x.y&&d.getMonth()===x.m;}).length),max=Math.max(1,...vals);
    $('#volumeChart').innerHTML=months.map((x,i)=>`<div class="bar-col"><span class="bar-value">${vals[i]}</span><div class="bar" style="height:${Math.max(3,vals[i]/max*170)}px"></div><span class="bar-label">${x.label}</span></div>`).join('');
    const counts=['Completed','Confirmed','Pending','Cancelled','No-show'].map(s=>[s,rows.filter(a=>a.status===s).length]); const total=Math.max(1,rows.length); let acc=0, parts=[];
    counts.forEach(([s,n])=>{const start=acc/total*360;acc+=n;const end=acc/total*360;if(n)parts.push(`${statusColor[s]} ${start}deg ${end}deg`);});
    $('#statusDonut').innerHTML=`<div class="donut" style="background:conic-gradient(${parts.length?parts.join(','):'#edf2f1 0deg 360deg'})"><div class="donut-center"><strong>${rows.length}</strong><span>Total visits</span></div></div>`;
    $('#statusLegend').innerHTML=counts.map(([s,n])=>`<span><i style="background:${statusColor[s]}"></i>${s} (${n})</span>`).join('');
  }

  function renderSettings(){
    const f=$('#clinicForm'); Object.keys(state.settings).forEach(k=>{if(f.elements[k])f.elements[k].value=state.settings[k]||'';});
    $('#dentistList').innerHTML=state.dentists.map(d=>`<div class="manage-item"><div><strong>${esc(d.name)}</strong><span>${esc(d.specialty)} · ${esc(d.phone||'No phone')}</span></div><div class="action-group"><button class="action-btn edit-dentist" data-id="${d.id}">${ICONS.edit}</button><button class="action-btn delete delete-dentist" data-id="${d.id}">${ICONS.trash}</button></div></div>`).join('')||emptyState('No dentists','Add a dentist to accept bookings.');
    $('#serviceList').innerHTML=state.services.map(s=>`<div class="manage-item"><div><strong>${esc(s.name)}</strong><span>${s.duration} minutes · ${money(s.price)}</span></div><div class="action-group"><button class="action-btn edit-service" data-id="${s.id}">${ICONS.edit}</button><button class="action-btn delete delete-service" data-id="${s.id}">${ICONS.trash}</button></div></div>`).join('')||emptyState('No services','Add a treatment to start booking.');
  }
  function renderAll(){ renderHeader();renderDashboard();renderAppointments();renderPatients();renderCalendar();renderReports();renderSettings(); }

  function openModal(content,small=false){ $('#modalRoot').innerHTML=`<div class="modal-backdrop"><div class="modal ${small?'modal-sm':''}">${content}</div></div>`; hydrateIcons($('#modalRoot')); $('.modal-backdrop').addEventListener('click',e=>{if(e.target.classList.contains('modal-backdrop'))closeModal();}); $$('.modal-close').forEach(b=>b.onclick=closeModal); }
  function closeModal(){ $('#modalRoot').innerHTML=''; }
  function options(items,value,label,selected=''){return items.map(x=>`<option value="${esc(x[value])}" ${x[value]===selected?'selected':''}>${esc(typeof label==='function'?label(x):x[label])}</option>`).join('');}

  function openAppointmentModal(id=null,presetPatient=null,presetDate=null){
    if(!state.patients.length){toast('Add a patient first','A patient record is required before booking.','error');openPatientModal();return;}
    if(!state.dentists.length||!state.services.length){toast('Setup required','Add at least one dentist and service in Settings.','error');return;}
    const a=state.appointments.find(x=>x.id===id)||{patientId:presetPatient||'',dentistId:state.dentists[0].id,serviceId:state.services[0].id,date:presetDate||todayISO(),time:'09:00',status:'Pending',notes:'',amount:state.services[0].price};
    openModal(`<div class="modal-head"><div><h3>${id?'Edit appointment':'New appointment'}</h3><p>Schedule treatment and assign a dentist.</p></div><button class="icon-btn modal-close" data-icon="close"></button></div><form id="appointmentForm"><div class="modal-body"><div class="form-grid"><div class="form-group full"><label>Patient *</label><select class="select" name="patientId" required><option value="">Select patient</option>${options([...state.patients].sort((x,y)=>x.lastName.localeCompare(y.lastName)),'id',x=>`${x.firstName} ${x.lastName}`,a.patientId)}</select></div><div class="form-group"><label>Date *</label><input class="input" type="date" name="date" required value="${a.date}"></div><div class="form-group"><label>Time *</label><input class="input" type="time" name="time" required value="${a.time}"></div><div class="form-group"><label>Dentist *</label><select class="select" name="dentistId" required>${options(state.dentists,'id','name',a.dentistId)}</select></div><div class="form-group"><label>Service *</label><select class="select" name="serviceId" required>${options(state.services,'id',x=>`${x.name} — ${money(x.price)}`,a.serviceId)}</select></div><div class="form-group"><label>Status</label><select class="select" name="status">${['Pending','Confirmed','Completed','Cancelled','No-show'].map(s=>`<option ${s===a.status?'selected':''}>${s}</option>`).join('')}</select></div><div class="form-group"><label>Amount (PHP)</label><input class="input" type="number" name="amount" min="0" step="1" value="${Number(a.amount||0)}"></div><div class="form-group full"><label>Notes</label><textarea class="textarea" name="notes" placeholder="Treatment notes, reminders, or patient concerns">${esc(a.notes||'')}</textarea></div></div></div><div class="modal-foot"><button type="button" class="btn btn-secondary modal-close">Cancel</button><button type="submit" class="btn btn-primary">${id?'Save changes':'Create appointment'}</button></div></form>`);
    const form=$('#appointmentForm'); form.elements.serviceId.onchange=()=>{const s=serviceById(form.elements.serviceId.value);if(s)form.elements.amount.value=s.price;};
    form.onsubmit=async e=>{e.preventDefault();const data=Object.fromEntries(new FormData(form));const clash=state.appointments.find(x=>x.id!==id&&x.dentistId===data.dentistId&&x.date===data.date&&x.time===data.time&&!['Cancelled','No-show'].includes(x.status));if(clash){toast('Schedule conflict',`${dentistName(data.dentistId)} already has an appointment at ${fmtTime(data.time)}.`,'error');return;}await db.put('appointments',{...a,...data,id:id||uid('apt'),amount:Number(data.amount)||0,createdAt:a.createdAt||new Date().toISOString()});await refresh();closeModal();toast(id?'Appointment updated':'Appointment created',`${patientName(data.patientId)} · ${fmtDate(data.date)} at ${fmtTime(data.time)}`);};
  }

  function openPatientModal(id=null){
    const p=state.patients.find(x=>x.id===id)||{firstName:'',lastName:'',birthDate:'',sex:'',phone:'',email:'',address:'',notes:''};
    openModal(`<div class="modal-head"><div><h3>${id?'Edit patient':'New patient'}</h3><p>Maintain an accurate clinic patient record.</p></div><button class="icon-btn modal-close" data-icon="close"></button></div><form id="patientForm"><div class="modal-body"><div class="form-grid"><div class="form-group"><label>First name *</label><input class="input" name="firstName" required value="${esc(p.firstName)}"></div><div class="form-group"><label>Last name *</label><input class="input" name="lastName" required value="${esc(p.lastName)}"></div><div class="form-group"><label>Date of birth</label><input class="input" type="date" name="birthDate" value="${esc(p.birthDate)}"></div><div class="form-group"><label>Sex</label><select class="select" name="sex"><option value="">Select</option>${['Female','Male','Prefer not to say'].map(s=>`<option ${s===p.sex?'selected':''}>${s}</option>`).join('')}</select></div><div class="form-group"><label>Phone *</label><input class="input" name="phone" required value="${esc(p.phone)}" placeholder="09XX XXX XXXX"></div><div class="form-group"><label>Email</label><input class="input" type="email" name="email" value="${esc(p.email)}"></div><div class="form-group full"><label>Address</label><input class="input" name="address" value="${esc(p.address)}"></div><div class="form-group full"><label>Medical notes</label><textarea class="textarea" name="notes" placeholder="Allergies, conditions, or important reminders">${esc(p.notes)}</textarea></div></div></div><div class="modal-foot"><button type="button" class="btn btn-secondary modal-close">Cancel</button><button class="btn btn-primary" type="submit">${id?'Save changes':'Create patient'}</button></div></form>`);
    $('#patientForm').onsubmit=async e=>{e.preventDefault();const data=Object.fromEntries(new FormData(e.target));if(phoneDigits(data.phone).length<7){toast('Check phone number','Please enter a valid contact number.','error');return;}await db.put('patients',{...p,...data,id:id||uid('pat'),createdAt:p.createdAt||new Date().toISOString()});await refresh();closeModal();toast(id?'Patient updated':'Patient created',`${data.firstName} ${data.lastName} is saved in the database.`);};
  }

  function openDentistModal(id=null){const d=state.dentists.find(x=>x.id===id)||{name:'',specialty:'General Dentistry',phone:'',color:'#0c7776'};openModal(`<div class="modal-head"><div><h3>${id?'Edit dentist':'Add dentist'}</h3><p>Professional available for appointment assignment.</p></div><button class="icon-btn modal-close" data-icon="close"></button></div><form id="dentistForm"><div class="modal-body"><div class="form-grid"><div class="form-group full"><label>Name *</label><input class="input" name="name" required value="${esc(d.name)}" placeholder="Dr. Full Name"></div><div class="form-group"><label>Specialty *</label><input class="input" name="specialty" required value="${esc(d.specialty)}"></div><div class="form-group"><label>Phone</label><input class="input" name="phone" value="${esc(d.phone)}"></div></div></div><div class="modal-foot"><button type="button" class="btn btn-secondary modal-close">Cancel</button><button class="btn btn-primary">Save dentist</button></div></form>`,true);$('#dentistForm').onsubmit=async e=>{e.preventDefault();const data=Object.fromEntries(new FormData(e.target));await db.put('dentists',{...d,...data,id:id||uid('den')});await refresh();closeModal();toast('Dentist saved','The team list has been updated.');};}
  function openServiceModal(id=null){const s=state.services.find(x=>x.id===id)||{name:'',duration:30,price:0};openModal(`<div class="modal-head"><div><h3>${id?'Edit service':'Add service'}</h3><p>Configure treatment duration and standard price.</p></div><button class="icon-btn modal-close" data-icon="close"></button></div><form id="serviceForm"><div class="modal-body"><div class="form-grid"><div class="form-group full"><label>Service name *</label><input class="input" name="name" required value="${esc(s.name)}"></div><div class="form-group"><label>Duration (minutes) *</label><input class="input" type="number" min="5" step="5" name="duration" required value="${s.duration}"></div><div class="form-group"><label>Price (PHP) *</label><input class="input" type="number" min="0" step="1" name="price" required value="${s.price}"></div></div></div><div class="modal-foot"><button type="button" class="btn btn-secondary modal-close">Cancel</button><button class="btn btn-primary">Save service</button></div></form>`,true);$('#serviceForm').onsubmit=async e=>{e.preventDefault();const data=Object.fromEntries(new FormData(e.target));await db.put('services',{...s,...data,id:id||uid('srv'),duration:Number(data.duration),price:Number(data.price)});await refresh();closeModal();toast('Service saved','The treatment catalog has been updated.');};}

  function confirmDialog(title,text,onConfirm){openModal(`<div class="modal-head"><h3>Please confirm</h3><button class="icon-btn modal-close" data-icon="close"></button></div><div class="modal-body"><div class="confirm-body"><div class="confirm-icon">${ICONS.alert}</div><strong>${esc(title)}</strong><p>${esc(text)}</p></div></div><div class="modal-foot"><button class="btn btn-secondary modal-close">Cancel</button><button class="btn btn-danger" id="confirmAction">Confirm</button></div>`,true);$('#confirmAction').onclick=async()=>{await onConfirm();closeModal();};}

  async function refresh(){await loadData();renderAll();}
  function csvDownload(filename,headers,rows){const quote=v=>`"${String(v??'').replace(/"/g,'""')}"`;const csv='\ufeff'+[headers,...rows].map(r=>r.map(quote).join(',')).join('\r\n');downloadBlob(filename,csv,'text/csv;charset=utf-8');}
  function downloadBlob(filename,data,type){const blob=new Blob([data],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),500);}
  async function exportBackup(){const payload={app:'EverSmile Dental Clinic',version:1,exportedAt:new Date().toISOString(),data:{}};for(const s of db.stores)payload.data[s]=await db.all(s);downloadBlob(`dental-backup-${todayISO()}.json`,JSON.stringify(payload,null,2),'application/json');toast('Backup downloaded','Keep the JSON file in a safe location.');}

  function bindEvents(){
    $('#mainNav').addEventListener('click',e=>{const b=e.target.closest('.nav-btn');if(b)showView(b.dataset.view);});
    document.addEventListener('click',e=>{
      const go=e.target.closest('[data-go]');if(go)showView(go.dataset.go);
      if(e.target.closest('.add-appointment'))openAppointmentModal(); if(e.target.closest('.add-patient'))openPatientModal();
      const editA=e.target.closest('.edit-appt');if(editA)openAppointmentModal(editA.dataset.id);
      const editP=e.target.closest('.edit-patient');if(editP)openPatientModal(editP.dataset.id);
      const book=e.target.closest('.book-patient');if(book)openAppointmentModal(null,book.dataset.id);
      const delA=e.target.closest('.delete-appt');if(delA)confirmDialog('Delete this appointment?','This appointment record will be permanently removed from the local database.',async()=>{await db.remove('appointments',delA.dataset.id);await refresh();toast('Appointment deleted');});
      const delP=e.target.closest('.delete-patient');if(delP){const n=state.appointments.filter(a=>a.patientId===delP.dataset.id).length;confirmDialog('Delete this patient?',n?`This patient has ${n} appointment record(s). Delete the appointments first to preserve your records.`:'This patient record will be permanently removed.',async()=>{if(n){toast('Patient not deleted','Remove linked appointments first.','error');return;}await db.remove('patients',delP.dataset.id);await refresh();toast('Patient deleted');});}
      const day=e.target.closest('.day');if(day){renderAgenda(day.dataset.date);if(innerWidth<=1100)openAppointmentModal(null,null,day.dataset.date);}
      const ed=e.target.closest('.edit-dentist');if(ed)openDentistModal(ed.dataset.id);const es=e.target.closest('.edit-service');if(es)openServiceModal(es.dataset.id);
      const dd=e.target.closest('.delete-dentist');if(dd)confirmDialog('Delete this dentist?','Existing appointments will retain an unassigned dentist reference.',async()=>{await db.remove('dentists',dd.dataset.id);await refresh();toast('Dentist deleted');});
      const ds=e.target.closest('.delete-service');if(ds)confirmDialog('Delete this service?','Existing appointments will retain a general visit reference.',async()=>{await db.remove('services',ds.dataset.id);await refresh();toast('Service deleted');});
    });
    $('#menuBtn').onclick=()=>$('#sidebar').classList.toggle('open');
    $('#sidebarScrim').onclick=()=>$('#sidebar').classList.remove('open');
    $('#dashCalendarBtn').onclick=()=>showView('calendar');
    $('#backupQuick').onclick=exportBackup;$('#exportBackup').onclick=exportBackup;
    ['apptSearch','apptStatusFilter','apptDateFilter'].forEach(id=>$('#'+id).addEventListener('input',renderAppointments));
    $('#clearApptFilters').onclick=()=>{$('#apptSearch').value='';$('#apptStatusFilter').value='';$('#apptDateFilter').value='';renderAppointments();};
    ['patientSearch','patientSort'].forEach(id=>$('#'+id).addEventListener('input',renderPatients));
    $('#calendarPrev').onclick=()=>{state.calendarDate=new Date(state.calendarDate.getFullYear(),state.calendarDate.getMonth()-1,1);renderCalendar();};
    $('#calendarNext').onclick=()=>{state.calendarDate=new Date(state.calendarDate.getFullYear(),state.calendarDate.getMonth()+1,1);renderCalendar();};
    $('#calendarToday').onclick=()=>{state.calendarDate=new Date();state.agendaDate=todayISO();renderCalendar();};
    $('#reportRange').onchange=renderReports;
    $('#addDentist').onclick=()=>openDentistModal();$('#addService').onclick=()=>openServiceModal();
    $('#clinicForm').onsubmit=async e=>{e.preventDefault();const data=Object.fromEntries(new FormData(e.target));await db.put('settings',{id:'clinic',...data});await refresh();toast('Clinic profile saved','Branding and contact details are updated.');};
    $('#exportApptCsv').onclick=()=>csvDownload(`appointments-${todayISO()}.csv`,['Patient','Date','Time','Service','Dentist','Status','Amount','Notes'],filteredAppointments().map(a=>[patientName(a.patientId),a.date,a.time,serviceName(a.serviceId),dentistName(a.dentistId),a.status,a.amount,a.notes]));
    $('#exportPatientCsv').onclick=()=>csvDownload(`patients-${todayISO()}.csv`,['First Name','Last Name','Birth Date','Sex','Phone','Email','Address','Medical Notes'],filteredPatients().map(p=>[p.firstName,p.lastName,p.birthDate,p.sex,p.phone,p.email,p.address,p.notes]));
    $('#importBackupBtn').onclick=()=>$('#importBackup').click();
    $('#importBackup').onchange=async e=>{const file=e.target.files[0];if(!file)return;try{const payload=JSON.parse(await file.text());if(!payload.data||!payload.version)throw new Error('Invalid backup');for(const s of db.stores)if(Array.isArray(payload.data[s]))await db.replace(s,payload.data[s]);await refresh();toast('Backup restored','All available records were imported.');}catch(err){toast('Import failed','The selected file is not a valid dental system backup.','error');}e.target.value='';};
    $('#resetDatabase').onclick=()=>confirmDialog('Reset the entire database?','All current records will be replaced by the original sample clinic data. Download a backup first if needed.',async()=>{await db.seed(true);await refresh();toast('Database reset','Sample records have been restored.');});
    $('#globalSearch').addEventListener('keydown',e=>{if(e.key==='Enter'){const q=e.target.value;showView('appointments');$('#apptSearch').value=q;renderAppointments();}});
  }

  async function start(){hydrateIcons();try{await db.init();await loadData();renderAll();bindEvents();}catch(err){console.error(err);$('#storageLabel').textContent='Database error';toast('Database could not start','Try opening this file in the latest Chrome or Edge browser.','error');}}
  start();
})();
