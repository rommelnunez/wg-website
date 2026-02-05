import Image from "next/image";
import { cn } from "@/lib/utils";
import logoImg from "../../public/assets/brand/WG LOGO_WHITE.png";

interface LogoProps {
    className?: string;
}

export const Logo = ({ className }: LogoProps) => {
    return (
        <div className={cn("relative aspect-[2/1]", className)}>
            <Image
                src={logoImg}
                alt="WG Logo"
                fill
                className="object-contain"
                priority
            />
        </div>
    );
};
