import { CONVERT_MONEY_POCKETS } from "./pocketsActionTypes";
import { calculateContextCurrencyAmount } from "../utils";

export const pocketsReducer = (
  state = {
    EUR: { amount: "500" },
    USD: { amount: "500" },
    GBP: { amount: "500" }
  },
  action
) => {
  switch (action.type) {
    case CONVERT_MONEY_POCKETS:
      const {
        sourceAmount,
        sourceCurrency,
        targetCurrency,
        currencyRates
      } = action.payload;
      const newBalanceTarget = {
        [targetCurrency]: {
          ...state[targetCurrency],
          amount:
            parseFloat(state[targetCurrency].amount) +
            calculateContextCurrencyAmount(
              sourceAmount,
              sourceCurrency,
              targetCurrency,
              currencyRates
            )
        }
      };

      console.log(
        typeof calculateContextCurrencyAmount(
          sourceAmount,
          sourceCurrency,
          targetCurrency,
          currencyRates
        )
      );
      const newBalanceSource = {
        [sourceCurrency]: {
          ...state,
          amount: state[sourceCurrency].amount - sourceAmount
        }
      };
      return { ...state, ...newBalanceTarget, ...newBalanceSource };
    default:
      return state;
  }
};