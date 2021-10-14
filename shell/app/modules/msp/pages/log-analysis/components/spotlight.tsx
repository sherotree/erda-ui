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

interface IProps {
  target?: DOMRect;
  onVisibleChange: (visible: boolean) => void;
  visible: boolean;
}

const Spotlight = (props: IProps) => {
  const { target, onVisibleChange } = props;
  const [visible, setVisible] = React.useState(false);
  const position = React.useMemo(() => {
    if (target) {
      const winWidth = document.body.clientWidth;
      const winHeight = document.body.clientHeight;
      const { width, height, left, top } = target;
      const topLeft = {
        top: 0,
        right: winWidth - left - width,
        bottom: winHeight - top,
        left: 0,
      };
      const bottomLeft = {
        top,
        right: winWidth - left,
        bottom: 0,
        left: 0,
      };
      const topRight = {
        top: 0,
        right: 0,
        bottom: winHeight - top - height,
        left: left + width,
      };
      const bottomRight = {
        top: top + height,
        right: 0,
        bottom: 0,
        left,
      };
      return [topLeft, bottomLeft, topRight, bottomRight];
    }
    return [];
  }, [target]);
  const handleClick = React.useCallback(() => {
    if (!('visible' in props)) {
      setVisible(!visible);
    }
    onVisibleChange(!(props.visible ?? visible));
  }, [visible, onVisibleChange, props]);
  return (
    <>
      {position.map((item, index) => {
        return (
          <div
            key={index}
            hidden={!(props.visible ?? visible)}
            onClick={handleClick}
            className="fixed bg-mask"
            style={{ ...item, zIndex: 100 }}
          />
        );
      })}
    </>
  );
};

export default Spotlight;
