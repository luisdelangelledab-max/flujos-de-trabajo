/**
 * LÓGICA DE APLICACIÓN — BULLDOG DESIGN WORKFLOW APP
 * Gestión de vistas, acordeones interactivos, filtros, búsqueda en tiempo real,
 * simulador de auditoría de Gates y modo presentación ejecutiva.
 */

// Estado global de la aplicación
const AppState = {
  currentView: "pipeline", // pipeline | presentation | comparison | simulator | blockers
  activeFilter: "all",     // all | design | engineering | procurement | critical | blocker | fabrication
  searchQuery: "",
  currentSlideIndex: 0,
  isPresentationOpen: false,
  expandedTasks: new Set(),
  // Simulador de Gates
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

// Generador de sonidos sutiles mediante Web Audio API (cero dependencias externas)
const SoundFX = {
  ctx: null,
  init() {
    if (!this.ctx && typeof (window.AudioContext || window.webkitAudioContext) !== "undefined") {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  },
  playClick() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch(e) {}
  },
  playSuccess() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.35);
    } catch(e) {}
  },
  playWarning() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(180, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.25);
    } catch(e) {}
  }
};

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  renderNavbar();
  renderPipeline();
  renderDesignVsEngineering();
  renderBlockersDashboard();
  renderGateSimulator();
  renderPresentationSlide(0);
  setupEventListeners();
  updateStatsCounters();
});

// Configuración de listeners globales
function setupEventListeners() {
  // Navegación por tabs principales
  document.querySelectorAll("[data-nav-view]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const targetView = e.currentTarget.getAttribute("data-nav-view");
      switchView(targetView);
      SoundFX.playClick();
    });
  });

  // Filtros de categoría
  document.querySelectorAll("[data-filter]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll("[data-filter]").forEach(b => b.classList.remove("active", "ring-2", "ring-indigo-500"));
      e.currentTarget.classList.add("active", "ring-2", "ring-indigo-500");
      AppState.activeFilter = e.currentTarget.getAttribute("data-filter");
      renderPipeline();
      SoundFX.playClick();
    });
  });

  // Búsqueda en tiempo real
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      AppState.searchQuery = e.target.value.toLowerCase().trim();
      renderPipeline();
    });
  }

  // Teclado para presentación
  window.addEventListener("keydown", (e) => {
    if (AppState.currentView === "presentation" || AppState.isPresentationOpen) {
      if (e.key === "ArrowRight" || e.key === "Space") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "Escape") {
        if (AppState.isPresentationOpen) {
          closeFullscreenPresentation();
        }
      }
    }
  });
}

// Cambio de vistas
function switchView(viewName) {
  AppState.currentView = viewName;
  
  // Actualizar botones de navegación activa
  document.querySelectorAll("[data-nav-view]").forEach(btn => {
    if (btn.getAttribute("data-nav-view") === viewName) {
      btn.classList.add("bg-indigo-600/30", "text-indigo-300", "border-indigo-500/50");
      btn.classList.remove("text-slate-400", "hover:bg-slate-800/40");
    } else {
      btn.classList.remove("bg-indigo-600/30", "text-indigo-300", "border-indigo-500/50");
      btn.classList.add("text-slate-400", "hover:bg-slate-800/40");
    }
  });

  // Mostrar la sección correspondiente
  const views = ["pipeline-view", "presentation-view", "comparison-view", "simulator-view", "blockers-view"];
  views.forEach(v => {
    const el = document.getElementById(v);
    if (el) {
      if (v === `${viewName}-view`) {
        el.classList.remove("hidden");
      } else {
        el.classList.add("hidden");
      }
    }
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Renderizado del Pipeline y sus tarjetas con menús desplegables
function renderPipeline() {
  const container = document.getElementById("pipeline-container");
  if (!container) return;

  const data = WORKFLOW_DATA;
  let html = "";

  data.phases.forEach((phase, phaseIdx) => {
    // Filtrar tareas según filtro activo y búsqueda
    const filteredTasks = phase.tasks.filter(task => {
      // Filtro de categoría
      let matchesFilter = false;
      if (AppState.activeFilter === "all") matchesFilter = true;
      else if (AppState.activeFilter === "design" && task.category === "design") matchesFilter = true;
      else if (AppState.activeFilter === "engineering" && task.category === "engineering") matchesFilter = true;
      else if (AppState.activeFilter === "procurement" && task.category === "procurement") matchesFilter = true;
      else if (AppState.activeFilter === "blocker" && task.isBlocker) matchesFilter = true;
      else if (AppState.activeFilter === "critical" && task.isCritical) matchesFilter = true;
      else if (AppState.activeFilter === "fabrication" && task.category === "fabrication") matchesFilter = true;

      // Filtro de búsqueda
      let matchesSearch = true;
      if (AppState.searchQuery) {
        const query = AppState.searchQuery;
        const textToSearch = `${task.title} ${task.description} ${task.role} ${task.deliverables.join(" ")} ${task.dropdownPoints.join(" ")}`.toLowerCase();
        matchesSearch = textToSearch.includes(query);
      }

      return matchesFilter && matchesSearch;
    });

    if (filteredTasks.length === 0 && (AppState.activeFilter !== "all" || AppState.searchQuery)) {
      return; // No mostrar fases vacías al filtrar
    }

    const phaseCategory = data.colorCodes[phase.category] || data.colorCodes.design;

    html += `
      <div class="mb-12 relative">
        <!-- Encabezado de la Fase -->
        <div class="glass-panel rounded-2xl p-6 mb-6 border border-white/10 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <span class="w-12 h-12 rounded-xl bg-slate-800/90 border border-white/20 flex items-center justify-center font-bold text-lg text-white shadow-inner">
                ${phase.number}
              </span>
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold ${phaseCategory.badge}">
                    ${phase.leadRole}
                  </span>
                  <span class="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <svg class="w-3.5 h-3.5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    ${phase.software}
                  </span>
                </div>
                <h3 class="text-xl md:text-2xl font-bold text-white tracking-tight">${phase.title}</h3>
              </div>
            </div>
            <div class="text-right max-w-md hidden md:block">
              <p class="text-xs text-slate-400 leading-relaxed">${phase.summary}</p>
            </div>
          </div>
          <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
            <div class="text-amber-400/90 italic flex items-center gap-1.5">
              <svg class="w-4 h-4 text-amber-400 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
              <span>Principio Clave: ${phase.keyPrinciple}</span>
            </div>
            <span class="text-slate-500 font-mono text-[11px]">${filteredTasks.length} tarea(s)</span>
          </div>
        </div>

        <!-- Lista de Tarjetas de Tareas -->
        <div class="space-y-4">
          ${filteredTasks.map(task => renderTaskCard(task)).join("")}
        </div>
      </div>
    `;
  });

  if (html === "") {
    html = `
      <div class="glass-panel rounded-2xl p-12 text-center text-slate-400">
        <svg class="w-16 h-16 mx-auto mb-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <p class="text-lg font-medium text-slate-300">No se encontraron tareas con los filtros actuales</p>
        <p class="text-sm mt-1">Prueba borrando el término de búsqueda o seleccionando "Todos".</p>
      </div>
    `;
  }

  container.innerHTML = html;
  attachAccordionEvents();
}

// Renderizar una tarjeta individual con su menú desplegable
function renderTaskCard(task) {
  const isExpanded = AppState.expandedTasks.has(task.id);
  const colorMeta = WORKFLOW_DATA.colorCodes[task.category] || WORKFLOW_DATA.colorCodes.design;

  let borderClass = `border-${task.category}`;
  if (task.isBlocker) borderClass = "border-blocker";
  else if (task.isCritical) borderClass = "border-critical";

  // Badges
  let badgeHtml = "";
  if (task.isBlocker) {
    badgeHtml += `
      <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-red-600/30 text-red-300 border border-red-500/50 flex items-center gap-1 pulse-blocker">
        <svg class="w-3.5 h-3.5 text-red-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
        BLOQUEO NO-GO
      </span>
    `;
  }
  if (task.isCritical) {
    badgeHtml += `
      <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 flex items-center gap-1">
        <svg class="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
        PUNTO CRÍTICO
      </span>
    `;
  }

  // Categoría badge
  const categoryBadge = `
    <span class="px-2.5 py-0.5 rounded-full text-xs font-medium ${colorMeta.badge}">
      ${colorMeta.label}
    </span>
  `;

  return `
    <div class="glass-panel rounded-xl overflow-hidden ${borderClass} transition-all duration-300" id="card-${task.id}">
      <!-- Barra superior clickable de la tarea -->
      <div class="p-5 flex flex-wrap items-center justify-between gap-3 cursor-pointer select-none hover:bg-white/[0.02]" data-accordion-trigger="${task.id}">
        <div class="flex items-center gap-3.5 flex-1 min-w-[280px]">
          <span class="font-mono text-xs text-slate-500 bg-slate-900/80 px-2 py-1 rounded border border-white/5">
            Sec. ${task.sectionRef}
          </span>
          <div>
            <div class="flex items-center gap-2 mb-0.5">
              ${categoryBadge}
              ${badgeHtml}
            </div>
            <h4 class="text-base md:text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
              ${task.title}
            </h4>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <div class="text-right hidden sm:block">
            <span class="text-xs text-slate-400 block font-mono">Responsable:</span>
            <span class="text-xs font-semibold text-slate-200">${task.role}</span>
          </div>

          <!-- Botón Desplegable -->
          <button class="w-9 h-9 rounded-lg bg-slate-800/80 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700/80 transition-colors">
            <svg class="w-5 h-5 chevron-icon ${isExpanded ? 'rotated' : ''}" id="chevron-${task.id}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Menú Desplegable con Puntos Clave, Entregables y Prerrequisitos -->
      <div class="accordion-content ${isExpanded ? 'expanded' : ''}" id="content-${task.id}">
        <div class="p-6 pt-2 border-t border-white/5 bg-slate-950/40">
          
          <p class="text-sm text-slate-300 mb-5 leading-relaxed">${task.description}</p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <!-- Puntos Clave de la Tarea -->
            <div class="bg-slate-900/80 rounded-xl p-4 border border-white/5">
              <h5 class="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-3 flex items-center gap-2">
                <svg class="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                Puntos Clave & Reglas Operativas
              </h5>
              <ul class="space-y-2 text-xs text-slate-300">
                ${task.dropdownPoints.map(pt => `
                  <li class="flex items-start gap-2">
                    <span class="text-indigo-400 mt-0.5">•</span>
                    <span>${pt}</span>
                  </li>
                `).join("")}
              </ul>
            </div>

            <!-- Entregables y Prerrequisitos -->
            <div class="space-y-4">
              <div class="bg-slate-900/80 rounded-xl p-4 border border-white/5">
                <h5 class="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-2">
                  <svg class="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                  Entregables de esta Tarea
                </h5>
                <div class="flex flex-wrap gap-2">
                  ${task.deliverables.map(d => `
                    <span class="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-medium">
                      ${d}
                    </span>
                  `).join("")}
                </div>
              </div>

              <div class="bg-slate-900/80 rounded-xl p-4 border border-white/5">
                <h5 class="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-2">
                  <svg class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>
                  Prerrequisitos Obligatorios
                </h5>
                <div class="flex flex-wrap gap-2">
                  ${task.prerequisites.map(p => `
                    <span class="px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-medium">
                      ${p}
                    </span>
                  `).join("")}
                </div>
              </div>
            </div>
          </div>

          <!-- Pie informativo de la tarjeta -->
          <div class="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-white/5">
            <span>Referencia Documental: Capítulo ${task.sectionRef}</span>
            <span class="font-mono text-indigo-400/80">Bulldog Design • Cabinet Vision</span>
          </div>

        </div>
      </div>
    </div>
  `;
}

// Configuración de eventos de los acordeones
function attachAccordionEvents() {
  document.querySelectorAll("[data-accordion-trigger]").forEach(trigger => {
    trigger.addEventListener("click", (e) => {
      const taskId = trigger.getAttribute("data-accordion-trigger");
      toggleAccordion(taskId);
      SoundFX.playClick();
    });
  });

  // Botón expandir todo
  const expandAllBtn = document.getElementById("btn-expand-all");
  if (expandAllBtn) {
    expandAllBtn.onclick = () => {
      WORKFLOW_DATA.phases.forEach(p => p.tasks.forEach(t => AppState.expandedTasks.add(t.id)));
      renderPipeline();
      SoundFX.playClick();
    };
  }

  // Botón colapsar todo
  const collapseAllBtn = document.getElementById("btn-collapse-all");
  if (collapseAllBtn) {
    collapseAllBtn.onclick = () => {
      AppState.expandedTasks.clear();
      renderPipeline();
      SoundFX.playClick();
    };
  }
}

function toggleAccordion(taskId) {
  const content = document.getElementById(`content-${taskId}`);
  const chevron = document.getElementById(`chevron-${taskId}`);

  if (AppState.expandedTasks.has(taskId)) {
    AppState.expandedTasks.delete(taskId);
    if (content) content.classList.remove("expanded");
    if (chevron) chevron.classList.remove("rotated");
  } else {
    AppState.expandedTasks.add(taskId);
    if (content) content.classList.add("expanded");
    if (chevron) chevron.classList.add("rotated");
  }
}

// ==========================================
// MODO PRESENTACIÓN EJECUTIVA (SLIDESHOW)
// ==========================================
function renderPresentationSlide(index) {
  const slides = WORKFLOW_DATA.presentationSlides;
  if (index < 0) index = 0;
  if (index >= slides.length) index = slides.length - 1;
  AppState.currentSlideIndex = index;

  const slide = slides[index];

  // Actualizar contenido en la vista integrada
  const titleEl = document.getElementById("pres-title");
  const subtitleEl = document.getElementById("pres-subtitle");
  const badgeEl = document.getElementById("pres-badge");
  const quoteEl = document.getElementById("pres-quote");
  const bulletsEl = document.getElementById("pres-bullets");
  const imgEl = document.getElementById("pres-image");
  const counterEl = document.getElementById("pres-counter");
  const progressEl = document.getElementById("pres-progress-bar");

  if (titleEl) titleEl.innerText = slide.title;
  if (subtitleEl) subtitleEl.innerText = slide.subtitle;
  if (badgeEl) badgeEl.innerText = slide.badge;
  if (quoteEl) quoteEl.innerText = `"${slide.quote}"`;

  if (bulletsEl) {
    bulletsEl.innerHTML = slide.bullets.map(b => `
      <li class="flex items-start gap-3 text-slate-200 text-base md:text-lg">
        <span class="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 mt-2 shrink-0 shadow-lg shadow-indigo-500/50"></span>
        <span class="leading-snug">${b}</span>
      </li>
    `).join("");
  }

  if (imgEl) {
    imgEl.src = slide.image;
    imgEl.classList.remove("slide-in-right", "slide-in-left");
    void imgEl.offsetWidth; // Forzar reflow para animación
    imgEl.classList.add("slide-in-right");
  }

  if (counterEl) {
    counterEl.innerText = `Diapositiva ${index + 1} de ${slides.length}`;
  }

  if (progressEl) {
    const pct = ((index + 1) / slides.length) * 100;
    progressEl.style.width = `${pct}%`;
  }
}

function nextSlide() {
  if (AppState.currentSlideIndex < WORKFLOW_DATA.presentationSlides.length - 1) {
    renderPresentationSlide(AppState.currentSlideIndex + 1);
    SoundFX.playClick();
  }
}

function prevSlide() {
  if (AppState.currentSlideIndex > 0) {
    renderPresentationSlide(AppState.currentSlideIndex - 1);
    SoundFX.playClick();
  }
}

function openFullscreenPresentation() {
  AppState.isPresentationOpen = true;
  switchView("presentation");
}

function closeFullscreenPresentation() {
  AppState.isPresentationOpen = false;
  switchView("pipeline");
}

// ==========================================
// VISTA: DISEÑO VS INGENIERÍA
// ==========================================
function renderDesignVsEngineering() {
  const container = document.getElementById("comparison-table-container");
  if (!container) return;

  const data = WORKFLOW_DATA.designVsEngineering;

  let html = `
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm">
        <thead class="text-xs uppercase bg-slate-900/90 text-slate-400 border-b border-white/10">
          <tr>
            <th class="p-4 rounded-tl-xl w-1/4">Aspecto Operativo</th>
            <th class="p-4 w-3/8 text-purple-400">
              <span class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-purple-500"></span>
                Área de Diseño
              </span>
            </th>
            <th class="p-4 rounded-tr-xl w-3/8 text-cyan-400">
              <span class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-cyan-500"></span>
                Área de Ingeniería
              </span>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5 text-slate-300">
          ${data.comparisons.map((c, i) => `
            <tr class="hover:bg-white/[0.02] transition-colors ${i % 2 === 0 ? 'bg-slate-900/30' : 'bg-slate-900/10'}">
              <td class="p-4 font-bold text-white">${c.aspect}</td>
              <td class="p-4 leading-relaxed border-l border-purple-500/20 text-purple-200/90 bg-purple-950/10">${c.design}</td>
              <td class="p-4 leading-relaxed border-l border-cyan-500/20 text-cyan-200/90 bg-cyan-950/10">${c.engineering}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;

  container.innerHTML = html;
}

// ==========================================
// VISTA: SIMULADOR DE GATES ANTI-ERROR
// ==========================================
function renderGateSimulator() {
  const container = document.getElementById("gate-simulator-container");
  if (!container) return;

  const gate1Items = [
    { key: "materialsDefinitive", label: "Documento Definitivo de Materiales emitido por Compras (costo, acabado, proveedor)" },
    { key: "odooCataloged", label: "Materiales dados de alta en Odoo con Nombre Corto y Referencia Interna validada" },
    { key: "detailedModel", label: "Modelo a Detalle 3D resuelto (geometría, espesores representativos, holguras, zócalos)" },
    { key: "surveyValidated", label: "FILTRO 1: Modelo insertado y validado contra el levantamiento real de obra (cero colisiones)" },
    { key: "assemblyDefined", label: "Propuesta de Ensamble planteada (módulos independientes y secuencia de montaje)" },
    { key: "clearancesChecked", label: "Tolerancias de obra y holguras de instalación verificadas" }
  ];

  const gate2Items = [
    { key: "cvConfigComplete", label: "Etapa CV-6: Creación formal de Cabinet Vision con 100% de listas, cantos y métodos asignados" },
    { key: "parametricVerified", label: "Parametrización probada: el mueble se escala sin romper uniones ni geometrías" },
    { key: "fastenersDefined", label: "Conexiones mecánicas reales aplicadas (Minifix, taquetes de madera, barrenos CNC)" },
    { key: "filter2Match", label: "FILTRO 2: Comparación cruzada Ingeniería ↔ Diseño a Detalle aprobada sin discrepancias" },
    { key: "cncNoCollision", label: "Simulación de mecanizado CNC y nesting ejecutado sin colisiones de broca" },
    { key: "deliverablesReady", label: "Paquete completo generado: Planos + BOM + Código CNC + Etiquetas + Reporte Odoo" }
  ];

  let html = `
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      <!-- GATE 1: ¿Diseño está listo para Ingeniería? -->
      <div class="glass-panel rounded-2xl p-6 border border-purple-500/30 relative">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <span class="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 font-bold flex items-center justify-center">
              G1
            </span>
            <div>
              <h4 class="text-lg font-bold text-white">GATE 1: Listo para Ingeniería</h4>
              <p class="text-xs text-purple-300/80">Auditoría previa a Cabinet Vision</p>
            </div>
          </div>
          <span id="gate1-status-badge" class="px-3 py-1 rounded-full text-xs font-bold bg-red-600/30 text-red-300 border border-red-500/50">
            NO-GO BLOQUEADO
          </span>
        </div>

        <div class="w-full bg-slate-800 rounded-full h-2 mb-6 overflow-hidden">
          <div id="gate1-progress" class="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 transition-all duration-300" style="width: 0%"></div>
        </div>

        <div class="space-y-3">
          ${gate1Items.map(item => `
            <label class="flex items-start gap-3 p-3 rounded-lg bg-slate-900/60 border border-white/5 hover:border-purple-500/30 cursor-pointer transition-colors">
              <input type="checkbox" class="custom-checkbox mt-0.5" data-gate="1" data-key="${item.key}" onchange="handleSimulatorChange(1, '${item.key}', this.checked)">
              <span class="text-xs text-slate-300 leading-snug">${item.label}</span>
            </label>
          `).join("")}
        </div>

        <div id="gate1-alert-box" class="mt-5 p-4 rounded-xl bg-red-950/40 border border-red-600/40 text-xs text-red-300">
          <p class="font-bold flex items-center gap-2 mb-1">
            <svg class="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
            CONDICIÓN NO-GO ACTIVA:
          </p>
          <span id="gate1-reason">Faltan requisitos esenciales de Compras o Diseño. No debe liberarse a Ingeniería para evitar reprocesos masivos.</span>
        </div>
      </div>

      <!-- GATE 2: ¿Ingeniería está lista para Fabricación? -->
      <div class="glass-panel rounded-2xl p-6 border border-cyan-500/30 relative">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <span class="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold flex items-center justify-center">
              G2
            </span>
            <div>
              <h4 class="text-lg font-bold text-white">GATE 2: GO FABRICACIÓN</h4>
              <p class="text-xs text-cyan-300/80">Auditoría previa a Corte y CNC</p>
            </div>
          </div>
          <span id="gate2-status-badge" class="px-3 py-1 rounded-full text-xs font-bold bg-red-600/30 text-red-300 border border-red-500/50">
            NO-GO BLOQUEADO
          </span>
        </div>

        <div class="w-full bg-slate-800 rounded-full h-2 mb-6 overflow-hidden">
          <div id="gate2-progress" class="bg-gradient-to-r from-cyan-500 to-emerald-500 h-2 transition-all duration-300" style="width: 0%"></div>
        </div>

        <div class="space-y-3">
          ${gate2Items.map(item => `
            <label class="flex items-start gap-3 p-3 rounded-lg bg-slate-900/60 border border-white/5 hover:border-cyan-500/30 cursor-pointer transition-colors">
              <input type="checkbox" class="custom-checkbox mt-0.5" data-gate="2" data-key="${item.key}" onchange="handleSimulatorChange(2, '${item.key}', this.checked)">
              <span class="text-xs text-slate-300 leading-snug">${item.label}</span>
            </label>
          `).join("")}
        </div>

        <div id="gate2-alert-box" class="mt-5 p-4 rounded-xl bg-red-950/40 border border-red-600/40 text-xs text-red-300">
          <p class="font-bold flex items-center gap-2 mb-1">
            <svg class="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
            CONDICIÓN NO-GO ACTIVA:
          </p>
          <span id="gate2-reason">No se autoriza arranque de seccionadoras ni centros de maquinado hasta aprobar el Filtro 2 y verificar colisiones.</span>
        </div>
      </div>

    </div>
  `;

  container.innerHTML = html;
}

window.handleSimulatorChange = function(gateNum, key, isChecked) {
  if (gateNum === 1) {
    AppState.gate1Checks[key] = isChecked;
    updateGate1UI();
  } else {
    AppState.gate2Checks[key] = isChecked;
    updateGate2UI();
  }
};

function updateGate1UI() {
  const keys = Object.keys(AppState.gate1Checks);
  const total = keys.length;
  const checkedCount = keys.filter(k => AppState.gate1Checks[k]).length;
  const pct = Math.round((checkedCount / total) * 100);

  const progressEl = document.getElementById("gate1-progress");
  const badgeEl = document.getElementById("gate1-status-badge");
  const alertBox = document.getElementById("gate1-alert-box");
  const reasonEl = document.getElementById("gate1-reason");

  if (progressEl) progressEl.style.width = `${pct}%`;

  if (checkedCount === total) {
    SoundFX.playSuccess();
    badgeEl.className = "px-3 py-1 rounded-full text-xs font-bold bg-emerald-600/30 text-emerald-300 border border-emerald-500/50";
    badgeEl.innerText = "GATE 1 APROBADO: LIBERAR A INGENIERÍA";
    alertBox.className = "mt-5 p-4 rounded-xl bg-emerald-950/40 border border-emerald-600/40 text-xs text-emerald-300";
    alertBox.innerHTML = `
      <p class="font-bold flex items-center gap-2 mb-1">
        <svg class="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
        ESTADO AUTORIZADO:
      </p>
      <span>Todos los requerimientos están completos. El proyecto puede entrar formalmente a preparación y modelado en Cabinet Vision.</span>
    `;
  } else {
    badgeEl.className = "px-3 py-1 rounded-full text-xs font-bold bg-red-600/30 text-red-300 border border-red-500/50";
    badgeEl.innerText = "NO-GO BLOQUEADO";
    alertBox.className = "mt-5 p-4 rounded-xl bg-red-950/40 border border-red-600/40 text-xs text-red-300";
    const pending = total - checkedCount;
    reasonEl.innerText = `Faltan ${pending} requisito(s) crítico(s). La política estricta prohíbe transferir el proyecto a Ingeniería.`;
  }
}

function updateGate2UI() {
  const keys = Object.keys(AppState.gate2Checks);
  const total = keys.length;
  const checkedCount = keys.filter(k => AppState.gate2Checks[k]).length;
  const pct = Math.round((checkedCount / total) * 100);

  const progressEl = document.getElementById("gate2-progress");
  const badgeEl = document.getElementById("gate2-status-badge");
  const alertBox = document.getElementById("gate2-alert-box");
  const reasonEl = document.getElementById("gate2-reason");

  if (progressEl) progressEl.style.width = `${pct}%`;

  if (checkedCount === total) {
    SoundFX.playSuccess();
    badgeEl.className = "px-3 py-1 rounded-full text-xs font-bold bg-emerald-600/30 text-emerald-300 border border-emerald-500/50 shadow-lg shadow-emerald-500/20";
    badgeEl.innerText = "GATE 2 APROBADO: GO FABRICACIÓN";
    alertBox.className = "mt-5 p-4 rounded-xl bg-emerald-950/40 border border-emerald-600/40 text-xs text-emerald-300";
    alertBox.innerHTML = `
      <p class="font-bold flex items-center gap-2 mb-1">
        <svg class="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
        PRODUCCIÓN AUTORIZADA (GO):
      </p>
      <span>El modelo de Cabinet Vision es la fuente técnica oficial. Paquete de planos, CNC, etiquetas y BOM Odoo listos para ejecución en taller.</span>
    `;
  } else {
    badgeEl.className = "px-3 py-1 rounded-full text-xs font-bold bg-red-600/30 text-red-300 border border-red-500/50";
    badgeEl.innerText = "NO-GO BLOQUEADO";
    alertBox.className = "mt-5 p-4 rounded-xl bg-red-950/40 border border-red-600/40 text-xs text-red-300";
    const pending = total - checkedCount;
    reasonEl.innerText = `Faltan ${pending} validación(es) técnica(s). Prohibido iniciar corte o mecanizado CNC.`;
  }
}

// ==========================================
// VISTA: DASHBOARD DE BLOQUEOS & RETRABAJOS
// ==========================================
function renderBlockersDashboard() {
  const container = document.getElementById("blockers-cards-container");
  const calcContainer = document.getElementById("rework-matrix-container");
  if (!container) return;

  const blockers = WORKFLOW_DATA.blockersList;
  const matrix = WORKFLOW_DATA.reworkCalculatorMatrix;

  // Render tarjetas de los 6 bloqueos
  container.innerHTML = blockers.map(b => `
    <div class="glass-panel rounded-xl p-5 border-blocker relative overflow-hidden">
      <div class="flex items-center justify-between mb-3">
        <span class="px-2.5 py-0.5 rounded text-xs font-bold bg-red-600/30 text-red-300 border border-red-500/40">
          BLOQUEO #${b.number}
        </span>
        <span class="text-xs text-slate-400 font-mono">${b.phase}</span>
      </div>
      <h4 class="text-base font-bold text-white mb-2">${b.title}</h4>
      <p class="text-xs text-slate-300 mb-3"><strong class="text-red-400">Causa Raíz:</strong> ${b.cause}</p>
      
      <div class="p-3 rounded-lg bg-slate-900/80 border border-white/5 space-y-1.5 text-xs">
        <div><strong class="text-amber-400">Gatillo NO-GO:</strong> <span class="text-slate-300">${b.triggerCondition}</span></div>
        <div><strong class="text-emerald-400">Acción Correctiva:</strong> <span class="text-slate-300">${b.action}</span></div>
      </div>

      <div class="mt-3 pt-2 border-t border-white/5 text-[11px] font-mono text-red-400 flex items-center justify-between">
        <span>Impacto en tiempo:</span>
        <span class="font-bold">${b.impactDays}</span>
      </div>
    </div>
  `).join("");

  // Render matriz de calculadora de retrabajo
  if (calcContainer) {
    calcContainer.innerHTML = `
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="text-xs uppercase bg-slate-900/90 text-slate-400 border-b border-white/10">
            <tr>
              <th class="p-3.5">Etapa de Detección</th>
              <th class="p-3.5">Punto de Control</th>
              <th class="p-3.5 text-center">Multiplicador de Costo</th>
              <th class="p-3.5">Retraso Estimado</th>
              <th class="p-3.5">Impacto en Operación</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5 text-slate-300 text-xs">
            ${matrix.map(row => `
              <tr class="hover:bg-white/[0.02] transition-colors">
                <td class="p-3.5 font-bold text-white">${row.stage}</td>
                <td class="p-3.5 text-indigo-300">${row.detection}</td>
                <td class="p-3.5 text-center">
                  <span class="px-2 py-1 rounded-full font-mono font-bold ${row.costMultiplier === '1x' ? 'bg-emerald-500/20 text-emerald-300' : row.costMultiplier === '100x' ? 'bg-red-600/30 text-red-300 pulse-blocker' : 'bg-amber-500/20 text-amber-300'}">
                    ${row.costMultiplier}
                  </span>
                </td>
                <td class="p-3.5 font-mono text-red-400 font-semibold">${row.timeDelay}</td>
                <td class="p-3.5 text-slate-400 leading-relaxed">${row.costExplanation}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }
}

// Actualizar contadores en la barra superior
function updateStatsCounters() {
  let totalTasks = 0;
  let totalBlockers = 0;
  let totalCritical = 0;

  WORKFLOW_DATA.phases.forEach(p => {
    p.tasks.forEach(t => {
      totalTasks++;
      if (t.isBlocker) totalBlockers++;
      if (t.isCritical) totalCritical++;
    });
  });

  const tCount = document.getElementById("stat-total-tasks");
  const bCount = document.getElementById("stat-total-blockers");
  const cCount = document.getElementById("stat-total-critical");

  if (tCount) tCount.innerText = totalTasks;
  if (bCount) bCount.innerText = totalBlockers;
  if (cCount) cCount.innerText = totalCritical;
}

function renderNavbar() {
  // Configuración del header
}
