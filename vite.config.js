import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";

/* 앱 아이콘·설치 정보·오프라인 파일을 최상위 폴더에서 그대로 복사해 배포본에 넣음
   (GitHub에 폴더 없이 파일만 올려도 되도록) */
const STATIC_FILES = ["manifest.webmanifest", "sw.js", "icon-192.png", "icon-512.png", "apple-touch-icon.png"];

const appShell = {
  name: "bible-gosa-app-shell",
  generateBundle() {
    for (const f of STATIC_FILES) this.emitFile({ type: "asset", fileName: f, source: fs.readFileSync(f) });
  },
  transformIndexHtml: {
    order: "post",
    handler() {
      return [
        { tag: "link", attrs: { rel: "manifest", href: "/manifest.webmanifest" }, injectTo: "head" },
        { tag: "link", attrs: { rel: "icon", type: "image/png", href: "/icon-192.png" }, injectTo: "head" },
        { tag: "link", attrs: { rel: "apple-touch-icon", href: "/apple-touch-icon.png" }, injectTo: "head" },
      ];
    },
  },
};

export default defineConfig({
  plugins: [react(), appShell],
  publicDir: false,
});
