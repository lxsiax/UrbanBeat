import { Head, Link } from '@inertiajs/react';
import Header from '@/components/festival/Header';
import { HiTicket, HiShoppingBag, HiUsers, HiChartBar } from "react-icons/hi2";

export default function Dashboard({ stats }: any) {
    const modulos = [
        { 
            nombre: 'Gestión de Entradas', 
            desc: 'Control de stock y precios de entradas.', 
            icon: <HiTicket />, 
            href: '/admin/entradas',
            color: 'bg-pink-500' 
        },
        { 
            nombre: 'Merchandising', 
            desc: 'Ropa y accesorios del festival', 
            icon: <HiShoppingBag />, 
            href: '#', 
            color: 'bg-gray-400' 
        },
        { 
            nombre: 'Usuarios', 
            desc: 'Lista de clientes registrados.', 
            icon: <HiUsers />, 
            href: '#', 
            color: 'bg-black' 
        },
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            <Head title="Panel de Control - UrbanBeat" />
            <Header />

            <main className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-5xl font-black italic uppercase italic">Panel de <span className="text-pink-500">Gestión</span></h1>
                    <p className="text-gray-500 font-bold uppercase text-xs tracking-widest mt-2">Bienvenido Admin</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {modulos.map((modulo, i) => (
                        <Link 
                            key={i} 
                            href={modulo.href}
                            className="group bg-white p-8 rounded-[30px] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                        >
                            <div className={`${modulo.color} text-white w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner`}>
                                {modulo.icon}
                            </div>
                            <h2 className="text-2xl font-black uppercase italic mb-2">{modulo.nombre}</h2>
                            <p className="text-gray-500 text-sm font-medium">{modulo.desc}</p>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}