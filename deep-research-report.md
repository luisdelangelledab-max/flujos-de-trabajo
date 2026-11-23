# MASTER DEEP RESEARCH — Workflows visuales y manual vivo de procesos

**Fecha de corte de la investigación: 13 de noviembre de 2026, America/Mexico_City.**

Esta investigación concluye que un manual maestro útil para personas y equipos no debe diseñarse como una colección de SOP, diagramas o capturas independientes. Debe concebirse como un **sistema de conocimiento operacional versionado**, organizado alrededor de lo que una persona necesita **entregar**, capaz de presentar distintas vistas de una misma fuente estructurada: mapa para comprender, guía para ejecutar, checkpoint para liberar, evidencia para demostrar y enlace al siguiente flujo. Esta arquitectura coincide con el enfoque por procesos que ISO mantiene en ISO 9001:2026 y con la orientación de ISO 10013:2021 a crear y mantener únicamente la información documentada necesaria para operar eficazmente, sin imponer una jerarquía documental rígida. citeturn426342search0turn426342search2turn842183search3turn842183search4

La conclusión central es asimismo cognitiva: **ninguna notación única resuelve comprensión, ejecución, diagnóstico y auditoría a la vez**. La evidencia experimental muestra que la complejidad, el conocimiento previo y la representación gráfica afectan la comprensión de modelos de proceso; añadir información semántica indiscriminadamente puede incluso perjudicar la comprensión sintáctica, mientras que el resaltado, las estructuras visuales consistentes y determinados usos de swimlanes pueden reducir esfuerzo cognitivo o mejorar precisión y velocidad. Por ello, la estrategia técnicamente más defensible es la solicitada en el encargo: **detalle progresivo y vistas enlazadas**, no una “lámina maestra” saturada. citeturn855725search0turn855725search1turn855725search2turn855725search3

## Plan de investigación ejecutado, criterios de evidencia y límites

El plan se estructuró desde el uso final hacia atrás. La pregunta de diseño no fue “¿cómo documentamos procesos?”, sino “¿qué debe poder descubrir, comprender, ejecutar, comprobar y transferir una persona que recibe la instrucción ‘Necesito entregar X’?”. A partir de esa pregunta se investigaron cinco capas conectadas: arquitectura de procesos; levantamiento y evidencia; representación y cognición; ejecución detallada incluida interfaz; y gobierno, herramientas y mantenimiento.

La taxonomía investigada incluyó macroproceso, proceso, subproceso, workflow, procedimiento, actividad, tarea, paso, instrucción, decisión, evidencia, checklist, registro, plantilla y entregable. Se contrastó esa taxonomía contra BPMN 2.0.2, ISO 9001:2026, ISO 10013:2021, prácticas Lean/SIPOC/VSM, literatura HCI de comprensión diagramática, documentación técnica de factores humanos y gestión de conocimiento. BPMN 2.0.2 continúa siendo la versión formal publicada de BPMN en el catálogo de OMG y está explícitamente orientada a modelar procesos de negocio, incluidos eventos, excepciones, interacciones y coreografías; no pretende modelar por sí sola estructuras organizacionales, estrategia o modelos de información. citeturn842183search0turn842183search9turn842183search2

La investigación normativa requirió una corrección importante respecto a proyectos documentales que todavía citan ISO 9001:2015 como edición vigente. **ISO 9001:2026 fue publicada el 16 de septiembre de 2026 y sustituyó a ISO 9001:2015**. La edición 2026 conserva el enfoque por procesos, pensamiento basado en riesgos y mejora continua, pero refuerza liderazgo, cultura de calidad, comportamiento ético y la distinción entre riesgos y oportunidades. Las organizaciones certificadas con 2015 tienen una transición prevista hasta septiembre de 2029, según la guía de transición publicada por ISO/TC 176. citeturn426342search1turn426342search2turn426342search7

ISO 10013:2021 sigue publicada al corte de esta investigación y proporciona orientación para desarrollar y mantener información documentada adaptada a las necesidades de la organización. La página de ISO indica que el estándar atravesó revisión sistemática en 2026; por tanto, conviene registrar su edición en cualquier política futura y comprobar nuevamente su estado antes de aprobar el manual maestro. citeturn426342search5turn842183search3

Para accesibilidad se tomó WCAG 2.2 como referencia principal en contenido digital. W3C recomienda utilizar la versión más reciente; WCAG 2.2 continúa como W3C Recommendation y además fue publicada como ISO/IEC 40500:2025. Sus criterios son tecnológicos y comprobables, por lo que son aplicables como referencia para contraste, texto, navegación y alternativas, aunque un manual impreso o una señalización de planta requerirán pruebas adicionales que WCAG por sí sola no cubre. citeturn842183search7turn842183search8

La evidencia científica se priorizó con estudios experimentales de comprensión de diagramas y work instructions. La investigación de Mendling y colaboradores encontró que experiencia, conocimiento teórico y contenido adicional modifican eficiencia y exactitud de comprensión; estudios posteriores han utilizado eye tracking y EEG para evaluar carga y atención en diagramas. La literatura de señalización multimedia también muestra que hacer explícitas correspondencias texto–diagrama dirige antes la atención relevante y puede mejorar el aprendizaje. citeturn855725search0turn855725search3turn855725search6turn855725search7

Como contraevidencia se incluyó que “más visual” no equivale automáticamente a “mejor”: una representación puede añadir carga extrínseca, y combinar instrucciones digitales y documentación tradicional no necesariamente produce una ventaja. En un experimento de manufactura, las instrucciones digitales animadas mejoraron tiempo y defectos frente a dibujos en papel, pero la combinación simultánea de ambos formatos no añadió beneficio. Otro estudio industrial de 2026 obtuvo fuertes mejoras con instrucciones digitales para novatos, pero advierte las limitaciones de tamaño de muestra y del entorno controlado. citeturn716475search7turn716475search8turn716475search6

La **cadena de trazabilidad de esta investigación** es: pregunta de uso → estándar o evidencia → hallazgo → regla de diseño → campo o vista propuesta → prueba de validación. Cada elemento que sigue se etiqueta conceptualmente como **VERIFICADO**, cuando deriva directamente de una fuente o capacidad oficial; **PROPUESTO**, cuando es una especificación derivada de evidencia; o **PENDIENTE**, cuando exige observación en la organización.

## Arquitectura del sistema, jerarquía, navegación y modelo de datos

**VERIFICADO.** ISO 10013 ya no prescribe una jerarquía documental particular y reconoce que los medios digitales permiten organizar información de múltiples formas. ISO 9001:2026 conserva la lógica de procesos interrelacionados y de información documentada necesaria para operar y controlar. Esto abre la puerta a una arquitectura relacional en vez de una carpeta fija “manual → procedimientos → instructivos”. citeturn842183search4turn426342search0turn426342search2

**PROPUESTO.** La jerarquía funcional debería ser ésta:

| Nivel | Objeto | Pregunta que responde | Vista típica | Regla de granularidad |
|---|---|---|---|---|
| 0 | Cadena de valor / macroproceso | ¿Dónde estamos? | mapa general | 5–12 bloques principales |
| 1 | Proceso | ¿Qué resultado produce esta parte del negocio? | SIPOC / mapa | un inicio y un resultado claramente delimitados |
| 2 | Workflow | ¿Cómo se entrega X? | flujo / swimlane / BPMN simplificado | incluye decisiones y handoffs |
| 3 | Actividad o tarea | ¿Qué hace cada actor? | tarjeta / lista | una intención operacional |
| 4 | Paso | ¿Qué hago ahora? | guía secuencial | una acción observable |
| 5 | Interfaz / campo / punto físico | ¿Dónde y con qué dato lo hago? | captura anotada / esquema | referencia verificable a control, dato o ubicación |

La taxonomía debería reservar **proceso** para una capacidad recurrente que transforma entradas en salidas; **workflow** para una instancia o ruta coordinada entre actores y sistemas; **procedimiento** para la descripción autorizada de cómo ejecutar; **tarea** para un bloque asignable; **paso** para una acción verificable; **instrucción** para detalle operativo necesario; **checklist** para memoria externa de ítems críticos; **registro** para evidencia retenida; **plantilla** para estructura reutilizable; y **entregable** para el objeto que un receptor necesita aceptar.

La regla “entregable primero” cambia radicalmente el índice. En lugar de “Ingeniería > procedimientos”, la navegación primaria debe permitir buscar “plano aprobado”, “lista de materiales liberada”, “orden de fabricación”, “puerta liberada a instalación” y desde ahí descubrir quién, cuándo y cómo produce ese objeto.

El índice debería implementar relaciones muchos-a-muchos, porque una misma pantalla puede participar en múltiples workflows, una misma plantilla puede usarse en diferentes entregables y un workflow puede pertenecer a varias áreas. La arquitectura propuesta es:

**buscador o índice → ficha rápida del entregable → mapa del workflow → tareas/pasos → guía por interfaz → checkpoint → evidencia → handoff → siguiente workflow.**

Esta lógica de “capas” está alineada con progressive disclosure: exponer primero la información primaria y relegar información avanzada a vistas de detalle reduce complejidad y puede mejorar aprendizaje y tasa de errores. citeturn107297search13turn107297search14

El modelo relacional mínimo propuesto es:

| Entidad | ID estable propuesto | Relaciones mínimas |
|---|---|---|
| Macroproceso | `MP-###` | contiene procesos |
| Proceso | `PR-AREA-###` | pertenece a macroproceso; contiene workflows |
| Workflow | `WF-AREA-####` | proceso, entregable, roles, sistemas, variantes |
| Paso | `ST-WF-###` | workflow, rol, transición, pantalla, evidencia |
| Transición | `TR-WF-###` | origen, condición, destino |
| Rol | `RL-###` | workflows, pasos, responsabilidades |
| Sistema | `SYS-###` | pantallas, workflows |
| Pantalla / ubicación | `UI-SYS-####` | versión, roles, pasos |
| Campo / control | `FD-UI-###` | pantalla, formato, origen, validación |
| Insumo | `IN-###` | productor, consumidor, versión |
| Salida / entregable | `OUT-###` | workflow productor, receptor, aceptación |
| Evidencia | `EV-###` | paso, control, retención |
| Excepción | `EX-WF-###` | disparador, recuperación, escalamiento |
| Versión documental | `VER-OBJ-###` | objeto, autor, fecha, estado |
| Fuente de evidencia | `SRC-###` | entrevista, observación, sistema, archivo |

El ID no debe codificar información volátil como nombre de persona, software o departamento completo. El código estable identifica; los metadatos describen. Esta separación es particularmente importante cuando existen cambios organizacionales.

El “contrato del workflow” debe convertirse en registro estructurado. Los campos **obligatorios** propuestos para todo flujo son: ID; nombre en forma verbo + entregable; objetivo; entregable final; propietario; versión; estado; trigger; entradas; prerrequisitos; actores; sistemas o ubicaciones; pasos; decisiones; salidas; receptor; aceptación; evidencia; excepciones críticas y Definition of Done. Los campos condicionales por riesgo son permisos, segregación de funciones, tolerancias, firmas, retención, seguridad, requisitos normativos, recuperación ante fallo y dependencias de versión.

Cada paso debe responder: **quién → dónde → qué hace → sobre qué objeto → qué obtiene → cómo sabe que está bien → qué evidencia deja → qué hace si no funciona**. Este patrón resulta consistente con la documentación técnica de FAA, que exige para análisis de tareas elementos como secuencia, herramientas, ayudas, tiempo, personal, peligros y condiciones humanas relevantes. citeturn716475search14

Para evitar una duplicación masiva, nombre del workflow, dueño, versión, sistema y entregable no deben copiarse manualmente a cada guía. La regla es **datos una vez, vistas múltiples**. Markdown con metadatos YAML, una base relacional o una plataforma de contenido estructurado permiten este enfoque; GitHub, por ejemplo, utiliza Markdown, metadatos y contenido reutilizable, y su propia documentación versiona contenido con metadatos YAML y reglas de versión. citeturn638254search20turn638254search30turn638254search42

## Levantamiento AS-IS/TO-BE, matriz de evidencia y contrato verificable

El error metodológico más peligroso sería entrevistar a un experto, dibujar lo que dice y publicarlo como “AS-IS”. El levantamiento debe separar tres verdades:

| Estado | Significado | Fuente principal | Riesgo |
|---|---|---|---|
| Observado | lo que alguien hizo realmente | shadowing, walkthrough, registro del sistema | puede no ser práctica normal |
| Declarado | lo que alguien dice que se hace | entrevista, taller, procedimiento existente | memoria o práctica idealizada |
| Prescrito | lo que un documento autorizado establece | procedimiento, norma, configuración | puede estar desactualizado |
| Propuesto TO-BE | lo que se desea adoptar | diseño aprobado | todavía no es operación |
| Pendiente | no existe evidencia suficiente | discrepancia abierta | no debe publicarse como hecho |

La investigación de factores humanos de FAA es particularmente útil aquí: sus trabajos reportan que documentación técnica confusa, incompleta, inconsistente o inexacta contribuye al incumplimiento y recomiendan validación con usuarios, pruebas de usabilidad, retroalimentación y revisiones centradas en quien ejecuta. citeturn716475search12turn716475search10

**PROPUESTO.** El levantamiento inicial debe inventariar área, entregables, roles, sistemas, ubicaciones, clientes internos, incidencias, retrabajos y flujos. La priorización no debe ser por facilidad de documentar, sino mediante una puntuación de **frecuencia × consecuencia de error × retrabajo × dependencia de conocimiento tácito × número de handoffs**.

La matriz de evidencia recomendada es:

| ID afirmación | Hallazgo | Tipo | Fuente | Fecha | Versión observada | Corroboración | Discrepancia | Estado |
|---|---|---|---|---|---|---|---|---|
| E-001 | “Ingeniería libera LdM antes de OF” | declarado | entrevista Ing. | fecha | — | pendiente | Compras afirma excepción | pendiente |
| E-002 | ruta Odoo para BoM | documental | Odoo Docs | 2026 | 19.0 | captura local pendiente | posible personalización | verificado externo |
| E-003 | QC puede vincularse a MO | documental | Odoo | 2026 | 19.0 | sí | — | verificado externo |

Los walkthroughs deben solicitar que el experto **realice una operación real o segura de demostración** mientras el analista pregunta por excepciones, permisos, entradas, señales de éxito y recuperación. Capturar sólo el “happy path” produce manuales que fallan precisamente cuando más se necesitan.

El protocolo AS-IS/TO-BE recomendado tiene cuatro puertas. Primera: **descubrimiento**, en la que se captura sin corregir. Segunda: **reconciliación**, donde se exponen discrepancias entre áreas. Tercera: **validación**, donde un ejecutor distinto reproduce el flujo. Cuarta: **diseño TO-BE**, separado visual y documentalmente hasta su aprobación.

SIPOC es conveniente antes del mapeo detallado porque delimita proveedores, entradas, proceso, salidas y clientes; ASQ lo describe justamente como una herramienta de recolección que suele utilizarse antes del process mapping. citeturn196440search36turn196440search37

VSM es apropiado cuando el objetivo es diagnosticar flujo de material e información, tiempos y desperdicio; Lean Enterprise Institute lo sitúa especialmente en análisis de cadena de valor y distingue mapa de estado actual y futuro. No es sustituto de una guía operacional por pantalla. citeturn196440search8turn196440search27turn196440search28

La condición de saturación recomendada no es “N entrevistas”: se alcanza cuando nuevos walkthroughs ya no descubren nuevos actores, decisiones, excepciones, sistemas, evidencias o discrepancias materiales para el alcance elegido. Los flujos de alto riesgo requieren corroboración más fuerte que los administrativos simples.

## Sistema gráfico, notaciones, legibilidad y seis plantillas maestras

La evidencia HCI aconseja no sobrecargar una vista. Un estudio de comprensión de modelos encontró que información semántica adicional podía entorpecer la comprensión sintáctica; otros experimentos muestran beneficios del resaltado y del layout estructurado. La señalización visual mejora además la integración entre texto y diagramas cuando destaca correspondencias relevantes. citeturn855725search0turn855725search2turn855725search3turn855725search6

Por ello, el sistema gráfico debería ser consistente y deliberadamente pequeño. **PROPUESTO:** reservar forma para semántica y color sólo como refuerzo, nunca como único canal.

| Componente | Forma/representación recomendada | Regla |
|---|---|---|
| Acción | rectángulo | verbo + objeto |
| Decisión | rombo | pregunta cerrada o criterio |
| Documento/dato | hoja o icono etiquetado | especificar versión |
| Pantalla | marco de ventana | enlazar ficha UI |
| Espera | reloj | indicar evento de salida |
| Control | escudo/check | criterio explícito |
| Error/excepción | marcador de alerta | enlazar recuperación |
| Aprobación | sello/check con rol | separar revisar y aprobar |
| Handoff | flecha gruesa + objeto | incluir emisor/receptor |
| Evidencia | clip/registro | especificar dónde se conserva |

WCAG 2.2 exige que el contenido accesible no dependa exclusivamente de color y mantiene criterios comprobables para contraste, navegación y presentación. Por tanto, las vistas digitales deberían añadir etiquetas, patrones, formas y texto además del color. citeturn842183search8turn842183search7

Los principios de jerarquía, contraste, agrupación y región común de Gestalt respaldan visualmente la separación de fases, roles y checkpoints. NN/g resume escala, jerarquía visual, balance, contraste y Gestalt como principios de diseño visual que influyen en usabilidad. citeturn107297search2turn107297search20

La matriz de notaciones recomendada es:

| Propósito | Notación preferente | Fortalezas | Limitación | Detalle |
|---|---|---|---|---|
| Delimitar proceso | SIPOC | entradas/salidas/clientes | poca secuencia | bajo |
| Comprender flujo simple | flujograma | familiar | roles pobres | medio |
| Handoffs | swimlane | responsabilidad visible | puede crecer demasiado | medio |
| Proceso formal/condicional | BPMN | eventos, gateways, excepciones | curva de aprendizaje | medio/alto |
| Diagnóstico Lean | VSM | tiempos, inventario, flujo info/material | no ejecución detallada | medio |
| Servicio extremo a extremo | service blueprint | frontstage/backstage/evidencia | no sustituto SOP | medio |
| Experiencia de actor | journey | perspectiva de usuario | proceso interno incompleto | medio |
| Reglas | DMN / tabla decisión | lógica precisa | no secuencia | alto lógica |
| Estados | state diagram | transiciones | no muestra operación completa | medio |
| Interfaz | mapa UI | navegación | depende de versión | alto |
| Microaprendizaje | one-point lesson | aprendizaje rápido | alcance pequeño | alto local |

BPMN puede representar eventos, paralelismo, transacciones, errores y compensación, mientras que DMN está dedicado a especificar decisiones y reglas de negocio. Al corte de esta investigación, BPMN 2.0.2 sigue como versión formal y DMN 1.6 fue publicada formalmente en septiembre de 2026; DMN 1.7 se encontraba en beta. citeturn842183search9turn196440search0turn196440search4

Un service blueprint es útil cuando el proceso combina acciones visibles, backstage, soporte y evidencia asociada a una experiencia; NN/g lo define precisamente como una relación entre personas, elementos físicos/digitales y procesos conectados con touchpoints. citeturn107297search3turn107297search4

Las seis plantillas maestras propuestas son:

| Plantilla | Objetivo | Campos propios | Datos heredados |
|---|---|---|---|
| A — Ficha rápida | orientar en <1 min | objetivo, trigger, salida, dueño, duración esperada, enlace mapa | ID, versión, estado |
| B — Mapa por roles | comprender responsabilidades | pasos, swimlanes, decisiones, handoffs | roles, sistemas, entregable |
| C — Guía por pantalla | ejecutar | estado previo, ruta, captura, acción, dato, resultado, error | versión software, rol |
| D — Checkpoint/liberación | cerrar | criterios, evidencia, revisor, aprobación, destino | entregable, versión |
| E — Excepción/recuperación | volver a estado seguro | síntoma, condición, causa posible, acción, escalamiento | workflow, paso |
| F — Handoff | transferir objeto | objeto, versión, formato, emisor, receptor, canal, SLA/plazo, aceptación, devolución | workflow, roles |

Un ejemplo **FICTICIO** de ficha rápida sería: `WF-ENG-0042 — Liberar lista de materiales para fabricación`; trigger: planos aprobados; salida: LdM liberada; responsable: Ingeniería; receptor: Compras/Producción; Definition of Done: versión identificada, revisión completada, evidencia almacenada y receptor confirmado. Este ejemplo no representa el proceso real de Zapata.

Un ejemplo **FICTICIO** de swimlane sería:

`Diseño → entrega planos_rev.B → Ingeniería → valida/despieza → [¿cumple?] → sí: libera LdM → Compras / no: devuelve con observación → Diseño`.

La forma es ilustrativa; la secuencia empresarial real queda **PENDIENTE**.

## Estándar de pantallas, rutas, capturas, búsqueda y evidencia operacional

La guía por pantalla es crítica porque una instrucción “abre el módulo y crea el registro” es insuficiente cuando existen permisos, personalizaciones, idiomas, filtros o cambios de versión.

El registro mínimo de una interfaz debe contener: sistema; edición/versión; idioma; organización/tenant; rol observado; fecha; dispositivo; estado previo; ruta textual; objeto abierto; filtros activos; campos; origen del dato; validación; resultado esperado; error conocido; alternativa sin GUI; captura; información redactada; fuente de verificación y próxima revisión.

**Regla fundamental:** una ruta sólo se etiqueta **VERIFICADA** si alguien la reprodujo en el contexto aplicable o si está citada como referencia externa oficial y se declara explícitamente que aún necesita validación local.

Por ejemplo, la documentación oficial de Odoo 19.0 indica la ruta de referencia **Manufacturing → Products → Bills of Materials** para crear una BoM, y documenta que una BoM puede incluir componentes y operaciones. También documenta Quality Checks vinculados a manufacturing orders y work orders. Esto puede usarse como **referencia externa verificada para Odoo 19.0**, pero no prueba que el tenant de Zapata tenga los mismos permisos, módulos, idioma, configuración o personalización. citeturn698198search0turn698198search2

Una ficha de ejemplo, por tanto, puede escribirse así:

| Campo | Ejemplo |
|---|---|
| Estado | VERIFICADO externamente; validación local pendiente |
| Sistema | Odoo |
| Versión fuente | 19.0 |
| Objetivo | abrir listado de BoM |
| Ruta oficial | Manufacturing → Products → Bills of Materials |
| Fuente | documentación oficial Odoo 19.0 |
| Permiso local | PENDIENTE |
| Captura Zapata | PENDIENTE |
| Personalización | PENDIENTE |
| Riesgo | no asumir equivalencia entre documentación oficial y tenant |

La política de captura recomendada exige conservar contexto suficiente para reubicar el elemento. El recorte debe mostrar el control relevante y suficiente entorno; las anotaciones nunca deben tapar etiquetas; datos personales, credenciales y secretos deben redactarse; nombre de archivo debería incluir `sistema_pantalla_version_fecha_idPaso`; y toda captura debería llevar “versión observada” y “fecha de comprobación”. Una captura sin versión de software es evidencia débil.

Cuando no existe GUI —terminal, máquina, operación física, estación CNC— la misma plantilla cambia `pantalla/campo` por `equipo/estado/control/indicador/posición`. Documentar “clic” y documentar “girar selector a posición X” son variantes del mismo concepto: **interacción con un control observable**.

La captura no debe ser la fuente única de una instrucción. Debe acompañarse por descripción textual y nombre del control para resistir pequeños cambios visuales y permitir accesibilidad.

La navegación del repositorio debe admitir búsqueda por entregable, sinónimo, rol, área, sistema, fase, proyecto y estado. Para detectar degradación documental conviene ejecutar controles automatizables de enlaces rotos, IDs duplicados, objetos huérfanos, referencias a versiones obsoletas y capturas que excedan su fecha de revisión.

Markdown y repositorios versionados tienen ventajas importantes para este patrón porque el contenido plano es diferenciable y versionable; Git representa cada cambio mediante commits y conserva historial, mientras Mermaid permite mantener algunos diagramas como texto, facilitando revisión por diff. citeturn638254search4turn638254search2

## Roles, handoffs, riesgos, gobierno y control de cambios

Un RACI de alto nivel no basta si la responsabilidad crítica cambia paso a paso. La especificación debería distinguir al menos **ejecuta, revisa, aprueba, libera, recibe y suple**. “Revisado”, “aprobado” y “liberado” son estados distintos; el manual no debe convertirlos en sinónimos.

Un handoff trazable debe registrar objeto, ID, versión, formato, productor, receptor previsto, fecha/hora, canal, criterio de aceptación, resultado de recepción y devolución si aplica. El objeto “enviado” todavía puede no estar “recibido”; “recibido” no implica “revisado”; y “revisado” no implica “aprobado”.

La matriz de riesgos propuesta utiliza probabilidad, severidad, detectabilidad y exposición/volumen únicamente cuando tenga sentido para el proceso. Lo esencial es asociar cada riesgo a controles concretos: preventivo, detectivo o correctivo.

Ejemplo:

| Riesgo | Preventivo | Detectivo | Correctivo |
|---|---|---|---|
| fabricar con LdM obsoleta | versión bloqueada al liberar | comparación en checkpoint | detener OF y gestionar NCR/cambio |
| comprar material incorrecto | campo obligatorio y catálogo | revisión por Compras | devolución / sustitución |
| omitir control de calidad | checkpoint obligatorio | reporte de checks faltantes | reinspección |
| captura de manual desactualizada | evento de revisión por versión | auditoría visual | actualizar ficha y republicar |

La gobernanza propuesta debe implementar el estado documental solicitado: **propuesto → levantado → borrador → validado → aprobado → publicado → obsoleto**. “Levantado” indica que existe evidencia de operación; no significa que ya sea correcto o autorizado.

Cada cambio debe registrar quién, cuándo, por qué, qué objetos afecta y si altera capacitación, pantalla, permisos, riesgo, checklist o evidencia. ISO 10013 enfatiza desarrollo y mantenimiento de información documentada; ISO 9001:2026 mantiene evaluación, evidencia, mejora y control operacional como elementos centrales. citeturn842183search3turn426342search0turn426342search8

El disparador de revisión no debería ser sólo calendario. También debe existir revisión por evento: cambio de software; cambio de producto; incidente; no conformidad; cambio de propietario; cambio regulatorio; error de instrucción; cambio de layout; modificación de permisos; o feedback repetido.

La investigación FAA apoya este enfoque de retroalimentación operacional: recomienda mecanismos para que técnicos reporten problemas de documentación, que escritores respondan y que existan bases de datos de errores y acciones tomadas. citeturn716475search12

## Herramientas actuales, matriz ponderada, costos y pruebas de adopción

No existe una herramienta dominante en todas las dimensiones. El repositorio maestro necesita buscar, versionar, relacionar y gobernar; la herramienta de diagramación necesita representar; y la herramienta de captura necesita acelerar el levantamiento. Intentar que una sola plataforma cubra las tres funciones suele crear lock-in o degradar alguna capacidad.

Los precios siguientes son precios públicos observados al corte, en USD y sin impuestos salvo indicación del proveedor. Microsoft publica Visio Plan 1 en USD 5 usuario/mes anual y Plan 2 en USD 15; Miro Starter en USD 8/miembro/mes anual; Figma Professional en USD 16 para full seat y USD 3 para Collab seat; Lucidchart Individual en USD 9/mes; Notion Plus en USD 10/miembro/mes; SharePoint Plan 1 en USD 5/usuario/mes anual; Google Workspace Business Starter en USD 7/usuario/mes anual después de promociones; Confluence Standard mostraba USD 5.42/usuario/mes; draw.io ofrece aplicación web y desktop gratuita y almacenamiento controlado por el usuario; Mermaid sigue publicado como proyecto open source con licencia MIT. citeturn419377search3turn993328search0turn207074search3turn207074search4turn993328search5turn578731search1turn578731search0turn578731search2turn419377search7turn638254search0

Scribe, como capturador de pasos, documenta captura web/desktop, redacción, anotación y exportación PDF/Word en Pro. Su documentación de facturación mostraba Pro Personal a USD 35 por usuario/mes y Pro Team a USD 85/mes hasta cinco usuarios, más USD 17 por usuario adicional en el ejemplo de facturación consultado. citeturn207074search1turn207074search2

La matriz ponderada siguiente es **PROPUESTA**, no una certificación independiente de los productos. Pesos: trazabilidad/versionado 18%; búsqueda/índice 14%; colaboración 12%; capacidad visual 12%; portabilidad 12%; offline/continuidad 8%; privacidad/admin 10%; accesibilidad 6%; TCO 8%. La escala es 1–5.

| Herramienta / enfoque | Puntaje /5 | Mejor uso | Debilidad principal |
|---|---:|---|---|
| Mermaid + Git | **4.38** | diagramas versionables/docs-as-code | menos amigable para autores no técnicos |
| Markdown/docs-as-code | **4.32** | fuente maestra estructurada | onboarding/editorial |
| Confluence | **4.18** | repositorio colaborativo | dependencia plataforma / offline |
| SharePoint | **4.08** | gobierno Microsoft, permisos y búsqueda | complejidad administrativa |
| Google Workspace | **3.86** | colaboración documental | modelo relacional limitado |
| Figma/FigJam | **3.80** | sistema visual y mapas | no debería ser repositorio de verdad |
| Lucidchart | **3.80** | diagramación colaborativa | costo/licenciamiento y repositorio externo |
| Visio | **3.78** | BPMN y entorno Microsoft | colaboración/repositorio dependen de M365 |
| Notion | **3.74** | wiki+base fácil de adoptar | control técnico/versionado menor que Git |
| draw.io | **3.56** | diagramación portable/offline | búsqueda de conocimiento débil |
| Miro | **3.50** | talleres y descubrimiento | mantener documentación final a escala |
| Scribe | **3.18** | captura inicial de pasos | costo y riesgo de capturar demasiado detalle |

draw.io destaca por operación offline, archivos locales, exportación SVG/PNG/PDF e integraciones con Drive, OneDrive, SharePoint, GitHub y otros repositorios; su propia documentación señala que el usuario elige dónde almacenar los diagramas. citeturn419377search0turn419377search1turn419377search7

Visio Plan 2 ofrece aplicación de escritorio, soporte BPMN 2.0, archivo local y diagramación avanzada; Visio en Microsoft 365 y Plan 1 ofrecen colaboración web más ligera. citeturn419377search4

Miro favorece sesiones de descubrimiento y colaboración visual; su plan Starter incluye boards ilimitados, visitor editing y exportación de alta resolución, pero su fortaleza no lo convierte automáticamente en repositorio documental controlado. citeturn993328search0

Figma/FigJam proporciona diagramación, tablas, votación, sesiones colaborativas y un sistema de assets; FigJam está incluido en los distintos tipos de seats y la estructura de precios cambió sustancialmente con el esquema de seats, razón por la que cualquier presupuesto futuro debe verificarse de nuevo antes de compra. citeturn207074search3turn993328search2

Confluence incluye páginas, espacios, bases, templates, búsqueda y permisos según plan; SharePoint ofrece bibliotecas con versionado, control de acceso y búsqueda; Notion ofrece bases, propiedades y páginas verificadas en sus niveles superiores. Esas capacidades los vuelven mejores candidatos para **índice y conocimiento** que una herramienta puramente gráfica. citeturn578731search2turn578731search1turn993328search5

Para un sistema que quiera evitar rediseño, la arquitectura más robusta sería **separar fuente de verdad de vistas**. Una organización no técnica puede usar SharePoint o Confluence como fuente operativa; una organización con capacidad técnica podría usar Markdown/YAML + Git. En ambos casos, draw.io, Visio, Lucidchart, FigJam o Mermaid deben tratarse como renderizadores o editores de vistas, no como la única base de conocimiento.

Las pruebas de adopción deben medir ejecución real, no satisfacción. Los experimentos con instrucciones digitales muestran que novatos pueden reducir tiempo, errores y solicitudes de ayuda cuando la presentación es adecuada, pero el efecto depende del contexto y de la calidad de las instrucciones. citeturn716475search6turn716475search7

**Umbrales iniciales propuestos**, que deberán ajustarse con línea base: tasa de éxito de novato ≥90% en flujos críticos no peligrosos; 100% de checkpoints críticos encontrados; cero pasos cuya interpretación requiera adivinar sistema/rol/estado; ≥95% de enlaces internos válidos; 100% de capturas con versión/fecha; 100% de entregables con Definition of Done; y reducción continua de preguntas repetidas y retrabajo. Son objetivos de diseño, no requisitos ISO.

El checklist de publicación debe verificar propietario, estado, versión, fuente, reconciliación AS-IS, prueba por ejecutor distinto, accesibilidad, rutas de interfaz, excepciones, evidencia, enlaces, destino del entregable, siguiente flujo y fecha/evento de revisión.

## Piloto Zapata, plan gradual, backlog, ejemplos y auditoría de recomendaciones

La secuencia descrita por el usuario para puertas de lavado debe permanecer explícitamente como **HIPÓTESIS**:

`solicitud → planos → ingeniería/despiece/LdM → revisión → Odoo/compras/OF → fabricación → calidad → instalación`.

No se encontró evidencia pública que permita afirmar que ésta sea la secuencia real de Zapata, ni que sus configuraciones de Odoo o Cabinet Vision sigan una ruta concreta. Eso queda **PENDIENTE de levantamiento interno**.

Sí puede verificarse que Odoo 19 soporta Bills of Materials, manufacturing orders, work orders y quality checks; Odoo documenta además que las BoM pueden contener operaciones e instrucciones, y que controles de calidad pueden asociarse a manufacturing orders e inventory operations. citeturn698198search0turn698198search1turn698198search2

También está **VERIFICADO externamente** que Cabinet Vision se posiciona como sistema CAD/CAM design-to-manufacture y puede generar cut lists, bills of materials, shop drawings y salidas CNC; Hexagon documenta además módulos de optimización, reporting y seguimiento de revisiones. Eso hace técnicamente plausible un handoff entre diseño/ingeniería y manufactura, pero no establece cómo Zapata lo implementa. citeturn698198search3turn698198search4turn698198search5

El piloto debería limitarse inicialmente a un entregable de alto valor y recorrerlo extremo a extremo, preferentemente uno que atraviese varios handoffs pero no paralice producción. El objeto de prueba puede ser “entregar una puerta de lavado liberada a fabricación” o equivalente, únicamente después de que la organización confirme cuál es el entregable real.

Los escenarios mínimos del piloto deben cubrir camino normal; plano o especificación incompleta; devolución de Ingeniería a Diseño; falta de componente; cambio de revisión; error de permisos; rechazo en calidad; liberación y recepción por el siguiente rol.

El backlog propuesto se prioriza por `impacto × riesgo × reuso ÷ esfuerzo`. La secuencia gradual recomendada es:

1. catálogo de entregables y actores;
2. cinco a diez workflows críticos;
3. contrato de datos e IDs;
4. seis plantillas;
5. levantamiento AS-IS observado;
6. guías de interfaz de los pasos críticos;
7. checkpoints/handoffs;
8. pruebas con novatos;
9. repositorio e índice;
10. control de cambios y auditorías;
11. escalamiento por familias de procesos;
12. sólo entonces evaluar automatización o validadores.

La automatización futura debe derivarse del modelo, no definirlo. BPMN formaliza semántica de procesos y puede facilitar interoperabilidad, pero OMG especifica expresamente que BPMN tampoco pretende cubrir estrategia, estructuras organizativas o modelos de datos completos. citeturn842183search9

La auditoría final del sistema debería verificar coherencia de todas las vistas: si una ficha dice versión B, el mapa, checkpoint, captura y handoff no pueden referir versión A. La fuente maestra debe permitir detectar divergencias antes de publicar.

La matriz final recomendación → evidencia → certeza queda así:

| Recomendación | Fuente principal | Vigencia | Certeza | Decisión |
|---|---|---|---|---|
| organizar por proceso y evidencia, no por documentos aislados | ISO 9001:2026 | 2026 | alta | adoptar |
| información documentada adaptada a necesidad, sin jerarquía rígida | ISO 10013:2021 | revisión 2026 | alta | adoptar |
| vistas progresivas en lugar de una lámina saturada | HCI + progressive disclosure | estudios múltiples | alta | adoptar |
| usar BPMN para flujo formal, no para todo | OMG BPMN 2.0.2 | vigente | alta | adoptar |
| usar DMN para decisiones complejas | OMG DMN 1.6 | sep. 2026 | alta | condicional |
| usar SIPOC antes de detalle | ASQ | vigente | media-alta | adoptar |
| usar VSM para diagnóstico, no SOP | Lean Enterprise Institute | vigente | alta | adoptar |
| separar observado/declarado/propuesto | factores humanos + método | vigente | alta | adoptar |
| probar documentos con usuarios | FAA + estudios HCI | evidencia amplia | alta | obligatorio |
| registrar versión de software en guías | síntesis de mantenibilidad | — | alta | obligatorio |
| color nunca como única señal | WCAG 2.2 | vigente | alta | obligatorio digital |
| fuente maestra estructurada y vistas generables | Git/Markdown + arquitectura propuesta | vigente | media-alta | adoptar |
| herramienta única para todo | evidencia comparativa | — | baja conveniencia | rechazar |
| secuencia Zapata suministrada | hipótesis del caso | no validada | baja | pendiente |
| rutas Zapata de Odoo/Cabinet Vision | documentación pública sólo confirma capacidades | 2026 | baja local | levantar in situ |

La bibliografía primaria y técnica de mayor peso utilizada comprende OMG **BPMN 2.0.2** y **DMN 1.6**; ISO **9001:2026**, **10013:2021** e **ISO 30401:2018** —esta última ya tiene un proyecto de revisión en curso—; W3C **WCAG 2.2**; ASQ para SIPOC; Lean Enterprise Institute para VSM; documentación de factores humanos de FAA; estudios experimentales de comprensión de modelos y señalización multimedia; estudios recientes sobre digital work instructions; y documentación oficial de Odoo, Hexagon Cabinet Vision, Microsoft, Google, Atlassian, Notion, Miro, Figma, Lucid, draw.io, Mermaid y Scribe. ISO 30401:2018 sigue publicada, aunque ISO muestra en 2026 un DIS de nueva edición, por lo que cualquier referencia de gestión del conocimiento deberá revisarse antes de convertirla en requisito corporativo. citeturn196440search7turn196440search6

El resultado de la investigación es, por tanto, una especificación conceptual estable: **el manual maestro no debe ser un documento sino un sistema de objetos relacionados y versionados, con el entregable como puerta de entrada y una fuente única capaz de producir mapa, guía, checkpoint, evidencia y handoff**. La arquitectura debe admitir workflows físicos, digitales e híbridos; tolerar versiones y variantes; exponer detalle sólo cuando se necesita; conservar evidencia de dónde salió cada instrucción; y obligar a que toda afirmación de pantalla, secuencia o responsabilidad pase de **PENDIENTE → VERIFICADO** antes de publicarse como operación vigente. Esta solución satisface el objetivo de crecimiento incremental sin exigir rediseñar el sistema cada vez que se agregue un proceso, y mantiene separadas documentación, ejecución y automatización.