import Contador from './Contador'; 

export default function VideoHeader() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-black">
            <video
                autoPlay loop muted playsInline preload="auto" 
                className="absolute top-0 left-0 w-full h-full object-cover z-0 scale-110 origin-bottom"
            >
                <source src="/videos/videoheader.mp4" type="video/mp4" />
            </video>

            <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>

            <div className="relative z-20 flex flex-col items-center justify-center h-full text-center">
                <h1 className="text-white text-8xl md:text-[120px] font-black italic tracking-tighter leading-none drop-shadow-lg">
                    URBAN<span className="text-pink-500">BEAT</span>
                </h1>
                
                <Contador />

                <p className="text-white text-xl mt-10 font-black uppercase tracking-[0.8em] ml-[0.8em]">
                    Sanlúcar de Barrameda
                </p>
            </div>
        </section>
    );
}