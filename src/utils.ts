export const propFn = (prop, args) =>
  prop && typeof prop === 'function' ? prop(args) : prop;

export const onEnter = fn => {
    return {
        onKeyDown: e => e.key === 'Enter' && fn && fn(e),
    };
};
