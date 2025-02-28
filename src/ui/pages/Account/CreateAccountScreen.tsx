import { Button, Input, message } from 'antd';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import CHeader from '@/ui/components/CHeader';
import { useSetCurrentAccountCallback } from '@/ui/state/accounts/hooks';
import { useCurrentKeyring } from '@/ui/state/keyrings/hooks';
import { useWallet } from '@/ui/utils';

import { useNavigate } from '../MainRoute';

export default function CreateAccountScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const wallet = useWallet();
  const setCurrentAccount = useSetCurrentAccountCallback();
  const currentKeyring = useCurrentKeyring();
  const [alianName, setAlianName] = useState('');
  const [defaultName, setDefaultName] = useState('');
  const handleOnClick = async () => {
    await wallet.deriveNewAccountFromMnemonic(currentKeyring, alianName || defaultName);
    message.success({
      content: t('Successfully created')
    });
    const currentAccount = await wallet.getCurrentAccount();
    setCurrentAccount(currentAccount);
    navigate('MainScreen');
  };

  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ('Enter' == e.key) {
      handleOnClick();
    }
  };

  const init = async () => {
    const accountName = await wallet.getNextAlianName(currentKeyring);
    setDefaultName(accountName);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <Layout className="h-full">
      <CHeader
        onBack={() => {
          window.history.go(-1);
        }}
        title="New account"
      />
      <Content style={{ backgroundColor: '#1C1919' }}>
        <div className="flex flex-col items-strech mx-5 mt-5 gap-3_75 justify-evenly">
          <Input
            className="font-semibold text-white mt-1_25 h-15_5 box default focus:active"
            placeholder={defaultName}
            onChange={(e) => {
              setAlianName(e.target.value);
            }}
            onKeyUp={(e) => handleOnKeyUp(e)}
            autoFocus={true}
          />
          <Button
            size="large"
            type="primary"
            className="box"
            onClick={(e) => {
              handleOnClick();
            }}>
            <div className="flex items-center justify-center text-lg font-semibold">{t('Create a Account')}</div>
          </Button>
        </div>
      </Content>
    </Layout>
  );
}
