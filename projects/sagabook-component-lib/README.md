# Sagabook UI Component Library

Sagabook is a library of component using Angular Material for various use cases.

## Content Field Table

A component for handling displaying and editing data inside a table.

Please checkout the storybook at https://github.com/antonio-marasescu/sagabook-ui

### How to use

- install it using `npm i sagabook-component-lib`
- import the `ContentFieldTableModule` in your module
- add the component to your html using `<sb-content-field-table></sb-content-field-table>`
- Fill out the `dataSource` and `config` inputs

### @Input dataSource: ContentFieldTable
Specifies the input used to render the form fields and readonly data inside the table
#### Table definition
    export interface ContentFieldTable {
      headers: string[]; // the headers of the tables
      rows: ContentFieldRow[]; // the definition of a row of the table
    }

#### Row definition
    export interface ContentFieldRow {
      key: string; // unique identifier of the row
      selected?: boolean; // if row will be selectable
      expanded?: boolean; // if row will be expandable
      form: FormGroup;  // the form using editable the fields keys
      fields: ContentField[]; // the normal row header fields definition
      expandedFields?: ExpandedContentField[]; // the exapanded fields definition
    }

#### Content Field definition

    export interface ContentField {
      key: string | number; // the unique key of the field
      displayLabel?: string; // the label displayed if the field is a form control
      value?: any; // value for non-form fields
      type: ContentFieldType; // TextField or FormField
    }

#### Expanded Content Field definition

    export interface ExpandedContentField {
      key: string | number; // the unique key of the field
      value?: any; // the value displayed
    }

### @Input config: ContentFieldConfig

    export interface ContentFieldConfig {
      selectable: boolean; // is the table using selectable rows
      expandable: boolean; // is the table using expandable rows
    }
