import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
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
    dni: string | null;
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
    const [busqueda, setBusqueda] = useState('');
    const [rolFiltro, setRolFiltro] = useState('');
    const [estadoFiltro, setEstadoFiltro] = useState('');

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
        setAlertConfig({
            isOpen: true,
            titulo: "Cambiar Rango",
            mensaje: "¿Seguro que quieres cambiar el rango de este usuario?",
            colorConfirmar: "bg-pink-500 text-white",
            onConfirm: () => {
                router.patch(`/admin/usuarios/${id}/rol`, {}, { preserveScroll: true });
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
            colorConfirmar: estaBaneado ? "bg-black text-white" : "bg-yellow-400 text-black",
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
            colorConfirmar: accesoActual ? "bg-yellow-400 text-black" : "bg-pink-500 text-white",
            onConfirm: () => {
                router.patch(`/admin/usuarios/${id}/acceso`, {}, { preserveScroll: true });
                cerrarAlert();
            }
        });
    };

    const limpiarTexto = (texto: string) => {
        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    };

    const usuariosFiltrados = usuarios.filter((usr) => {
        const busquedaLimpia = limpiarTexto(busqueda);
        const nombreCompleto = `${usr.name} ${usr.apellidos || ''}`;
        
        const coincideBusqueda = 
            limpiarTexto(nombreCompleto).includes(busquedaLimpia) ||
            limpiarTexto(usr.email).includes(busquedaLimpia) ||
            (usr.dni && limpiarTexto(usr.dni).includes(busquedaLimpia));

        const coincideRol = rolFiltro 
            ? usr.role_id === Number(rolFiltro) 
            : true;

        const coincideEstado = estadoFiltro
            ? (estadoFiltro === 'permitido' ? usr.acceso_permitido : !usr.acceso_permitido)
            : true;

        return coincideBusqueda && coincideRol && coincideEstado;
    });

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Head title="Gestión de Usuarios - UrbanBeat" />
            <Header />

            <main className="flex-grow pt-44 pb-20 px-4 sm:px-6 max-w-7xl mx-auto w-full">
                
                <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <span className="bg-black text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                            Control de personal
                        </span>
                        <h1 className="text-4xl sm:text-6xl font-black italic uppercase tracking-tighter mt-4 leading-none text-black">
                            Gestión de <span className="text-pink-500">Usuarios</span>
                        </h1>
                    </div>
                    <div className="bg-white border-2 border-black p-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 self-stretch sm:self-start">
                        <HiOutlineUserGroup size={24} className="text-pink-500" />
                        <span className="text-xs font-black uppercase tracking-wider text-black">
                            Total: {usuariosFiltrados.length} Filtrados
                        </span>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 mb-8 items-stretch">
                    <input
                        type="text"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        placeholder="Buscar por nombre, correo o DNI..."
                        className="rounded-xl border-2 border-black text-xs font-black uppercase p-3 tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:ring-0 focus:border-pink-500 bg-white text-black flex-grow"
                    />

                    <div className="flex flex-col sm:flex-row gap-4 sm:w-auto w-full">
                        <select
                            value={rolFiltro}
                            onChange={(e) => setRolFiltro(e.target.value)}
                            className="rounded-xl border-2 border-black text-xs font-black uppercase p-3 tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:ring-0 focus:border-pink-500 bg-white text-black cursor-pointer min-w-[180px] flex-grow sm:flex-none"
                        >
                            <option value="">Todos los roles</option>
                            <option value="1">Administradores</option>
                            <option value="2">Clientes</option>
                        </select>

                        <select
                            value={estadoFiltro}
                            onChange={(e) => setEstadoFiltro(e.target.value)}
                            className="rounded-xl border-2 border-black text-xs font-black uppercase p-3 tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:ring-0 focus:border-pink-500 bg-white text-black cursor-pointer min-w-[180px] flex-grow sm:flex-none"
                        >
                            <option value="">Acceso al sistema</option>
                            <option value="permitido">Acceso Permitido</option>
                            <option value="suspendido">Acceso Suspendido</option>
                        </select>
                    </div>
                </div>

                <div className="bg-white border-2 border-black rounded-[24px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                    <div className="overflow-x-auto w-full">
                        <table className="w-full border-collapse text-left min-w-[950px]">
                            <thead>
                                <tr className="bg-black text-white text-[11px] font-black uppercase tracking-widest border-b-2 border-black">
                                    <th className="p-5">Usuario / Correo</th>
                                    <th className="p-5">DNI</th>
                                    <th className="p-5">Rol Actual</th>
                                    <th className="p-5">Estado Chat</th>
                                    <th className="p-5">Acceso Sistema</th>
                                    <th className="p-5">Fecha Registro</th>
                                    <th className="p-5 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-black text-sm font-bold text-black">
                                {usuariosFiltrados.map((usr) => (
                                    <tr key={usr.id} className={`transition-colors ${!usr.acceso_permitido ? 'bg-gray-100 text-gray-400' : 'hover:bg-gray-50/80'}`}>
                                        <td className="p-5">
                                            <div className="flex items-center gap-2">
                                                <Link 
                                                    href={`/admin/usuarios/${usr.id}/pedidos`}
                                                    className={`font-black text-base uppercase italic block hover:text-pink-500 transition-colors ${!usr.acceso_permitido ? 'line-through text-gray-400' : 'text-black'}`}
                                                >
                                                    {usr.name} {usr.apellidos || ''}
                                                </Link>
                                                {usr.baneado && (
                                                    <span className="bg-red-400 text-black border border-black text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                                                        Baneado
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-xs text-gray-400 font-normal mt-0.5">{usr.email}</div>
                                        </td>
                                        <td className="p-5 font-mono text-sm uppercase">
                                            {usr.dni || <span className="text-gray-300 font-sans italic text-xs">No registrado</span>}
                                        </td>
                                        <td className="p-5">
                                            <span className={`inline-block border-2 border-black px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                                                usr.role_id === 1 ? 'bg-pink-500 text-white' : 'bg-white text-black'
                                            }`}>
                                                {usr.role_id === 1 ? 'Admin' : 'Cliente'}
                                            </span>
                                        </td>
                                        <td className="p-5">
                                            <span className={`inline-block border-2 border-black px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                                                usr.baneado ? 'bg-red-400 text-black' : 'bg-white text-black'
                                            }`}>
                                                {usr.baneado ? 'Baneado' : 'Activo'}
                                            </span>
                                        </td>
                                        <td className="p-5">
                                            <span className={`inline-block border-2 border-black px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                                                usr.acceso_permitido ? 'bg-white text-black' : 'bg-red-400 text-black'
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
                                                            usr.baneado ? 'bg-white' : 'bg-yellow-400'
                                                        }`}
                                                        title={usr.baneado ? "Desbanear del chat" : "Banear del chat"}
                                                    >
                                                        {usr.baneado ? <HiOutlineCheckCircle size={18} /> : <HiOutlineNoSymbol size={18} />}
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => cambiarRol(usr.id, usr.role_id)}
                                                    className="p-2.5 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-pink-500 hover:text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                                                    title="Alternar rol del usuario"
                                                >
                                                    <HiOutlineShieldCheck size={18} />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => alternarAccesoSistema(usr.id, usr.acceso_permitido)}
                                                    className={`p-2.5 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all ${
                                                        usr.acceso_permitido ? 'bg-pink-500 text-white' : 'bg-yellow-400 text-black'
                                                    }`}
                                                    title={usr.acceso_permitido ? "Suspender acceso al sistema" : "Restaurar acceso al sistema"}
                                                >
                                                    {usr.acceso_permitido ? <HiOutlineUserMinus size={18} /> : <HiOutlineUserPlus size={18} />}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {usuariosFiltrados.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="p-10 text-center font-black uppercase text-xs text-gray-400 italic">
                                            No se encontraron usuarios con los criterios seleccionados
                                        </td>
                                    </tr>
                                )}
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