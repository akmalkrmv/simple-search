import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, Observable, of } from 'rxjs';
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

  constructor(private documentApi: DocumentApiService) {}

  ngAfterViewInit(): void {
    const input = this.searchInput.nativeElement as HTMLInputElement;
    this.documents$ = fromEvent(input, 'keyup').pipe(
      debounceTime(500),
      switchMap(() => this.documentApi.search(input.value))
    );
  }
}
