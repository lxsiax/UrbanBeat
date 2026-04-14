import { Head } from '@inertiajs/react';
import Header from '../components/festival/Header'; 
import Footer from '../components/festival/Footer';
import VideoHeader from '../components/festival/VideoHeader';

export default function Home() {
    return (
        <>
            <Head title="Inicio - UrbanBeat" />
            <Header />
            <div  style={{ paddingTop: '95px', backgroundColor: '#fff', color: '#fff', textAlign: 'center' }}></div>
            <VideoHeader />
            <main style={{ paddingTop: '100px', backgroundColor: '#fff', minHeight: '100vh', color: '#fff', textAlign: 'center' }}>
            </main>
            <Footer />
        </>
    );
}