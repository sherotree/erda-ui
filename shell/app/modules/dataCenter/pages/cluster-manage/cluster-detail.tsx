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

import * as React from 'react';
import { Spin } from 'app/nusi';
import { get, map, isEmpty } from 'lodash';
import i18n from 'i18n';
import { KeyValueList, EmptyHolder } from 'common';
import { useLoading } from 'app/common/stores/loading';
import routeInfoStore from 'app/common/stores/route';
import clusterStore from '../../stores/cluster';

import './cluster-detail.scss';

const ClusterDetail = () => {
  const { params } = routeInfoStore.getState((s) => s);
  const { clusterName } = params;
  const { getClusterNewDetail } = clusterStore.effects;
  const [loading] = useLoading(clusterStore, ['getClusterNewDetail']);
  const [detail, setDetail] = React.useState({} as any);

  React.useEffect(() => {
    clusterName && getClusterNewDetail({ clusterName }).then((res: any) => {
      const { URLs: urls = {}, basic } = get(res, '[0]', {});

      const basicInfo = {};
      map(basic, ({ name, value }: any) => { basicInfo[name] = value; });
      const URLs = {};
      map(urls, ({ name, value }: any) => { URLs[name] = value; });
      const data = {} as any;
      !isEmpty(basicInfo) && (data[`${i18n.t('basic information')}`] = basicInfo);
      !isEmpty(URLs) && (data.URLs = URLs);

      setDetail({ ...data });
    });
  }, [clusterName, getClusterNewDetail]);

  return (
    <div className="cluster-detail">
      <Spin spinning={loading}>
        {
          !isEmpty(detail) ? (
            <KeyValueList data={detail} />
          ) : (
            <EmptyHolder relative />
          )
        }
      </Spin>
    </div>
  );
};

export default ClusterDetail;
