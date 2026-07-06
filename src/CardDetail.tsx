import { UCard } from './types';
import { getCardSummary, getMainlandAvailability } from './data';

interface Props {
  card: UCard;
}

export default function CardDetail({ card }: Props) {
  const summary = getCardSummary(card);
  const mc = card.mainland_china;
  const avail = mc?.available;

  const availBadge = avail === true
    ? { bg: 'bg-green-cyber/15', text: 'text-green-cyber', border: 'border-green-cyber/30', label: '🟢 中国大陆可直接使用' }
    : avail === 'partial'
    ? { bg: 'bg-yellow-500/15', text: 'text-yellow-400', border: 'border-yellow-500/30', label: '🟡 有条件可用' }
    : { bg: 'bg-red-cyber/15', text: 'text-red-cyber', border: 'border-red-cyber/30', label: '🔴 中国大陆不可用' };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="glass-card p-6 md:p-8 mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/40 to-amber-700/40 flex items-center justify-center text-lg font-bold text-gold">
                {card.name.charAt(0)}
              </span>
              <h2 className="text-2xl font-bold">{card.name}</h2>
            </div>
            <p className="text-gray-400 text-sm">{card.card_type}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {card.card_network && card.card_network !== '暂无' && (
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                  card.card_network.includes('Visa') ? 'bg-blue-500/20 text-blue-400' :
                  card.card_network.includes('Mastercard') ? 'bg-red-500/20 text-red-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {card.card_network}
                </span>
              )}
              {card.card_formats.map(f => (
                <span key={f} className="text-xs px-2.5 py-0.5 rounded-full bg-gray-500/10 text-gray-400 border border-border-dark">
                  {f}
                </span>
              ))}
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${availBadge.bg} ${availBadge.text} ${availBadge.border}`}>
                {availBadge.label}
              </span>
            </div>
            {card.note && (
              <p className="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm">
                ⚠️ {card.note}
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-1">发行方</p>
            <p className="text-sm text-gray-300">{card.issuer}</p>
          </div>
        </div>

        {/* Key metrics bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <MetricBadge label="返现" value={summary.cashback_rate} highlight={summary.cashback_rate !== '无'} />
          <MetricBadge label="余额生息" value={summary.yield_summary} highlight={!summary.yield_summary.startsWith('❌')} />
          <MetricBadge label="磨损" value={summary.fees_summary} highlight={false} />
          <MetricBadge label="福利" value={summary.benefits_summary} highlight={false} />
        </div>
      </div>

      {/* 🆕 Mainland China Availability - most important section */}
      {mc && (
        <Section title={`🇨🇳 中国大陆可用性 — ${availBadge.label}`}>
          <div className="space-y-3">
            <InfoRow label="可用状态" value={
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${availBadge.bg} ${availBadge.text} ${availBadge.border}`}>
                {availBadge.label}
              </span>
            } />
            <InfoRow label="说明" value={mc.detail} />

            <div className="mt-4 p-4 rounded-lg bg-bg-dark border border-border-dark">
              <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">证件与要求</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <DocReq label="大陆身份证" ok={mc.documents?.id_card ?? false} />
                <DocReq label="中国护照" ok={mc.documents?.passport ?? false} />
                {mc.requires_overseas_address !== null && (
                  <DocReq label="需海外地址证明" ok={false} warn={mc.requires_overseas_address} note={mc.address_note} />
                )}
                {mc.requires_overseas_phone !== null && (
                  <DocReq label="需海外手机号" ok={false} warn={mc.requires_overseas_phone} note={mc.phone_note} />
                )}
                {mc.china_ip_blocked !== null && (
                  <DocReq label="大陆IP限制" ok={false} warn={mc.china_ip_blocked} note={mc.ip_note} />
                )}
              </div>
              {mc.documents?.note && (
                <p className="text-xs text-gray-500 mt-2">{mc.documents.note}</p>
              )}
            </div>

            {/* Application threshold */}
            {mc.application_threshold && Object.keys(mc.application_threshold).filter(k => k !== 'note' && (mc.application_threshold as Record<string, unknown>)[k] !== undefined && (mc.application_threshold as Record<string, unknown>)[k] !== false).length > 0 && (
              <div className="p-4 rounded-lg bg-bg-dark border border-border-dark">
                <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">申请门槛</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {mc.application_threshold.staking_required !== undefined && (
                    <InfoRow label="需质押" value={mc.application_threshold.staking_required ? '✅ 是' : '❌ 否'} />
                  )}
                  {mc.application_threshold.monthly_fee && (
                    <InfoRow label="月费" value={mc.application_threshold.monthly_fee} />
                  )}
                  {mc.application_threshold.min_deposit && (
                    <InfoRow label="最低充值" value={mc.application_threshold.min_deposit} />
                  )}
                  {mc.application_threshold.virtual_card_fee && (
                    <InfoRow label="虚拟卡费" value={mc.application_threshold.virtual_card_fee} />
                  )}
                  {mc.application_threshold.physical_card_fee && (
                    <InfoRow label="实体卡费" value={mc.application_threshold.physical_card_fee} />
                  )}
                  {mc.application_threshold.invite_code_required !== undefined && (
                    <InfoRow label="需邀请码" value={mc.application_threshold.invite_code_required ? '✅ 需要' : '❌ 不需要'} />
                  )}
                </div>
                {mc.application_threshold.note && (
                  <p className="text-xs text-gray-500 mt-2">{mc.application_threshold.note}</p>
                )}
              </div>
            )}

            {mc.notes && <InfoRow label="备注" value={mc.notes} />}

            {mc.sources && mc.sources.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-gray-500 mb-1">来源</p>
                {mc.sources.map((s: string, i: number) => (
                  <a key={i} href={s} target="_blank" rel="noopener noreferrer" className="block text-xs text-blue-400 hover:text-blue-300 truncate">
                    {s}
                  </a>
                ))}
              </div>
            )}
          </div>
        </Section>
      )}

      {/* Cashback Details */}
      <Section title="💰 返现详情">
        <div className="space-y-2">
          <p className="text-gold font-semibold text-lg">{card.cashback.rate}</p>
          {card.cashback.special_events && (
            <p className="text-sm text-amber-400">🎉 限时活动：{card.cashback.special_events}</p>
          )}
          {card.cashback.additional && (
            <p className="text-sm text-gray-400">{card.cashback.additional}</p>
          )}
          {card.cashback.note && (
            <p className="text-sm text-gray-500">{card.cashback.note}</p>
          )}
          {card.cashback.exclusions && (
            <p className="text-xs text-gray-600 mt-1">排除：{card.cashback.exclusions}</p>
          )}

          {card.cashback.tiers && Object.keys(card.cashback.tiers).length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider">等级说明</p>
              {Object.entries(card.cashback.tiers).map(([tierName, tier]) => (
                <div key={tierName} className="bg-bg-dark rounded-lg p-3 border border-border-dark">
                  <p className="text-sm font-medium text-gray-300 capitalize mb-1">{tierName.replace(/_/g, ' ')}</p>
                  <div className="space-y-1">
                    <TierRow label="返现" value={tier.cashback || tier.rate} />
                    {tier.threshold && <TierRow label="月消费门槛" value={tier.threshold} />}
                    {tier.stake && <TierRow label="质押要求" value={tier.stake} />}
                    {tier.monthly_fee && <TierRow label="月费" value={tier.monthly_fee} />}
                    {tier.monthly_cap && <TierRow label="月返现上限" value={tier.monthly_cap} />}
                    {tier.cashback_3pct_limit && <TierRow label="3% 返现上限" value={tier.cashback_3pct_limit} />}
                    {tier.daily_spend_limit && <TierRow label="日消费上限" value={tier.daily_spend_limit} />}
                    {tier.spotify_rebate && <TierRow label="Spotify" value={tier.spotify_rebate} />}
                    {tier.netflix_rebate && <TierRow label="Netflix" value={tier.netflix_rebate} />}
                    {tier.lounge_access && <TierRow label="贵宾厅" value={tier.lounge_access} />}
                    {tier.travel_rewards && <TierRow label="旅行返现" value={tier.travel_rewards} />}
                    {tier.note && <TierRow label="备注" value={tier.note} />}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* Fees Details */}
      <Section title="💸 手续费明细">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FeeRow label="开卡费" value={card.fees.issuance_fee} />
          <FeeRow label="年费" value={card.fees.annual_fee} />
          {card.fees.monthly_fee && <FeeRow label="月费" value={card.fees.monthly_fee} />}
          <FeeRow label="加密转换费" value={card.fees.crypto_conversion_fee} />
          <FeeRow label="外汇费 (FX)" value={card.fees.fx_fee} />
          <FeeRow label="ATM 取现费" value={card.fees.atm_fee} />
          <FeeRow label="充值费" value={card.fees.top_up_fee} />
          {card.fees.inactivity_fee && <FeeRow label="不活跃费" value={card.fees.inactivity_fee} />}
          {card.fees.replacement_fee && <FeeRow label="补卡费" value={card.fees.replacement_fee} />}
          {card.fees.small_txn_fee && <FeeRow label="小额交易费" value={card.fees.small_txn_fee} />}
          {card.fees.cancellation_fee && <FeeRow label="注销费" value={card.fees.cancellation_fee} />}
        </div>
        {card.fees.note && <p className="text-xs text-gray-500 mt-3">{card.fees.note}</p>}
        {card.fees.brazil_special && <p className="text-xs text-amber-400 mt-2">{card.fees.brazil_special}</p>}
      </Section>

      {/* Original KYC Info (kept for legacy reference) */}
      <Section title="🌍 原始 KYC 地区信息">
        <div className="space-y-3">
          <InfoRow label="KYC 要求" value={card.chinese_kyc.kyc_required ? '✅ 需要' : '❌ 不需要'} />
          {Array.isArray(card.chinese_kyc.supported_documents) && card.chinese_kyc.supported_documents.length > 0 && (
            <InfoRow label="支持证件" value={card.chinese_kyc.supported_documents.join(' / ')} />
          )}
          {card.chinese_kyc.available_regions.length > 0 && (
            <InfoRow label="可用地区" value={card.chinese_kyc.available_regions.join('、')} />
          )}
          {card.chinese_kyc.restricted_regions.length > 0 && (
            <InfoRow label="限制地区" value={card.chinese_kyc.restricted_regions.join('、')} highlight />
          )}
          <InfoRow label="说明" value={card.chinese_kyc.note} />
        </div>
      </Section>

      {/* Benefits */}
      <Section title="🎁 优惠与福利">
        <div className="space-y-3">
          <InfoRow label="机场贵宾厅" value={card.benefits.lounge_access} />
          <InfoRow label="保险" value={card.benefits.insurance} />
          <InfoRow label="订阅报销" value={card.benefits.subscription_rebates} />
          <InfoRow label="推荐奖励" value={card.benefits.referral_bonus} />
          {card.benefits.platinum_plan && <InfoRow label="白金计划" value={card.benefits.platinum_plan} />}
          {card.benefits.travel_rewards && <InfoRow label="旅行返现" value={card.benefits.travel_rewards} />}
          <InfoRow label="移动支付" value={Array.isArray(card.benefits.mobile_wallets) ? card.benefits.mobile_wallets.join(' · ') : card.benefits.mobile_wallets} />
          {card.benefits.paypal_integration && <InfoRow label="PayPal" value={card.benefits.paypal_integration} />}
          {card.benefits.note && <InfoRow label="备注" value={card.benefits.note} />}
        </div>
      </Section>

      {/* Yield */}
      <Section title="📈 余额生息">
        <div className="space-y-3">
          <InfoRow label="是否支持生息" value={card.yield.earns_interest ? '✅ 是' : '❌ 否'} />
          <InfoRow label="年化收益率" value={
            card.yield.earns_interest ? (
              <span className="text-gold font-bold text-lg">{card.yield.apy}</span>
            ) : '无'
          } />
          <InfoRow label="类型" value={card.yield.type} />
          <InfoRow label="说明" value={card.yield.note} />
        </div>
      </Section>

      {/* Funding */}
      <Section title="💳 充值方式">
        <div className="space-y-3">
          {card.funding.crypto.length > 0 && (
            <InfoRow label="支持币种" value={card.funding.crypto.join('、')} />
          )}
          <InfoRow label="法币入金" value={card.funding.fiat || '无'} />
          {card.funding.networks.length > 0 && (
            <InfoRow label="链网络" value={card.funding.networks.join('、')} />
          )}
          {card.funding.additional && <InfoRow label="其他" value={card.funding.additional} />}
        </div>
      </Section>

      {/* Sources */}
      <div className="mt-8 glass-card p-5">
        <p className="text-xs text-gray-500 mb-2">📚 数据来源</p>
        <div className="space-y-1">
          {card.sources.map((s, i) => (
            <a key={i} href={s} target="_blank" rel="noopener noreferrer" className="block text-xs text-blue-400 hover:text-blue-300 truncate">
              {s}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass-card p-5 md:p-6 mb-4">
      <h3 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">{title}</h3>
      {children}
    </div>
  );
}

function MetricBadge({ label, value, highlight }: { label: string; value: string; highlight: boolean }) {
  return (
    <div className="bg-bg-dark rounded-lg p-3 text-center">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-sm font-bold ${highlight ? 'text-gold' : 'text-gray-300'}`}>{value}</p>
    </div>
  );
}

function FeeRow({ label, value }: { label: string; value: string }) {
  const isFree = value?.includes('免费') || value?.includes('$0') || value?.includes('0%') || value === '无';
  const isNA = !value || value === 'N/A' || value === '未公开' || value === '暂无';
  return (
    <div className="flex justify-between items-center bg-bg-dark rounded-lg p-3">
      <span className="text-sm text-gray-400">{label}</span>
      <span className={`text-sm font-medium ${isFree ? 'text-green-cyber' : isNA ? 'text-gray-600' : 'text-gray-300'}`}>
        {value || '-'}
      </span>
    </div>
  );
}

function InfoRow({ label, value, highlight }: { label: string; value: React.ReactNode; highlight?: boolean }) {
  return (
    <div className={`flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 p-3 rounded-lg ${highlight ? 'bg-red-500/5 border border-red-500/10' : 'bg-bg-dark'}`}>
      <span className="text-sm text-gray-400 shrink-0">{label}</span>
      <span className={`text-sm ${highlight ? 'text-red-cyber' : 'text-gray-200'} text-right`}>
        {value || '-'}
      </span>
    </div>
  );
}

function TierRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex justify-between text-xs">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-300">{value}</span>
    </div>
  );
}

function DocReq({ label, ok, warn, note }: { label: string; ok: boolean; warn?: boolean; note?: string }) {
  if (warn !== undefined) {
    return (
      <div className="flex justify-between items-center bg-bg-dark rounded-lg p-2.5">
        <span className="text-xs text-gray-400">{label}</span>
        <div className="flex items-center gap-1">
          <span className={`text-xs font-medium ${warn ? 'text-red-cyber' : 'text-green-cyber'}`}>
            {warn ? '⚠️ 需要' : '✅ 不需要'}
          </span>
          {note && <span className="text-xs text-gray-500 hidden sm:inline">({note.slice(0, 30)}{note.length > 30 ? '...' : ''})</span>}
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-between items-center bg-bg-dark rounded-lg p-2.5">
      <span className="text-xs text-gray-400">{label}</span>
      <span className={`text-xs font-medium ${ok ? 'text-green-cyber' : 'text-red-cyber'}`}>
        {ok ? '✅ 支持' : '❌ 不支持'}
      </span>
    </div>
  );
}
