import req from '../utils/req.js';

//import { BASE_URL } from '../utils/envConst.js';

const PREFIX_URL = "api/v1/employees";

//#region getEmployees
/**
 * Lấy danh sách nhân viên có lọc
 * @param {object} param 
 * @returns List nhân viên
 * CreatedBy: dqdat 8/6/2021
 */
export const getEmployees = ({ page = 1, pageSize = 10, employeeFilter = "" }) =>
    req.get(`${PREFIX_URL}/EmployeeFilter?pageNumber=${page}&pageSize=${pageSize}&employeeFilter=${employeeFilter}`)
        .then(res => res.data)
        .then(data => {
            return Promise.resolve(data);
        })
        .catch(err => Promise.reject(err));
//#endregion

//#region getCountEmployees
/**
 * Lấy tổng số nhân viên có lọc
 * @param {string} employeeFilter 
 * @returns số nhân viên - int
 */
export const getCountEmployees = (employeeFilter) => req.get(`${PREFIX_URL}/CountEmployees?employeeFilter=${employeeFilter}`)
    .then((res) => res.data)
    .then((data) => Promise.resolve(data))
    .catch(err => Promise.reject(err));
//#endregion

//#region getNewEmployeeCode
/**
 * Lấy mã nhân viên mới
 * @returns mã khách hàng mới
 */
export const getNewEmployeeCode = () =>
    req.get(`${PREFIX_URL}/NewEmployeeCode`)
        .then(res => res.data)
        .then(data => Promise.resolve(data))
        .catch(err => Promise.reject(err));
//#endregion

//#region getEmployee
/**
 * Lấy thông tin một nhân viên
 * @param {string} employeeId 
 * @returns Thông tin nhân viên
 */
export const getEmployee = (employeeId) =>
    req.get(`${PREFIX_URL}/${employeeId}`)
        .then(res => res.data)
        .then(data => Promise.resolve(data))
        .catch(err => Promise.reject(err));
//#endregion

//#region delEmployee
/**
 * Xóa một nhân viên
 * @param {string} employeeId 
 * @returns 
 */
export const delEmployee = (employeeId) =>
    req.delete(`${PREFIX_URL}/${employeeId}`)
        .then(res => {
            if (res.status == 200) {
                return Promise.resolve();
            }
            return Promise.reject();
        })
        .catch(err => Promise.reject(err));
//#endregion

//#region checkEmployeeCodeExist
/**
 * Check mã nhân viên tồn tại trên hệ thống
 * @param {string} employeeCode 
 * @returns boolean
 */
export const checkEmployeeCodeExist = (employeeCode, employeeId) =>
    req.get(`${PREFIX_URL}/EmployeeCodeExist?employeeCode=${employeeCode}&employeeId=${employeeId}`)
        .then(res => res.data)
        .then(data => Promise.resolve(data))
        .catch(err => Promise.reject(err));

//#endregion

//#region saveEmployee
/**
 * Lưu thông tin nhân viên
 * @returns 
 */
export const saveEmployee = (data, isInsert = true) =>
    req({
        url: isInsert ? `${PREFIX_URL}` : `${PREFIX_URL}/${data.employeeId}`,
        data: data,
        method: isInsert ? 'POST' : 'PUT'
    })
        .then(res => {
            if (res.status == 200 || res.status == 201) return Promise.resolve();
            return Promise.reject();
        })
        .catch(err => Promise.reject(err));
//#endregion