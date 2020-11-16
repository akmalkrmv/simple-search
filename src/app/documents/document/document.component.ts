import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Document } from '../../models/document';
import { DocumentApiService } from '../services/documents-api.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentComponent implements OnInit {
  @Input() document: Document;

  constructor(
    private activatedRoute: ActivatedRoute,
    private documentApi: DocumentApiService,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async (params) => {
      const title = params.get('title');
      console.log(title);
      if (title) {
        this.document = await this.documentApi.get(title).toPromise();
        this.changeDetection.markForCheck();
      }
    });
  }
}
