import { IActivity } from '../../activity/activity';
import { mapFixtureActivities } from '../../fixtures/fixtures-mapper';
import {
  calculateInventoryPurchasesFifo,
  ICalculateInventoryPurchasesFifo,
} from './calculate-inventory-purchases-fifo';
import * as chai from 'chai';
import { it } from 'mocha';

describe('Calculate Inventory Purchases FiFo', () => {
  let activities: IActivity[] = mapFixtureActivities();

  it('should calculate inventory purchases FiFo from 2017-01-01', function() {
    const result: ICalculateInventoryPurchasesFifo = calculateInventoryPurchasesFifo(activities,new Date(2017,1,1));
    chai.expect(result.realizedGains.toNumber()).to.be.equal(-28176.972186758892);
    chai.expect(result.capitalWithdrawn.toNumber()).to.be.equal(138303.9821867589);
  })

  it('should calculate inventory purchases FiFo from 2015-01-01', function() {
    const result: ICalculateInventoryPurchasesFifo = calculateInventoryPurchasesFifo(activities,new Date(2015,1,1));
    chai.expect(result.realizedGains.toNumber()).to.be.equal(-212457.9250825794);
    chai.expect(result.capitalWithdrawn.toNumber()).to.be.equal(398880.1550825794);
  })

})
