import * as utils from 'web3-utils'
import { Preferences, PrefKeys } from '../utils/preferences'

/**
 * 获取账户信息
 */
export async function getAccount () {
  const getAccountPromise = new Promise((resolve, reject) => {
    window.web3.eth.getAccounts((err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
  return new Promise(async (resolve, reject) => {
    let account = '0x'
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.enable()
        const accounts = await getAccountPromise
        account = accounts[0]
        console.log('window.ethereum ==>' + account)
        resolve(account)
      } catch (err) {
        reject(err)
      }
    } else if (window.web3) {
      const accounts = await getAccountPromise
      account = accounts[0]
      console.log('window.web3 ==>' + account)
      resolve(account)
    }
  })
}

/**
 * 获取网络环境
 */
export function getNetwork () {
  return new Promise((resolve, reject) => {
    window.web3.version.getNetwork((err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

/**
 * toWei
 * @param {*} input      输入值
 * @param {*} decimal    decimal
 * @param {*} pos        小数点位数
 */
export function toWei ({ input, decimal = 18, pos = 4 }) {
  let value = input * Math.pow(10, pos).toString()
  value = utils.toBN(value).mul(utils.toBN(Math.pow(10, decimal - pos)))
  value = value.toString()
  return value
}

/**
 * wei to decimal
 * @param {*} amount     wei
 * @param {*} decimal    decimal
 * @param {*} pos        .
 */
export function toDecimal ({ amount, decimal = 18, pos = 4 }) {
  return weiToDecimal(amount, decimal, pos)
}

/**
 * wei to decimal
 * @param {*} x     wei
 * @param {*} n     decimal
 * @param {*} fixed .
 */
export function weiToDecimal (x, n, fixed) {
  const BN = require('bn.js')
  const base = new BN(10).pow(new BN(n))
  const dm = new BN(x).divmod(base)
  // let prefix = '';
  if (dm.mod.lte(new BN(0))) {
    dm.mod = dm.mod.mul(new BN(-1))
  }
  let decimal = dm.mod.toString(10, n)
  if (decimal.length <= fixed) {
    decimal = utils.padRight(decimal, fixed)
  } else {
    decimal = decimal.substring(0, fixed)
  }
  // const str = dm.div + '.' + dm.mod.toString(10, n);
  const str = dm.div.toString() + '.' + decimal
  // fixed = fixed ? fixed : 2;
  // return new Decimal(str).toFixed(fixed).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  // return parseFloat(str).toFixed(fixed)
  return str
}

/**
 * 判断是否为手机号 校验是否为有效的手机号
 * @param {*} pone
 */
export function isPoneAvailable (pone) {
  const myreg = /^[1][3,4,5,7,8][0-9]{9}$/
  if (!myreg.test(pone)) {
    return false
  } else {
    return true
  }
}

/**
 * 格式化输入
 * @param {*} input
 */
export function formattedInput (input) {
  if (!input || input === '0' || input === '0.0' || input === '0.00') return '' // string ==> number === 0 return ''
  const reg = /^(0|[1-9]\d*|[1-9]\d*\.\d+|0\.\d*[1-9]\d*)$/
  if (!reg.test(input)) return ''
  // 清除“数字”和“.”以外的字符
  let value = input.replace(/[^\d.]/g, '')
  // 只保留第一个. 清除多余的
  value = value.replace(/\.{2,}/g, '.')
  value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
  // 只能输入4个小数
  /* eslint-disable */
  value = value.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3')
  /* eslint-disable */
  // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
  if (value.indexOf('.') < 0 && value !== '') {
    value = parseFloat(value)
  }
  return value
}

/**
 * 校验 input format
 * @param {*} input
 */
export function isAvailableFormat (input) {
  if (!input) return false
  const reg = /^(0|[1-9]\d*|[1-9]\d*\.\d+|0\.\d*[1-9]\d*)$/
  if (!reg.test(input)) return false
  return true
}

/**
 * categoryId => router
 * @param {*} categoryId
 */
export function getRouter(categoryId) {
  switch (categoryId) {
    case 0:
      return 'phone'
    case 1:
      return 'gas'
    case 2:
      return 'vip'

    default:
      break;
  }
}

/**
 * 向上取整保留小数
 * @param {*} decimal 小数
 * @param {*} float 保留小数位数
 */
export function mathCeil({decimal, float}) {
  let value = decimal * Math.pow(10, float)
  value = Math.ceil(value) / Math.pow(10, float)
  return value
}

/**
 * 校验订单支付是否超时
 * @param {*} timeout 超时时刻
 */
export function timeoutCheck(timeout) {
  const moment = require('moment')
  const otime = moment(timeout).format()
  return moment().isSameOrAfter(otime)
}


/**
 * 解析异常提示
 * @param {*} error
 */
export function getErrMsg(error) {
  const {code, message} = error
  let msg = ''
  if (code) {
    msg = 'code:'+code
  }
  if (message) {
    const array = message.split('.')
    const Ramda = require('ramda')
    const errMsg = Ramda.head(array)
    msg = msg + errMsg + '.'
  }
  return msg
}

/**
 * 校验是否为当前用户
 * @param {*} user msg 用户地址
 */
export function isCurrentUser (user) {
  const account = Preferences.getItem(PrefKeys.USER_ACCOUNT)
  if (user.toLowerCase() === account.toLowerCase()) return true
  return false
}

/**
 * 获取授权 token
 * @param {*} address
 * @param {*} tokens
 */
export function getShowToken (address, tokens) {
  const token = tokens.find(token => {
    return token.address.toLowerCase() === address.toLowerCase()
  });
  return token
}