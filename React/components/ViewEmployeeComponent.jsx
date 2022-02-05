import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ViewEmployeeComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then( res => {
            this.setState({employee: res.data});
        })
    }

    render() {
        let dateValue = `${this.state.employee.date}`;
        let timeListValue = `${this.state.employee.currentTime}`;
        let h = dateValue.split('\n');
        console.log(h);
        return (
            <div>
                <br></br>
                <div className='row align-items-center g-3'>
                    <h3 className='text-center'> View Customer Details</h3>
                    <form>
                    <div className='row align-items-center g-3'>
                        <div className="col-auto">
                            <label> Name: </label>
                            <div className="col-auto"> { this.state.employee.name }</div>
                        </div>
                        <div className="col-auto">
                            <label> Date: </label>
                            <div> {dateValue.split('\n').map ((item, i) => <p key={i}>{item}</p>) }</div>
                        </div>
                        <div className="col-auto">
                            <label> Advance: </label>
                            <div> { this.state.employee.advance }</div>
                        </div>
                        <div className="col-auto">
                            <label> Time's List: </label>
                            <div> { timeListValue.split(' ').map ((item, i) => <p key={i}>{item}</p>) }</div>
                        </div>
                        <div className="col-auto">
                            <label> Total Time: </label>
                            <div> { this.state.employee.totalTime }</div>
                        </div>
                        <div className="col-auto">
                            <label> Total Rate: </label>
                            <div> { this.state.employee.totalRate }</div>
                        </div>
                        <div className="col-auto">
                            <label> Balance: </label>
                            <div> { this.state.employee.balance }</div>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default ViewEmployeeComponent;