import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ExpandedContentField} from './content-field-table-item-expanded.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[sb-content-field-table-item-expanded]',
  templateUrl: 'content-field-table-item-expanded.component.html',
  styleUrls: ['content-field-table-item-expanded.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentFieldTableItemExpandedComponent {
  @Input() colSpan: number;
  @Input() fields: ExpandedContentField[] = [];
}
