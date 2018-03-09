$.fn.exists = function () {
    return this.length !== 0;
  }
  
  function filldefaults()
  {
    var mabIRSize = $("input[id^='mabirsize']" ).val();
    var mabIRNetworkBW = $("input[id^='mabirnetworkbw']" ).val();
    var mabIRNetworkBWReserve = $("input[id^='mabirnetworkbwreserve']" ).val();

    var oneTB=1024*1024*1024*1024;
    if ( !mabIRSize || !mabIRNetworkBW || !mabIRNetworkBWReserve) 
    {
      console.log('Some of the inputs are not set, hence returning');
      return;
    }
  }
  
  function secondsToString(seconds)
  {
    var numyears = Math.floor(seconds / 31536000);
    var numdays = Math.floor((seconds % 31536000) / 86400); 
    var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
    var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
    var numseconds = Math.floor((((seconds % 31536000) % 86400) % 3600) % 60);

    var rVal = "";
    if ( numyears > 0 ) {
      rVal += numyears + " years ";
    }
    if ( numdays > 0 ) {
      rVal += numdays + " days ";
    }
    if ( numhours > 0 ) {
      rVal += numhours + " hours ";
    } 

    if ( numminutes > 0 ) {
      rVal += numminutes + " minutes ";
    }

    if ( numseconds > 0 ) {
      rVal += numseconds + " seconds";
    }    

    return rVal;
  }
  
  function evalmabinputs() {
    validation.validate();
    if ( !validation.isValid() ) return false;
      var mabIRSizeInTB = $("input[id^='mabirsize']" ).val();
      var mabIRNetworkBWInMbps = $("input[id^='mabirnetworkbw']" ).val();
      var mabIRNetworkBWReserve = $("input[id^='mabirnetworkbwreserve']" ).val();

      var oneTB=1024*1024*1024*1024;
      var oneMB= 1024*1024;

      console.log('MAB IR Size: ' + mabIRSizeInTB);
      console.log('MAB Network Size: ' + mabIRNetworkBWInMbps);
      console.log('MAB IR Network Reserve Ratio: ' + mabIRNetworkBWReserve);

      var timeToUploadViaNetwork = (+100 * mabIRSizeInTB * oneTB) / (+mabIRNetworkBWInMbps * mabIRNetworkBWReserve * oneMB);
      var timeToUplodad = secondsToString(timeToUploadViaNetwork);
      var timeToUplodadDesc = "Total time to upload via network: ";
      console.log(timeToUplodadDesc + timeToUplodad);

      var timeToCopytoDisk = (+100 * mabIRSizeInTB * oneTB) / (+49 * oneMB * 70)
      var timeToCopy = secondsToString(timeToCopytoDisk);
      var timeToCopyDesc = "Total time to create the backup: ";
      console.log(timeToCopyDesc + timeToCopytoDisk);

      var tableValue = {}; // no need for an array
      tableValue[timeToUplodadDesc] = timeToUplodad;
      tableValue[timeToCopyDesc] = timeToCopy;

      console.log('Printing hash:');
      Object.keys(tableValue).forEach(function(key, index) {
        console.log(key + '=' + this[key]);
      }, tableValue);
      
      var tbl = document.createElement('table');
      tbl.setAttribute('class', 'table table-condensed');
      tbl.setAttribute('id', 'breakupdetails');
      
      //headers
      var theaders=["Details", "Value"];
      var thead = document.createElement('thead');
      var theadrow = document.createElement('tr');
      
      var arrayLength = theaders.length;
      for (var i = 0; i < arrayLength; i++) {
        var theadth = document.createElement('th');
        theadth.textContent = theaders[i];
        theadrow.appendChild(theadth);
      }
      thead.appendChild(theadrow);
      tbl.appendChild(thead);
      
      var tbdy = document.createElement('tbody');          

      Object.keys(tableValue).forEach(function(key, index) {
        var tbdytr = document.createElement('tr');

        var tbdytdName = document.createElement('td');
        tbdytdName.textContent = key;
        tbdytr.appendChild(tbdytdName);

        var tbdytdValue = document.createElement('td');
        tbdytdValue.textContent = this[key];            
        tbdytr.appendChild(tbdytdValue);

        console.log('Row Name = '+ key + ' Row value =' + this[key]);
        tbdy.appendChild(tbdytr);
      }, tableValue);

      tbl.appendChild(tbdy);

      if ($("#breakupdetails").exists() ) {
        $("#breakupdetails").remove();
      }

      if ($("#featuredetail").exists() ) {
        $("#featuredetail").remove();
      }

      if ($("#viewanalysisbutton").exists() ) {
        $("#viewanalysisbutton").remove();
      }
      
      var elem1 = document.createElement('div');
      elem1.setAttribute('class', 'col-lg-16 my-auto');
      elem1.setAttribute('id', 'featuredetail');

      var elem2 = document.createElement('div');
      elem2.setAttribute('class', 'container-fluid');

      var elem3 = document.createElement('div');
      elem3.setAttribute('class', 'row');

      //add total time to upload via network
      elem3.appendChild(createFeatureItem('icon-arrow-up-circle', timeToUplodad, timeToUplodadDesc));
      console.log(timeToUplodadDesc + timeToUplodad);

      //add total time to upload via network
      elem3.appendChild(createFeatureItem('icon-doc', timeToCopy, timeToCopyDesc));
      console.log(timeToCopyDesc + timeToCopy);

      elem2.appendChild(elem3);
      elem1.appendChild(elem2);

      $("#featuredetails").append(elem1);
      $("#featuredetails").append(tbl);

      var viewAnalysisButton = document.createElement('button');
      viewAnalysisButton.setAttribute('class','btn btn-primary');
      viewAnalysisButton.setAttribute('tabindex','12');
      viewAnalysisButton.setAttribute('id','viewanalysisbutton');
      viewAnalysisButton.setAttribute('href','#features');
      viewAnalysisButton.textContent = 'View Analysis';

      $('#submitbutton').after(viewAnalysisButton);

      location.hash = "features";
      
      return false; //to avoid refresh returing false
    } 

    function createFeatureItem(icon, title, desc)
    {          
      var elem4 = document.createElement('div');
      elem4.setAttribute('class', 'col-lg-6');
      
      var elem5 = document.createElement('div');
      elem5.setAttribute('class', 'feature-item');

      var elem6 = document.createElement('i');
      elem6.setAttribute('class', icon + ' text-primary');

      var elem7 = document.createElement('h3');
      elem7.textContent = title;

      var elem8 = document.createElement('p');
      elem8.setAttribute('class', 'text-muted');
      elem8.textContent = desc;

      elem5.appendChild(elem6);
      elem5.appendChild(elem7);
      elem5.appendChild(elem8);

      elem4.appendChild(elem5);

      return elem4;
    }

    var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
    var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

    function inWords (num) {
        if ((num = num.toString()).length > 9) return 'overflow';
        n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) return; var str = '';
        str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
        str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
        str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
        str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
        str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
        return str;
    }