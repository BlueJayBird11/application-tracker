import { Injectable } from '@angular/core';
import { Application, ApplicationSubData, NewApplicationData } from './application.model';
import * as Papa from 'papaparse';
import { UserService } from '../user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInfo } from '../user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// https://drive.google.com/file/d/1NgL_RpbuDEcW5Fimhmkj3U-BGHF0sAAb/view
export class ApplicationsService {
  // private applications: Application[] = [];
  private applications = new BehaviorSubject<Application[]>([]);
  public applications$ = this.applications.asObservable();

  isLoggedIn: boolean = false;
  user: UserInfo = {
    id: 0,
    sessionToken: ''
  }

  constructor(private http: HttpClient, private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.loggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

    this.userService.user$.subscribe(status => {
      this.user.id = status.id;
      this.user.sessionToken = status.sessionToken;
    });

    console.log(this.user);
  }

  private closedReasons: ApplicationSubData[] = [
    {
      "id": 1,
      "name": "Not hiring"
    },
    {
      "id": 2,
      "name": "Position already filled"
    },
    {
      "id": 3,
      "name": "Looking for other people"
    },
    {
      "id": 4,
      "name": "Declined by self"
    },
    {
      "id": 5,
      "name": "Interview"
    },
    {
      "id": 6,
      "name": "Accepted"
    },
    {
      "id": 7,
      "name": "No reason given"
    }
  ]

  private jobTypes: ApplicationSubData[] = [
    {
      "id": 1,
      "name": "Full-Time"
    },
    {
      "id": 2,
      "name": "Part-Time"
    },
    {
      "id": 3,
      "name": "Internship"
    },
    {
      "id": 4,
      "name": "Contract"
    },
    {
      "id": 5,
      "name": "Temporary"
    },
    {
      "id": 6,
      "name": "Freelance"
    },
    {
      "id": 7,
      "name": "Seasonal"
    },
    {
      "id": 8,
      "name": "On-Call"
    },
    {
      "id": 9,
      "name": "Apprenticeship"
    }
  ]

  findIdByName(name: string, subList: ApplicationSubData[]): number {
    return subList.filter(item => item.name == name)[0].id;
  }

  // getApplications(): Application[] {
  //   return this.applications;
  // }

  getApplicationById (id: number): Application
  {
    const emptyApplication: Application = {
      id: -1,
      company: '',
      position: '',
      location: '',
      minPay: '0',
      maxPay: '0',
      linkToCompanySite: '',
      description: '',
      dateApplied: '',
      linkToJobPost: null,
      dateClosed: '',
      jobType: {
        id: 0,
        name: ''
      },
      closedReason: null
    }
    console.log(id);
    const foundApplication = this.applications.getValue().find((application) => application.id === id);

    if (foundApplication)
    {
      return foundApplication;
    }
    else
    {
      return emptyApplication;
    }
  }

  isApplicationClosed (id: number): boolean {
    return (this.getApplicationById(id).closedReason != null)
  }

  printApplications() {
    console.log(this.applications);
  }

  addApplication(applicationData: NewApplicationData)
  {
    // Contact server and tell them to add a application

    let jobTypeId: number = this.findIdByName(applicationData.type, this.jobTypes);
    let closedReasonId: number = ((applicationData.closedReason != undefined) ? this.findIdByName(applicationData.closedReason, this.closedReasons) : 0);

    console.log("jobTypeId: " + jobTypeId);
    console.log("closedReasonId: " + closedReasonId);

    let tempList: Application[] = this.applications.getValue();

    tempList.push({
      id: this.applications.getValue().length+1,
      company: applicationData.company,
      position: applicationData.position,
      jobType: {
        id: 0,
        name: applicationData.type
      },
      location: applicationData.location,
      minPay: applicationData.minPay,
      maxPay: applicationData.maxPay,
      linkToCompanySite: applicationData.linkToCompanySite,
      linkToJobPost: applicationData.linkToJobPost,
      description: applicationData.descriptionOfJob,
      closedReason: (applicationData.closed) ? {
        id: 0,
        name:  applicationData.closedReason
      } : null,
      dateApplied: applicationData.dateApplied,
      dateClosed: applicationData.dateClosed,
    })

    this.applications.next(tempList);
  }

  updateApplication(updatedApplication: Application, jobTypeId: number, closedReasonId: number): boolean {
    const url = 'https://localhost:7187/api/JobApplication/' + updatedApplication.id;
    const params = {
      applicationId: updatedApplication.id,
      userId: this.user.id,
      jobTypeId: jobTypeId,
      closedReasonId: closedReasonId,
      sessionKey: this.user.sessionToken
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': '*/*'
    });

    const body = {
      id: updatedApplication.id,
      company: updatedApplication.company,
      position: updatedApplication.position,
      location: updatedApplication.location,
      minPay: updatedApplication.minPay,
      maxPay: updatedApplication.maxPay,
      linkToCompanySite: updatedApplication.linkToCompanySite,
      linkToJobPost: updatedApplication.linkToJobPost,
      description: updatedApplication.description,
      dateApplied: updatedApplication.dateApplied,
      dateClosed: updatedApplication.dateClosed
    };

    this.http.put(url, body, { headers, params })
      .subscribe(
        response => {
          console.log('Job application updated successfully', response);
          return true;
        },
        error => {
          console.error('Error updating job application', error);
          return false;
        }
      );

      return false;
  }

  editApplication(applicationData: Application) {
    // Contact server and tell them to edit this application

    let jobTypeId: number = this.findIdByName(applicationData.jobType.name, this.jobTypes);
    let closedReasonId: number = ((applicationData.closedReason?.name != undefined) ? this.findIdByName(applicationData.closedReason.name, this.closedReasons) : 0);
    // console.log("jobTypeId: " + jobTypeId);
    // console.log("closedReasonId: " + closedReasonId);

    if (!this.updateApplication(applicationData, jobTypeId, closedReasonId))
    {
      console.log("Error updating application");
      return
    }

    for (let application of this.applications.getValue()) {
      if (application.id === applicationData.id) {
        application.company = applicationData.company;
        application.position = applicationData.position;
        application.jobType = applicationData.jobType;
        application.location = applicationData.location;
        application.minPay = applicationData.minPay;
        application.maxPay = applicationData.maxPay;
        application.linkToCompanySite = applicationData.linkToCompanySite;
        application.linkToJobPost = applicationData.linkToJobPost;
        application.description = applicationData.description;
        application.closedReason = (applicationData.dateClosed != '0001-01-01') ? applicationData.closedReason : null;
        application.dateApplied = applicationData.dateApplied;
        application.dateClosed = applicationData.dateClosed;
        break;
      }
    }
  }

  deleteApplicationById(id: number)
  {
    // contact server
    let tempList: Application[] = this.applications.getValue().filter((application) => application.id !== id);
    this.applications.next(tempList);
  }

  exportToCsv(applications: Application[]): void {
    const csvData = applications.map(app => ({
      id: app.id,
      company: app.company,
      position: app.position,
      type: app.jobType.name,
      location: app.location,
      minPay: app.minPay,
      maxPay: app.maxPay,
      linkToCompanySite: app.linkToCompanySite,
      linkToJobPost: app.linkToJobPost || '',
      descriptionOfJob: app.description,
      closed: app.closedReason?.name,
      closedReason: app.closedReason || '',
      dateApplied: app.dateApplied,
      dateClosed: app.dateClosed || ''
    }));

    const csv = Papa.unparse(csvData, {
      header: true,
      delimiter: ','
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'applications.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async retrieveApplications(userId: number, sessionToken: string) {
    console.log("HERE: " + this.user.id);
    this.applications.next([]);
    // retrieve user's applications from server
    const url = `https://localhost:7187/api/User/${userId}/applications`;
    const params = {
      sessionKey: sessionToken
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': '*/*'
    });

    // this.http.get(url, { headers, params })
    //   .subscribe(
    //     response => {
    //       console.log('Job applications retrieved successfully', response);
    //     },
    //     error => {
    //       console.error('Error retrieved job applications', error);
    //     }
    //   );
    try {
      const response = await this.http.get<Application[]>(url, { headers, params }).toPromise()
      console.log('Job applications retrieved successfully', response);
      this.applications.next(response!);

    } catch (error) {
      console.error('Error retrieved job applications', error);
    }
  }

  useDefaultData() {
    this.applications.next([
      {
        id: 1,
        company: 'Meta',
        position: 'Software Engineer, Product',
        jobType: {
          id: 1,
          name: 'Full-Time'
        },
        location: 'Burlingame, CA',
        minPay: '139k/yr',
        maxPay: '139k/yr',
        linkToCompanySite: 'https://www.meta.com/',
        linkToJobPost: 'https://www.metacareers.com/jobs/410406138583811/',
        description: 'Meta Platforms, Inc. (Meta), formerly known as Facebook Inc., builds technologies that help people connect, find communities, and grow businesses. When Facebook launched in 2004, it changed the way people connect. Apps and services like Messenger, Instagram, and WhatsApp further empowered billions around the world. Now, Meta is moving beyond 2D screens toward immersive experiences like augmented and virtual reality to help build the next evolution in social technology. To apply, click “Apply to Job” online on this web page.',
        dateApplied: '2024-6-16',
        dateClosed: '0001-01-01',
        closedReason: null
      },
      {
        id: 2,
        company: 'Epic',
        position: 'Software Developer',
        jobType: {
          id: 1,
          name: 'Full-Time'
        },
        location: 'Madison, WI',
        minPay: '105k/yr',
        maxPay: '150k/yr',
        linkToCompanySite: 'https://www.epic.com/',
        linkToJobPost: 'https://epic.avature.net/Careers/FolderDetail/Software-Developer/740',
        description: 'As a software developer at Epic, you’ll write software that impacts the lives of 75% of Americans and 300 million patients around the world. Working in your own office, surrounded by thousands of high-caliber developers, you’ll use modern development methodologies and employ user-centered design, analytics, and machine learning tools to drive innovation in healthcare. Using leading-edge technologies and languages like JS, TS, and C#, you’ll invent better ways to reduce medical errors, streamline record sharing between hospitals, and provide the quality of care a patient deserves.',
        closedReason: {
          id: 3,
          name: "Looking for other people"
        },
        dateApplied: '2024-6-10',
        dateClosed: '2024-06-16'
      },
      {
        id: 3,
        company: 'Microsoft',
        position: 'Software Engineer',
        jobType: {
          id: 1,
          name: 'Full-Time'
        },
        location: 'Los Angeles, CA',
        minPay: '$122k/yr',
        maxPay: '$122k/yr',
        linkToCompanySite: 'https://www.microsoft.com/en-us',
        linkToJobPost: 'https://jobs.careers.microsoft.com/global/en/share/1731080/?utm_source=JobShare&utm_campaign=Copy-job-share',
        description: 'The Industry Solutions Engineering (ISE) team is a global engineering organization that works directly with customers looking to leverage the latest technologies to address their toughest challenges. We work closely with our customers’ engineers to jointly develop code for cloud-based solutions that can accelerate their organization. We work in collaboration with Microsoft product teams, partners, and open-source communities to empower our customers to do more with the cloud. We pride ourselves in making contributions to open source and making our platforms easier to use.',
        dateApplied: '2024-6-15',
        dateClosed: '0001-01-01',
        closedReason: null
      },
      {
        id: 4,
        company: 'Apple',
        position: 'Software Development Engineer',
        jobType: {
          id: 1,
          name: 'Full-Time'
        },
        location: 'Cupertino, CA',
        minPay: '$134k/yr',
        maxPay: '$134k/yr',
        linkToCompanySite: 'https://www.apple.com/',
        linkToJobPost: 'https://jobs.apple.com/en-us/details/200548268/software-development-engineer?team=SFTWR',
        description: 'Imagine what you could do here. At Apple, new ideas have a way of becoming extraordinary products, services, and customer experiences very quickly. Bring passion and dedication to your job and there\'s no telling what you could accomplish. The people here at Apple don’t just build products — they craft the kind of wonder that’s revolutionized entire industries. It’s the diversity of those people and their ideas that encourages the innovation that runs through everything we do, from amazing technology to industry-leading environmental efforts. Join Apple and help us leave the world better than we found it. The Operations SWE team is a part of Manufacturing Systems & Infrastructure team and is responsible for developing infrastructure and manufacturing solutions used to create and service future Apple products. The Operations SWE Team is seeking a highly motivated individual with a background in software development.  In this position, the candidate’s primary responsibility will be designing and developing solutions on both our production lines and within our testing equipment, while collaborating closely with other Apple development software, hardware and testing teams.  The Ops Software Engineer will also be responsible for maintaining and improving existing software solutions.',
        dateApplied: '2024-6-15',
        dateClosed: '0001-01-01',
        closedReason: null
      },
      {
        id: 5,
        company: 'Amazon',
        position: 'Software Development Engineer, Amazon Aurora Storage',
        jobType: {
          id: 1,
          name: 'Full-Time'
        },
        location: 'Cupertino, CA',
        minPay: '$130k/yr',
        maxPay: '$200k/yr',
        linkToCompanySite: 'https://www.amazon.com/',
        linkToJobPost: 'https://www.amazon.jobs/en/jobs/2664700/software-development-engineer-amazon-aurora-storage',
        description: 'Are you interested in building hyper-scale database services in the cloud? Do you want to revolutionize the way people manage vast volumes of data in the cloud? Do you want to have direct and immediate impact on hundreds of thousands of users who use AWS database services?',
        dateApplied: '2024-6-14',
        dateClosed: '0001-01-01',
        closedReason: null
      }
    ]);
  }
}
