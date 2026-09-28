import { useEffect, useRef, useState } from "react";
import type { VisualKind } from "./data";

const colors = { lime: "#c6fb68", cyan: "#63e6ff", coral: "#ff8e7c", violet: "#b79cff", gold: "#ffd877", grid: "rgba(173, 214, 255, .13)", text: "#c8e1f5" };

function axes(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.fillStyle = "#08162c"; ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = colors.grid; ctx.lineWidth = 1;
  for (let x = 24; x < width; x += 28) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke(); }
  for (let y = 14; y < height; y += 28) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke(); }
  ctx.strokeStyle = "rgba(206, 237, 255, .47)"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(0, height / 2); ctx.lineTo(width, height / 2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(width / 2, 0); ctx.lineTo(width / 2, height); ctx.stroke();
}

function label(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color = colors.text) {
  ctx.fillStyle = color; ctx.font = "11px DM Mono, monospace"; ctx.fillText(text, x, y);
}

function curve(ctx: CanvasRenderingContext2D, fn: (x: number) => number, width: number, height: number, color: string) {
  const scaleX = width / 10; const scaleY = height / 8;
  ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = 3.2; ctx.shadowColor = color; ctx.shadowBlur = 14;
  for (let px = 0; px <= width; px += 2) {
    const x = (px - width / 2) / scaleX; const y = fn(x); const py = height / 2 - y * scaleY;
    if (px === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  }
  ctx.stroke(); ctx.shadowBlur = 0;
}

export default function MathCanvas({ kind, compact = false }: { kind?: VisualKind; compact?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [variant, setVariant] = useState(0);
  const active = kind ?? "polynomial";
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const parent = canvas.parentElement; const width = Math.max(280, Math.min(parent?.clientWidth ?? 530, 620)); const height = compact ? 170 : 245; const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr; canvas.height = height * dpr; canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d"); if (!ctx) return; ctx.scale(dpr, dpr); axes(ctx, width, height);
    if (active === "polynomial" || active === "build") {
      const fn = variant % 2 === 0 ? (x: number) => 0.18 * x ** 3 - 0.75 * x + 0.2 : (x: number) => 0.09 * (x + 2) * (x - 1) * (x - 3);
      curve(ctx, fn, width, height, colors.lime); label(ctx, active === "build" ? "factor blueprint" : "leading term guides the horizon", 12, 22, colors.lime);
      [-2, 1, 3].forEach((root, index) => { const px = width / 2 + root * width / 10; ctx.fillStyle = index === 1 ? colors.coral : colors.gold; ctx.beginPath(); ctx.arc(px, height / 2, 5, 0, Math.PI * 2); ctx.fill(); });
    }
    if (active === "multiplicity") {
      curve(ctx, (x) => 0.13 * (x + 2) * (x - 1) ** 3, width, height, colors.coral); label(ctx, "simple cross", width * .22, height / 2 - 12, colors.gold); label(ctx, "cross + flatten", width * .55, height / 2 + 27, colors.coral);
      [-2, 1].forEach((root, index) => { const px = width / 2 + root * width / 10; ctx.fillStyle = index ? colors.coral : colors.gold; ctx.beginPath(); ctx.arc(px, height / 2, 5, 0, Math.PI * 2); ctx.fill(); });
    }
    if (active === "rational" || active === "slant") {
      const scaleX = width / 10; const scaleY = height / 8; const asym = active === "slant";
      ctx.setLineDash([7, 6]); ctx.strokeStyle = colors.coral; ctx.lineWidth = 2; ctx.beginPath(); const vx = width / 2 + scaleX; ctx.moveTo(vx, 0); ctx.lineTo(vx, height); ctx.stroke();
      ctx.strokeStyle = colors.lime; ctx.beginPath(); if (asym) { ctx.moveTo(0, height * .68); ctx.lineTo(width, height * .18); } else { ctx.moveTo(0, height * .35); ctx.lineTo(width, height * .35); } ctx.stroke(); ctx.setLineDash([]);
      const f = asym ? (x: number) => x + 1 + 1.7 / (x - 1) : (x: number) => 1 + 2 / (x - 1);
      ctx.strokeStyle = colors.cyan; ctx.lineWidth = 3; ctx.shadowColor = colors.cyan; ctx.shadowBlur = 13; ctx.beginPath(); let pen = false;
      for (let px = 0; px <= width; px += 2) { const x = (px - width / 2) / scaleX; if (Math.abs(x - 1) < .07) { pen = false; continue; } const py = height / 2 - f(x) * scaleY; if (!pen) { ctx.moveTo(px, py); pen = true; } else ctx.lineTo(px, py); } ctx.stroke(); ctx.shadowBlur = 0;
      label(ctx, "VA", vx + 7, 20, colors.coral); label(ctx, asym ? "slant asymptote" : "HA", 12, asym ? height * .68 - 6 : height * .35 - 6, colors.lime);
    }
    if (active === "sign") {
      const y = height / 2; ctx.strokeStyle = colors.cyan; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(32, y); ctx.lineTo(width - 32, y); ctx.stroke(); [width * .28, width * .53, width * .78].forEach((x, index) => { ctx.fillStyle = index === 1 ? colors.coral : colors.gold; ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill(); label(ctx, index === 1 ? "undefined" : "zero", x - 22, y - 17, index === 1 ? colors.coral : colors.gold); });
      ["+", "−", "+", "−"].forEach((sign, index) => label(ctx, sign, 58 + index * width * .22, y + 34, index % 2 ? colors.coral : colors.lime)); label(ctx, "one test point per interval", 14, 25, colors.cyan);
    }
    if (active === "complex") {
      ctx.strokeStyle = colors.grid; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(width / 2, 20); ctx.lineTo(width / 2, height - 20); ctx.moveTo(30, height / 2); ctx.lineTo(width - 30, height / 2); ctx.stroke(); const p1 = [width * .68, height * .28]; const p2 = [width * .68, height * .72]; [[p1, "a + bi"], [p2, "a − bi"]].forEach(([point, text]) => { const [x, y] = point as number[]; ctx.fillStyle = colors.violet; ctx.shadowColor = colors.violet; ctx.shadowBlur = 18; ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0; label(ctx, text as string, x + 13, y + 3, colors.violet); }); label(ctx, "real", width - 45, height / 2 - 8); label(ctx, "imag", width / 2 + 7, 24);
    }
    if (active === "division" || active === "synthetic" || active === "bounds") {
      if (active === "division") { label(ctx, "x² + 5x + 6", 38, 52, colors.text); ctx.strokeStyle = colors.coral; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(34, 65); ctx.lineTo(width - 35, 65); ctx.stroke(); label(ctx, "x + 2", 40, 104, colors.coral); label(ctx, "x + 3", width * .6, 104, colors.lime); label(ctx, "divide  →  multiply  →  subtract", 38, height - 30, colors.cyan); }
      if (active === "synthetic") { const chips = ["2", "1", "−5", "6", "1", "−3", "0"]; chips.forEach((chip, index) => { const x = 32 + index * 66; ctx.fillStyle = index === 0 ? colors.coral : "#153453"; ctx.fillRect(x, height / 2 - 23, 48, 40); label(ctx, chip, x + 15, height / 2 + 4, index === 0 ? "#111a28" : colors.text); }); label(ctx, "drop · multiply · add", 30, 33, colors.cyan); }
      if (active === "bounds") { ctx.strokeStyle = colors.cyan; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(48, height / 2); ctx.lineTo(width - 48, height / 2); ctx.stroke(); ["−5 lower", "−2", "0", "3", "4 upper"].forEach((text, index) => { const x = 52 + index * ((width - 104) / 4); ctx.fillStyle = index === 0 ? colors.coral : index === 4 ? colors.lime : colors.gold; ctx.beginPath(); ctx.arc(x, height / 2, 6, 0, Math.PI * 2); ctx.fill(); label(ctx, text, x - 20, height / 2 + (index % 2 ? 29 : -19), ctx.fillStyle as string); }); label(ctx, "all real zeros live inside the fence", 24, 28, colors.text); }
    }
  }, [active, variant, compact]);
  return <div className="canvas-wrap"><canvas ref={ref} aria-label={`${active} mathematics visual`} /><button onClick={() => setVariant((value) => value + 1)} className="canvas-switch">↻ alternate view</button></div>;
}
