import { Head } from '@inertiajs/react';
import Header from '../components/festival/Header'; 
import Footer from '../components/festival/Footer';

export default function Home() {
    return (
        <>
            <Head title="Inicio - UrbanBeat" />
            <Header />
            <main style={{ paddingTop: '100px', backgroundColor: '#fff', minHeight: '100vh', color: '#fff', textAlign: 'center' }}>
            </main>
            <Footer />
        </>
    );
}