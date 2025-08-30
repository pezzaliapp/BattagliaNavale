// Battaglia Navale — singola cartella
// MIT © 2025 Alessandro Pezzali — PezzaliAPP
(() => {
  const W = 10, H = 10;
  const SHIPS = [
    { name: "Portaerei", size: 5, key: "A" },
    { name: "Corazzata", size: 4, key: "B" },
    { name: "Incrociatore", size: 3, key: "C" },
    { name: "Sottomarino", size: 3, key: "S" },
    { name: "Cacciatorp.", size: 2, key: "D" },
  ];

  const elP = document.getElementById('grid-player');
  const elC = document.getElementById('grid-cpu');
  const log = document.getElementById('log');
  const shipsList = document.getElementById('ships-list');
  const btnRandom = document.getElementById('btn-random');
  const btnRotate = document.getElementById('btn-ruota');
  const btnReset = document.getElementById('btn-reset');

  let state;
  let placingIndex = 0;
  let horizontal = true;
  let playerTurn = true;
  let gameOver = false;

  function newGrid() {
    return Array.from({length: H}, () => Array.from({length: W}, () => ({
      ship: null, hit: false, miss: false, sunk: false
    })));
  }

  function clone(o){return JSON.parse(JSON.stringify(o));}

  function reset() {
    state = {
      player: newGrid(),
      cpu: newGrid(),
      shipsP: SHIPS.map(s => ({...s, placed:false, coords:[]})),
      shipsC: SHIPS.map(s => ({...s, placed:false, coords:[]})),
      cpuShots: new Set(),
    };
    placingIndex = 0;
    horizontal = true;
    playerTurn = true;
    gameOver = false;
    renderBoards();
    renderShipsList();
    setRotateLabel();
    logClear();
    logLine("Posiziona le tue navi o usa «Posizionamento casuale». Poi spara sulla griglia del Computer.");
  }

  function setRotateLabel(){
    btnRotate.textContent = `Ruota (R) — ${horizontal ? "Orizz." : "Vert."}`;
  }

  function renderBoards(){
    elP.innerHTML = "";
    elC.innerHTML = "";
    for(let y=0;y<H;y++){
      for(let x=0;x<W;x++){
        const cP = document.createElement('div');
        cP.className = 'cell own';
        const cellP = state.player[y][x];
        if(cellP.ship) cP.classList.add('ship');
        if(cellP.hit) cP.classList.add('hit');
        if(cellP.miss) cP.classList.add('miss');
        if(cellP.sunk) cP.classList.add('sunk');
        cP.addEventListener('mouseenter', () => {
          if(placingIndex < SHIPS.length){
            const ok = canPlace(state.player, x, y, SHIPS[placingIndex].size, horizontal);
            if(ok) markAim(elP, x, y, SHIPS[placingIndex].size, horizontal);
          }
        });
        cP.addEventListener('mouseleave', () => clearAim(elP));
        cP.addEventListener('click', () => {
          if(placingIndex < SHIPS.length){
            placePlayerShip(x, y);
          }
        });
        elP.appendChild(cP);

        const cC = document.createElement('div');
        cC.className = 'cell';
        const cellC = state.cpu[y][x];
        if(cellC.hit) cC.classList.add('hit');
        if(cellC.miss) cC.classList.add('miss');
        if(cellC.sunk) cC.classList.add('sunk');
        cC.addEventListener('click', () => playerFire(x, y));
        elC.appendChild(cC);
      }
    }
  }

  function markAim(container, x, y, size, horiz){
    clearAim(container);
    const idx = y*W + x;
    for(let i=0;i<size;i++){
      const xi = horiz ? x+i : x;
      const yi = horiz ? y : y+i;
      if(xi>=W || yi>=H) return;
      container.children[yi*W+xi].classList.add('aim');
    }
  }
  function clearAim(container){
    [...container.children].forEach(ch => ch.classList.remove('aim'));
  }

  function canPlace(grid, x, y, size, horiz){
    for(let i=0;i<size;i++){
      const xi = horiz ? x+i : x;
      const yi = horiz ? y : y+i;
      if(xi>=W || yi>=H) return false;
      if(grid[yi][xi].ship) return false;
      // optional: 1-cell margin around ships (disabled for simplicity)
    }
    return true;
  }

  function place(grid, shipObj, x, y, horiz){
    const coords = [];
    for(let i=0;i<shipObj.size;i++){
      const xi = horiz ? x+i : x;
      const yi = horiz ? y : y+i;
      grid[yi][xi].ship = shipObj.key;
      coords.push([xi, yi]);
    }
    shipObj.placed = true;
    shipObj.coords = coords;
  }

  function placePlayerShip(x, y){
    const ship = state.shipsP[placingIndex];
    if(!canPlace(state.player, x, y, ship.size, horizontal)) return;
    place(state.player, ship, x, y, horizontal);
    placingIndex++;
    renderBoards();
    renderShipsList();
    if(placingIndex >= SHIPS.length){
      // lock player placement, auto-place CPU
      randomPlaceAll(state.cpu, state.shipsC);
      logLine("Tutte le tue navi sono pronte. Inizia lo scontro!");
    }
  }

  function randomPlaceAll(grid, ships){
    // clear existing
    for(let y=0;y<H;y++) for(let x=0;x<W;x++){ grid[y][x] = { ship:grid[y][x].ship?null:null, hit:false, miss:false, sunk:false }; }
    // naive random placement
    for(const s of ships){
      let placed = false, tries = 0;
      while(!placed && tries<1000){
        tries++;
        const horiz = Math.random()<.5;
        const x = Math.floor(Math.random()*W);
        const y = Math.floor(Math.random()*H);
        if(canPlace(grid, x, y, s.size, horiz)){
          place(grid, s, x, y, horiz);
          placed = true;
        }
      }
      if(!placed) throw new Error("Impossibile posizionare: " + s.name);
    }
  }

  function renderShipsList(){
    shipsList.innerHTML = "";
    state.shipsP.forEach((s, i) => {
      const t = document.createElement('span');
      t.className = 'tag' + (s.placed ? ' done':'');
      t.textContent = s.name + " (" + s.size + ")";
      shipsList.appendChild(t);
    });
  }

  function logLine(s){
    const time = new Date().toLocaleTimeString();
    log.innerText += `[${time}] ${s}\n`;
    log.scrollTop = log.scrollHeight;
  }
  function logClear(){ log.innerText = ""; }

  function allPlaced(ships){ return ships.every(s => s.placed); }

  function playerFire(x, y){
    if(gameOver) return;
    if(!allPlaced(state.shipsP)){ logLine("Devi prima posizionare tutte le navi."); return; }
    if(!playerTurn){ logLine("Attendi il turno del Computer…"); return; }
    const cell = state.cpu[y][x];
    if(cell.hit || cell.miss) return;

    if(cell.ship){
      cell.hit = true;
      logLine(`Colpito su (${x+1},${y+1})!`);
      checkSunk(state.cpu, state.shipsC, cell.ship, 'CPU');
      if(checkWin(state.cpu)){ endGame(true); return; }
    } else {
      cell.miss = true;
      logLine(`Acqua su (${x+1},${y+1}).`);
      playerTurn = false;
      setTimeout(cpuTurn, 350);
    }
    renderBoards();
  }

  function checkSunk(grid, ships, key, side){
    const ship = ships.find(s => s.key === key);
    if(!ship) return;
    const alive = ship.coords.some(([x,y]) => !grid[y][x].hit);
    if(!alive){
      ship.sunk = true;
      ship.coords.forEach(([x,y]) => { grid[y][x].sunk = true; });
      logLine(`${side === 'CPU' ? "Hai affondato" : "Il Computer ha affondato"} la ${ship.name}!`);
    }
  }

  function checkWin(grid){
    // win if all ship cells are hit
    for(let y=0;y<H;y++){
      for(let x=0;x<W;x++){
        if(grid[y][x].ship && !grid[y][x].hit) return false;
      }
    }
    return true;
  }

  function cpuTurn(){
    if(gameOver) return;
    // simple AI: random unseen cell, slight bias to check neighbors after a hit
    const candidates = [];
    for(let y=0;y<H;y++){
      for(let x=0;x<W;x++){
        const c = state.player[y][x];
        if(!c.hit && !c.miss) candidates.push([x,y]);
      }
    }
    if(candidates.length===0) return;
    const [x,y] = candidates[Math.floor(Math.random()*candidates.length)];
    const cell = state.player[y][x];
    if(cell.ship){
      cell.hit = true;
      logLine(`Computer: colpito su (${x+1},${y+1})`);
      checkSunk(state.player, state.shipsP, cell.ship, 'PLAYER');
      renderBoards();
      if(checkWin(state.player)){ endGame(false); return; }
      // se colpisce, ha diritto a riprovare subito (regola facoltativa)
      setTimeout(cpuTurn, 300);
    } else {
      cell.miss = true;
      logLine(`Computer: acqua su (${x+1},${y+1})`);
      renderBoards();
      playerTurn = true;
    }
  }

  // Controls
  btnRandom.addEventListener('click', () => {
    // Posiziona subito le navi del player e CPU
    randomPlaceAll(state.player, state.shipsP);
    randomPlaceAll(state.cpu, state.shipsC);
    placingIndex = SHIPS.length;
    renderBoards();
    renderShipsList();
    logLine("Posizionamento casuale completato. Comincia a sparare sulla griglia del Computer!");
  });
  btnRotate.addEventListener('click', () => { horizontal = !horizontal; setRotateLabel(); });
  window.addEventListener('keydown', (e) => { if(e.key.toLowerCase()==='r'){ horizontal=!horizontal; setRotateLabel(); }});
  btnReset.addEventListener('click', reset);

  function endGame(playerWon){
    gameOver = true;
    playerTurn = false;
    if(playerWon){
      logLine("🎉 Vittoria! Hai distrutto tutta la flotta nemica.");
    } else {
      logLine("💥 Sconfitta. Il Computer ha distrutto la tua flotta.");
    }
  }

  // Service Worker registration (facoltativo, ma il manifest c'è)
  if('serviceWorker' in navigator){
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(()=>{});
    });
  }

  // start
  reset();
})();
