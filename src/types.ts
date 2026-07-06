// Mainland China availability
export type MainlandAvailability = true | false | 'partial';

export interface MainlandChina {
  available: MainlandAvailability;
  detail: string;
  documents: {
    id_card: boolean;
    passport: boolean;
    note: string;
  };
  requires_overseas_address: boolean | null;
  address_note: string;
  requires_overseas_phone: boolean | null;
  phone_note: string;
  china_ip_blocked: boolean | null;
  ip_note: string;
  application_threshold: {
    staking_required?: boolean;
    monthly_fee?: string;
    min_deposit?: string;
    virtual_card_fee?: string;
    physical_card_fee?: string;
    invite_code_required?: boolean;
    note?: string;
  };
  notes: string;
  sources: string[];
}

// U 卡完整数据结构
export interface CashbackTier {
  threshold?: string;
  cashback?: string;
  cashback_3pct_limit?: string;
  cashback_1pct_range?: string;
  cashback_0_5pct_above?: string;
  daily_spend_limit?: string;
  monthly_fee?: string;
  stake?: string;
  rate?: string;
  monthly_cap?: string;
  spotify_rebate?: string;
  netflix_rebate?: string;
  truth_plus_rebate?: string;
  fx_fee_free_limit?: string;
  fx_fee_beyond?: string;
  atm_free_limit?: string;
  atm_fee?: string;
  topup_fee?: string;
  fx_fee?: string;
  lounge_access?: string;
  travel_rewards?: string;
  standard_cap?: string;
  promotional?: string;
  spend_50?: string;
  spend_500?: string;
  spend_1500?: string;
  spend_5000?: string;
  monthly_cap_val?: string;
  credit_timing?: string;
  additional?: string;
  vip_note?: string;
  note?: string;
}

export interface Cashback {
  rate: string;
  tiers?: Record<string, CashbackTier>;
  exclusions?: string;
  special_events?: string;
  additional?: string;
  details?: string;
  note?: string;
}

export interface Fees {
  issuance_fee: string;
  annual_fee: string;
  monthly_fee?: string;
  crypto_conversion_fee: string;
  fx_fee: string;
  atm_fee: string;
  inactivity_fee?: string;
  top_up_fee: string;
  replacement_fee?: string;
  card_closure_refund?: string;
  small_txn_fee?: string;
  declined_txn_fee?: string;
  cancellation_fee?: string;
  note?: string;
  brazil_special?: string;
}

export interface ChineseKYC {
  allows_chinese: string | boolean;
  kyc_required: boolean;
  supported_documents: string | string[];
  available_regions: string[];
  restricted_regions: string[];
  note: string;
}

export interface Benefits {
  lounge_access: string;
  insurance: string;
  subscription_rebates: string;
  referral_bonus: string;
  mobile_wallets: string[];
  note?: string;
  platinum_plan?: string;
  earn_integration?: string;
  auto_savings?: string;
  travel_rewards?: string;
  paypal_integration?: string;
  credit_account?: string;
  external_wallet?: string;
}

export interface Yield {
  earns_interest: boolean;
  apy: string;
  type: string;
  note: string;
}

export interface Funding {
  crypto: string[];
  fiat: string;
  networks: string[];
  additional?: string;
}

export interface UCard {
  name: string;
  card_type: string;
  card_network: string;
  issuer: string;
  card_formats: string[];
  cashback: Cashback;
  fees: Fees;
  chinese_kyc: ChineseKYC;
  benefits: Benefits;
  yield: Yield;
  funding: Funding;
  sources: string[];
  note?: string;
  mainland_china?: MainlandChina;
  slug: string;
}

// Summary of a card's most important single-line metrics for the comparison table
export interface CardSummary {
  slug: string;
  name: string;
  card_network: string;
  card_format: string;
  cashback_rate: string;
  fees_summary: string;
  mainland_availability: MainlandAvailability;
  mainland_label: string;
  mainland_docs: string;
  mainland_color: 'green' | 'yellow' | 'red' | 'gray';
  benefits_summary: string;
  yield_summary: string;
  card_type: string;
}
