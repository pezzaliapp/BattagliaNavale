# Battaglia Navale — App in una sola cartella

Una versione semplice di **Battaglia Navale** (giocatore vs Computer), sviluppata in **HTML + CSS + JavaScript** senza dipendenze. Tutti i file stanno in **un'unica cartella**.

## File inclusi
- `index.html` — interfaccia e markup
- `app.js` — logica di gioco (posizionamento, turni, colpi, vittoria/sconfitta)
- `manifest.json` — PWA (installabile su desktop/mobile)
- `sw.js` — service worker basilare per uso offline
- `icon.png` — icona 512×512
- `README.md` — questa guida
- `LICENSE` — MIT

## Funzionalità
- Griglia 10×10, navi classiche: 5,4,3,3,2 celle
- Posizionamento **manuale** (clic + rotazione `R`) o **casuale**
- Turni alternati: tiri sulla griglia del Computer
- Segnali grafici per **colpito**, **acqua**, **affondata**
- Log eventi in tempo reale
- **PWA**: può essere installata, funziona anche offline

## Come usare
1. Apri `index.html` in un browser moderno (Chrome, Edge, Firefox, Safari).
2. (Opzionale) Clicca su **Posizionamento casuale** per iniziare subito.
3. Spara cliccando sulle celle della griglia del **Computer**.
4. **Nuova partita** per ricominciare.

## Pubblicazione su GitHub Pages
1. Crea un repository (es. `BattagliaNavale`) e **carica tutti i file** nella root.
2. In GitHub, *Settings → Pages* → **Source: Deploy from a branch** (main / root).
3. Apri l’URL pubblicato e, se vuoi, **installa** come app.

---

MIT © 2025 — Alessandro Pezzali (PezzaliAPP)
