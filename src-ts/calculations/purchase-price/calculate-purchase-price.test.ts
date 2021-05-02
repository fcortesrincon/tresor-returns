import { ActivityType, IActivity } from '../../activity/activity';
import { calculatePurchaseValuePrice, IPurchasePrice } from './calculate-purchase-value-price';
import Big from 'big.js';
import { it } from 'mocha';
import * as chai from 'chai';

describe('Calculate Purchase Price', () => {
  let activities: IActivity[] = [];

  beforeEach((done) => {
    activities.push({
        _id: {
          $oid: "5f8725d0d9c461002fe3b454"
        },
        isin: "GB0005405286",
        wkn: "",
        type: ActivityType.Buy,
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
        price: Big(20.433283018867925),
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
        shares: Big(0.145),
        amount: Big(2234.82),
        grossAmount: Big(0),
        tax: 0,
        fee: 0,
        currency: "EUR",
        grossCurrency: "",
        exchangeRate: 0,
        price: Big(250),
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
        price: Big(358),
        holding: "5f8725c333cdd600305394f5",
        portfolio: "5f87258633cdd600305394f2"
      })
    done();
  })

  it('should calculate empty purchase price', function() {
    activities.length = 0;
    const purchasePrice: IPurchasePrice = calculatePurchaseValuePrice(activities);
    chai.expect(purchasePrice.purchaseValue.valueOf()).to.be.equal("0");
    chai.expect(purchasePrice.purchasePrice.valueOf()).to.be.equal("0");
  });

  it('should calculate purchase price', function() {
    const purchasePrice: IPurchasePrice = calculatePurchaseValuePrice(activities);
    chai.expect(purchasePrice.purchaseValue.valueOf()).to.be.equal("22009.398580301886942325");
    chai.expect(purchasePrice.purchasePrice.valueOf()).to.be.equal("59.48180655669543170033");
 });

});
