/**
 * LÓGICA DE INTERFAZ Y LECTURA PROGRESIVA — BULLDOG DESIGN v3.0
 * Arquitectura visual homóloga a "Manual visual de costos · Ibero" con UX/UI mejorada:
 * - Navegación lateral A–G con sincronización hash y atajos desde el Mapa General
 * - Timelines conectados por bloque operativo
 * - Fichas desplegables (<details class="sheet">) con búsqueda sin acentos y filtros
 * - Simulador interactivo de Gates (Gate 1 y Gate 2) con simulación 1-clic
 * - Selector de Tema Editorial Claro (estilo Ibero) ↔ Modo Oscuro Industrial
 */

"use strict";

const AppState = {
  currentView: "mapa",
  activeFilter: "all",
  searchQuery: "",
  currentSlideIndex: 0,
  theme: "light",
  gate1Checks: {
    materialsDefinitive: false,
    odooCataloged: false,
    detailedModel: false,
    surveyValidated: false,
    assemblyDefined: false,
    clearancesChecked: false
  },
  gate2Checks: {
    cvConfigComplete: false,
    parametricVerified: false,
    fastenersDefined: false,
    filter2Match: false,
    cncNoCollision: false,
    deliverablesReady: false
  }
};

// Normalización sin acentos para el buscador (igual que en Manual visual de costos · Ibero)
function norm(str) {
  return (str || "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderTimelines();
  renderFichas();
  renderDesignVsEngineering();
  renderGateSimulator();
  renderBlockersDashboard();
  renderPresentationSlide(0);
  setupEventListeners();
  updateStatsCounters();
});

function initTheme() {
  const saved = localStorage.getItem("bd_manual_theme");
  if (saved === "dark" || saved === "light") {
    AppState.theme = saved;
  }
  applyTheme();
}

function applyTheme() {
  document.documentElement.setAttribute("data-theme", AppState.theme);
  const label = document.getElementById("theme-label");
  if (label) {
    label.textContent = AppState.theme === "light"
      ? "☀️ Tema Editorial (Ibero)"
      : "🌙 Tema Oscuro Industrial";
  }
}

function setupEventListeners() {
  // Navegación del sidebar A-G
  document.querySelectorAll("[data-nav-view]").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-nav-view");
      navigateToView(target);
    });
  });

  // Botón de cambio de tema Claro/Oscuro
  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      AppState.theme = AppState.theme === "light" ? "dark" : "light";
      localStorage.setItem("bd_manual_theme", AppState.theme);
      applyTheme();
    });
  }

  // Filtros en Vista C (Guía por fichas)
  document.querySelectorAll("[data-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");
      setFichaFilter(filter);
    });
  });

  // Buscador en tiempo real sin acentos
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      AppState.searchQuery = e.target.value;
      renderFichas();
    });
  }

  // Expandir / Contraer todas las fichas
  const expandBtn = document.getElementById("btn-expand-all");
  if (expandBtn) {
    expandBtn.addEventListener("click", () => {
      document.querySelectorAll("#fichas-container details.sheet").forEach(d => {
        d.open = true;
      });
    });
  }

  const collapseBtn = document.getElementById("btn-collapse-all");
  if (collapseBtn) {
    collapseBtn.addEventListener("click", () => {
      document.querySelectorAll("#fichas-container details.sheet").forEach(d => {
        d.open = false;
      });
    });
  }

  // Teclado para diapositivas cuando estamos en Vista G
  window.addEventListener("keydown", (e) => {
    if (AppState.currentView === "odoo" && document.activeElement.tagName !== "INPUT") {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      }
    }
  });
}

// Navegación entre vistas A–G
window.navigateToView = function(viewName, optionalFilter) {
  AppState.currentView = viewName;

  document.querySelectorAll("[data-nav-view]").forEach(btn => {
    if (btn.getAttribute("data-nav-view") === viewName) {
      btn.setAttribute("aria-current", "page");
    } else {
      btn.removeAttribute("aria-current");
    }
  });

  const views = ["mapa", "fases", "fichas", "comparativa", "simulador", "bloqueos", "odoo"];
  views.forEach(v => {
    const el = document.getElementById(`view-${v}`);
    if (el) {
      el.hidden = (v !== viewName);
    }
  });

  if (optionalFilter) {
    setFichaFilter(optionalFilter);
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Abrir una ficha específica al hacer clic en un nodo del Mapa General o de la Línea de Tiempo
window.openFichaFromMap = function(taskId, event) {
  if (event) event.preventDefault();
  navigateToView("fichas", "all");
  const searchInput = document.getElementById("search-input");
  if (searchInput && AppState.searchQuery) {
    AppState.searchQuery = "";
    searchInput.value = "";
    renderFichas();
  }
  setTimeout(() => {
    const targetSheet = document.getElementById(`sheet-${taskId}`);
    if (targetSheet) {
      targetSheet.open = true;
      targetSheet.scrollIntoView({ behavior: "smooth", block: "center" });
      targetSheet.focus();
    }
  }, 60);
};

function setFichaFilter(filterName) {
  AppState.activeFilter = filterName;
  document.querySelectorAll("[data-filter]").forEach(btn => {
    const isCurrent = btn.getAttribute("data-filter") === filterName;
    btn.setAttribute("aria-pressed", isCurrent ? "true" : "false");
  });
  renderFichas();
}

// ==========================================================================
// VISTA B: RENDERIZADO DE TIMELINES CONECTADOS (BLOQUE I Y BLOQUE II)
// ==========================================================================
function renderTimelines() {
  const t1 = document.getElementById("timeline-bloque-1");
  const t2 = document.getElementById("timeline-bloque-2");
  if (!t1 || !t2) return;

  const phasesBlock1 = WORKFLOW_DATA.phases.filter(p => p.number <= 3);
  const phasesBlock2 = WORKFLOW_DATA.phases.filter(p => p.number >= 4);

  t1.innerHTML = buildTimelineItems(phasesBlock1, 1);
  t2.innerHTML = buildTimelineItems(phasesBlock2, 10);
}

function buildTimelineItems(phases, startNumber) {
  let idx = startNumber;
  const items = [];

  phases.forEach(phase => {
    phase.tasks.forEach(task => {
      const code = `BD-${String(idx).padStart(2, "0")}`;
      idx++;
      let stepClass = "";
      let nodeClass = "node";
      if (task.isBlocker) {
        stepClass = "step-blocker";
        nodeClass = "node blocker";
      } else if (task.isCritical) {
        stepClass = "step-control";
        nodeClass = "node control";
      } else if (task.category === "design") {
        stepClass = "step-design";
        nodeClass = "node design-node";
      }

      items.push(`
        <li class="${stepClass}">
          <span class="step-mark">${code.replace("BD-", "")}</span>
          <a class="${nodeClass}" href="#sheet-${task.id}" onclick="openFichaFromMap('${task.id}', event)">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:0.5rem;flex-wrap:wrap">
              <span><span class="mono">${code}</span> · ${task.title}</span>
              <span class="badge ${getBadgeClass(task)}">Fase ${phase.number} · Sec. ${task.sectionRef}</span>
            </div>
            <small>${task.role} (${phase.software}) — ${task.description}</small>
          </a>
        </li>
      `);
    });
  });

  return items.join("");
}

function getBadgeClass(task) {
  if (task.isBlocker) return "blocker";
  if (task.category === "design") return "design";
  if (task.category === "procurement") return "procurement";
  if (task.category === "fabrication") return "control";
  if (task.isCritical) return "warning";
  return "engineering";
}

function getBadgeLabel(task) {
  if (task.isBlocker) return "🛑 BLOQUEO NO-GO";
  if (task.category === "design") return "🎨 Diseño";
  if (task.category === "procurement") return "📦 Compras / Odoo";
  if (task.category === "fabrication") return "🚀 GO Fabricación";
  if (task.isCritical) return "⚠️ Punto Crítico";
  return "⚙️ Ingeniería CV";
}

// ==========================================================================
// VISTA C: GUÍA POR FICHAS (<details class="sheet">)
// ==========================================================================
function renderFichas() {
  const container = document.getElementById("fichas-container");
  const statusEl = document.getElementById("search-status");
  if (!container) return;

  const query = norm(AppState.searchQuery);
  let totalVisible = 0;
  let globalIndex = 1;
  let html = "";

  WORKFLOW_DATA.phases.forEach(phase => {
    const phaseCards = [];

    phase.tasks.forEach(task => {
      const code = `BD-${String(globalIndex).padStart(2, "0")}`;
      globalIndex++;

      // Filtro por categoría
      let matchesFilter = false;
      const f = AppState.activeFilter;
      if (f === "all") matchesFilter = true;
      else if (f === "design" && task.category === "design") matchesFilter = true;
      else if (f === "engineering" && task.category === "engineering") matchesFilter = true;
      else if (f === "procurement" && task.category === "procurement") matchesFilter = true;
      else if (f === "fabrication" && task.category === "fabrication") matchesFilter = true;
      else if (f === "blocker" && task.isBlocker) matchesFilter = true;
      else if (f === "critical" && task.isCritical) matchesFilter = true;

      // Filtro por texto libre sin acentos
      let matchesSearch = true;
      if (query) {
        const haystack = norm(
          `${code} ${task.id} ${task.title} ${task.sectionRef} ${task.role} ${phase.title} ${phase.software} ${task.description} ${task.deliverables.join(" ")} ${task.prerequisites.join(" ")} ${task.dropdownPoints.join(" ")}`
        );
        matchesSearch = haystack.includes(query);
      }

      if (!matchesFilter || !matchesSearch) return;
      totalVisible++;

      phaseCards.push(`
        <details class="sheet" id="sheet-${task.id}" ${query ? "open" : ""}>
          <summary>
            <div class="sheet-summary-left">
              <span class="id">${code}</span>
              <span>${task.title}</span>
              <span class="badge ${getBadgeClass(task)}">${getBadgeLabel(task)}</span>
              ${task.isCritical && !task.isBlocker ? '<span class="badge warning">Control Crítico</span>' : ''}
            </div>
            <div class="sheet-summary-right">
              <span class="mono">Sec. ${task.sectionRef}</span>
              <span>·</span>
              <span>${task.role}</span>
            </div>
          </summary>
          <div class="sheet-body">
            <div class="route">
              <strong>Fase ${phase.number} (${phase.title})</strong> · Software: <code>${phase.software}</code> · Responsable: <strong>${task.role}</strong>
            </div>
            <p>${task.description}</p>

            <dl class="meta">
              <div>
                <dt>Prerrequisitos obligatorios (Entrada)</dt>
                <dd>${task.prerequisites.map(p => `<span class="badge warning" style="margin:0.15rem 0.25rem 0.15rem 0">${p}</span>`).join(" ")}</dd>
              </div>
              <div>
                <dt>Entregables verificados (Salida)</dt>
                <dd>${task.deliverables.map(d => `<span class="badge control" style="margin:0.15rem 0.25rem 0.15rem 0">${d}</span>`).join(" ")}</dd>
              </div>
            </dl>

            <h4 style="margin-top:0.75rem">Reglas operativas y criterios de verificación:</h4>
            <ul>
              ${task.dropdownPoints.map(pt => `<li>${pt}</li>`).join("")}
            </ul>

            <div class="notice ${task.isBlocker ? 'blocker-notice' : 'control-notice'}" style="margin-top:0.75rem">
              <strong>${task.isBlocker ? '🛑 Condición de Bloqueo NO-GO:' : '✓ Principio rector de la fase:'}</strong>
              <p class="small" style="margin-top:0.25rem">${phase.keyPrinciple}</p>
            </div>
          </div>
        </details>
      `);
    });

    if (phaseCards.length > 0) {
      html += `
        <div class="details-group">
          <div class="details-group-header">
            <div>
              <strong>Fase ${phase.number} · ${phase.title}</strong>
              <span class="small muted" style="margin-left:0.5rem">(${phase.leadRole} · ${phase.software})</span>
            </div>
            <span class="badge">${phaseCards.length} ficha(s)</span>
          </div>
          ${phaseCards.join("")}
        </div>
      `;
    }
  });

  if (!html) {
    html = `
      <div class="panel" style="text-align:center;padding:2.5rem">
        <h3>No se encontraron fichas con ese criterio</h3>
        <p class="muted" style="margin-top:0.4rem">Prueba seleccionando el filtro «Todas (18)» o borrando el término de búsqueda.</p>
      </div>
    `;
  }

  container.innerHTML = html;
  if (statusEl) {
    statusEl.textContent = `Mostrando ${totalVisible} de 18 fichas operativas.`;
  }
}

// ==========================================================================
// VISTA D: MATRIZ DISEÑO VS. INGENIERÍA
// ==========================================================================
function renderDesignVsEngineering() {
  const container = document.getElementById("comparison-table-container");
  if (!container) return;

  const rows = WORKFLOW_DATA.designVsEngineering.comparisons;
  container.innerHTML = `
    <table class="op-table">
      <thead>
        <tr>
          <th style="width:20%">Dimensión técnica</th>
          <th style="width:40%;color:var(--plum)">🎨 Responsabilidad de Diseño</th>
          <th style="width:40%;color:var(--blue)">⚙️ Responsabilidad de Ingeniería (CV)</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map(r => `
          <tr>
            <td><strong>${r.aspect}</strong></td>
            <td>${r.design}</td>
            <td>${r.engineering}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

// ==========================================================================
// VISTA E: SIMULADOR INTERACTIVO DE GATES (GATE 1 Y GATE 2)
// ==========================================================================
function renderGateSimulator() {
  const container = document.getElementById("gate-simulator-container");
  if (!container) return;

  const gate1Items = [
    { key: "materialsDefinitive", label: "BLOQUEO 1 · Documento Definitivo de Materiales emitido por Compras (costo, acabado, espesor, proveedor)" },
    { key: "odooCataloged", label: "BLOQUEO 2 · Materiales dados de alta en Odoo con Nombre Corto (Mireya/Luis) y Referencia Interna única" },
    { key: "detailedModel", label: "BLOQUEO 3 · Modelo 3D a Detalle resuelto (geometría, espesores representativos, holguras, zócalos)" },
    { key: "surveyValidated", label: "BLOQUEO 4 / FILTRO 1 · Modelo insertado y validado contra el levantamiento real de obra (cero colisiones)" },
    { key: "assemblyDefined", label: "Propuesta lógica de ensamble planteada (módulos independientes y secuencia de instalación)" },
    { key: "clearancesChecked", label: "Tolerancias constructivas y rutas de acceso en obra verificadas" }
  ];

  const gate2Items = [
    { key: "cvConfigComplete", label: "BLOQUEO 5 (CV-6) · Creación formal en Cabinet Vision con 100% de piezas, cantos (general/45°), listas y métodos" },
    { key: "parametricVerified", label: "CV-7 y CV-8 · Parametrización probada y límites de geometría fija aplicados en cerchas/curvas" },
    { key: "fastenersDefined", label: "Conexiones mecánicas reales aplicadas en CV (Minifix, taquetes de madera, barrenos CNC)" },
    { key: "filter2Match", label: "BLOQUEO 6 / FILTRO 2 · Revisión cruzada Ingeniería (CV) ↔ Diseño a Detalle aprobada sin discrepancias" },
    { key: "cncNoCollision", label: "Simulación de mecanizado CNC y diagramas de corte (Nesting) verificados sin colisiones" },
    { key: "deliverablesReady", label: "Paquete completo listo desde fuente única: Planos + Nesting + CNC + Etiquetas + CSV BOM Odoo" }
  ];

  container.innerHTML = `
    <div class="split">
      <!-- GATE 1 -->
      <div class="panel">
        <div class="panel-head">
          <div>
            <span class="badge design">Compuerta Pre-Ingeniería</span>
            <h3 style="margin-top:0.3rem">GATE 1 · Diseño Listo para Ingeniería</h3>
          </div>
          <span id="gate1-status-badge" class="badge blocker">🛑 NO-GO BLOQUEADO</span>
        </div>

        <div class="progress-track">
          <div id="gate1-progress" class="progress-fill" style="width:0%"></div>
        </div>

        <div style="display:grid;gap:0.55rem;margin-top:0.85rem">
          ${gate1Items.map(item => `
            <label class="gate-check-item">
              <input type="checkbox" data-gate="1" data-key="${item.key}" ${AppState.gate1Checks[item.key] ? "checked" : ""} onchange="handleSimulatorChange(1, '${item.key}', this.checked)">
              <span class="small">${item.label}</span>
            </label>
          `).join("")}
        </div>

        <div id="gate1-alert-box" class="notice blocker-notice" style="margin-top:1rem">
          <strong>🛑 CONDICIÓN NO-GO ACTIVA:</strong>
          <p id="gate1-reason" class="small" style="margin-top:0.25rem">Faltan 6 requisitos críticos de Compras o Diseño. Prohibido transferir a Ingeniería.</p>
        </div>
      </div>

      <!-- GATE 2 -->
      <div class="panel">
        <div class="panel-head">
          <div>
            <span class="badge engineering">Compuerta Pre-Planta</span>
            <h3 style="margin-top:0.3rem">GATE 2 · GO FABRICACIÓN</h3>
          </div>
          <span id="gate2-status-badge" class="badge blocker">🛑 NO-GO BLOQUEADO</span>
        </div>

        <div class="progress-track">
          <div id="gate2-progress" class="progress-fill" style="width:0%"></div>
        </div>

        <div style="display:grid;gap:0.55rem;margin-top:0.85rem">
          ${gate2Items.map(item => `
            <label class="gate-check-item">
              <input type="checkbox" data-gate="2" data-key="${item.key}" ${AppState.gate2Checks[item.key] ? "checked" : ""} onchange="handleSimulatorChange(2, '${item.key}', this.checked)">
              <span class="small">${item.label}</span>
            </label>
          `).join("")}
        </div>

        <div id="gate2-alert-box" class="notice blocker-notice" style="margin-top:1rem">
          <strong>🛑 CONDICIÓN NO-GO ACTIVA:</strong>
          <p id="gate2-reason" class="small" style="margin-top:0.25rem">Faltan 6 validaciones técnicas en Cabinet Vision. Prohibido iniciar corte o CNC.</p>
        </div>
      </div>
    </div>
  `;

  updateGateUI(1);
  updateGateUI(2);
}

window.handleSimulatorChange = function(gateNum, key, isChecked) {
  if (gateNum === 1) {
    AppState.gate1Checks[key] = isChecked;
  } else {
    AppState.gate2Checks[key] = isChecked;
  }
  updateGateUI(gateNum);
};

window.markAllSimulatorGates = function(state) {
  Object.keys(AppState.gate1Checks).forEach(k => { AppState.gate1Checks[k] = state; });
  Object.keys(AppState.gate2Checks).forEach(k => { AppState.gate2Checks[k] = state; });
  renderGateSimulator();
};

function updateGateUI(gateNum) {
  const checksObj = gateNum === 1 ? AppState.gate1Checks : AppState.gate2Checks;
  const keys = Object.keys(checksObj);
  const total = keys.length;
  const checkedCount = keys.filter(k => checksObj[k]).length;
  const pct = Math.round((checkedCount / total) * 100);

  const progressEl = document.getElementById(`gate${gateNum}-progress`);
  const badgeEl = document.getElementById(`gate${gateNum}-status-badge`);
  const alertBox = document.getElementById(`gate${gateNum}-alert-box`);

  if (progressEl) progressEl.style.width = `${pct}%`;
  if (!badgeEl || !alertBox) return;

  if (checkedCount === total) {
    badgeEl.className = "badge control";
    badgeEl.textContent = gateNum === 1 ? "✓ GATE 1 APROBADO (GO INGENIERÍA)" : "🚀 GATE 2 APROBADO (GO FABRICACIÓN)";
    alertBox.className = "notice control-notice";
    alertBox.innerHTML = gateNum === 1
      ? `<strong>✓ LIBERACIÓN A INGENIERÍA AUTORIZADA:</strong><p class="small" style="margin-top:0.25rem">Materiales en Odoo, modelo a detalle y levantamiento verificados. Puede iniciar preparación CV-1 a CV-8.</p>`
      : `<strong>🚀 PRODUCCIÓN Y CORTE AUTORIZADOS (GO):</strong><p class="small" style="margin-top:0.25rem">Doble filtro aprobado. El modelo de Cabinet Vision es la fuente única oficial para planos, CNC, etiquetas y BOM Odoo.</p>`;
  } else {
    const pending = total - checkedCount;
    badgeEl.className = "badge blocker";
    badgeEl.textContent = `🛑 NO-GO (${checkedCount}/${total})`;
    alertBox.className = "notice blocker-notice";
    alertBox.innerHTML = `<strong>🛑 CONDICIÓN NO-GO ACTIVA:</strong><p class="small" style="margin-top:0.25rem">Falta(n) <b>${pending}</b> requisito(s) obligatorio(s). El proyecto no puede avanzar a la siguiente etapa.</p>`;
  }
}

// ==========================================================================
// VISTA F: LOS 6 BLOQUEOS NO-GO Y MATRIZ DE RETRABAJO (1x A 100x)
// ==========================================================================
function renderBlockersDashboard() {
  const cardsEl = document.getElementById("blockers-cards-container");
  const matrixEl = document.getElementById("rework-matrix-container");
  if (!cardsEl || !matrixEl) return;

  cardsEl.innerHTML = WORKFLOW_DATA.blockersList.map(b => `
    <article class="record record-blocker">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:0.5rem">
        <span class="badge blocker">🛑 NO-GO #${b.number}</span>
        <span class="small mono muted">${b.phase}</span>
      </div>
      <h3>${b.title}</h3>
      <p class="small"><strong>Disparador:</strong> ${b.triggerCondition}</p>
      <p class="small muted"><strong>Causa:</strong> ${b.cause}</p>
      <p class="small muted"><strong>Consecuencia si se omite:</strong> ${b.consequence}</p>
      <div class="notice blocker-notice" style="margin-top:auto;padding:0.55rem 0.75rem">
        <strong class="small">Acción: ${b.action}</strong>
        <span class="small" style="display:block;margin-top:0.2rem">Impacto evitado: <code>${b.impactDays}</code></span>
      </div>
    </article>
  `).join("");

  matrixEl.innerHTML = `
    <table class="op-table">
      <thead>
        <tr>
          <th>Etapa del flujo</th>
          <th>Punto de detección</th>
          <th>Multiplicador de costo</th>
          <th>Retraso típico</th>
          <th>Impacto operativo real</th>
        </tr>
      </thead>
      <tbody>
        ${WORKFLOW_DATA.reworkCalculatorMatrix.map(row => `
          <tr>
            <td><strong>${row.stage}</strong></td>
            <td><span class="badge">${row.detection}</span></td>
            <td><span class="badge ${parseInt(row.costMultiplier, 10) >= 15 ? 'blocker' : 'warning'}" style="font-size:0.88rem">${row.costMultiplier}</span></td>
            <td class="mono">${row.timeDelay}</td>
            <td>${row.costExplanation}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

// ==========================================================================
// VISTA G: MODO PRESENTACIÓN EJECUTIVA (6 DIAPOSITIVAS)
// ==========================================================================
function renderPresentationSlide(index) {
  const slides = WORKFLOW_DATA.presentationSlides;
  if (index < 0) index = 0;
  if (index >= slides.length) index = slides.length - 1;
  AppState.currentSlideIndex = index;

  const slide = slides[index];
  const titleEl = document.getElementById("pres-title");
  const subtitleEl = document.getElementById("pres-subtitle");
  const badgeEl = document.getElementById("pres-badge");
  const quoteEl = document.getElementById("pres-quote");
  const bulletsEl = document.getElementById("pres-bullets");
  const imgEl = document.getElementById("pres-image");
  const counterEl = document.getElementById("pres-counter");
  const progressEl = document.getElementById("pres-progress-bar");

  if (titleEl) titleEl.textContent = slide.title;
  if (subtitleEl) subtitleEl.textContent = slide.subtitle;
  if (badgeEl) badgeEl.textContent = slide.badge;
  if (quoteEl) quoteEl.textContent = `«${slide.quote}»`;
  if (bulletsEl) {
    bulletsEl.innerHTML = slide.bullets.map(b => `<li style="margin-bottom:0.4rem">${b}</li>`).join("");
  }
  if (imgEl) imgEl.src = slide.image;
  if (counterEl) counterEl.textContent = `Diapositiva ${index + 1} de ${slides.length}`;
  if (progressEl) {
    progressEl.style.width = `${((index + 1) / slides.length) * 100}%`;
  }
}

window.nextSlide = function() {
  if (AppState.currentSlideIndex < WORKFLOW_DATA.presentationSlides.length - 1) {
    renderPresentationSlide(AppState.currentSlideIndex + 1);
  } else {
    renderPresentationSlide(0);
  }
};

window.prevSlide = function() {
  if (AppState.currentSlideIndex > 0) {
    renderPresentationSlide(AppState.currentSlideIndex - 1);
  } else {
    renderPresentationSlide(WORKFLOW_DATA.presentationSlides.length - 1);
  }
};

function updateStatsCounters() {
  let totalTasks = 0;
  let totalCritical = 0;
  WORKFLOW_DATA.phases.forEach(p => {
    totalTasks += p.tasks.length;
    p.tasks.forEach(t => {
      if (t.isCritical) totalCritical++;
    });
  });

  const tasksEl = document.getElementById("stat-total-tasks");
  const blockersEl = document.getElementById("stat-total-blockers");
  const criticalEl = document.getElementById("stat-total-critical");

  if (tasksEl) tasksEl.textContent = totalTasks;
  if (blockersEl) blockersEl.textContent = WORKFLOW_DATA.blockersList.length;
  if (criticalEl) criticalEl.textContent = totalCritical;
}
