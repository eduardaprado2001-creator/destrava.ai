export function Page05Mirror({ onNext, gainXp, setAnswer }: Page05Props) {
  const options = [
    "Sempre, sinto que tô enterrando minha própria chance de vencer",
    "Muitas vezes, me sinto cada vez mais distante da vida que eu queria", 
    "Às vezes, mas já dói muito",
    "Em alguns momentos, mas sei que tô me sabotando"
  ];

  const handleSelect = (value: string) => {
    setAnswer(value);
    gainXp(10);
    onNext();
  };

  return (
    <div className="rounded-3xl p-6 md:p-8 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-b from-[#2b1a4e] via-[#3c2569] to-[#4B2E83] text-[#FCEEE3]">
      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-3">
        Quando olha no espelho, você sente que está desperdiçando seu potencial e deixando sua melhor versão morrer com o tempo?
      </h3>

      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(option)}
            className="w-full p-4 text-left rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 border border-white/10 hover:border-white/20"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}