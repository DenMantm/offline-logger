
var ping = require('ping');
var fs = require('fs');

  //var host = 'google.com';
  var hosts = ['192.168.1.1', 'google.com', 'yahoo.com'];
  
  //logic variables
  var wroteRecord = false;
  var checkingRecordEnd = true;
  var testVar = true;
  
  var someAreAlive = 0;
  
  var record;
  var startTime,finishTime;
  
    setInterval(()=>{
      
      for (var i = 0;i<hosts.length;i++){
        
        //current host
        var host = hosts[i];
      
          ping.sys.probe(host, function(isAlive){
        var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
        console.log(msg);
        
        if(isAlive){
          someAreAlive++;
        }
        
        //changes depending on the host count
        if(i == hosts.length-1){
          
        
        if(someAreAlive>0){
          someAreAlive = 0;
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
        
        }//enf if i
        
    });
    }
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