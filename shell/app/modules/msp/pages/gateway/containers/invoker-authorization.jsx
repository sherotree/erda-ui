import Comp from '../components/invoker-authorization';
import { connectCube } from 'common';
import gatewayStore from 'msp/stores/gateway';
import { useLoading } from 'core/stores/loading';

const mapper = () => {
  const [
    consumer,
    apiList,
    needAuthApiList,
    needAuthApiPaging,
    consumerList,
    trafficControlPolicy,
    authData,
    authConsumer,
  ] = gatewayStore.useStore((s) => [
    s.consumer,
    s.apiList,
    s.needAuthApiList,
    s.needAuthApiListPaging,
    s.consumerList,
    s.trafficControlPolicy,
    s.authData,
    s.authConsumer,
  ]);
  const {
    getConsumer,
    createConsumer,
    getConsumerList,
    updateConsumerDetail,
    getAPIList,
    getNeedAuthAPIList,
    saveConsumerApi,
    getPolicyList,
    saveConsumerApiPolicy,
    deleteConsumer,
    getConsumerDetail,
  } = gatewayStore.effects;
  const wrapper =
    (fun, payload) =>
    (params = {}) => {
      return fun({ ...payload, ...params });
    };
  const [isFetching, isFetchingNeedAuthAPIList] = useLoading(gatewayStore, ['getConsumerList', 'getNeedAuthAPIList']);
  return {
    consumer,
    apiList,
    needAuthApiList,
    needAuthApiPaging,
    consumerList,
    trafficControlPolicy,
    authData,
    authConsumer,
    isFetchingNeedAuthAPIList,
    isFetching,
    getConsumer,
    createConsumer,
    getConsumerList,
    updateConsumerDetail,
    getAPIList,
    getNeedAuthAPIList,
    saveConsumerApi,
    getPolicyList: wrapper(getPolicyList, { category: 'trafficControl' }),
    saveConsumerApiPolicy,
    deleteConsumer,
    getConsumerDetail,
  };
};

export default connectCube(Comp, mapper);
