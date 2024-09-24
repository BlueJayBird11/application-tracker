export interface Application {
  id: number,
  company: string,
  position: string,
  location: string,
  minPay: string,
  maxPay: string,
  linkToCompanySite: string | null,
  linkToJobPost: string | null,
  description: string,
  dateApplied: string,
  dateClosed: string,
  jobType: {
    id: number,
    name: string
  },
  closedReason: {
    id: number,
    name: string
  } | null
}
export interface NewApplicationData {
  company: string,
  position: string,
  type: string | '',
  location: string,
  minPay: string,
  maxPay: string,
  linkToCompanySite: string | '',
  linkToJobPost: string | '',
  descriptionOfJob: string,
  closed: boolean,
  closedReason: string | '',
  dateApplied: string,
  dateClosed: string
}
