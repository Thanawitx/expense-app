import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [list, setList] = useState([]);

  const addItem = () => {
    if (!text || !amount) return;
    const newItem = { text, amount };
    setList([...list, newItem]);
    setText("");
    setAmount("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>💰 Expense Tracker</h1>

      <input
        placeholder="รายการ"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        placeholder="จำนวนเงิน"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={addItem}>เพิ่ม</button>

      <ul>
        {list.map((item, index) => (
          <li key={index}>
            {item.text} - {item.amount} บาท
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;