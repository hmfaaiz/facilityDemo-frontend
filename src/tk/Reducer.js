const initstate = {
  name: null,
  role_name: null,
  rooms: null,
  report: null,
  refresh: false,
  test: null,
  bookings: null,
  archives: null,
  permission: null,
  superAdminId: null,
  managerId: null,
  taskManagerId: null,
  buildingSupervisorId: null,
  fieldSupervisorId: null,
  tenantId: null,
  contractorId: null,
  employeeId: null,
  role_ids: null,
  emp_type_ids: null,
  emp_data: null,
  summary_report: null,
};
export default function Reducer(state = initstate, action) {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };

    case "role_name":
      return { ...state, role_name: action.payload };

    case "rooms":
      return { ...state, rooms: action.payload };

    case "report":
      return { ...state, report: action.payload };

    case "refresh":
      return { ...state, refresh: action.payload };

    case "bookings":
      return { ...state, bookings: action.payload };

    case "archives":
      return { ...state, archives: action.payload };

    case "permission":
      return { ...state, permission: action.payload };

    case "role_ids":
      return { ...state, role_ids: action.payload };

    case "emp_type_ids":
      return { ...state, emp_type_ids: action.payload };

    case "emp_data":
      return { ...state, emp_data: action.payload };

    case "summary_report":
      return { ...state, summary_report: action.payload };

    case "test":
      return { ...state, test: action.payload };

    default:
      return state;
  }
}
