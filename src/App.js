import React, { useState, useEffect } from "react";

function App() {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [list, setList] = useState([]);

  // 🔥 โหลดข้อมูลจาก localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("expenses"));
    if (saved) setList(saved);
  }, []);

  // 🔥 บันทึกข้อมูล
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(list));
  }, [list]);

  const addItem = () => {
    if (!text || !amount || amount <= 0) {
      alert("กรอกข้อมูลให้ครบและถูกต้อง");
      return;
    }

    const newItem = {
      text,
      amount: Number(amount),
    };

    setList([...list, newItem]);
    setText("");
    setAmount("");
  };

  const deleteItem = (index) => {
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
  };

  const total = list.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>💰 Expense Tracker</h1>

      <div style={styles.card}>
        <input
          style={styles.input}
          placeholder="รายการ"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="จำนวนเงิน"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button style={styles.button} onClick={addItem}>
          ➕ เพิ่มรายการ
        </button>
      </div>

      <h2 style={styles.total}>ยอดรวม: {total} บาท</h2>

      {list.length === 0 && (
        <p style={{ color: "#888" }}>ยังไม่มีรายการ</p>
      )}

      <ul style={styles.list}>
        {list.map((item, index) => (
          <li key={index} style={styles.item}>
            <span>
              {item.text} - {item.amount} บาท
            </span>

            <button
              style={styles.deleteBtn}
              onClick={() => deleteItem(index)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial",
    textAlign: "center",
    padding: "30px",
    background: "linear-gradient(to right, #e0f7fa, #fce4ec)",
    minHeight: "100vh",
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px",
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    display: "inline-block",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    margin: "5px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    width: "150px",
  },
  button: {
    padding: "10px 15px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  },
  total: {
    marginTop: "15px",
    color: "#333",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  item: {
    background: "white",
    margin: "10px auto",
    padding: "10px",
    width: "300px",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default App;