import fs from "fs"; import path from "path";
const root = path.resolve("src");
const okTokens = /\b(bg-(app|card)(-80)?)\b|\b(text-(app|muted))\b|\b(border-app)\b/;
const badClasses = [
  /\bbg-white\b/g, /\bbg-zinc-(50|100|200)\b/g,
  /\btext-(black|white)\b/g, /\btext-zinc-(900|800|700|600|500)\b/g,
  /\bborder-(white|zinc-(200|300|800|900))\b/g
];
const files = [];
(function walk(dir){ for (const f of fs.readdirSync(dir,{withFileTypes:true})) {
  const p = path.join(dir,f.name);
  if (f.isDirectory()) walk(p);
  else if (/\.(tsx?|jsx?|mdx)$/.test(f.name)) files.push(p);
}})(root);

let out = [];
for (const file of files) {
  const lines = fs.readFileSync(file,"utf8").split("\n");
  lines.forEach((line, i) => {
    if (okTokens.test(line)) return; // ya tokenizado, ok
    if (badClasses.some(re => re.test(line))) {
      out.push(`${file}:${i+1}: ${line.trim()}`);
    }
  });
}
fs.writeFileSync("darkmode_audit.txt", out.join("\n"));
console.log(`Report -> darkmode_audit.txt (${out.length} hits)`);
