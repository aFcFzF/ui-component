<template>
  <div :class="cls">
    <i v-if="position=='front'" class="ui-icon-search"></i>
    <div class="h-search-container">
      <div class="h-search-input">
        <input type="text" v-model="inputValue" :placeholder="showPlaceholder" @input="inputTrigger(inputValue)" @keyup.enter="search(inputValue)"/>
        <i class="ui-icon-close" @click="search('')"></i>
      </div>
      <Button color="primary" v-if="showSearchButton" @click="search(inputValue)">
        <template v-if="$slots.default"><slot></slot></template>
        <template v-else>{{'h.search.searchText' | hlang(null, searchText)}}</template>
      </Button>
    </div>
    <i v-if="position=='end'" class="ui-icon-search ui-icon-search-end" @click="search(inputValue)"></i>
  </div>
</template>
<script>
const prefix = 'h-search';

export default {
  name: 'hSearch',
  props: {
    position: {
      type: String,
      default: 'end'
    },
    placeholder: {
      type: String
    },
    block: {
      type: Boolean,
      default: false
    },
    triggerType: {
      type: String,
      default: 'enter'
    },
    value: String,
    showSearchButton: {
      type: Boolean,
      default: false
    },
    searchText: {
      type: String,
    }
  },
  data() {
    return {
      inputValue: this.value,
    };
  },
  watch: {
    value() {
      this.inputValue = this.value;
    }
  },
  methods: {
    search(value) {
      this.inputValue = value;
      this.$emit('input', value);
      this.$emit('onsearch', value.trim());
      this.$emit('search', value.trim());
      this.$emit('change', value.trim());
    },
    inputTrigger(value) {
      if (this.triggerType == 'input') {
        this.search(value);
      } else {
        this.$emit('input', value);
      }
    }
  },
  computed: {
    showPlaceholder() {
      return this.placeholder || this.t('h.search.placeholder');
    },
    cls() {
      return {
        [`${prefix}`]: true,
        [`${prefix}-block`]: this.block,
        [`${prefix}-searching`]: this.value !== '' && this.value !== null && this.value !== undefined,
        [`${prefix}-has-button`]: this.showSearchButton,
        [`${prefix}-${this.position}`]: true,
      }
    }
  }
};
</script>