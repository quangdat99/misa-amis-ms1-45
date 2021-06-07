import req from '../utils/req.js';

//import { BASE_URL } from '../utils/envConst.js';

const PREFIX_URL = "api/v1/employees";

//#region getEmployees
/**
 * Lấy danh sách nhân viên có lọc
 * @param {object} param 
 * @returns 
 * CreatedBy: dqdat 30/05/2021
 */
export const getEmployees = ({ page = 1, pageSize = 10, employeeFilter = "" }) =>
    req.get(`${PREFIX_URL}/EmployeeFilter?pageNumber=${page}&pageSize=${pageSize}&employeeFilter=${employeeFilter}`)
        .then(res => res.data)
        .then(data => {
            return Promise.resolve(data);
        })
        .catch(err => Promise.reject(err));
//#endregion