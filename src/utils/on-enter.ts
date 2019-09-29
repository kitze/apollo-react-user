export const onEnter = fn => {
         return {
           onKeyDown: e => e.key === 'Enter' && fn && fn(),
         };
       };
