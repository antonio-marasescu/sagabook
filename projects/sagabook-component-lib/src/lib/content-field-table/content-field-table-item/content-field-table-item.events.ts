import {FormGroup} from '@angular/forms';

export interface ContentFieldRowChangeEvent {
  key: string;
  value: FormGroup;
}

export interface ContentFieldRowSelectedEvent {
  key: string;
  selected: boolean;
}

export interface ContentFieldRowExpandedEvent {
  key: string;
  expanded: boolean;
}

export function mapToChangeEvent(key: string, value: any): ContentFieldRowChangeEvent {
  return {
    key,
    value
  };
}

export function mapToSelectedEvent(key: string, selected: any): ContentFieldRowSelectedEvent {
  return {
    key,
    selected
  };
}

export function mapToExpandedEvent(key: string, expanded: any): ContentFieldRowExpandedEvent {
  return {
    key,
    expanded
  };
}
