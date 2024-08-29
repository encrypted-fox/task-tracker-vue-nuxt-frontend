import { defineConfig } from 'unocss'
import type { UnocssNuxtOptions } from "@unocss/nuxt"
import extractorPug from '@unocss/extractor-pug'
import presetWind from '@unocss/preset-wind'

export default <UnocssNuxtOptions>defineConfig({
  extractors: [
    extractorPug(),
  ],
   presets: [
    presetWind({dark: 'media'})
   ],
   shortcuts: {
    // background
    'main-bg-styling': 'bg-white dark:bg-slate-900',

    // text
    'text-styling': 'text-gray-700 dark:text-slate-50',

    // border
    'border-coloring': 'border-gray-300 dark:border-gray-700',
    'initial-border-styling': 'border-solid border-1px border-transparent',
    'division-styling': 'initial-border-styling border-coloring',
    'main-border-styling': 'initial-border-styling rounded-md',
    'border-styling': 'main-border-styling border-coloring',

    // buttons
    'btn-hover': 'hover:opacity-75 hover:transition-all hover:duration-200',
    'btn': 'main-border-styling outline-none focus:outline-indigo-500 active:opacity-100 disabled:cursor-not-allowed cursor-pointer transition-all duration-200 btn-hover',
    'btn-xs': 'text-xs px-8px py-4px',
    'btn-sm': 'text-xs px-8px py-4px',
    'btn-md': 'text-sm px-10px py-6px',
    'btn-lg': 'text-sm px-12px py-8px',
    'btn-xl': 'text-sm px-14px py-10px',

    // dark:disabled:bg-slate-700 dark:disabled:text-slate-50
    'btn-primary-disabled': 'dark:disabled:bg-indigo-950 dark:disabled:text-indigo-500',
    'btn-primary': 'bg-indigo-500 text-slate-50 btn-primary-disabled btn',
    'btn-secondary-disabled': 'dark:bg-indigo-950 dark:text-indigo-500 btn',
    'btn-secondary-dark': 'dark:bg-gray-700 dark:text-slate-50 btn',
    'btn-secondary': 'bg-indigo-50 text-indigo-500 btn-secondary-disabled btn-secondary-dark btn',

    // fields
    'field': 'flex flex-col gap-10px',
    'field-label': 'block text-gray-700 dark:text-slate-50 font-semibold text-base',
    'field-invalid': 'border-red-500',
    'field-error': 'block text-xs text-red-500',

    'field-string': 'border-styling text-sm px-10px py-8px box-border outline-none focus:outline-indigo-500 text-gray-700 bg-white dark:text-slate-50 dark:bg-slate-900 ',
   }
})

// 'text-sm px-12px py-8px border-none border-solid border-1px rounded-md outline-none'

// [/^btn$/, function* (_: any, { theme, symbols }: RuleContext<any>) {
//   yield {


//     'outline': '2px solid transparent',
//     'border-radius': '6px',
//     'padding': '8px 12px',
//     'cursor': 'pointer',
//     'transition': 'all .2s ease-in-out',
//   }
//   yield {
//     [symbols.selector]: selector => `${selector}:hover`,
//     'transition': 'background-color .2s ease-in-out'
//   }
//   yield {
//     [symbols.selector]: selector => `${selector}:focus`,
//     'outline-color': theme.violet,
//     'transition': 'outline .2s ease-in-out'
//   }
// }],
// [/^btn-primary$/, function* (_: any, { theme, symbols }: RuleContext<any>) {
//   yield {
//     'background-color': theme.violet,
//     'color': theme.white,
//   }
//   yield {
//     [symbols.selector]: selector => `${selector}:hover`,
//     'background-color': theme.violetOp75,
//   }
//   yield {
//     [symbols.selector]: selector => `${selector}:focus`,
//     'border-color': theme.white
//   }
//   yield {
//     [symbols.selector]: selector => `${selector}[disabled]`,
//     'background-color': theme.violetOp50,
//   }
// }],
// [/^btn-secondary$/, function* (_: any, { theme, symbols }: RuleContext<any>) {
//   yield {
//     'background-color': theme.softBlueOp15,
//     'color': theme.softBlue,
//   }
//   yield {
//     [symbols.selector]: selector => `${selector}:hover`,
//     'background-color': theme.softBlueOp25,
//   }
//   yield {
//     [symbols.selector]: selector => `${selector}:focus`,
//   }
// }],