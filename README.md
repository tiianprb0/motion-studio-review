# Motion Studio — hanya versi terbaru

Folder versi lama dan dokumen review lama sudah dihapus dari isi branch main. Tidak ada arsip atau kumpulan src/v7–v20 dalam snapshot ini.

- profile/: kontrak interview, persona, skill, status dan aturan suara terbaru.
- motion-studio/src/film/: satu implementasi terbaru untuk karakter, latar, adegan, caption dan outro.
- motion-studio/src/Root.tsx: hanya composition MotionStudio.
- motion-studio/public/: hanya narasi yang digunakan, logo dan font.
- motion-studio/scripts/render.mjs: hanya renderer implementasi terbaru.

Dari motion-studio/: npm ci, lalu npm run studio atau npm run render. Wrapper Chrome masih memakai lokasi macOS. Tidak ada kredensial, dependency terpasang, cache atau output video.

Konfigurasi kreatif mengikuti interview. Source terbaru dipertahankan tanpa mengklaim sudah direfaktor otomatis ke arsitektur master-world baru. Yan memakai Abi dan akses API kedua suara sudah diverifikasi. Riwayat commit Git tetap tersedia.

## ElevenLabs API — terverifikasi 1 November 2026

Jalur narasi aktif adalah API langsung ElevenLabs. Naya menggunakan Leya (`hAiGVB2GdXVPlylkAP9C`); Yan menggunakan Abi - Calm, Breathy and Gravelly (`EOiisOG9mUn5iXbtXJuL`), pilihan pengguna. Pemeriksaan akses API untuk kedua suara berhasil menurut hasil setup yang dibagikan pengguna. Ini verifikasi akses, bukan audisi kualitas; tidak ada audio dibuat saat pemeriksaan.

Pilih satu narator per naskah. Pembawaan normal/marah/sarkastis diperbolehkan untuk keduanya; dialog karakter tetap teks dan gerak tanpa voice-over. Model normal: `eleven_flash_v2_5`; nada marah/sarkastis: `eleven_v3`. Revisi visual tetap memakai rekaman/timing yang sudah ada. Creative MCP bukan jalur narasi default; jangan fallback atau mengganti suara berbayar otomatis.

API key disimpan hanya pada profil Hermes lokal. Repo ini hanya berisi voice ID dan pengaturan nonrahasia; tidak berisi API key, file .env, token, atau salinan config provider. Voice ID bukan API key.

