import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

const DEFAULT_PAGE_SIZE: number = 10;

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  _page: number = 0;
  _dataCount: number = 0;
  _pageSize: number = DEFAULT_PAGE_SIZE;

  @Output()
  pageChange: EventEmitter<number> = new EventEmitter();

  @Input()
  public set page(val: number) {
    this._page = val;
  }

  @Input()
  public set pageSize(val: number) {
    this._pageSize = val;
  }

  @Input()
  public set dataCount(val: number) {
    this._dataCount = val;
  }

  get firstPage(): number {
    return 1;
  }

  get lastPage(): number {
    return this.pageCount;
  }

  get pageCount(): number {
    return Math.ceil(this._dataCount / this._pageSize);
  }

  get hasPrevPage(): boolean {
    return this._page > this.firstPage;
  }

  get hasNextPage(): boolean {
    return this._page < this.pageCount;
  }

  constructor() { }

  ngOnInit(): void {
  }

  pageChangeClick(nextPage: number) {
    if (nextPage < this.firstPage)
      nextPage = this.firstPage;

    if (nextPage > this.pageCount)
      nextPage = this.pageCount;

    this.pageChange.emit(nextPage);
  }

}
