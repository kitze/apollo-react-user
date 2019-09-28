export const propFn = (prop, args) =>
    prop && typeof prop === "function" ? prop(args) : prop;
