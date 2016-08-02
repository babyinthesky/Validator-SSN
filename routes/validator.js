var express = require('express');
var router = express.Router();

var isNum=function(numStr){
  //check whether numStr is a string from number
  return /^\d+$/.test(numStr);
}

var sendErr=function(res,err){
  //http 200, false
  res.status(200).send('False: '+err);
  console.log(err);
  return -1;
}

/* Validator for SSN */
router.get('/', function(req, res, next) {
  id=req.query.ssn;
  console.log(id);

  res.set('Content-Type', 'text/plain');

  if(typeof id ==='undefined') {res.status(400).send('400 Invalid HTTP query. Valid query example: /validateSSN/?ssn=131052-308T');}
  //step1: check the format of input, string length has to be 11,
  // from which first 6 are digits, century is '-','+',or 'A'
  // 8th to 10th are digits
  if(id.length!==11) return sendErr(res,'SSN Length is not 11');

  if(!isNum(id.substr(0,6))) return sendErr(res,'Birthday is not a number');

  var century = id.substr(6,1);
  if((century!=='+')&&(century!=='-')&&(century!=='A')) return sendErr(res,'Century sign is wrong');

  var personNum = id.substr(7,3);
  if(!isNum(personNum)) return sendErr(res,'Individual number is not a number');

  //step2: validate birthday
  var day=parseInt(id.substr(0,2));
  var month=parseInt(id.substr(2,2));
  var year=parseInt(id.substr(4,2));

  if(month>0&&month<=12){
    if(day===0){return sendErr(res,'Birth day is equal to 0');}
    else{
      switch(month){
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12: {
                    if((day>0)&&(day<=31)){ break; }
                    else return sendErr(res,'Birth day does not match to month');
                  }
        case 4:
        case 6:
        case 9:
        case 11: {
                    if((day>0)&&(day<=30)){ break; }
                    else return sendErr(res,'Birth day does not match to month');
                  }
        case 2:  {
                    if((year%4!==0)&&(day<=28)){break;}
                    else if((year%100!=0)&&(day<=29)){break;}
                    else if((year%400!=0)&&(day<=28)){break;}
                    else if(day<=29){break;}
                    else return sendErr(res,'Birth day does not match to month Feb');
                }
      }
    }
  }
  else  return sendErr(res,'Birth month is not valid');

  if(century==='A'){
    var currentDate=new Date();
    year+=2000;
    if(year>currentDate.getFullYear()) return sendErr(res,'Birth year is in future');
  }

  //step3: validate individual number
  if(parseInt(personNum)<2||parseInt(personNum)>899) return sendErr(res,'Individual number is not valid');

  //step4: validate checksum
  var remainder = parseInt(id.substr(0,6)+id.substr(7,3)) % 31;
  var str='0123456789ABCDEFHJKLMNPRSTUVWXY';
  if(id.substr(10,1)!==str.substr(remainder,1)) return sendErr(res,'Checksum is not valid');

  //Passed all validation, and the result is true:
  res.status(200).send('True');
  return 0;
});

module.exports = router;
