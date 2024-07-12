import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [employe, setEmploye] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const employee = e.target[0].value;
    const department = e.target[1].value;
    axios
      .post("http://localhost:8000/", { employee, department })
      .then((res) => {
        console.log(res.data);
        setEmploye([...employe, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:8000/")
      .then((res) => {
        const data = res.data;
        console.log(data);
        setEmploye(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="App" style={{ display: "flex", gap: "20px" }}>
      <div>
        <h1>BB Tech Company</h1>
        <hr />
        {employe.map((emp, index) => {
          return (
            <div key={index}>
              <h3>{emp.employee}</h3>
              <h3>{emp.department}</h3>

              <hr />
            </div>
          );
        })}
      </div>
      <div>
        {/* add new employee */}
        <h3>Add New Employee</h3>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "100%",
          }}
        >
          <input
            style={{ width: "100%" }}
            type="text"
            placeholder="Employee Name"
          />
          <input
            style={{ width: "100%" }}
            type="text"
            placeholder="Department"
          />
          <button>Add Employee</button>
        </form>
      </div>
    </div>
  );
}

export default App;
