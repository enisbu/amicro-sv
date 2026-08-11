import { togglesData, type ToggleConfig } from './toggles.js';
import { textAnimationsData, type TextAnimationConfig } from './text-animations.js';
import { formElementsData, type FormElementConfig } from './form-elements.js';

export interface ClubbedComponentGroup {
  category: string;
  items: (ToggleConfig | TextAnimationConfig | FormElementConfig)[];
}

export const clubbedComponentsData: ClubbedComponentGroup[] = [
  {
    category: 'Toggles',
    items: togglesData,
  },
  {
    category: 'Text Motion',
    items: textAnimationsData,
  },
  {
    category: 'Form Elements',
    items: formElementsData,
  },
];

export { togglesData, textAnimationsData, formElementsData };
