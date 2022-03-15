import { Input , DatePicker ,Button , TimePicker , Table} from 'antd';
import { useContext, useState } from 'react';

import moment from 'moment';
import { TodoContext } from '../context/TodoContext';

export const Todos = () => {

    const format = 'HH:mm';

    const {list , handleList , handleDelete , handleStatus , completed} = useContext(TodoContext)

    const [todo ,setTodo] = useState({id:"", task:'' , date:'' , time:'' , status:false});

    const handleChange = (e) => {
        setTodo({...todo , task:e.target.value});
    }

    const handleDate = (a, dateString) => {
        setTodo({...todo , date:dateString});
    }

    const handleTime = (a, timeString) => {
        setTodo({...todo , time:timeString});
    }

    
    const columns = [
        {
          title: 'Task',
          dataIndex: 'task',
          key: 'task',
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'Time',
          dataIndex: 'time',
          key: 'time',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (_, record) =>
            (
            <div onClick={() => handleStatus(record.id)}>

                {record.status?   <a>completed</a> : <a>pending</a>}
           
             </div>
          
            )
          },
          {
              title :'Action',
              dataIndex: 'action',
              render: (_, record) =>
             list.length >= 1 ? (
             <div onClick={() => handleDelete(record.id)}>
              <a>Delete</a>
              </div>
           
          ) : null,

          }
      ];

      const completCol = [
        {
          title: 'Task',
          dataIndex: 'task',
          key: 'task',
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'Time',
          dataIndex: 'time',
          key: 'time',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (_, record) =>
            (
            <div onClick={() => handleStatus(record.id)}>

                {record.status?   <a>completed</a> : <a>pending</a>}
           
             </div>
          
            )
          },
          {
              title :'Action',
              dataIndex: 'action',
              render: (_, record) =>
             completed.length >= 1 ? (
             <div onClick={() => handleDelete(record.id)}>
              <a>Delete</a>
              </div>
           
          ) : null,

          }
      ];

    return (
        <div>
           
             <Input placeholder="Enter todo" style={{width:'30%' ,marginTop:'30px'}} onChange={handleChange}/>

             <DatePicker onChange={handleDate} />
 
              <TimePicker format={format} onChange={handleTime}/>

              <Button type="primary" onClick={() => handleList(todo)}>Add todo</Button>

            <Table dataSource={list} columns={columns} style={{width:'50%' , margin:'auto' , marginTop:'30px'}}/>

            <Table dataSource={completed} columns={completCol} style={{width:'50%' , margin:'auto' , marginTop:'30px'}}/>

        </div>
    )
}