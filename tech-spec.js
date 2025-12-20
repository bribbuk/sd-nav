(() => {
  "use strict";

  /*
    TECH SPEC DIAGRAM TOOL
    PATCH A — initial functional version

    Responsibilities:
    - Load external SVG (sd-diagram.svg)
    - Provide INSPECT dropdown behaviour
    - Draw a hover highlight box over SVG
    - Display concise readout text
  */

  // ---- DOM HOOKS -------------------------------------------------------------

  const select  = document.getElementById("inspect-select");
  const readout = document.getElementById("diagram-readout");
  const object  = document.getElementById("sd-diagram");

  // Bail safely if this tool is not present on the page
  if (!select || !readout || !object) return;

  // ---- DATA MODEL ------------------------------------------------------------

  // Coordinates are in SVG viewBox space
  const INSPECT_DATA = {
    "a": {
      label: "A",
      text: "Primary flux containment envelope during initial spool-up.",
      box: { x: 820, y: 520, w: 220, h: 140 }
    },
    "b": {
      label: "B",
      text: "Temporal shear gradient along the drive spine.",
      box: { x: 1080, y: 620, w: 260, h: 160 }
    },
    "c.i": {
      label: "C.I",
      text: "Forward field inversion threshold.",
      box: { x: 1420, y: 480, w: 240, h: 130 }
    },
    "c.ii": {
      label: "C.II",
      text: "Spatial velocity rotation phase.",
      box: { x: 1500, y: 720, w: 260, h: 150 }
    },
    "c.iii": {
      label: "C.III",
      text: "Residual temporal drag dissipation.",
      box: { x: 1260, y: 860, w: 280, h: 160 }
    },
    "c.iv": {
      label: "C.IV",
      text: "Field collapse and cruise-state stabilisation.",
      box: { x: 980, y: 900, w: 260, h: 150 }
    }
  };

  // ---- STATE -----------------------------------------------------------------

  let svgRoot     = null;
  let highlight   = null;
  let svgLoaded   = false;

  // ---- SVG INITIALISATION ----------------------------------------------------

  object.addEventListener("load", () => {
    svgRoot = object.contentDocument?.querySelector("svg");
    if (!svgRoot) return;

    // Create highlight rectangle (SVG-native)
    highlight = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );

    highlight.setAttribute("fill", "none");
    highlight.setAttribute("stroke", "#ffcc00");
    highlight.setAttribute("stroke-width", "2");
    highlight.setAttribute("stroke-dasharray", "6 4");
    highlight.setAttribute("vector-effect", "non-scaling-stroke");
    highlight.style.pointerEvents = "none";
    highlight.style.opacity = "0";

    svgRoot.appendChild(highlight);

    svgLoaded = true;
  });

  // ---- UI BEHAVIOUR -----------------------------------------------------------

  select.addEventListener("change", () => {
    if (!svgLoaded || !highlight) return;

    const key = select.value;
    const entry = INSPECT_DATA[key];

    // Clear state
    if (!entry) {
      highlight.style.opacity = "0";
      readout.textContent = "";
      return;
    }

    // Position highlight
    highlight.setAttribute("x", entry.box.x);
    highlight.setAttribute("y", entry.box.y);
    highlight.setAttribute("width", entry.box.w);
    highlight.setAttribute("height", entry.box.h);
    highlight.style.opacity = "1";

    // Update readout
    readout.textContent = `${entry.label} — ${entry.text}`;
  });

})();
