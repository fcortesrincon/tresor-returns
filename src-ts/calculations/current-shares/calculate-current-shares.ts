import { ActivityType, IActivity } from '../../activity/activity';
import Big from 'big.js';

export const calculateCurrentShares = (activities: IActivity[]): Big => {
  if (activities.length == 0) {
    return Big(0);
  }
  const sum = Big(0);
  return activities.reduce((accumulator: Big, activity: IActivity) => {
    switch (activity.type) {
      case ActivityType.TransferIn:
      case ActivityType.Buy:
        return sum.plus(Big(activity.shares));
      case ActivityType.TransferOut:
      case ActivityType.SELL:
        return sum.minus(activity.shares);
      default:
        return sum;
    }
  }, sum);
};
