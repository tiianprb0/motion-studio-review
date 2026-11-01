## ElevenLabs API — terverifikasi 1 November 2026

Jalur narasi aktif adalah API langsung ElevenLabs. Naya menggunakan Leya (`hAiGVB2GdXVPlylkAP9C`); Yan menggunakan Abi - Calm, Breathy and Gravelly (`EOiisOG9mUn5iXbtXJuL`), pilihan pengguna. Pemeriksaan akses API untuk kedua suara berhasil menurut hasil setup yang dibagikan pengguna. Ini verifikasi akses, bukan audisi kualitas; tidak ada audio dibuat saat pemeriksaan.

Pilih satu narator per naskah. Pembawaan normal/marah/sarkastis diperbolehkan untuk keduanya; dialog karakter tetap teks dan gerak tanpa voice-over. Model normal: `eleven_flash_v2_5`; nada marah/sarkastis: `eleven_v3`. Revisi visual tetap memakai rekaman/timing yang sudah ada. Creative MCP bukan jalur narasi default; jangan fallback atau mengganti suara berbayar otomatis.

API key disimpan hanya pada profil Hermes lokal. Repo ini hanya berisi voice ID dan pengaturan nonrahasia; tidak berisi API key, file .env, token, atau salinan config provider. Voice ID bukan API key.

# Internal storyboard and production

Read ../../../CREATIVE-BRIEF.md and ../../../ACTIVE-WORKSPACE.json. For a new topic create projects/<slug>/v1; for revisions retain project identity and increment the local version. Existing legacy source stays intact until migration is requested. Audio replacement alone does not imply a new topic.

Research script/visual references; assess intended reflection, then map meaning, visual action, master scene, camera beat, frame/time origin, continuity, caption anchor and transition. Select template color/delivery tone and Naya or Yan narrator appropriate to the whole script. Preserve character identity, brand colors and fixed outro composition.

Storyboard is an internal first step, not an ACC gate. During authorized production send screenshots from several representative scenes as a visual checkpoint and continue unless the user asks to wait. Also inspect moving proofs: screenshots do not validate camera motion, footsteps, grip or scene transitions. Prioritize anatomical integrity, grounded objects and temporal continuity.

A new production script authorizes required configured-voice generation without another credit question. Log estimate/use, cache requests/results and poll existing jobs. Visual revisions reuse actual audio/timing. Spoken edits reuse unchanged portions where feasible. Do not speed narration to satisfy arbitrary scene timing. Configuration/planning-only tasks do not start audio/video generation. Publication requires a user request.
