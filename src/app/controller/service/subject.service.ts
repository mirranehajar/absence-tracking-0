import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Module} from '../model/module';
import {Session} from '../model/session';
import {Subject} from '../model/subject';

@Injectable({
  providedIn: 'root',
})

export class SubjectService {
  // tslint:disable-next-line:variable-name
  private _subject: Subject;
  // tslint:disable-next-line:variable-name
  private _subjects: Subject[];
  // tslint:disable-next-line:variable-name
  private _subjectFounded: Subject;
  private _subjectsFounded: Subject[];
  // tslint:disable-next-line:variable-name
  private _url = 'http://localhost:8090/absence-tracking/subject/';

  constructor(private http: HttpClient) { }

  public async findAll() {
    await this.http.get<Subject[]>(this._url).toPromise().then(
      (data) => {
        this.subjects = data;
      },
    );
  }
  public findByLibelle(subject: Subject) {
    this.http.get<Module>(this._url + 'libelle/' + subject.libelle).subscribe(
      (data) => {
        this.subjectFounded = data;
      },
    );
  }
  deleteByLibelle(subject: Subject) {
    this.http.delete<number>(this._url + 'libelle/' + subject.libelle).subscribe(
      (data) => {
        this.deleteFromList(subject);
      },
    );
  }
  public deleteFromList(subject: Subject) {
    const index = this.subjects.findIndex((e) => e.libelle === subject.libelle);
    if (index !== -1) {
      this.subjects.splice(index, 1);
    }
  }
  async save() {
    await this.http.post<number>(this._url, this.subject).toPromise().then(
      (data) => {
        if (data > 0) {
          this.subjects.push(this.clone(this.subject));
          this.subject = null;
        }
      }, (error) => {
        console.log(error);
      },
    );
  }
  private clone(subject: Subject) {
    const myclone = new Subject();
    myclone.libelle = subject.libelle ;
    return myclone;
  }

  get subject(): Subject {
    if ( this._subject == null) {
      this._subject = new Subject();
    }
    return this._subject;
  }

  set subject(value: Subject) {
    this._subject = value;
  }

  get subjects(): Subject[] {
    if ( this._subjects == null) {
      this._subjects = new Array<Subject>();
    }
    return this._subjects;
  }
  set subjects(value: Subject[]) {
    this._subjects = value;
  }

  get subjectFounded(): Subject {
    return this._subjectFounded;
  }

  set subjectFounded(value: Subject) {
    this._subjectFounded = value;
  }

  get subjectsFounded(): Subject[] {
    if ( this._subjectsFounded == null) {
      this._subjectsFounded = new Array<Subject>();
    }
    return this._subjectsFounded;
  }

  set subjectsFounded(value: Subject[]) {
    this._subjectsFounded = value;
  }
}
