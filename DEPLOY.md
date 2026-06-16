# Deployment — Git + Vercel + eigene Domain

Diese Seite ist **statisch** (kein Build). Vercel serviert den Ordner direkt.
Ich habe das Git-Repo bereits initialisiert und einen ersten Commit erstellt — du musst
es nur noch zu GitHub pushen und mit Vercel verbinden.

---

## Schritt 1 — Repo zu GitHub pushen

**Variante A · mit GitHub CLI** (am schnellsten, falls `gh` installiert & eingeloggt):

```powershell
cd "D:\Claude Apps\Test\portfolio"
gh repo create henri-portfolio --public --source=. --remote=origin --push
```

**Variante B · klassisch über die GitHub-Website:**

1. Auf <https://github.com/new> ein neues, **leeres** Repo anlegen
   (Name z. B. `henri-portfolio`, **kein** README/.gitignore hinzufügen).
2. Dann lokal:

```powershell
cd "D:\Claude Apps\Test\portfolio"
git remote add origin https://github.com/<DEIN-USERNAME>/henri-portfolio.git
git branch -M main
git push -u origin main
```

---

## Schritt 2 — Vercel verbinden

1. <https://vercel.com> → mit GitHub anmelden.
2. **Add New… → Project** → das Repo `henri-portfolio` importieren.
3. Einstellungen unverändert lassen:
   - Framework Preset: **Other**
   - Build Command: *(leer)*
   - Output Directory: *(leer / `.`)*
   - Root Directory: `./`
4. **Deploy** klicken → nach ~20 s ist die Seite unter
   `https://henri-portfolio.vercel.app` live.

Ab jetzt gilt: **jeder `git push` deployt automatisch.**

```powershell
# künftige Updates:
git add -A
git commit -m "Update Portfolio"
git push
```

---

## Schritt 3 — Eigene Domain verbinden

> Falls deine Domain **nicht** `henriloehlein.de` ist, vorher in
> `index.html` die markierte `<link rel="canonical">`-Zeile + die zwei `og:`-URLs
> anpassen (3 Stellen, alle direkt beieinander), committen und pushen.

1. Domain kaufen, falls noch nicht vorhanden (z. B. bei Namecheap, Porkbun, IONOS/Strato
   für `.de` ~ 5–15 €/Jahr).
2. In Vercel: **Project → Settings → Domains → Add** → deine Domain eintragen.
3. Vercel zeigt dir die nötigen DNS-Einträge. Beim Domain-Anbieter eintragen:
   - **Apex/Root** (`henriloehlein.de`): `A`-Record → `76.76.21.21`
   - **www** (`www.henriloehlein.de`): `CNAME` → `cname.vercel-dns.com`
   *(Vercel nennt dir die exakt aktuellen Werte — immer die aus dem Vercel-Dashboard nehmen.)*
4. **HTTPS** wird von Vercel automatisch per Let's Encrypt eingerichtet (ein paar Minuten
   bis zu ~1 h DNS-Propagation).

Fertig — die Seite läuft öffentlich, responsiv (Desktop → Mobil) und mit HTTPS auf deiner Domain.

---

## Alternative ohne Git (Notfall): Netlify Drop
Den `portfolio`-Ordner einfach auf <https://app.netlify.com/drop> ziehen → sofort live.
Updates = Ordner erneut ziehen. (Weniger komfortabel als der Vercel-Auto-Deploy oben.)
