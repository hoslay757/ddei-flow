<script lang="ts">
export default {
  name: "ddei-flow-setting-button-demo",
  mixins: [],
  props: {
    //外部传入的插件扩展参数
    options: {
      type: Object,
      default: null
    },
    editor: {
      type: Object,
      default: null
    },
    model: {
      type: Object,
      default: null
    },
    
  },
  data() {
    return {

    };
  },
  computed: {},
  components: {},
  watch: {},
  created() { },
  mounted() {
  },
  methods: {

    test(){
      console.log(1)
    }
  }
};
</script>

<template>
    <svg class="icon-ddei-flow"
      @click="test()" aria-hidden="true">
      <use xlink:href="#icon-ddei-flow-setting"></use>
    </svg>
</template>