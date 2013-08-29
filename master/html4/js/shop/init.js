var init_obj = {
    'html':{
        'achats_html':""
    },
    'top': 0,
    'logged': false
}
function init_after() {
    obcat(window.sanspapier, init_obj);

    $('#mon_compte').click(function(){
        AjaxController.is_logged();
    });
    
    AjaxController.getOperationStatus();
    AjaxController.resetCategoriesMarkers();
    
    context();
}
