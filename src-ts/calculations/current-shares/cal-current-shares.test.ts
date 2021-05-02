import * as chai from 'chai';
import { ActivityType, IActivity } from '../../activity/activity';
import { calculateCurrentShares } from './calculate-current-shares';
import { it } from 'mocha';
import Big from 'big.js';


describe('Calculate Current Shares', () => {
  let activities: IActivity[] = [];

  beforeEach((done) => {
    activities.push({
      _id: {
        $oid: "5f8725d0d9c461002fe3b454"
      },
      isin: "GB0005405286",
      wkn: "",
      type: ActivityType.SELL,
      company: "HSBC",
      symbol: "",
      date: "2015-06-05",
      shares: Big(265.584),
      amount: Big(2234.82),
      grossAmount: Big(0),
      tax: 0,
      fee: 0,
      currency: "EUR",
      grossCurrency: "",
      exchangeRate: 0,
      price: Big(8.433283018867925),
      holding: "5f8725c333cdd600305394f5",
      portfolio: "5f87258633cdd600305394f2"
    },
      {
        _id: {
          $oid: "5f8725d0d9c461002fe3b454"
        },
        isin: "GB0005405286",
        wkn: "",
        type: ActivityType.Buy,
        company: "HSBC",
        symbol: "",
        date: "2015-06-05",
        shares: Big(52.145),
        amount: Big(2234.82),
        grossAmount: Big(0),
        tax: 0,
        fee: 0,
        currency: "EUR",
        grossCurrency: "",
        exchangeRate: 0,
        price: Big(8.433283018867925),
        holding: "5f8725c333cdd600305394f5",
        portfolio: "5f87258633cdd600305394f2"
      },
      {
        _id: {
          $oid: "5f8725d0d9c461002fe3b454"
        },
        isin: "GB0005405286",
        wkn: "",
        type: ActivityType.TransferIn,
        company: "HSBC",
        symbol: "",
        date: "2015-06-05",
        shares: Big(0.145),
        amount: Big(2234.82),
        grossAmount: Big(0),
        tax: 0,
        fee: 0,
        currency: "EUR",
        grossCurrency: "",
        exchangeRate: 0,
        price: Big(8.433283018867925),
        holding: "5f8725c333cdd600305394f5",
        portfolio: "5f87258633cdd600305394f2"
      },
      {
        _id: {
          $oid: "5f8725d0d9c461002fe3b454"
        },
        isin: "GB0005405286",
        wkn: "",
        type: ActivityType.TransferOut,
        company: "HSBC",
        symbol: "",
        date: "2015-06-05",
        shares: Big(52.145),
        amount: Big(2234.82),
        grossAmount: Big(0),
        tax: 0,
        fee: 0,
        currency: "EUR",
        grossCurrency: "",
        exchangeRate: 0,
        price: Big(8.433283018867925),
        holding: "5f8725c333cdd600305394f5",
        portfolio: "5f87258633cdd600305394f2"
      })
    done();
  })

  it('should calculate owned share no activities', function() {
    activities.length = 0;
    chai.expect(calculateCurrentShares(activities).eq(Big(0))).to.be.true;
  });

  it('should calculate owned shares', function () {
    chai.expect(calculateCurrentShares(activities).eq(Big(-52.145))).to.be.true;
  })
})
