'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Brain, Menu, X, Command, Settings, User, Code, Lightbulb, Eye, BookOpen, MessageCircle, Search, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/config';
import { usePlasticity } from './PlasticityProvider';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { openCommandPalette, openSystemPanel } = usePlasticity();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cortex-900/80 backdrop-blur-md border-b border-cortex-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
            onClick={() => setIsOpen(false)}
          >
            <div className="relative hover:scale-110 transition-transform duration-200">
              <Brain className="h-8 w-8 text-acetylcholine-500" />
              <div className="absolute inset-0 rounded-full bg-acetylcholine-500/20 animate-pulse" />
            </div>
            <span className="font-serif text-xl font-semibold text-glutamate-500">
              JairoSaulProDev
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-5">
            {siteConfig.navigation.map((item) => {
              const getIcon = () => {
                switch (item.href) {
                  case '/sobre-mi': return <User className="h-4 w-4" />;
                  case '/projects': return <Code className="h-4 w-4" />;
                  case '/ideas': return <Lightbulb className="h-4 w-4" />;
                  case '/seo': return <Search className="h-4 w-4" />;
                  case '/industrias/turismo': return <MapPin className="h-4 w-4" />;
                  case '/vision': return <Eye className="h-4 w-4" />;
                  case '/cortex': return <Brain className="h-4 w-4" />;
                  case '/manifiesto': return <BookOpen className="h-4 w-4" />;
                  case '/contacto': return <MessageCircle className="h-4 w-4" />;
                  default: return null;
                }
              };

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative inline-flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg",
                    isActive(item.href)
                      ? "text-acetylcholine-500 bg-acetylcholine-500/10"
                      : "text-cortex-300 hover:text-glutamate-500 hover:bg-cortex-700"
                  )}
                >
                  {getIcon()}
                  <span>{item.label}</span>
                  {isActive(item.href) && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-acetylcholine-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Accesos Rápidos */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={openCommandPalette}
              className="p-2 text-cortex-400 hover:text-acetylcholine-500 hover:bg-cortex-700 rounded-lg transition-colors"
              title="Paleta de Comandos (⌘K)"
            >
              <Command className="h-5 w-5" />
            </button>
            <button
              onClick={openSystemPanel}
              className="p-2 text-cortex-400 hover:text-dopamine-500 hover:bg-cortex-700 rounded-lg transition-colors"
              title="Panel del Sistema (⌘,)"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-cortex-300 hover:text-glutamate-500 hover:bg-cortex-800 transition-colors"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-cortex-700">
            <div className="py-4 space-y-2">
              {siteConfig.navigation.map((item, index) => (
                <div
                  key={`mobile-nav-${item.href}`}
                  className="fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200",
                      isActive(item.href)
                        ? "text-acetylcholine-500 bg-acetylcholine-500/10"
                        : "text-cortex-300 hover:text-glutamate-500 hover:bg-cortex-800"
                    )}
                  >
                    {item.label}
                    {item.description && (
                      <p className="text-sm text-cortex-400 mt-1">
                        {item.description}
                      </p>
                    )}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
