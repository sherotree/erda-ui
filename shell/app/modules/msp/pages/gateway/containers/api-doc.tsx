import React, { useEffect } from 'react';
import { Spin, Drawer } from 'core/nusi';
import { cloneDeep, map, isEmpty } from 'lodash';
import SwaggerParser from 'swagger-parser';
import { useUpdate } from 'common';
import ApiView from './api-view';
import './api-auth.scss';

interface IProps {
  data: Record<string, any>;
  visible: boolean;
  onClose: () => void;
}
const ApiDoc = (props: IProps) => {
  const { visible, data, onClose } = props;
  const [state, updater] = useUpdate({
    loading: false,
    apis: {},
  });
  useEffect(() => {
    if (visible) {
      updater.loading(true);
      SwaggerParser.dereference(data, {}, (err: any, api: any) => {
        if (!err) {
          const { paths = [] } = api;
          const apiMap: any[] = [];
          map(paths, (methodMap, path) => {
            map(methodMap, (apiProp, method) => {
              const item = {
                _key: method + path,
                _method: method,
                _path: path,
                ...apiProp,
              };
              apiMap.push(item);
            });
          });
          updater.apis(cloneDeep(apiMap[0] || {}));
        }
        updater.loading(false);
      });
    }
  }, [data, updater, visible]);

  const handleClose = () => {
    onClose();
  };

  return (
    <Drawer visible={visible} onClose={handleClose} width={700}>
      <Spin spinning={state.loading}>{isEmpty(state.apis) ? null : <ApiView api={state.apis} />}</Spin>
    </Drawer>
  );
};

export default ApiDoc;
