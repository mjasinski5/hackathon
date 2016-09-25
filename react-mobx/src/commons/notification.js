import { autorun } from 'mobx';

const defaultOptions = {
  autoDismiss: 0,
  position: 'tc'
};

function notification(observableState){
  return function({filter, message, level, title }){
    return function(handler){
      let notify = false;
      return autorun(() => {
        if(notify && filter(observableState)){
          notify = false;
          return handler({...defaultOptions, message, level, title});
        }
        if(!filter(observableState)){
          notify = true;
        }
      });
    };
  };
}

export default notification;
