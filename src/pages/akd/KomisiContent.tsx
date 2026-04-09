import React, { useEffect, useState } from 'react';
import { User, FileText } from 'lucide-react';
import { fetchKomisiInfo, getImageUrl } from '../../services/api';
import type { KomisiInfo } from '../../services/api';

interface KomisiContentProps {
    id?: string;
}

const KomisiContent: React.FC<KomisiContentProps> = ({ id }) => {
    const [info, setInfo] = useState<KomisiInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetchKomisiInfo(id)
            .then(data => setInfo(data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="w-full animate-pulse border border-gray-100 rounded-2xl p-8 bg-white shadow-sm">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-4 mx-auto" />
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-12 mx-auto" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <div key={i} className="bg-gray-100 h-64 rounded-xl" />
                    ))}
                </div>
            </div>
        );
    }

    if (!info) {
        return (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center py-24">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="text-gray-400" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Belum Ada Data</h3>
                <p className="text-gray-500">Data Komisi belum tersedia untuk masa jabatan ini.</p>
            </div>
        );
    }

    // Grouping members based on roles or simply showing all
    // Usually Ketua, Wakil Ketua, Sekretaris, Anggota
    const ketua = info.anggota.filter(a => a.jabatan.toLowerCase().includes('ketua') && !a.jabatan.toLowerCase().includes('wakil'));
    const wakil = info.anggota.filter(a => a.jabatan.toLowerCase().includes('wakil ketua'));
    const sekretaris = info.anggota.filter(a => a.jabatan.toLowerCase().includes('sekretaris'));
    const anggota = info.anggota.filter(a =>
        !a.jabatan.toLowerCase().includes('ketua') &&
        !a.jabatan.toLowerCase().includes('sekretaris')
    );

    return (
        <div className="animate-fade-in w-full">
            {/* Header section */}
            <div className="mb-10 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 tracking-tight">
                    {info.namaKomisi}
                </h1>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 text-red-700 rounded-full text-sm font-bold border border-red-100">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                    Masa Jabatan {info.masaJabatan}
                </div>
            </div>

            {info.deskripsi && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10 flex gap-4 text-gray-600 leading-relaxed text-sm md:text-base">
                    <FileText className="text-red-500 flex-shrink-0" size={24} />
                    <div className="whitespace-pre-line">{info.deskripsi}</div>
                </div>
            )}

            {info.anggota.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center py-20">
                    <p className="text-gray-500 font-medium">Belum ada data anggota Komisi untuk masa jabatan ini.</p>
                </div>
            ) : (
                <div className="space-y-12">
                    {ketua.length > 0 && <AnggotaGroup title="Ketua" anggota={ketua} />}
                    {wakil.length > 0 && <AnggotaGroup title="Wakil Ketua" anggota={wakil} />}
                    {sekretaris.length > 0 && <AnggotaGroup title="Sekretaris" anggota={sekretaris} />}
                    {anggota.length > 0 && <AnggotaGroup title="Anggota" anggota={anggota} />}
                </div>
            )}
        </div>
    );
};

const AnggotaGroup: React.FC<{ title: string; anggota: any[] }> = ({ title, anggota }) => {
    return (
        <div>
            <h3 className="text-lg font-black text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-red-500"></span>
                {title.toUpperCase()}
                <span className="flex-1 h-px bg-gray-200"></span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {anggota.map((person) => (
                    <div key={person.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                        <div className="w-full aspect-[3/4] bg-gray-100 overflow-hidden relative">
                            {person.imageUrl ? (
                                <img
                                    src={getImageUrl(person.imageUrl)}
                                    alt={person.name}
                                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=f1f5f9&color=64748b&size=200`;
                                    }}
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50">
                                    <User size={48} className="text-gray-300 mb-3" />
                                </div>
                            )}
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                                <p className="text-[10px] font-black tracking-wider text-red-600 uppercase">{person.jabatan}</p>
                            </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <h4 className="font-bold text-gray-900 group-hover:text-red-700 transition-colors line-clamp-2 leading-tight mb-2">
                                {person.name}
                            </h4>
                            <div className="mt-auto pt-3 border-t border-gray-100">
                                <p className="text-xs font-bold text-gray-500 tracking-wide uppercase px-2.5 py-1 bg-gray-50 rounded inline-block">
                                    {person.faction || 'Fraksi Tidak Diketahui'}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KomisiContent;
