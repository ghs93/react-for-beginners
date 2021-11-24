import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [coin, setCoin] = useState({});
  const [money, setMoney] = useState(0);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setCoin(json[0]);
        setLoading(false);
        console.log("");
      });
  }, []);

  const onChange = (event) => {
    setMoney(event.target.value);
  };

  const onSelect = (event) => {
    const index = event.target.selectedIndex;
    setCoin(coins[index]);
  };

  return (
    // <div>
    //   <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
    //   {loading ? (
    //     <strong>Loading...</strong>
    //   ) : (
    //     <ul>
    //       {coins.map((item) => (
    //         <li key={item.id}>
    //           {item.name} ({item.symbol}): ${item.quotes.USD.price} USD
    //         </li>
    //       ))}
    //     </ul>
    //   )}
    // </div>
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <form onSubmit={(event) => event.preventDefault()}>
            <input
              placeholder="Write your money"
              onChange={onChange}
              value={money}
              type="number"
              min="0"
            />
          </form>
          <select onChange={onSelect}>
            {coins.map((item) => (
              <option key={item.id}>
                {item.name} ({item.symbol}): ${item.quotes.USD.price} USD
              </option>
            ))}
          </select>
          {("coin : ", console.log(coin))}
          <h2>
            You can buy {money / coin.quotes.USD.price} {coin.symbol}
          </h2>
          {/* <h2>You can buy {console.log(typeof coins[0])}</h2>
          <h2>You can buy {console.log(coins[0])}</h2> */}
        </div>
      )}
    </div>
  );
}

export default App;
