/**
*@file: index.js
*@author: afcfzf (9301462@qq.com)
*/

import Badge from './badge';
import Checkbox from './checkbox';
import Circle from './circle';
import ColorPicker from './colorpicker';
import Datetime from './datetime';
import Form from './form';
import Menu, {MenuItem} from './menu';
import modal from './modal';
import Poptip from './poptip';
import Progress from './progress';
import {Radio, RadioGroup} from './radio';
import Rate from './rate';
import Slider from './slider';
import Loading from './loading';
import Steps from './steps';
import Scrollbar from './scrollbar';
import Select from './select';
import Switch from './switch';
import {Table, TableItem} from './table';
import Tabs from './tabs';
import Tooltip from './tooltip';
import Uploader from './uploader';
import {Row, Col} from './layout';
import {Button, ButtonGroup} from './button';
import $Modal from '../plugins/modal';
import $Confirm from '../plugins/confirm';
import $Message from '../plugins/message';
import $Notice from '../plugins/notice';
import $Loading from '../plugins/loading';
import $LoadingBar from '../plugins/loadingBar';

const components = {
    Badge,
    Button,
    ButtonGroup,
    Checkbox,
    ColorPicker,
    uiCircle: Circle,
    DatePicker: Datetime.DatePicker,
    DateRangePicker: Datetime.DateRangePicker,
    Form,
    FormItem: Form.Item,
    FormItemList: Form.ItemList,
    Menu,
    MenuItem,
    Modal: modal.Modal,
    ModalComponent: modal.ModalComponent,
    Poptip,
    Progress,
    Radio,
    RadioGroup,
    Rate,
    Row,
    Scrollbar,
    Select,
    Slider,
    Steps,
    uiSwitch: Switch,
    Col,
    Loading,
    Table,
    TableItem,
    Tabs,
    Tooltip,
    Uploader
};

let prototypes = {
    $Message,
    $Confirm,
    $Loading,
    $LoadingBar
};

const install = function (Vue, opts) {
    if (install.installed) {
        return;
    }

    Object.entries(components).forEach(([k, v]) => {
        Vue.component(k, v);
        k.indexOf('ui') === -1 && Vue.component(`ui${k}`, v);
    });

    Object.entries(prototypes).forEach(([k, v]) => Vue.prototype[k] = v);

    Vue.prototype.$Modal = $Modal(Vue);
    Vue.prototype.$Notice = $Notice(Vue);
};

typeof window !== 'undefined' && window.Vue && install(window.Vue);

export default Object.assign(components, {install});
