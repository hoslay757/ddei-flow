import axios from 'axios';

const baseURL = 'http://127.0.0.1:8080';

const post = function(api,data,successFn,errorFn){

  let config = {
    method: 'post',
    url: baseURL + api,
    headers: {
      'Content-Type': 'text/plain' // 指定内容类型为JSON
    },
    data: data
  };
  axios(config)
    .then((response) => {
      if (successFn){
        successFn(response)
      }
    })
    .catch((error) => {
      if (errorFn) {
        errorFn(error)
      }
    });
}

const xml2graph = function(xml,fn){
  post("/bpmn/xml2graph",xml,fn)
}

export { xml2graph }





