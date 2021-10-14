import { ColumnProps } from 'core/common/interface';
import routeInfoStore from 'core/stores/route';
import { Holder, SearchTable, Icon as CustomIcon } from 'common';
import i18n from 'i18n';
import { filter, isEmpty, map } from 'lodash';
import { Table, Tooltip } from 'core/nusi';
import * as React from 'react';
import { useUnmount } from 'react-use';
import zkproxyStore from '../../stores/zkproxy';
import './zkproxy-list.scss';
import mspStore from 'msp/stores/micro-service';
import { PAGINATION } from 'app/constants';
import { goTo } from 'common/utils';

const ZkproxyList = () => {
  const [zkInterfaceList] = zkproxyStore.useStore((s) => [s.zkInterfaceList]);
  const [currentRoute, routeParams] = routeInfoStore.useStore((s) => [s.currentRoute, s.params]);
  const { env: workspace, projectId: projectID } = routeParams;
  const { getZkInterfaceList, getServiceByIp } = zkproxyStore.effects;
  const { setZkInterfaceConfig, clearZkproxyInterfaceList } = zkproxyStore.reducers;

  const [dataSource, setDataSource] = React.useState(zkInterfaceList);
  const az = mspStore.getState((s) => s.clusterName);

  useUnmount(() => {
    clearZkproxyInterfaceList();
  });

  React.useEffect(() => {
    setDataSource(zkInterfaceList);
    return () => {
      setZkInterfaceConfig({});
    };
  }, [setZkInterfaceConfig, zkInterfaceList]);

  React.useEffect(() => {
    if (az) {
      getZkInterfaceList({ az, runtimeId: currentRoute.routeQuery ? currentRoute.routeQuery.runtimeId : undefined });
    }
  }, [az, currentRoute.routeQuery, getZkInterfaceList]);

  const onSearch = (searchKey: string) => {
    const filterList = filter(zkInterfaceList, (item) =>
      item.interfacename.toLowerCase().includes(searchKey.toLowerCase()),
    );
    setDataSource(filterList);
  };

  const jumpToServicePage = (ip: string) => {
    getServiceByIp({ projectID, workspace, ip }).then((res: MS_ZK.IServiceQueryData) => {
      const { appID: appId, runtimeID: runtimeId, serviceName } = res;
      goTo(goTo.pages.runtimeDetail, { jumpOut: true, projectId: projectID, appId, runtimeId, serviceName });
    });
  };

  const columns: Array<ColumnProps<MS_ZK.IZkproxy>> = [
    {
      title: i18n.t('msp:interface name'),
      dataIndex: 'interfacename',
    },
    {
      title: i18n.t('msp:supplier list'),
      dataIndex: 'providerlist',
      render: (val) =>
        val
          ? map(val, (item, i) => (
              <div key={`${i}${item}`}>
                {item}
                <Tooltip title={i18n.t('deployment details')}>
                  <CustomIcon
                    className="operate-icon hover-active ml-2"
                    type="link"
                    onClick={() => jumpToServicePage(item)}
                  />
                </Tooltip>
              </div>
            ))
          : '',
    },
    {
      title: i18n.t('msp:consumer list'),
      dataIndex: 'consumerlist',
      render: (val) =>
        val
          ? map(val, (item, i) => (
              <div key={`${i}${item}`}>
                {item}
                <Tooltip title={i18n.t('deployment details')}>
                  <CustomIcon className="operate-icon ml-2" type="link" onClick={() => jumpToServicePage(item)} />
                </Tooltip>
              </div>
            ))
          : '',
    },
  ];

  return (
    <Holder when={isEmpty(zkInterfaceList)}>
      <SearchTable onSearch={onSearch} placeholder={i18n.t('msp:search by name')}>
        <Table
          className="zkproxy-list"
          columns={columns}
          dataSource={dataSource}
          rowKey="interfacename"
          pagination={{
            pageSize: PAGINATION.pageSize,
          }}
          scroll={{ x: '100%' }}
        />
      </SearchTable>
    </Holder>
  );
};

export default ZkproxyList;
