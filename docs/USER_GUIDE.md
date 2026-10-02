# Dental Appointment Scheduling System

## Simpleng User Guide

Ang system na ito ay parang digital notebook ng isang dental clinic. Dito maaaring ilagay ang patient information, appointments, dentists, services, at clinic reports.

Hindi kailangan ng installation, internet, XAMPP, o MySQL. Ang kailangan lang ay modern browser tulad ng Google Chrome o Microsoft Edge.

---

## 1. Paano Buksan ang System

1. Buksan ang folder na `dental-appointment`.
2. Hanapin ang `index.html`.
3. I-double-click ang `index.html`.
4. Magbubukas ang system sa iyong default browser.

Important: Huwag ilipat nang paisa-isa ang mga files. Kung ililipat ang system sa ibang folder o computer, kopyahin ang buong `dental-appointment` folder.

---

## 2. Nilalaman ng Project Folder

```text
dental-appointment/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── db.js
│   └── app.js
└── docs/
    └── USER_GUIDE.md
```

Simpleng paliwanag:

- `index.html` — Ito ang pangunahing file na bubuksan para gamitin ang system.
- `css/styles.css` — Ito ang may hawak ng kulay, design, spacing, at itsura ng system.
- `js/app.js` — Ito ang utak ng system. Siya ang nagpapagana sa buttons, forms, search, calendar, at reports.
- `js/db.js` — Ito ang filing cabinet ng system. Siya ang nagse-save at kumukuha ng records.
- `docs/USER_GUIDE.md` — Ito ang documentation na iyong binabasa ngayon.

---

## 3. Saan Naka-save ang Data?

Gumagamit ang system ng browser database na tinatawag na **IndexedDB**.

Sa madaling salita, ang records ay naka-save sa browser at computer na ginagamit mo.

### Ano ang ibig sabihin nito?

- Hindi nawawala ang records kapag ni-refresh o isinara ang page.
- Hindi kailangan ng internet para mag-save ng data.
- Hindi kailangan ng hiwalay na database program.
- Ang records sa Chrome ay maaaring hindi makita kapag binuksan sa ibang browser.
- Ang records sa computer na ito ay hindi automatic na makikita sa ibang computer.

### Mahalagang paalala

Regular na mag-download ng backup. Kapag na-clear ang browser data o nasira ang computer, maaaring mawala ang local records kung walang backup.

---

## 4. Mga Bahagi ng System

Makikita sa kaliwang menu ang mga sumusunod:

1. Dashboard
2. Appointments
3. Patients
4. Calendar
5. Reports
6. Settings

---

## 5. Dashboard

Ang Dashboard ang unang page na makikita kapag binuksan ang system.

Makikita rito ang:

- Bilang ng appointments ngayong araw
- Bilang ng registered patients
- Mga appointment na naghihintay ng confirmation
- Kita mula sa completed appointments ngayong buwan
- Schedule ngayong araw
- Mga susunod na appointment
- Quick-action buttons

### Quick actions

- **Book Visit** — Gumawa ng bagong appointment.
- **Add Patient** — Mag-register ng bagong patient.
- **View Reports** — Tingnan ang clinic statistics.
- **Back Up Data** — Mag-download ng kopya ng lahat ng records.

---

## 6. Patients

Ang Patients page ang listahan ng lahat ng registered patients.

### Paano magdagdag ng patient

1. Pumunta sa **Patients**.
2. Pindutin ang **Add Patient**.
3. Ilagay ang pangalan at contact number.
4. Ilagay ang ibang impormasyon kung available.
5. Pindutin ang **Create Patient**.

### Patient information

Maaaring ilagay ang:

- First name
- Last name
- Date of birth
- Sex
- Phone number
- Email address
- Home address
- Medical notes

Gamitin ang Medical Notes para sa allergy, health condition, maintenance medicine, o ibang importanteng paalala.

### Paano mag-edit ng patient

1. Hanapin ang patient.
2. Pindutin ang pencil o edit button.
3. Baguhin ang impormasyon.
4. Pindutin ang **Save Changes**.

### Paano mag-delete ng patient

1. Hanapin ang patient.
2. Pindutin ang trash o delete button.
3. Basahin ang confirmation message.
4. Pindutin ang **Confirm**.

Hindi maaaring i-delete ang patient kung mayroon pa siyang appointment records. I-delete muna ang naka-link na appointments kung talagang kailangang alisin ang patient.

### Search at sorting

Maaaring mag-search gamit ang:

- Pangalan
- Phone number
- Email address
- Address

Maaari ring ayusin ang listahan ayon sa pangalan, pinakabagong patient, o pinakamaraming visits.

---

## 7. Appointments

Ang Appointments page ang main schedule list ng clinic.

### Paano gumawa ng appointment

1. Pumunta sa **Appointments**.
2. Pindutin ang **New Appointment**.
3. Piliin ang patient.
4. Piliin ang date at time.
5. Piliin ang dentist.
6. Piliin ang dental service.
7. Piliin ang status.
8. Ilagay ang notes kung kailangan.
9. Pindutin ang **Create Appointment**.

Kapag pinili ang service, automatic na lalabas ang standard price. Maaari pa rin itong baguhin kung may discount o espesyal na presyo.

### Schedule conflict

Hindi papayagan ng system na magkaroon ang parehong dentist ng dalawang active appointments sa eksaktong parehong date at time.

Kapag may conflict, magpapakita ang system ng warning. Pumili lamang ng ibang oras o dentist.

### Appointment statuses

- **Pending** — Hindi pa confirmed ang schedule.
- **Confirmed** — Sigurado na ang appointment.
- **Completed** — Tapos na ang treatment o visit.
- **Cancelled** — Kinansela ang appointment.
- **No-show** — Hindi dumating ang patient.

Para maging tama ang reports at revenue, palitan sa **Completed** ang status pagkatapos ng successful visit.

### Paano mag-edit ng appointment

1. Hanapin ang appointment.
2. Pindutin ang pencil o edit button.
3. Baguhin ang impormasyon.
4. Pindutin ang **Save Changes**.

### Paano mag-delete ng appointment

1. Hanapin ang appointment.
2. Pindutin ang trash o delete button.
3. Pindutin ang **Confirm**.

Warning: Permanenteng matatanggal ang appointment record.

### Filters

Maaaring hanapin o salain ang appointments gamit ang:

- Patient name
- Dentist
- Service
- Status
- Date

Pindutin ang **Clear** para alisin lahat ng filters.

---

## 8. Calendar

Ang Calendar page ay monthly view ng lahat ng appointments.

- Gamitin ang left at right arrow para lumipat ng buwan.
- Pindutin ang **Today** para bumalik sa kasalukuyang buwan.
- Pindutin ang isang araw para makita ang schedule sa araw na iyon.

May magkakaibang kulay ang appointments depende sa status:

- Blue — Confirmed
- Orange — Pending
- Green — Completed
- Red — Cancelled
- Purple — No-show

---

## 9. Reports

Ang Reports page ay simpleng summary ng clinic activity.

Makikita rito ang:

- Total appointments
- Collected revenue
- Completion rate
- Unique patients
- Appointment volume kada buwan
- Appointment status breakdown

### Reporting period

Maaaring piliin ang:

- Last 30 days
- Last 90 days
- Last 12 months
- All time

### Paano kinukuha ang revenue?

Ang revenue ay galing lamang sa appointments na may status na **Completed**.

Halimbawa: Kung ang appointment ay may halagang ₱1,500 pero Pending pa rin ang status, hindi pa ito isasama sa collected revenue.

### Print report

Pindutin ang **Print Report** para mag-print o mag-save bilang PDF gamit ang browser print window.

---

## 10. Settings

Sa Settings maaaring baguhin ang clinic information at system records.

### Clinic Profile

Maaaring baguhin ang:

- Clinic name
- Phone number
- Email address
- Clinic address
- Opening time
- Closing time

Pindutin ang **Save Clinic Profile** pagkatapos mag-edit.

### Dentists

Maaaring magdagdag, mag-edit, o mag-delete ng dentists.

Kailangan ng kahit isang dentist bago makagawa ng appointment.

### Services

Maaaring magdagdag, mag-edit, o mag-delete ng dental services.

Bawat service ay may:

- Service name
- Tagal sa minutes
- Standard price

Kailangan ng kahit isang service bago makagawa ng appointment.

---

## 11. Backup at Restore

Ang backup ay kopya ng lahat ng system records.

Kasama sa backup ang:

- Patients
- Appointments
- Dentists
- Services
- Clinic settings

### Paano gumawa ng backup

1. Pumunta sa **Settings**.
2. Hanapin ang **Data Management**.
3. Pindutin ang **Export** sa Download Backup.
4. Magda-download ang browser ng JSON file.
5. Itago ang file sa safe na folder, USB drive, o cloud storage.

Halimbawa ng backup filename:

`dental-backup-2026-09-19.json`

### Paano mag-restore ng backup

1. Pumunta sa **Settings**.
2. Pindutin ang **Import** sa Restore Backup.
3. Piliin ang dating JSON backup file.
4. Hintaying lumabas ang confirmation message.

Warning: Papalitan ng imported backup ang kasalukuyang records. Mag-download muna ng bagong backup bago mag-restore kung kailangan pang itago ang current data.

---

## 12. CSV Export

Maaaring i-export ang appointment at patient lists bilang CSV file.

Ang CSV file ay maaaring buksan sa Microsoft Excel, Google Sheets, o ibang spreadsheet application.

### Appointment export

1. Pumunta sa **Appointments**.
2. Gumamit ng filters kung specific records lamang ang kailangan.
3. Pindutin ang **Export CSV**.

Kung may active filter, filtered appointments lamang ang kasama sa export.

### Patient export

1. Pumunta sa **Patients**.
2. Gumamit ng search kung kailangan.
3. Pindutin ang **Export CSV**.

---

## 13. Demo Data

May sample patients, dentists, services, at appointments ang system sa unang pagbukas.

Ginagamit ang sample data para makita agad kung paano gumagana ang dashboard, calendar, at reports.

Maaaring i-edit o i-delete ang sample records at palitan ng totoong clinic information.

### Reset Demo Database

Ang **Reset Demo Database** ay magbubura sa kasalukuyang records at ibabalik ang original sample data.

Gamitin lamang ito kapag sigurado. Mag-download muna ng backup kung may importanteng records.

---

## 14. Recommended Daily Workflow

### Sa simula ng araw

1. Buksan ang Dashboard.
2. Tingnan ang today's appointments.
3. I-confirm ang Pending appointments.

### Kapag may bagong patient

1. Gumawa muna ng patient record.
2. Ilagay ang importanteng medical notes.
3. Gumawa ng appointment.

### Pagkatapos ng treatment

1. Buksan ang appointment.
2. Palitan ang status sa Completed.
3. I-check ang amount.
4. Maglagay ng treatment note kung kailangan.

### Sa pagtatapos ng araw

1. Tingnan kung may appointment na kailangan markahan bilang Completed o No-show.
2. I-check ang Reports.
3. Gumawa ng backup kung maraming bagong records.

---

## 15. Common Problems at Solusyon

### Walang design o mukhang plain ang page

Possible cause: Nahiwalay ang `index.html` sa `css` folder.

Solution: Siguraduhing magkakasama sa isang `dental-appointment` folder ang `index.html`, `css`, at `js`.

### Hindi gumagana ang buttons

Possible cause: Nawawala o nailipat ang `js` folder.

Solution: Ibalik ang `js` folder sa tabi ng `index.html` at huwag palitan ang filenames.

### Walang lumalabas na dating records

Possible causes:

- Ibang browser ang ginamit.
- Ibang computer ang ginamit.
- Na-clear ang browser data.
- Private o Incognito window ang ginamit.

Solution: Gamitin ang dating browser o mag-restore gamit ang JSON backup.

### Hindi makagawa ng appointment

Siguraduhing:

- May registered patient.
- May dentist sa Settings.
- May service sa Settings.
- Walang kaparehong schedule ang napiling dentist.

### Hindi kasama sa revenue ang appointment

Palitan ang appointment status sa **Completed**.

### Hindi ma-delete ang patient

May existing appointment pa ang patient. I-delete muna ang kanyang appointment records.

### Mali o blanko ang date at time

I-check ang date at time settings ng computer at siguraduhing tama ang values sa appointment form.

---

## 16. Data Safety Tips

- Gumawa ng backup araw-araw o pagkatapos ng maraming changes.
- Huwag gumamit ng Incognito o Private mode para sa regular clinic work.
- Huwag basta mag-clear ng browser data.
- Itago ang backup files sa secured na location.
- Huwag i-share ang backup file sa hindi authorized na tao dahil maaaring may patient information ito.
- Gumamit ng password-protected Windows account para maprotektahan ang clinic computer.

---

## 17. Limitasyon ng Kasalukuyang Version

Ang system ay ginawa para sa simple, offline, at single-computer use.

Hindi pa kasama ang:

- Automatic synchronization sa ibang computers
- Online patient booking
- SMS o email reminders
- User login at access levels
- Cloud database
- Sabay-sabay na paggamit ng maraming staff sa magkakaibang computers

Para magkaroon ng mga ito, kailangan ng online server at central database.

---

## 18. Simpleng Glossary

- **Browser** — Application tulad ng Chrome o Edge na ginagamit para magbukas ng websites at ng system.
- **Database** — Digital storage ng records.
- **IndexedDB** — Built-in local database ng browser.
- **Backup** — Extra copy ng records na maaaring gamitin kapag nawala ang original data.
- **Restore** — Pagbabalik ng records mula sa backup file.
- **CSV** — File format na maaaring buksan sa Excel o Google Sheets.
- **JSON** — File format na ginagamit para sa complete system backup.
- **CRUD** — Technical term para sa Create, Read, Update, at Delete o pagdagdag, pagtingin, pag-edit, at pagbura ng records.

---

## 19. Pinakamahalagang Tandaan

1. `index.html` lang ang bubuksan para gamitin ang system.
2. Huwag paghiwa-hiwalayin ang project files at folders.
3. Naka-save ang data sa browser ng computer.
4. Regular na gumamit ng Download Backup.
5. Ang Completed appointments lamang ang kasama sa collected revenue.

