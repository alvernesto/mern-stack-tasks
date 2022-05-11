import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            description: '',
            tasks: []
        };
        this.addTask = this.addTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.deletetTask = this.deleteTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        this.getTasks();
    }

    async getTasks() {
        try {
            const response = await fetch('/tareas');
            console.log("response de gettask: ", response)
            const data = await response.json();
            this.setState({ tasks: data });
            console.log("this.state.tasks", this.state.tasks);
        } catch (e) {
            console.error(`Error: ${e}`);
        }
    }

    async getOneTask(id) {
        try {
            const response = await fetch(`/tareas/${id}`);
            console.log("response de gettask: ", response);
            const data = await response.json();
            console.log("response de getTask (one): ", data);
            return data;
        } catch (e) {
            console.error(`Error: ${e}`);
        }
    }

    async addTask(e) {
        e.preventDefault();
        if (this.state.id) {
            try {
                const message = await this.editTask(this.state.id);
                console.log("mensaje de actualizado", message);
                this.setState({ title: '', description: '' });
                this.getTasks();
            } catch (e) {
                console.error(`Error: ${e}`);
            }
        } else {
            try {
                const response = await fetch('/tareas', {
                    method: 'POST',
                    body: JSON.stringify(this.state),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                console.log("response de addtask: ", response)
                const message = await response.json();
                console.log("response server post", message);
                this.setState({ title: '', description: '' });
                this.getTasks();
            } catch (e) {
                console.error(`Error: ${e}`);
            }
        }
    }

    async editTask(id) {
        try {
            const response = await fetch(`/tareas/${id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            console.log("response de edittask: ", response);
            const message = await response.json();
            console.log("response server post", message);
            return message; 
        } catch (e) {
            console.error(`Error: ${e}`);
        }
    }

    async prepareEditTask(id) {
        try {
            const response = await this.getOneTask(id);
            this.setState({
                id: response[0].id,
                title: response[0].title,
                description: response[0].description
            });
        } catch (e) {
            console.error(`Error: ${e}`);
        }
    }

    async deleteTask(id) {
        console.log("eliminados! este id: ", id);
        try {
            const response = await fetch(`/tareas/${id}`, {
                method: 'DELETE',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            console.log("response de deletetask: ", response)
            const message = await response.json();
            console.log("response server post", message);
            this.setState({ title: '', description: '' });
            this.getTasks();
        } catch (e) {
            console.error(`Error: ${e}`);
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        console.log("name: ", name, "value: ", value);
        //cambia estado de una app de react
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <>
                <h1 align="center">Your task's c:</h1>
                <div className="container card">
                    <form onSubmit={this.addTask}>
                        <div className="container">
                            <div className="form-group">
                                <label>title</label>
                                <input name="title" onChange={this.handleChange} type="text" className="form-control" id="title" aria-describedby="emailHelp" placeholder="enter task" value={this.state.title}></input>
                            </div>
                            <div className="form-group">
                                <label>description</label>
                                <textarea name="description" onChange={this.handleChange} type="text" className="form-control" id="description" placeholder="your description" value={this.state.description}></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">send</button>
                        </div>
                    </form>
                </div>
                <div className='container'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name Task</th>
                                <th scope="col">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.tasks.map(task => {
                                return (
                                    <tr key={task.id}>
                                        <td>{task.title}</td>
                                        <td>{task.description}</td>
                                        <td>
                                            <button onClick={() => this.prepareEditTask(task.id)} className="btn btn-warning">edit</button>
                                        </td>
                                        <td>
                                            <button onClick={() => this.deleteTask(task.id)} className="btn btn-danger">delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

render(<App />, document.getElementById('app'));