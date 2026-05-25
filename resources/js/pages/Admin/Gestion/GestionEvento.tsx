import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Header from '@/components/festival/Header';
import Footer from '@/components/festival/Footer';
import { HiOutlineCalendarDays, HiOutlineInformationCircle, HiOutlineMegaphone, HiOutlineCog6Tooth, HiOutlineClock } from "react-icons/hi2";

interface Dia {
    id: number;
    fecha: string;
}

interface Props {
    fecha_actual: string;
    duracion_actual: number;
    dias: Dia[];
}

export default function GestionEvento({ fecha_actual, duracion_actual, dias }: Props) {
    const [tabActiva, setTabActiva] = useState<'evento' | 'noticias'>('evento');

    const { data, setData, patch, processing, errors } = useForm({
        fecha_inicio: fecha_actual,
        duracion_dias: duracion_actual,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch('/admin/evento/fecha', {
            preserveScroll: true,
        });
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Head title="Gestión del Evento - UrbanBeat" />
            <Header />

            <main className="flex-grow pt-44 pb-20 px-4 sm:px-6 max-w-7xl mx-auto w-full">
                
                <div className="mb-10">
                    <span className="bg-black text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                        Panel de Configuración
                    </span>
                    <h1 className="text-4xl sm:text-6xl font-black italic uppercase tracking-tighter mt-4 leading-none text-black">
                        Gestión del <span className="text-pink-500">Festival</span>
                    </h1>
                </div>

                <div className="flex gap-4 mb-12 border-b-4 border-black pb-4">
                    <button
                        onClick={() => setTabActiva('evento')}
                        className={`flex items-center gap-2 px-6 py-3 border-3 border-black font-black uppercase tracking-tight text-sm sm:text-base rounded-xl transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
                            tabActiva === 'evento' 
                            ? 'bg-black text-white' 
                            : 'bg-white text-black hover:bg-gray-100'
                        }`}
                    >
                        <HiOutlineCog6Tooth className="size-5" />
                        Info del Evento
                    </button>

                    <button
                        onClick={() => setTabActiva('noticias')}
                        className={`flex items-center gap-2 px-6 py-3 border-3 border-black font-black uppercase tracking-tight text-sm sm:text-base rounded-xl transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
                            tabActiva === 'noticias' 
                            ? 'bg-pink-500 text-white' 
                            : 'bg-white text-black hover:bg-gray-100'
                        }`}
                    >
                        <HiOutlineMegaphone className="size-5" />
                        Noticias
                    </button>
                </div>

                {tabActiva === 'evento' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
                        
                        <div className="lg:col-span-2">
                            <form onSubmit={submit} className="bg-white border-4 border-black p-6 sm:p-8 rounded-[30px] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-black mb-3">
                                            Fecha de Inicio del Festival
                                        </label>
                                        <div className="relative">
                                            <HiOutlineCalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500 size-6" />
                                            <input 
                                                type="date" 
                                                value={data.fecha_inicio}
                                                onChange={e => setData('fecha_inicio', e.target.value)}
                                                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-black rounded-2xl text-lg font-bold focus:ring-0 focus:border-pink-500 transition-colors"
                                            />
                                        </div>
                                        {errors.fecha_inicio && <p className="text-red-500 text-xs font-black mt-2 uppercase">{errors.fecha_inicio}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-black mb-3">
                                            Duración del Festival (Días)
                                        </label>
                                        <div className="relative">
                                            <HiOutlineClock className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500 size-6" />
                                            <input 
                                                type="number" 
                                                min="1"
                                                max="10"
                                                value={data.duracion_dias}
                                                onChange={e => setData('duracion_dias', parseInt(e.target.value) || 1)}
                                                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-black rounded-2xl text-lg font-bold focus:ring-0 focus:border-pink-500 transition-colors"
                                            />
                                        </div>
                                        {errors.duracion_dias && <p className="text-red-500 text-xs font-black mt-2 uppercase">{errors.duracion_dias}</p>}
                                    </div>
                                </div>

                                <div className="bg-pink-50 border-2 border-black p-4 rounded-2xl mb-8 flex gap-3">
                                    <HiOutlineInformationCircle className="size-8 text-pink-500 shrink-0" />
                                    <p className="text-xs font-bold text-black leading-tight">
                                        Al guardar, se recalculará automáticamente el calendario del festival. Si aumentas los días, se crearán fechas nuevas; si los reduces, se eliminarán los días sobrantes desde el final.
                                    </p>
                                </div>

                                <button 
                                    disabled={processing}
                                    className="w-full bg-pink-500 text-white border-4 border-black py-4 rounded-2xl font-black uppercase italic tracking-tighter text-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
                                >
                                    {processing ? 'Actualizando Sistema...' : 'Guardar Configuración Maestra'}
                                </button>
                            </form>
                        </div>

                        <div className="lg:col-span-1">
                            <h2 className="text-xl font-black uppercase italic text-black mb-4">
                                Días en Sistema ({dias.length})
                            </h2>
                            <div className="space-y-3">
                                {dias.map((dia, index) => (
                                    <div key={dia.id} className="bg-white border-2 border-black p-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        <p className="text-[10px] font-black text-pink-500 uppercase tracking-widest">
                                            Día {index + 1}
                                        </p>
                                        <p className="text-lg font-black text-black">
                                            {new Date(dia.fecha).toLocaleDateString('es-ES', { 
                                                weekday: 'long', 
                                                day: 'numeric', 
                                                month: 'short' 
                                            })}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {tabActiva === 'noticias' && (
                    <div className="bg-white border-4 border-black p-12 rounded-[30px] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-center max-w-2xl mx-auto py-16">
                        <div className="bg-pink-100 border-2 border-black p-4 rounded-full size-16 flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <HiOutlineMegaphone className="size-8 text-pink-500" />
                        </div>
                        <h3 className="text-3xl font-black uppercase italic tracking-tight text-black">
                            Módulo de Noticias
                        </h3>
                        <p className="text-gray-600 font-bold text-sm mt-4 max-w-md mx-auto leading-relaxed">
                            Esta sección está reservada para la creación y publicación de novedades, comunicados de última hora y confirmaciones del cartel.
                        </p>
                        <div className="mt-8 inline-block bg-black text-white px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest">
                            Próximamente disponible
                        </div>
                    </div>
                )}

            </main>
            <Footer />
        </div>
    );
}