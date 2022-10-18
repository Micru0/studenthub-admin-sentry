import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Services
import { AuthHttpService } from './authhttp.service';
// Models
import { Note } from 'src/app/models/note';


@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private noteEndpoint = '/permission-section';

  constructor(private authhttp: AuthHttpService) { }

  /**
   * List of all notest
   * @param page
   * @param searchParams
   */
  list(page = null, expand = '&expand=permissionSubSections'): Observable<any> {
    let url = this.noteEndpoint + '?' + expand;

    if (page) {
      url += '&page=' + page;
      return this.authhttp.get(url, true);
    }

    return this.authhttp.get(url);
  }

  /**
   * Return note detail
   * @param note
   */
  userPermission(type, id): Observable<any> {
    const url = this.noteEndpoint + '/user-permission/' + type + '/' + id;
    return this.authhttp.get(url);
  }

  /**
   * create note
   * @param model
   */
  createSection(name): Observable<any>{
    return this.authhttp.post(this.noteEndpoint, {
      section_name: name,
    });
  }

  /**
   * @param name
   * @param slug
   * @param permission_uuid
   */
  createSubSection(name, slug, permission_uuid): Observable<any>{
    return this.authhttp.post(`${this.noteEndpoint}/sub`, {
      name,
      slug,
      permission_uuid,
    });
  }

  /**
   * update note
   * @param model
   */
  updateSection(name, uuid): Observable<any>{
    return this.authhttp.patch(`${this.noteEndpoint}/${uuid}`, {
      section_name: name
    });
  }

  updateSubSection(name, slug, permission_sub_section_uuid): Observable<any>{
    return this.authhttp.patch(`${this.noteEndpoint}/sub/${permission_sub_section_uuid}`, {
      name,
      slug
    });
  }

  setUserPermission(permission, type, id): Observable<any>{
    return this.authhttp.patch(`${this.noteEndpoint}/set-permission/${id}`, {
      permission,
      type
    });
  }

  /**
   * delete note
   * @param model
   */
  delete(model: Note): Observable<any>{
    return this.authhttp.delete(`${this.noteEndpoint}/${model.note_uuid}`);
  }

  deletePermission(model: any): Observable<any>{
    return this.authhttp.delete(`${this.noteEndpoint}/${model.permission_uuid}`);
  }

  deleteSubPermission(model: any): Observable<any>{
    return this.authhttp.delete(`${this.noteEndpoint}/sub/${model.permission_sub_section_uuid}`);
  }
}
