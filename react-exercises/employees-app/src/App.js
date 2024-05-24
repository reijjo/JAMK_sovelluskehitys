import { useEffect, useState } from "react";
import axios from "axios";

const Employee = (props) => {
  return (
    <div className="Employee">
      <div className="nameImg">
        <img src={props.employee.image} alt="myFace" />
        <h4>
          {props.employee.firstName} {props.employee.lastName}
        </h4>
      </div>
      <div className="moreInfo">
        <div>{props.employee.title} </div>
        <div>{props.employee.email} </div>
        <div>{props.employee.phone} </div>
      </div>
    </div>
  );
};

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/employees").then((response) => {
      setEmployees(response.data);
    });
  }, []);

  const employeeItems = employees.map((employee, index) => (
    <Employee key={index} employee={employee} />
  ));

  return <div className="App">{employeeItems}</div>;
}

export default App;
