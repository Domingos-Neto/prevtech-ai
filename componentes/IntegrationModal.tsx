
import React from 'react';

interface IntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const IntegrationModal: React.FC<IntegrationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const iframeSnippet = `<iframe 
  src="https://sua-ia-prevtech.vercel.app" 
  width="400" 
  height="600" 
  style="border:none; border-radius:16px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);"
></iframe>`;

  const widgetSnippet = `<script src="https://sua-ia-prevtech.vercel.app/widget.js"></script>
<script>
  window.PrevTechAI.init({
    position: 'bottom-right',
    theme: 'light'
  });
</script>`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Guia de Integração PREVTECH</h2>
            <p className="text-sm text-slate-500">Escolha como conectar a IA ao seu sistema</p>
          </div>
          <button onClick={onClose} className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-500 transition-colors">
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[70vh] space-y-8">
          {/* Opção 1 */}
          <section>
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 text-blue-600 h-8 w-8 rounded-lg flex items-center justify-center">
                <i className="fas fa-window-maximize"></i>
              </div>
              <h3 className="font-semibold text-slate-800">1. Iframe (Hospedagem Externa)</h3>
            </div>
            <p className="text-sm text-slate-600 mb-3">A forma mais rápida. Basta copiar o link da aplicação hospedada e colar no seu HTML.</p>
            <div className="bg-slate-900 rounded-xl p-4 relative group">
              <pre className="text-xs text-blue-300 overflow-x-auto">
                {iframeSnippet}
              </pre>
              <button 
                onClick={() => navigator.clipboard.writeText(iframeSnippet)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded text-[10px]"
              >
                Copiar
              </button>
            </div>
          </section>

          {/* Opção 2 */}
          <section>
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-purple-100 text-purple-600 h-8 w-8 rounded-lg flex items-center justify-center">
                <i className="fas fa-comment-dots"></i>
              </div>
              <h3 className="font-semibold text-slate-800">2. Widget Flutuante</h3>
            </div>
            <p className="text-sm text-slate-600 mb-3">Para sistemas onde a IA deve aparecer como um balão de conversa fixo no canto da tela.</p>
            <div className="bg-slate-900 rounded-xl p-4 relative group">
              <pre className="text-xs text-purple-300 overflow-x-auto">
                {widgetSnippet}
              </pre>
              <button 
                onClick={() => navigator.clipboard.writeText(widgetSnippet)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded text-[10px]"
              >
                Copiar
              </button>
            </div>
          </section>

          {/* Opção 3 */}
          <section className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
            <div className="flex items-center gap-3 mb-2">
              <i className="fas fa-code-branch text-blue-600"></i>
              <h3 className="font-semibold text-blue-800 text-sm">Integração via API (Headless)</h3>
            </div>
            <p className="text-xs text-blue-700 leading-relaxed">
              Você também pode usar apenas o <strong>geminiService.ts</strong> para fazer as chamadas e construir sua própria interface customizada dentro do PREVTECH, mantendo 100% da identidade visual do seu sistema.
            </p>
          </section>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-900 transition-colors"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntegrationModal;
