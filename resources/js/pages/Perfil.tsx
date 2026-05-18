import { Head } from '@inertiajs/react';
import Header from '@/components/festival/Header';
import Footer from '@/components/festival/Footer';
import { HiOutlineUser, HiOutlineEnvelope, HiOutlineCalendar } from "react-icons/hi2";

interface Props {
    usuario: any;
}

export default function Perfil({ usuario }: Props) {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Head title={`Mi Perfil - ${usuario.name} ${usuario.apellidos || ''}`} />
            <Header />

            <main className="flex-grow pt-40 pb-20 px-6">
                <div className="max-w-2xl mx-auto">
                    
                    <h1 className="text-5xl font-black italic uppercase tracking-tighter text-black mb-12">
                        Mi <span className="text-pink-500">Cuenta</span>
                    </h1>

                    <div className="bg-white p-10 rounded-[30px] border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] space-y-8">
                        
                        <div className="flex items-center gap-4 border-black pb-10">
                            <div className="bg-pink-500 text-white p-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <HiOutlineUser size={32} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Cuenta UrbanBeat</p>
                                <h2 className="text-3xl font-black uppercase italic break-words">
                                    {usuario.name} {usuario.apellidos || ''}
                                </h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 border-2 border-black rounded-2xl p-5">
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">
                                    <HiOutlineEnvelope size={14} className="text-black" />
                                    Correo Electrónico
                                </div>
                                <p className="font-bold text-lg text-black break-words">{usuario.email}</p>
                            </div>

                            <div className="bg-gray-50 border-2 border-black rounded-2xl p-5">
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">
                                    <HiOutlineCalendar size={14} className="text-black" />
                                    Miembro desde
                                </div>
                                <p className="font-bold text-lg text-black">
                                    {new Date(usuario.created_at).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className="pt-4">
                            <h3 className="text-sm font-black uppercase tracking-widest mb-4">Mis Entradas y Pedidos</h3>
                            <div className="border-2 border-dashed border-black/20 rounded-2xl p-8 text-center text-gray-400 font-black text-xs uppercase tracking-wider bg-gray-50/50">
                                Cuando haga el pago :C 
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}