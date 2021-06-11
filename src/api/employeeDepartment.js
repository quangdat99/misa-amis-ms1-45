import req from '../utils/req.js';

const PREFIX_URL = "api/v1/EmployeeDepartments";

//#region getEmployeeDepartments
/**
 * Lấy toan bộ danh sách đơn vị
 * @returns danh sách đơn vị nhân viên
 * CreatedBy: dqdat (11/6/2021)
 */
export const getEmployeeDepartments = () =>
    req.get(`${PREFIX_URL}`)
        .then(res => res.data)
        .then(data => Promise.resolve(data))
        .catch(err => Promise.reject(err));
//#endregion