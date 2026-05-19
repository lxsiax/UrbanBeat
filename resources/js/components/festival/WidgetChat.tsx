import { Link, usePage } from '@inertiajs/react';
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

export default function WidgetChat() {
    const { auth } = usePage().props as any;

    if (!auth || !auth.user) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Link
                href="/chat-general"
                className="flex items-center justify-center w-20 h-20 bg-yellow-400 text-black rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-pink-500 hover:text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all group"
                title="Ir al Chat general"
            >
                <HiOutlineChatBubbleLeftRight size={28} className="group-hover:scale-110 transition-transform" />
                
                <span className="absolute top-0 right-0 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-500 opacity-75 border border-black"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-600 border border-black"></span>
                </span>
            </Link>
        </div>
    );
}