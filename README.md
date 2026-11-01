# Motion Studio — konfigurasi dan source terbaru

Pembaruan 1 November 2026. Isi lama pada branch main diganti dengan snapshot terbaru tanpa folder arsip. Riwayat Git tetap tersedia.

## Isi
- profile/CREATIVE-BRIEF.md: seluruh kesepakatan interview terbaru.
- profile/SOUL.md dan profile/skills/: persona dan instruksi kerja Hermes.
- profile/ACTIVE-WORKSPACE.json: penunjuk source dan audio yang tersedia.
- profile/VOICE-PROFILES.json: aturan narator; ID Yan masih menunggu pemilihan.
- motion-studio/: source Remotion, karakter, latar, adegan, outro, audio, logo, font, package/lock dan script render.

## Perubahan terakhir
Master World Canvas per lokasi/waktu, camera beat berkesinambungan, riset setiap naskah, tokoh tetap Naya/Yan, subtitle hanya tiga posisi kiri tanpa kolom kosong, identitas/outro dipertahankan, template warna/nada narasi, screenshot beberapa scene dan moving proof. Cerita baru masuk projects/<slug>/v1; revisi dalam proyek sama.

Kontrak/skill telah diperbarui. Source yang disertakan adalah snapshot produksi yang tersedia, dengan versi yang dibutuhkan entry point lama; belum ditulis ulang menjadi implementasi Master World Canvas baru. V20 masih kandidat, bukan otomatis disetujui. Tidak ada proyek cerita baru atau render/audio baru untuk pembaruan ini.

Dari motion-studio/ jalankan npm ci lalu npm run studio. Script render versi berada di scripts/; renderer Chrome mengandung asumsi macOS. Tidak menyertakan node_modules, bundle/cache, preview/output video, arsip, config provider, API key, token atau kredensial. Skill shotcraft/workbench merujuk upstream terpisah; source vendor tidak dibundel. Ini salinan review, bukan ekspor seluruh konfigurasi login Hermes.
