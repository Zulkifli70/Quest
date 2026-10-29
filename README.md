# Zulk Quest ⚔️

App produktivitas bertema RPG pixel-art: selesaikan misi harian, bangun kebiasaan,
dan tuntaskan tujuan besar untuk naik level.

## Fitur

- **Misi Harian** — tugas sekali jalan dengan XP sesuai kesulitan: Mudah 10, Sedang 25, Sulit 50 XP. Daftar direset tiap hari; hari-hari sebelumnya tetap bisa dilihat.
- **Kebiasaan** — kegiatan berulang dengan target per minggu (3/5/7x), +8 XP per check-in. Bolong sehari tanpa hukuman.
- **Tujuan Besar** — tujuan yang dirinci jadi langkah kecil (+5 XP per langkah) dengan bonus XP saat tuntas, lengkap dengan prioritas dan kategori.
- **XP, Level & Tier** — 12 tier dari Recruit hingga Immortal, dengan warna dan border panel khusus per tier (lihat header).
- **Streak Harian** 🔥 — kerjakan minimal satu aktivitas per hari untuk menaikkan streak di header; rekor terbaik tetap tersimpan walau bolong.
- **Notifikasi** — pesan penyemangat acak (gaya gaul) tiap aksi, dan layar level-up saat naik level.
- **Tema** — gelap (default) dan terang "perkamen", bisa diganti dari header.
- **Sinkronisasi** — data tersimpan otomatis di localStorage dan Supabase (per user), lintas perangkat dengan login.
- **Akun Demo** — tombol "Coba Akun Demo" di layar login untuk mencoba semua fitur dengan data contoh; perubahan hanya berlaku di sesi itu, tidak disimpan ke localStorage maupun Supabase.

## Teknologi

- [React 19](https://react.dev) + [Vite](https://vite.dev)
- [Tailwind CSS 4](https://tailwindcss.com) + design system pixel-RPG (`design.md`)
- [Supabase](https://supabase.com) — auth dan sinkronisasi state per user (`state_json`)
- [Vitest](https://vitest.dev) untuk unit test logika XP/streak

## Mulai

```bash
npm install
npm run dev      # jalankan dev server
npm run build    # build produksi ke dist/
npm run test     # unit test (vitest)
npm run lint     # eslint
```

## Setup Supabase

1. Buat project di [supabase.com](https://supabase.com), lalu aktifkan email/password auth.
2. Jalankan SQL setup dari `db_setup.sql` (tabel `user_state`, RLS, RPC `award_xp`).
3. Isi URL dan anon key di `src/lib/supabase.js`.

## Struktur

```
src/
  components/       # UI per tab (DailyQuests, Habits, BigGoals, Header, ...)
  lib/              # logika murni: questLogic (XP, level, streak), constants (tier), celebrations
  lib/demoData.js   # state awal akun demo (data contoh, tidak tersentuh DB)
  store/            # ProductivityContext — state global + sinkronisasi Supabase
db_setup.sql        # SQL setup Supabase
design.md           # design system pixel-RPG (token, prinsip, komponen)
```

## Panduan Memakai

Tekan tombol **?** di pojok app untuk panduan lengkap di dalam app — cara menambah
misi/kebiasaan/tujuan, aturan XP, daftar tier level, dan tombol reset data.

Ingin lihat app sebelum daftar? Klik **Coba Akun Demo** di layar login — semuanya
bisa diutak-atik, dan data demo tidak akan tersimpan.
