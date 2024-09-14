<template>
  <div :id="editor?.id + '_' + dialogId" :style="{ transform: 'scale(' + stageRatio + ')' }"
    class="ddei-flow-setting-button-dialog" v-if="forceRefresh">
    <div class="content" :style="{ 'flex-direction': model?.bpmnBaseType !='Event' ? 'column' : ''}">
      <svg class="icon-ddei-flow" @mouseenter="settingMouseEnter($el)" @mouseleave="settingMouseEnterLeave($el)"
        aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-setting"></use>
      </svg>
      <svg class="icon-ddei-flow" v-if="model?.bpmnType == 'SubProcess'" @click="expandOrNotSubProcess()"
        aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-sub-process-marker"></use>
      </svg>
      <svg class="icon-ddei-flow" v-if="model?.bpmnType == 'SubProcess' && model.isExpand == 1 && !model.lock"
        @click="subProcessLock()" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-lock"></use>
      </svg>
      <svg class="icon-ddei-flow" v-if="model?.bpmnType == 'SubProcess' && model.isExpand == 1 && model.lock"
        @click="subProcessUnLock()" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-unlock"></use>
      </svg>
      <svg class="icon-ddei-flow" @click="deleteElement($el)" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-trash"></use>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { DDeiEditorUtil, DDeiUtil, DDeiConfig, DDeiEnumBusCommandType } from "ddei-editor";
import DialogBase from "./dialog"
import { Matrix3 } from "three"
import { getIncludeModels } from "../controls/util"

export default {
  name: "ddei-flow-setting-button-dialog",
  mixins: [DialogBase],
  props: {
    //外部传入的插件扩展参数
    options: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      dialogId: 'ddei-flow-setting-button-dialog',
      model:null,
      stageRatio:1,
    };
  },
  computed: {},
  components: {},
  watch: {},
  created() { },
  mounted() {
    this.editor.dialogs[this.dialogId].viewer = this
    this.refreshData()
  },
  methods: {

    forceRefreshView: function () {
      this.forceRefresh = false
      this.$nextTick(() => {
        this.forceRefresh = true;
        if (this.refreshData) {
          this.refreshData();
        }
      });
    },
    refreshData() {
      
      if (this.editor.tempPopData) {
        this.model = this.editor.tempPopData[this.dialogId]?.model
        
        if (this.model) {
          this.stageRatio = this.model.getStageRatio()
        }

      }
    },
    settingMouseEnter(srcElement) {
      this.showSettingDialog(srcElement)
    },

    settingMouseEnterLeave(srcElement) {
      delete this.editor.tempOperateModel
    },

    showSettingDialog(srcElement) {
      let editor = this.editor
      if (editor.tempOperateModel) {
        let model = editor.tempOperateModel
        if (model) {
          let left,top 
          if(this.model.bpmnBaseType == 'Event'){
            left = srcElement.offsetLeft  + ((-5.5) * (this.stageRatio - 1))
            top = srcElement.offsetTop + srcElement.clientHeight + ((5.5) * (this.stageRatio - 1))
          }else{
            left = srcElement.offsetLeft + srcElement.clientWidth + ((5.5) * (this.stageRatio - 1))
            top = srcElement.offsetTop + ((-5.5) * (this.stageRatio - 1))
          }
          DDeiEditorUtil.showDialog(editor, 'ddei-flow-element-setting-dialog', {
            group: "ddei-flow-element-setting",
            model: model
          }, { type: 99, left: left, top: top, hiddenMask: true }, null, true, true)

        }
      }
    },

    expandOrNotSubProcess() {
      let model = this.model
      let stage = model.stage
      let ddInstance = stage.ddInstance
      //计算位置，显示按钮div
      let editor = DDeiEditorUtil.getEditorInsByDDei(ddInstance);
      if (editor) {
        //当前关闭，则展开
        let scaleX = 1, scaleY = 1;
        let targetWidth, targetHeight
        let container = model.pModel
        let hidden = false
        if (!model.isExpand) {
          //展开当前容器下所有控件大小和坐标
          targetWidth = model.otherWidth ? model.otherWidth : 300
          targetHeight = model.otherHeight ? model.otherHeight : 200
          //记录当前大小
          model.otherWidth = model.width
          model.otherHeight = model.height
          model.isExpand = 1
        }
        //展开，则关闭
        else {
          hidden = true
          //展开当前容器下所有控件大小和坐标
          targetWidth = model.otherWidth
          targetHeight = model.otherHeight
          //记录当前大小
          model.otherWidth = model.width
          model.otherHeight = model.height
          model.isExpand = 0
        }
        scaleX = targetWidth / model.otherWidth
        scaleY = targetHeight / model.otherHeight
        //构建缩放矩阵
        if (scaleX != 1 || scaleY != 1) {
          let m1 = new Matrix3()
          let move1Matrix = new Matrix3(
            1, 0, -model.cpv.x,
            0, 1, -model.cpv.y,
            0, 0, 1);
          m1.premultiply(move1Matrix)
          if (model.rotate) {
            let angle = DDeiUtil.preciseTimes(model.rotate, DDeiConfig.ROTATE_UNIT)
            let rotateMatrix = new Matrix3(
              Math.cos(angle), Math.sin(angle), 0,
              -Math.sin(angle), Math.cos(angle), 0,
              0, 0, 1);
            m1.premultiply(rotateMatrix)
          }
          let scaleMatrix = new Matrix3(
            scaleX, 0, 0,
            0, scaleY, 0,
            0, 0, 1);
          m1.premultiply(scaleMatrix)
          if (model.rotate) {
            let angle = DDeiUtil.preciseTimes(-model.rotate, DDeiConfig.ROTATE_UNIT)
            let rotateMatrix = new Matrix3(
              Math.cos(angle), Math.sin(angle), 0,
              -Math.sin(angle), Math.cos(angle), 0,
              0, 0, 1);
            m1.premultiply(rotateMatrix)
          }
          let move2Matrix = new Matrix3(
            1, 0, model.cpv.x,
            0, 1, model.cpv.y,
            0, 0, 1);
          m1.premultiply(move2Matrix)
          let includeModels = getIncludeModels(model)
          model.transVectors(m1)
          includeModels?.forEach(im=>{
            im.hidden = hidden
            im.transVectors(m1)
          })
          //TODO HIDDEN不牢靠
          //TODO 内部的用自己m1，外部用m2，改为有空间则撑开，没空间则扩展更好
          //TODO 删除后联动删除，或提示
          //TODO tempZIndex的调整
          //TODO 线和影子图形的显示
          //TODO hidden以后不响应事件
          //TODO 事件的层级，确保里面的控件能够显示小按钮
          let deltaWidth = (targetWidth - model.otherWidth) / 2
          let deltaHeight = (targetHeight - model.otherHeight) / 2
          //改变其他控件位置
          container.midList.forEach(mid => {
            if (mid != model.id){
              let subModel = container.models.get(mid);
              if (subModel.baseModelType != 'DDeiLine') {
                if (includeModels.indexOf(subModel) == -1) {
                  if (!subModel.includePModelId){
                    //对比控件的cpv，如果x相等，位置不变
                    let moveX = 0, moveY = 0
                    if (!subModel.includePModelId){
                      if (subModel.cpv.x > model.cpv.x) {
                        moveX = deltaWidth
                      } else if (subModel.cpv.x < model.cpv.x) {
                        moveX = -deltaWidth
                      }
                      if (subModel.cpv.y > model.cpv.y) {
                        moveY = deltaHeight
                      } else if (subModel.cpv.y < model.cpv.y) {
                        moveY = -deltaHeight
                      }
                    
                    
                      if (moveX || moveY) {
                        let m2 = new Matrix3(
                          1, 0, moveX,
                          0, 1, moveY,
                          0, 0, 1);
                        subModel.transVectors(m2)

                        if(subModel.bpmnType == 'SubProcess'){
                          let includeModels1 = getIncludeModels(subModel)
                          includeModels1.forEach(lms=>{
                            lms.transVectors(m2)
                          });
                        }
                      }
                      
                    }
                  }
                }
              }
            }
          });
          //重新计算连线
          container.midList.forEach(mid => {
            let subModel = container.models.get(mid);
            subModel.updateLinkModels()
          });
        }
        //通知改变
        editor.notifyChange()

        DDeiEditorUtil.closeDialog(editor, 'ddei-flow-setting-button-dialog')
        DDeiEditorUtil.closeDialog(editor, 'ddei-flow-element-setting-dialog')

      }
    },

    subProcessUnLock() {
      delete this.model.lock
    },
    subProcessLock() {
      this.model.lock = 1;
    },

    deleteElement(srcElement) {
      let stage = this.model.stage
      stage.removeModel(this.model, true)
    },
  }
};
</script>

<style lang="less" scoped>
.ddei-flow-setting-button-dialog {
  display: none;
  position: absolute;
  z-index: 99900;
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    
    justify-content: start;
    align-items: center;
    .icon-ddei-flow{
      width: 11px;
      height: 11px;
      opacity: 0.5;
      margin-bottom: 2px;
      margin-right: 2px;
      &:hover {
        opacity: 1.0;
      }

    }
    
  }
    
}
</style>
