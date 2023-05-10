import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
// services
import { TagService } from 'src/app/providers/logged-in/tag.service';
import { AuthService } from 'src/app/providers/auth.service';
// pages
import { TagFormPage } from '../tag-form/tag-form.page';
// models
import { Tag } from 'src/app/models/tag';


@Component({
  selector: 'app-tag-view',
  templateUrl: './tag-view.page.html',
  styleUrls: ['./tag-view.page.scss'],
})
export class TagViewPage implements OnInit {

  public tag_id: string;

  public tag: Tag;

  public loading = false;

  constructor(
    private tagService: TagService,
    private activateRoute: ActivatedRoute,
    private _modalCtrl: ModalController,
    public authService: AuthService,

  ) {
    // this.tag = params.get('model');
  }

  ngOnInit() {
    window.analytics.page('Tag View Page');

    // Load the passed model if available
    if (window.history.state) {
      this.tag = window.history.state.model;
    }

    this.tag_id = this.activateRoute.snapshot.paramMap.get('tag_id');

    this.loadData();
  }

  loadData() {
    this.loading = true;

    this.tagService.view(this.tag_id).subscribe(tag => {
      this.tag = tag;

      this.loading = false;

    }, () => {

      this.loading = false;
    });
  }

  /**
   * Loads Form in modal to update
   */
  async update() {
    window.history.pushState({ navigationId: window.history.state.navigationId }, null, window.location.pathname);

    const modal = await this._modalCtrl.create({
      component: TagFormPage,
      componentProps: {
       model: this.tag,
       tag_id: this.tag.tag_id
      }
    });
    modal.onDidDismiss().then(e => {

      if (!e.data || e.data.from != 'native-back-btn') {
        window['history-back-from'] = 'onDidDismiss';
        window.history.back();
      }

      if (e && e.data && e.data.model) {
        this.tag = e.data.model; //  load data on update close
      }
    });
    modal.present();
  }
}
