import * as React from 'react';
import { Popover, Button, Tooltip } from 'core/nusi';
import { Copy } from 'common';
import i18n from 'i18n';

interface IProps {
  innerAddr: string;
  innerTips: string;
  outerAddr: string;
}

export const DomainChecker = ({ innerAddr, innerTips, outerAddr }: IProps) => {
  return (
    <Popover
      title={<h2 className="domain-title">{i18n.t('msp:domain information')}</h2>}
      trigger="click"
      placement="bottomRight"
      content={
        <div className="domain-content">
          <div className="mb-2 domain-addr">
            {i18n.t('msp:external network address')}
            <Copy className="cursor-copy" data-clipboard-tip={i18n.t('msp:external network address')}>
              : {outerAddr}
            </Copy>
          </div>
          <Tooltip title={innerTips}>
            <div className="domain-addr">
              {i18n.t('msp:internal network address')}
              <Copy className="cursor-copy" data-clipboard-tip={i18n.t('msp:internal network address')}>
                : {innerAddr}
              </Copy>
            </div>
          </Tooltip>
        </div>
      }
    >
      <Button ghost type="primary">
        {i18n.t('msp:view cluster domain name')}
      </Button>
    </Popover>
  );
};
