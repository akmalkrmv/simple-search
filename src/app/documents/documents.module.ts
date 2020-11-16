import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsComponent } from './documents.component';
import { DocumentComponent } from './document/document.component';
import { DocumentListComponent } from './document-list/document-list.component';

@NgModule({
  declarations: [DocumentsComponent, DocumentComponent, DocumentListComponent],
  imports: [CommonModule, DocumentsRoutingModule],
})
export class DocumentsModule {}
