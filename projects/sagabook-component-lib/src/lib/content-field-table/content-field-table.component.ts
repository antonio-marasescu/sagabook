import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {ContentFieldTable} from './content-field-table-format.interface';
import {ContentFieldConfig} from './content-field-table-item/content-field-table-item.config';
import {
  ContentFieldRowChangeEvent,
  ContentFieldRowExpandedEvent,
  ContentFieldRowSelectedEvent,
  mapToSelectedEvent
} from './content-field-table-item/content-field-table-item.events';
import {MatCheckboxChange} from '@angular/material/checkbox';

@Component({
  selector: 'sb-content-field-table',
  templateUrl: 'content-field-table.component.html',
  styleUrls: ['content-field-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentFieldTableComponent {
  @Input() config: ContentFieldConfig;
  @Input() dataSource: ContentFieldTable;
  @Output() valueChanges: EventEmitter<ContentFieldRowChangeEvent> = new EventEmitter<ContentFieldRowChangeEvent>();
  @Output() rowSelected: EventEmitter<ContentFieldRowSelectedEvent> = new EventEmitter<ContentFieldRowSelectedEvent>();
  @Output() rowExpanded: EventEmitter<ContentFieldRowExpandedEvent> = new EventEmitter<ContentFieldRowExpandedEvent>();

  selectAll = false;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  getExpandedCollspan(): number {
    return this.dataSource.headers.length + (this.config.expandable ? 1 : 0) + (this.config.selectable ? 1 : 0);
  }

  onSelectAll(value: MatCheckboxChange): void {
    this.selectAll = value.checked;
    if (this.dataSource?.rows) {
      this.dataSource.rows = this.dataSource.rows.map(r => ({...r, selected: this.selectAll}));
      this.dataSource.rows.forEach(row => {
        this.rowSelected.emit(mapToSelectedEvent(row.key, row.selected));
      });
      this.changeDetectorRef.markForCheck();
    }
  }

  onRowExpanded(event: ContentFieldRowExpandedEvent): void {
    const eventRow = this.dataSource.rows.find(r => r.key === event.key);
    eventRow.expanded = event.expanded;
    this.rowExpanded.emit(event);
    this.changeDetectorRef.markForCheck();
  }
}
