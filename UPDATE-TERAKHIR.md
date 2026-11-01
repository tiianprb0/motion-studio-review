# Update terakhir — 1 November 2026

Koneksi narasi kini memakai API langsung ElevenLabs. Akses suara Leya untuk Naya dan Abi untuk Yan berhasil diverifikasi melalui setup pengguna. Informasi suara/model sudah disinkronkan ke profil dan skill pada repo; tidak ada API key, .env, token atau config provider yang diunggah.

Source tetap satu implementasi terbaru di motion-studio/src/film/, tanpa folder versi lama atau arsip. Tidak ada audio baru, refaktor master-world atau audisi kualitas dalam pembaruan ini.

## ElevenLabs API — terverifikasi 1 November 2026

Jalur narasi aktif adalah API langsung ElevenLabs. Naya menggunakan Leya (`hAiGVB2GdXVPlylkAP9C`); Yan menggunakan Abi - Calm, Breathy and Gravelly (`EOiisOG9mUn5iXbtXJuL`), pilihan pengguna. Pemeriksaan akses API untuk kedua suara berhasil menurut hasil setup yang dibagikan pengguna. Ini verifikasi akses, bukan audisi kualitas; tidak ada audio dibuat saat pemeriksaan.

Pilih satu narator per naskah. Pembawaan normal/marah/sarkastis diperbolehkan untuk keduanya; dialog karakter tetap teks dan gerak tanpa voice-over. Model normal: `eleven_flash_v2_5`; nada marah/sarkastis: `eleven_v3`. Revisi visual tetap memakai rekaman/timing yang sudah ada. Creative MCP bukan jalur narasi default; jangan fallback atau mengganti suara berbayar otomatis.

API key disimpan hanya pada profil Hermes lokal. Repo ini hanya berisi voice ID dan pengaturan nonrahasia; tidak berisi API key, file .env, token, atau salinan config provider. Voice ID bukan API key.

