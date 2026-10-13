import { useEffect, useState } from "react";

const Help = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        className="help-fab"
        onClick={() => setOpen(true)}
        aria-label="Buka panduan penggunaan"
        title="Panduan"
      >
        ?
      </button>

      {open && (
        <div className="help-backdrop" onClick={() => setOpen(false)}>
          <aside
            className="help-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Panduan penggunaan"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="help-head">
              <h2 className="pixel text-[10px]" style={{ color: "var(--gold)" }}>
                Panduan
              </h2>
              <button
                className="btn"
                onClick={() => setOpen(false)}
                aria-label="Tutup panduan"
                autoFocus
              >
                <span className="pixel text-[8px]">Tutup</span>
              </button>
            </header>

            <div className="help-body">
              <section>
                <h3>Cara kerja singkat</h3>
                <p>
                  Semua yang kamu kerjakan menghasilkan <b>XP</b>. Selesaikan
                  misi, rutinkan kebiasaan, dan tuntaskan tujuan untuk naik
                  level. Progres selalu tampil pada bar di bagian atas.
                </p>
              </section>

              <section>
                <h3>Beda Misi Harian &amp; Kebiasaan</h3>
                <ul>
                  <li>
                    <b>Misi Harian</b> — tugas sekali jalan untuk hari ini.
                    Setelah dicentang, selesai. Daftarnya direset tiap hari, dan
                    yang lampau pindah ke bagian "Hari sebelumnya".
                  </li>
                  <li>
                    <b>Kebiasaan</b> — kegiatan berulang yang diukur per minggu,
                    bukan berturut-turut. Tiap check-in <b>+8 XP</b>. Kotak kecil
                    menunjukkan berapa kali kamu melakukannya minggu ini dari
                    target (3/5/7x). Bolong sehari tidak ada hukuman.
                  </li>
                </ul>
              </section>

              <section>
                <h3>Cara menambah</h3>
                <ul>
                  <li>
                    <b>Misi</b> — di tab Misi, tulis judul, pilih tingkat
                    kesulitan dan kategori, lalu tekan tombol <b>+</b>.
                  </li>
                  <li>
                    <b>Kebiasaan</b> — di tab Kebiasaan, tekan tombol <b>+</b>,
                    isi nama, kategori, dan target per minggu, lalu <b>Tambah</b>.
                  </li>
                  <li>
                    <b>Tujuan</b> — di tab Tujuan, tekan tombol <b>+</b>, isi
                    judul dan (opsional) langkah kecil satu per baris, lalu{" "}
                    <b>Buat</b>.
                  </li>
                </ul>
              </section>

              <section>
                <h3>Mengedit &amp; menghapus</h3>
                <ul>
                  <li>
                    <b>Misi</b> — centang kotak untuk selesai atau batalkan;
                    ikon tempat sampah untuk menghapus.
                  </li>
                  <li>
                    <b>Kebiasaan</b> — check-in sekali per hari; ikon tempat
                    sampah untuk menghapus.
                  </li>
                  <li>
                    <b>Tujuan</b> — tekan <b>Ubah</b> untuk masuk mode edit
                    (tambah atau hapus langkah), lalu <b>Selesai</b>. Tempat
                    sampah menghapus tujuan.
                  </li>
                </ul>
              </section>

              <section>
                <h3>Tujuan Besar &amp; langkah kecil</h3>
                <p>
                  Rincikan tujuan besar menjadi langkah-langkah kecil. Tiap
                  langkah yang dicentang memberi <b>+5 XP</b>, dan saat semua
                  langkah selesai kamu mendapat <b>bonus XP</b> tujuan sebagai
                  hadiah. Bar progres dihitung dari jumlah langkah yang selesai.
                </p>
              </section>

              <section>
                <h3>XP &amp; Level</h3>
                <ul>
                  <li>Misi: Mudah 10, Sedang 25, Sulit 50 XP.</li>
                  <li>Kebiasaan: 8 XP per check-in.</li>
                  <li>Langkah tujuan: 5 XP, plus bonus saat tujuan tuntas.</li>
                  <li>
                      Level butuh XP makin banyak tiap naik: mulai 100, lalu
                      150, 200, dst.
                    </li>
                  <li>
                    Membatalkan centang mengurangi XP yang sama — supaya tidak
                    bisa curang.
                  </li>
                </ul>
              </section>

              <section>
                <h3>Kategori &amp; Prioritas</h3>
                <p>
                  Kategori: Kerja, Kesehatan, Belajar, Pribadi, Keuangan.
                  Prioritas (khusus Tujuan): Rendah, Sedang, Tinggi.
                </p>
              </section>

              <section>
                <h3>Menyimpan &amp; reset data</h3>
                <p>
                  Data tersimpan otomatis di peramban ini. Untuk mulai dari nol,
                  buka konsol peramban (F12) lalu jalankan:{" "}
                  <code>
                    localStorage.removeItem("zulk-coin:productivity:v1");
                    location.reload();
                  </code>
                </p>
              </section>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default Help;
