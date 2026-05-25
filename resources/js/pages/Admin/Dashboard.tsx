import { Head } from '@inertiajs/react';
import Header from '@/components/festival/Header';
import BotonDashboard from '@/components/festival/BotonDashboard';
import { 
    HiTicket, 
    HiShoppingBag, 
    HiUsers, 
    HiStar, 
    HiOutlineDocumentText, 
    HiOutlineCalendarDays,
    HiOutlineMegaphone // Importamos el icono
} from "react-icons/hi2";

export default function Dashboard() {
    const botones = [
        {
            nombre: 'Gestión de Entradas',
            desc: 'Control de stock, precios y tipos de entrada.',
            icon: <HiTicket strokeWidth={2} />,
            href: '/admin/entradas',
            color: 'bg-pink-500'
        },
        {
            nombre: 'Gestión de Artistas',
            desc: 'Control del cartel, fotos y orden.',
            icon: <HiStar strokeWidth={2} />,
            href: '/admin/artistas',
            color: 'bg-yellow-400'
        },
        {
            nombre: ' Gestión de Productos',
            desc: 'Control de stock de ropa, accesorios y merch oficial.',
            icon: <HiShoppingBag strokeWidth={2} />,
            href: '/admin/productos',
            color: 'bg-cyan-400'
        },
        {
            nombre: 'Gestión Usuarios',
            desc: 'Control de clientes, roles y permisos.',
            icon: <HiUsers strokeWidth={2} />,
            href: '/admin/usuarios',
            color: 'bg-black'
        },
        {
            nombre: 'Gestión Facturas',
            desc: 'Historial de facturas.',
            icon: <HiOutlineDocumentText strokeWidth={2} />,
            href: '/admin/facturas',
            color: 'bg-green-500'
        },
        {
            nombre: 'Gestión del Evento',
            desc: 'Cambiar información relevante del evento',
            icon: <HiOutlineCalendarDays strokeWidth={2} />,
            href: '/admin/evento',
            color: 'bg-orange-500'
        },
        {
            nombre: 'Gestión de Noticias',
            desc: 'Publicación de comunicados y novedades del festival.',
            icon: <HiOutlineMegaphone strokeWidth={2} />,
            href: '/admin/noticias',
            color: 'bg-indigo-500'
        },
    ];

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Head title="Panel de Control - UrbanBeat" />
            <Header />

            <main className="flex-grow pt-44 pb-20 px-6 max-w-7xl mx-auto w-full">
                <div className="mb-16">
                    <span className="bg-black text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                        Panel de administrador
                    </span>
                    <h1 className="text-7xl font-black italic uppercase tracking-tighter mt-4 leading-[0.85]">
                        Panel de
                        <span className="text-pink-500"> Gestión</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {botones.map((boton, i) => (
                        <BotonDashboard
                            key={i}
                            {...boton}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}