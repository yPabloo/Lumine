"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/", label: "Início" },
  { href: "/festival", label: "Festival" },
  { href: "/festival/inscricao", label: "Inscrição" },
  { href: "/festival/consultar", label: "Consultar" },
  { href: "/festival/faq", label: "FAQ" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  /*
   * Encontra o link mais específico da página atual.
   * Assim, em /festival/inscricao somente "Inscrição" fica ativo,
   * e não "Festival" e "Inscrição" ao mesmo tempo.
   */
  const activeHref = navigation
    .filter(({ href }) => !href.includes("#"))
    .filter(({ href }) => {
      if (href === "/") return pathname === "/";
      return pathname === href || pathname.startsWith(`${href}/`);
    })
    .sort((a, b) => b.href.length - a.href.length)[0]?.href;

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link
          href="/"
          className="header-logo"
          aria-label="Lumine — Página inicial"
          onClick={closeMenu}
        >
          <Image
            src="/lumine-logo.png"
            alt="Lumine — Espaço de Desenvolvimento Infantil"
            width={300}
            height={60}
            className="header-logo-image"
            priority
          />
        </Link>

        <button
          type="button"
          className="header-menu-button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <nav
          id="main-navigation"
          className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}
          aria-label="Navegação principal"
        >
          {navigation.map(({ href, label }) => {
            const isActive = href === activeHref;

            return (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                aria-current={isActive ? "page" : undefined}
                className={`header-nav-link ${
                  isActive ? "header-nav-link--active" : ""
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      {menuOpen && (
        <button
          type="button"
          className="header-menu-backdrop"
          aria-label="Fechar menu"
          onClick={closeMenu}
        />
      )}
    </header>
  );
}