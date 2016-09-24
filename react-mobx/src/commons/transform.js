import { observable, computed, asMap } from 'mobx';

const maxV = 1000000;
const minV = 0;

export function createOutcomesFromJson(jsonData) {
    const mobxArr = asMap({});
    let entries;
    const max = jsonData.total;
    jsonData.entries.forEach((o) => { 
        const entry = _createEntry(o, max);
        mobxArr.set(o.name, entry);
    })

    return mobxArr;
}


function _createEntry(obj, max) {
    return asMap({
        name: obj.name,
        value: obj.totalCash,
        minValue: minV,
        maxValue: max/2,
        baseValue: Math.round(obj.totalCash),
        chart: {
            color: '#36A2EB' 
        }
    })
}


export function createDogHuntData(outcomes) { 
    const init = {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: []
      }]
    };

    return outcomes.values().reduce( (result, item) => {
      return {
        labels: [
          ...result.labels,
          item.get('name')
        ],
        datasets: [{
          data: [
            ...result.datasets[0].data,
            item.get('value')
          ],
          backgroundColor: [
            ...result.datasets[0].backgroundColor,
            item.get('chart').color
          ]
        }]
      };
    }, init);
}