/**
 * @file: index.js
 * @author: jialipeng
 * @File Created: Tuesday, 15th May 2018 4:57:52 pm
 */

import Button from './button';
import ButtonGroup from './button-group';
import Checkbox from './checkbox';
import CheckboxButton from './checkbox-button';
import Icon from './icon';
import Radio from './radio';
import RadioButton from './radio-button';
import Slider from './slider';

const comp = {
    uiBtn: Button,
    uiBtnGroup: ButtonGroup,
    uiCheckbox: Checkbox,
    uiCheckboxBtn: CheckboxButton,
    uiIcon: Icon,
    uiRadio: Radio,
    uiRadioBtn: RadioButton,
    uiSlider: Slider
};

const install = (Vue, opts = {}) => {
    Object.keys(comp).forEach(e =>
        Vue.component(e, comp[e])
    );
};

typeof window !== 'undefined' && window.Vue && install();

export default Object.assign(comp, {install});
