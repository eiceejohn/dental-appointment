# Pag-live ng Dental System sa Railway

## Simpleng Paliwanag

Ang Railway ang magiging online computer na naghahatid ng dental system sa browser. Ginagamit ng project ang Caddy bilang maliit at mabilis na web server.

Hindi kailangang mag-install ng Node.js, PHP, XAMPP, o MySQL para sa kasalukuyang version.

---

## Mga Railway File

May tatlong files na inihanda para sa deployment:

- `Dockerfile` — Mga instruction na ginagamit ng Railway para buuin ang website container.
- `Caddyfile` — Configuration ng web server na naghahatid ng HTML, CSS, at JavaScript.
- `.dockerignore` — Pinipigilang mapasama sa deployment ang private backups, CSV exports, at unnecessary files.

Automatic na makikita ng Railway ang `Dockerfile` kapag nasa repository root ito.

---

## Bago Mag-deploy

Siguraduhing nasa GitHub repository root ang mga files:

```text
dental-appointment/
├── index.html
├── Dockerfile
├── Caddyfile
├── .dockerignore
├── README.md
├── css/
├── js/
├── assets/
└── docs/
```

Huwag i-upload ang:

- `dental-backup-*.json`
- `patients-*.csv`
- `appointments-*.csv`

Maaaring may private patient information ang mga files na ito.

---

## Step 1: I-push sa GitHub

1. Gumawa o buksan ang GitHub repository.
2. I-upload ang lahat ng project files.
3. Siguraduhing nasa pinaka-root ang `Dockerfile` at `index.html`.
4. I-commit ang changes.

---

## Step 2: Gumawa ng Railway Project

1. Mag-sign in sa Railway.
2. Pindutin ang **New Project**.
3. Piliin ang **Deploy from GitHub Repo**.
4. I-connect ang GitHub account kung hinihingi.
5. Piliin ang dental appointment repository.

Automatic na gagamitin ng Railway ang `Dockerfile`.

---

## Step 3: Hintayin ang Deployment

Makikita sa deployment logs ang pag-download ng Caddy image at paggawa ng website container.

Successful ang deployment kapag ang status ay **Active** o **Success** at walang error sa deployment logs.

Walang kailangan ilagay na Build Command o Start Command dahil naka-configure na ang mga ito sa Docker image.

---

## Step 4: I-set ang Health Check

1. Buksan ang Railway service.
2. Pumunta sa **Settings**.
3. Hanapin ang **Health Check** o **Healthcheck Path**.
4. Ilagay ang:

```text
/health
```

5. I-save o i-deploy ang staged changes.

Kapag binuksan ang `/health`, sasagot ang server ng `OK`. Ginagamit ito ng Railway para malaman kung maayos na tumatakbo ang website.

---

## Step 5: Gumawa ng Public Domain

1. Buksan ang service settings.
2. Hanapin ang **Networking**.
3. Pindutin ang **Generate Domain**.
4. Buksan ang ibinigay na `*.up.railway.app` address.

Hindi magiging publicly accessible ang service hangga't walang generated o custom domain.

---

## Step 6: I-test ang Live System

Pagkatapos mabuksan ang Railway URL:

1. Tingnan kung kumpleto ang Dashboard design.
2. Gumawa ng test patient.
3. Gumawa ng test appointment.
4. I-refresh ang page.
5. Siguraduhing nandiyan pa rin ang test records.
6. Subukan sa cellphone.
7. Subukan ang Download Backup at Restore Backup.

---

## Ano ang Mangyayari sa Database?

IndexedDB pa rin ang database ng kasalukuyang version.

Ang Railway ang nagho-host ng website files, pero ang patient records ay nase-save sa browser ng gumagamit.

Halimbawa:

- Ang records sa clinic computer ay nasa clinic computer lamang.
- Ang cellphone ay magkakaroon ng sarili nitong records.
- Ang ibang browser ay magkakaroon din ng sariling records.

Hindi automatic na nagiging shared database ang IndexedDB dahil lamang naka-Railway ang website.

---

## Bakit Hindi Basta Nilagyan ng Public Shared Database?

Ang system ay maaaring maglaman ng pangalan, contact information, medical notes, at appointment history.

Mapanganib ang shared database na walang:

- Secure login
- Staff accounts at permissions
- Password protection
- Server-side validation
- Activity logs
- Database access rules
- Data privacy safeguards

Hindi dapat direktang ilagay ang database password sa `app.js` o `db.js` dahil makikita ito ng lahat ng bumibisita sa website.

---

## Kung Kailangan ng Shared Online Database

Kailangan ng hiwalay na backend application:

```text
Browser
   ↓
Secure Backend API
   ↓
Railway PostgreSQL
```

Recommended na idagdag muna ang:

1. Admin at staff login
2. Password hashing
3. Role-based permissions
4. Protected API endpoints
5. PostgreSQL database migrations
6. Audit trail
7. Secure backup policy

Ibang development phase ito at hindi simpleng hosting configuration lamang.

---

## Pag-update ng Live Website

Kapag nakakonekta ang Railway service sa GitHub repository:

1. Baguhin ang project files.
2. I-commit at i-push sa connected GitHub branch.
3. Automatic na gagawa ang Railway ng bagong deployment.
4. Hintayin maging successful ang health check.
5. I-refresh ang live website.

Gumawa muna ng JSON backup bago sa major system update.

---

## Common Problems

### Walang Dockerfile na nakita

- Siguraduhing eksaktong `Dockerfile` ang pangalan, capital ang `D`, at walang file extension.
- Siguraduhing nasa repository root ito.

### Deployment succeeded pero walang website URL

- Pumunta sa Networking.
- Pindutin ang Generate Domain.

### Application failed to respond

- Siguraduhing hindi nag-set ng fixed port sa Railway settings.
- Automatic na ginagamit ng Caddy ang Railway `PORT` variable.
- Tingnan ang deployment logs.

### Health check failed

- Gamitin ang `/health` bilang Healthcheck Path.
- Tingnan kung successful ang Docker build.
- Huwag palitan ang `/health` rule sa `Caddyfile`.

### Plain ang page o walang design

- Siguraduhing kasama sa GitHub ang `css/styles.css`.
- I-check ang deployment logs para sa missing files.

### Hindi gumagana ang buttons

- Siguraduhing kasama ang `js/db.js` at `js/app.js`.
- Huwag palitan ang filenames o folder names.

### Wala ang local records sa Railway website

Normal ito dahil magkaibang website address ang local file at Railway URL.

1. Gumawa ng backup mula sa local system.
2. Buksan ang Railway website.
3. Pumunta sa Settings.
4. Gamitin ang Restore Backup.

---

## Railway Deployment Checklist

- [ ] Nasa GitHub repository root ang `index.html`.
- [ ] Nasa root ang `Dockerfile` at `Caddyfile`.
- [ ] Hindi naka-upload ang patient backups at CSV exports.
- [ ] Successful ang Railway deployment.
- [ ] Naka-set ang Healthcheck Path sa `/health`.
- [ ] May generated Railway domain.
- [ ] Gumagana ang Dashboard, Patients, Appointments, Calendar, at Reports.
- [ ] Nasubukan ang JSON backup at restore.
- [ ] Naiintindihan na local-per-browser pa rin ang database.

