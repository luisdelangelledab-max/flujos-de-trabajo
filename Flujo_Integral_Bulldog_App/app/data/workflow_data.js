/**
 * DATOS MAESTROS DEL FLUJO DE TRABAJO — BULLDOG DESIGN
 * Fuente: Flujo Maestro de Alta, Diseño, Ingeniería y Liberación en Cabinet Vision
 * Integración Odoo <-> Cabinet Vision <-> Producción
 */

const WORKFLOW_DATA = {
  projectInfo: {
    title: "Flujo Maestro de Trabajo Bulldog Design",
    subtitle: "Alta, Diseño, Ingeniería y Liberación de Proyectos en Cabinet Vision",
    coreMotto: "La precisión del resultado final depende directamente de la calidad, completitud y estabilidad de la información utilizada desde el inicio.",
    ruleOfThumb: "Definir → Validar → Liberar → Ejecutar",
    version: "2.0 Producción",
    systemChain: "Odoo ↔ Cabinet Vision ↔ CNC ↔ Fabricación"
  },

  colorCodes: {
    design: {
      id: "design",
      label: "Diseño (Design)",
      bg: "bg-purple-900/30",
      border: "border-purple-500/40",
      text: "text-purple-300",
      badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      accent: "#A855F7",
      description: "¿Qué producto debemos fabricar y cómo resolverlo conceptualmente?"
    },
    engineering: {
      id: "engineering",
      label: "Ingeniería (Engineering)",
      bg: "bg-cyan-900/30",
      border: "border-cyan-500/40",
      text: "text-cyan-300",
      badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      accent: "#06B6D4",
      description: "¿Cómo fabricaremos, conectaremos, parametrizaremos y mecanizaremos ese producto?"
    },
    procurement: {
      id: "procurement",
      label: "Compras / Odoo",
      bg: "bg-amber-900/30",
      border: "border-amber-500/40",
      text: "text-amber-300",
      badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      accent: "#F59E0B",
      description: "Materiales reales, presupuesto, proveedor, espesor comercial y alta en Odoo."
    },
    critical: {
      id: "critical",
      label: "Punto Crítico",
      bg: "bg-yellow-900/30",
      border: "border-yellow-500/40",
      text: "text-yellow-300",
      badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      accent: "#EAB308",
      description: "Tolerancias, espesores, holguras o parametrizaciones de alto riesgo dimensional."
    },
    blocker: {
      id: "blocker",
      label: "Bloqueo NO-GO",
      bg: "bg-red-950/40",
      border: "border-red-600/50",
      text: "text-red-300",
      badge: "bg-red-600/20 text-red-300 border-red-500/40",
      accent: "#EF4444",
      description: "Filtro obligatorio. Detiene el avance a la siguiente etapa ante información faltante."
    },
    fabrication: {
      id: "fabrication",
      label: "Fabricación (GO)",
      bg: "bg-emerald-900/30",
      border: "border-emerald-500/40",
      text: "text-emerald-300",
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      accent: "#10B981",
      description: "Liberación formal a corte, CNC, ensamble e instalación."
    }
  },

  phases: [
    {
      id: "phase-1",
      number: 1,
      title: "Etapa Comercial & Diseño Volumétrico",
      category: "design",
      leadRole: "Diseño & Ventas",
      software: "Rhinoceros / SketchUp / CAD",
      summary: "Representación conceptual y volumétrica inicial enfocada en comunicar la propuesta y cerrar la venta con el cliente.",
      keyPrinciple: "Un diseño volumétrico aprobado comercialmente NO equivale a un diseño listo para Ingeniería.",
      tasks: [
        {
          id: "task-1-1",
          sectionRef: "5",
          title: "Diseño Volumétrico para Venta",
          role: "Diseño",
          category: "design",
          isCritical: false,
          isBlocker: false,
          deliverables: ["Renders volumétricos", "Distribución general", "Aprobación comercial del cliente"],
          prerequisites: ["Brief inicial del cliente", "Medidas preliminares"],
          description: "Desarrollo del concepto estético, proporciones generales y distribución de espacios para facilitar la aprobación comercial.",
          dropdownPoints: [
            "Propósito exclusivo: Representar la idea, comunicar proporciones y facilitar la firma comercial.",
            "No requiere soluciones constructivas ni barrenados definitivos en esta etapa.",
            "Condición estricta: No debe enviarse a Ingeniería en este estado porque carece de espesores reales y compatibilidad física."
          ]
        },
        {
          id: "task-1-2",
          sectionRef: "3.1 - 3.2",
          title: "Clasificación de Tipología de Proyecto",
          role: "Diseño & Ingeniería",
          category: "critical",
          isCritical: true,
          isBlocker: false,
          deliverables: ["Dictamen de Reutilización (Homologado vs Especial)"],
          prerequisites: ["Diseño volumétrico aprobado"],
          description: "Determinación de si el mueble puede reutilizar configuraciones homologadas o si exige el flujo completo.",
          dropdownPoints: [
            "Proyectos Homologados: Closets estandarizados, gabinetes, alacenas o baños previamente parametrizados.",
            "Pregunta clave: '¿La configuración existente puede utilizarse sin modificar materiales, espesores, piezas, construcción o lógica paramétrica?'",
            "Proyectos Especiales: Mobiliario ejecutivo, muebles orgánicos, cerchas, curvas, cambios de plano o forros particulares exigen flujo completo."
          ]
        }
      ]
    },

    {
      id: "phase-2",
      number: 2,
      title: "Compras & Datos Maestros en Odoo",
      category: "procurement",
      leadRole: "Compras / Costos",
      software: "Odoo ERP",
      summary: "Compras define los materiales comerciales viables (presupuesto, disponibilidad, proveedor) y los registra formalmente en Odoo con nomenclatura y referencia interna.",
      keyPrinciple: "Sin información de materiales definitiva → NO se libera el proyecto a Ingeniería.",
      tasks: [
        {
          id: "task-2-1",
          sectionRef: "6 - 7",
          title: "Definición y Validación de Materiales Comerciales",
          role: "Compras",
          category: "procurement",
          isCritical: true,
          isBlocker: false,
          deliverables: ["Documento Base Definitivo de Materiales"],
          prerequisites: ["Requerimiento de materiales del diseño comercial"],
          description: "Compras audita viabilidad según presupuesto, disponibilidad, proveedor, lead time, formato, acabado y unidad de compra.",
          dropdownPoints: [
            "Compras tiene la autoridad final sobre qué material comercial es viable para el proyecto.",
            "Debe incluir: Nombre exacto, referencia interna, categoría, espesor calibrado, acabado, proveedor y lead time.",
            "Este documento no es opcional ni administrativo: es una dependencia técnica formal."
          ]
        },
        {
          id: "task-2-2",
          sectionRef: "8",
          title: "BLOQUEO 1 — Validación del Documento de Materiales",
          role: "Gatekeeper / Compras",
          category: "blocker",
          isCritical: true,
          isBlocker: true,
          deliverables: ["Checklist de Materiales Aprobado (GO / NO-GO)"],
          prerequisites: ["Documento Base Definitivo de Materiales"],
          description: "Filtro de contención. La ausencia de materiales definitivos bloquea categóricamente el avance hacia Ingeniería.",
          dropdownPoints: [
            "ESTADO: NO-GO si faltan materiales definitivos o existen materiales 'provisionales'.",
            "Razón técnica: Trabajar con espesores hipotéticos destruye toda la parametrización posterior en Cabinet Vision.",
            "No se permiten excepciones bajo la promesa de 'completar los materiales después'."
          ]
        },
        {
          id: "task-2-3",
          sectionRef: "9 - 13",
          title: "Creación de Identidad Maestra en Odoo",
          role: "Compras (Colaboración con Ingeniería)",
          category: "procurement",
          isCritical: true,
          isBlocker: false,
          deliverables: ["Alta en Odoo (Nombre Maestro + Referencia Interna)"],
          prerequisites: ["Materiales aprobados por compras"],
          description: "Registro en Odoo aplicando la convención estandarizada de nombres cortos y referencia interna única.",
          dropdownPoints: [
            "Convención de nombres estandarizada (ej. 'MDF BCO FR 1C 18', 'LAM NOGAL 1C 18'). Diseñada por Mireya y Luis.",
            "Nombres cortos obligatorios: Cabinet Vision trunca o falla con nombres extensos en BOM e importación masiva.",
            "La Referencia Interna es el identificador maestro de trazabilidad; un conflicto en referencia impide la importación Odoo."
          ]
        },
        {
          id: "task-2-4",
          sectionRef: "14 & 62 (Bloqueo 2)",
          title: "BLOQUEO 2 — Validación de Identidad Maestra Odoo",
          role: "Gatekeeper / Ingeniería",
          category: "blocker",
          isCritical: true,
          isBlocker: true,
          deliverables: ["Validación de Unicidad Nombre ↔ Referencia Odoo"],
          prerequisites: ["Alta confirmada en Odoo"],
          description: "Verificación de que ningún material entre a Cabinet Vision sin su contraparte exacta en Odoo.",
          dropdownPoints: [
            "ESTADO: NO-GO si un solo material carece de nombre o referencia interna en Odoo.",
            "Regla de Oro: 'Automatizar información incorrecta únicamente propaga el error más eficientemente.'",
            "Mismo nombre con distinta referencia genera duplicados; referencias en conflicto bloquean la importación masiva final."
          ]
        }
      ]
    },

    {
      id: "phase-3",
      number: 3,
      title: "Diseño a Detalle & Validación en Obra",
      category: "design",
      leadRole: "Diseño",
      software: "Rhinoceros / CAD / Escáner 3D",
      summary: "Diseño incorpora los materiales reales de Compras, modela el producto a detalle constructivo y lo inserta en el levantamiento real de obra para auditar interferencias.",
      keyPrinciple: "Ningún proyecto debe liberarse a Ingeniería utilizando únicamente un modelo volumétrico.",
      tasks: [
        {
          id: "task-3-1",
          sectionRef: "15 - 17",
          title: "Desarrollo del Modelo a Detalle",
          role: "Diseño",
          category: "design",
          isCritical: true,
          isBlocker: false,
          deliverables: ["Modelo 3D a Detalle", "Solución constructiva formal"],
          prerequisites: ["Documento definitivo de materiales de Compras"],
          description: "Diseño resuelve geometría real, holguras, tolerancias, zócalos, forros, remates, curvas y propuesta de ensamble.",
          dropdownPoints: [
            "Diseño resuelve el '¿QUÉ?': Medidas exactas, espesores representativos, distribución de interiores y estética constructiva.",
            "No debe transferir a Ingeniería un cascarón vacío: debe incluir soluciones para cambios de plano, cerchas y despieces visuales.",
            "Propuesta de ensamble: Diseño define qué módulos son independientes, qué piezas van en paquete y cómo se instala en sitio."
          ]
        },
        {
          id: "task-3-2",
          sectionRef: "18 - 20",
          title: "Diferenciación de Competencias: Diseño vs Ingeniería",
          role: "Diseño & Ingeniería",
          category: "critical",
          isCritical: true,
          isBlocker: false,
          deliverables: ["Matriz de Alcance Aprobada"],
          prerequisites: ["Modelo a detalle preliminar"],
          description: "Clarificación de roles técnicos: Diseño define la intención y geometría; Ingeniería define mecanizados y conexiones.",
          dropdownPoints: [
            "Caso Curva: Diseño define radio, tangencia, posición e intención formal. Ingeniería define cerchas, radios de mecanizado CNC y espesor de laminado.",
            "Caso Conexiones: Diseño indica qué módulos se separan para transporte; Ingeniería define el tipo de Minifix, taquetes y barrenos CNC.",
            "Ingeniería no es un apéndice de Diseño para terminar decisiones abiertas."
          ]
        },
        {
          id: "task-3-3",
          sectionRef: "21 - 22",
          title: "FILTRO ANTIERROR 1: Validación contra Levantamiento Real",
          role: "Diseño",
          category: "design",
          isCritical: true,
          isBlocker: false,
          deliverables: ["Auditoría de Inserción en Obra (Modelo ↔ Levantamiento)"],
          prerequisites: ["Levantamiento en sitio con tolerancias", "Modelo a Detalle"],
          description: "Inserción del modelo a detalle en la nube de puntos o planos reales de obra para detectar interferencias.",
          dropdownPoints: [
            "Verificación de: Muros con desplome, columnas estructurales, salidas eléctricas, plomería, desniveles de piso y rutas de acceso.",
            "Pregunta Clave: '¿El producto diseñado funciona realmente dentro del espacio físico donde se instalará?'",
            "Si no funciona en obra, Diseño debe corregir antes de que el archivo llegue a manos de Ingeniería."
          ]
        },
        {
          id: "task-3-4",
          sectionRef: "23 & 62 (Bloqueo 3 y 4)",
          title: "GATE MAESTRO: DISEÑO LISTO PARA INGENIERÍA",
          role: "Líder de Diseño / Gatekeeper",
          category: "blocker",
          isCritical: true,
          isBlocker: true,
          deliverables: ["Acta de Liberación 'Listo para Ingeniería'"],
          prerequisites: ["Modelo a detalle completo", "Levantamiento validado", "Materiales en Odoo"],
          description: "Compuerta formal de inspección. Si falla un solo criterio, el proyecto entra en estado NO-GO.",
          dropdownPoints: [
            "BLOQUEO 3 (NO-GO): Si solo existe volumetría exterior sin solución constructiva.",
            "BLOQUEO 4 (NO-GO): Si no se ha verificado el mueble en el levantamiento real de obra.",
            "El bloqueo protege a Ingeniería de la sobrecarga y evita tener que re-modelar cuando el proyecto ya está en producción."
          ]
        }
      ]
    },

    {
      id: "phase-4",
      number: 4,
      title: "Configuración y Modelado en Cabinet Vision",
      category: "engineering",
      leadRole: "Ingeniería de Producto",
      software: "Cabinet Vision",
      summary: "Ingeniería prepara y parametriza los activos en Cabinet Vision (CV-1 a CV-8) creando componentes reutilizables antes de formalizar el proyecto.",
      keyPrinciple: "Cabinet Vision segmenta componentes para crear librerías homologadas reutilizables en futuros proyectos.",
      tasks: [
        {
          id: "task-4-1",
          sectionRef: "28 - 30",
          title: "Etapas CV-1 & CV-2: Creación de Piezas y Materiales",
          role: "Ingeniería",
          category: "engineering",
          isCritical: true,
          isBlocker: false,
          deliverables: ["Catálogo de Piezas y Materiales en Cabinet Vision"],
          prerequisites: ["Liberación del Gate 'Listo para Ingeniería'"],
          description: "Alta de partes especiales (cerchas, piezas curvas) y configuración de materiales con espesor real milimétrico.",
          dropdownPoints: [
            "CV-1 Piezas: Creación de componentes no estándar (cerchas estructurales, tapas curvas, forros especiales).",
            "CV-2 Materiales: Nombre idéntico a Odoo, referencia interna, espesor exacto verificado con muestra física o ficha técnica.",
            "Importancia del Espesor: 'Espacio - Tablero - Laminado - Forro = Pieza'. Un cambio de 1 mm rompe toda la lógica de ensambles."
          ]
        },
        {
          id: "task-4-2",
          sectionRef: "31 - 35",
          title: "Etapas CV-3 a CV-5: Cubrecantos, Listas y Métodos",
          role: "Ingeniería",
          category: "engineering",
          isCritical: true,
          isBlocker: false,
          deliverables: ["Configuraciones CV: Cantos, BOMs, Herrajes y Métodos"],
          prerequisites: ["Materiales dados de alta en CV"],
          description: "Asociación de cubrecantos (general y especial 45°), listas de materiales por módulo y método de construcción.",
          dropdownPoints: [
            "CV-3 Cubrecantos: Diferenciación entre cubrecanto habitual y cubrecanto de mayor calibre para bisel a 45° en maquinados.",
            "CV-4 Listas de Materiales: Segmentadas por gabinetes, alacenas, puertas independientes y cajones.",
            "CV-5 Método de Construcción: Reglas de unión, offsets de fondos, encuentros y comportamiento paramétrico."
          ]
        },
        {
          id: "task-4-3",
          sectionRef: "36 - 40 & 62 (Bloqueo 5)",
          title: "Etapa CV-6 & BLOQUEO 5: Creación Formal del Proyecto",
          role: "Ingeniería",
          category: "blocker",
          isCritical: true,
          isBlocker: true,
          deliverables: ["Proyecto creado en Cabinet Vision con vinculación 100%"],
          prerequisites: ["Todas las listas, cantos, herrajes y métodos preparados"],
          description: "Ventana de asignación integral. Funciona como Checkpoint de Completitud antes de iniciar el modelado 3D.",
          dropdownPoints: [
            "CHECKPOINT DE COMPLETITUD: Identifica en pantalla qué existe y qué falta.",
            "BLOQUEO 5 (NO-GO): Si falta un solo material, lista, cubrecanto, bisagra o método constructivo, el proyecto se detiene.",
            "Prohibido iniciar el modelado sobre una estructura de proyecto incompleta."
          ]
        },
        {
          id: "task-4-4",
          sectionRef: "41 - 45",
          title: "Etapas CV-7 & CV-8: Modelado a Detalle y Parametrización",
          role: "Ingeniería",
          category: "engineering",
          isCritical: true,
          isBlocker: false,
          deliverables: ["Modelo Paramétrico en Cabinet Vision"],
          prerequisites: ["Proyecto formalmente creado sin bloqueos"],
          description: "Modelado 3D paramétrico respetando el diseño a detalle, levantamiento y límites de edición paramétrica.",
          dropdownPoints: [
            "CV-7 Modelado: Refleja la realidad técnica exacta para despiece automático.",
            "CV-8 Parametrización: Permite escalar dimensiones sin romper uniones, mecanizados ni geometrías.",
            "Límites en muebles orgánicos: Las cerchas y paños con radios complejos se modelan fijos para no corromper tolerancias."
          ]
        }
      ]
    },

    {
      id: "phase-5",
      number: 5,
      title: "Ingeniería de Producto & Doble Filtro Anti-Error",
      category: "engineering",
      leadRole: "Ingeniería",
      software: "Cabinet Vision / CNC Nesting",
      summary: "Definición de conexiones mecánicas, mecanizados CNC, revisión técnica profunda y auditoría cruzada contra el modelo de Diseño.",
      keyPrinciple: "¿Lo que estamos a punto de fabricar sigue siendo lo que Diseño concibió y vendió?",
      tasks: [
        {
          id: "task-5-1",
          sectionRef: "46 - 48",
          title: "Ingeniería de Producto y Revisión Técnica",
          role: "Ingeniería",
          category: "engineering",
          isCritical: true,
          isBlocker: false,
          deliverables: ["Despiece, Conexiones Minifix/Barrenos y BOM Técnica"],
          prerequisites: ["Modelado en CV terminado"],
          description: "Asignación de Minifix, taquetes, barrenos, mecanizados CNC, despiece y validación de coherencia dimensional.",
          dropdownPoints: [
            "Conversión del diseño en un sistema 100% fabricable en máquina.",
            "Verificación de colisiones de herrajes, holguras de cajones y bisagras.",
            "Revisión de BOM para garantizar que cada pieza física tenga asignado su material Odoo."
          ]
        },
        {
          id: "task-5-2",
          sectionRef: "49 - 51",
          title: "FILTRO ANTIERROR 2: Comparación Ingeniería ↔ Diseño a Detalle",
          role: "Diseño & Ingeniería (Revisión Cruzada)",
          category: "critical",
          isCritical: true,
          isBlocker: false,
          deliverables: ["Dictamen de Congruencia Estética y Dimensional"],
          prerequisites: ["Modelo de Ingeniería listo", "Modelo a Detalle original"],
          description: "Auditoría entre el modelo técnico de Cabinet Vision y el modelo de Diseño para verificar fidelidad estética.",
          dropdownPoints: [
            "Comparación de: Dimensiones exteriores, distribución de frentes, acabados visibles, zócalos, holguras e intención original.",
            "Sistema de Doble Filtro: Filtro 1 (Diseño ↔ Levantamiento) + Filtro 2 (Ingeniería ↔ Diseño).",
            "Garantiza que la optimización técnica de ensamble no altere el producto aprobado por el cliente."
          ]
        },
        {
          id: "task-5-3",
          sectionRef: "52 & 62 (Bloqueo 6)",
          title: "GATE MAESTRO: GO FABRICACIÓN",
          role: "Líder de Operaciones / Dirección",
          category: "blocker",
          isCritical: true,
          isBlocker: true,
          deliverables: ["Autorización Formal de Fabricación (GO)"],
          prerequisites: ["Filtro 2 aprobado sin discrepancias críticas"],
          description: "Compuerta de liberación a planta. Sin esta firma, ninguna máquina CNC o seccionadora puede operar.",
          dropdownPoints: [
            "BLOQUEO 6 (NO-GO): Si existen discrepancias entre Ingeniería y Diseño o interferencias en el despiece.",
            "Rigurosidad Productiva: Así como no se corta sin plano, no se libera a planta sin doble filtro aprobado.",
            "Al aprobar este Gate, el modelo de Cabinet Vision se convierte en la única fuente técnica de la verdad."
          ]
        }
      ]
    },

    {
      id: "phase-6",
      number: 6,
      title: "Generación de Entregables & Fabricación",
      category: "fabrication",
      leadRole: "Ingeniería / Planta de Producción",
      software: "Cabinet Vision / CNC / Odoo",
      summary: "Extracción automática de planos, listas de corte, código CNC, etiquetas con código de barras y reporte estructurado para Odoo.",
      keyPrinciple: "Todo cambio posterior debe regresar al modelo maestro, revisarse y regenerar todos los entregables. Cero parches aislados.",
      tasks: [
        {
          id: "task-6-1",
          sectionRef: "53 - 54",
          title: "Extracción de Paquete Técnico de Fabricación",
          role: "Ingeniería",
          category: "fabrication",
          isCritical: false,
          isBlocker: false,
          deliverables: [
            "Planos de ensamble y montaje",
            "Diagramas y listas de corte (Nesting)",
            "Programas de mecanizado CNC (.GCODE / .NC)",
            "Etiquetas de piezas con código de barras",
            "Reporte estructurado para Odoo"
          ],
          prerequisites: ["Gate 'GO Fabricación' firmado"],
          description: "Generación de todos los archivos de manufactura desde el modelo único validado en Cabinet Vision.",
          dropdownPoints: [
            "Cadena de Consistencia Inviolable: Modelo ↔ BOM ↔ Plano ↔ Programa CNC ↔ Pieza Física.",
            "Prohibido tener versiones paralelas o planos corregidos a mano con pluma.",
            "Las etiquetas vinculan la pieza física desde el corte hasta el ensamble final e instalación."
          ]
        },
        {
          id: "task-6-2",
          sectionRef: "55 - 57",
          title: "REGLA MAESTRA DE CAMBIOS Y PROTOCOLO DE RETRABAJO",
          role: "Todo el Equipo",
          category: "critical",
          isCritical: true,
          isBlocker: false,
          deliverables: ["Protocolo de Modificación de Modelo Maestro"],
          prerequisites: ["Solicitud de cambio documentada"],
          description: "Regla estricta para gestionar cambios: regresar al origen, actualizar modelo maestro y regenerar entregables.",
          dropdownPoints: [
            "Prohibición Absoluta: Nunca alterar únicamente el CNC o el plano en taller.",
            "Efecto Cascada de Retrabajo: Un cambio de laminado altera espesor → altera geometría → altera barrenado → inutiliza programas.",
            "Costo Real: Un cambio tardío mal gestionado consume entre 1 día y 1 semana completa de retraso en planta."
          ]
        },
        {
          id: "task-6-3",
          sectionRef: "58 - 59",
          title: "Transferencia Automatizada hacia Odoo",
          role: "Ingeniería / Compras",
          category: "procurement",
          isCritical: true,
          isBlocker: false,
          deliverables: ["BOM importada exitosamente en Odoo"],
          prerequisites: ["Reporte estructurado generado desde CV"],
          description: "Importación masiva de la lista de materiales desde Cabinet Vision hacia Odoo sin recaptura manual.",
          dropdownPoints: [
            "Flujo automatizado: Cabinet Vision → Reporte CSV estructurado → Importación masiva Odoo.",
            "Cero errores humanos de transcripción de piezas o herrajes.",
            "Condición estricta: Si un solo material no coincide exactamente en nombre y referencia con Odoo, la importación se detiene."
          ]
        }
      ]
    }
  ],

  blockersList: [
    {
      id: "b1",
      number: 1,
      title: "Falta de Materiales Definitivos",
      phase: "Fase 2 (Compras)",
      cause: "Ausencia del documento definitivo de materiales con costos, espesores y proveedores validados.",
      consequence: "Ingeniería modela con espesores supuestos; al cambiar el material real, se corrompe el ensamble y se pierden días de trabajo.",
      triggerCondition: "Documento base de materiales no emitido o marcado como 'provisional'.",
      action: "DETENCIÓN INMEDIATA. Compras debe cerrar y entregar el documento formal.",
      impactDays: "3 a 5 días de retraso si entra a Ingeniería sin resolver."
    },
    {
      id: "b2",
      number: 2,
      title: "Inconsistencia en Datos Maestros Odoo",
      phase: "Fase 2 (Compras / Odoo)",
      cause: "Materiales sin alta formal en Odoo, discrepancia en nombre corto o duplicidad en referencia interna.",
      consequence: "Falla la importación masiva final de la BOM, bloqueando la compra de insumos y la costura de órdenes.",
      triggerCondition: "Nombre o referencia inexistente en catálogo Odoo.",
      action: "Compras e Ingeniería validan la nomenclatura oficial (convención Mireya/Luis) y confirman registro en Odoo.",
      impactDays: "1 a 2 días administrativos."
    },
    {
      id: "b3",
      number: 3,
      title: "Modelo de Diseño Meramente Volumétrico",
      phase: "Fase 3 (Diseño)",
      cause: "Diseño entrega un volumen estético sin espesores representativos, holguras, zócalos ni propuesta constructiva.",
      consequence: "Ingeniería se sobrecarga teniendo que diseñar desde cero el mueble en lugar de parametrizar y mecanizar.",
      triggerCondition: "Modelo 3D sin despiece conceptual ni solución de remates y zócalos.",
      action: "RECHAZO EN GATE 1. El proyecto retorna a Diseño para resolver el modelo a detalle.",
      impactDays: "2 a 4 días de retrabajo de diseño."
    },
    {
      id: "b4",
      number: 4,
      title: "Falta de Validación contra Levantamiento Real",
      phase: "Fase 3 (Diseño)",
      cause: "El mueble no fue insertado en las medidas reales de obra (desplomes de muros, salidas eléctricas, desniveles).",
      consequence: "El mueble fabricado colisiona en sitio durante la instalación; rechazo por parte del cliente y piezas a la basura.",
      triggerCondition: "Falta de confrontación del 3D contra el levantamiento en obra.",
      action: "NO-GO. Diseño realiza la sustitución e inserción en el levantamiento antes de liberar.",
      impactDays: "5 a 10 días de paro si llega a obra."
    },
    {
      id: "b5",
      number: 5,
      title: "Configuración Incompleta en Cabinet Vision",
      phase: "Fase 4 (Ingeniería)",
      cause: "Intentar crear y modelar el proyecto sin haber configurado previamente listas, cantos (general y 45°), herrajes o métodos.",
      consequence: "Cabinet Vision aplica configuraciones por defecto incorrectas, desvirtuando el despiece paramétrico.",
      triggerCondition: "Ventana de creación formal del proyecto con campos vacíos o 'default'.",
      action: "NO-GO. Se detiene la creación formal y se configuran los componentes faltantes (CV-1 a CV-5).",
      impactDays: "1 a 3 días de reconfiguración."
    },
    {
      id: "b6",
      number: 6,
      title: "Discrepancia en Revisión Técnica (Filtro 2)",
      phase: "Fase 5 (Ingeniería)",
      cause: "El modelo técnico de Cabinet Vision modificó dimensiones, frentes o estética respecto al diseño a detalle autorizado.",
      consequence: "Se fabrica un producto diferente al que el cliente compró comercialmente.",
      triggerCondition: "Incongruencia entre modelo de Ingeniería y modelo de Diseño durante la revisión cruzada.",
      action: "NO-GO A FABRICACIÓN. Se ajusta la solución técnica en CV hasta coincidir con la intención aprobada.",
      impactDays: "1 a 2 días de ajuste en CV."
    }
  ],

  designVsEngineering: {
    coreQuestions: {
      design: "¿Qué producto debemos fabricar y cómo debe resolverse conceptualmente?",
      engineering: "¿Cómo fabricaremos, conectaremos, parametrizaremos, mecanizaremos y documentaremos ese producto?"
    },
    comparisons: [
      {
        aspect: "Geometría & Forma",
        design: "Define dimensiones generales, curvas, estética, proporciones, holguras visuales y relación con el espacio.",
        engineering: "Modela piezas individuales con espesores exactos, radio de fresado CNC, cerchas y despiece estructural."
      },
      {
        aspect: "Materiales y Cantos",
        design: "Selecciona acabados y texturas según especificación aprobada por Compras; define qué cantos llevan vista.",
        engineering: "Configura el material en CV con espesor milimétrico; asigna cubrecanto general o especial de 45° para maquinado."
      },
      {
        aspect: "Ensamble & Conexiones",
        design: "Plantea la propuesta lógica de ensamble: qué módulos son independientes, cuáles son desmontables y secuencia de montaje.",
        engineering: "Aplica la conexión mecánica específica: Minifix, taquetes de madera, barrenos milimétricos, tornillos y herrajes de unión."
      },
      {
        aspect: "Validación de Entorno",
        design: "Filtro 1: Inserta el modelo en el levantamiento real de obra (muros, desniveles, columnas e instalaciones).",
        engineering: "Filtro 2: Comprueba que el despiece técnico respeta rigurosamente el modelo de diseño y levantamiento."
      },
      {
        aspect: "Entregables",
        design: "Modelo 3D a detalle, renders ejecutivos, propuesta constructiva y validación en levantamiento.",
        engineering: "Planos de ensamble, programas de corte (Nesting), código CNC, etiquetas de trazabilidad y BOM Odoo."
      },
      {
        aspect: "Consecuencia de error",
        design: "Si entrega incompleto, satura a Ingeniería y posterga decisiones críticas hasta que el proyecto está atrasado.",
        engineering: "Si no audita contra diseño, fabrica un mueble técnicamente viable pero comercialmente incorrecto."
      }
    ],
    caseStudyCurve: {
      title: "Caso de Estudio: Mueble con Curva Orgánica",
      designRole: "Diseño define la curva exacta en planta, su radio de curvatura, cómo se encuentra con los paños rectos y qué acabado llevará.",
      engineeringRole: "Ingeniería determina las cerchas estructurales necesarias, el espesor del sustrato flexible, el radio de la broca CNC y el laminado adecuado para que no se quiebre en prensa."
    }
  },

  doubleFilterSystem: {
    filter1: {
      name: "FILTRO ANTIERROR 1",
      actors: "Diseño a Detalle ↔ Levantamiento Real",
      question: "¿El producto diseñado funciona realmente dentro del espacio físico de obra?",
      failStatus: "NO-GO (Corregir en Diseño)",
      successStatus: "Aprobado para GATE 1"
    },
    filter2: {
      name: "FILTRO ANTIERROR 2",
      actors: "Modelo de Ingeniería (CV) ↔ Modelo a Detalle (Diseño)",
      question: "¿Lo que estamos a punto de fabricar sigue siendo exactamente lo que Diseño concibió y vendió?",
      failStatus: "NO-GO (Ajustar en Cabinet Vision)",
      successStatus: "GO FABRICACIÓN"
    }
  },

  reworkCalculatorMatrix: [
    {
      stage: "Fase de Compras / Datos Odoo",
      detection: "Detección Temprana (Pre-Ingeniería)",
      costMultiplier: "1x",
      timeDelay: "1 a 2 horas",
      costExplanation: "Corregir el nombre o referencia en Odoo antes de empezar en Cabinet Vision cuesta cero material y minutos de ajuste."
    },
    {
      stage: "Fase de Diseño a Detalle",
      detection: "Filtro 1 (Diseño ↔ Levantamiento)",
      costMultiplier: "3x",
      timeDelay: "2 a 4 horas",
      costExplanation: "Mover una cota o holgura en 3D antes de liberar a Ingeniería evita re-parametrizar gabinetes completos."
    },
    {
      stage: "Fase de Modelado en Cabinet Vision",
      detection: "Etapa CV-6 (Checkpoint de Completitud)",
      costMultiplier: "8x",
      timeDelay: "1 día laboral",
      costExplanation: "Cambiar un espesor durante el modelado exige reconfigurar ensambles, barrenados y relaciones de piezas."
    },
    {
      stage: "Fase de Revisión Técnica Pre-Fabricación",
      detection: "Filtro 2 (Ingeniería ↔ Diseño)",
      costMultiplier: "15x",
      timeDelay: "1 a 2 días",
      costExplanation: "Detectar discrepancia antes del corte obliga a regenerar planos, listas de materiales y programas CNC."
    },
    {
      stage: "Fase de Corte y Maquinado CNC",
      detection: "Detección Tardía en Planta",
      costMultiplier: "50x",
      timeDelay: "3 a 5 días",
      costExplanation: "Tableros cortados con espesor o mecanizado erróneo se convierten en scrap (basura), horas máquina perdidas y reorden de materia prima."
    },
    {
      stage: "Fase de Ensamble o Instalación en Obra",
      detection: "Detección Catastrófica en Sitio",
      costMultiplier: "100x",
      timeDelay: "1 a 2 semanas",
      costExplanation: "Reclamo del cliente, personal varado en obra, desmontaje, fletes dobles, retrabajo total de piezas y daño a la reputación de la empresa."
    }
  ],

  presentationSlides: [
    {
      id: "slide-1",
      title: "Flujo Maestro Bulldog Design",
      subtitle: "De la Venta a la Fabricación de Alta Precisión en Cabinet Vision",
      badge: "Presentación Ejecutiva para el Equipo",
      image: "assets/hero_banner.jpg",
      quote: "La precisión del resultado final depende directamente de la calidad, completitud y estabilidad de la información utilizada desde el inicio.",
      bullets: [
        "Eliminar desde el origen las condiciones que generan errores tardíos.",
        "Cabinet Vision no es solo software 3D: es la columna vertebral de BOM, CNC y fabricación.",
        "Implementación del estándar: Definir → Validar → Liberar → Ejecutar."
      ]
    },
    {
      id: "slide-2",
      title: "El Macroflujo en 6 Fases Clave",
      subtitle: "Una cadena continua de valor técnico y comercial",
      badge: "Arquitectura Operativa",
      image: "assets/pipeline_automation.jpg",
      quote: "Automatizar información incorrecta únicamente permite propagar el error más eficientemente.",
      bullets: [
        "Fase 1: Diseño Volumétrico para Venta (Conceptual)",
        "Fase 2: Compras & Datos Maestros en Odoo (Espesores reales y códigos)",
        "Fase 3: Diseño a Detalle & Filtro 1 con Levantamiento en Obra",
        "Fase 4: Preparación y Parametrización en Cabinet Vision (CV-1 a CV-8)",
        "Fase 5: Ingeniería de Producto & Filtro 2 con Diseño",
        "Fase 6: Liberación Formal (GO Fabricación) y Transferencia Odoo"
      ]
    },
    {
      id: "slide-3",
      title: "Diseño vs Ingeniería: Límites y Responsabilidades",
      subtitle: "Dividir las decisiones en la etapa donde resulta más eficiente resolverlas",
      badge: "Claridad Organizacional",
      image: "assets/design_vs_engineering.jpg",
      quote: "Ingeniería no debe utilizarse como una extensión de Diseño para terminar decisiones abiertas.",
      bullets: [
        "Diseño responde: ¿Qué producto fabricar y cómo resolverlo conceptualmente?",
        "Ingeniería responde: ¿Cómo fabricar, parametrizar, mecanizar y documentar ese producto?",
        "Caso Curva: Diseño define geometría e intención; Ingeniería resuelve cerchas y código CNC.",
        "Transferir diseño incompleto colapsa al equipo de Ingeniería con sobrecarga evitable."
      ]
    },
    {
      id: "slide-4",
      title: "Sistema de Doble Filtro Anti-Error",
      subtitle: "Comprobar el producto antes de que los errores alcancen la maquinaria",
      badge: "Control de Calidad",
      image: "assets/gatekeepers.jpg",
      quote: "Así como no se corta sin plano, no se libera a Ingeniería sin diseño validado en obra.",
      bullets: [
        "FILTRO 1: Diseño a Detalle ↔ Levantamiento Real de Obra (¿Funciona en el espacio físico?)",
        "GATE 1: Diseño Listo para Ingeniería (Materiales en Odoo + Detalle resuelto)",
        "FILTRO 2: Modelo de Ingeniería ↔ Modelo a Detalle de Diseño (¿Respeta lo que se vendió?)",
        "GATE 2: GO FABRICACIÓN (Autorización final para corte, CNC y ensamble)"
      ]
    },
    {
      id: "slide-5",
      title: "Los 6 Bloqueos Maestros (NO-GO)",
      subtitle: "Documentación y requisitos bloqueantes para proteger la operación",
      badge: "Políticas de Contención",
      image: "assets/gatekeepers.jpg",
      quote: "El bloqueo no paraliza al equipo: protege al proyecto específico de incurrir en costos astronómicos.",
      bullets: [
        "NO-GO 1: Falta de materiales definitivos de Compras.",
        "NO-GO 2: Material sin nombre corto o referencia registrada en Odoo.",
        "NO-GO 3: Entrega de modelo puramente volumétrico sin solución constructiva.",
        "NO-GO 4: Falta de sustitución del mueble en el levantamiento real de obra.",
        "NO-GO 5: Configuración incompleta en la creación formal de Cabinet Vision.",
        "NO-GO 6: Discrepancia dimensional o estética en la revisión cruzada de fabricación."
      ]
    },
    {
      id: "slide-6",
      title: "Regla Maestra de Cambios & Conclusión",
      subtitle: "Cero correcciones aisladas en taller: Trazabilidad total",
      badge: "Disciplina Operativa",
      image: "assets/hero_banner.jpg",
      quote: "Todo cambio posterior debe regresar al modelo maestro, revisarse y regenerar todos los entregables.",
      bullets: [
        "Prohibido alterar planos o programas CNC a mano en planta.",
        "Efecto Cascada: Un cambio de laminado no registrado altera espesores y destruye ensambles.",
        "Objetivo final: Construir una biblioteca homologada reutilizable que acelere futuros proyectos."
      ]
    }
  ]
};

// Export to window for standalone browser runtime
if (typeof window !== "undefined") {
  window.WORKFLOW_DATA = WORKFLOW_DATA;
}
