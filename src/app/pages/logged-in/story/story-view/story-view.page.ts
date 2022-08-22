import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Platform} from '@ionic/angular';
import {Request, Story} from 'src/app/models/request';
import { Note } from 'src/app/models/note';
import {RequestService} from 'src/app/providers/logged-in/request.service';
import { NoteService } from 'src/app/providers/logged-in/note.service';
import {InvitationService} from 'src/app/providers/logged-in/invitation.service';
import {SuggestionService} from 'src/app/providers/logged-in/suggestion.service';
import {StoryService} from "../../../../providers/logged-in/story.service";

@Component({
  selector: 'app-story-view',
  templateUrl: './story-view.page.html',
  styleUrls: ['./story-view.page.scss'],
})
export class StoryViewPage implements OnInit {

  public story: Story;
  public notes: Note[];
  public invitations: any[];
  public suggestions: any[];
  public loading = false;
  public story_uuid;
  public segment = 'info';

  public NPageCount;
  public NCurrentPage = 1;

  public IPageCount;
  public ICurrentPage = 1;

  public SPageCount;
  public SCurrentPage = 1;

  constructor(
      public storyService: StoryService,
      private activateRoute: ActivatedRoute,
      private noteService: NoteService,
      private invitationService: InvitationService,
      private suggestionService: SuggestionService,
      public platform: Platform,
  ) {
    this.story_uuid = this.activateRoute.snapshot.paramMap.get('story_uuid');
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    let params = '?expand=staff,request,request.company,request.contact';
    this.storyService.detail(this.story_uuid, params).subscribe(response => {
        this.story = response;
    },
        error => this.loading = false,
        () => this.loading = false
    );
  }

  segmentChanged(event) {
    this.segment = event.detail.value;
    if (this.segment == 'notes') {
      this.loadNotesData(this.NCurrentPage);
    }
    if (this.segment == 'invitations') {
      this.loadInvitationData(this.ICurrentPage);
    }
    if (this.segment == 'suggestions') {
      this.loadSuggestionData(this.SCurrentPage);
    }
  }

  /**
   * Make date readable by Safari
   * @param date
   */
  toDate(date) {
    if (date) {
      return new Date(date.replace(/-/g, '/'));
    }
  }

  /**
   * load company data
   * @param page
   * @param silent
   */
  async loadNotesData(page: number, silent = false) {

    if (!silent) {
      this.loading = true;
    }
    const searchParams = '&expand=createdBy,updatedBy&story_uuid=' + this.story_uuid;
    this.noteService.list(searchParams, page).subscribe(response => {

      this.NPageCount = parseInt(response.headers.get('X-Pagination-Page-Count'), 10);
      this.NCurrentPage = parseInt(response.headers.get('X-Pagination-Current-Page'), 10);

      this.notes = response.body;
      this.loading = false;

    }, () => {
      this.loading = false;
    });
  }

  /**
   * load more companies on scroll to bottom
   * @param event
   */
  doInfinite(event) {

    this.NCurrentPage++;

    this.loading = true;
    const searchParams = '&expand=createdBy,updatedBy&story_uuid=' + this.story_uuid;
    this.noteService.list(searchParams, this.NCurrentPage).subscribe(response => {

      this.NPageCount = parseInt(response.headers.get('X-Pagination-Page-Count'), 10);
      this.NCurrentPage = parseInt(response.headers.get('X-Pagination-Current-Page'), 10);

      this.notes = this.notes.concat(response.body);
      this.loading = false;
      event.target.complete();
    }, () => {
    });
  }

  /**
   * load company data
   * @param page
   * @param silent
   */
  async loadInvitationData(page: number, silent = false) {

    if (!silent) {
      this.loading = true;
    }
    const searchParams = '&expand=candidate&story_uuid=' + this.story_uuid;
    this.invitationService.list(page, searchParams).subscribe(response => {

      this.IPageCount = parseInt(response.headers.get('X-Pagination-Page-Count'), 10);
      this.ICurrentPage = parseInt(response.headers.get('X-Pagination-Current-Page'), 10);

      this.invitations = response.body;
      this.loading = false;

    }, () => {
      this.loading = false;
    });
  }

  /**
   * load more companies on scroll to bottom
   * @param event
   */
  doInvitationInfinite(event) {

    this.ICurrentPage++;

    this.loading = true;
    const searchParams = '&expand=candidate&story_uuid=' + this.story_uuid;
    this.invitationService.list(this.ICurrentPage, searchParams).subscribe(response => {

      this.IPageCount = parseInt(response.headers.get('X-Pagination-Page-Count'), 10);
      this.ICurrentPage = parseInt(response.headers.get('X-Pagination-Current-Page'), 10);

      this.invitations = this.invitations.concat(response.body);
      this.loading = false;
      event.target.complete();
    }, () => {
    });
  }

  /**
   * load company data
   * @param page
   * @param silent
   */
  async loadSuggestionData(page: number, silent = false) {

    if (!silent) {
      this.loading = true;
    }
    const searchParams = '&expand=candidate&story_uuid=' + this.story_uuid;
    this.suggestionService.list(page, searchParams).subscribe(response => {

      this.SPageCount = parseInt(response.headers.get('X-Pagination-Page-Count'), 10);
      this.SCurrentPage = parseInt(response.headers.get('X-Pagination-Current-Page'), 10);

      this.suggestions = response.body;
      this.loading = false;

    }, () => {
      this.loading = false;
    });
  }

  /**
   * load more companies on scroll to bottom
   * @param event
   */
  doSuggestionsInfinite(event) {

    this.SCurrentPage++;

    this.loading = true;
    const searchParams = '&expand=candidate&story_uuid=' + this.story_uuid;
    this.suggestionService.list(this.SCurrentPage, searchParams).subscribe(response => {

      this.SPageCount = parseInt(response.headers.get('X-Pagination-Page-Count'), 10);
      this.SCurrentPage = parseInt(response.headers.get('X-Pagination-Current-Page'), 10);

      this.suggestions = this.suggestions.concat(response.body);
      this.loading = false;
      event.target.complete();
    }, () => {
    });
  }

  getStatus(status) {
    let response;
    switch (status) {
      case 0:
          response = 'Unstarted';
          break;
      case 1:
          response = 'Started';
          break;
      case 2:
          response = 'Finished';
          break;
      case 3:
          response = 'Delivered';
          break;
      case 4:
          response = 'Rejected';
          break;
      case 5:
          response = 'Accepted';
          break;
      case 6:
          response = 'Cancelled';
          break;
      default:
          response = 'Invalid';
          break;
    }
    return response;
  }
}
