import React from 'react';
import { Modal, Table, Spin, Tooltip, Ellipsis } from 'core/nusi';
import { TraceGraph } from './trace-graph';

export default function NewTraceDetail(props) {
  const { isTraceDetailContentFetching, traceDetailContent } = props;
  return (
    <Spin spinning={isTraceDetailContentFetching}>
      <TraceGraph dataSource={traceDetailContent.spans} />
    </Spin>
  );
}
