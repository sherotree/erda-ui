import * as React from 'react';
import { Select } from 'core/nusi';
import { isEmpty, map } from 'lodash';
import i18n from 'i18n';
import gatewayStore from 'msp/stores/gateway';

const { Option } = Select;

interface IProps {
  updateField: Function;
  dataSource: { diceApp: string; diceService: string };
}

export const AppServiceFilter = ({ updateField, dataSource }: IProps) => {
  const registerApps = gatewayStore.useStore((s) => s.registerApps);
  const [appList, setAppList] = React.useState([] as any[]);
  const [serviceList, setServiceList] = React.useState([] as any[]);
  const { diceApp, diceService } = dataSource;

  React.useEffect(() => {
    !isEmpty(registerApps) && setAppList(registerApps.map((app) => app.name));
  }, [registerApps]);

  const onAppChange = (appName: string) => {
    const targetApp = registerApps.find((rApp) => rApp.name === appName);
    setServiceList(targetApp.services);
    updateField({ diceApp: appName, diceService: targetApp.services[0] });
  };

  const onServiceChange = (serviceName: string) => {
    updateField({ diceService: serviceName });
  };

  return (
    <>
      <Select
        showSearch
        placeholder={i18n.t('msp:application')}
        value={diceApp}
        onChange={onAppChange}
        className="filter-select mr-4"
      >
        {map(appList, (appName, key) => (
          <Option key={key} value={appName}>
            {appName}
          </Option>
        ))}
      </Select>
      <Select
        showSearch
        placeholder={i18n.t('msp:owned service')}
        value={diceService}
        onChange={onServiceChange}
        className="filter-select mr-4"
      >
        {map(serviceList, (serviceName, key) => (
          <Option key={key} value={serviceName}>
            {serviceName}
          </Option>
        ))}
      </Select>
    </>
  );
};
