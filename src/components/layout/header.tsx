import { Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto grid h-16 grid-cols-3 items-center px-4">
        <div className="flex items-center gap-2 text-lg font-bold text-foreground font-headline">
          <Link href="/" passHref>
            <div className="flex items-center gap-3 cursor-pointer">
              <Image
                src="https://i.imgur.com/ULHe7uK.png"
                alt="Logo do App"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>
        <div className="flex justify-center">
          <Image
            src="https://i.imgur.com/ysm5XaM.png"
            alt="Inspirado en Privacy"
            width={100}
            height={50}
            className="object-contain"
            priority
          />
        </div>
        <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
          <Lock size={14} />
          <span className="hidden sm:inline">Privacidad 100% garantizada</span>
        </div>
      </div>
    </header>
  );
}
