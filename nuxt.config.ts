// @ts-nocheck
import extractorPug from '@unocss/extractor-pug'
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxt/test-utils", "@unocss/nuxt", "@nuxt/eslint"],
  typescript: {
    typeCheck: true
  },
  routeRules: {
    '/auth/login': {prerender: true},
    '/auth': {
      redirect: { to: '/auth/login', statusCode: 302 }
    }
  },
  unocss: {
    extractors: [
      extractorPug(),
    ],
    theme: {
      darkBlueGrey: 'rgba(42, 48, 60, 1)',
      violet: 'rgba(95, 74, 221, 1)',
      violetOp75: 'rgba(95, 74, 221, 0.75)',
      violetOp50: 'rgba(95, 74, 221, 0.5)',
      grey: 'rgb(210, 213, 219, 1)',
      white: 'rgb(255, 255, 255, 1)',
      softBlue: 'rgba(47, 128, 237, 1)',
      softBlueOp15: 'rgba(47, 128, 237, 0.15)',
      softBlueOp25: 'rgba(47, 128, 237, 0.35)',
      darkRed: 'rgba(171, 46, 38, 1)',
      red: 'rgba(255, 0, 0, 1)',
    },
    rules: [
  
      // cols and rows
      [/^justify-(.*)$/, ([_, str]) => ({ 'justify-content': str }) ],
      [/^items-(.*)$/, ([_, str]) => ({ 'align-items': str }) ],
      [/^col-([\.\d]+)$/, ([_, num]) => ({ width: `${100 / 12 * parseFloat(num)}%`,  'box-sizing': 'border-box' })],
  
      // width and height
      ['w-auto', { width: 'auto' } ],
      [/^w-([\.\d]+)$/, ([_, num]) => ({ width: `${num}%` })],
      [/^w-([\.\d]+)vh$/, ([_, num]) => ({ width: `${num}vh` })],
      [/^w-([\.\d]+)vw$/, ([_, num]) => ({ width: `${num}vw` })],
      [/^w-([\.\d]+)px$/, ([_, num]) => ({ width: `${num}px` })],
      
      ['h-auto', { height: 'auto' } ],
      [/^h-([\.\d]+)$/, ([_, num]) => ({ height: `${num}%` })],
      [/^h-([\.\d]+)vh$/, ([_, num]) => ({ height: `${num}vh` })],
      [/^h-([\.\d]+)vw$/, ([_, num]) => ({ height: `${num}vw` })],
      [/^h-([\.\d]+)px$/, ([_, num]) => ({ height: `${num}px` })],

      //padding and margin
      [/^p-([\.\d]+)$/, ([_, num]) => ({ padding: `${num}px` })],
      [/^pl-([\.\d]+)$/, ([_, num]) => ({ 'padding-left': `${num}px` })],
      [/^pr-([\.\d]+)$/, ([_, num]) => ({ 'padding-right': `${num}px` })],
      [/^pt-([\.\d]+)$/, ([_, num]) => ({ 'padding-top': `${num}px` })],
      [/^pb-([\.\d]+)$/, ([_, num]) => ({ 'padding-bottom': `${num}px` })],
      [/^ph-([\.\d]+)$/, ([_, num]) => ({ 'padding-left': `${num}px`, 'padding-right': `${num}px` })],
      [/^pv-([\.\d]+)$/, ([_, num]) => ({ 'padding-top': `${num}px`, 'padding-bottom': `${num}px` })],
      
      ['m-auto', { margin: 'auto' }],
      ['ml-auto', { 'margin-left': 'auto' }],
      ['mr-auto', { 'margin-right': 'auto' }],
      ['mt-auto', { 'margin-top': 'auto' }],
      ['mb-auto', { 'margin-bottom': 'auto' }],
      ['mh-auto', { 'margin-left': 'auto', 'margin-right': 'auto' }],
      ['mv-auto', { 'margin-top': 'auto', 'margin-bottom': 'auto' }],
      
      [/^m-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
      [/^ml-([\.\d]+)$/, ([_, num]) => ({ 'margin-left': `${num}px` })],
      [/^mr-([\.\d]+)$/, ([_, num]) => ({ 'margin-right': `${num}px` })],
      [/^mt-([\.\d]+)$/, ([_, num]) => ({ 'margin-top': `${num}px` })],
      [/^mb-([\.\d]+)$/, ([_, num]) => ({ 'margin-bottom': `${num}px` })],
      [/^mh-([\.\d]+)$/, ([_, num]) => ({ 'margin-left': `${num}px`, 'margin-right': `${num}px` })],
      [/^mv-([\.\d]+)$/, ([_, num]) => ({ 'margin-top': `${num}px`, 'margin-bottom': `${num}px` })],

      // radius
      [/^radius-([\.\d]+)$/, ([_, num]) => ({ 'border-radius': `${num}px` })],
      [/^top-radius-([\.\d]+)$/, ([_, num]) => ({ 'border-top-left-radius': `${num}px`, 'border-top-right-radius': `${num}px` })],
      [/^bottom-radius-([\.\d]+)$/, ([_, num]) => ({ 'border-bottom-left-radius': `${num}px`, 'border-bottom-right-radius': `${num}px` })],
      [/^left-radius-([\.\d]+)$/, ([_, num]) => ({ 'border-top-left-radius': `${num}px`, 'border-bottom-left-radius': `${num}px` })],
      [/^right-radius-([\.\d]+)$/, ([_, num]) => ({ 'border-top-right-radius': `${num}px`, 'border-bottom-right-radius': `${num}px` })],

      // display
      ['block', { display: 'block' }],
      ['flex', { display: 'flex' } ],
      [/^flex-(.*)$/, ([_, str]) => ({ 'flex-direction': str }) ],
      [/^gap-([\.\d]+)$/, ([_, num]) => ({ 'gap': `${num}px` }) ],
      ['inline', { display: 'inline' } ],
      ['inline-block', { display: 'inline-block' } ],

      // text
      [/^text-(.*)$/, ([_, str]) => ({ 'text-align': str, 'border-color': '$violet' }) ],
      
      
      [/^btn$/, function* ([, color], { theme, symbols }) {
        yield {
          'font-size': '14px',
          'border': '1px solid transparent',
          'outline': '2px solid transparent',
          'border-radius': '6px',
          'padding': '8px 12px',
          'cursor': 'pointer',
          'transition': 'all .2s ease-in-out',
        }
        yield {
          [symbols.selector]: selector => `${selector}:hover`,
          'transition': 'background-color .2s ease-in-out'
        }
        yield {
          [symbols.selector]: selector => `${selector}:focus`,
          'outline-color': theme.violet,
          'transition': 'outline .2s ease-in-out'
        }
      }],
      [/^btn-primary$/, function* ([, color], { theme, symbols }) {
        yield {
          'background-color': theme.violet,
          'color': theme.white,
        }
        yield {
          [symbols.selector]: selector => `${selector}:hover`,
          'background-color': theme.violetOp75,
        }
        yield {
          [symbols.selector]: selector => `${selector}:focus`,
          'border-color': theme.white
        }
        yield {
          [symbols.selector]: selector => `${selector}[disabled]`,
          'background-color': theme.violetOp50,
        }
      }],
      [/^btn-secondary$/, function* ([, color], { theme, symbols }) {
        yield {
          'background-color': theme.softBlueOp15,
          'color': theme.softBlue,
        }
        yield {
          [symbols.selector]: selector => `${selector}:hover`,
          'background-color': theme.softBlueOp25,
        }
        yield {
          [symbols.selector]: selector => `${selector}:focus`,
        }
      }],
      [/^field-input$/, function* ([, color], { theme, symbols }) {
        yield {
          'color': theme.darkGreyBlue,
          'font-size': '14px',
          'padding': '8px 10px',
          'border': '1px solid',
          'border-color': theme.grey,
          'border-radius': '6px',
          'outline': '2px solid transparent',
          'transition': 'outline-color .2s ease-in-out',
        }
        yield {
          [symbols.selector]: selector => `${selector}:focus`,
          'border': '1px solid transparent',
          'outline-color': theme.violet,
          'transition': 'all .2s ease-in-out',
        }
      }],
      [/^field-label$/, ([, color]) => ({ 
        'font-size': '16px',
        'font-weight': '600',
        'cursor': 'pointer',
      })],
    
    ]
  }
});

