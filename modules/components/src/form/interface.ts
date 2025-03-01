// Copyright (c) 2021 Terminus, Inc.
//
// This program is free software: you can use, redistribute, and/or modify
// it under the terms of the GNU Affero General Public License, version 3
// or later ("AGPL"), as published by the Free Software Foundation.
//
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
// FITNESS FOR A PARTICULAR PURPOSE.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

import React from 'react';
import { IFormGridProps, IFormItemProps, IFormLayoutProps } from '@formily/antd';
import { FieldValidator } from '@formily/core';

export type CT =
  | React.ComponentClass
  | React.FunctionComponent
  | React.VoidFunctionComponent
  | React.ForwardRefExoticComponent<any>;

export interface Field<T extends CT = any> {
  name: string;
  title?: string;
  label?: string;
  defaultValue?: unknown;
  type?: string;
  required?: boolean;
  validator?: FieldValidator;
  component: T;
  componentName?: string;
  customProps?: T extends CT ? React.ComponentProps<T> : never;
  wrapperProps?: IFormItemProps;
  items?: Field[];
  gridConfig?: IFormGridProps;
  layoutConfig?: IFormLayoutProps;
  properties?: Field[];
  display?: 'none' | 'visible' | 'hidden';
  valuePropName?: string;
  noPropertyLayoutWrapper?: boolean;
}

export interface CheckType {
  <
    T1 extends CT,
    T2 extends CT,
    T3 extends CT,
    T4 extends CT,
    T5 extends CT,
    T6 extends CT,
    T7 extends CT,
    T8 extends CT,
    T9 extends CT,
    T10 extends CT,
    T11 extends CT,
    T12 extends CT,
    T13 extends CT,
    T14 extends CT,
    T15 extends CT,
    T16 extends CT,
    T17 extends CT,
    T18 extends CT,
    T19 extends CT,
    T20 extends CT,
    T21 extends CT,
    T22 extends CT,
    T23 extends CT,
    T24 extends CT,
    T25 extends CT,
    T26 extends CT,
    T27 extends CT,
    T28 extends CT,
    T29 extends CT,
    T30 extends CT,
  >(
    args:
      | [Field<T1>]
      | [Field<T1>, Field<T2>]
      | [Field<T1>, Field<T2>, Field<T3>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>]
      | [
          Field<T1>,
          Field<T2>,
          Field<T3>,
          Field<T4>,
          Field<T5>,
          Field<T6>,
          Field<T7>,
          Field<T8>,
          Field<T9>,
          Field<T10>,
          Field<T11>,
        ]
      | [
          Field<T1>,
          Field<T2>,
          Field<T3>,
          Field<T4>,
          Field<T5>,
          Field<T6>,
          Field<T7>,
          Field<T8>,
          Field<T9>,
          Field<T10>,
          Field<T11>,
          Field<T12>,
        ]
      | [
          Field<T1>,
          Field<T2>,
          Field<T3>,
          Field<T4>,
          Field<T5>,
          Field<T6>,
          Field<T7>,
          Field<T8>,
          Field<T9>,
          Field<T10>,
          Field<T11>,
          Field<T12>,
          Field<T13>,
        ]
      | [
          Field<T1>,
          Field<T2>,
          Field<T3>,
          Field<T4>,
          Field<T5>,
          Field<T6>,
          Field<T7>,
          Field<T8>,
          Field<T9>,
          Field<T10>,
          Field<T11>,
          Field<T12>,
          Field<T13>,
          Field<T14>,
        ]
      | [
          Field<T1>,
          Field<T2>,
          Field<T3>,
          Field<T4>,
          Field<T5>,
          Field<T6>,
          Field<T7>,
          Field<T8>,
          Field<T9>,
          Field<T10>,
          Field<T11>,
          Field<T12>,
          Field<T13>,
          Field<T14>,
          Field<T15>,
        ]
      | [
          Field<T1>,
          Field<T2>,
          Field<T3>,
          Field<T4>,
          Field<T5>,
          Field<T6>,
          Field<T7>,
          Field<T8>,
          Field<T9>,
          Field<T10>,
          Field<T11>,
          Field<T12>,
          Field<T13>,
          Field<T14>,
          Field<T15>,
          Field<T16>,
        ]
      | [
          Field<T1>,
          Field<T2>,
          Field<T3>,
          Field<T4>,
          Field<T5>,
          Field<T6>,
          Field<T7>,
          Field<T8>,
          Field<T9>,
          Field<T10>,
          Field<T11>,
          Field<T12>,
          Field<T13>,
          Field<T14>,
          Field<T15>,
          Field<T16>,
          Field<T17>,
        ]
      | [
          Field<T1>,
          Field<T2>,
          Field<T3>,
          Field<T4>,
          Field<T5>,
          Field<T6>,
          Field<T7>,
          Field<T8>,
          Field<T9>,
          Field<T10>,
          Field<T11>,
          Field<T12>,
          Field<T13>,
          Field<T14>,
          Field<T15>,
          Field<T16>,
          Field<T17>,
          Field<T18>,
        ]
      | [
          Field<T1>,
          Field<T2>,
          Field<T3>,
          Field<T4>,
          Field<T5>,
          Field<T6>,
          Field<T7>,
          Field<T8>,
          Field<T9>,
          Field<T10>,
          Field<T11>,
          Field<T12>,
          Field<T13>,
          Field<T14>,
          Field<T15>,
          Field<T16>,
          Field<T17>,
          Field<T18>,
          Field<T19>,
        ]
      | [
          Field<T1>,
          Field<T2>,
          Field<T3>,
          Field<T4>,
          Field<T5>,
          Field<T6>,
          Field<T7>,
          Field<T8>,
          Field<T9>,
          Field<T10>,
          Field<T11>,
          Field<T12>,
          Field<T13>,
          Field<T14>,
          Field<T15>,
          Field<T16>,
          Field<T17>,
          Field<T18>,
          Field<T19>,
          Field<T20>,
        ]
      | [
          Field<T1>,
          Field<T2>,
          Field<T3>,
          Field<T4>,
          Field<T5>,
          Field<T6>,
          Field<T7>,
          Field<T8>,
          Field<T9>,
          Field<T10>,
          Field<T11>,
          Field<T12>,
          Field<T13>,
          Field<T14>,
          Field<T15>,
          Field<T16>,
          Field<T17>,
          Field<T18>,
          Field<T19>,
          Field<T20>,
          Field<T21>,
        ]
      | [
          Field<T1>,
          Field<T2>,
          Field<T3>,
          Field<T4>,
          Field<T5>,
          Field<T6>,
          Field<T7>,
          Field<T8>,
          Field<T9>,
          Field<T10>,
          Field<T11>,
          Field<T12>,
          Field<T13>,
          Field<T14>,
          Field<T15>,
          Field<T16>,
          Field<T17>,
          Field<T18>,
          Field<T19>,
          Field<T20>,
          Field<T21>,
          Field<T22>,
        ]
      | [
          Field<T1>,
          Field<T2>,
          Field<T3>,
          Field<T4>,
          Field<T5>,
          Field<T6>,
          Field<T7>,
          Field<T8>,
          Field<T9>,
          Field<T10>,
          Field<T11>,
          Field<T12>,
          Field<T13>,
          Field<T14>,
          Field<T15>,
          Field<T16>,
          Field<T17>,
          Field<T18>,
          Field<T19>,
          Field<T20>,
          Field<T21>,
          Field<T22>,
          Field<T23>,
        ]
      | [
          Field<T1>,
          Field<T2>,
          Field<T3>,
          Field<T4>,
          Field<T5>,
          Field<T6>,
          Field<T7>,
          Field<T8>,
          Field<T9>,
          Field<T10>,
          Field<T11>,
          Field<T12>,
          Field<T13>,
          Field<T14>,
          Field<T15>,
          Field<T16>,
          Field<T17>,
          Field<T18>,
          Field<T19>,
          Field<T20>,
          Field<T21>,
          Field<T22>,
          Field<T23>,
          Field<T24>,
        ]
      | [
          Field<T1>,
          Field<T2>,
          Field<T3>,
          Field<T4>,
          Field<T5>,
          Field<T6>,
          Field<T7>,
          Field<T8>,
          Field<T9>,
          Field<T10>,
          Field<T11>,
          Field<T12>,
          Field<T13>,
          Field<T14>,
          Field<T15>,
          Field<T16>,
          Field<T17>,
          Field<T18>,
          Field<T19>,
          Field<T20>,
          Field<T21>,
          Field<T22>,
          Field<T23>,
          Field<T24>,
          Field<T25>,
        ]
      | [
          Field<T1>,
          Field<T2>,
          Field<T3>,
          Field<T4>,
          Field<T5>,
          Field<T6>,
          Field<T7>,
          Field<T8>,
          Field<T9>,
          Field<T10>,
          Field<T11>,
          Field<T12>,
          Field<T13>,
          Field<T14>,
          Field<T15>,
          Field<T16>,
          Field<T17>,
          Field<T18>,
          Field<T19>,
          Field<T20>,
          Field<T21>,
          Field<T22>,
          Field<T23>,
          Field<T24>,
          Field<T25>,
          Field<T26>,
        ]
      | [
          Field<T1>,
          Field<T2>,
          Field<T3>,
          Field<T4>,
          Field<T5>,
          Field<T6>,
          Field<T7>,
          Field<T8>,
          Field<T9>,
          Field<T10>,
          Field<T11>,
          Field<T12>,
          Field<T13>,
          Field<T14>,
          Field<T15>,
          Field<T16>,
          Field<T17>,
          Field<T18>,
          Field<T19>,
          Field<T20>,
          Field<T21>,
          Field<T22>,
          Field<T23>,
          Field<T24>,
          Field<T25>,
          Field<T26>,
          Field<T27>,
        ]
      | [
          Field<T1>,
          Field<T2>,
          Field<T3>,
          Field<T4>,
          Field<T5>,
          Field<T6>,
          Field<T7>,
          Field<T8>,
          Field<T9>,
          Field<T10>,
          Field<T11>,
          Field<T12>,
          Field<T13>,
          Field<T14>,
          Field<T15>,
          Field<T16>,
          Field<T17>,
          Field<T18>,
          Field<T19>,
          Field<T20>,
          Field<T21>,
          Field<T22>,
          Field<T23>,
          Field<T24>,
          Field<T25>,
          Field<T26>,
          Field<T27>,
          Field<T28>,
        ]
      | [
          Field<T1>,
          Field<T2>,
          Field<T3>,
          Field<T4>,
          Field<T5>,
          Field<T6>,
          Field<T7>,
          Field<T8>,
          Field<T9>,
          Field<T10>,
          Field<T11>,
          Field<T12>,
          Field<T13>,
          Field<T14>,
          Field<T15>,
          Field<T16>,
          Field<T17>,
          Field<T18>,
          Field<T19>,
          Field<T20>,
          Field<T21>,
          Field<T22>,
          Field<T23>,
          Field<T24>,
          Field<T25>,
          Field<T26>,
          Field<T27>,
          Field<T28>,
          Field<T29>,
        ]
      | [
          Field<T1>,
          Field<T2>,
          Field<T3>,
          Field<T4>,
          Field<T5>,
          Field<T6>,
          Field<T7>,
          Field<T8>,
          Field<T9>,
          Field<T10>,
          Field<T11>,
          Field<T12>,
          Field<T13>,
          Field<T14>,
          Field<T15>,
          Field<T16>,
          Field<T17>,
          Field<T18>,
          Field<T19>,
          Field<T20>,
          Field<T21>,
          Field<T22>,
          Field<T23>,
          Field<T24>,
          Field<T25>,
          Field<T26>,
          Field<T27>,
          Field<T28>,
          Field<T29>,
          Field<T30>,
        ],
  ):
    | [Field<T1>]
    | [Field<T1>, Field<T2>]
    | [Field<T1>, Field<T2>, Field<T3>]
    | [Field<T1>, Field<T2>, Field<T3>, Field<T4>]
    | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>]
    | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>]
    | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>]
    | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>]
    | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>]
    | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>]
    | [
        Field<T1>,
        Field<T2>,
        Field<T3>,
        Field<T4>,
        Field<T5>,
        Field<T6>,
        Field<T7>,
        Field<T8>,
        Field<T9>,
        Field<T10>,
        Field<T11>,
      ]
    | [
        Field<T1>,
        Field<T2>,
        Field<T3>,
        Field<T4>,
        Field<T5>,
        Field<T6>,
        Field<T7>,
        Field<T8>,
        Field<T9>,
        Field<T10>,
        Field<T11>,
        Field<T12>,
      ]
    | [
        Field<T1>,
        Field<T2>,
        Field<T3>,
        Field<T4>,
        Field<T5>,
        Field<T6>,
        Field<T7>,
        Field<T8>,
        Field<T9>,
        Field<T10>,
        Field<T11>,
        Field<T12>,
        Field<T13>,
      ]
    | [
        Field<T1>,
        Field<T2>,
        Field<T3>,
        Field<T4>,
        Field<T5>,
        Field<T6>,
        Field<T7>,
        Field<T8>,
        Field<T9>,
        Field<T10>,
        Field<T11>,
        Field<T12>,
        Field<T13>,
        Field<T14>,
      ]
    | [
        Field<T1>,
        Field<T2>,
        Field<T3>,
        Field<T4>,
        Field<T5>,
        Field<T6>,
        Field<T7>,
        Field<T8>,
        Field<T9>,
        Field<T10>,
        Field<T11>,
        Field<T12>,
        Field<T13>,
        Field<T14>,
        Field<T15>,
      ]
    | [
        Field<T1>,
        Field<T2>,
        Field<T3>,
        Field<T4>,
        Field<T5>,
        Field<T6>,
        Field<T7>,
        Field<T8>,
        Field<T9>,
        Field<T10>,
        Field<T11>,
        Field<T12>,
        Field<T13>,
        Field<T14>,
        Field<T15>,
        Field<T16>,
      ]
    | [
        Field<T1>,
        Field<T2>,
        Field<T3>,
        Field<T4>,
        Field<T5>,
        Field<T6>,
        Field<T7>,
        Field<T8>,
        Field<T9>,
        Field<T10>,
        Field<T11>,
        Field<T12>,
        Field<T13>,
        Field<T14>,
        Field<T15>,
        Field<T16>,
        Field<T17>,
      ]
    | [
        Field<T1>,
        Field<T2>,
        Field<T3>,
        Field<T4>,
        Field<T5>,
        Field<T6>,
        Field<T7>,
        Field<T8>,
        Field<T9>,
        Field<T10>,
        Field<T11>,
        Field<T12>,
        Field<T13>,
        Field<T14>,
        Field<T15>,
        Field<T16>,
        Field<T17>,
        Field<T18>,
      ]
    | [
        Field<T1>,
        Field<T2>,
        Field<T3>,
        Field<T4>,
        Field<T5>,
        Field<T6>,
        Field<T7>,
        Field<T8>,
        Field<T9>,
        Field<T10>,
        Field<T11>,
        Field<T12>,
        Field<T13>,
        Field<T14>,
        Field<T15>,
        Field<T16>,
        Field<T17>,
        Field<T18>,
        Field<T19>,
      ]
    | [
        Field<T1>,
        Field<T2>,
        Field<T3>,
        Field<T4>,
        Field<T5>,
        Field<T6>,
        Field<T7>,
        Field<T8>,
        Field<T9>,
        Field<T10>,
        Field<T11>,
        Field<T12>,
        Field<T13>,
        Field<T14>,
        Field<T15>,
        Field<T16>,
        Field<T17>,
        Field<T18>,
        Field<T19>,
        Field<T20>,
      ]
    | [
        Field<T1>,
        Field<T2>,
        Field<T3>,
        Field<T4>,
        Field<T5>,
        Field<T6>,
        Field<T7>,
        Field<T8>,
        Field<T9>,
        Field<T10>,
        Field<T11>,
        Field<T12>,
        Field<T13>,
        Field<T14>,
        Field<T15>,
        Field<T16>,
        Field<T17>,
        Field<T18>,
        Field<T19>,
        Field<T20>,
        Field<T21>,
      ]
    | [
        Field<T1>,
        Field<T2>,
        Field<T3>,
        Field<T4>,
        Field<T5>,
        Field<T6>,
        Field<T7>,
        Field<T8>,
        Field<T9>,
        Field<T10>,
        Field<T11>,
        Field<T12>,
        Field<T13>,
        Field<T14>,
        Field<T15>,
        Field<T16>,
        Field<T17>,
        Field<T18>,
        Field<T19>,
        Field<T20>,
        Field<T21>,
        Field<T22>,
      ]
    | [
        Field<T1>,
        Field<T2>,
        Field<T3>,
        Field<T4>,
        Field<T5>,
        Field<T6>,
        Field<T7>,
        Field<T8>,
        Field<T9>,
        Field<T10>,
        Field<T11>,
        Field<T12>,
        Field<T13>,
        Field<T14>,
        Field<T15>,
        Field<T16>,
        Field<T17>,
        Field<T18>,
        Field<T19>,
        Field<T20>,
        Field<T21>,
        Field<T22>,
        Field<T23>,
      ]
    | [
        Field<T1>,
        Field<T2>,
        Field<T3>,
        Field<T4>,
        Field<T5>,
        Field<T6>,
        Field<T7>,
        Field<T8>,
        Field<T9>,
        Field<T10>,
        Field<T11>,
        Field<T12>,
        Field<T13>,
        Field<T14>,
        Field<T15>,
        Field<T16>,
        Field<T17>,
        Field<T18>,
        Field<T19>,
        Field<T20>,
        Field<T21>,
        Field<T22>,
        Field<T23>,
        Field<T24>,
      ]
    | [
        Field<T1>,
        Field<T2>,
        Field<T3>,
        Field<T4>,
        Field<T5>,
        Field<T6>,
        Field<T7>,
        Field<T8>,
        Field<T9>,
        Field<T10>,
        Field<T11>,
        Field<T12>,
        Field<T13>,
        Field<T14>,
        Field<T15>,
        Field<T16>,
        Field<T17>,
        Field<T18>,
        Field<T19>,
        Field<T20>,
        Field<T21>,
        Field<T22>,
        Field<T23>,
        Field<T24>,
        Field<T25>,
      ]
    | [
        Field<T1>,
        Field<T2>,
        Field<T3>,
        Field<T4>,
        Field<T5>,
        Field<T6>,
        Field<T7>,
        Field<T8>,
        Field<T9>,
        Field<T10>,
        Field<T11>,
        Field<T12>,
        Field<T13>,
        Field<T14>,
        Field<T15>,
        Field<T16>,
        Field<T17>,
        Field<T18>,
        Field<T19>,
        Field<T20>,
        Field<T21>,
        Field<T22>,
        Field<T23>,
        Field<T24>,
        Field<T25>,
        Field<T26>,
      ]
    | [
        Field<T1>,
        Field<T2>,
        Field<T3>,
        Field<T4>,
        Field<T5>,
        Field<T6>,
        Field<T7>,
        Field<T8>,
        Field<T9>,
        Field<T10>,
        Field<T11>,
        Field<T12>,
        Field<T13>,
        Field<T14>,
        Field<T15>,
        Field<T16>,
        Field<T17>,
        Field<T18>,
        Field<T19>,
        Field<T20>,
        Field<T21>,
        Field<T22>,
        Field<T23>,
        Field<T24>,
        Field<T25>,
        Field<T26>,
        Field<T27>,
      ]
    | [
        Field<T1>,
        Field<T2>,
        Field<T3>,
        Field<T4>,
        Field<T5>,
        Field<T6>,
        Field<T7>,
        Field<T8>,
        Field<T9>,
        Field<T10>,
        Field<T11>,
        Field<T12>,
        Field<T13>,
        Field<T14>,
        Field<T15>,
        Field<T16>,
        Field<T17>,
        Field<T18>,
        Field<T19>,
        Field<T20>,
        Field<T21>,
        Field<T22>,
        Field<T23>,
        Field<T24>,
        Field<T25>,
        Field<T26>,
        Field<T27>,
        Field<T28>,
      ]
    | [
        Field<T1>,
        Field<T2>,
        Field<T3>,
        Field<T4>,
        Field<T5>,
        Field<T6>,
        Field<T7>,
        Field<T8>,
        Field<T9>,
        Field<T10>,
        Field<T11>,
        Field<T12>,
        Field<T13>,
        Field<T14>,
        Field<T15>,
        Field<T16>,
        Field<T17>,
        Field<T18>,
        Field<T19>,
        Field<T20>,
        Field<T21>,
        Field<T22>,
        Field<T23>,
        Field<T24>,
        Field<T25>,
        Field<T26>,
        Field<T27>,
        Field<T28>,
        Field<T29>,
      ]
    | [
        Field<T1>,
        Field<T2>,
        Field<T3>,
        Field<T4>,
        Field<T5>,
        Field<T6>,
        Field<T7>,
        Field<T8>,
        Field<T9>,
        Field<T10>,
        Field<T11>,
        Field<T12>,
        Field<T13>,
        Field<T14>,
        Field<T15>,
        Field<T16>,
        Field<T17>,
        Field<T18>,
        Field<T19>,
        Field<T20>,
        Field<T21>,
        Field<T22>,
        Field<T23>,
        Field<T24>,
        Field<T25>,
        Field<T26>,
        Field<T27>,
        Field<T28>,
        Field<T29>,
        Field<T30>,
      ];
}

export interface SchemaField {
  name: string;
  title?: string;
  default?: unknown;
  'x-decorator'?: string;
  'x-component'?: string;
  'x-component-props'?: Obj; // TODO
}

// export interface FormRef {
//   formStep?: IFormStep;
// }
