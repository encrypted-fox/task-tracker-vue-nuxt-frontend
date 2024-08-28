import { defineConfig } from 'unocss'
import type { RuleContext } from "unocss"
import type { UnocssNuxtOptions } from "@unocss/nuxt"
import extractorPug from '@unocss/extractor-pug'

export default <UnocssNuxtOptions>defineConfig({
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
    ['justify-start', {'justify-content': 'flex-start'}],
    ['justify-end', {'justify-content': 'flex-end'}],
    ['justify-stretch', {'justify-content': 'stretch'}],
    ['justify-center', {'justify-content': 'center'}],
    ['justify-between', {'justify-content': 'space-between'}],
    ['justify-around', {'justify-content': 'space-around'}],

    ['items-start', {'align-items': 'flex-start'}],
    ['items-end', {'align-items': 'flex-end'}],
    ['items-center', {'align-items': 'center'}],

    [/^col-([\.\d]+)$/, ([_, str]: RegExpMatchArray) => ({ width: `${100 / 12 * parseFloat(str)}%`,  'box-sizing': 'border-box' })],

    // width and height
    ['w-auto', { width: 'auto' } ],
    [/^w-([\.\d]+)$/, ([_, str]: RegExpMatchArray) => ({ width: `${str}%` })],
    [/^w-([\.\d]+)vh$/, ([_, str]: RegExpMatchArray) => ({ width: `${str}vh` })],
    [/^w-([\.\d]+)vw$/, ([_, str]: RegExpMatchArray) => ({ width: `${str}vw` })],
    [/^w-([\.\d]+)px$/, ([_, str]: RegExpMatchArray) => ({ width: `${str}px` })],
    
    ['h-auto', { height: 'auto' } ],
    [/^h-([\.\d]+)$/, ([_, str]: RegExpMatchArray) => ({ height: `${str}%` })],
    [/^h-([\.\d]+)vh$/, ([_, str]: RegExpMatchArray) => ({ height: `${str}vh` })],
    [/^h-([\.\d]+)vw$/, ([_, str]: RegExpMatchArray) => ({ height: `${str}vw` })],
    [/^h-([\.\d]+)px$/, ([_, str]: RegExpMatchArray) => ({ height: `${str}px` })],

    //padding and margin
    [/^p-([\.\d]+)$/, ([_, str]: RegExpMatchArray) => ({ padding: `${str}px` })],
    [/^pl-([\.\d]+)$/, ([_, str]: RegExpMatchArray) => ({ 'padding-left': `${str}px` })],
    [/^pr-([\.\d]+)$/, ([_, str]: RegExpMatchArray) => ({ 'padding-right': `${str}px` })],
    [/^pt-([\.\d]+)$/, ([_, str]: RegExpMatchArray) => ({ 'padding-top': `${str}px` })],
    [/^pb-([\.\d]+)$/, ([_, str]: RegExpMatchArray) => ({ 'padding-bottom': `${str}px` })],
    [/^ph-([\.\d]+)$/, ([_, str]: RegExpMatchArray) => ({ 'padding-left': `${str}px`, 'padding-right': `${str}px` })],
    [/^pv-([\.\d]+)$/, ([_, str]: RegExpMatchArray) => ({ 'padding-top': `${str}px`, 'padding-bottom': `${str}px` })],
    
    ['m-auto', { margin: 'auto' }],
    ['ml-auto', { 'margin-left': 'auto' }],
    ['mr-auto', { 'margin-right': 'auto' }],
    ['mt-auto', { 'margin-top': 'auto' }],
    ['mb-auto', { 'margin-bottom': 'auto' }],
    ['mh-auto', { 'margin-left': 'auto', 'margin-right': 'auto' }],
    ['mv-auto', { 'margin-top': 'auto', 'margin-bottom': 'auto' }],
    
    [/^m-([\.\d]+)$/, ([_, str]: RegExpMatchArray) => ({ margin: `${str}px` })],
    [/^ml-([\.\d]+)$/, ([_, str]: RegExpMatchArray) => ({ 'margin-left': `${str}px` })],
    [/^mr-([\.\d]+)$/, ([_, str]: RegExpMatchArray) => ({ 'margin-right': `${str}px` })],
    [/^mt-([\.\d]+)$/, ([_, str]: RegExpMatchArray) => ({ 'margin-top': `${str}px` })],
    [/^mb-([\.\d]+)$/, ([_, str]: RegExpMatchArray) => ({ 'margin-bottom': `${str}px` })],
    [/^mh-([\.\d]+)$/, ([_, str]: RegExpMatchArray) => ({ 'margin-left': `${str}px`, 'margin-right': `${str}px` })],
    [/^mv-([\.\d]+)$/, ([_, str]: RegExpMatchArray) => ({ 'margin-top': `${str}px`, 'margin-bottom': `${str}px` })],

    // radius
    [/^radius-([\.\d]+)$/, ([_, str]: RegExpMatchArray) => ({ 'border-radius': `${str}px` })],
    [/^top-radius-([\.\d]+)$/, ([_, str]: RegExpMatchArray) => ({ 'border-top-left-radius': `${str}px`, 'border-top-right-radius': `${str}px` })],
    [/^bottom-radius-([\.\d]+)$/, ([_, str]: RegExpMatchArray) => ({ 'border-bottom-left-radius': `${str}px`, 'border-bottom-right-radius': `${str}px` })],
    [/^left-radius-([\.\d]+)$/, ([_, str]: RegExpMatchArray) => ({ 'border-top-left-radius': `${str}px`, 'border-bottom-left-radius': `${str}px` })],
    [/^right-radius-([\.\d]+)$/, ([_, str]: RegExpMatchArray) => ({ 'border-top-right-radius': `${str}px`, 'border-bottom-right-radius': `${str}px` })],

    // display
    ['block', { display: 'block' }],
    ['flex', { display: 'flex' } ],
    ['flex-row', { 'flex-direction': 'row' }],
    ['flex-row-reverse', { 'flex-direction': 'row-reverse' }],
    ['flex-column', { 'flex-direction': 'column' }],
    ['flex-column-reverse', { 'flex-direction': 'column-reverse' }],
    [/^gap-([\.\d]+)$/, ([_, str]: RegExpMatchArray) => ({ 'gap': `${str}px` }) ],
    ['inline', { display: 'inline' } ],
    ['inline-block', { display: 'inline-block' } ],
    
    ['inline', { display: 'inline' } ],

    // text
    ['text-start', { 'text-align': 'start'}],
    ['text-end', { 'text-align': 'end'}],
    ['text-left', { 'text-align': 'left'}],
    ['text-right', { 'text-align': 'right'}],
    ['text-center', { 'text-align': 'center'}],
    ['text-justify', { 'text-align': 'justify'}],
    ['text-justify-all', { 'text-align': 'justify-all'}],

    //btns
    [/^btn$/, function* (_: any, { theme, symbols }: RuleContext<any>) {
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
    [/^btn-primary$/, function* (_: any, { theme, symbols }: RuleContext<any>) {
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
    [/^btn-secondary$/, function* (_: any, { theme, symbols }: RuleContext<any>) {
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

    // fields
    [/^field$/, function (_: any) { 
      return {
        'display': 'flex', 
        'flex-direction': 'column',
        'gap': '10px'
      }
    }],
    [/^field-input$/, function* (_: any, { theme, symbols }: RuleContext<any>) {
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
    [/^field-label$/, (_: any) => ({ 
      'font-size': '16px',
      'font-weight': '600',
      'cursor': 'pointer',
    })],
    [/^field-input--error$/, function (_: any, {theme}: RuleContext<any>) { return {'outline-color': theme.red}}],
    [/^field-input-error$/, function (_: any, {theme}: RuleContext<any>) {return {'color': theme.red, 'font-size': '12px'}}],
  ]
})