export default function SocialLink({ icon, label, href }: { icon: any, label: string, href: string }) {
    return (
        <a href={href} className="flex items-center gap-2 hover:text-black transition-all text-sm font-bold">
            <span className="text-xl">{icon}</span>
            <span>{label}</span>
        </a>
    );
}