import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import axios from "axios";

class ListEmployeeComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
                employees: null
        }
        this.getTodos = this.getTodos.bind(this);
    }


    componentDidMount(){
        this.getTodos();
        /*EmployeeService.getEmployees().then((res) =>{
           this.setState({ employees: res.data}); 
        });*/
    }

    async getTodos() {
        let data = await axios
          .get("http://localhost:8080/api/v1/employees")
          .then(function(response) {
            return response;
          })
          .catch(function(error) {
            console.log(error);
          });
        this.setState({ todos: data.data });
      }

    render() {
        const { todos } = this.state;
    return (
      <div>
        <h2 className="text-center">Employees List</h2>
        <hr />
        <table className = "table table-striped table-bordered">
            <thead>
                <tr>
                    <th> Employee First Name</th>
                    <th> Employee Last Name</th>
                    <th> Employee Email Id</th>
                    <th> Actions</th>  
                </tr>
            </thead>
            <tbody>
            {todos &&
          todos.map(todo => 
            <tr key={todo.id}>
                <td> {todo.firstName}</td>
                <td> {todo.lastName}</td>
                <td> {todo.emailId}</td>
            </tr>
        )
        }      
            </tbody>
        </table>
        
      </div>
    );
  
        /*return (
            <div>
                 <h2 className="text-center">Employees List</h2>
                 <div>
                    <table className = "table table-striped table-bordered">                                
                        <thead>
                            <tr>
                                <th> Employee First Name</th>
                                <th> Employee Last Name</th>
                                <th> Employee Email Id</th>
                                <th> Actions</th>  
                            </tr>
                        </thead>

                       <tbody>
                            {                            
                                this.state.employees.map(
                                    employee =>
                                    <tr key={employee.id}>
                                        <td> {employee.firstName}</td>
                                        <td> {employee.lastName}</td>
                                        <td> {employee.emailId}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                        
                    </table>

                 </div>
            </div>
        );*/
    }
}

export default ListEmployeeComponent;