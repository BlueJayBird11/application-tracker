export interface Application {
  id: number,
  company: string,
  position: string,
  type: string,
  location: string,
  minPay: number,
  maxPay: number,
  linkToCompanySite: string,
  linkToJobPost?: string,
  descriptionOfJob: string
}
