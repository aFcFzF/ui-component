<template>
  <i :class="'el-icon-' + name"></i>
</template>

<script>
    export default {
        name: 'UiIcon',

        props: {
            name: String
        }
    };
</script>
