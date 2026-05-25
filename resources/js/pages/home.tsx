import { Head } from '@inertiajs/react';
import Header from '../components/festival/Header'; 
import Footer from '../components/festival/Footer';
import VideoHeader from '../components/festival/VideoHeader';
import WidgetChat from '../components/festival/WidgetChat';
import NoticiasHome from '../components/festival/NoticiasHome';

interface Noticia {
    id: number;
    titulo: string;
    contenido: string;
    imagen?: string;
    created_at: string;
}

interface HomeProps {
    fechaFestival: string;
    ultimasNoticias: Noticia[];
}

export default function Home({ fechaFestival, ultimasNoticias }: HomeProps) {
    return (
        <>
            <Head title="Inicio - UrbanBeat" />
            <Header />
            <div className="pt-[95px] bg-white"></div>
            <VideoHeader fechaFestival={fechaFestival} />
            <main className="bg-white min-h-screen">
                <NoticiasHome noticias={ultimasNoticias} />
            </main>
            <Footer />
            <WidgetChat />
        </>
    );
}