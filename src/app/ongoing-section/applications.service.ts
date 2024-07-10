import { Injectable } from '@angular/core';
import { Application } from './application.model';

@Injectable({
  providedIn: 'root'
})
// https://drive.google.com/file/d/1NgL_RpbuDEcW5Fimhmkj3U-BGHF0sAAb/view
export class ApplicationsService {
  private appliications: Application[] = [
    {
      id: 0,
      company: '',
      position: '',
      type: '',
      location: '',
      minPay: 0,
      maxPay: 0,
      linkToCompanySite: '',
      linkToJobPost: '',
      descriptionOfJob: ''
    }
  ];
  constructor() { }

  getApplications() {
    return this.appliications;
  }

  getApplicationById (id: number): Application
  {
    const emptyApplication: Application = {
      id: -1,
      company: '',
      position: '',
      type: '',
      location: '',
      minPay: 0,
      maxPay: 0,
      linkToCompanySite: '',
      descriptionOfJob: ''
    }
    console.log(id);
    const foundApplication = this.appliications.find((application) => application.id === id);

    if (foundApplication)
    {
      return foundApplication;
    }
    else
    {
      return emptyApplication;
    }
  }
}
