import { AbstractControl, FormControl } from '@angular/forms';

export interface IRefreshUserResponse {
  user: IUser;
}

export interface IDepartment {
  id: number;
  name: string;
}

export interface IRetrieveStudentResponse {
  message?: string;
  student: IStudent;
}

export interface ICreateClassForm {
  semester: string;
  student: string;
  course: string;
}

export interface IRetrieveClassResponse {
  message?: string;
  student_class: IClass;
}

export interface IStudentForm {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  gender: FormControl<string | null>;
  department: FormControl<string | null>;
  dob: FormControl<string | null>;
  address: {
    street: FormControl<string | null>;
    state: FormControl<string | null>;
    zip: FormControl<string | null>;
  };
}

export interface IAttendanceCourseForm {
  course: FormControl<string | null>;
}

export interface IRetrieveAttendeesResponse {
  message?: string;
  attendees: IAttendee[];
}

export interface IAttendee {
  student: IStudent;
  status: boolean;
}

export interface IClass {
  id: number;
  student_name: string;
  course_name: string;
  semester: string;
  year: string;
}

export interface IRetrieveClassesResponse {
  message?: string;
  total_pages: 6;
  page: 1;
  items: IClass[];
}

export interface IRetrieveDepartmentResponse {
  message?: string;
  department: IDepartment;
}

export interface IRetrieveDepartmentsResponse {
  message?: string;
  page: number;
  total_pages: number;
  departments: IDepartment[];
}

export interface IRetrieveStudentsResponse {
  message?: string;
  total_pages: number;
  page: number;
  items: IStudent[];
}

export interface IStudent {
  id: number;
  name: string;
  department: IDepartment;
  dob: string;
  email: string;
  gender: string;
  section: number;
  joining_date: string;
  city: string;
  street: string;
  state: string;
  zip: string;
}

export interface ICreateCourseResponse {
  message?: string;
}

export interface IRetrieveAllDepartmentsResponse {
  departments: IDepartment[];
}

export interface IRetrieveCoursesResponse {
  message?: string;
  page: number;
  total_pages: number;
  items: ICourse[];
}

export interface IRetrieveCourseResponse {
  message?: string;
  course: ICourse;
}

export interface ICourse {
  credits: number;
  department: IDepartment;
  id: number;
  name: string;
  semester: string;
}

export interface ICreateAccountForm {
  [index: string]: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

export interface IUpdateDepartmentForm {
  name: FormControl<string | null>;
}

export interface IAddDepartmentForm {
  name: FormControl<string | null>;
}

export interface IUpdateCourseForm {
  name: string;
  credits: string;
  semester: string;
  department: string;
}

export interface IAddCourseForm {
  name: FormControl<string | null>;
  credits: FormControl<string | null>;
  semester: FormControl<string | null>;
  department: FormControl<string | null>;
}

export interface IResetPasswordForm {
  password: FormControl<string | null>;
  confirm_password: FormControl<string | null>;
}

export interface ITokens {
  access_token: string;
  refresh_token: string;
}

export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  avatar_url: string;
}

export interface IUpdateDepartmentResponse {
  message?: string;
}
export interface IUpdateCourseResponse {
  message?: string;
}

export interface IDeleteDepartmentResponse {
  message?: string;
}

export interface IDeleteCourseResponse {
  message?: string;
}

export interface ILoginResponse {
  message?: string;
  tokens: ITokens;
  user: IUser;
}
