'use client';

import { useState } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { siteConfig } from '@/lib/config';
import NeuralBackground from '@/components/ui/NeuralBackground';
import { MessageCircle, Mail, Linkedin, Twitter, Github, Youtube, Send, CheckCircle, Instagram, MessageSquare, Zap } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío (aquí iría la lógica real)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cortex-900 via-cortex-800 to-cortex-900 relative overflow-hidden">
      {/* Neural Background con tema robótico */}
      <NeuralBackground theme="robotic" intensity="medium" />
      
      <Navigation />
      
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 fade-in">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-glutamate-500 mb-6">
              Establecer Sinapsis
            </h1>
            <p className="text-xl text-cortex-300 max-w-3xl mx-auto leading-relaxed">
              ¿Tienes un proyecto que puede cambiar el mundo? ¿Quieres colaborar, 
              invertir, o simplemente conectar? Estoy aquí para construir el futuro juntos.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulario */}
            <div className="bg-cortex-800 border border-cortex-700 rounded-xl p-8 fade-in">
              <div className="flex items-center mb-6">
                <MessageCircle className="h-8 w-8 text-acetylcholine-500 mr-3" />
                <h2 className="font-serif text-2xl font-semibold text-glutamate-500">
                  Enviar Mensaje
                </h2>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12 fade-in">
                  <CheckCircle className="h-16 w-16 text-dopamine-500 mx-auto mb-4" />
                  <h3 className="font-serif text-xl font-semibold text-glutamate-500 mb-2">
                    ¡Sinapsis Establecida!
                  </h3>
                  <p className="text-cortex-300">
                    Tu mensaje ha sido enviado. Te responderé pronto.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-cortex-300 mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-cortex-700 border border-cortex-600 rounded-lg text-glutamate-500 focus:outline-none focus:ring-2 focus:ring-acetylcholine-500 focus:border-transparent"
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-cortex-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-cortex-700 border border-cortex-600 rounded-lg text-glutamate-500 focus:outline-none focus:ring-2 focus:ring-acetylcholine-500 focus:border-transparent"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-cortex-300 mb-2">
                      Motivo del Contacto
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-cortex-700 border border-cortex-600 rounded-lg text-glutamate-500 focus:outline-none focus:ring-2 focus:ring-acetylcholine-500 focus:border-transparent"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="inversion">Inversión en Startups</option>
                      <option value="colaboracion">Colaboración Estratégica</option>
                      <option value="prensa">Prensa y Medios</option>
                      <option value="talento">Unirse al Equipo</option>
                      <option value="mentoria">Mentoría y Consultoría</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-cortex-300 mb-2">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-cortex-700 border border-cortex-600 rounded-lg text-glutamate-500 focus:outline-none focus:ring-2 focus:ring-acetylcholine-500 focus:border-transparent resize-none"
                      placeholder="Cuéntame sobre tu proyecto, idea o propuesta..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center px-6 py-3 bg-dopamine-500 text-white rounded-lg font-medium hover:bg-dopamine-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="loader mr-2" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Enviar Mensaje
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Información de Contacto */}
            <div className="space-y-8 fade-in">
              {/* Información Personal */}
              <div className="bg-cortex-800 border border-cortex-700 rounded-xl p-8">
                <h3 className="font-serif text-xl font-semibold text-glutamate-500 mb-4">
                  Información Personal
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-acetylcholine-500 mr-3" />
                    <span className="text-cortex-300">{siteConfig.author.email}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-5 w-5 text-acetylcholine-500 mr-3" />
                    <span className="text-cortex-300">{siteConfig.author.location}</span>
                  </div>
                </div>
              </div>

              {/* Redes Sociales */}
              <div className="bg-cortex-800 border border-cortex-700 rounded-xl p-6">
                <h3 className="font-serif text-xl font-semibold text-glutamate-500 mb-4">
                  Conecta en Redes
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {siteConfig.social.map((social) => {
                    const getIcon = () => {
                      switch (social.platform) {
                        case 'LinkedIn': return <Linkedin className="h-5 w-5" />;
                        case 'Twitter': return <Twitter className="h-5 w-5" />;
                        case 'GitHub': return <Github className="h-5 w-5" />;
                        case 'YouTube': return <Youtube className="h-5 w-5" />;
                        case 'Instagram': return <Instagram className="h-5 w-5" />;
                        case 'TikTok': return <MessageSquare className="h-5 w-5" />;
                        case 'Pinterest': return <Zap className="h-5 w-5" />;
                        case 'WhatsApp': return <MessageCircle className="h-5 w-5" />;
                        default: return <Mail className="h-5 w-5" />;
                      }
                    };

                    const getColor = () => {
                      switch (social.platform) {
                        case 'LinkedIn': return 'hover:bg-blue-500/20 hover:text-blue-400';
                        case 'Twitter': return 'hover:bg-sky-500/20 hover:text-sky-400';
                        case 'GitHub': return 'hover:bg-gray-500/20 hover:text-gray-400';
                        case 'YouTube': return 'hover:bg-red-500/20 hover:text-red-400';
                        case 'Instagram': return 'hover:bg-pink-500/20 hover:text-pink-400';
                        case 'TikTok': return 'hover:bg-emerald-500/20 hover:text-emerald-400';
                        case 'Pinterest': return 'hover:bg-red-600/20 hover:text-red-500';
                        case 'WhatsApp': return 'hover:bg-green-500/20 hover:text-green-400';
                        default: return 'hover:bg-acetylcholine-500/20 hover:text-acetylcholine-400';
                      }
                    };

                    return (
                      <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center w-12 h-12 bg-cortex-700 rounded-full transition-all duration-300 group ${getColor()}`}
                        title={social.platform}
                      >
                        <div className="text-cortex-300 group-hover:scale-110 transition-transform">
                          {getIcon()}
                        </div>
                      </a>
                    );
                  })}
                </div>
                <p className="text-xs text-cortex-400 mt-3 text-center">
                  Sígueme en todas las plataformas para contenido exclusivo
                </p>
              </div>

              {/* Tipos de Colaboración */}
              <div className="bg-cortex-800 border border-cortex-700 rounded-xl p-8">
                <h3 className="font-serif text-xl font-semibold text-glutamate-500 mb-4">
                  Tipos de Colaboración
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-dopamine-500 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-glutamate-500">Inversión</h4>
                      <p className="text-sm text-cortex-300">Proyectos con potencial de alto impacto</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-acetylcholine-500 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-glutamate-500">Colaboración</h4>
                      <p className="text-sm text-cortex-300">Alianzas estratégicas y joint ventures</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-serotonin-500 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-glutamate-500">Mentoría</h4>
                      <p className="text-sm text-cortex-300">Guía para fundadores y equipos</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-acetylcholine-500 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-glutamate-500">Talento</h4>
                      <p className="text-sm text-cortex-300">Unirse a equipos de alto rendimiento</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
