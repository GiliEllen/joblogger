export enum JobStatus {
  PROGRESS = "In Progress",
  DENIED = "Denied",
  CV = "CV",
  INTERVIEW = "interviewing",
  HIRED = "hired",
}

export interface Job {
  _id: string;
  company_name: string;
  company_description: string;
  title: string;
  title_description: string;
  jobField: string;
  connection: string;
  date_CV_sent: Date;
  date_interview: Array<Date>;
  notes: string;
  status: JobStatus;
  cv?: Object;
}
