import React from "react";
import { Chart } from "react-google-charts";

export default function MonthCard({ category }) {
  let data = [["Category", "Spend"]];

  for (let key in category) {
    if (category[key] < 0) {
      data.push([key, -category[key]]);
    }
  }

  const sortCategory = data
    .sort(function (a, b) {
      return b[1] - a[1];
    })
    .slice(1, 4);

  const options = {
    legend: {
      position: "right",
      alignment: "center",
      textStyle: { color: "#fff" },
    },
    pieSliceText: "label",

    chartArea: { left: "0", right: "0", top: "10", bottom: "40" },
    // title: "Add title",
    pieStartAngle: 100,
    backgroundColor: "#141d47",
    width: "280",
    height: "180",
  };

  const styles = {
    cards: {
      display: "flex",
    },

    month: {
      display: "flex",
      flexDirection: "column",
    },

    balance: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "18px",
      marginBottom: "10px",
    },

    expend: {
      fontSize: "16px",
    },

    sum: {
      display: 'flex',
      justifyContent: "flex-end",
      color: "#000",
      backgroundColor: "#fff",
      width: "85px",
      padding: "0 5px 2px",
      borderRadius: "10px",
      marginLeft: "5px",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.cards}>
      <div style={styles.month}>
        <div style={{ fontSize: "18px", marginBottom: "20px" }}>
          Your most recent Expenditures
        </div>
        {sortCategory.map((cat) => (
          <div style={styles.balance} key={cat[0]}>
            <div style={styles.expend}>{cat[0]}</div>
            <div style={styles.sum}>{Math.floor(cat[1])}€</div>
          </div>
        ))}
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          // height={"400px"}
        />
        {data.slice(1).map((cat) => (
          <div style={styles.balance} key={cat[0]}>
            <div style={styles.expend}>{cat[0]}</div>
            <div style={styles.sum}>{Math.floor(cat[1])}€</div>
          </div>
        ))}
      </div>
    </div>
  );
}
