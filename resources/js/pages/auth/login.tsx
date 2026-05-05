import { Head, Link, useForm } from '@inertiajs/react';
import Header from '@/components/festival/Header';
import Footer from '@/components/festival/Footer';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const acceder = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Head title="Login UrbanBeat" />
            <Header />

            <main className="flex-grow flex items-center justify-center px-4 pt-32 pb-12">
                <div className="bg-white p-8 rounded-2xl w-full max-w-md border border-gray-200 shadow-2xl">
                    <h2 className="text-black text-4xl font-black italic mb-2 tracking-tighter uppercase text-center">
                        ACCESO <span className="text-pink-500">URBANBEAT </span>
                    </h2>

                    <form onSubmit={acceder} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 text-[10px] font-black uppercase tracking-widest mb-2">Email</label>
                            <input 
                                type="email" 
                                value={data.email} 
                                onChange={(e) => setData('email', e.target.value)} 
                                className="w-full bg-gray-50 border border-gray-300 text-black p-4 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none" 
                                required 
                            />
                            {errors.email && <p className="text-pink-600 text-[10px] mt-2 font-bold uppercase">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 text-[10px] font-black uppercase tracking-widest mb-2">Contraseña</label>
                            <input 
                                type="password" 
                                value={data.password} 
                                onChange={(e) => setData('password', e.target.value)} 
                                className="w-full bg-gray-50 border border-gray-300 text-black p-4 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none" 
                                required 
                            />
                        </div>

                        <button 
                            disabled={processing} 
                            className="w-full bg-pink-500 hover:bg-black text-white font-black py-4 rounded-full transition-all tracking-widest uppercase text-sm shadow-lg disabled:opacity-50"
                        >
                            Iniciar sesión
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <Link href="/register" className="text-gray-400 text-[10px] font-black uppercase tracking-widest hover:text-pink-500">
                            ¿No tienes cuenta? <span className="text-black underline ml-1">Regístrate</span>
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}