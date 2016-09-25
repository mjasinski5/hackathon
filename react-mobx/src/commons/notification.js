import { autorun } from 'mobx';

const defaultOptions = {
  autoDismiss: 0
};

function notification(observableState){
  return function({filter, message, level }){
    return function(handler){
      let notify = false;
      return autorun(() => {
        if(notify && filter(observableState)){
          notify = false;
          return handler({...defaultOptions, message, level});
        }
        if(!filter(observableState)){
          notify = true;
        }
      });
    };
  };
}

export default notification;
