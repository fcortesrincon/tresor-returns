import { IActivity } from '../../activity/activity';
import Big from 'big.js';

export interface IPurchasePrice {
  purchaseValue: Big;
  purchasePrice: Big;
}

export const calculatePurchaseValuePrice = (purchases: IActivity[]) : IPurchasePrice => {
  const zero: Big = Big(0);

  let value: Big = zero;
  let price: Big = zero;

  purchases.forEach(purchase => {
    value = value.plus(Big(purchase.shares).mul(purchase.price));
    price = price.plus(Big(purchase.shares));
  });

  price = price.gt(zero) ? value.div(price) : zero;

  return {purchaseValue: value, purchasePrice: price};
}
