import { Head, router } from '@inertiajs/react';
import Header from '@/components/festival/Header';
import { HiOutlineTrash, HiOutlineShieldCheck, HiOutlineUserGroup, HiOutlineNoSymbol, HiOutlineCheckCircle } from "react-icons/hi2";

interface Usuario {
    id: number;
    name: string;
    apellidos: string | null;
    email: string;
    role_id: number;
    baneado: boolean;
    created_at: string;
}

interface Props {
    usuarios: Usuario[];
}

export default function Index({ usuarios }: Props) {
    
    const cambiarRol = (id: number, currentRoleId: number) => {
        const nuevoRol = currentRoleId === 1 ? 2 : 1; 
        if (confirm('¿Seguro que quieres cambiar el rango de este usuario?')) {
            router.patch(`/admin/usuarios/${id}/rol`, { role_id: nuevoRol });
        }
    };

    const alternarBan = (id: number) => {
        if (confirm('¿Seguro que quieres cambiar el estado de baneo de este usuario?')) {
            router.post(`/usuarios/${id}/banear`, {}, { preserveScroll: true });
        }
    };

    const eliminarUsuario = (id: number) => {
        if (confirm('¿Estás completamente seguro de eliminar este usuario del sistema?')) {
            router.delete(`/admin/usuarios/${id}`);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Head title="Gestión de Usuarios - UrbanBeat" />
            <Header />

            <main className="flex-grow pt-44 pb-20 px-6 max-w-7xl mx-auto w-full">
                
                <div className="mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                    <div>
                        <span className="bg-black text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                            Control de personal
                        </span>
                        <h1 className="text-6xl font-black italic uppercase tracking-tighter mt-4 leading-none">
                            Gestión de <span className="text-pink-500">Usuarios</span>
                        </h1>
                    </div>
                    <div className="bg-white border-2 border-black p-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3">
                        <HiOutlineUserGroup size={24} className="text-pink-500" />
                        <span className="text-xs font-black uppercase tracking-wider">
                            Total: {usuarios.length} Registrados
                        </span>
                    </div>
                </div>

                <div className="bg-white border-2 border-black rounded-[24px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="bg-black text-white text-[11px] font-black uppercase tracking-widest border-b-2 border-black">
                                    <th className="p-5">Usuario / Correo</th>
                                    <th className="p-5">Rol Actual</th>
                                    <th className="p-5">Estado Chat</th>
                                    <th className="p-5">Fecha Registro</th>
                                    <th className="p-5 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-black text-sm font-bold text-black">
                                {usuarios.map((usr) => (
                                    <tr key={usr.id} className="hover:bg-gray-50/80 transition-colors">
                                        <td className="p-5">
                                            <div className="flex items-center gap-2">
                                                <div className="font-black text-base uppercase italic">
                                                    {usr.name} {usr.apellidos || ''}
                                                </div>
                                                {usr.baneado && (
                                                    <span className="bg-red-500 text-white border border-black text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                                                        Baneado
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-xs text-gray-400 font-normal mt-0.5">{usr.email}</div>
                                        </td>
                                        <td className="p-5">
                                            <span className={`inline-block border-2 border-black px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                                                usr.role_id === 1 ? 'bg-yellow-400' : 'bg-cyan-400'
                                            }`}>
                                                {usr.role_id === 1 ? 'Admin' : 'Cliente'}
                                            </span>
                                        </td>
                                        <td className="p-5">
                                            <span className={`inline-block border-2 border-black px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                                                usr.baneado ? 'bg-red-400' : 'bg-green-400'
                                            }`}>
                                                {usr.baneado ? 'Baneado' : 'Activo'}
                                            </span>
                                        </td>
                                        <td className="p-5 text-xs font-mono text-gray-500">
                                            {new Date(usr.created_at).toLocaleDateString('es-ES', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </td>
                                        <td className="p-5 text-right">
                                            <div className="flex justify-end gap-3">
                                                {usr.role_id !== 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => alternarBan(usr.id)}
                                                        className={`p-2.5 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all ${
                                                            usr.baneado ? 'bg-green-400' : 'bg-orange-400'
                                                        }`}
                                                        title={usr.baneado ? "Desbanear del chat" : "Banear del chat"}
                                                    >
                                                        {usr.baneado ? <HiOutlineCheckCircle size={18} /> : <HiOutlineNoSymbol size={18} />}
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => cambiarRol(usr.id, usr.role_id)}
                                                    className="p-2.5 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                                                    title="Alternar rango de usuario"
                                                >
                                                    <HiOutlineShieldCheck size={18} />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => eliminarUsuario(usr.id)}
                                                    className="p-2.5 bg-pink-500 text-white border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                                                    title="Eliminar usuario del sistema"
                                                >
                                                    <HiOutlineTrash size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </main>
        </div>
    );
}