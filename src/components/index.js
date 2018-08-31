/**
*@file: index.js
*@author: afcfzf (9301462@qq.com)
*/

// import Affix from './components/affix';
// import BackTop from './components/backtop';
import Badge from './badge';
// import Breadcrumb from './components/breadcrumb';
import Checkbox from './checkbox';
import Circle from './circle';
// import Category from './components/category';
import Datetime from './datetime';
// import Dropdown from './plugins/dropdown';
// import DropdownCustom from './components/dropdowncustom';
// import DropdownMenu from './components/dropdownmenu';
import Form from './form';
import Menu, {MenuItem} from './menu';
import modal from './modal';
// import Pagination from './components/pagination';
import Poptip from './poptip';
import Progress from './progress';
import {Radio, RadioGroup} from './radio';
import Rate from './rate';
import Slider from './slider';
import Loading from './loading';
import Steps from './steps';
// import Search from './components/search';
import Select from './select';
import Switch from './switch';
import {Table, TableItem} from './table';
import Tabs from './tabs';
// import TagInput from './components/taginput';
// import Tree from './components/tree';
// import TreePicker from './components/treepicker';
// import NumberInput from './components/numberinput';
import Tooltip from './tooltip';
import Uploader from './uploader';
// import AutoComplete from './components/autocomplete';
import {Row, Col} from './layout';
// import Timeline from './components/timeline';
import {Button, ButtonGroup} from './button';
// import TextEllipsis from './components/textellipsis';

// import style from './directives/style';
// import tooltip from './directives/tooltip';
// import wordcount from './directives/wordcount';
// import wordlimit from './directives/wordlimit';
// import autosize from './directives/autosize';
import $Modal from '../plugins/modal';
import $Confirm from '../plugins/confirm';
import $Message from '../plugins/message';
import $Notice from '../plugins/notice';
import $Loading from '../plugins/loading';
import $LoadingBar from '../plugins/loadingBar';
// import $ScrollIntoView from './plugins/scrollIntoView';

// import filters from './filters';
// import config from './utils/config';

// import locale from './locale';
// import LocaleMinxin from './mixins/locale';
const components = {
    // Affix,
    // AutoComplete,
    // BackTop,
    Badge,
    Button,
    ButtonGroup,
    // Breadcrumb,
    // Category,
    Checkbox,
    uiCircle: Circle,
    DatePicker: Datetime.DatePicker,
    DateRangePicker: Datetime.DateRangePicker,
    // DateFullRangePicker: Datetime.DateFullRangePicker,
    // DropdownCustom,
    // DropdownMenu,
    Form,
    FormItem: Form.Item,
    FormItemList: Form.ItemList,
    Menu,
    MenuItem,
    Modal: modal.Modal,
    ModalComponent: modal.ModalComponent,
    // NumberInput,
    // Pagination,
    Poptip,
    Progress,
    Radio,
    RadioGroup,
    Rate,
    Row,
    // Search,
    Select,
    Slider,
    Steps,
    uiSwitch: Switch,
    Col,
    // Timeline,
    // TimelineItem: Timeline.Item,
    Loading,
    // TagInput,
    Table,
    TableItem,
    Tabs,
    Tooltip,
    // Tree,
    // TreePicker,
    Uploader,
    // TextEllipsis
};

// const directives = {
//     width: style.width,
//     color: style.color,
//     'bg-color': style.bgColor,
//     height: style.height,
//     padding: style.padding,
//     margin: style.margin,
//     font: style.font,
//     autosize,
//     tooltip,
//     wordcount,
//     wordlimit
// };

let prototypes = {
    $Message,
    $Confirm,
    $Loading,
    $LoadingBar
};

//      Object.assign({}, components, {
//         $Modal: $Modal(),
//         $Notice: $Notice(),
//         // locale: locale.use,
//         // i18n: locale.i18n
//     }, prototypes, config, {Dropdown}, filters);

const install = function (Vue, opts) {
    if (install.installed) {
        return;
    }
    // if (opts) {
    //     if (opts.locale) {
    //         locale.use(opts.locale);
    //     }
    // }

    // Vue.mixin(LocaleMinxin);

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
