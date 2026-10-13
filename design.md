# Game of Life: Design System (Pixel-RPG Dark)

Sistem desain untuk app quest harian bertema RPG lama. Prinsip utamanya: **terasa seperti game 16-bit, tapi tetap nyaman dipakai tiap hari**. Dekorasi yang memperlambat user mencentang quest harus dibuang.

Prototipe acuan: `quest-app.html`

---

## 1. Prinsip

1. **Alat dulu, game kemudian.** Kecepatan mencentang quest lebih penting daripada ornamen.
2. **Semua kotak.** Tidak ada radius, glow lembut, blur, atau gradient halus.
3. **Struktur membawa informasi.** Frame emas berarti panel, garis putus-putus berarti pemisah item, garis kiri tebal berarti turunan quest. Jangan menambah garis yang tidak punya arti.
4. **Satu elemen yang mencolok:** bar XP bersegmen di header. Elemen lain sengaja tenang.
5. **Tidak ada hukuman.** Tidak ada streak yang putus. Quest yang macet bisa dibuang di Api Unggun tanpa denda.

---

## 2. Token

Simpan semuanya sebagai CSS variable. Mengganti tema tidak boleh menyentuh komponen.

### Warna (tema gelap, default)

| Token      | Hex       | Pakai untuk                              |
| ---------- | --------- | ---------------------------------------- |
| `--bg`     | `#0a0e16` | Latar halaman                            |
| `--panel`  | `#141b29` | Isi panel                                |
| `--panel2` | `#1b2436` | Tombol sekunder, slot XP kosong          |
| `--ink`    | `#04060a` | Border luar, bayangan keras, slot gelap  |
| `--text`   | `#e9e4d4` | Teks utama (krem, bukan putih murni)     |
| `--mute`   | `#8d97ab` | Teks sekunder                            |
| `--gold`   | `#e0a63a` | Level, XP, quest, aksi utama             |
| `--gold-d` | `#7a5416` | Frame dalam, border tombol centang       |
| `--ember`  | `#e8662c` | Kebiasaan dan progress bulanan           |
| `--good`   | `#6fbf73` | Cadangan untuk status sukses             |
| `--indigo` | `#3b3f8f` | Cadangan untuk suasana atau tema berbeda |

### Warna (tema terang "perkamen")

Aktif otomatis lewat `prefers-color-scheme: light`, atau paksa dengan `data-theme="light"` / `"dark"` di `<html>`.

| Token      | Hex       |
| ---------- | --------- |
| `--bg`     | `#cdb98c` |
| `--panel`  | `#e8d9b4` |
| `--panel2` | `#dcc99a` |
| `--ink`    | `#2b1d10` |
| `--text`   | `#2b1d10` |
| `--mute`   | `#6b5638` |
| `--gold`   | `#8f5a0c` |
| `--gold-d` | `#c99a4a` |
| `--ember`  | `#b8431a` |

### Bentuk

| Token           | Nilai                                     |
| --------------- | ----------------------------------------- |
| `--radius`      | `0`                                       |
| Border panel    | `4px solid var(--ink)`                    |
| Frame dalam     | `inset 0 0 0 2px var(--gold-d)`           |
| Bevel atas      | `inset 0 5px 0 2px rgba(255,255,255,.04)` |
| Bayangan panel  | `6px 6px 0 var(--ink)` (tanpa blur)       |
| Bayangan tombol | `3px 3px 0 var(--ink)`                    |

---

## 3. Tipografi

| Peran                                   | Font               | Ukuran                          | Catatan                                  |
| --------------------------------------- | ------------------ | ------------------------------- | ---------------------------------------- |
| Judul panel, angka level, label atribut | **Press Start 2P** | 8-15px                          | Hanya teks pendek. Jangan untuk kalimat. |
| Teks isi quest, deskripsi, tombol       | **Pixelify Sans**  | 17px (14-15px untuk teks kecil) | Pixel tapi masih nyaman dibaca lama.     |

Aturan:

- **Jangan pakai Press Start 2P untuk teks panjang.** Terlalu melelahkan untuk app yang dibuka tiap hari.
- Pakai **sentence case**. Hindari semua huruf kapital, karena font pixel sudah cukup berkarakter.
- Teks isi minimal 14px. Cek kontras amber di atas slate sebelum mengubah palet.
- Fallback: `monospace` untuk pixel font, `'Courier New', monospace` untuk teks isi.

---

## 4. Komponen

### Panel

Frame berlapis: border `--ink` 4px di luar, frame emas 2px di dalam, bayangan keras. Judul panel memakai pixel font berwarna `--gold`.

```css
.panel {
  background: var(--panel);
  border: 4px solid var(--ink);
  box-shadow:
    inset 0 0 0 2px var(--gold-d),
    inset 0 5px 0 2px rgba(255, 255, 255, 0.04),
    6px 6px 0 var(--ink);
  padding: 16px;
}
```

### Header (hub dashboard)

Kotak level di kiri (border emas, isi `--ink`), nama app dan kalimat status di kanan, lalu **bar XP bersegmen**.

- Bar XP: grid 20 segmen, jarak 3px, di dalam wadah `--ink` dengan border `--gold-d`.
- Segmen terisi: `--gold` dengan bevel (`inset 0 -4px 0 rgba(0,0,0,.28)` dan `inset 0 3px 0 rgba(255,255,255,.3)`).
- Transisi: `steps(2)`, tidak mulus.
- Kalimat status berubah mengikuti kondisi, misalnya "3 quest menunggu hari ini" atau "Semua quest hari ini beres."

### Tombol

- **Utama:** latar `--gold`, teks `--ink`, border 3px `--ink`, bayangan keras 3px.
- **Sekunder:** latar `--panel2`.
- **Efek tekan:** `active` menggeser `translate(3px,3px)` dan menghapus bayangan. Murah dan terasa seperti ditekan.
- Wajib: `cursor:pointer`, `:focus-visible` outline 3px `--gold`, label jelas untuk pembaca layar (`aria-label`).

### Kotak centang

30x30px, latar `--ink`, border 3px `--gold-d`. Saat selesai: latar `--gold`, ikon centang pixel, teks quest dicoret dan diredupkan.

### Baris item

Dipisahkan garis putus-putus 2px `--ink`. Baris pertama tanpa garis atas.

### Kotak progress kebiasaan

Deretan kotak kecil 12x12px sebanyak target mingguan. Terisi = `--ember`. Ini menggantikan streak: yang dihitung adalah "berapa kali minggu ini", bukan "berapa hari berturut-turut".

### Bar progress quest

Tinggi 12px, wadah `--ink`, border 2px `--gold-d`.

- Isi tahunan: `--gold`.
- Isi bulanan: `--ember`.
- Animasi lebar: `steps(8)`.

### Pohon quest

Tahun (induk) lalu bulan (anak). Anak diberi indentasi 12px dengan garis kiri 4px `--gold-d`. Tiap level punya bar dan persen sendiri.

### Ikon

Digambar dari grid pixel 8x8 menjadi SVG `<rect>` dengan `shape-rendering: crispEdges` dan `image-rendering: pixelated`. Ikon yang dipakai: pedang (quest), api (kebiasaan), centang. Untuk hasil akhir yang baik, ganti dengan set ikon pixel buatan seniman.

### Toast

Kotak `--ink` dengan border emas dan teks pixel, muncul sebentar di bawah layar. Isi: "+10 XP quest selesai". Nama aksi harus sama dengan tombolnya.

---

## 5. Fitur dan logika (dipakai oleh UI)

### Hierarki

Tiga level saja: **Tahun, Bulan, Harian**. Level kuartal dan setengah tahun sengaja dibuang karena nyaris redundan dan membuat rencana basi.

### Task dan kebiasaan: satu daftar, dua perilaku

Di daftar harian keduanya tampil berdampingan. Di logika, keduanya dihitung berbeda:

| Jenis     | Selesai berarti   | Kontribusi ke quest induk               |
| --------- | ----------------- | --------------------------------------- |
| Task      | Dikerjakan sekali | 1 unit                                  |
| Kebiasaan | Check-in hari ini | `min(count, target)` dari `target` unit |

```js
function progress(questId) {
  let total = 0,
    done = 0;
  tasks
    .filter((t) => t.quest === questId)
    .forEach((t) => {
      total += 1;
      done += t.done ? 1 : 0;
    });
  habits
    .filter((h) => h.quest === questId)
    .forEach((h) => {
      total += h.target;
      done += Math.min(h.count, h.target);
    });
  return total ? done / total : 0;
}
```

Progress tahun = rata-rata progress bulan di bawahnya. Kebiasaan boleh tanpa induk quest, tapi tetap masuk atribut hidup.

### Versi kecil

Setiap task punya "versi minimum" untuk hari berat. Menyelesaikannya tetap dihitung selesai dan memberi setengah XP. Ini menggantikan rasa bersalah akibat streak.

### XP dan level

- Task: 10 XP. Versi kecil: 5 XP. Kebiasaan: 8 XP per check-in.
- Level = `floor(XP / 100) + 1`.
- Membatalkan centang mengurangi XP yang sama, supaya tidak bisa curang.

### Atribut hidup

Health, Mind, Wealth, Social. Tiap task dan kebiasaan punya atribut. Panel menampilkan jumlah per atribut dan menandai yang paling terbengkalai.

### Api Unggun (tinjauan mingguan)

Daftar quest yang belum selesai dengan tombol "Buang". Tanpa hukuman. Ini fitur terpenting, karena tanpa tinjauan ulang hierarki quest akan membusuk.

---

## 6. Gerak dan UX

1. **Respons instan.** Setiap aksi langsung menampilkan toast XP dan memperbarui bar.
2. **Gerak patah-patah.** Pakai `steps()`, bukan `ease`. Durasi pendek (0.2-0.4 detik).
3. **Tanpa animasi masuk** pada tiap section. Gerak hanya untuk menjawab aksi user.
4. **Hormati `prefers-reduced-motion`:** matikan semua transisi.
5. **Tampilkan progres selalu,** baik di header maupun di pohon quest.
6. **Detail sekunder disembunyikan** dengan `details/summary` (contoh: Api Unggun).

---

## 7. Responsif dan aksesibilitas

- Mobile-first. Satu kolom di layar sempit, dua kolom (3:2) mulai 760px.
- Header memakai `viewport-fit=cover` dan `env(safe-area-inset-*)` agar tidak tertutup status bar.
- Semua elemen interaktif: `cursor:pointer`, fokus terlihat, label jelas.
- Bar XP memakai `role="progressbar"` dengan `aria-valuenow`.
- Teks isi tidak boleh di bawah 14px. Jangan menyampaikan makna hanya lewat warna.

---

## 8. Yang jangan dilakukan

| Jangan                                            | Alasan                                               |
| ------------------------------------------------- | ---------------------------------------------------- |
| `border-radius`, glow, blur, gradient halus       | Merusak rasa game lama                               |
| Press Start 2P untuk teks panjang                 | Melelahkan dibaca tiap hari                          |
| Streak yang putus lalu menghukum user             | Penyebab utama orang berhenti memakai app            |
| Ornamen sudut, tekstur perkamen, frame berlebihan | Memperlambat pemakaian dan menambah kekacauan        |
| Quest tanpa batas di daftar harian                | Jadi tumpukan rasa bersalah. Batasi 3-5 quest utama. |
| Hardcode radius atau warna di komponen            | Menyulitkan ganti tema                               |

---

## 9. Rencana pengembangan

1. **Fase 1:** Inti: tambah, edit, hapus quest, rollup yang benar, tinjauan mingguan, penyimpanan data nyata.
2. **Fase 2:** Pakai sendiri selama 30 hari. Catat apa yang mengganggu, perbaiki dulu.
3. **Fase 3:** Lapisan game: hadiah yang user tentukan sendiri, ikon pixel yang lebih baik, efek suara opsional.
4. **Fase 4:** Kemasan portofolio: demo publik dengan data contoh, README dengan GIF, dan catatan keputusan teknis (kenapa task dan kebiasaan satu entitas tapi dihitung berbeda, kenapa kuartal dan setengah tahun dibuang, bagaimana tema dipisah dari komponen).
