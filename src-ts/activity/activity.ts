import Big, { BigSource } from 'big.js';

export enum ActivityType {
  Buy,
  SELL,
  TransferIn,
  TransferOut,
  Undefined
}

export interface IActivityId {
  $oid: string;
}

export interface IActivity {
  _id: IActivityId;
  isin: string;
  wkn: string;
  type: ActivityType;
  company: string;
  symbol: string;
  date: string;
  shares: Big;
  amount: Big;
  grossAmount: Big;
  tax: number;
  fee: number;
  currency: string;
  grossCurrency: string;
  exchangeRate: number;
  price: Big;
  holding: string;
  portfolio: string;
}
