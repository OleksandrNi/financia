import { Categories } from "../constants/categories";
import { filterMonth } from "./filterMonth";

export function preparedData(userAccountBankData, countryBankList) {
  let connectedBank = [];
  for (let i = 0; i < userAccountBankData.length; i++) {
    let bankLogo;
    let bankName;
    const date = new Date();
    const monthTransactionInfo = [];
    let recievedTotalPayment = 0;
    let sendTotalPayment = 0;

    for (let m = 1; m <= 3; m++) {
      let filteredTransaction = filterMonth(
        date,
        userAccountBankData[i].transactions.transactions.booked,
        m
      );
      let recievedPayment = 0;
      let sendPayment = 0;

      for (let t = 0; t < filteredTransaction.length; t++) {
        let sum = +filteredTransaction[t].transactionAmount.amount;
        if (sum <= 0) {
          sendPayment += sum;
          sendTotalPayment += sum;
        } else {
          recievedPayment += sum;
          recievedTotalPayment += sum;
        }
      }

      const sortCategoryByMonth = filteredTransaction.reduce(
        (money, { transactionAmount, enrichment: { purposeCategoryId } }) => {
          const currentCategory = Categories[purposeCategoryId];
          return {
            ...money,
            [currentCategory]: money[currentCategory]
              ? money[currentCategory] + +transactionAmount.amount
              : +transactionAmount.amount,
          };
        },
        {}
      );

      monthTransactionInfo.push({
        monthAgo: m,
        recievedPayment,
        sendPayment,
        sortCategoryByMonth,
      });
    }

    for (let n = 0; n < countryBankList.data.length; n++) {
      if (
        userAccountBankData[i].metadata.institution_id ===
        countryBankList.data[n].id
      ) {
        bankLogo = countryBankList.data[n].logo;
        bankName = countryBankList.data[n].name;
      }
    }
    connectedBank.push({
      id: userAccountBankData[i].accountId,
      balances_cur:
        userAccountBankData[i].balances.balances[0].balanceAmount.currency,
      balances_amount:
        userAccountBankData[i].balances.balances[0].balanceAmount.amount,
      institution_id: userAccountBankData[i].metadata.institution_id,
      iban: userAccountBankData[i].metadata.iban,
      owner_name: userAccountBankData[i].metadata.owner_name,
      bank_logo: bankLogo || null,
      bank_name: bankName || null,
      // transactions: userAccountBankData[i].transactions.transactions.booked,
      monthTransactionInfo,
      sendTotalPayment,
      recievedTotalPayment,
    });
  }
  return connectedBank;
}
