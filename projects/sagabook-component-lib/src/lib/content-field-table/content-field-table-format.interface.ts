import {ContentFieldRow} from './content-field-table-item/content-field-table-item.interface';

export interface ContentFieldTable {
  headers: string[];
  rows: ContentFieldRow[];
}
