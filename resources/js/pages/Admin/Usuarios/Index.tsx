import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import Header from '@/components/festival/Header';
import AlertBonito from '@/components/festival/AlertBonito';
import { 
    HiOutlineShieldCheck, 
    HiOutlineUserGroup, 
    HiOutlineNoSymbol, 
    HiOutlineCheckCircle,
    HiOutlineUserMinus,
    HiOutlineUserPlus
} from "react-icons/hi2";

interface Usuario {
    id: number;
    name: string;
    apellidos: string | null;
    email: string;
    role_id: number;
    baneado: boolean;
    acceso_permitido: boolean;
    created_at: string;
}

interface Props {
    usuarios: Usuario[];
}

export default function Index({ usuarios }: Props) {
    const [alertConfig, setAlertConfig] = useState<{
        isOpen: boolean;
        titulo: string;
        mensaje: string;
        onConfirm: () => void;
        colorConfirmar?: string;
    }>({
        isOpen: false,
        titulo: '',
        mensaje: '',
        onConfirm: () => {},
    });

    const cerrarAlert = () => setAlertConfig(prev => ({ ...prev, isOpen: false }));

    const cambiarRol = (id: number, currentRoleId: number) => {
        const nuevoRol = currentRoleId === 1 ? 2 : 1; 
        setAlertConfig({
            isOpen: true,
            titulo: "Cambiar Rango",
            mensaje: "¿Seguro que quieres cambiar el rango de este usuario?",
            colorConfirmar: "bg-yellow-400 text-black",
            onConfirm: () => {
                router.patch(`/admin/usuarios/${id}/rol`);
                cerrarAlert();
            }
        });
    };

    const alternarBan = (id: number, estaBaneado: boolean) => {
        setAlertConfig({
            isOpen: true,
            titulo: estaBaneado ? "Desbanear Chat" : "Banear del Chat",
            mensaje: estaBaneado 
                ? "¿Quieres devolverle a este usuario el acceso al chat general?" 
                : "¿Seguro que quieres banear a este usuario del chat?",
            colorConfirmar: estaBaneado ? "bg-green-400 text-black" : "bg-orange-400 text-black",
            onConfirm: () => {
                router.post(`/usuarios/${id}/banear`, {}, { preserveScroll: true });
                cerrarAlert();
            }
        });
    };

    const alternarAccesoSistema = (id: number, accesoActual: boolean) => {
        setAlertConfig({
            isOpen: true,
            titulo: accesoActual ? "Suspender Acceso" : "Restaurar Acceso",
            mensaje: accesoActual 
                ? "Al suspender a este usuario no podrá acceder a UrbanBeat." 
                : "¿Quieres restaurar los permisos de acceso del usuario a UrbanBeat?",
            colorConfirmar: accesoActual ? "bg-pink-500 text-white" : "bg-purple-400 text-black",
            onConfirm: () => {
                router.patch(`/admin/usuarios/${id}/acceso`, {}, { preserveScroll: true });
                cerrarAlert();
            }
        });
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
                                    <th className="p-5">Acceso Sistema</th>
                                    <th className="p-5">Fecha Registro</th>
                                    <th className="p-5 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-black text-sm font-bold text-black">
                                {usuarios.map((usr) => (
                                    <tr key={usr.id} className={`transition-colors ${!usr.acceso_permitido ? 'bg-gray-100 text-gray-400' : 'hover:bg-gray-50/80'}`}>
                                        <td className="p-5">
                                            <div className="flex items-center gap-2">
                                                <div className={`font-black text-base uppercase italic ${!usr.acceso_permitido ? 'line-through text-gray-400' : ''}`}>
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
                                                usr.role_id === 1 ? 'bg-yellow-400 text-black' : 'bg-cyan-400 text-black'
                                            }`}>
                                                {usr.role_id === 1 ? 'Admin' : 'Cliente'}
                                            </span>
                                        </td>
                                        <td className="p-5">
                                            <span className={`inline-block border-2 border-black px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                                                usr.baneado ? 'bg-red-400 text-black' : 'bg-green-400 text-black'
                                            }`}>
                                                {usr.baneado ? 'Baneado' : 'Activo'}
                                            </span>
                                        </td>
                                        <td className="p-5">
                                            <span className={`inline-block border-2 border-black px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                                                usr.acceso_permitido ? 'bg-emerald-400 text-black' : 'bg-red-500 text-white'
                                            }`}>
                                                {usr.acceso_permitido ? 'Permitido' : 'Suspendido'}
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
                                            <div className="flex justify-end gap-3 text-black">
                                                {usr.role_id !== 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => alternarBan(usr.id, usr.baneado)}
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
                                                    onClick={() => alternarAccesoSistema(usr.id, usr.acceso_permitido)}
                                                    className={`p-2.5 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all ${
                                                        usr.acceso_permitido ? 'bg-pink-500 text-white' : 'bg-purple-400 text-black'
                                                    }`}
                                                    title={usr.acceso_permitido ? "Suspender acceso al sistema" : "Restaurar acceso al sistema"}
                                                >
                                                    {usr.acceso_permitido ? <HiOutlineUserMinus size={18} /> : <HiOutlineUserPlus size={18} />}
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

            <AlertBonito
                isOpen={alertConfig.isOpen}
                titulo={alertConfig.titulo}
                mensaje={alertConfig.mensaje}
                colorConfirmar={alertConfig.colorConfirmar}
                onConfirm={alertConfig.onConfirm}
                onCancel={cerrarAlert}
            />
        </div>
    );
}