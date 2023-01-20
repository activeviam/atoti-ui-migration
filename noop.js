class Component {}
class PureComponent {}

module.exports = {
  Component,
  PureComponent,
  createContext: () => ({
    Provider: () => ({}),
    Consumer: () => ({}),
  }),
  lazy: () => () => ({}),
  forwardRef: () => () => ({}),
  memo: () => () => ({}),
  isElement: () => false,
  isFragment: () => false,
  DropTarget: () => () => ({}),
  DragSource: () => () => ({}),
  createElement: () => ({}),

  jsx: () => ({}),
  jsxs: () => ({}),
};
