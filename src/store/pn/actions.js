import api from '../../service/api'
import { mathCeil } from '../../utils/helper'

export async function updatePrice ({ commit, rootGetters, rootState }, payload) {
  commit('loading', true)
  const { selectGoods: { price } } = rootState.sku
  const { tokens, selected } = rootState.config
  const { address, round } = tokens[selected]
  const { tokens: rates } = await api.getRates([{ address }])
  const Ramda = require('ramda')
  const { rate } = Ramda.head(rates)

  let decimal = price / 100 / rate
  decimal = mathCeil({ decimal, round })
  commit('updatePrice', decimal)
  commit('loading', false)
}
