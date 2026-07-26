import {
  rankWith,
  and,
  or,
  isStringControl,
  isBooleanControl,
  isNumberControl,
  isIntegerControl,
  isEnumControl,
  isDateControl,
  isMultiLineControl,
  isCategorization,
  isObjectArrayControl,
  isPrimitiveArrayControl,
  isOneOfControl,
  isOneOfEnumControl,
  isAnyOfControl,
  isRangeControl,
  uiTypeIs,
  schemaTypeIs,
  formatIs,
  optionIs,
} from '@jsonforms/core'
import type { JsonFormsRendererRegistryEntry } from '@jsonforms/core'
import { markRaw } from 'vue'

import TextControl from './controls/TextControl.vue'
import MultiStringControl from './controls/MultiStringControl.vue'
import NumberControl from './controls/NumberControl.vue'
import BooleanControl from './controls/BooleanControl.vue'
import EnumControl from './controls/EnumControl.vue'
import DatePickerControl from './controls/DatePickerControl.vue'
import RadioGroupControl from './controls/RadioGroupControl.vue'
import SliderControl from './controls/SliderControl.vue'
import ColorPickerControl from './controls/ColorPickerControl.vue'
import RatingControl from './controls/RatingControl.vue'
import ArrayControl from './controls/ArrayControl.vue'
import OneOfControl from './controls/OneOfControl.vue'
import VerticalLayout from './layouts/VerticalLayout.vue'
import HorizontalLayout from './layouts/HorizontalLayout.vue'
import GroupLayout from './layouts/GroupLayout.vue'
import CategorizationRenderer from './layouts/CategorizationRenderer.vue'
import UnknownRenderer from './layouts/UnknownRenderer.vue'

export const nuxtUiRenderers: JsonFormsRendererRegistryEntry[] = [
  // ========== LAYOUTS ==========
  { tester: rankWith(8, isCategorization), renderer: markRaw(CategorizationRenderer) },
  { tester: rankWith(5, uiTypeIs('GroupLayout')), renderer: markRaw(GroupLayout) },
  { tester: rankWith(4, uiTypeIs('VerticalLayout')), renderer: markRaw(VerticalLayout) },
  { tester: rankWith(4, uiTypeIs('HorizontalLayout')), renderer: markRaw(HorizontalLayout) },

  // ========== oneOf / anyOf (rank 8) ==========
  { tester: rankWith(8, isOneOfEnumControl), renderer: markRaw(OneOfControl) },
  { tester: rankWith(8, isOneOfControl), renderer: markRaw(OneOfControl) },
  { tester: rankWith(7, isAnyOfControl), renderer: markRaw(OneOfControl) },

  // ========== ENUM CONTROLS (rank 8) ==========
  { tester: rankWith(8, and(isEnumControl, optionIs('format', 'radio-group'))), renderer: markRaw(RadioGroupControl) },
  { tester: rankWith(8, isEnumControl), renderer: markRaw(EnumControl) },

  // ========== FORMAT-SPECIFIC CONTROLS (rank 7) ==========
  { tester: rankWith(7, formatIs('date-time')), renderer: markRaw(DatePickerControl) },
  { tester: rankWith(7, formatIs('date')), renderer: markRaw(DatePickerControl) },
  { tester: rankWith(7, formatIs('time')), renderer: markRaw(DatePickerControl) },
  { tester: rankWith(7, and(isStringControl, optionIs('format', 'color'))), renderer: markRaw(ColorPickerControl) },
  { tester: rankWith(7, uiTypeIs('ColorPicker')), renderer: markRaw(ColorPickerControl) },
  { tester: rankWith(7, uiTypeIs('FileUpload')), renderer: markRaw(TextControl) },

  // ========== SLIDER / RATING (rank 7, via options.format) ==========
  { tester: rankWith(7, and(or(schemaTypeIs('number'), schemaTypeIs('integer')), optionIs('format', 'slider'))), renderer: markRaw(SliderControl) },
  { tester: rankWith(7, and(schemaTypeIs('array'), optionIs('format', 'range-slider'))), renderer: markRaw(SliderControl) },
  { tester: rankWith(7, and(schemaTypeIs('number'), optionIs('format', 'rating'))), renderer: markRaw(RatingControl) },

  // ========== MULTI-LINE (rank 6) ==========
  { tester: rankWith(6, isMultiLineControl), renderer: markRaw(MultiStringControl) },

  // ========== ARRAY CONTROLS (rank 6) ==========
  { tester: rankWith(6, isObjectArrayControl), renderer: markRaw(ArrayControl) },
  { tester: rankWith(6, isPrimitiveArrayControl), renderer: markRaw(ArrayControl) },

  // ========== NUMBER CONTROLS (rank 5) ==========
  { tester: rankWith(5, isNumberControl), renderer: markRaw(NumberControl) },
  { tester: rankWith(5, isIntegerControl), renderer: markRaw(NumberControl) },

  // ========== BOOLEAN / DATE / RANGE (rank 4) ==========
  { tester: rankWith(4, isBooleanControl), renderer: markRaw(BooleanControl) },
  { tester: rankWith(4, isDateControl), renderer: markRaw(DatePickerControl) },
  { tester: rankWith(4, isRangeControl), renderer: markRaw(SliderControl) },

  // ========== STRING FALLBACK (rank 3) ==========
  { tester: rankWith(3, isStringControl), renderer: markRaw(TextControl) },

  // ========== FALLBACK (rank 1) ==========
  { tester: rankWith(1, () => true), renderer: markRaw(UnknownRenderer) },
]
