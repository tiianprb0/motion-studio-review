# Motion Studio — source snapshot

Snapshot source lokal pada 1 November 2026. V20 (`KepedulianV20`) adalah revisi terbaru yang menunggu feedback; V18 (`EmpatiPunyaBatasV18`) tetap acuan desain yang disetujui.

## Peta kode
- `src/index.ts`: entry point; `src/Root.tsx`: daftar composition.
- `src/v20/Character.tsx` dan `ReferenceFace.tsx`: karakter SVG/React; `brand-data.ts`: logo tertanam pada pakaian.
- `src/v20/HI.tsx`: latar Bundaran HI; `Scenes.tsx` dan `BeatGraphics.tsx`: latar, properti, aksi dan susunan adegan.
- `src/v20/Elements.tsx`: fungsi `Outro`; `SocialIcons.tsx`: ikon sosial.
- `src/v20/Film.tsx`: integrasi adegan, kamera, caption, outro dan audio.
- `src/v18/Environments.tsx`, `RevisionScenes.tsx`, `Concepts.tsx`: lingkungan/adegan versi acuan V18. Karakter dan outro V18 ada pada `Character.tsx` dan `Elements.tsx` versi tersebut.
- `public/`: logo, font, audio narasi dan suara pendukung. Karakter dan latar dibuat lewat source; tidak ada folder `public/characters` / `public/backgrounds`, `src/components/MainCharacter.tsx` / `Background.tsx`, atau `src/scenes` di proyek asli.

## Membuka proyek
Dari folder ini jalankan `npm ci`, kemudian `npm run studio`. Pilih composition V20 atau V18 di Remotion Studio.

Untuk renderer lokal yang dipakai proyek: `node scripts/render-v20.mjs` atau `node scripts/render-v18.mjs`. Script render lama serta wrapper `scripts/chrome-cpu-render.sh` bergantung pada Google Chrome di `/Applications/Google Chrome.app` pada macOS. Sesuaikan lokasi browser jika dijalankan di komputer lain.

`npm run render` adalah script historis yang merujuk composition lama `EmpatiBukanIzin`, yang tidak terdaftar pada Root snapshot ini; gunakan script versi di atas. Script `voice` pada package.json adalah entri historis; generator suara beserta konfigurasi login tidak disertakan. Audio yang diperlukan sudah disertakan, tidak perlu membuat narasi baru.

## Cakupan dan pemeriksaan
Source seluruh versi yang tersedia disertakan agar impor lintas versi dan history desain tetap utuh. File package/lock, konfigurasi TypeScript dan script render disertakan. Import relatif telah diperiksa; seluruh file unggahan akan dicocokkan dengan GitHub. Snapshot ini tidak menjalankan render baru dan tidak menyatakan semua versi lolos kompilasi atau review visual baru.

Tidak menyertakan node_modules, bundel/cache, konfigurasi API/OAuth, generator suara, salinan audio raw/temporary, preview atau video hasil render. Dokumen profil/skill ada di root repository.
