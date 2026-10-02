# Pag-live ng Dental System sa GitHub Pages

## Simpleng Paliwanag

Ang GitHub ay parang online storage ng project files. Ang GitHub Pages naman ang feature na nagpapakita ng mga files bilang live website.

Compatible ang dental system dahil HTML, CSS, at JavaScript lamang ang ginagamit nito.

---

## Bago Mag-upload

Siguraduhing ganito ang laman ng project:

```text
dental-appointment/
├── index.html
├── README.md
├── .nojekyll
├── css/
│   └── styles.css
├── js/
│   ├── db.js
│   └── app.js
└── docs/
    ├── USER_GUIDE.md
    └── GITHUB_PAGES_GUIDE.md
```

Ang `index.html` ay dapat nasa pinaka-root ng repository. Huwag ilagay ang buong project sa isa pang extra folder sa loob ng repository.

Tamang setup:

```text
repository/index.html
repository/css/styles.css
repository/js/app.js
```

Maling setup:

```text
repository/dental-appointment/index.html
```

Maaari pa ring gumana ang maling setup, pero magiging mas mahaba at mas nakakalito ang website address.

---

## Step 1: Gumawa ng GitHub Repository

1. Mag-sign in sa GitHub.
2. Pindutin ang **New repository**.
3. Maglagay ng repository name, halimbawa `dental-appointment`.
4. Piliin kung Public o Private ang repository.
5. Pindutin ang **Create repository**.

Tandaan: Kahit private ang repository, maaaring public pa rin ang GitHub Pages website depende sa account plan at settings.

---

## Step 2: I-upload ang Project Files

1. Sa bagong repository, pindutin ang **Add file**.
2. Piliin ang **Upload files**.
3. I-drag ang lahat ng laman ng `dental-appointment` folder.
4. Siguraduhing kasama ang `index.html`, `css`, `js`, at `docs`.
5. Maglagay ng commit message, halimbawa `Upload dental appointment system`.
6. Pindutin ang **Commit changes**.

Huwag i-upload ang patient backup JSON o exported CSV files.

---

## Step 3: I-enable ang GitHub Pages

1. Buksan ang repository.
2. Pindutin ang **Settings**.
3. Sa side menu, pindutin ang **Pages**.
4. Hanapin ang **Build and deployment**.
5. Sa Source, piliin ang **Deploy from a branch**.
6. Piliin ang `main` branch.
7. Piliin ang `/(root)` folder.
8. Pindutin ang **Save**.

Maghihintay nang ilang minuto bago maging available ang website.

Ang website address ay karaniwang ganito:

```text
https://YOUR-USERNAME.github.io/dental-appointment/
```

---

## Step 4: I-test ang Live Website

Pagkatapos lumabas ang website link:

1. Buksan ang link sa Chrome o Edge.
2. Tingnan kung may design ang Dashboard.
3. Subukang gumawa ng test patient.
4. Gumawa ng test appointment.
5. I-refresh ang page.
6. I-check kung nandiyan pa rin ang test records.
7. Subukan ang mobile view gamit ang cellphone.

---

## Paano Gumagana ang Database sa Live Site?

Kahit online ang website, local pa rin ang database.

Isipin na ang GitHub Pages ang nagbibigay ng blankong digital notebook sa bawat bisita. Ang sinusulat ng isang bisita ay sa kanyang browser lamang mase-save.

Halimbawa:

- Gumawa ka ng patient sa clinic computer. Sa clinic computer lang ito makikita.
- Binuksan mo ang website sa cellphone. Magkakaroon ang cellphone ng sariling database.
- Binuksan ng ibang staff sa laptop. Magkakaroon din siya ng sariling database.

Hindi automatic na nagsasama-sama ang records.

---

## Kailan Kailangan ng Cloud Database?

Kailangan ng cloud database kung gusto mo ng:

- Parehong records sa computer at cellphone
- Sabay-sabay na paggamit ng maraming staff
- Central patient database
- Online appointment booking ng patients
- Staff login at access levels
- Automatic synchronization
- Online backups

Mga puwedeng gamitin:

- Supabase
- Firebase
- MySQL na may sariling backend server

Hindi direktang nakakonekta ang GitHub Pages sa MySQL dahil static hosting lamang ito. Kailangan ng backend API para maging ligtas ang database connection.

---

## Privacy at Security

Medical at contact information ang maaaring ilagay sa system. Sundin ang mga simpleng safety rules:

- Huwag i-upload ang JSON backups sa GitHub.
- Huwag i-upload ang exported patient CSV files.
- Huwag maglagay ng database password o secret key direkta sa JavaScript.
- Gumamit ng secured at password-protected clinic computer.
- Gumawa ng regular backups.
- Huwag gumamit ng shared public computer para sa real patient records.
- Kung public ang link, tandaan na kahit sino ay maaaring buksan ang system interface.

Ang records sa IndexedDB ay hindi kasama sa GitHub repository at hindi automatic na nau-upload sa internet.

---

## Pag-update ng Live Website

Kapag may binago sa system:

1. I-upload o i-push ang updated files sa parehong repository.
2. Gumawa ng commit.
3. Hintayin ang GitHub Pages deployment.
4. I-refresh ang live website.

Karaniwang mananatili ang browser records pagkatapos mag-update dahil hiwalay ang IndexedDB sa project files. Gayunpaman, gumawa muna ng backup bago sa malalaking update.

---

## Common GitHub Pages Problems

### 404 o Page Not Found

- Siguraduhing enabled ang GitHub Pages.
- Siguraduhing `main` at `/(root)` ang napili.
- Siguraduhing nasa repository root ang `index.html`.
- Maghintay ng ilang minuto pagkatapos mag-deploy.

### Plain ang page at walang design

- Siguraduhing na-upload ang `css/styles.css`.
- Huwag palitan ang filename o folder name.

### Hindi gumagana ang buttons

- Siguraduhing na-upload ang `js/db.js` at `js/app.js`.
- Tingnan kung tama ang uppercase at lowercase ng filenames.

### Walang dating records sa live site

Normal ito kung galing ka sa local `index.html`. Magkaibang website address ang local file at GitHub Pages kaya magkaiba rin ang browser database.

Gumawa ng backup sa local system at gamitin ang Restore Backup sa live website para ilipat ang records.

### Hindi agad nakikita ang update

- Hintayin matapos ang GitHub Pages deployment.
- I-hard refresh ang browser gamit ang `Ctrl + F5`.
- Tingnan ang Actions tab kung may failed deployment.

---

## Pinakamahalagang Tandaan

1. Nasa repository root dapat ang `index.html`.
2. Piliin ang `main` at `/(root)` sa GitHub Pages settings.
3. Hindi shared database ang IndexedDB.
4. Huwag i-upload ang patient backups o CSV exports.
5. Gumawa ng backup bago mag-update o magpalit ng browser.

