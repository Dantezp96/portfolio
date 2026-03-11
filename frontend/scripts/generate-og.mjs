import { createCanvas } from "@napi-rs/canvas";
import { writeFileSync } from "fs";

const W = 1200, H = 630;
const canvas = createCanvas(W, H);
const ctx = canvas.getContext("2d");

// Background
ctx.fillStyle = "#0a0a1a";
ctx.fillRect(0, 0, W, H);

// Grid pattern (subtle)
ctx.strokeStyle = "rgba(108, 99, 255, 0.06)";
ctx.lineWidth = 1;
for (let x = 0; x < W; x += 60) {
  ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
}
for (let y = 0; y < H; y += 60) {
  ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
}

// Glow orb top-right
const g1 = ctx.createRadialGradient(900, 120, 0, 900, 120, 250);
g1.addColorStop(0, "rgba(139, 127, 255, 0.25)");
g1.addColorStop(1, "rgba(139, 127, 255, 0)");
ctx.fillStyle = g1;
ctx.fillRect(0, 0, W, H);

// Glow orb bottom-left
const g2 = ctx.createRadialGradient(300, 500, 0, 300, 500, 200);
g2.addColorStop(0, "rgba(0, 255, 208, 0.15)");
g2.addColorStop(1, "rgba(0, 255, 208, 0)");
ctx.fillStyle = g2;
ctx.fillRect(0, 0, W, H);

// Greeting
ctx.fillStyle = "#8b7fff";
ctx.font = "500 20px sans-serif";
ctx.fillText("Portfolio", 80, 200);

// Name
ctx.fillStyle = "#e8e8f0";
ctx.font = "800 64px sans-serif";
ctx.fillText("Omar Daniel Zorro", 80, 280);

// Role with gradient effect (simulate with two colors)
ctx.fillStyle = "#8b7fff";
ctx.font = "600 32px sans-serif";
ctx.fillText("Data & AI Engineer", 80, 330);

// Divider line
const lineGrad = ctx.createLinearGradient(80, 360, 500, 360);
lineGrad.addColorStop(0, "#8b7fff");
lineGrad.addColorStop(1, "#00ffd0");
ctx.strokeStyle = lineGrad;
ctx.lineWidth = 3;
ctx.beginPath(); ctx.moveTo(80, 365); ctx.lineTo(450, 365); ctx.stroke();

// Keywords
ctx.fillStyle = "#9999b3";
ctx.font = "500 22px sans-serif";
ctx.fillText("Data Engineering  •  Generative AI  •  Machine Learning  •  Azure", 80, 410);

// Stats boxes
const stats = [
  { num: "3+", label: "Years" },
  { num: "17M+", label: "Records" },
  { num: "6", label: "Projects" },
  { num: "1M+", label: "Files/Day" },
];

let sx = 80;
for (const s of stats) {
  // Box
  ctx.fillStyle = "rgba(139, 127, 255, 0.08)";
  ctx.strokeStyle = "rgba(139, 127, 255, 0.2)";
  ctx.lineWidth = 1;
  const bw = 140, bh = 80, br = 12;
  // Rounded rect
  ctx.beginPath();
  ctx.moveTo(sx + br, 450);
  ctx.lineTo(sx + bw - br, 450);
  ctx.quadraticCurveTo(sx + bw, 450, sx + bw, 450 + br);
  ctx.lineTo(sx + bw, 450 + bh - br);
  ctx.quadraticCurveTo(sx + bw, 450 + bh, sx + bw - br, 450 + bh);
  ctx.lineTo(sx + br, 450 + bh);
  ctx.quadraticCurveTo(sx, 450 + bh, sx, 450 + bh - br);
  ctx.lineTo(sx, 450 + br);
  ctx.quadraticCurveTo(sx, 450, sx + br, 450);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Number
  ctx.fillStyle = "#8b7fff";
  ctx.font = "800 28px sans-serif";
  const numW = ctx.measureText(s.num).width;
  ctx.fillText(s.num, sx + (bw - numW) / 2, 485);

  // Label
  ctx.fillStyle = "#9999b3";
  ctx.font = "500 14px sans-serif";
  const lblW = ctx.measureText(s.label).width;
  ctx.fillText(s.label, sx + (bw - lblW) / 2, 515);

  sx += 160;
}

// Right side - tech icons (text-based)
const techs = ["Python", "Azure", "Django", "FastAPI", "Airflow", "PyTorch", "React", "LLMs/RAG"];
let ty = 190;
ctx.font = "500 16px monospace";
for (const t of techs) {
  ctx.fillStyle = "rgba(139, 127, 255, 0.1)";
  ctx.strokeStyle = "rgba(139, 127, 255, 0.25)";
  const tw = ctx.measureText(t).width + 24;
  // pill
  ctx.beginPath();
  ctx.moveTo(820 + 12, ty); ctx.lineTo(820 + tw - 12, ty);
  ctx.quadraticCurveTo(820 + tw, ty, 820 + tw, ty + 12);
  ctx.lineTo(820 + tw, ty + 24);
  ctx.quadraticCurveTo(820 + tw, ty + 36, 820 + tw - 12, ty + 36);
  ctx.lineTo(820 + 12, ty + 36);
  ctx.quadraticCurveTo(820, ty + 36, 820, ty + 24);
  ctx.lineTo(820, ty + 12);
  ctx.quadraticCurveTo(820, ty, 820 + 12, ty);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  ctx.fillStyle = "#b0a8ff";
  ctx.fillText(t, 820 + 12, ty + 24);
  ty += 48;
}

// URL at bottom
ctx.fillStyle = "#555570";
ctx.font = "400 16px sans-serif";
ctx.fillText("frontend-mauve-seven-17.vercel.app", 80, 580);

const buf = canvas.toBuffer("image/png");
writeFileSync("public/og-image.png", buf);
console.log("OG image generated: public/og-image.png (" + buf.length + " bytes)");
