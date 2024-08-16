import DDeiFlowControls from "./controls";
import { DDeiPluginBase } from "ddei-editor";


class DDeiFlow extends DDeiPluginBase {
  type: string = "package"


  /**
   * 缺省实例
   */
  static defaultIns: DDeiFlow = new DDeiFlow(null);

  controls: object = DDeiFlowControls;

  getOptions(): object {
    let options = {}
    let array = [this.controls]
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

  

  static configuration(options) {
    let core = new DDeiFlow(options);
    core.controls = core.controls.configuration(options, true)
    return core;
  }
}


export * from "./controls"

export { DDeiFlow }
export default DDeiFlow;