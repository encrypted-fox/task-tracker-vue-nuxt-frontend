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
    'initial-border-styling':
      'border-solid border-2px border-transparent transition-border transition-duration-200 ease-in-out',
    'division-styling': 'initial-border-styling border-coloring',
    'main-border-styling': 'initial-border-styling rounded-md',
    'border-styling': 'main-border-styling border-coloring',

    // buttons
    btn: 'flex justify-center items-center shrink-0 select-none box-border main-border-styling hover:opacity-85 focus:!border-indigo-500 active:opacity-100 disabled:cursor-not-allowed cursor-pointer transition-all duration-200',
    'btn-xs': 'text-xs px-8px py-4px',
    'btn-sm': 'text-xs px-8px py-4px',
    'btn-md': 'text-sm px-10px py-6px',
    'btn-lg': 'text-sm px-12px py-8px',
    'btn-xl': 'text-sm px-14px py-10px',
    'btn-round': '!rounded-full',
    'btn-round-xs': 'p-2px !rounded-full w-20px h-20px',
    'btn-round-sm': 'p-4px !rounded-full w-25px h-25px',
    'btn-round-md': 'p-6px !rounded-full w-30px h-30px',
    'btn-round-lg': 'p-8px !rounded-full w-35px h-35px',
    'btn-round-xl': 'p-10px !rounded-full w-40px h-40px',

    link: 'w-fit transition-all duration-200 text-indigo-500 text-sm hover:text-indigo-400 active:text-indigo-500 cursor-pointer',

    'btn-primary-disabled':
      'disabled:bg-indigo-300 dark:disabled:bg-indigo-950 dark:disabled:text-indigo-500',
    'btn-primary':
      'bg-indigo-500 text-zinc-50 !fill-zinc-50 btn-primary-disabled btn focus:!border-orange-300 dark:focus:!border-zinc-50',

    'btn-secondary-disabled':
      'disabled:bg-indigo-950 disabled:!fill-indigo-500 disabled:text-indigo-500 dark:disabled:bg-zinc-800 dark:disabled:!fill-zinc-500 dark:disabled:text-zinc-500',
    'btn-secondary-dark':
      'dark:bg-zinc-700 dark:!fill-zinc-50 dark:text-zinc-200 btn',
    'btn-secondary':
      'bg-indigo-50 !fill-indigo-500 text-indigo-500 btn btn-secondary-dark btn-secondary-disabled',

    'btn-link-disabled':
      'disabled:bg-blue-50 disabled:text-blue-300 disabled:fill-blue-300 dark:disabled:bg-blue-950 dark:disabled:fill-blue-700 dark:disabled:text-blue-500',
    'btn-link-dark':
      'dark:bg-blue-700 dark:fill-zinc-50 dark:text-zinc-50 dark:focus:!border-zinc-200',
    'btn-link':
      'bg-blue-100 fill-blue-700 text-blue-700 btn-link-dark btn btn-link-disabled',

    'btn-seemless': '!bg-transparent',

    // modals
    overlay:
      'flex pt-50px box-border md:pt-0 md:justify-center md:items-center fixed w-full h-100dvh z-10 top-0 bg-black/10 dark:bg-black/50',
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

    'field-container': 'relative',
    'field-icon':
      'icon h-100% w-40px absolute cursor-pointer top-0 box-border flex justify-center items-center p-10px fill-zinc-700 dark:fill-zinc-50',
    'field-icon-prepend': 'field-icon left-0',
    'field-icon-append': 'field-icon right-0',
    'field-string':
      'transition-all duration-200 h-40px border-styling text-sm px-10px py-8px bg-transparent box-border text-zinc-700 dark:text-zinc-50 focus:border-indigo-500',

    // icons
    icon: 'flex justify-center items-center box-border select-none fill-[inherit]',
    'icon-secondary': 'icon !fill-zinc-700 dark:!fill-zinc-50',

    // notifications
    'notification-container':
      'w-full max-h-158px md:max-h-298px md:pr-20px md:pb-10px flex flex-col-reverse md:flex-col gap-10px md:w-fit fixed bottom-0 md:bottom-unset md:top-0 md:top-20px md:right-0 z-20 overflow-y-auto',
    notification:
      'w-full md:w-fit box-border border-styling border-coloring flex justify-between gap-10px items-center p-15px shadow-md',
    'notification-icon-success':
      'icon w-25px h-25px p-5px bg-emerald-200 !fill-emerald-600 p-4px rounded-full',
    'notification-icon-warn':
      'icon w-25px h-25px p-5px bg-amber-200 !fill-amber-600 p-4px rounded-full',
    'notification-icon-danger':
      'icon w-25px h-25px p-5px bg-rose-200 !fill-rose-600 p-4px rounded-full',
    'notification-message': 'text-sm text-styling inline-block w-200px',

    // pages
    page: 'h-100dvh w-full p-20px pt-70px md:p-30px flex flex-col gap-20px overflow-y-auto box-border',

    // badges
    badge:
      'w-fit px-8px py-4px flex justify-center items-center shrink-0 select-none text-sm box-border main-border-styling hover:opacity-85 focus:!border-indigo-500 active:opacity-100 disabled:cursor-not-allowed cursor-pointer transition-all duration-200',
    'badge-primary':
      'badge bg-indigo-500 text-zinc-50 !fill-zinc-50 focus:!border-orange-300 dark:focus:!border-zinc-50',
    'badge-secondary':
      'badge bg-indigo-50 !fill-indigo-500 text-indigo-500 dark:bg-zinc-700 dark:!fill-zinc-50 dark:text-zinc-200',
    'badge-success':
      'badge bg-emerald-100 !fill-emerald-500 text-emerald-500 dark:bg-emerald-700 dark:!fill-emerald-50 dark:text-emerald-200',
    'badge-warn':
      'badge bg-amber-100 !fill-amber-500 text-amber-500 dark:bg-amber-700 dark:!fill-amber-50 dark:text-amber-200',
    'badge-danger':
      'badge bg-rose-100 !fill-rose-500 text-rose-500 dark:bg-rose-700 dark:!fill-rose-50 dark:text-rose-200',
  },
})
