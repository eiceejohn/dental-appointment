(() => {
  'use strict';

  const isoDate = value => {
    const date = new Date(value);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };
  const todayISO = () => isoDate(new Date());
  const addDays = (base, days) => {
    const date = new Date(base);
    date.setDate(date.getDate() + days);
    return isoDate(date);
  };

class ClinicDB {
    constructor(){ this.db=null; this.fallback=false; this.name='EverSmileDentalDB'; this.stores=['patients','appointments','dentists','services','settings','activity']; }
    async init(){
      if(!('indexedDB' in window)){ this.fallback=true; return this.seed(); }
      try {
        this.db = await new Promise((resolve,reject)=>{
          const req=indexedDB.open(this.name,1);
          req.onupgradeneeded=e=>{ const db=e.target.result; this.stores.forEach(s=>{ if(!db.objectStoreNames.contains(s)) db.createObjectStore(s,{keyPath:'id'}); }); };
          req.onsuccess=()=>resolve(req.result); req.onerror=()=>reject(req.error);
        });
      } catch(e){ console.warn('IndexedDB unavailable, using local storage.',e); this.fallback=true; }
      await this.seed();
    }
    key(s){ return `esd_${s}`; }
    async all(store){
      if(this.fallback) return JSON.parse(localStorage.getItem(this.key(store))||'[]');
      return new Promise((resolve,reject)=>{ const r=this.db.transaction(store,'readonly').objectStore(store).getAll(); r.onsuccess=()=>resolve(r.result); r.onerror=()=>reject(r.error); });
    }
    async get(store,id){ return (await this.all(store)).find(x=>x.id===id); }
    async put(store,item){
      if(this.fallback){ const all=await this.all(store); const i=all.findIndex(x=>x.id===item.id); i>=0?all.splice(i,1,item):all.push(item); localStorage.setItem(this.key(store),JSON.stringify(all)); return item; }
      return new Promise((resolve,reject)=>{ const r=this.db.transaction(store,'readwrite').objectStore(store).put(item); r.onsuccess=()=>resolve(item); r.onerror=()=>reject(r.error); });
    }
    async remove(store,id){
      if(this.fallback){ localStorage.setItem(this.key(store),JSON.stringify((await this.all(store)).filter(x=>x.id!==id))); return; }
      return new Promise((resolve,reject)=>{ const r=this.db.transaction(store,'readwrite').objectStore(store).delete(id); r.onsuccess=()=>resolve(); r.onerror=()=>reject(r.error); });
    }
    async clear(store){
      if(this.fallback){ localStorage.removeItem(this.key(store)); return; }
      return new Promise((resolve,reject)=>{ const r=this.db.transaction(store,'readwrite').objectStore(store).clear(); r.onsuccess=()=>resolve(); r.onerror=()=>reject(r.error); });
    }
    async replace(store,items){ await this.clear(store); for(const item of items) await this.put(store,item); }
    async seed(force=false){
      if(force) for(const s of this.stores) await this.clear(s);
      if((await this.all('settings')).length) return;
      const now = new Date();
      const patients=[
        {id:'pat_ana',firstName:'Ana',lastName:'Reyes',birthDate:'1992-04-18',sex:'Female',phone:'0917 325 4470',email:'ana.reyes@example.com',address:'Quezon City, Metro Manila',notes:'Allergic to penicillin.',createdAt:addDays(now,-120)},
        {id:'pat_miguel',firstName:'Miguel',lastName:'Santos',birthDate:'1987-09-02',sex:'Male',phone:'0918 764 2201',email:'miguel.santos@example.com',address:'Makati City, Metro Manila',notes:'No known allergies.',createdAt:addDays(now,-85)},
        {id:'pat_lea',firstName:'Lea',lastName:'Cruz',birthDate:'2000-01-26',sex:'Female',phone:'0920 556 1834',email:'lea.cruz@example.com',address:'Pasig City, Metro Manila',notes:'Sensitive teeth.',createdAt:addDays(now,-62)},
        {id:'pat_carlo',firstName:'Carlo',lastName:'Mendoza',birthDate:'1979-11-11',sex:'Male',phone:'0916 883 7190',email:'carlo.m@example.com',address:'Mandaluyong City',notes:'Hypertension; confirm current medication.',createdAt:addDays(now,-31)},
        {id:'pat_sofia',firstName:'Sofia',lastName:'Garcia',birthDate:'1996-06-15',sex:'Female',phone:'0995 406 1127',email:'sofia.garcia@example.com',address:'Taguig City, Metro Manila',notes:'',createdAt:addDays(now,-12)}
      ];
      const dentists=[
        {id:'den_1',name:'Dr. Patricia Lim',specialty:'General Dentistry',phone:'0917 800 1101',color:'#0c7776'},
        {id:'den_2',name:'Dr. Rafael Torres',specialty:'Orthodontics',phone:'0917 800 1102',color:'#3e74a8'},
        {id:'den_3',name:'Dr. Camille Ong',specialty:'Oral Surgery',phone:'0917 800 1103',color:'#9a6cab'}
      ];
      const services=[
        {id:'srv_1',name:'Dental Consultation',duration:30,price:700},
        {id:'srv_2',name:'Oral Prophylaxis',duration:45,price:1200},
        {id:'srv_3',name:'Tooth Extraction',duration:60,price:2500},
        {id:'srv_4',name:'Dental Filling',duration:45,price:1800},
        {id:'srv_5',name:'Orthodontic Adjustment',duration:30,price:1500},
        {id:'srv_6',name:'Teeth Whitening',duration:90,price:6500}
      ];
      const appts=[
        {id:'apt_1',patientId:'pat_ana',dentistId:'den_1',serviceId:'srv_2',date:todayISO(),time:'09:00',status:'Confirmed',notes:'Routine cleaning.',amount:1200,createdAt:addDays(now,-5)},
        {id:'apt_2',patientId:'pat_miguel',dentistId:'den_2',serviceId:'srv_5',date:todayISO(),time:'10:30',status:'Confirmed',notes:'Monthly adjustment.',amount:1500,createdAt:addDays(now,-4)},
        {id:'apt_3',patientId:'pat_lea',dentistId:'den_1',serviceId:'srv_1',date:todayISO(),time:'13:00',status:'Pending',notes:'Tooth sensitivity.',amount:700,createdAt:addDays(now,-2)},
        {id:'apt_4',patientId:'pat_carlo',dentistId:'den_3',serviceId:'srv_3',date:todayISO(),time:'15:00',status:'Confirmed',notes:'Bring medical clearance.',amount:2500,createdAt:addDays(now,-1)},
        {id:'apt_5',patientId:'pat_sofia',dentistId:'den_1',serviceId:'srv_4',date:addDays(now,1),time:'09:30',status:'Pending',notes:'',amount:1800,createdAt:todayISO()},
        {id:'apt_6',patientId:'pat_ana',dentistId:'den_2',serviceId:'srv_1',date:addDays(now,3),time:'11:00',status:'Confirmed',notes:'Orthodontic assessment.',amount:700,createdAt:addDays(now,-2)},
        {id:'apt_7',patientId:'pat_miguel',dentistId:'den_1',serviceId:'srv_2',date:addDays(now,-8),time:'10:00',status:'Completed',notes:'Completed.',amount:1200,createdAt:addDays(now,-13)},
        {id:'apt_8',patientId:'pat_lea',dentistId:'den_1',serviceId:'srv_4',date:addDays(now,-18),time:'14:30',status:'Completed',notes:'Composite filling.',amount:1800,createdAt:addDays(now,-22)},
        {id:'apt_9',patientId:'pat_carlo',dentistId:'den_3',serviceId:'srv_1',date:addDays(now,-30),time:'15:00',status:'Cancelled',notes:'Rescheduled.',amount:700,createdAt:addDays(now,-33)},
        {id:'apt_10',patientId:'pat_sofia',dentistId:'den_1',serviceId:'srv_6',date:addDays(now,-45),time:'09:00',status:'Completed',notes:'',amount:6500,createdAt:addDays(now,-50)}
      ];
      for(const x of patients) await this.put('patients',x);
      for(const x of dentists) await this.put('dentists',x);
      for(const x of services) await this.put('services',x);
      for(const x of appts) await this.put('appointments',x);
      await this.put('settings',{id:'clinic',clinicName:'EverSmile Dental Clinic',phone:'(02) 8123 4567',email:'hello@eversmile.ph',address:'2F Healthway Building, Quezon City, Metro Manila',openTime:'08:00',closeTime:'18:00'});
    }
  }

  window.ClinicDB = ClinicDB;
})();
