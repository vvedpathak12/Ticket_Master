export class loginObject {
  emailId: string;
  password: string;

  constructor() {
    this.emailId = '';
    this.password = '';
  }
}

export class createUpdateEmpObject {
  employeeId: number;
  employeeName: string;
  contactNo: string;
  emailId: string;
  deptId: number;
  password: string;
  gender: string;
  role: string;
  deptName: string;

  constructor() {
    this.employeeId = 0;
    this.employeeName = '';
    this.contactNo = '';
    this.emailId = '';
    this.deptId = 0;
    this.password = '';
    this.gender = '';
    this.role = '';
    this.deptName = '';
  }
}

export class createUpdateDepartment {
  deptId: number;
  deptName: string;
  deptHeadEmpId: number;
  createdDate: Date;

  constructor() {
    this.deptId = 0;
    this.deptName = '';
    this.deptHeadEmpId = 0;
    this.createdDate = new Date();
  }
}

export class createNewTicketObject {
  employeeId: number;
  severity: string;
  deptId: number;
  state: string;
  requestDetails: string;

  constructor() {
    this.employeeId = 0;
    this.severity = '';
    this.deptId = 0;
    this.state = '';
    this.requestDetails = '';
  }
}

export class assignTicketObject {
  ticketId: number;
  assignedTo: number;

  constructor() {
    this.ticketId = 0;
    this.assignedTo = 0;
  }
}

export class superAdminDashboardObject {
  totalDepartments: number;
  totalEmployees: number;
  totalTickets: number;
  totalUnAssignedTickets: number;
  totalAssignedTickets: number;
  totalInProgressTickets: number;
  totalClosedTickets: number;

  constructor() {
    this.totalDepartments = 0;
    this.totalEmployees = 0;
    this.totalTickets = 0;
    this.totalUnAssignedTickets = 0;
    this.totalAssignedTickets = 0;
    this.totalInProgressTickets = 0;
    this.totalClosedTickets = 0;
  }
}

export class employeeDashboardObject {
  totalTickets: number;
  totalUnAssignedTickets: number;
  totalAssignedTickets: number;
  totalInProgressTickets: number;
  totalClosedTickets: number;

  constructor() {
    this.totalTickets = 0;
    this.totalUnAssignedTickets = 0;
    this.totalAssignedTickets = 0;
    this.totalInProgressTickets = 0;
    this.totalClosedTickets = 0;
  }
}

export class adminEmployeeDashboardObject {
  totalTickets: number;
  totalAssignedTickets: number;
  totalInProgressTickets: number;
  totalClosedTickets: number;

  constructor() {
    this.totalTickets = 0;
    this.totalAssignedTickets = 0;
    this.totalInProgressTickets = 0;
    this.totalClosedTickets = 0;
  }
}

export class deptHeadDashboardObject {
  totalEmployees: number;
  totalTickets: number;
  totalUnAssignedTickets: number;
  totalAssignedTickets: number;
  totalInProgressTickets: number;
  totalClosedTickets: number;

  constructor() {
    this.totalEmployees = 0;
    this.totalTickets = 0;
    this.totalUnAssignedTickets = 0;
    this.totalAssignedTickets = 0;
    this.totalInProgressTickets = 0;
    this.totalClosedTickets = 0;
  }
}

export class leaveObject {
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

  constructor() {
    this.details = '';
    this.employeeId = 0;
    this.employeeName = '';
    this.fromDate = null;
    this.leaveId = 0;
    this.leaveType = '';
    this.noOfDays = 0;
    this.toDate = null;
    this.approvedDate = null;
    this.isApproved = false;
  }
}
