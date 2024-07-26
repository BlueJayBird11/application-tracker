export interface Application {
  id: number,
  company: string,
  position: string,
  type: 'Full-Time' | 'Part-Time' | 'Internship' | 'Contract' | '',
  location: string,
  minPay: string,
  maxPay: string,
  linkToCompanySite: string,
  linkToJobPost?: string,
  descriptionOfJob: string,
  closed: boolean,
  closedReason?: 'Not hiring' | 'Position already filled' | 'Looking for other people' | 'Declined by self' | 'Interview' | 'Accepted',
  dateApplied: string,
  dateClosed?: string
}

export interface NewApplicationData {
  company: string,
  position: string,
  type: 'Full-Time' | 'Part-Time' | 'Internship' | 'Contract' | '',
  location: string,
  minPay: string,
  maxPay: string,
  linkToCompanySite: string,
  linkToJobPost?: string,
  descriptionOfJob: string,
  closed: boolean,
  closedReason?: 'Not hiring' | 'Position already filled' | 'Looking for other people' | 'Declined by self' | 'Interview' | 'Accepted',
  dateApplied: string,
  dateClosed?: string
}
