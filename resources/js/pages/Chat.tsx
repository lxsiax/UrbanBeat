import { Head, useForm, router } from '@inertiajs/react';
import Header from '@/components/festival/Header';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { HiOutlinePaperAirplane, HiOutlineNoSymbol } from "react-icons/hi2";
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

interface User {
    id: number;
    name: string;
    apellidos: string | null;
    role_id: number;
    baneado: boolean;
}

interface Mensaje {
    id: number;
    user_id: number;
    contenido: string;
    created_at: string;
    user: User;
}

interface ChatProps {
    id: number;
    nombre: string;
    descripcion: string | null;
    mensajes: Mensaje[];
}

interface Props {
    chat: ChatProps;
    usuarioActualId: number;
    esAdmin: boolean;
}

export default function Chat({ chat, usuarioActualId, esAdmin }: Props) {
    const [listaMensajes, setListaMensajes] = useState<Mensaje[]>(chat.mensajes);

    const { data, setData, post, processing, reset } = useForm({
        contenido: '',
    });

    const contenedorMensajes = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setListaMensajes(chat.mensajes);
    }, [chat.mensajes]);

    useEffect(() => {
        if (contenedorMensajes.current) {
            contenedorMensajes.current.scrollTop = contenedorMensajes.current.scrollHeight;
        }
    }, [listaMensajes]);

    useEffect(() => {
        window.Pusher = Pusher;

        const echoInstance = new Echo({
            broadcaster: 'reverb',
            key: import.meta.env.VITE_REVERB_APP_KEY || 'maby7pdoyfscs9ax6i8w',
            wsHost: window.location.hostname,
            wsPort: 8080,
            wssPort: 8080,
            forceTLS: false,
            enabledTransports: ['ws', 'wss'],
        });

        echoInstance.channel(`chat.${chat.id}`)
            .listen('.mensaje.enviado', (e: { mensaje: Mensaje }) => {
                setListaMensajes((prev) => [...prev, e.mensaje]);
            });

        return () => {
            echoInstance.leaveChannel(`chat.${chat.id}`);
            echoInstance.disconnect();
        };
    }, [chat.id]);

    const submit = (e: FormEvent) => {
        e.preventDefault();
        if (data.contenido.trim() === '') return;

        const mensajeTemporal: Mensaje = {
            id: Date.now(),
            user_id: usuarioActualId,
            contenido: data.contenido,
            created_at: new Date().toISOString(),
            user: { id: usuarioActualId, name: 'Tú', apellidos: '', role_id: 2, baneado: false }
        };
        setListaMensajes((prev) => [...prev, mensajeTemporal]);

        reset('contenido');

        post(`/chats/${chat.id}/mensajes`, {
            preserveScroll: true,
        });
    };

    const alternarBan = (userId: number) => {
        if (confirm('¿Cambiar estado de acceso al chat de este usuario?')) {
            router.post(`/usuarios/${userId}/banear`, {}, { preserveScroll: true });
        }
    };

    const estoyBan = listaMensajes.find(m => m.user_id === usuarioActualId)?.user.baneado || false;

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col h-screen">
            <Head title={`Chat general - UrbanBeat`} />
            <Header />

            <main className="flex-grow pt-36 pb-6 px-6 max-w-4xl mx-auto w-full flex flex-col h-full overflow-hidden">
                
                <div className="mb-6 bg-black text-white p-6 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(236,72,153,1)]">
                    <h1 className="text-3xl font-black uppercase italic tracking-tight text-pink-500">
                        Chat general
                    </h1>
                    <p className="text-xs text-gray-300 font-bold mt-1 uppercase tracking-wide">
                        Chat de todos los clientes de UrbanBeat
                    </p>
                </div>

                <div 
                    ref={contenedorMensajes}
                    className="flex-grow bg-white border-2 border-black rounded-[24px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 overflow-y-auto space-y-4 mb-4 scroll-smooth"
                >
                    {listaMensajes.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-gray-400 font-black uppercase text-xs tracking-wider border-2 border-dashed border-gray-200 rounded-xl p-8">
                            Nadie ha hablado aún. ¡Te toca romper el hielo! 
                        </div>
                    ) : (
                        listaMensajes.map((msg) => {
                            const esMio = msg.user_id === usuarioActualId;
                            return (
                                <div key={msg.id} className={`flex flex-col ${esMio ? 'items-end' : 'items-start'}`}>
                                    <div className="flex items-center gap-2 mb-1 px-1">
                                        <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">
                                            {esMio ? 'Tú' : `${msg.user.name} ${msg.user.apellidos || ''}`} 
                                            {msg.user.baneado && <span className="text-red-500 font-bold ml-1">(Baneado)</span>}
                                        </span>
                                        {esAdmin && !esMio && msg.user.role_id !== 1 && (
                                            <button 
                                                onClick={() => alternarBan(msg.user_id)}
                                                className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-px transition-all ${msg.user.baneado ? 'bg-green-400' : 'bg-red-400'}`}
                                            >
                                                {msg.user.baneado ? 'Desbanear' : 'Banear'}
                                            </button>
                                        )}
                                    </div>
                                    <div className={`max-w-md p-4 rounded-2xl border-2 border-black font-bold text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] break-words ${
                                        esMio ? 'bg-pink-500 text-white' : 'bg-gray-100 text-black'
                                    }`}>
                                        {msg.contenido}
                                    </div>
                                    <span className="text-[9px] text-gray-400 font-mono mt-1 px-1">
                                        {new Date(msg.created_at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            );
                        })
                    )}
                </div>

                <form onSubmit={submit} className="flex gap-4 items-center">
                    <input
                        type="text"
                        value={data.contenido}
                        onChange={(e) => setData('contenido', e.target.value)}
                        placeholder={estoyBan ? "No puedes escribir, estás baneado del chat." : "Escribe algo..."}
                        maxLength={1000}
                        disabled={processing || estoyBan}
                        className="flex-grow bg-white border-2 border-black rounded-xl p-4 font-bold text-sm focus:outline-none focus:ring-0 focus:border-pink-500 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] placeholder:text-gray-400 disabled:bg-gray-100 disabled:text-gray-400"
                    />
                    <button
                        type="submit"
                        disabled={processing || data.contenido.trim() === '' || estoyBan}
                        className="bg-black text-white p-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] hover:bg-pink-500 hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50 disabled:pointer-events-none"
                    >
                        {estoyBan ? <HiOutlineNoSymbol size={20} /> : <HiOutlinePaperAirplane size={20} className="-rotate-45" />}
                    </button>
                </form>

            </main>
        </div>
    );
}