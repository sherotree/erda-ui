import React, { useEffect } from 'react';
import { Button, Spin, Drawer, Table } from 'core/nusi';
import { ColumnProps } from 'core/common/interface';
import i18n from 'i18n';
import { useLoading } from 'core/stores/loading';
import gatewayStore from 'msp/stores/gateway';
import routeInfoStore from 'core/stores/route';
import './api-auth.scss';

interface IProps {
  apiId: string;
  visible: boolean;
  onClose: () => void;
}
const ApiAuth = (props: IProps) => {
  const { visible, apiId, onClose } = props;
  const { packageId } = routeInfoStore.useStore((s) => s.params);
  const [authDataTouched, setAuthDataTouched] = React.useState(false);
  const [authInfoList, authInfoSelected] = gatewayStore.useStore((s) => [s.authInfoList, s.authInfoSelected]);
  const [isFetchInfo, isUpdateInfo] = useLoading(gatewayStore, ['getAuthinfo', 'updateAuthinfo']);
  const isloading = isFetchInfo || isUpdateInfo;
  useEffect(() => {
    if (visible) {
      gatewayStore.effects.getAuthinfo({ apiId, packageId });
    } else {
      gatewayStore.reducers.updateAuthInfoSelected([]);
    }
  }, [apiId, packageId, visible]);

  const column: Array<ColumnProps<any>> = [
    {
      title: i18n.t('msp:caller name'),
      dataIndex: 'name',
    },
    {
      title: i18n.t('msp:caller description'),
      dataIndex: 'description',
    },
  ];
  const handleClose = () => {
    setAuthDataTouched(false);
    onClose();
  };

  const handleChangeSelected = (selectedRowKeys: string[] | number[]) => {
    gatewayStore.reducers.updateAuthInfoSelected(selectedRowKeys);
    setAuthDataTouched(true);
  };

  const handleAuth = () => {
    gatewayStore.effects.updateAuthinfo({ apiId, packageId, consumers: authInfoSelected }).then((res) => {
      if (res) {
        onClose();
        gatewayStore.reducers.updateAuthInfoSelected([]);
        gatewayStore.reducers.updateAuthInfoList([]);
      }
    });
  };
  return (
    <Drawer visible={visible} onClose={handleClose} className={'api-auth-drawer'} width={600}>
      <Spin spinning={isloading}>
        <p className="api-auth-drawer_title">{i18n.t('msp:caller authorization')}</p>
        <Button disabled={!authDataTouched} type="primary" className="mb-4" onClick={handleAuth}>
          {i18n.t('msp:confirm authorization')}
        </Button>
        <Table
          rowKey="id"
          rowSelection={{
            selectedRowKeys: authInfoSelected,
            onChange: handleChangeSelected,
          }}
          dataSource={authInfoList}
          columns={column}
          pagination={false}
          scroll={{ x: '100%' }}
        />
      </Spin>
    </Drawer>
  );
};

export default ApiAuth;
