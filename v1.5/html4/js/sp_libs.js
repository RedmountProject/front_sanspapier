/*  Copyright (C) 2013 DELABY Benoit
    Copyright (C) 2013 GOGUELIN Thomas

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along
    with this program; if not, write to the Free Software Foundation, Inc.,
    51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */
var SPFormMapper = (function(){
    var exposed = {
      "createErrorElements": function(form_id){
        // get parent for global errors
        var parent = $('#'+form_id).parent();
        parent.prepend("<div id='sp_global_error_"+form_id+"' class='sp_global_error'></div>");
        // set rooms in child
        var inputs = this.sortInputs(form_id);
        for(i in inputs){
          var id = $(inputs[i]).attr('id');
          // display:inline; should be global CSS 
          $(inputs[i]).parent().append("<div style='display:inline;' class='sp_local_error' id='sp_local_error_"+id+"' class='sp_global_error'></div>");
        }
      },
      "removeErrorElements": function(form_id){
        $("#sp_global_error_"+form_id).remove();
        var inputs = this.sortInputs(form_id);
        for(i in inputs){
          var id = $(inputs[i]).attr('id');
          $('#sp_local_error_'+id).remove();
        }  
      },
      "sortInputs":function(form_id){
        
        
        var ainputs = $('#'+form_id+' :input'); // fetch all inputs
        var inputs = []; // interesting inputs
        // sort inputs (remove duplicates and hidden)
        var keys = {};
        ainputs.each(function(idx,elem){
          var type = $(elem).attr('type');
          if( type !== 'hidden' && type !== 'submit' && keys[type] !== 'password' && keys[type] !== 'email'){
            inputs.push(elem);
            keys[type] = type;
          }
        });
        return inputs;
      },
      "replaceForm": function(form_id, content){
        // hide this ugly form
        $('#'+form_id).hide();
        var parent = $('#'+form_id).parent();
        parent.prepend("<div id='sp_global_message_"+form_id+"' class='sp_global_message'>"+content+"</div>");
      },
      "displayErrors": function(form_id, errors){
         var form = $('#'+form_id); // get the form
         var parent = $(form).parent(); // the div right above the form
         var inputs = this.sortInputs(form_id);

         for(i in inputs){
             var id = $(inputs[i]).attr('id');
             for(j in errors){
               // take care of form global error
               if(errors[j][0] == "global"){
                 $("#sp_global_error_"+form_id).html(errors[j][1]);
               }
               var exp = new RegExp(errors[j][0],"gi");
               
               if(id.match(exp) !== null){
                 $("#sp_local_error_"+id).html(errors[j][1]);
               }
             }
         }
         
      }
    }
    return exposed;
  })();
  
  function parseEEEdate(pDate)
  {
    var date = new Date(pDate.substring(0,3)+','+pDate.substring(3,11)+pDate.substring(pDate.length-4,pDate.length)+pDate.substring(10,19));
    var finalDate = ("0" + date.getDate()).slice(-2)+'/'+("0" + date.getMonth()).slice(-2)+'/'+date.getFullYear();
    return(finalDate);
  }
  
  function array_filter (arr, func) {
  var retObj = {},
    k;

  func = func || function (v) {return v;};

  for (k in arr) {
    if (func(arr[k])) {
      retObj[k] = arr[k];
    }
  }

  return retObj;
}


function get_headers (url, format) {
  var req = this.window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
  if (!req) {
    throw new Error('XMLHttpRequest not supported');
  }
  var tmp, headers, pair, i, j = 0;

  req.open('HEAD', url, false);
  req.send(null);

  if (req.readyState < 3) {
    return false;
  }

  tmp = req.getAllResponseHeaders();
  tmp = tmp.split('\n');
  tmp = this.array_filter(tmp, function (value) {
    return value.substring(1) !== '';
  });
  headers = format ? {} : [];

  for (i in tmp) {
    if (format) {
      pair = tmp[i].split(':');
      headers[pair.splice(0, 1)] = pair.join(':').substring(1);
    } else {
      headers[j++] = tmp[i];
    }
  }
  return headers;
}


function filemtime (file) {
  var headers = {};
  headers = this.get_headers(file, 1);
  return (headers && headers['Last-Modified'] && Date.parse(headers['Last-Modified']) / 1000) || false;
}

function loadCSS(url) {
    if (document.createStyleSheet)
    {
        document.createStyleSheet(url);
    }
    else {
        $('<link rel="stylesheet" type="text/css" href="' + url + '" />').appendTo('head'); 
    }
}