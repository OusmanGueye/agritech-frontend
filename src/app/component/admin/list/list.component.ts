import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Observable} from "rxjs";
import {supportDB} from "../../../shared/interface/support";
import {SUPPORTDB} from "../../../shared/data/table/data-table/SupportTdb";
import {NgbdSortableHeader, SortEvent} from "../../../shared/directives/sortable.directive";
import {TableService} from "../../../shared/services/table.service";
import {AsyncPipe, DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbHighlight, NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {IAdmin} from "../admin.model";
import {AdminService, EntityArrayResponseType} from "../service/admin.service";


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    AsyncPipe,
    DecimalPipe,
    FormsModule,
    NgbHighlight,
    NgbPagination,
    NgbdSortableHeader,
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [TableService, DecimalPipe],
})
export class ListComponent implements OnInit {
  public tableData$: Observable<EntityArrayResponseType>;
  public tableData: IAdmin[] = [];
  public Data: IAdmin[] = [];
  public total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: TableService, private entrepriseService: AdminService) {
    this.tableData$ = this.entrepriseService.getAllAdmins();
    this.total$ = this.service.total$;
  }

  ngOnInit() {
    this.tableData$.subscribe((res) => {
      this.tableData = res.body || []; // Récupérer les données depuis la réponse
      this.Data = [...this.tableData]; // Clone pour les filtres et recherches

    });
  }

  get filteredData(): IAdmin[] {
    return this.tableData.filter((item) => {
      return (
          (item.nomComplet || '').toLowerCase().includes(this.service.searchTerm.toLowerCase()) ||
          (item.telephone || '').toLowerCase().includes(this.service.searchTerm.toLowerCase()) ||
          (item.address || '').toLowerCase().includes(this.service.searchTerm.toLowerCase()) ||
          (item.email || '').toLowerCase().includes(this.service.searchTerm.toLowerCase())
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