import { Preferences, PrefKeys } from '../../utils/preferences'
const chain = Preferences.getItem(PrefKeys.CURRENT_CHAIN)
export default {
  // dev
  // ethPNAddress: '0xcc7d77DEF5cace6d57058286FDaeA27bC084baB4',
  // appPNAddress: '0xcDab9A75Faf7c9c1619521965fd535680182715b',
  // appRpcUrl: 'https://cita.milewan.com:9191',

  // pro
  // ethPNAddress: '0x11d0B2243739656F54C0277Ed0EEcDe46658a537',
  // appPNAddress: '0x2Af6F1411b6CF6284a60B3FdAB56E76B7f1F709b',
  // appRpcUrl: 'https://cita.milewan.com:9191',

  // baseURL: 'https://storeapi.bykernel.com',
  // socketURL: 'https://storeapi.bykernel.com',

  // baseURL: 'https://wanapi.milewan.com',
  // socketURL: 'https://wanapi.milewan.com',

  baseURL: chain === 'wanchain' ? 'https://wanapi.milewan.com' : 'https://storeapi.bykernel.com',
  socketURL: chain === 'wanchain' ? 'https://wanapi.milewan.com' : 'https://storeapi.bykernel.com',

  // config
  ethPNAddress: undefined,
  appPNAddress: undefined,
  appRpcUrl: undefined,
  categorys: [],
  telegramURL: '',
  tokens: [],
  // config

  title: 'LITE X Store',
  isShowRoot: true,
  isShowFund: false,
  isInitL2: false,
  loading: false,
  duration: 1500,
  timeout: 5000,
  selected: 0,
  price: 0,
  account: undefined,
  showDepositDialog: false,
  showSelectDropdown: false,

  chain: undefined,
  isShowSwitchWModel: false,
  isConfirmChain: false,

  chains: [{
    key: 'wanchain',
    label: 'ETH钱包',
    provider: 'ethereum'
  }, {
    key: 'ethereum',
    label: 'WAN钱包',
    provider: 'wanchain'
  }],

  menuList: [{
    key: 'shop',
    label: '商城'
  }, {
    key: 'funds',
    label: '资金记录'
  }, {
    key: 'orders',
    label: '订单列表'
  }, {
    key: 'introduction',
    label: '说明'
  }, {
    key: 'contactUS',
    label: '联系我们'
  }]

}

// tokens: [{
//   symbol: 'ETH',
//   address: '0x0000000000000000000000000000000000000000',
//   decimal: 18,
//   type: 1,
//   round: 4,
//   icon: 'statics/tokens/eth.svg'
// }, {
//   symbol: 'USDT',
//   address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
//   decimal: 6,
//   type: 2,
//   round: 4,
//   icon: 'statics/tokens/usdt.svg'
// }, {
//   symbol: 'LXT',
//   address: '0xbc46d9961a3932f7d6b64abfdec80c1816c4b835',
//   decimal: 18,
//   type: 3,
//   round: 0,
//   icon: 'statics/tokens/lxt.png'
// }],
