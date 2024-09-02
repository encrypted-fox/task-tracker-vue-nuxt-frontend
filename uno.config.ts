import { defineConfig } from 'unocss'
import type { UnocssNuxtOptions } from '@unocss/nuxt'
import extractorPug from '@unocss/extractor-pug'
import presetWind from '@unocss/preset-wind'

export default <UnocssNuxtOptions>defineConfig({
  extractors: [extractorPug()],
  presets: [presetWind({ dark: 'class' })],
  shortcuts: {
    // text
    'text-styling': 'text-zinc-700 dark:text-zinc-50',

    // border
    'border-coloring': 'border-zinc-300 dark:border-zinc-700',
    'initial-border-styling': 'border-solid border-2px border-transparent',
    'division-styling': 'initial-border-styling border-coloring',
    'main-border-styling': 'initial-border-styling rounded-md',
    'border-styling': 'main-border-styling border-coloring',

    // buttons
    btn: 'select-none main-border-styling hover:opacity-85 focus:border-indigo-500 active:opacity-100 disabled:cursor-not-allowed cursor-pointer transition-all duration-200',
    'btn-xs': 'text-xs px-8px py-4px',
    'btn-sm': 'text-xs px-8px py-4px',
    'btn-md': 'text-sm px-10px py-6px',
    'btn-lg': 'text-sm px-12px py-8px',
    'btn-xl': 'text-sm px-14px py-10px',
    'btn-round': '!rounded-full',
    'btn-round-sm': 'p-4px !rounded-full w-20px h-20px',
    'btn-round-md': 'p-6px !rounded-full w-20px h-20px',
    'btn-round-lg': 'p-8px !rounded-full w-25px h-25px',
    'btn-round-xl': 'p-10px !rounded-full w-25px h-25px',
    link: 'w-fit transition-all duration-200 text-indigo-500 text-sm hover:text-indigo-400 active:text-indigo-500 cursor-pointer',
    'btn-primary-disabled':
      'disabled:bg-indigo-300 dark:disabled:bg-indigo-950 dark:disabled:text-indigo-500',
    'btn-primary':
      'bg-indigo-500 text-zinc-50 fill-zinc-50 btn-primary-disabled btn focus:!border-orange-300 dark:focus:!border-zinc-50',
    'btn-secondary-disabled': 'dark:bg-indigo-950 dark:text-indigo-500 btn',
    'btn-secondary-dark':
      'dark:bg-zinc-700 dark:fill-zinc-50 dark:text-zinc-50 btn',
    'btn-secondary':
      'bg-indigo-50 fill-indigo-500 text-indigo-500 btn-secondary-disabled btn-secondary-dark btn',
    'btn-flat': '!bg-transparent',

    // modals
    overlay:
      'flex pt-50px box-border md:pt-0 md:justify-center md:items-center fixed w-full h-screen z-10 top-0 bg-black/10 dark:bg-black/50',
    'modal-header':
      'pb-20px flex justify-between items-center division-styling border-0 border-b-2px',
    'modal-content': 'flex flex-col gap-15px',
    'modal-footer': 'flex justify-between',
    modal:
      'w-full overflow-y-auto md:w-500px bg-white dark:bg-zinc-900 p-20px md:rounded-md flex flex-col gap-20px',

    // fields
    field: 'flex flex-col gap-10px',
    'field-label':
      'block text-zinc-700 dark:text-zinc-50 font-medium text-base',
    'field-invalid': 'border-red-500',
    'field-error': 'block text-xs text-red-500',

    'field-string':
      'transition-all duration-200 border-styling text-sm px-10px py-8px box-border text-zinc-700 bg-white dark:text-zinc-50 dark:bg-zinc-900 focus:border-indigo-500',

    // icons
    icon: 'select-none w-[inherit] h-[inherit] fill-[inherit]',
    'icon-secondary': 'icon !fill-zinc-700 dark:!fill-zinc-50',

    // notifications
    'notification-container':
      'w-full max-h-144px md:max-h-298px md:pr-20px md:pb-10px flex flex-col gap-10px md:w-fit fixed bottom-0 md:bottom-unset md:top-0 md:top-20px md:right-0 z-20 overflow-y-auto',
    notification:
      'w-full md:w-fit box-border border-styling border-coloring flex justify-between gap-10px items-center p-15px shadow-md',
    'notification-icon-success':
      'w-25px h-25px bg-emerald-200 fill-emerald-600 p-4px rounded-full',
    'notification-icon-warn':
      'w-25px h-25px bg-amber-200 fill-amber-600 p-4px rounded-full',
    'notification-icon-danger':
      'w-25px h-25px bg-rose-200 fill-rose-600 p-4px rounded-full',
    'notification-message': 'text-sm text-styling inline-block w-200px',
  },
})
