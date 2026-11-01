# Source terbaru

Hanya satu implementasi di src/film/. Character.tsx dan ReferenceFace.tsx menggambar karakter; HI.tsx, Scenes.tsx dan BeatGraphics.tsx menggambar latar/adegan; Elements.tsx berisi outro; SocialIcons.tsx ikon sosial. Root.tsx hanya composition MotionStudio.

Jalankan npm ci lalu npm run studio atau npm run render. Chrome renderer memakai lokasi macOS dan mungkin perlu disesuaikan. Kontrak kreatif: ../profile/CREATIVE-BRIEF.md. Belum ada refaktor arsitektur master-world baru atau audisi kualitas audio dalam pembaruan ini.

## ElevenLabs API — terverifikasi 1 November 2026

Jalur narasi aktif adalah API langsung ElevenLabs. Naya menggunakan Leya (`hAiGVB2GdXVPlylkAP9C`); Yan menggunakan Abi - Calm, Breathy and Gravelly (`EOiisOG9mUn5iXbtXJuL`), pilihan pengguna. Pemeriksaan akses API untuk kedua suara berhasil menurut hasil setup yang dibagikan pengguna. Ini verifikasi akses, bukan audisi kualitas; tidak ada audio dibuat saat pemeriksaan.

Pilih satu narator per naskah. Pembawaan normal/marah/sarkastis diperbolehkan untuk keduanya; dialog karakter tetap teks dan gerak tanpa voice-over. Model normal: `eleven_flash_v2_5`; nada marah/sarkastis: `eleven_v3`. Revisi visual tetap memakai rekaman/timing yang sudah ada. Creative MCP bukan jalur narasi default; jangan fallback atau mengganti suara berbayar otomatis.

API key disimpan hanya pada profil Hermes lokal. Repo ini hanya berisi voice ID dan pengaturan nonrahasia; tidak berisi API key, file .env, token, atau salinan config provider. Voice ID bukan API key.

