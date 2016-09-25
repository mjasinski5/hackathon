import { observable, computed, asMap } from 'mobx';

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

export function createIncomeOutcomeChartData(income, outcome) {
  console.log('im here') 
  return  {
    labels: ['przychody', 'wydatki'],
    datasets: [
      {
        lineTension: 0,
        borderDash: [],
        borderDashOffset: 0.0,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [income, outcome, 0],
        backgroundColor: '#999999'
      }
    ]
  };
}

function _createEntry(obj, max) {
    return asMap({
        name: obj.name,
        value: obj.totalCash,
        minValue: minV,
        maxValue: max/2,
        baseValue: Math.round(obj.totalCash),
        chart: {
            color: obj.color
        }
    })
}


export function createDogHuntData(outcomes) { 
    const init = {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: [],
        borderWidth: []
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
          ],
          borderWidth: [
            ...result.datasets[0].borderWidth,
            0
          ]
        }]
      };
    }, init);
}

export function createDemographicsChartData(society){
  const init = {
    labels: [],
    datasets: [
      {
        label: 'ile ludzi',
        backgroundColor: '#00BCD4',
        hoverBackgroundColor: '#00BCD4',
        data: []
      }
    ]
  };

  return society.entries().reduce( (result, [key, value]) => {
    return {
      labels: [
        ...result.labels,
        key
      ],
      datasets: [{
        ...result.datasets[0],
        data: [
          ...result.datasets[0].data,
          value.size
        ]
      }]
    };
  }, init);
}