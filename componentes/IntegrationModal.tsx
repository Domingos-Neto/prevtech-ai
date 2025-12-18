
import React from 'react';

interface IntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const IntegrationModal: React.FC<IntegrationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const smartSnippet = `<!-- IA PREVTECH - POSIÇÃO ESQUERDA (EVITA CONFLITOS) -->
<div id="prevtech-ai-container" style="position:fixed; bottom:20px; left:20px; width:70px; height:70px; z-index:99999; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
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
    } else if (event.data === 'prevtech-ai-close') {
      container.style.width = '70px';
      container.style.height = '70px';
    }
  });
</script>`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-[#0d47a1] text-white">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">SOLUÇÃO DE CONFLITO</h2>
            <p className="text-xs opacity-70 uppercase font-bold mt-1 text-white">IA movida para a esquerda</p>
          </div>
          <button onClick={onClose} className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-white/10 text-white transition-colors">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6">
          <div className="bg-green-50 p-4 rounded-2xl border border-green-100 flex gap-4">
            <i className="ri-checkbox-circle-fill text-green-600 text-xl"></i>
            <p className="text-xs text-green-800 leading-relaxed">
              <b>Problema resolvido!</b> Movi a IA para o canto <b>esquerdo</b>. Agora ela não bloqueia o seu WhatsApp nem a Calculadora que ficam na direita.
            </p>
          </div>

          <section>
            <h3 className="font-bold text-slate-800 uppercase text-[10px] mb-3 tracking-widest">Novo Código para o seu index.html</h3>
            <div className="bg-slate-900 rounded-2xl p-5 relative group border border-slate-800 shadow-inner">
              <pre className="text-[10px] text-blue-300 overflow-x-auto leading-relaxed font-mono">
                {smartSnippet}
              </pre>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(smartSnippet);
                  alert('Novo Código copiado!');
                }}
                className="absolute top-4 right-4 bg-white/10 hover:bg-[#0d47a1] text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase transition-all flex items-center gap-2"
              >
                <i className="ri-file-copy-line"></i> Copiar Código
              </button>
            </div>
          </section>

          <section className="bg-amber-50 p-5 rounded-2xl border border-amber-100">
            <h3 className="font-bold text-amber-900 text-[10px] uppercase tracking-widest mb-2">Atenção ao Erro do GitHub (Página não encontrada)</h3>
            <p className="text-[11px] text-amber-800 leading-relaxed mb-3">
              O erro que você viu no vídeo acontece porque o GitHub Pages não foi ativado corretamente. Faça isso:
            </p>
            <ol className="text-[11px] text-amber-800 space-y-1 list-decimal ml-4">
              <li>No seu projeto <b>prevtech-ai</b> no GitHub, vá em <b>Settings</b>.</li>
              <li>No menu lateral, clique em <b>Pages</b>.</li>
              <li>Em <b>Branch</b>, selecione <b>main</b> e a pasta <b>/(root)</b>.</li>
              <li>Clique em <b>Save</b>.</li>
              <li>Espere 1 minuto e recarregue o seu sistema principal.</li>
            </ol>
          </section>
        </div>

        <div className="p-5 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-[#0d47a1] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#0a3d8a] transition-all"
          >
            Entendido!
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntegrationModal;
