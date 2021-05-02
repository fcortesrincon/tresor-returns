import activitiesTestData from './activities.json';
import { ActivityType, IActivity } from '../activity/activity';
import Big from 'big.js';

interface IFixtureActivity {
  "_id": {
    "$oid": string;
  },
  "isin": string;
  "wkn": string;
  "type": string;
  "company": string;
  "symbol": string;
  "date": string;
  "shares": number;
  "amount": number;
  "grossAmount": number;
  "tax": number;
  "fee": number;
  "currency": string;
  "grossCurrency": string;
  "exchangeRate": number;
  "price": number;
  "holding": string;
  "portfolio": string;
}

const mapFixtureActivityToActivityType = (fixtureActivityType: string) : ActivityType => {
  switch (fixtureActivityType) {
    case 'Buy':
      return ActivityType.Buy;
    case 'Sell':
      return ActivityType.SELL;
    case 'TransferIn':
      return ActivityType.TransferIn;
    case 'TransferOut':
      return ActivityType.TransferOut;
    default:
      return ActivityType.Undefined;
  }
}

export const mapFixtureActivities = (): Array<IActivity> => {
  const fixtureActivities: Array<IFixtureActivity> = <Array<IFixtureActivity>>activitiesTestData;

  return fixtureActivities.map<IActivity>((fixtureActivity: IFixtureActivity)=> {
    return {
      _id: {
        $oid: fixtureActivity._id.$oid
      },
      isin: fixtureActivity.isin,
      wkn: fixtureActivity.wkn,
      type: mapFixtureActivityToActivityType(fixtureActivity.type),
      company: fixtureActivity.company,
      symbol: fixtureActivity.symbol,
      date: fixtureActivity.date,
      shares: Big(fixtureActivity.shares),
      amount: Big(fixtureActivity.amount),
      grossAmount: Big(fixtureActivity.grossAmount),
      tax: fixtureActivity.tax,
      fee: fixtureActivity.fee,
      currency: fixtureActivity.currency,
      grossCurrency: fixtureActivity.grossCurrency,
      exchangeRate: fixtureActivity.exchangeRate,
      price: Big(fixtureActivity.price),
      holding: fixtureActivity.holding,
      portfolio: fixtureActivity.portfolio
    }
  });
}
