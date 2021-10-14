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
import { colorMap } from 'app/charts/theme';

export enum LOGIC_OPERATOR {
  AND = 'AND',
  OR = 'OR',
}

export const TagColorMap = {
  0: colorMap.blue,
  1: colorMap.darkcyan,
  2: colorMap.yellow,
  3: colorMap.green,
  4: colorMap.orange,
  5: colorMap.purple,
  6: colorMap.lightgreen,
  default: colorMap.gray,
};
