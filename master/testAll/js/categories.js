
var initCategoryInteraction = function() {
    
    var sp = window.sanspapier;
    
    $("#categories li").each(function() {
        var liClass = $(this).attr('class');
        sp.categories.container.push(liClass);
    });   
    
    var category = function(title, txt) {
        this.title = title;
        this.text = txt;
    }
    
    for(var i=1; i<11; i++) {
        var title = "category "+i;
        var text = "category"+" "+i+" Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
        var cat = new category(title, text);
        
        sp.categories.category.push(cat);  
    }
    
    
    $('#categories span').each(function(index){
        $(this).text(sp.categories.category[index].title);
    })
    
    
    //// stuff for spreadcol1 interaction
    
    /*spread_col('column1','column4','column5','column2','column3','1');
    spread_col('column2','column4','column5','column1','column3','2');
    spread_col('column3','column1','column5','column2','column4','3');
    spread_col('column4','column1','column2','column5','column3','4');
    spread_col('column5','column1','column2','column3','column4','5');*/
    
    changeCat();
    spread_col2('column1','1');
    spread_col2('column2','2');
    spread_col2('column3','3');
    spread_col2('column4','4');
    spread_col2('column5','5');
    
    $.get(sp.config.data_url+'books/latest.json',function(data){
       parseJson(data, "#columns");
    });
}

function changeCat() {
    
    var sp = window.sanspapier;
    
    $(".change_col").removeClass("mon_compte");
    $(".change_col").addClass("a_la_une");
    
    var changeBool = 0;    
    
    this.activate = $(".onglet");
    this.moncompte = $(".mon_compte");
    this.sanspap = $(".propo");
    
    this.moncompte.click(function(){
        changeBool = 1;
    });
    
    this.sanspap.click(function(){
        changeBool = 0;
    });
    
    this.activate.click(function(){
    if(changeBool==0)
    {
        $(".change_col").removeClass("mon_compte");
        $(".change_col").addClass("a_la_une");
        
        $('#categories span').each(function(index){
            $(this).text(sp.categories.category[index].title);
        })
    }

    if(changeBool==1)
    {
        $(".change_col").addClass("mon_compte");
        $(".change_col").removeClass("a_la_une");
        
        $('#categories span').each(function(index){
            $(this).text(sp.categories.category[index+5].title);
        })
    }    
    });
    
}

function spread_col2(parent,id) { 
    
    this.id = id;
    this.parent = parent;
    this.activate = $("."+this.parent+" .activateSpread");
    
    if(id==2)
        var margin = 0;
    else if(id>2 && id!=5)
        var margin = -192 * (id-2);
    else if(id==5)
        var margin = -192 * 2;
    
    var gab_time = 300;
    var cont_time = 200;

    this.activate.click(function(){
        
        if($("."+ parent).width() == 172) {
            
            $("."+ parent).animate({'width' : '552px'},gab_time);
            
            $("."+ parent+" .fiche_mosaique").animate({'height' : '295px'},0);
            
            $("#columns").animate({'margin-left' : margin+"px"}, gab_time);
            $("#categories").animate({'margin-left' : margin+"px"}, gab_time);
        
            $(".col_"+id).animate({'width' : '550px'}, cont_time);
            
            $(".col_"+id+" .titre_auteur").animate({
                'margin-left' : '10px',
                'width' : '370px'}, cont_time);
            
            $(".col_"+id+" .titreMo").animate({
                'width' : '370'}, cont_time);
            
            $(".col_"+id+" .textMo").animate({
                'margin-left' : '10px',
                'width' : '370px'}, cont_time);
            
            $(".col_"+id+" .infos_achatMo").animate({
                'width' : '350px',
                'margin-left' : '10px',
                'margin-top' : '5px'}, cont_time);
            
            $(".col_"+id+" .link").animate({
                'width' : '290px',
                'margin-left' : '10px'}, cont_time);
            
            $(".col_"+id+" .imageMo").animate({
                'height' : '290px'}, cont_time);
           
           
            for(var i=1;i<6;i++){
                if(i!=id){
                    $(".column"+i).animate({'width' : '172px'}, gab_time);
                    
                    //$("#columns").animate({'margin-left' : '50px'}, animate_time);
                    
                    $(".col_"+i).animate({
                        'width' : '170px'}, cont_time);
                    
                    $(".col_"+i+" .titre_auteur").animate({
                        'margin-left' : '0px',
                        'width' : '170px'}, cont_time);
                    
                    $(".col_"+i+" .titreMo").animate({
                        'width' : '170px'}, cont_time);
                    
                    $(".col_"+i+" .textMo").animate({
                        'margin-left' : '0px',
                        'width' : '170px'}, cont_time);
                    
                    $(".col_"+i+" .infos_achatMo").animate({
                        'width' : '170px',
                        'margin-left' : '0px',
                        'margin-top' : '10px'}, cont_time);
                    
                    $(".col_"+i+" .link").animate({
                        'width' : '170px', 
                        'margin-left' : '0px'}, cont_time);
                    
                    $(".col_"+i+" .imageMo").animate({
                        'height' : '257px'}, cont_time);
                }
            }
        }
    
        else {
            $("."+ parent).animate({'width' : '172px'}, cont_time);
            
            $("."+ parent+" .fiche_mosaique").animate({'height' : '610px'},0);
            
            $("#columns").animate({'margin-left' : '0px'}, cont_time);
            $("#categories").animate({'margin-left' : '0px'}, cont_time);
            
            $(".col_"+id).animate({
                'width' : '170px'}, gab_time);
            
            $(".col_"+id+" .titre_auteur").animate({
                'margin-left' : '0px',
                'width' : '170px'}, gab_time);
            
            $(".col_"+id+" .titreMo").animate({
                'width' : '170px'}, cont_time);
            
            $(".col_"+id+" .textMo").animate({
                'margin-left' : '0px',
                'width' : '170px'}, gab_time);
            
            $(".col_"+id+" .infos_achatMo").animate({
                'width' : '170px',
                'margin-left' : '0px',
                'margin-top' : '10px'}, gab_time);
            
            $(".col_"+id+" .link").animate({
                'width' : '170px',
                'margin-left' : '0px'}, gab_time);
            
            $(".col_"+id+" .imageMo").animate({
                'height' : '257px'}, gab_time);
        
        }
    });    
    
}

/// version1 spreadcol : hide and show sur le changement de largeur

/*function spread_col(parent,toHide1,toHide2,toNarrow1,toNarrow2,id) { 
    
    this.id = id;
    this.parent=parent;
    this.activate = $("."+this.parent+" .activateSpread");
            
    var animate_time = 300;
    var show_time = 300;

    this.activate.click(function(){
        if($("."+ parent).hasClass("grid_1")) {
        
            $("."+ toNarrow1).show(show_time);
            $("."+ toNarrow2).show(show_time);
        
            $(".col_"+id).animate({'width' : '550px'}, animate_time);
            
            $(".col_"+id+" .titre_auteur").animate({
                'margin-left' : '10px',
                'width' : '370px'}, animate_time);
            
            $(".col_"+id+" .textMo").animate({
                'margin-left' : '10px',
                'width' : '370px'}, animate_time);
            
            $(".col_"+id+" .infos_achatMo").animate({
                'width' : '350px',
                'margin-left' : '10px',
                'margin-top' : '5px'}, animate_time);
            
            $(".col_"+id+" .link").animate({
                'width' : '290px',
                'margin-left' : '10px'}, animate_time);
            
            $(".col_"+id+" .imageMo").animate({
                'height' : '290px'}, animate_time);
        
            $("."+ toHide1).hide(show_time);
            $("."+ toHide2).hide(show_time);
        
            $("."+ toHide1).removeClass("grid_3");
            $("."+ toHide2).removeClass("grid_3");
            $("."+ toNarrow1).removeClass("grid_3");
            $("."+ toNarrow2).removeClass("grid_3");
            $("."+ toHide1).addClass("grid_1");
            $("."+ toHide2).addClass("grid_1");
            $("."+ toNarrow1).addClass("grid_1");
            $("."+ toNarrow2).addClass("grid_1");
        
            $("."+ parent).removeClass("grid_1");
            $("."+ parent).addClass("grid_3");
           
            for(var i=1;i<6;i++){
                if(i!=id){
                    $(".col_"+i).animate({
                        'width' : '170px'}, animate_time);
                    
                    $(".col_"+i+" .titre_auteur").animate({
                        'margin-left' : '0px',
                        'width' : '170px'}, animate_time);
                    
                    $(".col_"+i+" .textMo").animate({
                        'margin-left' : '0px',
                        'width' : '170px'}, animate_time);
                    
                    $(".col_"+i+" .infos_achatMo").animate({
                        'width' : '170px',
                        'margin-left' : '0px',
                        'margin-top' : '10px'}, animate_time);
                    
                    $(".col_"+i+" .link").animate({
                        'width' : '170px', 
                        'margin-left' : '0px'}, animate_time);
                    
                    $(".col_"+i+" .imageMo").animate({
                        'height' : '257px'}, animate_time);
                }
            }
        }
    
        else {
            $("."+ parent).removeClass("grid_3");
            $("."+ parent).addClass("grid_1");
            $("."+ toHide1).show(show_time);
            $("."+ toHide2).show(show_time);
            
            $(".col_"+id).animate({
                'width' : '170px'}, animate_time);
            
            $(".col_"+id+" .titre_auteur").animate({
                'margin-left' : '0px',
                'width' : '170px'}, animate_time);
            
            $(".col_"+id+" .textMo").animate({
                'margin-left' : '0px',
                'width' : '170px'}, animate_time);
            
            $(".col_"+id+" .infos_achatMo").animate({
                'width' : '170px',
                'margin-left' : '0px',
                'margin-top' : '10px'}, animate_time);
            
            $(".col_"+id+" .link").animate({
                'width' : '170px',
                'margin-left' : '0px'}, animate_time);
            
            $(".col_"+id+" .imageMo").animate({
                'height' : '257px'}, animate_time);
        
        }
    });
    
    
}*/
