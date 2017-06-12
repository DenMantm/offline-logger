
var ping = require('ping');
var fs = require('fs');

  var host = 'google.com';
  
  
  //logic variables
  var wroteRecord = false;
  var checkingRecordEnd = true;
  var testVar = true;
  
  
  var record;
  var startTime,finishTime;
  
    setInterval(()=>{  
          ping.sys.probe(host, function(isAlive){
        var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
        console.log(msg);
        
        if(isAlive){
          if(!checkingRecordEnd){
            checkingRecordEnd = true;
            wroteRecord = false;
            
            finishTime = new Date();
            

            var minutes = Math.floor(((finishTime - startTime)/1000)/60);
            var seconds = Math.floor(((finishTime - startTime)/1000));
            
            record = record+" -- Offline time end: "+ getDateTime(finishTime) + " Total time offline: "+minutes+" min "+seconds%60+" sec";
            
            fs.appendFile('log.txt', record+'\r\n', function (err) {
              if (err) throw err;
              console.log('Saved!');
            });
            
            console.log(record);
            record = '';
          }
        }
        else{
          if(!wroteRecord){
            
            startTime = new Date();
            
            record = "Offline time start: "+ getDateTime(startTime);
            
            wroteRecord = true;
            checkingRecordEnd = false;
          }
        }
        
    });
    }, 8000);


function getDateTime(date) {
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + "/" + month + "/" + day + " - " + hour + ":" + min + ":" + sec;

}

//TEST Here

//changing variable



    setInterval(()=>{  
  testVar = !testVar;
    }, 3000);