import { Injectable } from '@angular/core';
import {AuthHttpService} from "./authhttp.service";

@Injectable({
  providedIn: 'root'
})
export class CandidateEvaluationService {

  private endpoint: string = "/candidate-evaluation";

  constructor(private authHttpService: AuthHttpService) { }

  /**
   * @param page
   * @param param
   */
  listQuestionWithDepartment(page: number, param: any = null) {
    let url = `${this.endpoint}/list-assigned-question?page=${page}${param}`;
    return this.authHttpService.get(url,true);
  }

  listQuestionDepartment(QuestionUUID: number, param: any = null) {
    let url = `${this.endpoint}/question/${QuestionUUID}${param}`;
    return this.authHttpService.get(url);
  }

  listQuestion(page: number, param) {
    let url = `${this.endpoint}/question?page=${page}${param}`;
    return this.authHttpService.get(url,true);
  }

  listCandidateEvalReport(page: number, param) {
    let url = `${this.endpoint}/list-candidate-report?page=${page}${param}`;
    return this.authHttpService.get(url,true);
  }

  delete(QuestionUUID) {
    let url = `${this.endpoint}/question/${QuestionUUID}`;
    return this.authHttpService.delete(url);
  }

  /**
   * create question
   * @param data
   */
  create(data:any) {
    let url = `${this.endpoint}/create-question`;
    return this.authHttpService.post(url,{
      question:data.question,
      deptIDs:data.deptIDs,
    });
  }

  /**
   * update question
   * @param data
   */
  update(data:any) {
    let url = `${this.endpoint}/update-question/${data.ceq_uuid}`;
    return this.authHttpService.patch(url,{
      question: data.question,
      deptIDs: data.deptIDs,
    });
  }
}
