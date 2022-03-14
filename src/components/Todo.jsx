import { Input , DatePicker ,Button , TimePicker} from 'antd';
import { useContext, useState } from 'react';

import moment from 'moment';
import { TodoContext } from '../context/TodoContext';

export const Todos = () => {

    const format = 'HH:mm';

    const {list , handleList} = useContext(TodoContext)

    const [todo ,setTodo] = useState({task:'' , data:'' , time:'' , status:false});

    const handleChange = (e) => {
        setTodo({...todo , task:e.target.value});
    }

    const handleDate = (a, dateString) => {
        setTodo({...todo , date:dateString});
    }

    const handleTime = (a, timeString) => {
        setTodo({...todo , time:timeString});
    }

    return (
        <div>
           
             <Input placeholder="Add todos" style={{width:'30%'}} onChange={handleChange}/>

             <DatePicker onChange={handleDate} />
 
              <TimePicker format={format} onChange={handleTime}/>

              <Button type="primary" onClick={() => handleList(todo)}>Add todo</Button>

        </div>
    )
}