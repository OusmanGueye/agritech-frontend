import {Component, QueryList, ViewChildren} from '@angular/core';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbdSortableHeader, SortEvent} from "../../../shared/directives/sortable.directive";
import {CommonModule, DecimalPipe} from "@angular/common";
import {Observable} from "rxjs";

import {TableService} from "../../../shared/services/table.service";
import {ISite} from "../site.model";
import {EntityArrayResponseType, SiteService} from "../service/site.service";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbdSortableHeader, ReactiveFormsModule, NgbModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [TableService, DecimalPipe],
})
export class ListComponent {

  public tableData$: Observable<EntityArrayResponseType>;
  public tableData: ISite[] = [];
  public Data: ISite[] = [];
  public total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: TableService, private entrepriseService: SiteService) {
    this.tableData$ = this.entrepriseService.getAllSites();
    this.total$ = this.service.total$;
  }

  ngOnInit() {
    this.tableData$.subscribe((res) => {
      this.tableData = res.body || []; // Récupérer les données depuis la réponse
      this.Data = [...this.tableData]; // Clone pour les filtres et recherches

    });
  }

  get filteredData(): ISite[] {
    return this.tableData.filter((item) => {
      return (
          (item.nom || '').toLowerCase().includes(this.service.searchTerm.toLowerCase()) ||
          (item.localisation || '').toLowerCase().includes(this.service.searchTerm.toLowerCase()) ||
          (item.typeSite || '').toLowerCase().includes(this.service.searchTerm.toLowerCase())
      );
    });
  }

  getStartingIndex(): number {
    if (this.filteredData.length === 0) {
      return 0;
    }
    return (this.service.page - 1) * this.service.pageSize + 1;
  }

  getEndingIndex(): number {
    const endIndex = this.service.page * this.service.pageSize;
    return Math.min(endIndex, this.filteredData.length);
  }

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }


}
