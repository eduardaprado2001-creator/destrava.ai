import React from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';

interface Page22Props {
  onNext: () => void;
  gainXp: (amount: number, reason?: string) => void;
}

export function Page22Offer({ onNext, gainXp }: Page22Props) {
  const handlePurchase = () => {
    gainXp(50, "p22_offer");
    // Aqui você adicionaria a integração com o sistema de pagamento
    alert("Redirecionando para pagamento...");
  };

  // Função para calcular a data 7 dias a partir de hoje
  const getDateIn7Days = () => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 7);
    
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    
    return futureDate.toLocaleDateString('pt-BR', options);
  };

  return (
    <div className="rounded-3xl p-6 md:p-8 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-b from-[#2b1a4e] via-[#3c2569] to-[#4B2E83] text-[#FCEEE3]">
      <h3 className="text-2xl md:text-3xl font-black tracking-tight text-red-400 mb-6 text-center">
        🚨 Chega de enrolação!
      </h3>
      
      <div className="space-y-6">
        {/* Diagnóstico e oportunidade */}
        <div className="rounded-2xl p-6 ring-1 ring-white/10 bg-gradient-to-br from-[#5e348f] to-[#3d225e]">
          <p className="text-lg mb-4">
            <span className="text-red-400 font-bold">👉</span> Seu diagnóstico mostrou com clareza: você está afundado na procrastinação.
          </p>
          <p className="text-lg mb-4">
            <span className="text-yellow-400 font-bold">👉</span> E agora tem a chance de cortar essa corrente no pescoço com um plano feito sob medida — por menos do que o preço de uma pizza.
          </p>
          
          <div className="mt-6 p-4 rounded-xl bg-red-900/30 ring-1 ring-red-500/30">
            <p className="text-lg font-bold text-red-300 mb-2">
              <span className="text-yellow-400">⚡</span> Mas atenção: essa oportunidade expira em poucos dias.
            </p>
            <p className="text-lg text-white">
              <span className="text-green-400 font-bold">👉</span> Se você aplicar, até <span className="font-bold text-yellow-400">{getDateIn7Days()}</span>, já vai sentir os primeiros resultados.
            </p>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        {/* O Espelho do Futuro */}
        <div className="rounded-2xl p-6 ring-1 ring-red-500/30 bg-gradient-to-br from-[#2a0f0f] to-[#1a0505]">
          <h4 className="text-xl font-black text-red-400 mb-6 text-center">💀 O Espelho do Futuro</h4>
          
          <p className="text-lg font-bold text-red-300 mb-4">
            <span className="text-yellow-400">⚠️</span> Imagina daqui a 6 meses…
          </p>
          
          <div className="space-y-3 mb-6">
            <p className="text-lg flex items-center gap-2">
              <span className="text-red-400 font-bold">❌</span>
              <span>Sua carreira travada.</span>
            </p>
            <p className="text-lg flex items-center gap-2">
              <span className="text-red-400 font-bold">❌</span>
              <span>Seu dinheiro escorrendo pelos dedos.</span>
            </p>
            <p className="text-lg flex items-center gap-2">
              <span className="text-red-400 font-bold">❌</span>
              <span>Sua confiança esmagada.</span>
            </p>
            <p className="text-lg flex items-center gap-2">
              <span className="text-red-400 font-bold">❌</span>
              <span>Você encarando o teto à noite, pensando: "Por que eu não aproveitei quando tive a chance?"</span>
            </p>
          </div>
          
          <p className="text-lg font-bold text-white mb-4">
            <span className="text-green-400 font-bold">👉</span> Mas também pode ser diferente:
          </p>
          
          <div className="space-y-2">
            <p className="text-lg flex items-center gap-2">
              <span className="text-green-400 font-bold">✨</span>
              <span>Você entregando projetos no prazo,</span>
            </p>
            <p className="text-lg flex items-center gap-2">
              <span className="text-green-400 font-bold">✨</span>
              <span>ganhando mais dinheiro,</span>
            </p>
            <p className="text-lg flex items-center gap-2">
              <span className="text-green-400 font-bold">✨</span>
              <span>recuperando sua confiança,</span>
            </p>
            <p className="text-lg flex items-center gap-2">
              <span className="text-green-400 font-bold">✨</span>
              <span>e olhando no espelho com orgulho real.</span>
            </p>
          </div>
          
          <p className="text-lg font-bold text-yellow-400 mt-6 text-center">
            <span className="text-yellow-400">⚡</span> A escolha é só sua: ficar preso na mesma dor… ou clicar agora e começar a viver essa virada.
          </p>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        {/* Oferta */}
        <div className="rounded-2xl p-6 ring-1 ring-white/10 bg-gradient-to-br from-[#1f3550] to-[#0f1c2b]">
          <p className="text-lg font-bold text-white mb-4">
            <span className="text-red-400 font-bold">👉</span> Essa é a vida que a procrastinação já está construindo pra você.
          </p>
          
          <p className="text-lg font-bold text-green-300 mb-6">
            <span className="text-green-400 font-bold">✨</span> Mas existe uma escolha:
          </p>
          
          <div className="rounded-xl p-5 bg-gradient-to-r from-green-900/30 to-emerald-900/30 ring-1 ring-green-500/30 mb-6">
            <p className="text-lg font-bold text-white mb-4">
              <span className="text-yellow-400 font-bold">🔥</span> Por apenas <span className="text-2xl font-black text-[#FFCC48]">R$37</span> – vitalício, você recebe um plano personalizado que em 5 dias já mostra resultado…
            </p>
            <p className="text-lg text-green-200">
              … e em 14 dias pode transformar sua rotina inteira.
            </p>
          </div>
          
          <div className="rounded-xl p-5 bg-gradient-to-r from-purple-900/30 to-pink-900/30 ring-1 ring-purple-500/30 mb-6">
            <p className="text-lg font-bold text-purple-200 mb-2">
              <span className="text-yellow-400 font-bold">🎁</span> Bônus Mortal (só hoje):
            </p>
            <p className="text-lg text-white">
              <span className="text-purple-400 font-bold">👉</span> Acesso à Aula Secreta "Técnica X" — método que já fez centenas esmagarem a procrastinação em menos de 15 minutos.
            </p>
          </div>
        </div>

        {/* Última chance */}
        <div className="rounded-2xl p-6 ring-1 ring-yellow-500/30 bg-gradient-to-br from-[#3a2f0f] to-[#2a1f05] text-center">
          <p className="text-xl font-black text-yellow-400 mb-4">
            <span className="text-yellow-400">⚡</span> Essa é a hora da virada:
          </p>
          
          <p className="text-lg font-bold text-red-300 mb-2">
            <span className="text-red-400 font-bold">💀</span> Se você fechar essa tela agora, nada muda.
          </p>
          <p className="text-lg font-bold text-green-300">
            <span className="text-green-400 font-bold">👉</span> Mas se clicar no botão abaixo, começa a construir a versão sua que faz, termina e conquista.
          </p>
        </div>

        {/* CTA Final */}
        <div className="text-center">
          <p className="text-lg font-bold text-red-400 mb-6">
            <span className="text-red-400 font-bold">🔥</span> CTA Final:
          </p>
          
          <button
            onClick={handlePurchase}
            className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-6 rounded-2xl font-black text-xl text-black bg-gradient-to-r from-[#39FF88] to-[#00FF7F] hover:from-[#32e077] hover:to-[#00e66f] transition-all duration-300 shadow-[0_25px_70px_rgba(57,255,136,.6)] hover:shadow-[0_30px_80px_rgba(57,255,136,.8)] transform hover:scale-105"
          >
            QUERO MEU PLANO AGORA – R$37 VITALÍCIO
            <ChevronRight className="size-6" />
          </button>
        </div>
      </div>
    </div>
  );
}