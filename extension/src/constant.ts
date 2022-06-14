const $PREFIX = 'mcd'
const ENV = ['debug', 'test', 'release', 'production']

export const OPENER_COMMAND = ENV.reduce((acc, cur) => {
  acc[cur.toUpperCase()] = `${$PREFIX}.${cur}`
  return acc
}, {} as Record<string, string>)
