export default function Logo({ className = "h-12" }) { 
    return (
        <img 
            src="/images/logo.png" 
            alt="UrbanBeat Logo" 
            className={className} 
        />
    );
}
