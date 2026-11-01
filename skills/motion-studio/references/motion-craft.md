# Motion craft untuk less.certain

Adaptasi selektif dari https://github.com/haidrrrry/claude-remotion-skill (SKILL.md, references/motion-patterns.md, references/design-rules.md, assets/theme.ts), dibaca 1 November 2026. Bukan instalasi seluruh default upstream.

## Penyutradaraan
Storyboard internal tetap mendahului produksi tanpa menunggu ACC. Untuk tiap beat catat makna, aksi sekali, perubahan informasi, framing, fokus, gerak kamera dan jembatan ke beat berikut. Identitas berasal dari palet, wajah/wardrobe dan bahasa motion; lokasi boleh berganti. Manusia hadir bila acting membantu cerita; objek/konsep boleh mengambil alih. Jangan mengganti makna cerita dengan diagram generik. Gunakan pose sederhana terverifikasi; cek sambungan bahu/siku/pergelangan, urutan lapisan dan kontak prop. Jangan mengulang ambil HP atau aksi lain untuk mengisi durasi.

## Teknik yang dipakai selektif
Entrance dapat menggabungkan posisi/skala/opacity dengan easing atau spring yang tepat; stagger untuk urutan perhatian, bukan semua kata wajib bertahap. Buat exit singkat dan hubungkan arah/fokus dengan entrance berikutnya. Pilih slide, parallax, whip pan, scale-through atau mask wipe berdasarkan fungsi cerita. Wipe menutup frame penuh saat pergantian; gambar tidak boleh meloncat saat masih terbuka. Snap zoom-out sekitar 0.4–0.6 detik boleh membuka konteks, lalu tahan agar terbaca. Kontraskan gerak cepat dengan hold sengaja. Satukan preset easing, warna dan durasi dalam theme; timing berbasis detik/fps, frame lokal shot, clamp pada pemetaan waktu. Uji spring overshoot bila berpotensi clipping.

Tidak mewajibkan idle sinus, Ken Burns, grain/mesh/vignette, stagger semua elemen atau larangan linear universal. Pilih berdasarkan cerita; loop dekoratif bukan pengganti perkembangan visual. Caption tetap Indonesia44px, background per kata, frasa masuk bersama lalu stabil, sembilan anchor dengan alignment per kolom dan area aman proyek. Jangan menerapkan karaoke/fixed65%-height upstream sebagai default. Audio revisi visual tetap file/timing lama, tanpa sintesis baru; jangan menambah SFX sembarang ke setiap gerakan.

## Verifikasi
Contoh upstream adalah referensi, bukan kode teruji proyek: sebagian interpolasi belum clamp/easing dan timing masih angka frame. Pertahankan CPU/frame-ready renderer yang terbukti. Periksa transisi bergerak pada dua sisi cut, kontak manusia/prop, caption pada ekspor akhir dan flicker rentang penuh; stills saja tidak membuktikan transisi mulus. Catat batas review dan jangan menyamakan lolos teknis dengan persetujuan kreatif.
