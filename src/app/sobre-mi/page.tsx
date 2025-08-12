'use client';

import { Mail, Phone, Calendar, MapPin, Github, Linkedin, Twitter, Youtube, Instagram, Facebook, MessageCircle, Dna, Brain, Cpu, Atom, Microscope, FlaskConical, TestTube, CircuitBoard, Network, Wifi, Satellite, Rocket, Globe, Shield, Award, Star, Sparkles, Zap, Target } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Navigation } from '@/components/layout/Navigation';
import NeuralBackground from '@/components/ui/NeuralBackground';
import ThemedButton from '@/components/ui/ThemedButton';
import ThemedCard from '@/components/ui/ThemedCard';

const personalInfo = {
  name: "Jairo Saul",
  lastName: "Salas Quiñones",
  title: "Startup Technical Founder | FullStack Software Engineer | Business Developer | Scientific Content Creator",
  email: "JairoProDev@gmail.com",
  phone: "+51 937 054 328",
  birthday: "September 18, 2002",
  location: "Cusco, Perú 🇵🇪 LATAM → World 🌐",
  social: {
    github: "https://github.com/JairoSaulProDev",
    linkedin: "https://linkedin.com/in/JairoSaulProDev",
    twitter: "https://twitter.com/JairoSaulProDev",
    youtube: "https://youtube.com/@JairoSaulProDev",
    instagram: "https://instagram.com/JairoSaulProDev",
    facebook: "https://facebook.com/JairoSaulProDev",
    tiktok: "https://tiktok.com/@JairoSaulProDev",
  }
};

const personalProjects = [
  {
    name: "Pro-Dev",
    description: "Professional Development",
    icon: "🎯",
    color: "acetylcholine",
    href: "/proyectos"
  },
  {
    name: "Grow-Hack",
    description: "Personal Growth",
    icon: "📈",
    color: "dopamine",
    href: "/ideas"
  },
  {
    name: "Sci-Tech",
    description: "Science & Technology",
    icon: "🔬",
    color: "serotonin",
    href: "/ideas"
  },
  {
    name: "Well-Fit",
    description: "Nutrition & Workout",
    icon: "💪",
    color: "glutamate",
    href: "/ideas"
  },
  {
    name: "Startup Mindset",
    description: "Podcast about startup ecosystem",
    icon: "🎙️",
    color: "gaba",
    href: "/ideas"
  },
  {
    name: "Psycho-Sophia",
    description: "Mind Wise → Mindset & Wisdom",
    icon: "🧠",
    color: "cortex",
    href: "/ideas"
  }
];

const startups = [
  {
    name: "Buscadis",
    description: "Marketplace de avisos clasificados",
    status: "active",
    href: "/proyectos/buscadis"
  },
  {
    name: "Publicadis",
    description: "Saas de publicidad multiplataforma",
    status: "active",
    href: "/proyectos/publicadis"
  },
  {
    name: "DiverEdu",
    description: "YouTube de la educación",
    status: "planning",
    href: "/proyectos"
  },
  {
    name: "JourNews",
    description: "TikTok de noticias",
    status: "planning",
    href: "/proyectos"
  },
  {
    name: "PlayBook",
    description: "Spotify de los libros",
    status: "planning",
    href: "/proyectos"
  },
  {
    name: "Uplify",
    description: "ClickUp del desarrollo personal",
    status: "planning",
    href: "/proyectos"
  }
];

export default function SobreMiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cortex-900 via-cortex-800 to-cortex-900 relative overflow-hidden">
      {/* Neural Background con tema genético */}
      <NeuralBackground theme="genetic" intensity="medium" />
      
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sidebar - Información Personal */}
          <div className="lg:col-span-1">
            <div className="bg-cortex-800/50 backdrop-blur-sm border border-cortex-700 rounded-xl p-6 sticky top-8">
              
              {/* Foto de Perfil */}
              <div className="text-center mb-6">
                                            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-acetylcholine-500 to-dopamine-500 p-1">
                              <Image
                                src="/images/profile.png"
                                alt="Foto de perfil"
                                width={128}
                                height={128}
                                className="w-full h-full object-cover rounded-full bg-cortex-900"
                              />
                            </div>
                <h1 className="text-2xl font-bold text-white mb-1">{personalInfo.name}</h1>
                <p className="text-cortex-300 text-sm">{personalInfo.lastName}</p>
                <p className="text-acetylcholine-400 text-sm mt-2">{personalInfo.title}</p>
              </div>

              {/* Información de Contacto */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="w-4 h-4 text-acetylcholine-400" />
                  <span className="text-cortex-300">{personalInfo.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="w-4 h-4 text-acetylcholine-400" />
                  <span className="text-cortex-300">{personalInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Calendar className="w-4 h-4 text-acetylcholine-400" />
                  <span className="text-cortex-300">{personalInfo.birthday}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <MapPin className="w-4 h-4 text-acetylcholine-400" />
                  <span className="text-cortex-300">{personalInfo.location}</span>
                </div>
              </div>

              {/* Redes Sociales */}
              <div className="border-t border-cortex-700 pt-4">
                <h3 className="text-sm font-semibold text-white mb-3">Redes Sociales</h3>
                <div className="grid grid-cols-4 gap-2">
                  <Link href={personalInfo.social.github} className="p-2 bg-cortex-700 hover:bg-acetylcholine-500/20 rounded-lg transition-colors">
                    <Github className="w-4 h-4 text-cortex-300" />
                  </Link>
                  <Link href={personalInfo.social.linkedin} className="p-2 bg-cortex-700 hover:bg-acetylcholine-500/20 rounded-lg transition-colors">
                    <Linkedin className="w-4 h-4 text-cortex-300" />
                  </Link>
                  <Link href={personalInfo.social.twitter} className="p-2 bg-cortex-700 hover:bg-acetylcholine-500/20 rounded-lg transition-colors">
                    <Twitter className="w-4 h-4 text-cortex-300" />
                  </Link>
                  <Link href={personalInfo.social.youtube} className="p-2 bg-cortex-700 hover:bg-acetylcholine-500/20 rounded-lg transition-colors">
                    <Youtube className="w-4 h-4 text-cortex-300" />
                  </Link>
                  <Link href={personalInfo.social.instagram} className="p-2 bg-cortex-700 hover:bg-acetylcholine-500/20 rounded-lg transition-colors">
                    <Instagram className="w-4 h-4 text-cortex-300" />
                  </Link>
                  <Link href={personalInfo.social.facebook} className="p-2 bg-cortex-700 hover:bg-acetylcholine-500/20 rounded-lg transition-colors">
                    <Facebook className="w-4 h-4 text-cortex-300" />
                  </Link>
                  <Link href={personalInfo.social.tiktok} className="p-2 bg-cortex-700 hover:bg-acetylcholine-500/20 rounded-lg transition-colors">
                    <MessageCircle className="w-4 h-4 text-cortex-300" />
                  </Link>
                  <Link href="/contacto" className="p-2 bg-cortex-700 hover:bg-acetylcholine-500/20 rounded-lg transition-colors">
                    <Mail className="w-4 h-4 text-cortex-300" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido Principal */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Introducción */}
            <div className="bg-cortex-800/30 backdrop-blur-sm border border-cortex-700 rounded-xl p-6">
              <h2 className="text-3xl font-bold text-white mb-4">I&apos;m Jairo Saul</h2>
              <div className="h-px bg-gradient-to-r from-acetylcholine-500 to-dopamine-500 mb-6"></div>
              <p className="text-lg text-cortex-300 mb-4">
                Programmer / Startup Founder / Full Stack Dev / Scientific Popularizer
              </p>
              <p className="text-cortex-400 leading-relaxed">
                Creo firmemente en el poder de la tecnología para cambiar el mundo, y mi misión es seguir contribuyendo a este ecosistema a través de la creación de herramientas y soluciones disruptivas que resuelvan problemas reales. Mi enfoque está en el desarrollo continuo, tanto a nivel personal como profesional, con el objetivo de alcanzar la excelencia en todo lo que hago.
              </p>
            </div>

            {/* Proyectos Personales */}
            <div className="bg-cortex-800/30 backdrop-blur-sm border border-cortex-700 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6">Proyectos Personales</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {personalProjects.map((project, index) => (
                  <Link 
                    key={index} 
                    href={project.href}
                    className="group p-4 bg-cortex-700/50 hover:bg-cortex-700 rounded-lg transition-all duration-300 border border-cortex-600 hover:border-acetylcholine-500/50"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{project.icon}</span>
                      <div>
                        <h4 className="font-semibold text-white group-hover:text-acetylcholine-400 transition-colors">
                          {project.name}
                        </h4>
                        <p className="text-sm text-cortex-400">{project.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Startups */}
            <div className="bg-cortex-800/30 backdrop-blur-sm border border-cortex-700 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6">Startups</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {startups.map((startup, index) => (
                  <Link 
                    key={index} 
                    href={startup.href}
                    className="group p-4 bg-cortex-700/50 hover:bg-cortex-700 rounded-lg transition-all duration-300 border border-cortex-600 hover:border-dopamine-500/50"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-white group-hover:text-dopamine-400 transition-colors">
                          {startup.name}
                        </h4>
                        <p className="text-sm text-cortex-400">{startup.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        startup.status === 'active' 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}>
                        {startup.status === 'active' ? 'Activo' : 'Planificación'}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Declaración de Misión */}
            <div className="bg-cortex-800/30 backdrop-blur-sm border border-cortex-700 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Mi Misión</h3>
              <p className="text-cortex-400 leading-relaxed">
                Este sitio web es mi espacio personal para compartir mis proyectos, aprendizajes y reflexiones sobre el camino del emprendedor. Aquí encontrarás información sobre mi trabajo, mi portafolio, y mis pensamientos sobre las tecnologías emergentes y las tendencias en el mundo de las startups.
              </p>
              <div className="mt-6 flex space-x-4">
                <Link 
                  href="/proyectos"
                  className="px-4 py-2 bg-acetylcholine-500 hover:bg-acetylcholine-600 text-white rounded-lg transition-colors font-medium"
                >
                  Ver Proyectos
                </Link>
                <Link 
                  href="/ideas"
                  className="px-4 py-2 bg-cortex-700 hover:bg-cortex-600 text-white rounded-lg transition-colors font-medium"
                >
                  Leer Ideas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
