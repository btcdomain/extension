import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useCallback, useEffect, useRef } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { useNavigate as useNavigateOrigin } from 'react-router-dom';

import { LoadingOutlined } from '@ant-design/icons';

import { accountActions } from '../state/accounts/reducer';
import { useIsReady, useIsUnlocked } from '../state/global/hooks';
import { globalActions } from '../state/global/reducer';
import { useAppDispatch } from '../state/hooks';
import { settingsActions } from '../state/settings/reducer';
import { useWallet } from '../utils';
import AddKeyringScreen from './Account/AddKeyringScreen';
import CreateAccountScreen from './Account/CreateAccountScreen';
import CreateHDWalletScreen from './Account/CreateHDWalletScreen';
import CreatePasswordScreen from './Account/CreatePasswordScreen';
import CreateSimpleWalletScreen from './Account/CreateSimpleWalletScreen';
import SwitchAccountScreen from './Account/SwitchAccountScreen';
import SwitchAddressScreen from './Account/SwitchAddressScreen';
import SwitchKeyringScreen from './Account/SwitchKeyringScreen';
import UnlockScreen from './Account/UnlockScreen';
import ApprovalScreen from './Approval/ApprovalScreen';
import ConnectedSitesScreen from './Approval/ConnectedSitesScreen';
import BoostScreen from './Main/BoostScreen';
import MainScreen from './Main/TabScreen';
import WelcomeScreen from './Main/WelcomeScreen';
import AddressTypeScreen from './Settings/AddressTypeScreen';
import ChangeLanguageScreen from './Settings/ChangeLanguageScreen';
import ChangePasswordScreen from './Settings/ChangePasswordScreen';
import EditWalletNameScreen from './Settings/EditWalletNameScreen';
import ExportMnemonicsScreen from './Settings/ExportMnemonicsScreen';
import ExportPrivateKeyScreen from './Settings/ExportPrivateKeyScreen';
import ManageWalletScreen from './Settings/ManageWalletScreen';
import NetworkTypeScreen from './Settings/NetworkTypeScreen';
import RemoveAccount from './Settings/RemoveAccountScreen';
import RemoveWalletScreen from './Settings/RemoveWalletScreen';
import UpgradeNoticeScreen from './Settings/UpgradeNoticeScreen';
import HistoryScreen from './Wallet/HistoryScreen';
import OrdinalsDetailScreen from './Wallet/OrdinalsDetailScreen';
import OrdinalsTxConfirmScreen from './Wallet/OrdinalsTxConfirmScreen';
import OrdinalsTxCreateScreen from './Wallet/OrdinalsTxCreateScreen';
import ReceiveScreen from './Wallet/ReceiveScreen';
import TxConfirmScreen from './Wallet/TxConfirmScreen';
import TxCreateScreen from './Wallet/TxCreateScreen';
import TxFailScreen from './Wallet/TxFailScreen';
import TxSuccessScreen from './Wallet/TxSuccessScreen';
import './index.module.less';

const routes = {
  BoostScreen: {
    path: '/',
    element: <BoostScreen />
  },
  WelcomeScreen: {
    path: '/welcome',
    element: <WelcomeScreen />
  },
  MainScreen: {
    path: '/main',
    element: <MainScreen />
  },
  CreateHDWalletScreen: {
    path: '/account/create-hd-wallet',
    element: <CreateHDWalletScreen />
  },
  CreateAccountScreen: {
    path: '/account/create',
    element: <CreateAccountScreen />
  },
  CreatePasswordScreen: {
    path: '/account/create-password',
    element: <CreatePasswordScreen />
  },
  UnlockScreen: {
    path: '/account/unlock',
    element: <UnlockScreen />
  },
  SwitchAccountScreen: {
    path: '/account/switch-account',
    element: <SwitchAccountScreen />
  },
  SwitchAddressScreen: {
    path: '/account/switch-address',
    element: <SwitchAddressScreen />
  },
  ReceiveScreen: {
    path: '/wallet/receive',
    element: <ReceiveScreen />
  },

  TxCreateScreen: {
    path: '/wallet/tx/create',
    element: <TxCreateScreen />
  },
  TxConfirmScreen: {
    path: '/wallet/tx/confirm',
    element: <TxConfirmScreen />
  },
  TxSuccessScreen: {
    path: '/wallet/tx/success',
    element: <TxSuccessScreen />
  },
  TxFailScreen: {
    path: '/wallet/tx/fail',
    element: <TxFailScreen />
  },

  OrdinalsDetailScreen: {
    path: '/wallet/ordinals-detail',
    element: <OrdinalsDetailScreen />
  },

  OrdinalsTxCreateScreen: {
    path: '/wallet/ordinals-tx/create',
    element: <OrdinalsTxCreateScreen />
  },

  OrdinalsTxConfirmScreen: {
    path: '/wallet/ordinals-tx/confirm',
    element: <OrdinalsTxConfirmScreen />
  },
  NetworkTypeScreen: {
    path: '/settings/network-type',
    element: <NetworkTypeScreen />
  },
  ChangeLanguageScreen: {
    path: '/settings/language',
    element: <ChangeLanguageScreen />
  },
  ChangePasswordScreen: {
    path: '/settings/password',
    element: <ChangePasswordScreen />
  },
  ExportMnemonicsScreen: {
    path: '/settings/export-mnemonics',
    element: <ExportMnemonicsScreen />
  },
  ExportPrivateKeyScreen: {
    path: '/settings/export-privatekey',
    element: <ExportPrivateKeyScreen />
  },
  RemoveAccount: {
    path: '/settings/remove-account',
    element: <RemoveAccount />
  },
  HistoryScreen: {
    path: '/wallet/history',
    element: <HistoryScreen />
  },
  ApprovalScreen: {
    path: '/approval',
    element: <ApprovalScreen />
  },
  ConnectedSitesScreen: {
    path: '/connected-sites',
    element: <ConnectedSitesScreen />
  },
  SwitchKeyringScreen: {
    path: '/account/switch-keyring',
    element: <SwitchKeyringScreen />
  },
  AddKeyringScreen: {
    path: '/account/add-keyring',
    element: <AddKeyringScreen />
  },
  ManageWalletScreen: {
    path: '/settings/manage-wallet',
    element: <ManageWalletScreen />
  },
  EditWalletNameScreen: {
    path: '/settings/edit-wallet-name',
    element: <EditWalletNameScreen />
  },
  RemoveWalletScreen: {
    path: '/settings/remove-wallet',
    element: <RemoveWalletScreen />
  },
  CreateSimpleWalletScreen: {
    path: '/account/create-simple-wallet',
    element: <CreateSimpleWalletScreen />
  },
  UpgradeNoticeScreen: {
    path: '/settings/upgrade-notice',
    element: <UpgradeNoticeScreen />
  },
  AddressTypeScreen: {
    path: '/settings/address-type',
    element: <AddressTypeScreen />
  }
};

type RouteTypes = keyof typeof routes;

export function useNavigate() {
  const navigate = useNavigateOrigin();
  return useCallback(
    (routKey: RouteTypes, state?: any) => {
      navigate(routes[routKey].path, { state });
    },
    [useNavigateOrigin]
  );
}

const Main = () => {
  const wallet = useWallet();
  const dispatch = useAppDispatch();

  const isReady = useIsReady();
  const isUnlocked = useIsUnlocked();

  const selfRef = useRef({
    settingsLoaded: false,
    summaryLoaded: false,
    accountLoaded: false
  });
  const self = selfRef.current;
  const init = useCallback(async () => {
    if (!self.accountLoaded) {
      const currentAccount = await wallet.getCurrentAccount();
      dispatch(accountActions.setCurrent(currentAccount));

      const accounts = await wallet.getAccounts();
      dispatch(accountActions.setAccounts(accounts));

      if (accounts.length > 0) {
        self.accountLoaded = true;
      }
    }

    if (!self.settingsLoaded) {
      const networkType = await wallet.getNetworkType();
      dispatch(
        settingsActions.updateSettings({
          networkType
        })
      );

      const addressType = await wallet.getAddressType();
      dispatch(
        settingsActions.updateSettings({
          addressType
        })
      );

      const _locale = await wallet.getLocale();
      dispatch(settingsActions.updateSettings({ locale: _locale }));
      self.settingsLoaded = true;
    }

    if (!self.summaryLoaded) {
      wallet.getInscriptionSummary().then((data) => {
        dispatch(accountActions.setInscriptionSummary(data));
      });

      wallet.getAppSummary().then((data) => {
        dispatch(accountActions.setAppSummary(data));
      });
      self.summaryLoaded = true;
    }

    dispatch(globalActions.update({ isReady: true }));
  }, [wallet, dispatch, isReady, isUnlocked]);

  useEffect(() => {
    wallet.isUnlocked().then((isUnlocked) => {
      dispatch(globalActions.update({ isUnlocked }));
    });
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  if (!isReady) {
    return (
      <Layout className="h-full" style={{ backgroundColor: 'blue', flex: 1 }}>
        <Content style={{ backgroundColor: '#1C1919', overflowY: 'auto' }}>
          <div className="flex flex-col items-strech mx-5 text-6xl mt-60 gap-3_75 text-primary">
            <LoadingOutlined />
          </div>
        </Content>
      </Layout>
    );
  }
  return (
    <HashRouter>
      <Routes>
        {Object.keys(routes)
          .map((v) => routes[v])
          .map((v) => (
            <Route key={v.path} path={v.path} element={v.element} />
          ))}
      </Routes>
    </HashRouter>
  );
};

export default Main;
