import { Input, DatePicker, Button, TimePicker, Table } from "antd";
import { useContext, useState } from "react";

import moment from "moment";
import { TodoContext } from "../context/TodoContext";

export const Todos = () => {
  const format = "HH:mm";

  const {
    handleList,
    handleDelete,
    handleStatus,
    completed,
    uncompleted,
    handleClear,
  } = useContext(TodoContext);

  const [todo, setTodo] = useState({
    id: "",
    task: "",
    date: "",
    time: "",
    status: false,
  });

  const handleChange = (e) => {
    setTodo({ ...todo, task: e.target.value });
  };

  const handleDate = (a, dateString) => {
    setTodo({ ...todo, date: dateString });
  };

  const handleTime = (a, timeString) => {
    setTodo({ ...todo, time: timeString });
  };

  const handleValid = (todo) => {
    if (!todo.task) {
      alert("please add todo");
    } else if (!todo.date) {
      alert("please add date");
    } else if (!todo.time) {
      alert("please add time");
    } else {
      handleList(todo);
    }
  };

  const handleHead = (headings) => {
    const columns = [
      {
        title: "Task",
        dataIndex: "task",
        key: "task",
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
      },
      {
        title: "Time",
        dataIndex: "time",
        key: "time",
      },
      {
        title: "Status",
        dataIndex: "status",
        render: (_, record) => (
          <div style={{ color: record.status ? "green" : "red" }}>
            {record.status ? "Completed" : "Pending"}
          </div>
        ),
      },
      {
        title: "Toggle",
        dataIndex: "toggle",
        render: (_, record) => (
          <Button onClick={() => handleStatus(record.id)}>
            {record.status ? "Mark Uncomplete" : "Mark complete"}
          </Button>
        ),
      },
      {
        title: "Delete",
        dataIndex: "action",
        render: (_, record) =>
          headings.length >= 1 ? (
            <div onClick={() => handleDelete(record.id)}>
              <a>Delete</a>
            </div>
          ) : null,
      },
    ];

    return columns;
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div style={{ width: "30%" }}>
        <h1 style={{ marginTop: "40px" }}>TODOS</h1>
        <Input
          placeholder="Enter todo"
          style={{ width: "70%", marginTop: "30px", marginBottom: "10px" }}
          onChange={handleChange}
        />
        <br />
        <DatePicker
          style={{ width: "34%", marginRight: "2%" }}
          onChange={handleDate}
          disabledDate={(current) => {
            return current && current < moment().subtract(1, "days");
          }}
        />
        <TimePicker
          format={format}
          onChange={handleTime}
          style={{ width: "34%" }}
        />{" "}
        <br />
        <Button
          style={{ marginTop: "20px" }}
          type="primary"
          onClick={() => handleValid(todo)}
        >
          Add todo
        </Button>
      </div>

      <div style={{ width: "60%" }}>
        <Table
          size="small"
          pagination={{ pageSize: "5" }}
          dataSource={uncompleted}
          columns={handleHead(uncompleted)}
          style={{
            width: "90%",
            margin: "auto",
            marginTop: "30px",
          }}
        />

        <div
          style={{ display: "flex", margin: "auto", justifyContent: "center" }}
        >
          <h1>COMPLETED</h1>

          <Button
            type="primary"
            onClick={handleClear}
            style={{ margin: "1%", marginLeft: "10%" }}
          >
            Clear Completed
          </Button>
        </div>

        <Table
          size="small"
          pagination={{ pageSize: "4" }}
          dataSource={completed}
          columns={handleHead(completed)}
          style={{ width: "90%", margin: "auto", marginTop: "30px" }}
        />
      </div>
    </div>
  );
};
