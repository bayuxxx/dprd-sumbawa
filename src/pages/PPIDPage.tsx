import React from 'react';
import { Link, useParams } from 'react-router-dom';

const ppidMenu = [
    { slug: 'profil', title: 'Profil PPID' },
    { slug: 'struktur-organisasi', title: 'Struktur Organisasi' },
    { slug: 'formulir-permohonan', title: 'Formulir Permohonan Informasi Publik' },
    { slug: 'formulir-keberatan', title: 'Formulir Pengajuan Keberatan' },
    { slug: 'maklumat-pelayanan', title: 'Maklumat Pelayanan' },
    { slug: 'data-anggaran', title: 'Data Anggaran' },
];

const PPIDPage: React.FC = () => {
    const { slug } = useParams<{ slug?: string }>();
    const activeSlug = slug || 'profil';

    const activeMenuTitle = ppidMenu.find(m => m.slug === activeSlug)?.title || 'Profil PPID';

    return (
        <main className="min-h-screen bg-[#fcfcfc] py-12 md:py-20">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                {/* Breadcrumb */}
                <div className="text-sm text-gray-400 mb-8 flex items-center gap-2">
                    <Link to="/" className="hover:text-red-600 transition-colors">Beranda</Link>
                    <span>/</span>
                    <Link to="/ppid" className={`transition-colors ${!slug ? 'text-gray-700 font-medium' : 'hover:text-red-600'}`}>
                        PPID
                    </Link>
                    {activeSlug !== 'profil' && (
                        <>
                            <span>/</span>
                            <span className="text-gray-700 font-medium">{activeMenuTitle}</span>
                        </>
                    )}
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
                    {/* ── Left Sidebar ── */}
                    <aside className="w-full lg:w-[320px] flex-shrink-0 lg:sticky lg:top-28">
                        {/* Decorative Image Container styling similar to standard theme */}
                        <div className="relative mb-8 w-full aspect-[4/3] max-w-[300px] mx-auto lg:mx-0 group cursor-pointer hidden lg:block">
                            <div className="absolute inset-0 bg-red-500 rounded-3xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500 z-0"></div>
                            <div className="absolute inset-0 bg-red-600 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500 z-0 opacity-80"></div>
                            <div className="absolute inset-2 bg-white rounded-2xl z-10 overflow-hidden shadow-lg shadow-black/10">
                                <img
                                    src="/nano_banana.png"
                                    alt="Gedung DPRD Sumbawa Barat"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    onError={(e) => {
                                        (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541888045653-f7267eb4bd48?auto=format&fit=crop&q=80&w=600';
                                    }}
                                />
                            </div>
                        </div>

                        {/* Side Menu */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            {ppidMenu.map((menu) => (
                                <Link
                                    key={menu.slug}
                                    to={menu.slug === 'profil' ? '/ppid' : `/ppid/${menu.slug}`}
                                    className={`
                                        block px-5 py-4 text-sm font-bold transition-all border-b border-gray-50 last:border-b-0
                                        ${activeSlug === menu.slug
                                            ? 'text-gray-900 bg-gray-50'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }
                                    `}
                                >
                                    {menu.title}
                                </Link>
                            ))}
                        </div>
                    </aside>

                    {/* ── Right Main Content ── */}
                    <section className="flex-1 w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10 tracking-tight font-serif">
                            {activeMenuTitle}
                        </h1>

                        {activeSlug === 'profil' ? (
                            <div className="space-y-8 text-gray-700 leading-relaxed text-sm md:text-base text-justify">
                                <div className="border-l-4 border-red-500 pl-5 py-1 italic font-medium">
                                    Informasi merupakan kebutuhan pokok setiap orang bagi pengembangan pribadi dan lingkungan
                                    sosialnya. Oleh karena itu, hak memperoleh informasi merupakan hak asasi manusia dan
                                    keterbukaan informasi publik. Hak atas Informasi ini menjadi sangat penting, karena makin
                                    terbuka penyelenggaraan negara untuk diawasi publik, penyelenggaraan negara tersebut makin
                                    dapat dipertanggungjawabkan.
                                </div>

                                <p className="clear-both">
                                    <span className="float-left text-6xl md:text-7xl font-bold font-serif pr-3 pt-2 text-gray-900 leading-[0.8]">
                                        P
                                    </span>
                                    emberlakuan Undang-Undang Nomor 14 tahun 2008 tentang Keterbukaan Informasi Publik pada 30 April
                                    2010 merupakan momentum penting dalam mendorong keterbukaan di Indonesia, khususnya di Kabupaten Sumbawa Barat
                                    (Provinsi DKI Jakarta sesuai gambar referensi, kita adaptasi). Undang-Undang ini telah memberikan landasan hukum terhadap hak setiap orang untuk
                                    memperoleh informasi publik di mana setiap Badan Publik mempunyai kewajiban dalam menyediakan
                                    dan melayani permohonan informasi publik secara cepat, akurat, mudah dan berkualitas.
                                </p>

                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-4 mt-12">Tanggung Jawab</h2>
                                    <ol className="list-decimal list-outside ml-5 space-y-3">
                                        <li className="pl-2">PPID pada Perangkat Daerah bertanggung jawab di bidang layanan informasi publik yang meliputi proses penyimpanan, pendokumentasian, penyediaan pelayanan dan pengumuman informasi yang dapat diakses oleh publik sesuai dengan ketentuan peraturan perundang-undangan.</li>
                                        <li className="pl-2">Informasi publik sebagaimana dimaksud pada nomor 1 dikumpulkan dengan cara pendataan informasi publik yang ada pada Perangkat Daerah untuk dilakukan pembuatan dan pemutakhiran daftar informasi publik paling sedikit 1 (satu) kali dalam 1 (satu) bulan.</li>
                                    </ol>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-4 mt-8">Tugas</h2>
                                    <ol className="list-decimal list-outside ml-5 space-y-3">
                                        <li className="pl-2">Memberikan layanan informasi kepada publik.</li>
                                        <li className="pl-2">Menyimpan, mendokumentasikan, menyediakan dan memberi pelayanan informasi kepada publik.</li>
                                        <li className="pl-2">Membantu PPID Provinsi (atau Kabupaten) didalam melaksanakan tugasnya.</li>
                                        <li className="pl-2">Melakukan verifikasi bahan informasi publik.</li>
                                        <li className="pl-2">Melakukan pemutakhiran informasi dan dokumentasi.</li>
                                        <li className="pl-2">Menyediakan informasi dan dokumentasi untuk di akses oleh pemohon informasi publik.</li>
                                        <li className="pl-2">Melakukan inventarisasi informasi yang dikecualikan untuk selanjutnya dilakukan uji konsekuensi.</li>
                                        <li className="pl-2">Membuat laporan pelayanan informasi.</li>
                                        <li className="pl-2">Melaksanakan tugas lainnya yang diperintahkan oleh Atasan PPID.</li>
                                    </ol>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-4 mt-8">Wewenang</h2>
                                    <ol className="list-decimal list-outside ml-5 space-y-3">
                                        <li className="pl-2">Mengoordinasikan pelayanan informasi publik pada Perangkat Daerah dan/atau pejabat fungsional yang menjadi cakupan kerjanya.</li>
                                        <li className="pl-2">Menetapkan/menentukan suatu informasi publik dapat diakses publik atau tidak berdasarkan pengujian tentang konsekuensi.</li>
                                        <li className="pl-2">Menolak permohonan informasi publik secara tertulis apabila informasi publik yang dimohon termasuk infomasi yang dikecualikan/rahasia dengan disertai alasan serta pemberitahuan tentang hak dan tata cara bagi pemohon informasi publik untuk mengajukan keberatan atas penolakan tersebut.</li>
                                        <li className="pl-2">Membuat, memelihara dan/atau memutakhirkan daftar informasi publik secara berkala paling sedikit 1 (satu) kali dalam 1 (satu) bulan.</li>
                                        <li className="pl-2">Meminta dan memperoleh informasi dari unit kerja/komponen satuan kerja yang menjadi cakupan kerjanya.</li>
                                    </ol>
                                </div>
                            </div>
                        ) : (
                            <div className="py-20 text-center">
                                <div className="text-6xl mb-4">🚧</div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Halaman Sedang Dalam Pengembangan</h2>
                                <p className="text-gray-500">Konten untuk menu <span className="font-semibold text-gray-700">{activeMenuTitle}</span> akan segera tersedia.</p>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </main>
    );
};

export default PPIDPage;
