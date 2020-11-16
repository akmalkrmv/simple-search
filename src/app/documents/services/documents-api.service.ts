import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Documents } from '../../mocks/documents';
import { Document } from '../../models/document';

@Injectable({ providedIn: 'root' })
export class DocumentApiService {
  public search(query: string): Observable<Document[]> {
    query = query.toLowerCase();

    return of(Documents).pipe(
      delay(1000),
      map((docs) =>
        docs.filter((doc) => doc.title.toLowerCase().includes(query))
      )
    );
  }

  public get(title: string): Observable<Document> {
    console.log(title);
    title = title.toLowerCase();
    const find = Documents.filter((doc) =>
      doc.title.toLowerCase().includes(title)
    );

    return from(find);
  }
}
