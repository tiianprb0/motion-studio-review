# Runtime

Source berada di motion-studio/ pada root repo. Jalankan perintah proyek dari sana; package.json, src, public dan scripts tetap bersama. profile/ACTIVE-WORKSPACE.json mencatat sumber/audio aktif; jalur source/audio/renderer relatif folder motion-studio.

Pertahankan renderer CPU/frame-ready yang terbukti; wrapper Chrome masih mengacu pada instalasi macOS dan perlu disesuaikan di mesin lain. Tidak menjalankan render atau instalasi hanya karena konfigurasi diperbarui. Tidak ada kredensial/runtime mesin yang disertakan.
