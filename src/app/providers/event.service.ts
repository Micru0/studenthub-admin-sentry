import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  public userLogout$ = new Subject();
  public userLogin$ = new Subject();
  public internetOffline$ = new Subject();
  public error404$ = new Subject();
  public error500$ = new Subject();

  public transferUpdated$ = new Subject();

  public totalCandidateToReview$ = new Subject();
  public updatePayable$ = new Subject();
  public payableCandidate$ = new Subject();
  public reloadCompanyList$ = new Subject();

  constructor() { }
}
