'use strict';

const fs = require('fs');
const parser = require('xml2json');

function _e(key, value) { 
    return {
        id: key,
        name: value    
    }
}

const slownikDzialow = [
    _e("010", "Rolnictwo i łowiectwo"),
    _e("020", "Leśnictwo"),
    _e("050", "Rybołówstwo i rybactwo"),
    _e("100", "Górnictwo i kopalnictwo"),
    _e("150", "Przetwórstwo przemysłowe"),
    _e("400", "Wytwarzanie i zaopatrywanie w energię elektryczną, gaz i wodę"),
    _e("500", "Handel"),
    _e("550", "Hotele i restauracje"),
    _e("600", "Transport i łączność"),
    _e("630", "Turystyka"),
    _e("852", "Pomoc Spoleczna"),
    _e("921", "Kultura i ochrona dziedzictwa narodowego"),
    _e("700", "Gospodarka mieszkaniowa"),
    _e("710", "Działalność usługowa"),
    _e("720", "Informatyka"),
    _e("730", "Nauka"),
    _e("750", "Administracja publiczna"),
    _e("751", "Urzędy naczelnych organów władzy państwowej, kontroli i ochrony prawa oraz sądownictwa"),
    _e("752", "Obrona narodowa"),
    _e("753", "Obowiązkowe ubezpieczenia społeczne"),
    _e("754", "Bezpieczeństwo publiczne i ochrona przeciwpożarowa"),
    _e("755", "Wymiar sprawiedliwości"),
    _e("756", "Dochody od osób prawnych, od osób fizycznych i od innych jednostek nieposiadających osobowości prawnej oraz wydatki związane z ich poborem"),
    _e("757", "Obsługa długu publicznego"),
    _e("758", "Różne rozliczenia"),
    _e("801", "Oświata i wychowanie"),
    _e("803", "Szkolnictwo wyższe"),
    _e("851", "Ochrona zdrowia"),
    _e("7852", "Pomoc społeczna"),
    _e("853", "Pozostałe zadania w zakresie polityki społecznej"),
    _e("854", "Edukacyjna opieka wychowawcza"),
    _e("900", "Gospodarka komunalna i ochrona środowiska"),
    _e("853", "Kultura i ochrona dziedzictwa narodowego"),
    _e("925", "Ogrody botaniczne i zoologiczne oraz naturalne obszary i obiekty chronionej przyrody"),
    _e("926", "Kultura fizyczna")
]

fs.readFile('./xmlData.xml', 'utf-8', (err, data) => {
    const arrOfEntries2 = JSON.parse(parser.toJson(data)).Pozycje.Pozycja;
    // const arrOfEntries2 = arrOfEntries.splice(0, 1000);
    console.log('1')
    const resultArr = [];
    arrOfEntries2.forEach((el) =>{
        processEntry(el, resultArr);
    });

    const enrichedArr = sectionValueEnricher(resultArr);
    // console.log('enrichedArr', enrichedArr);
    const best = takeTheBest(enrichedArr)
    const sum = enricherBySum(best);
    // best.total = sum;

    const objToReturn = { 
        entries: best,
        total: sum
    }
    // console.log(arrOfEntries2);
    // console.log('=================')
    // console.log(JSON.stringify(resultArr, null, 4));
    fs.writeFile('./jsonData.json', JSON.stringify(resultArr, null, 3), (err) => { 
        console.log('Success, bitches.')
    });

    fs.writeFile('./jsonData2.json', JSON.stringify(objToReturn, null, 3), (err) => { 
        console.log('Success, bitches.')
    });

});

function processEntry(entry, resultArr){

    const findedElIndex = resultArr.findIndex((el) => { 
        return el.id == entry.Dzial;
    });
    findedElIndex === -1 ? resultArr.push(createTopicEntry(entry)) : processExisting(resultArr, entry, findedElIndex);

}


function processExisting(resultArr, el, findedElIndex) { 

    const elementToParse = resultArr[findedElIndex].rozdzialy;

    if(elementToParse && elementToParse.length && elementToParse.length > 0 ){
        const index = elementToParse.findIndex((o) => { 
            return o.id === el.Rozdzial;
        })

        if(index === -1) {
            elementToParse.push(createChapterEntry(el));
            // console.log('srsly')
        }
        else { 
            const paraObj = elementToParse[index].paragrafy;

            if(paraObj && paraObj.length && paraObj.length > 0) { 
                const paraIndex = paraObj.findIndex((o) => { 
                    return o.id === el.Paragraf;
                }); 
                const paraEntry = createParagraphEntry(el);
                elementToParse[index].paragrafy.push(paraEntry);
                // console.log('kurwa mac')
                // paraIndex === -1 ? 
                // elementToParse[index].Paragrafy = new Array(paraEntry) :
                // elementToParse[index].Paragrafy.push(paraEntry);
            } else {
                // console.log('kurwamac123') 
                elementToParse[index].paragrafy = new Array(createParagraphEntry(el));
            }
        }
    } else {
        resultArr[findedElIndex].rozdzialy = new Array(createChapterEntry(el));
    }
}


function createTopicEntry(el) {
    // console.log('el', el);
 return {
  id: el.Dzial,
  nazwa: resolveTopicName(el.Dzial),
  rozdzialy: [
      createChapterEntry(el)
   ]
 }
}

function createChapterEntry(el) {
  return {
    "id": el.Rozdzial,
    "nazwa": resolveChapterName(el.Rozdzial),
    "paragrafy": [
      createParagraphEntry(el)
    ]
  }
}

function createParagraphEntry(el) {
  return  {
    id: el.Paragraf,
    name: resolveParagraphName(el),
    type: el.P4,
    cash: {
      PL: el.PL,
      ZA: el.ZA,
      WW: el.WW
    }
  }
}

function resolveParagraphName() { 
    return "test";
}

function resolveChapterName(id) {
    return "name";
}

function resolveTopicName(id) { 
    const chapter = slownikDzialow.find((o) => { return o.id === id});
    const chapterName = chapter && chapter.name ? chapter.name : "Nie rozpoznano";
    if(!chapter)
    console.log('kurwaaaaa', id)
    return chapterName;
}

function sectionValueEnricher(sectionArr) { 
    const resultArr = [];

    sectionArr.forEach((o) => {
        let sum = 0;
         console.log(o.nazwa)
        o.rozdzialy.forEach((chapter) => { 
            console.log('nastepny rozdzial', chapter.paragrafy.length)

            chapter.paragrafy.forEach((para) => { 
                const numberToadd = Number(para.cash.PL);
                if(isNaN(numberToadd)) { 
                    console.log('NaN-shit', para);
                }
                sum += !isNaN(numberToadd) ? numberToadd : 0;
                // console.log('kwota:', numberToadd);
            });
        });
        resultArr.push({name: o.nazwa, totalCash: sum/1000000})
    });

    return resultArr;
}

function takeTheBest(arr) { 
    const sortedArr = arr.sort((a, b) => { 
        if(a.totalCash > b.totalCash)
            return -1;
        else return 1;
    });
    const best = sortedArr.slice(0, 12);
    const rest = sortedArr.slice(12);

    let sum = 0;
    rest.forEach((o) => { 
        const numberToadd = Number(o.totalCash);
        sum += !isNaN(numberToadd) ? numberToadd : 0;
    });

    best.push({name: "Pozostale wydatki", totalCash: sum});

    return best;
}

function enricherBySum(arr) { 
    let sum = 0;
    arr.forEach((o) => { 
        sum += o.totalCash;
    });

    return sum;
}