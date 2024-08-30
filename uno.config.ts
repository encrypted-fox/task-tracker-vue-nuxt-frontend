import { defineConfig } from 'unocss'
import type { UnocssNuxtOptions } from '@unocss/nuxt'
import extractorPug from '@unocss/extractor-pug'
import presetWind from '@unocss/preset-wind'

export default <UnocssNuxtOptions>defineConfig({
  extractors: [extractorPug()],
  presets: [presetWind({ dark: 'class' })],
  shortcuts: {
    // background
    'main-bg-styling': 'bg-white dark:bg-slate-900',

    // text
    'text-styling': 'text-gray-700 dark:text-slate-50',

    // border
    'border-coloring': 'border-gray-300 dark:border-gray-700',
    'initial-border-styling': 'border-solid border-2px border-transparent',
    'division-styling': 'initial-border-styling border-coloring',
    'main-border-styling': 'initial-border-styling rounded-md',
    'border-styling': 'main-border-styling border-coloring',

    // buttons
    'btn-hover': 'hover:opacity-75 hover:transition-all hover:duration-200',
    btn: 'main-border-styling focus:border-indigo-500 active:opacity-100 disabled:cursor-not-allowed cursor-pointer transition-all duration-200 btn-hover',
    'btn-xs': 'text-xs px-8px py-4px',
    'btn-sm': 'text-xs px-8px py-4px',
    'btn-md': 'text-sm px-10px py-6px',
    'btn-lg': 'text-sm px-12px py-8px',
    'btn-xl': 'text-sm px-14px py-10px',
    'btn-round-sm': 'p-4px !rounded-full w-20px h-20px',
    'btn-round-md': 'p-6px !rounded-full w-20px h-20px',
    'btn-round-lg': 'p-8px !rounded-full w-25px h-25px',
    'btn-round-xl': 'p-10px !rounded-full w-25px h-25px',
    link: 'w-fit text-indigo-500 text-sm hover:text-indigo-400 active:text-indigo-500 cursor-pointer',

    // dark:disabled:bg-slate-700 dark:disabled:text-slate-50
    'btn-primary-disabled':
      'disabled:bg-indigo-300 dark:disabled:bg-indigo-950 dark:disabled:text-indigo-500',
    'btn-primary':
      'bg-indigo-500 text-slate-50 btn-primary-disabled btn focus:!border-slate-50',
    'btn-secondary-disabled': 'dark:bg-indigo-950 dark:text-indigo-500 btn',
    'btn-secondary-dark': 'dark:bg-gray-700 dark:text-slate-50 btn',
    'btn-secondary':
      'bg-indigo-50 text-indigo-500 btn-secondary-disabled btn-secondary-dark btn',

    // modals
    overlay:
      'flex md:justify-center md:items-center fixed w-full h-screen z-10 top-0 bg-black/10 dark:bg-black/50',
    'modal-header':
      'pb-20px flex justify-between items-center division-styling border-0 border-b-2px',
    'modal-content': 'flex flex-col gap-15px',
    'modal-footer': 'flex justify-between',
    modal:
      'mt-100px md:w-50% bg-white dark:bg-slate-900 p-20px md:rounded-md flex flex-col gap-20px',

    // fields
    field: 'flex flex-col gap-10px',
    'field-label':
      'block text-gray-700 dark:text-slate-50 font-semibold text-base',
    'field-invalid': 'border-red-500',
    'field-error': 'block text-xs text-red-500',

    'field-string':
      'border-styling text-sm px-10px py-8px box-border text-gray-700 bg-white dark:text-slate-50 dark:bg-slate-900 focus:border-indigo-500',

    // icons
    icon: 'fill-gray-700 dark:fill-slate-50 w-[inherit] h-[inherit]',
  },
})
