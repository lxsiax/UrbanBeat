import Contador from './Contador';

interface VideoHeaderProps {
    fechaFestival: string;
}

export default function VideoHeader({ fechaFestival }: VideoHeaderProps) {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-black">
            <video
                autoPlay loop muted playsInline preload="auto"
                className="absolute top-0 left-0 w-full h-full object-cover z-0 scale-110 origin-bottom"
            >
                <source src="/videos/videoheader.mp4" type="video/mp4" />
            </video>

            <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>

            <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">

                <h1 className="text-white text-5xl sm:text-7xl md:text-8xl lg:text-[120px] font-black italic tracking-tighter leading-none drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] select-none">
                    URBAN<span className="text-pink-500">BEAT</span>
                </h1>

                <Contador fechaObjetivo={fechaFestival} />

                <p className="text-white text-xs sm:text-sm md:text-xl mt-8 md:mt-12 font-black uppercase tracking-[0.4em] sm:tracking-[0.8em] ml-[0.4em] sm:ml-[0.8em] drop-shadow-md">
                    Sanlúcar de Barrameda
                </p>

            </div>
        </section>
    );
}