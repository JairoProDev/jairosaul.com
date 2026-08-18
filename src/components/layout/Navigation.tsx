'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Brain, ChevronDown, Command, Menu, Settings, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/config';
import { usePlasticity } from './PlasticityProvider';
import type { NavLink, NavNode } from '@/types/content';

function isItemActive(pathname: string, href: string) {
  if (pathname === href) return true;
  if (href === '/projects') {
    return pathname.startsWith('/projects/') && !pathname.startsWith('/projects/archive');
  }
  return pathname.startsWith(`${href}/`);
}

function isNodeActive(pathname: string, node: NavNode) {
  if (node.href && isItemActive(pathname, node.href)) return true;
  return (node.children ?? []).some((child) => isItemActive(pathname, child.href));
}

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acetylcholine-400';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const { openCommandPalette, openSystemPanel } = usePlasticity();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    if (!openMenu && !isOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenMenu(null);
        setIsOpen(false);
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [openMenu, isOpen]);

  return (
    <nav
      ref={navRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-cortex-700 bg-cortex-900/90 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className={cn('flex shrink-0 items-center gap-2 rounded-lg', focusRing)}
          onClick={() => setIsOpen(false)}
        >
          <Brain className="h-7 w-7 text-acetylcholine-500" aria-hidden="true" />
          <span className="font-serif text-lg font-semibold text-glutamate-500">
            JairoSaul
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {siteConfig.navigation.map((node) => (
            <li key={node.label}>
              {node.children?.length ? (
                <NavDropdown
                  node={node}
                  pathname={pathname}
                  open={openMenu === node.label}
                  onOpen={() => setOpenMenu(node.label)}
                  onClose={() => setOpenMenu(null)}
                />
              ) : (
                <Link
                  href={node.href ?? '/'}
                  className={cn(
                    'inline-flex whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium',
                    focusRing,
                    node.href && isNodeActive(pathname, node)
                      ? 'bg-acetylcholine-500/10 text-acetylcholine-400'
                      : 'text-cortex-200 hover:bg-cortex-800 hover:text-white',
                  )}
                >
                  {node.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-1 md:flex">
          <button
            type="button"
            onClick={openCommandPalette}
            className={cn(
              'rounded-lg p-2 text-cortex-400 hover:bg-cortex-800 hover:text-acetylcholine-400',
              focusRing,
            )}
            title="Buscar (⌘K)"
          >
            <Command className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={openSystemPanel}
            className={cn(
              'rounded-lg p-2 text-cortex-400 hover:bg-cortex-800 hover:text-dopamine-400',
              focusRing,
            )}
            title="Panel del sistema"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className={cn(
            'rounded-lg p-2 text-cortex-200 hover:bg-cortex-800 md:hidden',
            focusRing,
          )}
          aria-expanded={isOpen}
          aria-controls="menu-movil"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">{isOpen ? 'Cerrar menú' : 'Abrir menú'}</span>
        </button>
      </div>

      {isOpen ? (
        <div
          id="menu-movil"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-cortex-700 bg-cortex-900 md:hidden"
        >
          <div className="space-y-5 px-4 py-5">
            {siteConfig.navigation.map((node) => (
              <div key={`mobile-${node.label}`}>
                {node.children?.length ? (
                  <>
                    <p className="px-2 text-xs font-semibold uppercase tracking-wider text-cortex-500">
                      {node.label}
                    </p>
                    <ul className="mt-2 space-y-1">
                      {node.children.map((child) => (
                        <li key={child.href}>
                          <MobileLink
                            item={child}
                            pathname={pathname}
                            onNavigate={() => setIsOpen(false)}
                          />
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <MobileLink
                    item={{
                      label: node.label,
                      href: node.href ?? '/',
                      description: node.description,
                    }}
                    pathname={pathname}
                    onNavigate={() => setIsOpen(false)}
                  />
                )}
              </div>
            ))}
            <div className="flex gap-2 border-t border-cortex-800 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  openCommandPalette();
                }}
                className={cn(
                  'flex flex-1 items-center justify-center gap-2 rounded-lg border border-cortex-700 px-3 py-2 text-sm text-cortex-200',
                  focusRing,
                )}
              >
                <Command className="h-4 w-4" />
                Buscar
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  openSystemPanel();
                }}
                className={cn(
                  'flex flex-1 items-center justify-center gap-2 rounded-lg border border-cortex-700 px-3 py-2 text-sm text-cortex-200',
                  focusRing,
                )}
              >
                <Settings className="h-4 w-4" />
                Sistema
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}

function MobileLink({
  item,
  pathname,
  onNavigate,
}: {
  item: NavLink;
  pathname: string;
  onNavigate: () => void;
}) {
  const active = isItemActive(pathname, item.href);
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        'block rounded-lg px-3 py-2',
        focusRing,
        active
          ? 'bg-acetylcholine-500/10 text-acetylcholine-400'
          : 'text-cortex-100 hover:bg-cortex-800',
      )}
    >
      <span className="text-sm font-medium">{item.label}</span>
      {item.description ? (
        <span className="mt-0.5 block text-xs text-cortex-400">{item.description}</span>
      ) : null}
    </Link>
  );
}

function NavDropdown({
  node,
  pathname,
  open,
  onOpen,
  onClose,
}: {
  node: NavNode;
  pathname: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const menuId = useId();
  const closeTimer = useRef<number | null>(null);
  const active = isNodeActive(pathname, node);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = window.setTimeout(onClose, 160);
  }, [cancelClose, onClose]);

  useEffect(() => {
    return () => cancelClose();
  }, [cancelClose]);

  const triggerClass = cn(
    'inline-flex items-center gap-1 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium',
    focusRing,
    active || open
      ? 'bg-acetylcholine-500/10 text-acetylcholine-400'
      : 'text-cortex-200 hover:bg-cortex-800 hover:text-white',
  );

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        onOpen();
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className={triggerClass}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => (open ? onClose() : onOpen())}
      >
        {node.label}
        <ChevronDown
          className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          className="absolute left-0 top-full z-50 min-w-64 pt-2"
          onMouseEnter={cancelClose}
        >
          <ul className="rounded-xl border border-cortex-700 bg-cortex-900 p-2 shadow-xl shadow-black/40">
            {node.children?.map((child) => {
              const childActive = isItemActive(pathname, child.href);
              return (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    role="menuitem"
                    className={cn(
                      'block rounded-lg px-3 py-2',
                      focusRing,
                      childActive
                        ? 'bg-acetylcholine-500/10 text-acetylcholine-400'
                        : 'text-cortex-100 hover:bg-cortex-800',
                    )}
                  >
                    <span className="block text-sm font-medium">{child.label}</span>
                    {child.description ? (
                      <span className="mt-0.5 block text-xs leading-snug text-cortex-400">
                        {child.description}
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
