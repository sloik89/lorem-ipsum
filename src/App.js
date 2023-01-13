import React, { useState, useEffect } from "react";

const apiUrl =
  "https://baconipsum.com/api/?type=meat-and-filler&start-with-lorem=5";
function App() {
  const [count, setCount] = useState(2);
  const [lorem, setLorem] = useState([]);
  const [copied, setCopied] = useState(false);
  console.log(lorem);
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://baconipsum.com/api/?type=meat-and-filler&start-with-lorem=5&paras=${count}`
      );
      const data = await response.json();
      setLorem(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCopyClick = async () => {
    const textToCopy = lorem.join();
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
    console.log(navigator);
  };
  useEffect(() => {
    fetchData();
  }, [count]);
  return (
    <div className="section-center">
      <h3>tired of boring lorem ipsum</h3>
      <form className="lorem-form">
        <label htmlFor="amount">Paragraphs:</label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={count}
          min="1"
          max="10"
          onChange={(e) => setCount(e.target.value)}
        />
      </form>
      <section className="paragraphs">
        {lorem.map((item, idx) => {
          return <p>{item}</p>;
        })}
      </section>
      <div className="clipboard">
        <button className="btn" onClick={handleCopyClick}>
          copy
        </button>
        {copied && <span>Copied!!</span>}
      </div>
    </div>
  );
}

export default App;
