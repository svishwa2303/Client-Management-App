import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import axios from "axios";
class Test extends Component {

    constructor(props){
        super(props)
        this.state = {
                employees: [],
                amount: ''
        };
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.changeAmountHandler = this.changeAmountHandler.bind(this);
        this.saveAmount = this.saveAmount.bind(this);
    }


    componentDidMount(){
        EmployeeService.getEmployees('http://localhost:8080/api/v1/employees').then(response => { 
            console.log(response);
            this.setState({ employees: response.data})
        });
        EmployeeService.getAmount().then(response => { 
            console.log(response);
            this.setState({ amount: response.data.amount})
        });
    }


    addEmployee(){
        this.props.history.push('/add-employee/_add');
    }

    editEmployee(id){
        this.props.history.push(`/add-employee/${id}`);
    }

    deleteEmployee(id){
        // rest api
        EmployeeService.deleteEmployee(id).then( res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }

    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }

    changeAmountHandler = (event) => {
        this.setState({amount: event.target.value});
    }

    saveAmount = (e) => {
        e.preventDefault(); 
        let amount = {amount: this.state.amount};
        console.log('amount => ' + JSON.stringify(amount));
        if(this.state.amount!==""){
            EmployeeService.updateAmount(amount);
        }
    }

    render(){
        return(
            <><div>
            <h2 className="text-center">Customers List</h2>
            <form>
                <button style={{marginBottom: "10px"}}className="btn btn-primary" onClick={this.addEmployee}> Add New </button>
                <div className="form-group">
                    <label> Amount: </label>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <input style={{marginBottom: "10px"}} placeholder="Amount" name="amount" className="form-control"
                        value={this.state.amount} onChange={this.changeAmountHandler} />
                    <button style={{marginBottom: "10px"}}className="btn btn-primary " onClick={this.saveAmount}> Save </button>
                </div>
            </form>
            <div style={{height: '350px', overflow: 'scroll'}} className='container' >
                <table className = 'table table-striped table-bordered mb-0'> 
                    <thead>
                            <tr>
                                <th> Date</th>
                                <th> Name</th>
                                <th> Advance</th>
                                <th> Actions</th>
                            </tr>
                    </thead>
                    <tbody>
                        {                            
                            this.state.employees.map(
                                employee =>
                                    <tr key={employee.id}>
                                        <td> {employee.date}</td>
                                        <td> {employee.name}</td>
                                        <td> {employee.advance}</td>
                                        <td>
                                            <button onClick={ () => this.editEmployee(employee.id)} className="btn btn-info">Update </button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete </button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.viewEmployee(employee.id)} className="btn btn-info">View </button>
                                        </td>
                                    </tr>
                                )
                        }
                </tbody>
                </table>
            </div>
        </div></>
        );
    }


}

export default Test;