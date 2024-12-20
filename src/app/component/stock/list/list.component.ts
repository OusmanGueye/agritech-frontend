import {Component, QueryList, ViewChildren} from '@angular/core';
import {Observable} from "rxjs";


import {NgbdSortableHeader, SortEvent} from "../../../shared/directives/sortable.directive";
import {TableService} from "../../../shared/services/table.service";
import {IStock} from "../stock.model";
import {EntityArrayResponseType, StockService} from "../service/stock.service";
import {FormsModule} from "@angular/forms";
import {DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {NgbHighlight, NgbPagination} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NgbHighlight,
    NgbPagination,
    NgbdSortableHeader
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [TableService, DecimalPipe],
})
export class ListComponent {
  public tableData$: Observable<EntityArrayResponseType>;
  public tableData: IStock[] = [];
  public Data: IStock[] = [];
  public total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: TableService, private entrepriseService: StockService) {
    this.tableData$ = this.entrepriseService.getAllStocks();
    this.total$ = this.service.total$;
  }

  ngOnInit() {
    this.tableData$.subscribe((res) => {
      this.tableData = res.body || []; // Récupérer les données depuis la réponse
      console.log(this.tableData);
      this.Data = [...this.tableData]; // Clone pour les filtres et recherches

    });
  }

  get filteredData(): IStock[] {
    return this.tableData.filter((item) => {
      return (
          (item.nom || '').toLowerCase().includes(this.service.searchTerm.toLowerCase()) ||
          (item.emplacement || '').toLowerCase().includes(this.service.searchTerm.toLowerCase())
          // (item.capacite || '').toLowerCase().includes(this.service.searchTerm.toLowerCase()) ||
          // (item.quantite || '').toLowerCase().includes(this.service.searchTerm.toLowerCase())
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
