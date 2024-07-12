export interface Application {
  id: number,
  company: string,
  position: string,
  type: string,
  location: string,
  minPay: string,
  maxPay: string,
  linkToCompanySite: string,
  linkToJobPost?: string,
  descriptionOfJob: string,
  closed: boolean,
  closedReason?: string
}
