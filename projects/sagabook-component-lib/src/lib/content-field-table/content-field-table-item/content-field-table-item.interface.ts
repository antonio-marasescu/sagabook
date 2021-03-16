import {FormGroup} from '@angular/forms';
import {ExpandedContentField} from '../content-field-table-item-expanded/content-field-table-item-expanded.interface';
import {ContentFieldType} from './content-field-types';

export interface ContentField {
  key: string | number;
  displayLabel?: string;
  value?: any; // value for non-form fields
  type: ContentFieldType;
}

export interface ContentFieldRow {
  key: string;
  selected?: boolean;
  expanded?: boolean;
  form: FormGroup;
  fields: ContentField[];
  expandedFields?: ExpandedContentField[];
}
