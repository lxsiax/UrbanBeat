import { Head, Link, useForm } from '@inertiajs/react';
import Header from '@/components/festival/Header';
import Footer from '@/components/festival/Footer';

export default function Register() {
    const { data, setData, post, processing, errors, setError, clearErrors } = useForm({
        name: '',
        apellidos: '',
        email: '',
        dni: '',
        password: '',
        password_confirmation: '',
    });

    const enviarRegistro = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        clearErrors();
        let tieneErrores = false;

        if (data.name.trim().length <= 3) {
            setError('name', 'El nombre debe tener más de 3 caracteres');
            tieneErrores = true;
        }

        if (data.apellidos.trim().length <= 2) {
            setError('apellidos', 'El apellido debe tener más de 2 caracteres');
            tieneErrores = true;
        }

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(data.email)) {
            setError('email', 'Introduce un correo electrónico válido');
            tieneErrores = true;
        }

        const regexDni = /^[XYZ\d]\d{7}[A-Z]$/i;
        if (!regexDni.test(data.dni.trim())) {
            setError('dni', 'El formato del DNI o NIE no es válido en España');
            tieneErrores = true;
        }

        if (data.password !== data.password_confirmation) {
            setError('password', 'Las contraseñas no coinciden');
            tieneErrores = true;
        }

        if (tieneErrores) {
            return;
        }

        post('/register');
    };

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Head title="Registro UrbanBeat" />
            <Header />

            <main className="flex-grow flex items-center justify-center px-4 pt-32 pb-12">
                <div className="bg-gray-50 p-8 rounded-2xl w-full max-w-md border border-gray-200 shadow-xl">
                    <h2 className="text-black text-4xl font-black italic mb-2 tracking-tighter uppercase text-center">
                        ÚNETE AL <span className="text-pink-500">BEAT</span>
                    </h2>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-8 text-center">
                        Crea tu cuenta con nosotros
                    </p>
                    {Object.keys(errors).length > 0 && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-[10px] font-bold uppercase">
                            Revisa los campos marcados en rojo
                        </div>
                    )}

                    <form onSubmit={enviarRegistro} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 text-[10px] font-black uppercase tracking-widest mb-2">Nombre</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full bg-white border border-gray-300 text-black p-3 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all"
                                required
                            />
                            {errors.name && <p className="text-pink-600 text-[10px] mt-1 font-bold uppercase">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 text-[10px] font-black uppercase tracking-widest mb-2">Apellidos</label>
                            <input
                                type="text"
                                value={data.apellidos}
                                onChange={(e) => setData('apellidos', e.target.value)}
                                className="w-full bg-white border border-gray-300 text-black p-3 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all"
                                required
                            />
                            {errors.apellidos && <p className="text-pink-600 text-[10px] mt-1 font-bold uppercase">{errors.apellidos}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 text-[10px] font-black uppercase tracking-widest mb-2">DNI / NIE</label>
                            <input
                                type="text"
                                value={data.dni}
                                onChange={(e) => setData('dni', e.target.value)}
                                className="w-full bg-white border border-gray-300 text-black p-3 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all uppercase"
                                required
                            />
                            {errors.dni && <p className="text-pink-600 text-[10px] mt-1 font-bold uppercase">{errors.dni}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 text-[10px] font-black uppercase tracking-widest mb-2">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full bg-white border border-gray-300 text-black p-3 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all"
                                required
                            />
                            {errors.email && <p className="text-pink-600 text-[10px] mt-1 font-bold uppercase">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 text-[10px] font-black uppercase tracking-widest mb-2">Contraseña</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full bg-white border border-gray-300 text-black p-3 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all"
                                required
                            />
                            {errors.password && <p className="text-pink-600 text-[10px] mt-1 font-bold uppercase">{errors.password}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 text-[10px] font-black uppercase tracking-widest mb-2">Confirmar Contraseña</label>
                            <input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="w-full bg-white border border-gray-300 text-black p-3 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-pink-500 hover:bg-black text-white font-black py-4 rounded-full transition-all tracking-widest uppercase text-sm shadow-lg mt-4 disabled:opacity-50"
                        >
                            Crear mi cuenta
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                        <Link href="/login" className="text-gray-500 text-[10px] font-black uppercase tracking-widest hover:text-pink-500 transition-colors">
                            ¿Ya tienes cuenta? <span className="text-black underline ml-1 font-black">Inicia sesión</span>
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}