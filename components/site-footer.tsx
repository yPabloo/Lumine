import Link from "next/link";
import { Camera, MapPin, MessageCircle } from "lucide-react";
import { lumine } from "@/lib/site-data";
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Image
            src="/lumine-logo.png"
            alt="Lumine — Espaço de Desenvolvimento Infantil"
            width={300}
            height={60}
            className="footer-logo-image"
          />
          <p className="footer-copy">Um espaço de cuidado, descobertas e aprendizagem com significado.</p>
        </div>
        <div>
          <p className="footer-title">Visite o Lumine</p>
          <p className="footer-line"><MapPin size={17} /> {lumine.address}</p>
          <a className="footer-line" href={lumine.phoneHref} target="_blank" rel="noreferrer"><MessageCircle size={17} /> {lumine.phone}</a>
          <a className="footer-line" href={lumine.instagram} target="_blank" rel="noreferrer"><Camera size={17} /> @lumine.edu.infantil</a>
        </div>
        <div>
          <p className="footer-title">Festival</p>
          <Link href="/festival">Sobre o evento</Link>
          <Link href="/festival/inscricao">Inscrição</Link>
          <Link href="/festival/consultar">Consultar inscrição</Link>
          <Link href="/festival/termos">Termos e privacidade</Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 Lumine. Todos os direitos reservados.</span>
        <Link href="/admin">Área administrativa</Link>
      </div>
    </footer>
  );
}
