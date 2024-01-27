export interface IEmployee {
  employeeId: number;
  employeeName: string;
  deptId: number;
  deptName: string;
  contactNo: string;
  emailId: string;
  role: string;
  password: string;
  gender: string;
}

export interface IEmployeeById {
  employeeId: number;
  employeeName: string;
  deptId: number;
  deptName: string;
  contactNo: string;
  emailId: string;
  role: string;
  password: string;
  gender: string;
}

export interface IDepartment {
  deptId: number;
  deptName: string;
  deptHeadName: string;
  deptHeadEmpId: number;
  createdDate: Date;
}

export interface ILeaves {
  details: string;
  employeeId: number;
  employeeName: string;
  fromDate: null;
  leaveId: number;
  leaveType: string;
  noOfDays: number;
  toDate: null;
  approvedDate: null;
  isApproved: boolean;
}
