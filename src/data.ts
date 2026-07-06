import { UCard, CardSummary, MainlandAvailability } from './types';
import rawData from './ucard_data.json';

function normalizeKYC(c: any): { allows_chinese: any; kyc_required: boolean; supported_documents: string[]; available_regions: string[]; restricted_regions: string[]; note: string } {
  const k = c.chinese_kyc;
  const docs = Array.isArray(k.supported_documents) ? k.supported_documents : [];
  return {
    allows_chinese: k.allows_chinese,
    kyc_required: k.kyc_required ?? true,
    supported_documents: docs,
    available_regions: k.available_regions || [],
    restricted_regions: k.restricted_regions || [],
    note: k.note || '',
  };
}

export const cards: UCard[] = (rawData as any).cards
  ? Object.entries((rawData as any).cards).map(([slug, data]: [string, any]) => ({
      slug,
      name: data.name || slug,
      card_type: data.card_type || '',
      card_network: data.card_network || '',
      issuer: data.issuer || '',
      card_formats: data.card_formats || [],
      cashback: data.cashback || { rate: '' },
      fees: data.fees || {},
      chinese_kyc: normalizeKYC(data),
      benefits: data.benefits || {},
      yield: data.yield || { earns_interest: false, apy: '', type: '', note: '' },
      funding: data.funding || { crypto: [], fiat: '', networks: [] },
      sources: data.sources || [],
      note: data.note || '',
      mainland_china: data.mainland_china || undefined,
    }))
  : [];

/* ── Mainland China helpers ────────────────────────────────── */

export function getMainlandAvailability(card: UCard): MainlandAvailability {
  return card.mainland_china?.available ?? false;
}

export function getMainlandLabel(card: UCard): string {
  const mc = card.mainland_china;
  if (!mc) return '未调查';
  const avail = mc.available;
  if (avail === true) return '✅ 可直接用';
  if (avail === false) {
    // Check if it has a product at all
    if (card.card_formats.includes('暂无U卡产品')) return '⚠️ 无产品';
    return '❌ 不可用';
  }
  // partial
  const docs = mc.documents;
  const parts: string[] = [];
  if (docs?.id_card && !mc.requires_overseas_address) parts.push('身份证可KYC');
  else if (docs?.passport) parts.push('护照可KYC');
  if (mc.requires_overseas_address) parts.push('需海外地址');
  if (mc.application_threshold?.invite_code_required) parts.push('需邀请码');
  return '🟡 ' + (parts.join(' · ') || '有条件');
}

export function getMainlandDocs(card: UCard): string {
  const mc = card.mainland_china;
  if (!mc) return '-';
  const d = mc.documents;
  if (!d) return '-';
  const parts: string[] = [];
  if (d.id_card) parts.push('身份证');
  if (d.passport) parts.push('护照');
  if (parts.length === 0) return '不支持';
  return parts.join('+');
}

export function getMainlandColor(card: UCard): 'green' | 'yellow' | 'red' | 'gray' {
  const mc = card.mainland_china;
  if (!mc) return 'gray';
  if (mc.available === true) return 'green';
  if (mc.available === false) return 'red';
  return 'yellow';
}

/* ── Card summaries ────────────────────────────────────────── */

function cashbackBrief(card: UCard): string {
  const c = card.cashback;
  if (!c || c.rate === 'N/A') return '无';
  const match = c.rate?.match(/(\d[\d.]*%[^\d]*(\d[\d.]*%[^\d]*)?)/);
  if (match) return match[1];
  return c.rate || '无';
}

function feesSummary(card: UCard): string {
  const f = card.fees;
  const parts: string[] = [];
  if (f.issuance_fee && !f.issuance_fee.includes('免费') && !f.issuance_fee.includes('$0') && !f.issuance_fee.includes('N/A')) {
    parts.push(`开卡${f.issuance_fee}`);
  }
  if (f.crypto_conversion_fee && f.crypto_conversion_fee !== '未公开' && f.crypto_conversion_fee !== 'N/A') {
    const cf = f.crypto_conversion_fee.replace('0%', '免费').replace('无', '免费');
    if (cf !== '免费') parts.push(`转换${cf.replace(/^.*?(\d[\d.]*%).*$/, '$1')}`);
  }
  if (f.fx_fee && f.fx_fee !== '未公开' && f.fx_fee !== 'N/A') {
    parts.push('含汇损');
  }
  if (f.monthly_fee && f.monthly_fee !== '免费' && f.monthly_fee !== '$0' && !f.monthly_fee.includes('N/A')) {
    parts.push(`月费${f.monthly_fee}`);
  }
  if (parts.length === 0) return '✅ 低磨损';
  return parts.join(' · ');
}

function yieldBrief(card: UCard): string {
  const y = card.yield;
  if (!y || !y.earns_interest) return '❌ 无';
  return y.apy || '✅ 有';
}

function benefitsBrief(card: UCard): string {
  const b = card.benefits;
  const parts: string[] = [];
  if (b.lounge_access && !b.lounge_access.includes('未提及') && !b.lounge_access.includes('不支持')) parts.push('🏠贵宾厅');
  if (b.subscription_rebates && !b.subscription_rebates.includes('未提及') && !b.subscription_rebates.includes('不支持')) {
    parts.push('🎁订阅报销');
  }
  if (b.referral_bonus && !b.referral_bonus.includes('未提及')) parts.push('👥推荐奖励');
  if (parts.length === 0) return '基础卡';
  return parts.join(' · ');
}

function formatLabel(card: UCard): string {
  if (!card.card_formats || card.card_formats.length === 0 || card.card_formats.includes('暂无U卡产品')) return '💳 无产品';
  const parts: string[] = [];
  if (card.card_formats.includes('虚拟卡')) parts.push('📱虚拟');
  if (card.card_formats.includes('实体卡')) parts.push('💳实体');
  return parts.join('+') || card.card_formats.join('+');
}

export function getCardSummary(card: UCard): CardSummary {
  return {
    slug: card.slug,
    name: card.name,
    card_network: card.card_network,
    card_format: formatLabel(card),
    cashback_rate: cashbackBrief(card),
    fees_summary: feesSummary(card),
    mainland_availability: getMainlandAvailability(card),
    mainland_label: getMainlandLabel(card),
    mainland_docs: getMainlandDocs(card),
    mainland_color: getMainlandColor(card),
    benefits_summary: benefitsBrief(card),
    yield_summary: yieldBrief(card),
    card_type: card.card_type,
  };
}

export const meta = (rawData as any).meta || {};
export const summary = (rawData as any).summary_comparison || {};

/* ── Filters ──────────────────────────────────────────────── */

export type FilterKey = 'all' | 'mainland_direct' | 'mainland_partial' | 'mainland_none'
  | 'has_cashback' | 'has_yield' | 'no_monthly_fee' | 'virtual_only' | 'has_physical';

export const filterLabels: Record<FilterKey, string> = {
  all: '全部',
  mainland_direct: '🟢 大陆可直接用',
  mainland_partial: '🟡 需海外地址/护照',
  mainland_none: '🔴 大陆不可用',
  has_cashback: '💰 有返现',
  has_yield: '📈 余额生息',
  no_monthly_fee: '🆓 免月费',
  virtual_only: '📱 虚拟卡',
  has_physical: '💳 实体卡',
};

export function applyFilter(cards: UCard[], key: FilterKey): UCard[] {
  if (key === 'all') return cards;
  if (key === 'mainland_direct') return cards.filter(c => getMainlandAvailability(c) === true);
  if (key === 'mainland_partial') return cards.filter(c => getMainlandAvailability(c) === 'partial');
  if (key === 'mainland_none') return cards.filter(c => getMainlandAvailability(c) === false);
  if (key === 'has_cashback') return cards.filter(c => cashbackBrief(c) !== '无');
  if (key === 'has_yield') return cards.filter(c => c.yield.earns_interest);
  if (key === 'no_monthly_fee') return cards.filter(c => {
    const mf = c.fees.monthly_fee || '';
    return mf.includes('免费') || mf.includes('$0') || mf === '' || mf.includes('N/A');
  });
  if (key === 'virtual_only') return cards.filter(c => c.card_formats.includes('虚拟卡') && !c.card_formats.includes('实体卡'));
  if (key === 'has_physical') return cards.filter(c => c.card_formats.includes('实体卡'));
  return cards;
}
