## ElevenLabs API — terverifikasi 1 November 2026

Jalur narasi aktif adalah API langsung ElevenLabs. Naya menggunakan Leya (`hAiGVB2GdXVPlylkAP9C`); Yan menggunakan Abi - Calm, Breathy and Gravelly (`EOiisOG9mUn5iXbtXJuL`), pilihan pengguna. Pemeriksaan akses API untuk kedua suara berhasil menurut hasil setup yang dibagikan pengguna. Ini verifikasi akses, bukan audisi kualitas; tidak ada audio dibuat saat pemeriksaan.

Pilih satu narator per naskah. Pembawaan normal/marah/sarkastis diperbolehkan untuk keduanya; dialog karakter tetap teks dan gerak tanpa voice-over. Model normal: `eleven_flash_v2_5`; nada marah/sarkastis: `eleven_v3`. Revisi visual tetap memakai rekaman/timing yang sudah ada. Creative MCP bukan jalur narasi default; jangan fallback atau mengganti suara berbayar otomatis.

API key disimpan hanya pada profil Hermes lokal. Repo ini hanya berisi voice ID dan pengaturan nonrahasia; tidak berisi API key, file .env, token, atau salinan config provider. Voice ID bukan API key.

# Narasi dan audio aktif

Baca ../../../CREATIVE-BRIEF.md dan ../../../VOICE-PROFILES.json. Agen memilih satu narator per naskah: Naya memakai suara perempuan yang sudah dipakai, Yan satu suara laki-laki muda/tenang/santai/sedikit pemalu yang ID-nya masih harus dipilih dari pilihan nyata. Keduanya boleh normal/marah/sarkastis. Dialog karakter berupa teks/gerak tanpa voice-over dialog.

Revisi visual memakai rekaman dan timing aktual dari ../../../ACTIVE-WORKSPACE.json. Jangan mengganti rekaman dengan sintesis baru. Perubahan ucapan memakai ulang bagian tetap bila memungkinkan. Catat penggunaan, cache hasil dan poll job yang sama; jangan menduplikasi generasi. Permintaan konfigurasi tidak menghasilkan narasi/sampel baru.

Efek suara tidak wajib/default; suara transisi boleh membantu konteks. Musik tidak boleh menutupi narasi. Sumber audio baru harus memiliki provenance/lisensi yang sesuai. Jalur OAuth yang sudah ada dipertahankan; jangan menyalin token ke proyek. Pedoman alat rinci berada pada skill kanonis profil Hermes, bukan link sibling skill yang tidak ada di workspace ini.
