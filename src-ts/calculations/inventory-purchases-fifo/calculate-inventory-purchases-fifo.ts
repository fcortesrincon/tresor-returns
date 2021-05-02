import { ActivityType, IActivity } from '../../activity/activity';
import Big from 'big.js';
import isBefore from 'date-fns/isBefore';

export interface ISalesPurchases {
  sales: IActivity[];
  purchases: IActivity[];
}

export interface ICalculateInventoryPurchasesFifo{
  realizedGains: Big,
  purchase: IActivity[];
  capitalWithdrawn: Big
}

export const calculateInventoryPurchasesFifo = (activities: IActivity[], startDate: Date): ICalculateInventoryPurchasesFifo => {
  // this function calculates the purchases that have been made to
  // accumulate the CURRENT inventory of shares
  // It's basically purchases minus sales
  // E.g., I buy 20 Apple stock and then sell 10
  // this function will result in "Bought 10 shares at x"

  // this function also calculates the realized gains (gains through sales) and
  // the capital that was withdrawn that way within the interval
  // as it's properly looping through FIFO style already
  let salesPurchase: ISalesPurchases = getSalesPurchasesReverse(activities);

  let realizedGains = Big(0);
  let capitalWithdrawn = Big(0);

  salesPurchase?.sales.forEach((sale) => {
    const subtractResult = subtract(0,startDate,
      sale.shares,
      sale.price,
      sale.date,
      sale.type,
      salesPurchase.purchases,
      realizedGains,
      capitalWithdrawn);
    realizedGains = subtractResult.realizedGains;
    capitalWithdrawn = subtractResult.capitalWithdrawn;
    salesPurchase.purchases = subtractResult.purchase;
  });

return {realizedGains, purchase: salesPurchase.purchases, capitalWithdrawn}
}

const subtract = (index: number,
                   startDate: Date,
                   sellShares: Big,
                   sellPrice: Big,
                   saleDate: string,
                   saleType: ActivityType,
                   purchases: IActivity[],
                   realizedAccumulated: Big,
                   capitalWithdrawnAccumulated: Big) : ICalculateInventoryPurchasesFifo  => {


  if (!purchases[index]) {
    return {purchase: purchases, capitalWithdrawn: capitalWithdrawnAccumulated, realizedGains: realizedAccumulated};
  }
  const buyShares = purchases[index].shares
  const buyPrice = purchases[index].price

  const remaining = Big(buyShares).minus(Big(sellShares))
  purchases[index].shares = remaining

  // only count the realized gain if it was inside the given interval
  if (!isBefore(new Date(saleDate), startDate)) {
    // TransferOut does not create "realized Gains"
    if (saleType === ActivityType.SELL) {
      realizedAccumulated = realizedAccumulated.plus((sellPrice.minus(buyPrice)).mul(Math.min(buyShares.toNumber(), sellShares.toNumber())))
    }
    capitalWithdrawnAccumulated = capitalWithdrawnAccumulated.plus(buyPrice.mul(Math.min(buyShares.toNumber(), sellShares.toNumber())))
  }
  if (remaining.eq(Big(0))) {
    purchases.shift()
  } else if (remaining.lt(Big(0))) {
    purchases.shift()
    return subtract(index,startDate,remaining.abs(),sellPrice,saleDate,saleType,purchases,realizedAccumulated,capitalWithdrawnAccumulated);
  }
return {realizedGains: realizedAccumulated, capitalWithdrawn: capitalWithdrawnAccumulated, purchase: purchases}
}



export const getSalesPurchasesReverse = (activities: IActivity[]) : ISalesPurchases => {
  const sales: IActivity[] = [];
  const purchases: IActivity[] = [];
  //Foreach reverse
  for (let index=activities.length -1; index >= 0 ; index--) {
    const activity: IActivity = activities[index];
    if(activity.type === ActivityType.SELL || activity.type === ActivityType.TransferOut) {
      sales.push(Object.assign({},activity));
    } else if (activity.type === ActivityType.Buy || activity.type === ActivityType.TransferIn) {
      purchases.push(Object.assign({},activity));
    }
  }
  return {sales,purchases};
}
