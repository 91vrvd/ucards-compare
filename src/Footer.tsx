interface FooterProps {
  sources: string[];
  meta: any;
}

export default function Footer({ sources, meta }: FooterProps) {
  return (
    <footer className="border-t border-border-dark mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Disclaimer */}
        <div className="glass-card p-5 mb-6">
          <p className="text-xs text-gray-500 leading-relaxed">
            ⚠️ <strong>免责声明</strong>：本站数据源自社区讨论、官方文档及第三方信息平台交叉验证，仅供研究参考。
            卡片费率、返现比例、地区可用性和 KYC 政策可能会随时变化，建议在开卡前与平台官方确认最新信息。
            本网站不构成任何投资建议或开卡推荐。加密货币投资有风险，操作前请自行评估。
            <br />
            📌 中国大陆可用性数据更新至 {meta?.kyc_updated_at ? new Date(meta.kyc_updated_at).toLocaleDateString('zh-CN') : '2026-07'}，
            基于官方FAQ、中文社区实测反馈和第三方平台信息交叉验证。
          </p>
        </div>

        {/* Data Sources */}
        <details className="group">
          <summary className="text-sm text-gray-400 cursor-pointer hover:text-gray-300 transition-colors select-none">
            📚 数据来源 ({sources.length} 个参考链接) — 点击展开
          </summary>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-1">
            {sources.map((s, i) => (
              <a
                key={i}
                href={s}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 truncate block py-1"
              >
                {s}
              </a>
            ))}
          </div>
        </details>

        <div className="mt-8 pt-6 border-t border-border-dark text-center">
          <p className="text-xs text-gray-600">
            U 卡对比百科 © {new Date().getFullYear()} · 综合数据更新{' '}
            {meta?.generated_at ? new Date(meta.generated_at).toLocaleDateString('zh-CN') : '-'}
            {' · '}KYC 数据更新{' '}
            {meta?.kyc_updated_at ? new Date(meta.kyc_updated_at).toLocaleDateString('zh-CN') : '-'}
            {' · '}
            <span className="text-gold">Built with ❤️ for the crypto community</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
