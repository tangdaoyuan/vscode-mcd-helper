const $PREFIX = 'mcd'
export const ENV = ['debug', 'test', 'release', 'production']

export const OPENER_COMMAND = ENV.reduce((acc, cur) => {
  acc[cur] = `${$PREFIX}.${cur}`
  return acc
}, {} as Record<string, string>)
