import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {ContentFieldRow} from './content-field-table-item.interface';
import {ReplaySubject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {
  ContentFieldRowChangeEvent,
  ContentFieldRowExpandedEvent,
  ContentFieldRowSelectedEvent,
  mapToChangeEvent,
  mapToExpandedEvent,
  mapToSelectedEvent
} from './content-field-table-item.events';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {ContentFieldConfig} from './content-field-table-item.config';
import {ContentFieldType} from './content-field-types';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[sb-content-field-table-item]',
  templateUrl: 'content-field-table-item.component.html',
  styleUrls: ['content-field-table-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentFieldTableItemComponent implements OnInit, OnChanges, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private valueChangeSubscription: Subscription = null;

  @Input() config: ContentFieldConfig;
  @Input() dataSource: ContentFieldRow;
  @Input() selected?: boolean;
  @Input() expanded?: boolean;
  @Output() valueChanges: EventEmitter<ContentFieldRowChangeEvent> = new EventEmitter<ContentFieldRowChangeEvent>();
  @Output() rowSelected: EventEmitter<ContentFieldRowSelectedEvent> = new EventEmitter<ContentFieldRowSelectedEvent>();
  @Output() rowExpanded: EventEmitter<ContentFieldRowExpandedEvent> = new EventEmitter<ContentFieldRowExpandedEvent>();

  fieldTypes = {FormField: ContentFieldType.FormField, TextField: ContentFieldType.TextField};

  ngOnInit(): void {
    this.setup();
    this.dataSource?.form?.markAllAsTouched();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dataSource && changes.dataSource.currentValue !== changes.dataSource.previousValue) {
      this.dataSource = changes.dataSource.currentValue;
      this.setup();
    }
  }

  setup(): void {
    this.valueChangeSubscription?.unsubscribe();
    if (this.dataSource?.form) {
      this.valueChangeSubscription = this.dataSource.form.valueChanges
        .pipe(takeUntil(this.destroyed$))
        .subscribe(() => this.valueChanges.emit(mapToChangeEvent(this.dataSource.key, this.dataSource.form)));
    }
  }

  onSelected(currentValue: MatCheckboxChange): void {
    if (this.config?.selectable) {
      this.rowSelected.emit(mapToSelectedEvent(this.dataSource.key, currentValue.checked));
    }
  }

  onExpanded(): void {
    if (this.config?.expandable) {
      this.rowExpanded.emit(mapToExpandedEvent(this.dataSource.key, !this.expanded));
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
