(() => {
  "use strict";

  /* ============================================================================
     TECH SPEC DIAGRAM INSTRUMENT
     Single-file, self-contained implementation
     ========================================================================== */

  /* ---------------------------------------------------------------------------
     1. CONFIGURATION
     ------------------------------------------------------------------------- */

  const SVG_PATH = "sd-diagram.svg";

  const INSPECT_DATA = {
    "a": {
      label: "a",
      text: "Direct Sling Field; Extreme Energy Density <br><br>! Decreased M-T Vector (-vt) <br>∴ Decreased relative mass <br>∴ Inflated spacetime <br>∴ Efficient acceleration",
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

  /* ---------------------------------------------------------------------------
     2. STYLE INJECTION (NO DEPENDENCIES)
     ------------------------------------------------------------------------- */

  const style = document.createElement("style");
  style.textContent = `
    .tech-spec-frame {
      margin: 40px 0;
      padding: 12px;
      background: transparent;
      border: 1px solid rgba(255,204,0,0.35);
      font-family: monospace;
      color: #ffcc00;
      filter:
        drop-shadow(0 0 1.5px rgba(235,250,122,0.22))
        drop-shadow(0 0 4px rgba(255,204,0,0.14))
        drop-shadow(0 0 10px rgba(255,204,0,0.06));
      position: relative;
    }

    .tech-spec-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.85em;
      margin-bottom: 8px;
    }

    .tech-spec-top select {
      background: transparent;
      color: #ffcc00;
      border: 1px solid #ffcc00;
      font-family: monospace;
      padding: 2px 6px;
    }

    .tech-spec-diagram {
      position: relative;
      width: 100%;
      height: clamp(240px, 40vh, 420px);
      margin-bottom: 10px;
    }

    .tech-spec-diagram object {
      width: 100%;
      height: 100%;
      display: block;
    }

    .tech-spec-readout {
      font-size: 0.85em;
      opacity: 0.9;
      min-height: 1.4em;
    }

    .tech-spec-readout .label {
      opacity: 0.6;
      margin-right: 6px;
    }
  `;
  document.head.appendChild(style);

  /* ---------------------------------------------------------------------------
     3. DOM CONSTRUCTION
     ------------------------------------------------------------------------- */

  const frame = document.createElement("div");
  frame.className = "tech-spec-frame";

  frame.innerHTML = `
    <div class="tech-spec-top">
      <span>TECH SPEC</span>
      <div>
        <label for="tech-spec-select">INSPECT</label>
        <select id="tech-spec-select">
          <option value="">—</option>
          <option value="a">a</option>
          <option value="b">b</option>
          <option value="c.i">c.i</option>
          <option value="c.ii">c.ii</option>
          <option value="c.iii">c.iii</option>
          <option value="c.iv">c.iv</option>
        </select>
      </div>
    </div>

    <div class="tech-spec-diagram">
      <object id="tech-spec-svg" data="${SVG_PATH}" type="image/svg+xml"></object>
    </div>

    <div class="tech-spec-readout">
      <span class="label">DETAIL</span>
      <span id="tech-spec-readout-text">—</span>
    </div>
  `;

const mount = document.getElementById("tech-spec");
if (!mount) return;
mount.appendChild(frame);

  /* ---------------------------------------------------------------------------
     4. LOGIC
     ------------------------------------------------------------------------- */

  const select = frame.querySelector("#tech-spec-select");
  const readout = frame.querySelector("#tech-spec-readout-text");
  const object = frame.querySelector("#tech-spec-svg");

  let svgRoot = null;
  let highlight = null;

  object.addEventListener("load", () => {
    svgRoot = object.contentDocument?.querySelector("svg");
    if (!svgRoot) return;

    highlight = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    highlight.setAttribute("fill", "none");
    highlight.setAttribute("stroke", "#ffcc00");
    highlight.setAttribute("stroke-width", "2");
    highlight.setAttribute("stroke-dasharray", "6 4");
    highlight.setAttribute("vector-effect", "non-scaling-stroke");
    highlight.style.pointerEvents = "none";
    highlight.style.opacity = "0";

    svgRoot.appendChild(highlight);
  });

  select.addEventListener("change", () => {
    const key = select.value;
    const entry = INSPECT_DATA[key];

    if (!entry || !highlight) {
      if (highlight) highlight.style.opacity = "0";
      readout.textContent = "—";
      return;
    }

    highlight.setAttribute("x", entry.box.x);
    highlight.setAttribute("y", entry.box.y);
    highlight.setAttribute("width", entry.box.w);
    highlight.setAttribute("height", entry.box.h);
    highlight.style.opacity = "1";

    readout.textContent = `${entry.label} — ${entry.text}`;
  });

})();
