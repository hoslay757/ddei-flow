<template>
  <div :id="editor?.id + '_' + dialogId" :style="{ transform: 'scale(' + stageRatio + ')' }"
    class="ddei-flow-setting-button-dialog" v-if="forceRefresh">
    <div class="content" :style="{ 'flex-direction': model?.bpmnBaseType !='Event' ? 'column' : ''}">
      <div v-for="btn in options?.buttons" style="display:contents">
        <component v-if="btn.viewer && validItemCondition(btn)" :is="btn.viewer" :editor="editor" :options="options"
          :model="model" v-bind="btn">
        </component>
        <svg class="icon-ddei-flow"
          v-if="!btn.viewer && btn.id == 'ddei-flow-edit-property' && validItemCondition(btn) && controlDefine?.subject == 'bpmn'"
          @mouseenter="settingMouseEnter($el)" @mouseleave="settingMouseEnterLeave($el)" aria-hidden="true">
          <use xlink:href="#icon-ddei-flow-setting"></use>
        </svg>
        <svg class="icon-ddei-flow"
          v-if="!btn.viewer && btn.id == 'ddei-flow-choose-activity' && validItemCondition(btn) && model?.bpmnType == 'CallActivityTask'"
          @mousedown="startChooseActivity($el)" aria-hidden="true">
          <use xlink:href="#icon-ddei-flow-link"></use>
        </svg>
        <svg class="icon-ddei-flow"
          v-if="!btn.viewer && btn.id == 'ddei-flow-expand-or-not' && validItemCondition(btn) && model?.allowIncludeModel"
          @click="expandOrNotSubProcess()" aria-hidden="true">
          <use v-if="!model?.isExpand" xlink:href="#icon-ddei-flow-sub-process-marker"></use>
          <use v-if="model?.isExpand" xlink:href="#icon-ddei-flow-sub-process-expand-marker"></use>
        </svg>
        <svg class="icon-ddei-flow"
          v-if="!btn.viewer && btn.id == 'ddei-flow-lock-or-unlock' && validItemCondition(btn) && model?.allowIncludeModel && model.isExpand == 1 && !model.lock"
          @click="subProcessLock()" aria-hidden="true">
          <use xlink:href="#icon-ddei-flow-lock"></use>
        </svg>
        <svg class="icon-ddei-flow"
          v-if="!btn.viewer && btn.id == 'ddei-flow-lock-or-unlock' && validItemCondition(btn) && model?.allowIncludeModel && model.isExpand == 1 && model.lock"
          @click="subProcessUnLock()" aria-hidden="true">
          <use xlink:href="#icon-ddei-flow-unlock"></use>
        </svg>
        <svg class="icon-ddei-flow"
          v-if="!btn.viewer && btn.id == 'ddei-flow-remove-control' && validItemCondition(btn) "
          @click="deleteElement($el)" aria-hidden="true">
          <use xlink:href="#icon-ddei-flow-trash"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { DDeiEditorUtil, DDeiUtil, DDeiConfig, DDeiLink, DDeiAbstractShape, DDeiEditorState } from "ddei-editor";
import DialogBase from "./dialog"
import { Matrix3, Vector3 } from "ddei-editor"
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
      controlDefine:null,
      bpmnSubTypeDataSource:null
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

    validItemCondition(btn) {
      if(!this.editor.ddInstance["AC_DESIGN_EDIT"]){
        return false;
      }
      if (!btn.condition) {
        return true;
      } else {
        let func = new Function("model", "btn", "editor", "component", "return " + btn.condition)
        let rs = func(this.model, btn, this.editor, this)
        return rs
      }
    },

    startChooseActivity(evt){
      this.editor.tempChooseCallActivity = this.model
    },
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
          let controlDefine = DDeiEditorUtil.getControlDefine(this.model);
          let ds = controlDefine.attrDefineMap.get("bpmnSubType")?.dataSource
          if (ds?.length > 0) {
            for (let i = 0; i < ds.length; i++) {
              if (ds[i].value == this.model.bpmnSubType) {
                this.bpmnSubTypeIndex = i
                break;
              }
            }
          }
          this.bpmnSubTypeDataSource = ds
          this.controlDefine = controlDefine
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
      let layer = model.layer
      let ddInstance = stage.ddInstance
      //计算位置，显示按钮div
      let editor = DDeiEditorUtil.getEditorInsByDDei(ddInstance);
      if (editor) {
        
        let scaleX = 1, scaleY = 1;
        let targetWidth, targetHeight
        let includeModels = getIncludeModels(model)
        //当前关闭，则展开
        if (!model.isExpand) {
          //展开当前容器下所有控件大小和坐标
          targetWidth = model.otherWidth ? model.otherWidth : 300
          targetHeight = model.otherHeight ? model.otherHeight : 200
          //记录当前大小
          model.otherWidth = model.width
          model.otherHeight = model.height
          model.isExpand = 1
          //恢复连线关系
          //找到原有被收折的连线
          let subLinks = stage.getSourceModelLinks(model.id)
          subLinks?.forEach(subLink => {
            if(subLink.oldMid && subLink.oldSmpath){
              let subModel = layer.getModelById(subLink.oldMid)
              if(subModel){
                let subModelLinks = stage.getSourceModelLinks(subModel.id)
                subModelLinks.forEach(subModelLink => {
                  if (subModelLink.smpath == subLink.oldSmpath){
                    subModelLink.disabled = false
                    let sourcePV = subModelLink.getSourcePV()
                    let distPV = subModelLink.getDistPV()
                    distPV.x = sourcePV.x
                    distPV.y = sourcePV.y
                  }
                });
              }
              stage.removeLink(subLink)
              subModel?.updateLinkModels()
            }
          });
          
          model.updateLinkModels()
        }
        //展开，则关闭
        else {
          //展开当前容器下所有控件大小和坐标
          targetWidth = model.otherWidth
          targetHeight = model.otherHeight
          //记录当前大小
          model.otherWidth = model.width
          model.otherHeight = model.height
          model.isExpand = 0
          //调整连线关系，将内部控件移动到外部控件
          //获取所有连线,只有一个端点在内部，且不为model的才需要调整
          let lines = []
          includeModels.forEach(ims=>{
            if (ims.attachPModel != model.id){
              //获取连线
              let sublinks = stage.getSourceModelLinks(ims.id)
              sublinks?.forEach(slink => {
                if (!slink.disabled && slink.dm){
                  if (lines.indexOf(slink.dm) == -1){
                    lines.push(slink.dm)
                  }else{
                    lines.splice(lines.indexOf(slink.dm),1)
                  }
                }
              });
            }
          })
          for(let ln = lines.length-1;ln>=0;ln--){
            let line = lines[ln]
            let sourceLinks = stage.getDistModelLinks(line.id)
            let finded = false;
            let inLink
            for (let sl = 0; sl < sourceLinks.length;sl++){
              if (!sourceLinks[sl].disabled){
                if (sourceLinks[sl].sm == model){
                  finded = true
                  break;
                }
                if(includeModels.indexOf(sourceLinks[sl].sm) != -1){
                  inLink = sourceLinks[sl]
                }
              }
            }
            
            if(finded){
              lines.splice(ln,1)
            }
            //调整连线关系
            else if (inLink){
              let distPV = inLink.getDistPV()
              inLink.disabled = true
              //找到出口方向交点
              let crossPoint
              let pvs = inLink.dm.pvs
              let projPoint
              if(inLink.dmpath == 'startPoint'){
                for (let li = 0; li < pvs.length-1;li++){
                  let p1 = pvs[li]
                  let p2 = pvs[li+1]
                  for (let pi = 0; pi < model.operatePVS.length; pi++) {
                    let p3 = model.operatePVS[pi]
                    let p4 = model.operatePVS[pi + 1]
                    if (pi == model.operatePVS.length - 1) {
                      p3 = model.operatePVS[0]
                      p4 = model.operatePVS[pi]
                    }
                    crossPoint = DDeiUtil.getLineCorssPoint(p1, p2, p3, p4);
                    if (crossPoint) {
                      break;
                    }
                    if (crossPoint) {
                      break;
                    }
                  }
                }
              }else{
                for (let li = pvs.length-1; li >0; li--) {
                  let p1 = pvs[li]
                  let p2 = pvs[li - 1]
                  for (let pi = 0; pi < model.operatePVS.length; pi++) {
                    let p3 = model.operatePVS[pi]
                    let p4 = model.operatePVS[pi + 1]
                    if (pi == model.operatePVS.length - 1) {
                      p3 = model.operatePVS[0]
                      p4 = model.operatePVS[pi]
                    }
                    crossPoint = DDeiUtil.getLineCorssPoint(p1, p2, p3, p4);
                    if (crossPoint) {
                      break;
                    }
                  }
                  if (crossPoint){
                    break;
                  }
                }
              }

              if (crossPoint){
                projPoint = model.getProjPoint({x:crossPoint.x,y:crossPoint.y})
              }
              if (!projPoint){
                let proPoints
                if (inLink.dmpath == 'startPoint') {
                  proPoints = DDeiAbstractShape.getProjPointDists(model.operatePVS, inLink.dm.startPoint.x, inLink.dm.startPoint.y, true, 1);
                }else{
                  proPoints = DDeiAbstractShape.getProjPointDists(model.operatePVS, inLink.dm.endPoint.x, inLink.dm.endPoint.y, true, 1);
                }
                
                projPoint = proPoints[0]
              }
              
          
              //创建新的连接点
              let id = "_" + DDeiUtil.getUniqueCode()
              model.exPvs[id] = new Vector3(projPoint.x, projPoint.y, 1)
              
              model.exPvs[id].rate = projPoint.rate
              model.exPvs[id].sita = projPoint.sita
              model.exPvs[id].index = projPoint.index
              model.exPvs[id].id = id
              
              distPV.x = projPoint.x
              distPV.y = projPoint.y
              
              let link = new DDeiLink({
                sm: model,
                dm: inLink.dm,
                smpath: "exPvs." + id,
                dmpath: inLink.dmpath,
                stage: stage
              });
              link.oldSmpath = inLink.smpath
              link.oldMid = inLink.sm.id
              stage.addLink(link)

            }
          }
          
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
          
          model.transVectors(m1)
          includeModels?.forEach(im=>{
            im.transVectors(m1)
            im.updateLinkModels()
          })
          

          //展开时才会扩展，扩展后不收缩
          if (model.isExpand == 1) {
            let deltaWidth = (targetWidth - model.otherWidth) / 2
            let deltaHeight = (targetHeight - model.otherHeight) / 2
            this.extParentBounds(model, deltaWidth, deltaHeight)
          
          }
          includeModels?.forEach(im => {
            im.updateLinkModels()
          })
          model.updateLinkModels()
          
   
        }
        //通知改变
        editor.notifyChange()

        DDeiEditorUtil.closeDialog(editor, 'ddei-flow-setting-button-dialog')
        DDeiEditorUtil.closeDialog(editor, 'ddei-flow-element-setting-dialog')

      }
    },

    //扩展上级控件大小以及位置
    extParentBounds(model,deltaWidth,deltaHeight){
      let stage = model.stage
      let layer = model.layer
      //获取本级所有控件
      let curLevelModels = []
      let parentSubProcess
      if (model.includePModelId) {
        parentSubProcess = stage.getModelById(model.includePModelId)
        parentSubProcess?.includeModels.forEach(includeModelid => {
          if (includeModelid != model.id) {
            let subModel = stage.getModelById(includeModelid)
            if (subModel && subModel.baseModelType != 'DDeiLine') {
              curLevelModels.push(subModel)
            }
          }
        })

      } else {
        let layerModels = layer.getSubModels()
        layerModels.forEach(lm => {
          if (lm && lm.baseModelType != 'DDeiLine' && !lm.includePModelId && lm.id != model.id) {
            curLevelModels.push(lm)
          }
        });
      }
      //扩展后的矩形
      let modelRect = DDeiAbstractShape.getOutRectByPV([model])

      //对比curLevelModels的控件，如果出现了外接矩形交叉，则扩展本级
      let needExt = false
      for (let c = 0; c < curLevelModels.length; c++) {
        let rect = DDeiAbstractShape.getOutRectByPV([curLevelModels[c]])
        if (DDeiUtil.isRectCross(modelRect, rect)) {
          needExt = true;
          break;
        }
      }

      if (needExt) {
        //改变本级其他控件位置
        curLevelModels.forEach(subModel => {
          if (subModel.baseModelType != 'DDeiLine' && subModel.attachPModel != model.id) {
            //对比控件的cpv，如果x相等，位置不变
            let moveX = 0, moveY = 0
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

              if (subModel.allowIncludeModel) {
                let includeModels1 = getIncludeModels(subModel)
                includeModels1.forEach(lms => {
                  lms.transVectors(m2)
                  lms.updateLinkModels()
                });
              }
            }
          }
          subModel.updateLinkModels()
        });
      }
      if (parentSubProcess) {
        let parentRect = DDeiAbstractShape.getOutRectByPV([parentSubProcess])
        //对比上级控件大小，如果超出了，则扩展，扩展时预留20的空间出来
        let rect = DDeiAbstractShape.getOutRectByPV([...curLevelModels, model])

        if (!(parentRect.x + 20 <= rect.x && parentRect.x1 - 20 >= rect.x1
          && parentRect.y + 20 <= rect.y && parentRect.y1 - 20 >= rect.y1)) {
          //扩展父控件
          // let parentScaleX = (parentRect.width+deltaWidth*2) / parentRect.width
          // let parentScaleY = (parentRect.height + deltaHeight * 2) / parentRect.height
          let parentScaleX = (rect.width + 40) / parentRect.width
          let parentScaleY = (rect.height + 40) / parentRect.height
          //构建缩放矩阵
          let m1 = new Matrix3()
          let move1Matrix = new Matrix3(
            1, 0, -parentSubProcess.cpv.x,
            0, 1, -parentSubProcess.cpv.y,
            0, 0, 1);
          m1.premultiply(move1Matrix)
          if (parentSubProcess.rotate) {
            let angle = DDeiUtil.preciseTimes(parentSubProcess.rotate, DDeiConfig.ROTATE_UNIT)
            let rotateMatrix = new Matrix3(
              Math.cos(angle), Math.sin(angle), 0,
              -Math.sin(angle), Math.cos(angle), 0,
              0, 0, 1);
            m1.premultiply(rotateMatrix)
          }
          let scaleMatrix = new Matrix3(
            parentScaleX, 0, 0,
            0, parentScaleY, 0,
            0, 0, 1);
          m1.premultiply(scaleMatrix)
          if (parentSubProcess.rotate) {
            let angle = DDeiUtil.preciseTimes(-parentSubProcess.rotate, DDeiConfig.ROTATE_UNIT)
            let rotateMatrix = new Matrix3(
              Math.cos(angle), Math.sin(angle), 0,
              -Math.sin(angle), Math.cos(angle), 0,
              0, 0, 1);
            m1.premultiply(rotateMatrix)
          }
          let move2Matrix = new Matrix3(
            1, 0, parentSubProcess.cpv.x + (rect.x + rect.width / 2 - parentRect.x - parentRect.width / 2),
            0, 1, parentSubProcess.cpv.y + (rect.y + rect.height / 2 - parentRect.y - parentRect.height / 2),
            0, 0, 1);
          m1.premultiply(move2Matrix)

          // let move3Matrix = new Matrix3(
          //   1, 0, deltaWidth,
          //   0, 1, deltaHeight,
          //   0, 0, 1);
          // m1.premultiply(move3Matrix)
          parentSubProcess.transVectors(m1)

          // curLevelModels.forEach(subModel => {
          //   if (subModel.baseModelType != 'DDeiLine') {
          //     subModel.transVectors(move3Matrix)
          //     subModel.updateLinkModels()
          //   }
          // });
          // let includeModels2 = getIncludeModels(model)
          // includeModels2.forEach(lms => {
          //   lms.transVectors(move3Matrix)
          //   lms.updateLinkModels()
          // });
          // model.transVectors(move3Matrix)
          // model.updateLinkModels()
          this.extParentBounds(parentSubProcess, (rect.width + 40) - parentRect.width, (rect.height + 40) - parentRect.height)
          parentSubProcess.updateLinkModels()
        }
      }

    },

    subProcessUnLock() {
      delete this.model.lock
    },
    subProcessLock() {
      this.model.lock = 1;
    },

    deleteElement() {
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
        cursor: pointer;
      }

    }
    
  }
    
}
</style>
