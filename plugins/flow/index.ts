import DDeiFlowControls from "./controls";
import { DDeiPluginBase, DDeiEditor,DDeiUtil } from "ddei-editor";
import DDeiFlowLifeCycles from "./lifecycle"
import DDeiFlowDialogs from "./dialogs"

class DDeiFlow extends DDeiPluginBase {
  type: string = "package"


  /**
   * 缺省实例
   */
  static defaultIns: DDeiFlow = new DDeiFlow(null);

  controls: object = DDeiFlowControls;

  lifecycles: object = DDeiFlowLifeCycles;

  dialogs: object = DDeiFlowDialogs;

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