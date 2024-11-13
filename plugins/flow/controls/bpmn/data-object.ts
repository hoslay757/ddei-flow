import { showSettingButton } from "../util"

export default {
  id: '1000501',
  name: 'ddei.flow.dataobj',
  code: 'data',
  desc: 'bpmn中的数据对象',
  from: '100500',
  subject: 'bpmn',
  define: {
    width: 30,
    height: 39,
    dataType:1,
    bpmnBaseType: 'Other',
    bpmnType:"DataObject",
    bpmnSubType: 1,
    name: "ddei.flow.dataobj",
    //2为极坐标，以cpv为圆心，半径r采样获得点，在以width/100、height/100的的原始比例进行缩放
    poly: 2,
    //采样信息
    sample: {
      //依附图形的初始化配置，如果产生依附图形，则会在配置的位置生成
      depPos: {
        type: 8  //位置5中心点，6789上右下左
      },
      depProps: {
        "8": "name"   //映射属性
      },
      //一圈4次采样
      loop: 4,
      //初始次采样的开始角度
      angle: 0,
      //半径距离
      r: 50,
      //允许文本输入
      textInput: 1,
      //采样的规则，多组采样返回多组规则
      rules: [
        `(i, sample, pvs, model, ovs){
          let weight = 25
          let x=sample.x,y=sample.y
            switch(i){
              case 0:
                pvs.push({begin:1,x:x,y:y,select:1,clip:1,oppoint:2,stroke:1,fill:1});
              break;
              case 1:
                pvs[0].y=y
                pvs.push({x:x,y:y,select:1,clip:1,stroke:1,oppoint:2,fill:1});
              break;
              case 2:
                pvs[1].x=x
                pvs.push({x:x,y:y,select:1,clip:1,stroke:1,oppoint:2,fill:1});
              break;
              case 3:
                pvs[2].y=y
                x = pvs[0].x
                pvs.push({x:x-weight,y:y,select:1,clip:1,stroke:1,oppoint:2,fill:1});
                pvs.push({x:x,y:y+weight,select:1,clip:1,stroke:1,oppoint:2,op2close:1,fill:1,end:1});
               
              break;
            }
        }`,
        `(i, sample, pvs, model, ovs){
          if(i==3){
            pvs.push({x:25,y:sample.y,stroke:1,type:1,begin:1});
            pvs.push({x:25,y:sample.y+25,stroke:1,type:1});  
            pvs.push({x:50,y:sample.y+25,stroke:1,type:1});  
            pvs.push({x:50,y:sample.y+25,end:1});  
          }
        }`,
        //输入输出箭头
        `(i, sample, pvs, model, ovs){
          if(model.bpmnSubType == 2 || model.bpmnSubType == 3){
              switch(i){
                case 3:
                  let fill =  model.bpmnSubType == 3 ? 1 : 0
                  let stroke = model.bpmnSubType == 2 ? 1 : 0
                  pvs.push({begin:1,x:-35,y:-30,stroke:stroke,fill:fill,fillColor:'border'});
                  pvs.push({x:-15,y:-30,stroke:stroke});
                  pvs.push({x:-15,y:-35,stroke:stroke});
                  pvs.push({x:0,y:-25,stroke:stroke});
                  pvs.push({x:-15,y:-15,stroke:stroke});
                  pvs.push({x:-15,y:-20,stroke:stroke});
                  pvs.push({end:1,x:-35,y:-20,stroke:stroke});
                break;
              }
            }
        }`,

        //数据集合图标
        `(i, sample, pvs, model, ovs){
          if(model.isCollection){
              switch(i){
                case 3:
                  let fill =  1
                  let stroke = 1
                  pvs.push({begin:1,x:0,y:25,stroke:stroke,fill:fill,fillColor:'border'});
                  pvs.push({x:0,y:43,stroke:stroke});
                  pvs.push({x:0,y:43,stroke:stroke});
                  pvs.push({end:1,x:0,y:25,stroke:stroke});

                  pvs.push({begin:1,x:-8,y:25,stroke:stroke,fill:fill,fillColor:'border'});
                  pvs.push({x:-8,y:43,stroke:stroke});
                  pvs.push({x:-8,y:43,stroke:stroke});
                  pvs.push({end:1,x:-8,y:25,stroke:stroke});

                  pvs.push({begin:1,x:8,y:25,stroke:stroke,fill:fill,fillColor:'border'});
                  pvs.push({x:8,y:43,stroke:stroke});
                  pvs.push({x:8,y:43,stroke:stroke});
                  pvs.push({end:1,x:8,y:25,stroke:stroke});
                break;
              }
            }
        }`,
        //文本
        `(i, sample, pvs, model, ovs){
          if(sample.textInput){
            let weight = 25
            let x=sample.x,y=sample.y
              switch(i){
                case 0:
                  pvs.push({begin:1,x:x,y:y,text:1});
                break;
                case 1:
                  pvs[0].y=y
                  pvs.push({x:x,y:y,text:1});
                break;
                case 2:
                  pvs[1].x=x
                  pvs.push({x:x,y:y,text:1});
                break;
                case 3:
                  pvs[2].y=y+weight
                  x = pvs[0].x
                  pvs.push({x:x,y:pvs[2].y,text:1});
                break;
              }
            }
        }`,

      ]
    },
    ext: {
      attrs: [
        {
          'code': 'code',
          'name': 'ddei.code',
          'desc': '编码，一般用于业务标识',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "data",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': 'ddei.name',
          'desc': '名称，一般用于显示',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "数据",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'bpmnSubType',
          'name': 'ddei.type',
          'desc': '控件的主体显示文本',
          'controlType': 'combox',
          'dataType': 'integer',
          'dataSource': [
            { 'text': 'ddei.flow.property.ds.default', 'value': 1 }, { 'text': 'ddei.flow.property.ds.input', 'value': 2 }, { 'text': 'ddei.flow.property.ds.output', 'value': 3 }
          ],
          'itemStyle': { width: 80, height: 25, col: 2, row: 0 },
          'defaultValue': 1,
          'type': [1, 2], //类别，1图形，2业务，3事件
        },
        {
          'code': 'dataType',
          'name': 'ddei.flow.property.datatype',
          'desc': '数据的类型，可以是内置类型，也可以由外部定义',
          'controlType': 'combox',
          'dataType': 'integer',
          'dataSource': [
            { text: "ddei.flow.property.ds.string", 'value': 1 }, { 'text': 'ddei.flow.property.ds.integer', 'value': 2 },
            { 'text': 'ddei.flow.property.ds.long', 'value': 3 }, { 'text': 'ddei.flow.property.ds.float', 'value': 4 },
            { 'text': 'ddei.flow.property.ds.double', 'value': 5 }, { 'text': 'ddei.flow.property.ds.boolean', 'value': 6 },
            { 'text': 'ddei.flow.property.ds.datetime', 'value': 7 }, { 'text': 'ddei.flow.property.ds.custom', 'value': 8 }
          ],
          'itemStyle': { width: 100, height: 25, col: 2, row: 0 },
          'defaultValue': 1,
          'type': [1, 2], //类别，1图形，2业务，3事件
        },
        {
          'code': 'isCollection',
          'name': 'ddei.flow.datacoll',
          'desc': '是否为数据集合',
          'controlType': 'switch-checkbox',
          'dataType': 'integer',
          'display': 'column',
          'hiddenTitle': true,
          'defaultValue': 0,
          'type': [1, 2], //类别，1图形，2业务，3事件
        },
        {
          'code': 'desc',
          'name': 'ddei.description',
          'desc': '备注说明',
          'controlType': 'textarea',
          'dataType': 'string',
          'defaultValue': "数据对象节点",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
      ]
    }
  },

  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-data-object"></use>
      </svg>`,
  EVENT_MOUSE_MOVE_IN_CONTROL: showSettingButton
}

