import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController} from "@ionic/angular";
import { CandidateEvaluationService } from "src/app/providers/logged-in/candidate-evaluation.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-can-eval-ques-dept-form',
  templateUrl: './can-eval-ques-dept-form.page.html',
  styleUrls: ['./can-eval-ques-dept-form.page.scss'],
})
export class CanEvalQuesDeptFormPage implements OnInit {

  public model;
  public deptIDs = [];
  public form:FormGroup;
  public saving = false;
  public checkboxList = [];
  constructor(
    public formBuilder: FormBuilder,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public candidateEvaluationService: CandidateEvaluationService
  ) { }

  ngOnInit() {
    this.checkboxList = this.departmentList();
    if (this.model && this.model.ceq_uuid) {
      this.loadQuestionDepartment();
    }

    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      name:[this.model.ceq_uuid ? this.model.question: "",Validators.required],
    })
  }

  close(data = {}) {
    this.modalCtrl.getTop().then(res => {
      res.dismiss(data);
    });
  }

  loadQuestionDepartment() {
    let param = '?expand=candidateEvalDeptQues';
    this.candidateEvaluationService.listQuestionDepartment(this.model.ceq_uuid,param).subscribe(response => {
      this.model = response;
      this.checkboxList = this.selectedList();
    })
  }

  save($event) {
    let request;
    let data = {
      question:this.form.value.name,
      deptIDs:this.checkboxList.filter(dep => dep.selected).map(res => res.id),
      ceq_uuid:null,
    }

    if (data.deptIDs.length ==0) {
      this.alertCtrl.create({
        header: 'Error!',
        message: 'Please select department',
        buttons: [
          {
            text: 'Ok',
            role: 'cancel'
          }
        ]
      }).then(alert => alert.present())
      return false;
    }
    this.saving = true;
    if (this.model && this.model.ceq_uuid) {

      data = {...data, ceq_uuid: this.model.ceq_uuid};
      request = this.candidateEvaluationService.update(data)
    } else {
      request = this.candidateEvaluationService.create(data)
    }

    request.subscribe(response => {
      this.saving = false;
      this.close({refresh:true});
    })
  }

  /**
   * department list
   */
  departmentList() {
    return [
      { id:1, name: 'Sales Associate', selected: false},
      { id:2, name:'IT', selected: false},
      { id:3, name:'Call Centre Agent', selected: false },
      { id:4, name:'Social Media', selected: false },
      { id:5, name:'Outdoor Sales Representative', selected: false }
    ]
  }

  selectedList() {
    return this.departmentList().map(data => {
      if (this.model.candidateEvalDeptQues.some(dept => dept.dept_id == data.id)) {
        return {...data, selected: true}
      } else {
        return {...data, selected: false}
      }
    });
  }
}
