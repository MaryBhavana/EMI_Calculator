import React, { useState, useEffect } from "react";
import "./Style.css";
import Emi_CalT from "./Emi_CalT";
import Result from "./Result";

const EmiCalc = () => {
  const [previousData, setPreviousData] = useState([]);
  const [dates, setDates] = useState([]);
  const [emidates, setEmidates] = useState([]);
  const [toggle, setToggle] = useState(true);
  // const [toggleHistory, setToggleHistory] = useState(true);
  const [data, setData] = useState({
    amount: "",
    rate: "",
    months: "",
  });

  useEffect(() => {
    let datesArray = [];
    for (let i = 1; i <= data.months; i++) {
      datesArray.push({
        month: i,
      });
    }
    setDates(datesArray);
  }, [dates.months]);

  const calculate = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleButtonsubmit = (event) => {
    event.preventDefault();
    const newRecord = { ...data };
    const interests = (data.amount * (data.rate * 0.01)) / data.months;
    const emipermonth = (data.amount / data.months + interests).toFixed(2);
    let temperyarray = [];
    for (let i = 1; i <= data.months; i++) {
      temperyarray.push({
        month: emipermonth,
      });
    }
    setEmidates(temperyarray);

    console.log(emidates);
    setPreviousData([...previousData, newRecord]);
    setData({
      amount: "",
      rate: "",
      months: "",
    });
    // setEmidates(EmiDEtails)
    console.log(emidates);
    setToggle(!toggle);
  };
  console.log(emidates, "by using hook");
  let goBack = () => {
    setToggle(!toggle);
  };
  return (
    <div className="maindiv">
      {toggle ? (
        <div className="calculator">
          <p>
            <b>EMI</b> CALCULATOR
          </p>
          <form onSubmit={handleButtonsubmit} id="sample-form" method="post">
            <label>
              Amount (₹) :
              <br />
              <input
                id="amount"
                type="number"
                name="amount"
                value={data.amount}
                placeholder="Enter Principal Amount"
                onChange={calculate}
              />
            </label>
            <br />
            <br />
            <label>
              Interest Rate :
              <br />
              <input
                id="rate"
                type="number"
                name="rate"
                value={data.rate}
                placeholder="Enter Interest Rate"
                onChange={calculate}
              />
            </label>
            <br />
            <br />
            <label>
              Months to Pay :
              <br />
              <input
                id="months"
                type="number"
                name="months"
                value={data.months}
                placeholder=" Enter Months"
                onChange={calculate}
              />
            </label>
            <br />
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <Emi_CalT emitable={emidates} goBack={() => goBack()} />
      )}

      <button
        onClick={() => setToggle(!toggle)}
        class="btn btn-primary mb-5 btn2"
      >
        Click here
      </button>
      {toggle && <Result list={previousData} emitable={emidates} />}
    </div>
  );
};

export default EmiCalc;
