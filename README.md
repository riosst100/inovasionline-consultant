# Inovasi Online

Website company profile + platform pengajuan proyek ("joki proyek") untuk Inovasi Online. Dibangun dengan Next.js (App Router), Prisma + SQLite, dan NextAuth.

## Fitur

- Landing page company profile (layanan, portofolio, tim programmer, cara kerja)
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
npm install
npm run db:seed   # membuat akun admin & demo, contoh portofolio & programmer
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

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
- `prisma/seed.ts` — data awal (admin, demo klien, portofolio, programmer)

## Database

Menggunakan SQLite lokal (`dev.db`) melalui Prisma driver adapter `better-sqlite3`. Untuk produksi, ganti provider di `prisma/schema.prisma` (mis. PostgreSQL) dan sesuaikan adapter di `src/lib/prisma.ts`.

## Konten yang Perlu Diisi Sebelum Launch

Landing page ditulis dengan positioning jujur untuk perusahaan baru (lihat `src/lib/i18n/dictionaries.ts`). Beberapa tempat masih berisi placeholder yang wajib diganti dengan data nyata sebelum go-live:

- `about.badge` (dictionaries.ts) — `[TAHUN] Gabungan Pengalaman Engineering` → isi angka tahun pengalaman yang sebenarnya.
- Tabel `Programmer` (via `/admin/team`) — data seed berisi `[FOUNDER NAME]` sebagai placeholder. Ganti dengan profil pendiri/tim asli.
- Tabel `PortfolioItem` (via `/admin/portfolio`) — data seed berisi satu case study placeholder dengan field `[PROJECT TITLE]`, `[CLIENT NAME OR: Confidential Client, ...]`, dst. Isi dengan proyek nyata; kosongkan field `outcome` jika belum ada hasil terukur yang bisa dibagikan — jangan mengarang angka.
