<script lang="ts">
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'

export default {
  name: "ddei-flow-bpmn-viewer-callactivity-task",
  props: {
    model: {
      type: Object,
      default: null
    },
    editor: {
      type: Object,
      default: null
    }
  },

  methods:{
    refreshView(model, vNode, tempShape, composeRender){
      if (this.model.activityId){
        if (this.model.upActivityId != this.model.activityId){
          this.model.upActivityId = this.model.activityId
          //获取另一个元素的控件
          let viewModel = this.model.stage.getModelById(this.model.activityId)
          if (viewModel){
            viewModel = this.getCallActivityTask(viewModel)
            if (this.model.displayView){
              this.$refs['viewDiv'].innerHTML = "加载中"
              setTimeout(() => {
                this.editor.flow.toImage([viewModel]).then(html => {
                  if (html) {
                    this.$refs['viewDiv'].innerHTML = ""
                    this.$refs['viewDiv'].style.backgroundImage = 'url(' + html + ')'
                  }
                })
              }, 30);
            }else{
              this.$refs['viewDiv'].style.backgroundImage = ""
              this.$refs['viewDiv'].innerHTML = "<div style='flex:1'>"+(viewModel.name ? viewModel.name : viewModel.code ? viewModel.code : viewModel.id)+"</div>"
            }
            
          }
        }
      }
    },

    getCallActivityTask(model){
      if (model.bpmnType == 'CallActivityTask') {
        if (model.activityId){
          let viewModel = this.model.stage.getModelById(model.activityId)
          if (viewModel) {
            model = this.getCallActivityTask(viewModel)
          }
        }
      }
      return model
    }
  }

  
};
</script>
<template>
  <div ref="divElement" class="ddei-flow-bpmn-viewer-callactivity-task">
    <div v-if="!model || !model.activityId" class="title">
      <div class="text" >
        {{ "调用" }}
      </div>
    </div>
    <div v-if="model?.activityId" ref="viewDiv" class="view">
    </div>
    <div class="markers">
      <svg class="icon-ddei-flow" v-if="model.isLoop == 1" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-loop-marker"></use>
      </svg>
      <svg class="icon-ddei-flow" v-if="model.multiInstance == 1 && model.isParallel != 1" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-sequential-mi-marker"></use>
      </svg>
      <svg class="icon-ddei-flow" v-if="model.multiInstance == 1 && model.isParallel == 1" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-parallel-mi-marker"></use>
      </svg>
      <svg class="icon-ddei-flow" v-if="model.isCompensation == 1" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-compensation-marker"></use>
      </svg>
    </div>
  </div>
</template>

<style lang="less" scoped>
.ddei-flow-bpmn-viewer-callactivity-task {
  
  background: var(--fillColor);
  position: absolute;
  color: var(--text);
  font-size: 14px;
  border:var(--borderWidth) var(--borderType) var(--borderColor);
  border-radius: var(--borderRound);
  pointer-events:none;
  user-select: none;
  display: none;
  .title{
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--fontColor);
    font-family: var(--fontFamily);
    font-size: var(--fontSize);
    font-style: var(--fontStyle);
    font-weight: var(--fontWeight);
    text-decoration: var(--textDecoration);
    .icon-ddei-flow {
      position: absolute;
      left:0px;
      top:0px;
      width: 24px;
      height:24px;
    }

    .text {
      flex: 1;
      white-space: nowrap;
      padding:2px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

  }
  .view {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--fontColor);
    font-family: var(--fontFamily);
    font-size: var(--fontSize);
    font-style: var(--fontStyle);
    font-weight: var(--fontWeight);
    text-decoration: var(--textDecoration);
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    .text {
      flex: 1;
      white-space: nowrap;
      padding: 2px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .markers {
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    .icon-ddei-flow {
      width: 18px;
      height: 18px;
    }
  }
}
</style>