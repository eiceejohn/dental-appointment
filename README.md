# Dental Appointment Scheduling System

Isang responsive dental clinic scheduling system na gumagana bilang static website. Puwede itong buksan locally gamit ang `index.html` o i-publish gamit ang GitHub Pages.

## Main Features

- Patient records at medical notes
- Appointment scheduling at conflict checking
- Dentist at service management
- Monthly calendar
- Clinic reports at revenue summary
- CSV exports
- JSON backup at restore
- Responsive desktop at mobile layout
- Browser-based IndexedDB storage

## Local Use

I-double-click lamang ang `index.html`. Hindi kailangan ng installation, XAMPP, o internet.

## GitHub Pages Deployment

1. Gumawa ng bagong GitHub repository.
2. I-upload ang lahat ng laman ng `dental-appointment` folder sa repository root.
3. Siguraduhing nasa pinaka-root ang `index.html`.
4. Buksan ang repository **Settings**.
5. Piliin ang **Pages**.
6. Sa **Build and deployment**, piliin ang **Deploy from a branch**.
7. Piliin ang `main` branch at `/(root)` folder.
8. Pindutin ang **Save**.
9. Hintayin ang GitHub Pages URL at pindutin ang **Visit site**.


## Railway Deployment

Railway-ready ang project gamit ang included na `Dockerfile` at `Caddyfile`.

1. I-push ang project sa GitHub.
2. Sa Railway, piliin ang **Deploy from GitHub Repo**.
3. Piliin ang repository. Automatic na makikita ng Railway ang `Dockerfile`.
4. Sa service settings, gamitin ang `/health` bilang Healthcheck Path.
5. Sa Networking, pindutin ang **Generate Domain**.

Walang kailangang Build Command o Start Command. Basahin ang [Railway Deployment Guide](docs/RAILWAY_DEPLOYMENT_GUIDE.md) para sa complete Taglish instructions.

Important: Website hosting lamang ito. Local-per-browser pa rin ang IndexedDB at hindi shared cloud database.

## Importanteng Database Reminder

Ang IndexedDB database ay naka-save sa browser ng bawat user. Hindi ito central o shared database.

Halimbawa:

- Ang records na ginawa sa clinic computer ay hindi automatic na makikita sa cellphone.
- Ang records sa Chrome ay maaaring hindi makita sa Edge.
- Kapag nag-clear ng browser data, maaaring mawala ang records.
- Ang pag-update ng files sa GitHub ay hindi nagbubura ng IndexedDB records, basta pareho ang website address.

Gamitin ang **Settings → Download Backup** para gumawa ng regular na JSON backup.

Kung kailangan ng sabay-sabay na access ng maraming staff o devices, kailangang palitan ang local IndexedDB ng cloud database tulad ng Supabase, Firebase, o sariling backend API.

## Privacy Warning

Ang GitHub Pages website ay maaaring maging publicly accessible. Huwag i-commit o i-upload ang exported patient CSV files at JSON backup files. Maaaring naglalaman ang mga ito ng private patient information.

## Documentation

- [Complete User Guide](docs/USER_GUIDE.md)
- [GitHub Pages Guide](docs/GITHUB_PAGES_GUIDE.md)

