import { Injectable } from '@angular/core';
import { Application } from './application.model';

@Injectable({
  providedIn: 'root'
})
// https://drive.google.com/file/d/1NgL_RpbuDEcW5Fimhmkj3U-BGHF0sAAb/view
export class ApplicationsService {
  private applications: Application[] = [
    {
      id: 1,
      company: 'Cyber Innovation Center',
      position: 'Software Developer',
      type: 'Intern',
      location: 'Shreveport, LA',
      minPay: '20/hr',
      maxPay: '22/hr',
      linkToCompanySite: 'https://www.cyberinnovationcenter.org/',
      linkToJobPost: 'https://www.cyberinnovationcenter.org/careers?rq=careers',
      descriptionOfJob: 'Position for a Softare/Web Developer that does contract work for the Air Force'
    },
    {
      id: 2,
      company: 'Epic',
      position: 'Software Developer',
      type: 'Full-Time',
      location: 'Madison, WI',
      minPay: '105k/yr',
      maxPay: '150k/yr',
      linkToCompanySite: 'https://www.epic.com/',
      linkToJobPost: 'https://epic.avature.net/Careers/FolderDetail/Software-Developer/740',
      descriptionOfJob: 'As a software developer at Epic, you’ll write software that impacts the lives of 75% of Americans and 300 million patients around the world. Working in your own office, surrounded by thousands of high-caliber developers, you’ll use modern development methodologies and employ user-centered design, analytics, and machine learning tools to drive innovation in healthcare. Using leading-edge technologies and languages like JS, TS, and C#, you’ll invent better ways to reduce medical errors, streamline record sharing between hospitals, and provide the quality of care a patient deserves.'
    },
    {
      id: 3,
      company: 'Microsoft',
      position: 'Software Engineer',
      type: 'Full-Time',
      location: 'Los Angeles, CA',
      minPay: '$122K',
      maxPay: '$122K',
      linkToCompanySite: 'https://www.microsoft.com/en-us',
      linkToJobPost: 'https://jobs.careers.microsoft.com/global/en/share/1731080/?utm_source=Job Share&utm_campaign=Copy-job-share',
      descriptionOfJob: 'The Industry Solutions Engineering (ISE) team is a global engineering organization that works directly with customers looking to leverage the latest technologies to address their toughest challenges. We work closely with our customers’ engineers to jointly develop code for cloud-based solutions that can accelerate their organization. We work in collaboration with Microsoft product teams, partners, and open-source communities to empower our customers to do more with the cloud. We pride ourselves in making contributions to open source and making our platforms easier to use.'
    },
    {
      id: 4,
      company: 'Apple',
      position: 'Software Development Engineer',
      type: 'Full-Time',
      location: 'Cupertino, CA',
      minPay: '$134K',
      maxPay: '$134K',
      linkToCompanySite: 'https://www.apple.com/',
      linkToJobPost: 'https://jobs.apple.com/en-us/details/200548268/software-development-engineer?team=SFTWR',
      descriptionOfJob: 'Imagine what you could do here. At Apple, new ideas have a way of becoming extraordinary products, services, and customer experiences very quickly. Bring passion and dedication to your job and there\'s no telling what you could accomplish. The people here at Apple don’t just build products — they craft the kind of wonder that’s revolutionized entire industries. It’s the diversity of those people and their ideas that encourages the innovation that runs through everything we do, from amazing technology to industry-leading environmental efforts. Join Apple and help us leave the world better than we found it. The Operations SWE team is a part of Manufacturing Systems & Infrastructure team and is responsible for developing infrastructure and manufacturing solutions used to create and service future Apple products. The Operations SWE Team is seeking a highly motivated individual with a background in software development.  In this position, the candidate’s primary responsibility will be designing and developing solutions on both our production lines and within our testing equipment, while collaborating closely with other Apple development software, hardware and testing teams.  The Ops Software Engineer will also be responsible for maintaining and improving existing software solutions.'
    }
  ];
  constructor() { }

  getApplications() {
    return this.applications;
  }

  getApplicationById (id: number): Application
  {
    const emptyApplication: Application = {
      id: -1,
      company: '',
      position: '',
      type: '',
      location: '',
      minPay: '0',
      maxPay: '0',
      linkToCompanySite: '',
      descriptionOfJob: ''
    }
    console.log(id);
    const foundApplication = this.applications.find((application) => application.id === id);

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
