import { useState } from 'react';
import { cards, meta, summary, applyFilter, FilterKey, filterLabels } from './data';
import { UCard } from './types';
import ComparisonTable from './ComparisonTable';
import CardDetail from './CardDetail';
import Hero from './Hero';
import Footer from './Footer';

export default function App() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [selectedCard, setSelectedCard] = useState<UCard | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'detail'>('table');

  const filtered = applyFilter(cards, activeFilter);

  const handleSelectCard = (card: UCard) => {
    setSelectedCard(card);
    setViewMode('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToTable = () => {
    setViewMode('table');
    setSelectedCard(null);
  };

  return (
    <div className="min-h-screen">
      <Hero meta={meta} summary={summary} />

      {/* Filters */}
      <div className="sticky top-0 z-40 bg-bg-dark/95 backdrop-blur-sm border-b border-border-dark">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {viewMode === 'detail' && (
            <button
              onClick={handleBackToTable}
              className="px-4 py-2 rounded-lg bg-card-dark border border-border-dark text-gray-300 hover:text-white hover:border-gold transition-all text-sm font-medium mb-2"
            >
              ← 返回对比表
            </button>
          )}
          <div className="flex flex-wrap gap-2 items-center">
            {(Object.keys(filterLabels) as FilterKey[]).map((key) => (
              <button
                key={key}
                onClick={() => { setActiveFilter(key); setViewMode('table'); setSelectedCard(null); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  activeFilter === key
                    ? 'bg-gold text-black'
                    : 'bg-card-dark border border-border-dark text-gray-400 hover:text-white hover:border-gray-500'
                }`}
              >
                {filterLabels[key]}
              </button>
            ))}
            <span className="ml-auto text-sm text-gray-500 shrink-0">
              共 {filtered.length} 张
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {viewMode === 'detail' && selectedCard ? (
          <CardDetail card={selectedCard} />
        ) : (
          <ComparisonTable cards={filtered} onSelect={handleSelectCard} />
        )}
      </main>

      <Footer
        sources={Array.from(new Set(cards.flatMap(c => {
          const all = [...c.sources];
          if (c.mainland_china?.sources) all.push(...c.mainland_china.sources);
          return all;
        })))}
        meta={meta}
      />
    </div>
  );
}
