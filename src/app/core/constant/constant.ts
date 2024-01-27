export const ticketMaster = {
  loginApiEndPoint: {
    Login: 'Login'
  },
  dashboardApiEndPoint: {
    GetSuperAdminDashboard: 'GetSuperAdminDashboard',
    getEmployeeDashByEmpId: 'getEmployeeDashByEmpId?empId=',
    getAdminEmployeeDashByEmpId: 'getAdminEmployeeDashByEmpId?empId=',
    GetDeptHeadDashboardByDeptHead: 'GetDeptHeadDashboardByDeptHead?deptHeadEmpId='
  },
  empApiEndPoint: {
    GetAllRoles: 'GetAllRoles',
    GetEmployees: 'GetEmployees',
    GetEmployeeById: 'GetEmployeeById?id=',
    GetEmployeesByDeptId: 'GetEmployeesByDeptId?id=',
    CreateEmployee: 'CreateEmployee',
    UpdateEmployee: 'UpdateEmployee',
    DeleteEmployee: 'DeleteEmployee?id='
  },
  departmentApiEndPoint: {
    GetDepartments: 'GetDepartments',
    CreateDepartment: 'CreateDepartment',
    UpdateDepartment: 'UpdateDepartment',
    DeleteDepartment: 'DeleteDepartment?id='
  },
  ticketApiEndPoint: {
    GetAllTickets: 'GetAllTickets',
    GetTicketById: 'GetTicketById?ticketId=',
    getNewTickets: 'getNewTickets?deptHeadEmpId=',
    GetTicketsCreatedByEmpId: 'GetTicketsCreatedByEmpId?empId=',
    GetAssignedTicketsByEmpId: 'GetAssignedTicketsByEmpId?empId=',
    CreateNewTicket: 'CreateNewTicket',
    DeleteTicket: 'DeleteTicket?id=',
    GetRequestByFilter: 'GetRequestByFilter',
    AssignRequest: 'AssignRequest',
    startTicket: 'startTicket?id=',
    closeTicket: 'closeTicket?id='
  },
  leavesApiEndPoint: {
    GetAllLeaves: 'GetAllLeaves',
    GetAllLeavesByEmployeeId: 'GetAllLeavesByEmployeeId?id=',
    GetLeavesForApprovalBySuperwiserId: 'GetLeavesForApprovalBySuperwiserId?id=',
    AddLeave: 'AddLeave',
    ApproveLeave: 'ApproveLeave?id=',
    RejectLeave: 'RejectLeave?id=',
  }
}
