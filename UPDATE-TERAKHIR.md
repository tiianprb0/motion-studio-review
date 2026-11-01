# Update terakhir — 1 November 2026

Unggahan kedua menambahkan folder `motion-studio/` berisi kode Remotion aktual dari proyek lokal: karakter, ekspresi wajah, latar, properti, adegan, kamera, caption, outro, ikon sosial serta data timing. Seluruh source versi yang tersedia dipertahankan, termasuk V18 yang disetujui dan V20 kandidat terbaru.

Ditambahkan juga package.json, package-lock.json, tsconfig.json, script render, wrapper Chrome macOS, logo, font, rekaman narasi yang digunakan dan suara pendukung. Lihat [panduan source](motion-studio/README.md) untuk peta kode dan cara membuka proyek.

Folder contoh `public/characters`, `public/backgrounds`, `src/components` dan `src/scenes` tidak ditemukan. Implementasinya berupa SVG/React di `src/v*/`, terutama `Character.tsx`, `ReferenceFace.tsx`, `HI.tsx`, `Scenes.tsx`, `BeatGraphics.tsx`, `Environments.tsx` dan `Elements.tsx`.

Dokumen unggahan pertama tetap dipertahankan. MANIFEST.json di root adalah manifest paket ZIP pertama; `motion-studio/UPLOAD-MANIFEST.json` mencatat hash SHA-256 file snapshot source (kecuali manifest itu sendiri).

Dikecualikan: dependensi terpasang, cache/bundle, konfigurasi login/API/OAuth, generator suara, audio raw/temporary, preview dan output video. Import relatif diperiksa dan tidak ditemukan yang hilang; tidak ada render baru dalam pembaruan ini.
