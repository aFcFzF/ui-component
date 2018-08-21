import Notify from '../notify';
import utils from '../../utils/utils';
import config from '../../utils/config';

const prefixCls = 'h-modal';
const hasDivider = config.getOption('modal', 'hasDivider');

let Vue = null;

let Default = {
  middle: false,
  hasDivider,
  fullScreen: false
}

function Modal(originalParam) {
  let cls = prefixCls;
  let param = utils.extend({ type: cls, hasMask: true, closeOnMask: true, buttons: ['cancel'] }, Default, originalParam, true);

  if (originalParam.hasDivider || Default.hasDivider) {
    param.class = `h-notify-has-divider`;
  }
  param.Vue = Vue;
  return Notify(param);
}

function modal(param) {
  if (this.$router) {
    param.$router = this.$router;
  }
  if (this.$i18n) {
    param.$i18n = this.$i18n;
  }
  return new Modal(param);
}

modal.config = (options) => {
  if (options.middle) {
    Default.middle = options.middle;
  }
};

export default (vue) => {
  Vue = vue;
  return modal;
};
