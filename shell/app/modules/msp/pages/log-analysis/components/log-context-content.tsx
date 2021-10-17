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
import { Down as IconDown, Right as IconRight } from '@icon-park/react';
import './log-context.scss';

export const LogContextContent = ({ content }) => {
  const [isExpand, setIsExpand] = React.useState(false);
  const isFoldContent = String(content).length > 1000;
  const value = isFoldContent && !isExpand ? `${String(content).slice(0, 1000)} ...` : content;
  return (
    <span>
      {isFoldContent && (
        <span className="absolute -left-5">
          {isExpand ? (
            <>
              <IconDown
                className="cursor-pointer"
                theme="outline"
                size="14"
                fill="currentColor"
                onClick={() => {
                  setIsExpand(false);
                }}
              />
            </>
          ) : (
            <IconRight
              className="cursor-pointer"
              theme="outline"
              size="14"
              fill="#333"
              onClick={() => {
                setIsExpand(true);
              }}
            />
          )}
        </span>
      )}
      {value}
    </span>
  );
};
