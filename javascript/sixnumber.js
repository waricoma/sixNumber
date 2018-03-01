'use strict';

const numberInput = [
  parseFloat(process.argv[2]) || 10,
  parseFloat(process.argv[3]) || 9,
  parseFloat(process.argv[4]) || 25,
  parseFloat(process.argv[5]) || 1,
  parseFloat(process.argv[6]) || 100,
  parseFloat(process.argv[7]) || 1
];
const input = [numberInput[0]+'', numberInput[1]+'', numberInput[2]+'', numberInput[3]+'', numberInput[4]+'', numberInput[5]+''];

const question = parseFloat(process.argv[8]) || 271;

let duplicateTimesArray = [];
for(let i = 0; i < 6; i++){
  if(duplicateTimesArray[ input[i] ] === undefined) duplicateTimesArray[ input[i] ] = 0;
  duplicateTimesArray[ input[i] ]++;
}

let targetInput = 0;

let sixMap = {};

for(let a = 0; a < 6; a++){
  if(input[a] in sixMap){
    break;
  }else{
    sixMap[input[a]] = {};
  }
  for(let b = 0; b < 6; b++){
    targetInput= input[b];
    if(targetInput in sixMap[input[a]]){
      break;
    }else{
      sixMap[input[a]][targetInput] = {};
    }
    for(let c = 0; c < 6; c++){
      targetInput= input[c];
      if(targetInput in sixMap[input[a]][input[b]]){
        break;
      }else{
        sixMap[input[a]][input[b]][targetInput] = {};
      }
      for(let d = 0; d < 6; d++){
        targetInput= input[d];
        if(targetInput in sixMap[input[a]][input[b]][input[c]]){
          break;
        }else{
          sixMap[input[a]][input[b]][input[c]][targetInput] = {};
        }
        for(let e = 0; e < 6; e++){
          targetInput= input[e];
          if(targetInput in sixMap[input[a]][input[b]][input[c]][input[d]]){
            break;
          }else{
            sixMap[input[a]][input[b]][input[c]][input[d]][targetInput] = {};
          }
          for(let f = 0; f < 6; f++){
            targetInput= input[f];
            if(targetInput in sixMap[input[a]][input[b]][input[c]][input[d]][input[e]]){
              break;
            }else{
              sixMap[input[a]][input[b]][input[c]][input[d]][input[e]][targetInput] = {};
            }
          }
        }
      }
    }
  }
}

let signs = [];
let ssigns = [];
let calculations = [];
let calculationsLen = 0;
let calculationDesk = 0;
let excludingStamp = true;
let thatKeyCount = 0;
let calculatingSymbol = ['+' , '-' , '*' , '/'];
let execution = true;

function calculation(oneFloor ,sings ,calculations){

  oneFloor = parseInt(oneFloor ,10);
  calculationDesk = oneFloor;
  calculationsLen = calculations.length;
  for(let i = 0; i < calculationsLen; i++){
    calculations[i] = parseInt(calculations[i] ,10);
    if(sings[i] == 0){
      calculationDesk += calculations[i];
    }else if(calculationDesk < calculations[i]){
      excludingStamp = false;
    }else if(sings[i] == 1){
      calculationDesk -= calculations[i];
    }else if(sings[i] == 2){
      calculationDesk *= calculations[i];
    }else if(calculationDesk < calculations[i]||calculations[i] == 0||calculationDesk == 0){
      excludingStamp = false;
    }else if(sings[i] == 3){
      calculationDesk /= calculations[i];
    }
  }
  if(excludingStamp&&calculationDesk == question){
    let singss = sings;
    calculations.unshift(oneFloor);
    for(let i = 0; i < 6; i++){
      thatKeyCount = calculations.filter(function (search) { return search === numberInput[i]; }).length;
      if(duplicateTimesArray[numberInput[i]] < thatKeyCount){
        excludingStamp = false;
        break;
      }
    }
    if(excludingStamp){
      let resultReportCalculationDesk = calculations[0];
      let resultReportText = calculations[0] + '';
      let calculationsLen = calculations.length;
      for(let i = 1; i < calculationsLen; i++){
        let j = i - 1;
        if(i != calculationsLen){
          resultReportText += ' ' + calculatingSymbol[ singss[j] ] + ' ';
          if(sings[j] == 0){
            resultReportCalculationDesk += calculations[i];
          }else if(sings[j] == 1){
            resultReportCalculationDesk -= calculations[i];
          }else if(sings[j] == 2){
            resultReportCalculationDesk *= calculations[i];
          }else if(sings[j] == 3){
            resultReportCalculationDesk /= calculations[i];
          }
          resultReportText += calculations[i] + ' = ' + resultReportCalculationDesk + '\n';
          if(i != calculationsLen-1) resultReportText += resultReportCalculationDesk;
        }
      }
      console.log(resultReportText);
      process.exit();
    }
  }
  excludingStamp = true;

}

for(let oneFloor in sixMap){
  for(let a = 0; a < 4; a++){
    for(let twoFloor in sixMap[oneFloor]){
      let sings = [a];
      calculations = [twoFloor];
      calculation(oneFloor ,sings ,calculations);
    }
  }
}

for(let oneFloor in sixMap){
  for(let a = 0; a < 4; a++){
    for(let twoFloor in sixMap[oneFloor]){
      for(let b = 0; b < 4; b++){
        for(let threeFloor in sixMap[oneFloor][twoFloor]){
          let sings = [a ,b];
          calculations = [twoFloor ,threeFloor];
          calculation(oneFloor ,sings ,calculations);
        }
      }
    }
  }
}

for(let oneFloor in sixMap){
  for(let a = 0; a < 4; a++){
    for(let twoFloor in sixMap[oneFloor]){
      for(let b = 0; b < 4; b++){
        for(let threeFloor in sixMap[oneFloor][twoFloor]){
          for(let c = 0; c < 4; c++){
            for(let fourFloor in sixMap[oneFloor][twoFloor][threeFloor]){
              let sings = [a ,b ,c];
              calculations = [twoFloor ,threeFloor ,fourFloor];
              calculation(oneFloor ,sings ,calculations);
            }
          }
        }
      }
    }
  }
}

for(let oneFloor in sixMap){
  for(let a = 0; a < 4; a++){
    for(let twoFloor in sixMap[oneFloor]){
      for(let b = 0; b < 4; b++){
        for(let threeFloor in sixMap[oneFloor][twoFloor]){
          for(let c = 0; c < 4; c++){
            for(let fourFloor in sixMap[oneFloor][twoFloor][threeFloor]){
              for(let d = 0; d < 4; d++){
                for(let fiveFloor in sixMap[oneFloor][twoFloor][threeFloor][fourFloor]){
                  let sings = [a ,b ,c ,d];
                  calculations = [twoFloor ,threeFloor ,fourFloor ,fiveFloor];
                  calculation(oneFloor ,sings ,calculations);
                }
              }
            }
          }
        }
      }
    }
  }
}

for(let oneFloor in sixMap){
  for(let a = 0; a < 4; a++){
    for(let twoFloor in sixMap[oneFloor]){
      for(let b = 0; b < 4; b++){
        for(let threeFloor in sixMap[oneFloor][twoFloor]){
          for(let c = 0; c < 4; c++){
            for(let fourFloor in sixMap[oneFloor][twoFloor][threeFloor]){
              for(let d = 0; d < 4; d++){
                for(let fiveFloor in sixMap[oneFloor][twoFloor][threeFloor][fourFloor]){
                  for(let e = 0; e < 4; e++){
                    for(let sixFloor in sixMap[oneFloor][twoFloor][threeFloor][fourFloor][fiveFloor]){
                      let sings = [a ,b ,c ,d ,e];
                      calculations = [twoFloor ,threeFloor ,fourFloor ,fiveFloor ,sixFloor];
                      calculation(oneFloor ,sings ,calculations);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
