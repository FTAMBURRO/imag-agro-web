import { type ReactNode, useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { brands, footerGroups, navItems, siteConfig } from '@/content/site';

function Mark() {
  return (
    <span className="flex items-center gap-3" aria-label="IMAG AGRO SAS">
      <span className="relative flex h-9 w-9 items-center justify-center border border-[hsl(var(--accent))] text-[hsl(var(--accent))]">
        <svg aria-hidden="true" viewBox="0 0 34 34" className="h-7 w-7">
          <path d="M6 26V8m0 9c5-8 10-8 15 0 2 3 4 3 7-1" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M6 26c7-4 14-4 22 0" fill="none" stroke="currentColor" strokeWidth="1.1" />
        </svg>
      </span>
      <span className="leading-none">
        <strong className="block text-[.9rem] tracking-[.18em]">IMAG</strong>
        <span className="mt-1 block text-[.58rem] tracking-[.25em] text-[hsl(var(--accent))]">AGRO SAS</span>
      </span>
    </span>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  return (
    <header className="relative z-30 border-b border-[hsl(var(--border))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
      <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[hsl(var(--accent))] focus:px-4 focus:py-3 focus:text-[hsl(var(--foreground))]">Ir al contenido</a>
      <div className="container-wide flex h-[76px] items-center justify-between">
        <Link href="/" onClick={closeMenu} className="shrink-0" data-testid="link-home">
          <Mark />
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegación principal">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} aria-current={location.startsWith(item.href) ? 'page' : undefined} className="site-link text-[.76rem] font-semibold tracking-[.11em] text-[hsl(var(--primary-foreground))]/85 hover:text-[hsl(var(--accent))]" data-testid={`link-nav-${item.label.toLowerCase()}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/contacto" className="group flex items-center gap-2 border border-[hsl(var(--accent))] px-4 py-2.5 text-[.72rem] font-bold tracking-[.1em] text-[hsl(var(--accent))] transition-colors hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--foreground))]" data-testid="link-header-contacto">
            Hablemos <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        <button type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-navigation" className="p-2 md:hidden" data-testid="button-mobile-menu">
          {menuOpen ? <X aria-label="Cerrar menú" /> : <Menu aria-label="Abrir menú" />}
        </button>
      </div>
      {menuOpen && (
        <div id="mobile-navigation" className="absolute inset-x-0 top-[76px] min-h-[calc(100dvh-76px)] border-t border-[hsl(var(--sidebar-border))] bg-[hsl(var(--primary))] px-6 py-10 md:hidden">
          <nav className="flex flex-col gap-7" aria-label="Navegación móvil">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={closeMenu} className="text-3xl font-display text-[hsl(var(--primary-foreground))]" data-testid={`link-mobile-${item.label.toLowerCase()}`}>{item.label}</Link>
            ))}
            <Link href="/contacto" onClick={closeMenu} className="mt-4 flex w-fit items-center gap-2 bg-[hsl(var(--accent))] px-5 py-3 text-sm font-bold text-[hsl(var(--foreground))]" data-testid="link-mobile-contacto">Hablemos <ArrowUpRight className="h-4 w-4" /></Link>
          </nav>
          <p className="absolute bottom-10 left-6 max-w-[250px] text-sm leading-relaxed text-[hsl(var(--primary-foreground))]/60">{siteConfig.tagline}</p>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
      <div className="container-wide py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Mark />
            <p className="mt-8 max-w-xs font-display text-2xl leading-tight text-[hsl(var(--primary-foreground))]/90">Cada decisión del campo, mejor acompañada.</p>
            <Link href="/contacto" className="mt-8 inline-flex items-center gap-2 border-b border-[hsl(var(--accent))] pb-2 text-sm font-bold text-[hsl(var(--accent))]" data-testid="link-footer-hablemos">Abrir una conversación <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className="eyebrow text-[hsl(var(--accent))]">{group.title}</p>
              <ul className="mt-6 space-y-4">
                {group.links.map((link) => <li key={link.href}><Link href={link.href} className="text-sm text-[hsl(var(--primary-foreground))]/70 transition-colors hover:text-[hsl(var(--accent))]" data-testid={`link-footer-${link.label.toLowerCase().replaceAll(' ', '-')}`}>{link.label}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-[hsl(var(--sidebar-border))] pt-6 text-[.72rem] text-[hsl(var(--primary-foreground))]/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} IMAG AGRO SAS. Una empresa argentina.</p>
          <p>Marcas y alianzas: {brands.join(' · ')}</p>
        </div>
      </div>
    </footer>
  );
}

export function PageFrame({ children }: { children: ReactNode }) {
  return <div className="noise min-h-[100dvh]"><SiteHeader /><main id="contenido">{children}</main><SiteFooter /></div>;
}

export function Breadcrumb({ current }: { current: string }) {
  return <div className="mb-8 flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]"><Link href="/" className="hover:text-[hsl(var(--primary))]" data-testid="link-breadcrumb-inicio">Inicio</Link><ChevronDown className="h-3 w-3 -rotate-90" /><span>{current}</span></div>;
}