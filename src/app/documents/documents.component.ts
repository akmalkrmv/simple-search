import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { DocumentApiService } from './services/documents-api.service';
import { Document } from '../models/document';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent implements AfterViewInit {
  @ViewChild('search') searchInput: ElementRef;

  public documents$: Observable<Document[]>;
  public seaching$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private documentApi: DocumentApiService) {}

  ngAfterViewInit(): void {
    const input = this.searchInput.nativeElement as HTMLInputElement;
    this.documents$ = fromEvent(input, 'keyup').pipe(
      debounceTime(500),
      tap(() => this.seaching$.next(true)),
      switchMap(() => this.documentApi.search(input.value)),
      tap(() => this.seaching$.next(false))
    );
  }
}
