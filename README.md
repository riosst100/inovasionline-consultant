# Inovasi Online

Website company profile + platform pengajuan proyek untuk Inovasi Online, studio custom software solutions. Dibangun dengan Next.js (App Router), Prisma + SQLite, dan NextAuth.

## Fitur

- Landing page company profile (layanan, portofolio, cara kerja)
- Registrasi & login klien
- Login admin terpisah (`/login/admin`)
- Klien dapat mengajukan proyek baru
- Admin mengirim penawaran (estimasi waktu, budget, scope of work)
- Klien dapat menerima, menolak, atau negosiasi penawaran
- Negosiasi dua arah (klien <-> admin) per penawaran
- Tombol chat langsung ke WhatsApp
- Link ke LinkedIn perusahaan

## Menjalankan Proyek

```bash
npm install       # otomatis menjalankan `prisma generate` lewat postinstall
npm run db:seed   # membuat akun admin & demo
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

> Kalau install dijalankan dengan `--ignore-scripts` (umum di beberapa setup CI/hosting), jalankan `npx prisma generate` secara manual sebelum `npm run db:seed` atau `npm run build` — tanpa ini akan muncul error `Cannot find module '../src/generated/prisma/client'` karena folder tersebut memang di-generate saat install, bukan disimpan di git (lihat `.gitignore`).

## Akun Demo (setelah seed)

| Peran  | Email                     | Password      |
|--------|---------------------------|---------------|
| Admin  | admin@inovasionline.id    | admin12345    |
| Klien  | client@demo.com           | client12345   |

## Konfigurasi

Edit `.env`:

- `NEXT_PUBLIC_WHATSAPP_NUMBER` — nomor WhatsApp admin (format `62xxxxxxxxxx`)
- `NEXT_PUBLIC_LINKEDIN_URL` — URL halaman LinkedIn perusahaan
- `AUTH_SECRET` — secret NextAuth (sudah digenerate, ganti untuk produksi)

## Struktur

- `src/app` — halaman (landing page, auth, dashboard klien, dashboard admin)
- `src/lib/actions` — Server Actions (auth, project/offer/negosiasi)
- `src/lib/auth.ts` / `auth.config.ts` — konfigurasi NextAuth (dipisah agar middleware tetap Edge-compatible)
- `prisma/schema.prisma` — skema database
- `prisma/seed.ts` — data awal (admin, demo klien)

## Database

Menggunakan SQLite lokal (`dev.db`) melalui Prisma driver adapter `better-sqlite3`. Untuk produksi, ganti provider di `prisma/schema.prisma` (mis. PostgreSQL) dan sesuaikan adapter di `src/lib/prisma.ts`.

## Konten yang Perlu Diisi Sebelum Launch

- Section Team saat ini dihapus dari landing page. Tabel `Programmer` dan halaman `/admin/team` masih ada di kode kalau section ini mau diaktifkan lagi nanti — tinggal tambahkan data lewat `/admin/team` dan render ulang section-nya di `src/app/page.tsx`.
- Section Portfolio otomatis tersembunyi selama tabel `PortfolioItem` kosong. Tambahkan case study nyata lewat `/admin/portfolio` agar section ini muncul kembali di landing page; kosongkan field `outcome` jika belum ada hasil terukur yang bisa dibagikan — jangan mengarang angka.
