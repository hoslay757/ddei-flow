import DDeiFlowControls from "./controls";
import { DDeiPluginBase, DDeiEditor, DDeiUtil, DDeiCoreToolboxSimplePanel } from "ddei-editor";
import DDeiFlowLifeCycles from "./lifecycle"
import DDeiFlowDialogs from "./dialogs"
import { DDeiEditorUtil, DDeiExtSearch, DDeiExtQuickControl } from "ddei-editor"

class DDeiFlow extends DDeiPluginBase {
  type: string = "package"


  /**
   * 缺省实例
   */
  static defaultIns: DDeiFlow = new DDeiFlow({
    initConfig: {
      //覆盖
      rewrite: {
        currentLayout: "ddei-core-layout-simple",
        // config: {
        //   initData: {
        //     controls:
        //       [
        //         {
        //           id: "start",
        //           model: "1000001",
        //           offsetY: -150
        //         }
        //       ]
        //   }
        // }
      },
      //追加
      append: {
        extensions: [
          DDeiExtSearch,
          DDeiExtQuickControl,
          DDeiCoreToolboxSimplePanel.configuration({
            direct: 1,//方向，1纵向，2横向
            position: 8,//位置1-9顺时针，1为左上角，9为中心
            drag: 1,//是否允许拖拽位置
            dragCreate: 1,//是否在选择控件时创建一个控件
            groups: [
              {
                editMode: 1,
                desc: "选择",
                icon: `<svg class="icon" style="width: 28px; height: 28px;margin-left:-1px;margin-top:2px; " aria-hidden="true">
            <use xlink: href = "#icon-a-ziyuan432">< /use>
          </svg>`
              },
              {
                editMode: 4,
                desc: "连线",
                controls: [
                  "1000601"
                ]
              },
              {
                controls: [
                  "1000001",
                  "1000002",
                  "1000003",
                ]
              },
              {
                controls: [
                  "1000011",
                  "1000021",
                  "1000031",
                  "1000041",
                  "1000051",
                  "1000061",
                  "1000071",
                  "1000081",
                  "1000091",
                ]
              },
              {
                controls: [
                  "1000201",
                  "1000202",
                  "1000203",
                  "1000204",
                  "1000205",
                ]
              },
              {
                controls: [
                  "1000401",
                ]
              },
              {
                editMode: 2,
                desc: "注释",
                icon: `<svg class="icon-ddei-flow" style="width: 28px; height: 28px;margin-left:-1px;margin-top:2px; " aria-hidden="true">
                      <use xlink:href = "#icon-ddei-flow-comment">< /use>
                    </svg>`
              },
              {
                controls: [
                  "1000501",
                  "1000504",
                  "1000505",
                  "103010",
                  "103011"
                ]
              }
            ]
          })
        ]
      }
    }
  });

  controls: object = DDeiFlowControls;

  lifecycles: object = DDeiFlowLifeCycles;

  dialogs: object = DDeiFlowDialogs;


  //获取默认配置
  static getInitConfig() {
    return DDeiFlow.defaultIns.getInitConfig()
  }

  getInitConfig(){
    return this.options?.initConfig
  }

  getOptions(): object {
    let options = {}
    let array = [this.controls, this.lifecycles,this.dialogs]
    array.forEach(plugin => {
      if (DDeiPluginBase.isSubclass(plugin, DDeiPluginBase)) {
        options = Object.assign({}, options, plugin.defaultIns.getOptions())
      } else if (plugin instanceof DDeiPluginBase) {
        options = Object.assign({}, options, plugin.getOptions())
      }
    });
    return options;
  }


  getControls(editor) {
    if (DDeiPluginBase.isSubclass(this.controls, DDeiPluginBase)) {
      return this.controls.defaultIns.getControls(editor);
    } else if (this.controls instanceof DDeiPluginBase) {
      return this.controls.getControls(editor);
    }
  }

  getGroups(editor) {
    if (DDeiPluginBase.isSubclass(this.controls, DDeiPluginBase)) {
      return this.controls.defaultIns.getGroups(editor);
    } else if (this.controls instanceof DDeiPluginBase) {
      return this.controls.getGroups(editor);
    }
  }

  getLifeCyclies(editor: DDeiEditor) {
    if (DDeiPluginBase.isSubclass(this.lifecycles, DDeiPluginBase)) {
      return this.lifecycles.defaultIns.getLifeCyclies(editor);
    } else if (this.lifecycles instanceof DDeiPluginBase) {
      return this.lifecycles.getLifeCyclies(editor);
    }
  }

  getDialogs(editor) {
    if (DDeiPluginBase.isSubclass(this.dialogs, DDeiPluginBase)) {
      return this.dialogs.defaultIns.getDialogs(editor);
    } else if (this.dialogs instanceof DDeiPluginBase) {
      return this.dialogs.getDialogs(editor);
    }
  }

  installed(editor: DDeiEditor) {
    //复写判定隐藏的方法，增加subprocess的情况
    DDeiUtil.isModelHidden = this.createModelHiddenProxy(DDeiUtil.isModelHidden)
    DDeiEditorUtil.lineInitJSON = {
      modelCode: "1000601",
    };
  }



  // 代理方法的工厂函数
  createModelHiddenProxy(originalFunc) {
    return function proxy() {
      let model = arguments[0]
      let hidden = originalFunc.apply(this, arguments);
      if (!hidden){
        let stage = model.stage
        if(model.includePModelId){
          let subProcessModel = stage.getModelById(model.includePModelId)
          if (subProcessModel){
            if (!subProcessModel.isExpand){
              return true
            }else{
              return DDeiUtil.isModelHidden(subProcessModel)
            }
          }
          
        }else if(model.baseModelType == 'DDeiLine'){
          let distLinks = stage.getDistModelLinks(model.id);
          if (distLinks?.length == 2){
            let hiddenOne = DDeiUtil.isModelHidden(distLinks[0].sm)
            let hiddenTwo = DDeiUtil.isModelHidden(distLinks[1].sm)
            return hiddenOne && hiddenTwo
          }
        }
      }
      return hidden
    };
  }

  

  static configuration(options) {
    let core = new DDeiFlow(options);
    core.controls = core.controls.configuration(options, true)
    core.lifecycles = core.lifecycles.configuration(options, true)
    core.dialogs = core.dialogs.configuration(options, true)
    return core;
  }
}


export * from "./controls"
export * from "./lifecycle"

export { DDeiFlow }
export default DDeiFlow;