// concatenate two objects
function obcat(o1, o2) {
    
 for (var key in o2) {
  o1[key] = o2[key];
 }
 return o1;
}

if( typeof window.sanspapier == 'undefined')
{
  window.sanspapier = {};
  window.sanspapier.config = {};
}

var alertFallback = false;
   if (typeof console === "undefined" || typeof console.log === "undefined") {
     console = {};
     if (alertFallback) {
         console.log = function(msg) {
              alert(msg);
         };
     } else {
         console.log = function() {};
     }
   }


window.sanspapier.config['data_url'] = 'data/app.php/';
window.sanspapier.config['front_url'] = '/';   
window.sanspapier.config['images_url'] = 'http://www.sanspapier.com/images/books/';
window.sanspapier.config['publisher_images_url'] = 'http://www.sanspapier.com/images/publishers/';
window.sanspapier.config['solr_url'] = 'http://10.0.0.1:8983/solr/SolrCatalog/browse';
