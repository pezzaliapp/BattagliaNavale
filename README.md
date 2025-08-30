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
---

## Nota di Propaganda Interna

Questa **Battaglia Navale** non è solo un gioco: è anche un esempio di quanto la programmazione possa essere **semplice e diretta**.

- Tutto sta in **una sola cartella**: HTML, CSS, JS, manifest e icona.
- Nessun framework, nessuna dipendenza, nessun server: funziona **aprendo `index.html`**.
- La logica di gioco è tutta nel file `app.js`, leggibile e modificabile anche da chi non è sviluppatore professionista.

### Come si gioca
1. Puoi **posizionare manualmente** le navi cliccando sulla tua griglia.
   - Premi **R** o il pulsante **Ruota** per scegliere tra orizzontale e verticale.
2. In alternativa, clicca su **Posizionamento casuale** per far scegliere tutto al Computer.
3. Quando entrambe le flotte sono pronte, clicca sulle celle della griglia del **Computer** per sparare.
4. I colpi sono segnalati graficamente:
   - Rosso = **Colpito**
   - Grigio scuro = **Acqua**
   - Bordeaux = **Affondata**
5. Vince chi affonda tutta la flotta avversaria.

### Perché è semplice anche da programmare
- Le navi sono definite in un **array di oggetti** con nome, dimensione e simbolo.
- Il posizionamento controlla solo che non si sovrappongano e che rientrino nei limiti della griglia.
- La CPU usa una logica random semplice, ma espandibile con poche righe per diventare più intelligente.

Questa app è pensata come **ispirazione open-source**: un piccolo esercizio che dimostra che anche un gioco classico può vivere in pochi file chiari e didattici.