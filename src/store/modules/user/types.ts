export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserInfo {
  avatar: string,
  id: string;
  username: string;
  department?: string;
  employeeType?: string;
  job?: string;
  probationStart?: string;
  probationEnd?: string;
  probationDuration?: string;
  protocolStart?: string;
  protocolEnd?: string;
  address?: string;
  status?: string;
  role: RoleType;
  email?: string;
  phone?: string;
  summary?: any;
  flag?: string;
  description?: string;
  loginStatus: boolean;
}
export interface UserFilterData {
  sort?: number;
  startTime?: string;
  endTime?: string;
  filterStatus?: Array<string>;
  filterType?: Array<string>;
  submit?: boolean;
  reset?: boolean;
}
export type UserState = UserInfo & UserFilterData;
