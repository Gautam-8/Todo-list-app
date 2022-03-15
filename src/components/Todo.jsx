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
    <div>
      <Input
        placeholder="Enter todo"
        style={{ width: "25%", marginTop: "30px" }}
        onChange={handleChange}
      />

      <DatePicker
        onChange={handleDate}
        disabledDate={(current) => {
          return current && current < moment().subtract(1, "days");
        }}
      />

      <TimePicker format={format} onChange={handleTime} />

      <Button type="primary" onClick={() => handleValid(todo)}>
        Add todo
      </Button>

      <h1>TODOS</h1>
      <Table
        dataSource={uncompleted}
        columns={handleHead(uncompleted)}
        style={{
          width: "60%",
          margin: "auto",
          marginTop: "30px",
          textAlign: "center",
        }}
      />

      <h1>COMPLETED</h1>

      <Button type="primary" onClick={handleClear}>
        Clear Completed
      </Button>

      <Table
        dataSource={completed}
        columns={handleHead(completed)}
        style={{ width: "60%", margin: "auto", marginTop: "30px" }}
      />
    </div>
  );
};
