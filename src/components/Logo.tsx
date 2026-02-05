import Image from "next/image";

export const Logo = ({ className = "" }: { className?: string }) => {
    return (
        <div className={`relative w-24 h-auto ${className}`}>
            <Image
                src="/assets/brand/WG LOGO_WHITE.png"
                alt="WG Logo"
                width={300}
                height={100}
                className="object-contain w-full h-auto"
                priority
            />
        </div>
    );
};
