
type MCDConfig = Record<string, {
  config: string
}>

export function createOptions(options: MCDConfig) {
  return Object.assign({}, {
    debug: {
      config: 'appci/app-debug.yaml',
    },
    test: {
      config: 'appci/app-test.yaml',
    },
    release: {
      config: 'appci/app-test.yaml',
    },
    production: {
      config: 'appci/app-pro.yaml',
    },
  }, options)
}
