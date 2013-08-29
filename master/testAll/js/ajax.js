

var AjaxController = (function() {  
    
    var books_url = window.sanspapier.config.data_url;
    
    var controller = {
        "search": function(query, page, extension, callback) {
            var url = books_url+"books/search/"+query+"/"+page+"."+extension;
            $.get(url,callback);
        },
        "findAround": function(book_id, page , extension, callback) {
            var url = books_url+"books/findAround/"+book_id+"/"+page+"."+extension;
            $.get(url,callback);
        },
        "bookSheet": function(book_id, extension, callback) {
            var url = books_url+"books/bookSheet/"+book_id+"."+extension;
            $.get(url,callback);
        },
        "bookDisplays": function(category, number, extension, callback) {
            var url = books_url+"books/displays/"+category+"/"+number+"."+extension;
            $.get(url,callback);
        }
    };
    return controller;
})();


function parseJson(jsonFile, divId) {
    var result = jsonFile;
    console.log(result);
    //$('#'+divId).append();
};