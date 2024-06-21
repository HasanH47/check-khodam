# Check Khodam

Check Khodam adalah aplikasi web sederhana yang memungkinkan pengguna untuk memasukkan nama dan mendapatkan hasil Khodam yang dihasilkan dari daftar yang ada. Aplikasi ini menyimpan hasil yang dihasilkan dalam tabel dan memungkinkan pengguna untuk mencari, memfilter, dan melakukan paginasi pada data. Desainnya mengadopsi tema kartun yang menarik.

## Fitur

- Memasukkan nama dan mendapatkan hasil Khodam.
- Menyimpan hasil dalam tabel.
- Pencarian dan filter data di tabel.
- Paginasi data dengan tombol navigasi.
- Penyimpanan data di localStorage.
- Desain tema kartun yang menarik.

## Teknologi yang Digunakan

- HTML
- CSS
- JavaScript

## Cara Menggunakan

1. Clone repository ini:

    ```bash
    git clone https://github.com/HasanH47/check-khodam.git
    ```

2. Buka file `index.html` di browser.

3. Masukkan nama di input field dan klik tombol "Check" untuk mendapatkan hasil Khodam.

4. Hasil akan ditampilkan dan disimpan dalam tabel di bawah.

5. Gunakan fitur pencarian untuk mencari data dalam tabel.

6. Gunakan tombol paginasi untuk menavigasi data.

## Struktur Proyek

```plaintext
.
├── assets
│   ├── css
│   │   └── style.css
│   ├── js
│   │   └── main.js
│   └── khodam
│       └── list.txt
├── .gitignore
├── LICENSE
├── index.html
└── README.md
```

- `index.html`: Berkas HTML utama.
- `assets/css/style.css`: Berkas CSS untuk styling.
- `assets/js/main.js`: Berkas JavaScript untuk logika aplikasi.
- `assets/khodam/list.txt`: Berkas teks yang berisi daftar Khodam.