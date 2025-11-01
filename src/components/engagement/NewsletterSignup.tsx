'use client';

import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Por ahora solo simulación - integrar con ConvertKit, Beehiiv, etc.
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Aquí iría la integración real:
      // const response = await fetch('/api/newsletter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });

      setStatus('success');
      setMessage('¡Gracias! Revisa tu email para confirmar.');
      setEmail('');

      // Reset después de 5 segundos
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setMessage('Algo salió mal. Intenta nuevamente.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/30 to-slate-700/20 backdrop-blur-xl border border-slate-500/20 rounded-2xl p-8 shadow-xl">
      <div className="flex items-start space-x-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-acetylcholine-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
          <Mail className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="font-serif text-xl font-bold text-white mb-2">
            Newsletter Semanal
          </h3>
          <p className="text-slate-300 text-sm">
            Insights sobre startups, tech y construcción de productos. Sin spam, solo valor.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            disabled={status === 'loading' || status === 'success'}
            className="w-full px-4 py-3 bg-cortex-800/50 border border-cortex-700 rounded-lg text-white placeholder-cortex-400 focus:outline-none focus:border-acetylcholine-500 transition-colors disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="w-full px-6 py-3 bg-gradient-to-r from-acetylcholine-500 to-emerald-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Suscribiendo...' : status === 'success' ? '¡Suscrito!' : 'Suscribirme'}
        </button>

        {message && (
          <div className={`flex items-center space-x-2 text-sm ${
            status === 'success' ? 'text-green-400' : 'text-red-400'
          }`}>
            {status === 'success' ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <span>{message}</span>
          </div>
        )}
      </form>

      <div className="mt-4 pt-4 border-t border-cortex-700">
        <p className="text-xs text-cortex-400 text-center">
          ~200 fundadores ya suscritos • No spam • Cancela cuando quieras
        </p>
      </div>
    </div>
  );
}
