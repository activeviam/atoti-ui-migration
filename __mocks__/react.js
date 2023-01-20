class Component {}
class PureComponent {}

module.exports = {
  Component,
  PureComponent,
  createContext: () => ({
    Provider: () => ({}),
    Consumer: () => ({}),
  }),
  createElement: () => ({}),
  lazy: () => () => ({}),
  forwardRef: () => () => ({}),
  memo: () => () => ({}),

  isElement: () => false,
  isFragment: () => false,
  version: "18.0.0",
};
