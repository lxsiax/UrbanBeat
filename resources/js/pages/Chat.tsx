import { Head, useForm } from '@inertiajs/react';
import Header from '@/components/festival/Header';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { HiOutlinePaperAirplane } from "react-icons/hi2";

interface User {
    id: number;
    name: string;
    apellidos: string | null;
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
}

export default function Chat({ chat, usuarioActualId }: Props) {
    // Guardo los mensajes en un estado local para inyectar los nuevos en caliente
    const [listaMensajes, setListaMensajes] = useState<Mensaje[]>(chat.mensajes);

    const { data, setData, post, processing, reset } = useForm({
        contenido: '',
    });

    const contenedorMensajes = useRef<HTMLDivElement>(null);

    // Si cambian las props desde el servidor, actualizo la lista por si acaso
    useEffect(() => {
        setListaMensajes(chat.mensajes);
    }, [chat.mensajes]);

    // Control del scroll automático al final de la pantalla cuando hay mensajes nuevos
    useEffect(() => {
        if (contenedorMensajes.current) {
            contenedorMensajes.current.scrollTop = contenedorMensajes.current.scrollHeight;
        }
    }, [listaMensajes]);

    // ESCUCHAR REVERB EN TIEMPO REAL
    useEffect(() => {
        // Echo se registra globalmente en bootstrap.js, compruebo que exista
        // @ts-ignore
        if (window.Echo) {
            // @ts-ignore
            window.Echo.channel(`chat.${chat.id}`)
                .listen('.mensaje.enviado', (e: { mensaje: Mensaje }) => {
                    // El servidor nos avisa de un mensaje nuevo y lo metemos al estado al momento
                    setListaMensajes((prev) => [...prev, e.mensaje]);
                });
        }

        // Si cambio de sala o cierro la vista, dejo de escuchar el canal para no saturar
        return () => {
            // @ts-ignore
            if (window.Echo) {
                // @ts-ignore
                window.Echo.leaveChannel(`chat.${chat.id}`);
            }
        };
    }, [chat.id]);

    const submit = (e: FormEvent) => {
        e.preventDefault();
        if (data.contenido.trim() === '') return;

        // Meto mi mensaje en pantalla al instante (Optimistic UI) para que se sienta instantáneo
        const mensajeTemporal: Mensaje = {
            id: Date.now(),
            user_id: usuarioActualId,
            contenido: data.contenido,
            created_at: new Date().toISOString(),
            user: { id: usuarioActualId, name: 'Tú', apellidos: '' }
        };
        setListaMensajes((prev) => [...prev, mensajeTemporal]);

        reset('contenido');

        // Lanzo la petición real a Laravel para guardarlo en la BD y difundirlo
        post(`/chats/${chat.id}/mensajes`, {
            preserveScroll: true,
        });
    };

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
                                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider mb-1 px-1">
                                        {esMio ? 'Tú' : `${msg.user.name} ${msg.user.apellidos || ''}`}
                                    </span>
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
                        placeholder="Escribe algo..."
                        maxLength={1000}
                        disabled={processing}
                        className="flex-grow bg-white border-2 border-black rounded-xl p-4 font-bold text-sm focus:outline-none focus:ring-0 focus:border-pink-500 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] placeholder:text-gray-400"
                    />
                    <button
                        type="submit"
                        disabled={processing || data.contenido.trim() === ''}
                        className="bg-black text-white p-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] hover:bg-pink-500 hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50 disabled:pointer-events-none"
                    >
                        <HiOutlinePaperAirplane size={20} className="-rotate-45" />
                    </button>
                </form>

            </main>
        </div>
    );
}