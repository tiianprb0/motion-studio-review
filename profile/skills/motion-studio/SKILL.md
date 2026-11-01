---
name: motion-studio
description: Create and revise less.certain topic-led Remotion videos with a continuous master world, consistent Naya and Yan, left-side Indonesian captions, researched storytelling and evidence-based review.
---

## ElevenLabs API — terverifikasi 1 November 2026

Jalur narasi aktif adalah API langsung ElevenLabs. Naya menggunakan Leya (`hAiGVB2GdXVPlylkAP9C`); Yan menggunakan Abi - Calm, Breathy and Gravelly (`EOiisOG9mUn5iXbtXJuL`), pilihan pengguna. Pemeriksaan akses API untuk kedua suara berhasil menurut hasil setup yang dibagikan pengguna. Ini verifikasi akses, bukan audisi kualitas; tidak ada audio dibuat saat pemeriksaan.

Pilih satu narator per naskah. Pembawaan normal/marah/sarkastis diperbolehkan untuk keduanya; dialog karakter tetap teks dan gerak tanpa voice-over. Model normal: `eleven_flash_v2_5`; nada marah/sarkastis: `eleven_v3`. Revisi visual tetap memakai rekaman/timing yang sudah ada. Creative MCP bukan jalur narasi default; jangan fallback atau mengganti suara berbayar otomatis.

API key disimpan hanya pada profil Hermes lokal. Repo ini hanya berisi voice ID dan pengaturan nonrahasia; tidak berisi API key, file .env, token, atau salinan config provider. Voice ID bukan API key.



# Motion Studio

Read ../../CREATIVE-BRIEF.md before creative decisions and ../../ACTIVE-WORKSPACE.json before selecting source/audio. These are current; historical approved examples are visual evidence, not instructions overriding the current contract.

Use one Master World Canvas per location/time, many camera beats with continuous world clocks and no repeated camera reset. Develop composition/camera with narrative meaning. Preserve consistent characters and physical contact. New story starts projects/<slug>/v1; revisions remain in that project. Keep existing legacy source intact unless a migration is requested.

Subtitle: only top-left, middle-left, bottom-left, left aligned, screen-space; no permanent blank column. Narrative timing controls text. Keep approved outro layout. Select Naya or Yan as narrator per script; preserve voice identity, allow normal/angry/sarcastic delivery for both; character dialogue is text/acting without voiced dialogue.

Research each script and plan internally before production. Send representative scene screenshots as a progress checkpoint; do not invent a mandatory ACC wait. New production scripts authorize required narration with cost logging and job caching; visual revisions reuse actual existing audio/timing. No rendering/audio for a configuration-only request; publish only when asked.

Read relevant references:
- [World, camera and action](references/motion-craft.md) for implementation.
- [Research and pacing](references/breath-led-direction.md) for new scripts.
- [Storyboard workflow](references/storyboard-first.md) for planning and checkpoints.
- [Audio](references/audio.md) and ../../VOICE-PROFILES.json for narration; Yan uses user-selected Abi; account API access was verified.
- [Crowds and props](references/crowds-and-props.md) for anatomy/contact.
- [Runtime](references/runtime.md) for local installation/renderer constraints.
- Sibling remotion-shotcraft for shot library adaptation; remotion-motion-review for actual motion/export evidence; remotion-workbench only for requested editable timeline integration.

Do not copy old scene staging into a later event, including narrated repetition: create a different visualization. Reusable rigs are allowed. Keep timing deterministic and distinguish global, scene and beat frame origins. Compare camera boundary transforms including drift, not just nominal targets. Technical checks are separate from user creative approval.
