import { autorun } from 'mobx';

function notification(observableState){
  return function({filter, message, level }){
    return function(handler){
      let notify = false;
      return autorun(() => {
        if(notify && filter(observableState)){
          notify = false;
          return handler({message, level});
        }
        if(!filter(observableState)){
          notify = true;
        }
      });
    };
  };
}

export default notification;
