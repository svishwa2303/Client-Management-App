import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/employees";
const EMPLOYEE_API_AMOUNT_URL = "http://localhost:8080/api/v1/const";

class EmployeeService {

    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL, employee); 
    }

    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    updateEmployee(employee, employeeId){
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee);
    }

    getAmount(){
        return axios.get(EMPLOYEE_API_AMOUNT_URL + '/' + 1);
    }

    updateAmount(amount){
        return axios.put(EMPLOYEE_API_AMOUNT_URL + '/' + 1, amount);
    }

    deleteEmployee(employeeId)
    {
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

}


export default new EmployeeService()