interface HeroProps {
  meta: any;
  summary: any;
}

export default function Hero({ meta, summary }: HeroProps) {
  const date = meta?.kyc_updated_at
    ? new Date(meta.kyc_updated_at).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '2026-07';

  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/3 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm mb-6">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          数据更新至 {date} · 含大陆 KYC 实测数据
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="bg-gradient-to-r from-gold via-amber-400 to-yellow-500 bg-clip-text text-transparent glow-gold">
            U 卡对比百科
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-4">
          一站式加密货币消费卡对比 — 大陆可用性·返现·手续费·KYC·权益·余额生息
        </p>
        <p className="text-sm text-gray-500 max-w-xl mx-auto">
          覆盖 EtherFi、Plasma、Bitget、Binance、OKX、Gate、Bybit、Crypto.com、RedotPay 等主流 U 卡。
          重点标注中国大陆用户实际可用性（身份证/护照 KYC、海外地址要求）
        </p>

        {/* Quick stats */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <div className="glass-card px-5 py-3">
            <p className="text-xs text-gray-500 mb-1">🟢 大陆可直接用</p>
            <p className="text-sm font-semibold text-green-cyber">Bitget Wallet Card</p>
          </div>
          <div className="glass-card px-5 py-3">
            <p className="text-xs text-gray-500 mb-1">🟡 需海外地址</p>
            <p className="text-sm font-semibold text-yellow-400">RedotPay · Plasma · Crypto.com</p>
          </div>
          <div className="glass-card px-5 py-3">
            <p className="text-xs text-gray-500 mb-1">🏆 返现最强</p>
            <p className="text-sm font-semibold">
              {summary.best_cashback?.[0]?.card || 'Plasma One'} <span className="text-gold">{summary.best_cashback?.[0]?.rate || '3%'}</span>
            </p>
          </div>
          <div className="glass-card px-5 py-3">
            <p className="text-xs text-gray-500 mb-1">📈 生息最强</p>
            <p className="text-sm font-semibold">
              {summary.best_yield?.[0]?.card || 'Plasma One'} <span className="text-gold">{summary.best_yield?.[0]?.apy || '10%+'}</span>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
