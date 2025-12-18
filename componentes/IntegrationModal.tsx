
import React from 'react';

interface IntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const IntegrationModal: React.FC<IntegrationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const smartSnippet = `<!-- IA PREVTECH - CÓDIGO INTELIGENTE -->
<div id="prevtech-ai-container" style="position:fixed; bottom:120px; right:20px; width:70px; height:70px; z-index:99999; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
  <iframe 
    id="prevtech-ai-iframe"
    src="https://domingos-neto.github.io/prevtech-ai/" 
    style="width:100%; height:100%; border:none; background:transparent;"
    allow="clipboard-read; clipboard-write"
  ></iframe>
</div>

<script>
  window.addEventListener('message', function(event) {
    const container = document.getElementById('prevtech-ai-container');
    if (!container) return;
    
    if (event.data === 'prevtech-ai-open') {
      container.style.width = '420px';
      container.style.height = '680px';
      container.style.bottom = '20px';
    } else if (event.data === 'prevtech-ai-close') {
      container.style.width = '70px';
      container.style.height = '70px';
      container.style.bottom = '120px'; // Ajustado para ficar acima dos seus botões
    }
  });
</script>`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-[#0d47a1] text-white">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">INTEGRAÇÃO INTELIGENTE</h2>
            <p className="text-xs opacity-70 uppercase font-bold mt-1">Evita o bloqueio de cliques no sistema</p>
          </div>
          <button onClick={onClose} className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-white/10 text-white transition-colors">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6">
          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex gap-4">
            <i className="ri-information-fill text-[#0d47a1] text-xl"></i>
            <p className="text-xs text-blue-800 leading-relaxed">
              O código abaixo foi otimizado para que a IA ocupe apenas <b>70px</b> quando fechada, permitindo que você use o WhatsApp e a Calculadora normalmente. Ele só expande quando você clica no robô.
            </p>
          </div>

          <section>
            <h3 className="font-bold text-slate-800 uppercase text-[10px] mb-3 tracking-widest">Código Final de Inserção</h3>
            <div className="bg-slate-900 rounded-2xl p-5 relative group border border-slate-800 shadow-inner">
              <pre className="text-[10px] text-blue-300 overflow-x-auto leading-relaxed font-mono">
                {smartSnippet}
              </pre>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(smartSnippet);
                  alert('Código Inteligente copiado!');
                }}
                className="absolute top-4 right-4 bg-white/10 hover:bg-[#0d47a1] text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase transition-all flex items-center gap-2"
              >
                <i className="ri-file-copy-line"></i> Copiar Código
              </button>
            </div>
          </section>

          <section className="bg-amber-50 p-5 rounded-2xl border border-amber-100">
            <div className="flex items-center gap-3 mb-2">
              <i className="ri-git-branch-line text-amber-600"></i>
              <h3 className="font-bold text-amber-900 text-[10px] uppercase tracking-widest">Sobre o erro do GitHub Pages</h3>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Se aparecer "There isn't a GitHub Pages site here", vá nas configurações do seu repositório no GitHub: <br/>
              <b>Settings > Pages > Build and deployment</b> e verifique se a <b>Branch</b> selecionada é a <b>main</b> e a pasta é a <b>/(root)</b>. Depois clique em Save.
            </p>
          </section>
        </div>

        <div className="p-5 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-[#0d47a1] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#0a3d8a] transition-all"
          >
            Pronto!
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntegrationModal;
