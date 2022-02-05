import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            id: this.props.match.params.id,
            name: '',
            date:'',
            advance: '',
            currentTime: '',
            totalTime: '',
            totalRate: '',
            balance: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDateHandler = this.changeDateHandler.bind(this);
        this.changeAdvanceHandler = this.changeAdvanceHandler.bind(this);
        this.changeCurrentTimeHandler = this.changeCurrentTimeHandler.bind(this);
        this.changeTotalTimeHandler = this.changeTotalTimeHandler.bind(this);
        this.changeTotalRateHandler = this.changeTotalRateHandler.bind(this);
        this.changeBalanceHandler = this.changeBalanceHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    componentDidMount(){
        if(this.state.id === '_add'){
            this.setState({
                date: this.getDate('')
            })
        }
        else{
            EmployeeService.getEmployeeById(this.state.id).then(response => { 
                let employee = response.data;
                this.setState({ name: employee.name,
                    date: this.getDate(employee.date),
                    advance: employee.advance,
                    currentTime: employee.currentTime,
                    totalTime: employee.totalTime,
                    totalRate: employee.totalRate,
                    balance: employee.balance,
                });
                console.log(response);
            });
        }
        
    }

    saveOrUpdateEmployee = (e) => {
        e.preventDefault(); 
        let employee = {date: this.state.date, name: this.state.name, advance: this.state.advance,currentTime: this.state.currentTime, totalTime: this.state.totalTime, totalRate: this.state.totalRate, balance: (this.state.totalRate-this.state.advance)};
        console.log('employee => ' + JSON.stringify(employee));

        
        if(this.state.id === '_add'){
            EmployeeService.createEmployee(employee).then(res => {
                this.props.history.push('/employees');
            });
        }
        else{
            EmployeeService.updateEmployee(employee, this.state.id).then(res => {
                this.props.history.push('/employees');
            });
        }

        
    }

    changeNameHandler = (event) => {
        this.setState({name: event.target.value});
    }

    changeDateHandler = (event) => {
        this.setState({date: event.target.value});
    }

    changeAdvanceHandler = (event) => {
        this.setState({advance: event.target.value});
    }

    changeCurrentTimeHandler = (event) => {
        this.setState({currentTime: event.target.value});
    }

    changeTotalTimeHandler = (event) => {
        this.setState({totalTime: event.target.value});
    }

    changeTotalRateHandler = (event) => {
        this.setState({totalRate: event.target.value});
    }

    changeBalanceHandler = (event) => {
        this.setState({balance: event.target.value});
    }

    cancel(){
        this.props.history.push('/employees');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Customer</h3>
        }else{
            return <h3 className="text-center">Update Customer</h3>
        }
    }

    getDate(currentDate){
        console.log('getDate() is called ');
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        let dateValue = ``
        if(currentDate==='' || currentDate===(dd + '/' + mm + '/' + yyyy)){
            return (` [ ` + mm + '/' + dd + '/' + yyyy + ` ]`);
        }
        else if(currentDate.includes(dd + '/' + mm + '/' + yyyy))
        {
            return (currentDate);
        }
        else{
            dateValue = currentDate+ ` [ ` +dd + `/` + mm + `/` + yyyy + ` ]`;
            return (dateValue);
        }
    }

    getTotalTime(){
        var val = this.state.currentTime;
        var sum=0;
        var hour=0;
        var balance=0;
        var str='';
        for(var i=0;i<val.length;i++)
        {
            if(val[i]===' ')
            {
                hour=parseInt(str);
                balance = balance + ((parseFloat(str).toFixed(2)-hour).toFixed(2))*100;
                sum+=hour;
                str='';
                i++;
            }
            str+=val[i];
        }
        if(balance<60)
        {
            var value = (parseFloat(sum) +parseFloat((0.01*balance).toFixed(2))).toFixed(2);
            console.log(value);
            this.state.totalTime = value;
            return(this.state.totalTime);
        }
        var value1 = (parseFloat(sum) + parseInt(balance/60)).toFixed(2);
        value = parseFloat(parseFloat(sum).toFixed(2) + parseFloat(parseInt(balance/60)).toFixed(2)).toFixed(2);
        sum = value;
        
        console.log(value1);
        var value2 = parseFloat(parseFloat(value1) + (parseFloat(balance%60) * 0.01)).toFixed(2);
        console.log("valu1");
        console.log(parseFloat(balance%60));
        console.log(value1);
        console.log(value2);
        this.state.totalTime = value2;
        return(this.state.totalTime);
    }

    render() {
        //this.state.date=this.getDate();
        return (
            <div>
                <div style={{'marginTop': '1%', 'margin-bottom': '5%'}} className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <div class="col-xs-2">
                                            <label> Name: </label>
                                            <input placeholder="Name" name="name" className="form-control"
                                                value={this.state.name} onChange={this.changeNameHandler} />
                                        </div>
                                    </div>
                                    <div className="form-group col-sm-7">
                                        <label> Date: </label>
                                        <input placeholder="Date" name="date" className="form-control"
                                            value={this.state.date} onChange={this.changeDateHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Advance: </label>
                                        <input placeholder="Advance" name="advance" className="form-control"
                                            value={this.state.advance} onChange={this.changeAdvanceHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Time's List: </label>    
                                        <input placeholder="Add Test" name="currentTime" className="form-control"
                                            value={this.state.currentTime} onChange={this.changeCurrentTimeHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Total Time: </label>    
                                        <input placeholder="Total Time" name="totalTime" className="form-control"
                                            value={this.getTotalTime()} onChange={this.changeTotalTimeHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Total Rate: </label>
                                        <input placeholder="Name" name="totalRate" className="form-control"
                                            value={this.state.totalRate} onChange={this.changeTotalRateHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Balance: </label>
                                        <input placeholder="Balance" name="balance" className="form-control"
                                            value={this.state.balance} onChange={this.changeBalanceHandler} />
                                    </div>
                                    <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        );
    }
}

export default CreateEmployeeComponent;