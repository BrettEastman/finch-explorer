export interface ApiError {
  error: true;
  message: string;
  code: string;
}

export interface Location {
  line1: string | null;
  line2: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
}

export interface CompanyDepartment {
  name: string | null;
  parent: { name: string | null } | null;
}

export interface CompanyEntity {
  type: string | null;
  subtype: string | null;
}

export interface CompanyData {
  id: string;
  legal_name: string | null;
  entity: CompanyEntity | null;
  primary_email: string | null;
  primary_phone_number: string | null;
  ein: string | null;
  departments: CompanyDepartment[] | null;
  locations: Location[] | null;
}

export interface DirectoryPerson {
  id: string;
  first_name: string | null;
  middle_name: string | null;
  last_name: string | null;
  is_active: boolean | null;
  department: { name: string | null } | null;
  manager: { id: string | null } | null;
}

export interface IndividualEmail {
  data: string | null;
  type: string | null;
}

export interface IndividualPhoneNumber {
  data: string | null;
  type: string | null;
}

export interface IndividualData {
  id: string;
  first_name: string | null;
  middle_name: string | null;
  last_name: string | null;
  preferred_name: string | null;
  dob: string | null;
  gender: string | null;
  ethnicity: string | null;
  ssn: string | null;
  emails: IndividualEmail[] | null;
  phone_numbers: IndividualPhoneNumber[] | null;
  residence: Location | null;
}

export interface Money {
  amount: number | null;
  currency: string | null;
}

export interface EmploymentData {
  id: string;
  first_name: string | null;
  last_name: string | null;
  title: string | null;
  department: { name: string | null } | null;
  manager: { id: string | null } | null;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean | null;
  employment: { type: string | null; subtype: string | null } | null;
  class_code: string | null;
  location: Location | null;
  income: Money | null;
  income_history: Money[] | null;
  custom_fields: Record<string, unknown>[] | null;
  source_id: string | null;
}

export function isApiError(data: unknown): data is ApiError {
  return (
    typeof data === "object" &&
    data !== null &&
    "error" in data &&
    (data as ApiError).error === true
  );
}
