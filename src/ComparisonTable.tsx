import { UCard } from './types';
import { getCardSummary, getMainlandAvailability } from './data';

interface Props {
  cards: UCard[];
  onSelect: (card: UCard) => void;
}

const colorMap = {
  green: 'bg-green-cyber/15 text-green-cyber border-green-cyber/30',
  yellow: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  red: 'bg-red-cyber/15 text-red-cyber border-red-cyber/30',
  gray: 'bg-gray-500/15 text-gray-400 border-gray-500/20',
};

export default function ComparisonTable({ cards, onSelect }: Props) {
  const rows = cards.map(c => ({ card: c, summary: getCardSummary(c) }));

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-dark">
              <th className="text-left py-3 px-3 text-gray-400 font-medium whitespace-nowrap text-xs">平台</th>
              <th className="text-left py-3 px-3 text-gray-400 font-medium whitespace-nowrap text-xs">类型</th>
              <th className="text-left py-3 px-3 text-gray-400 font-medium whitespace-nowrap text-xs">返现</th>
              <th className="text-left py-3 px-3 text-gray-400 font-medium whitespace-nowrap text-xs">磨损/手续费</th>
              <th className="text-left py-3 px-3 text-gray-400 font-medium whitespace-nowrap text-xs">
                中国大陆可用
              </th>
              <th className="text-left py-3 px-3 text-gray-400 font-medium whitespace-nowrap text-xs">支持证件</th>
              <th className="text-left py-3 px-3 text-gray-400 font-medium whitespace-nowrap text-xs">优惠/福利</th>
              <th className="text-left py-3 px-3 text-gray-400 font-medium whitespace-nowrap text-xs">余额生息</th>
              <th className="text-left py-3 px-3 text-gray-400 font-medium whitespace-nowrap text-xs">网络</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ card, summary }, i) => {
              const isNoProduct = card.card_formats.includes('暂无U卡产品');
              return (
                <tr
                  key={card.slug}
                  onClick={() => !isNoProduct && onSelect(card)}
                  className={`border-b border-border-dark/50 transition-colors ${
                    i % 2 === 0 ? 'bg-card-dark/30' : ''
                  } ${isNoProduct ? 'opacity-50 cursor-default' : 'hover:bg-gold/5 cursor-pointer'}`}
                >
                  {/* Platform */}
                  <td className="py-3 px-3 font-semibold whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-gradient-to-br from-gold/30 to-amber-700/30 flex items-center justify-center text-xs font-bold text-gold flex-shrink-0">
                        {card.name.charAt(0)}
                      </span>
                      <span className="text-sm">{card.name}</span>
                      {isNoProduct && <span className="text-xs text-gray-500">⚠️</span>}
                    </div>
                  </td>

                  {/* Format */}
                  <td className="py-3 px-3 text-gray-400 text-xs whitespace-nowrap">
                    {summary.card_format}
                  </td>

                  {/* Cashback */}
                  <td className="py-3 px-3">
                    <span className={`font-bold text-sm ${summary.cashback_rate !== '无' ? 'text-gold' : 'text-gray-500'}`}>
                      {summary.cashback_rate}
                    </span>
                  </td>

                  {/* Fees */}
                  <td className="py-3 px-3 text-xs text-gray-400 max-w-[160px]">
                    {summary.fees_summary}
                  </td>

                  {/* Mainland availability */}
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${colorMap[summary.mainland_color]}`}>
                      {summary.mainland_label}
                    </span>
                  </td>

                  {/* Documents */}
                  <td className="py-3 px-3">
                    <span className="text-xs text-gray-300">{summary.mainland_docs}</span>
                  </td>

                  {/* Benefits */}
                  <td className="py-3 px-3 text-xs text-gray-400 max-w-[180px]">
                    {summary.benefits_summary}
                  </td>

                  {/* Yield */}
                  <td className="py-3 px-3">
                    <span className={`font-bold text-xs ${summary.yield_summary.startsWith('❌') ? 'text-gray-500' : 'text-gold'}`}>
                      {summary.yield_summary}
                    </span>
                  </td>

                  {/* Network */}
                  <td className="py-3 px-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      summary.card_network?.includes('Visa') ? 'bg-blue-500/20 text-blue-400' :
                      summary.card_network?.includes('Mastercard') ? 'bg-red-500/20 text-red-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {summary.card_network || '-'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-3">
        {rows.map(({ card, summary }) => {
          const isNoProduct = card.card_formats.includes('暂无U卡产品');
          return (
            <div
              key={card.slug}
              onClick={() => !isNoProduct && onSelect(card)}
              className={`glass-card p-4 ${isNoProduct ? 'opacity-50' : 'hover:border-gold/30 cursor-pointer'} transition-all`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-gradient-to-br from-gold/30 to-amber-700/30 flex items-center justify-center text-xs font-bold text-gold">
                    {card.name.charAt(0)}
                  </span>
                  <span className="font-semibold text-sm">{card.name}</span>
                  {isNoProduct && <span className="text-xs text-gray-500">⚠️</span>}
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  summary.card_network?.includes('Visa') ? 'bg-blue-500/20 text-blue-400' :
                  summary.card_network?.includes('Mastercard') ? 'bg-red-500/20 text-red-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {summary.card_network || '-'}
                </span>
              </div>

              {/* Mainland badge - prominent on mobile */}
              <div className="mb-3">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${colorMap[summary.mainland_color]}`}>
                  {summary.mainland_label}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-500">类型 · 证件</span>
                  <p className="mt-0.5">{summary.card_format} · {summary.mainland_docs}</p>
                </div>
                <div>
                  <span className="text-gray-500">返现</span>
                  <p className={`mt-0.5 font-bold ${summary.cashback_rate !== '无' ? 'text-gold' : 'text-gray-500'}`}>
                    {summary.cashback_rate}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">生息</span>
                  <p className={`mt-0.5 font-bold ${summary.yield_summary.startsWith('❌') ? 'text-gray-500' : 'text-gold'}`}>
                    {summary.yield_summary}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">福利</span>
                  <p className="mt-0.5 text-gray-400">{summary.benefits_summary}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500">磨损</span>
                  <p className="mt-0.5 text-gray-400">{summary.fees_summary}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {cards.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">没有符合条件的 U 卡</p>
          <p className="text-sm mt-2">试试调整筛选条件</p>
        </div>
      )}
    </>
  );
}
