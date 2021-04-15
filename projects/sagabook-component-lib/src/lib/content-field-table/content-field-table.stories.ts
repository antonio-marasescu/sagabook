import {moduleMetadata, storiesOf} from '@storybook/angular';
import {ContentFieldTableModule} from './content-field-table.module';
import {object, withKnobs} from '@storybook/addon-knobs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ContentFieldConfig} from './content-field-table-item/content-field-table-item.config';
import {ContentFieldTable} from './content-field-table-format.interface';
import {ContentFieldType} from './content-field-table-item/content-field-types';

const formGroupRow1 = new FormGroup({
  line: new FormControl('', [Validators.required]),
  label: new FormControl('', [Validators.required])
});
const formGroupRow2 = new FormGroup({
  line: new FormControl('', [Validators.required]),
  label: new FormControl('', [Validators.required])
});

const dataSource: ContentFieldTable = {
  headers: ['Player', 'Line', 'Label', 'Text'],
  rows: [
    {
      key: '1',
      selected: false,
      expanded: false,
      form: formGroupRow1,
      fields: [
        {key: 'player', value: 'Player 1', type: ContentFieldType.TextField},
        {key: 'line', displayLabel: 'Line', type: ContentFieldType.FormField},
        {key: 'label', displayLabel: 'Label', type: ContentFieldType.FormField},
        {key: 'text', value: '1', type: ContentFieldType.TextField}
      ],
      expandedFields: [
        {key: 'Field 1', value: '13535'},
        {key: 'Field 2', value: '23535'},
        {key: 'Field 3', value: '33535'},
        {key: 'Field 4', value: '43535'},
        {key: 'Field 5', value: '53535'},
        {key: 'Owner', value: 'Bob'},
      ]
    },
    {
      key: '2',
      selected: false,
      expanded: false,
      form: formGroupRow2,
      fields: [
        {key: 'player', value: 'Player 2', type: ContentFieldType.TextField},
        {key: 'line', displayLabel: 'Line', type: ContentFieldType.FormField},
        {key: 'label', displayLabel: 'Label', type: ContentFieldType.FormField},
        {key: 'text', value: 'lorem ipsum', type: ContentFieldType.TextField}
      ],
      expandedFields: [
        {key: 'Additional Information', value: '13535'},
        {key: 'Owner', value: 'Tim'},
      ]
    }
  ]
};

const config: ContentFieldConfig = {
  selectable: false,
  expandable: false,
};

storiesOf('ContentFieldTable', module)
  .addDecorator(moduleMetadata({
    declarations: [],
    imports: [ContentFieldTableModule]
  }))
  .addDecorator(withKnobs)
  .add('Default',
    () => ({
      template: `<sb-content-field-table [config]="config" [dataSource]="dataSource" (valueChanges)="onValueChange($event)" (rowSelected)="onRowSelected($event)"></sb-content-field-table>`,
      props: {
        dataSource,
        config: object('config', config),
        onValueChange: (value) => console.log('Story.Normal.onValueChange', value),
        onRowSelected: (value) => console.log('Story.Normal.onRowSelected', value)
      }
    }))
  .add('Selection',
    () => ({
      template: `
        <sb-content-field-table
            [config]="config"
            [dataSource]="dataSource"
            (valueChanges)="onValueChange($event)"
            (rowSelected)="onRowSelected($event)">
        </sb-content-field-table>`,
      props: {
        dataSource,
        config: object('config', {...config, selectable: true}),
        onValueChange: (value) => console.log('Story.Selection.onValueChange', value),
        onRowSelected: (value) => console.log('Story.Normal.onRowSelected', value)
      }
    }))
  .add('Expandable',
    () => ({
      template: `
        <sb-content-field-table
            [config]="config"
            [dataSource]="dataSource"
            (valueChanges)="onValueChange($event)"
            (rowSelected)="onRowSelected($event)">
        </sb-content-field-table>`,
      props: {
        dataSource,
        config: object('config', {...config, expandable: true}),
        onValueChange: (value) => console.log('Story.Selection.onValueChange', value),
        onRowSelected: (value) => console.log('Story.Normal.onRowSelected', value)
      }
    }))
  .add('All',
    () => ({
      template: `
        <sb-content-field-table
            [config]="config"
            [dataSource]="dataSource"
            (valueChanges)="onValueChange($event)"
            (rowSelected)="onRowSelected($event)">
        </sb-content-field-table>`,
      props: {
        dataSource,
        config: object('config', {...config, expandable: true, selectable: true}),
        onValueChange: (value) => console.log('Story.Selection.onValueChange', value),
        onRowSelected: (value) => console.log('Story.Normal.onRowSelected', value)
      }
    }));

