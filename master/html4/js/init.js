window.sanspapier = {
    
    'cible' : {
        'number_of_books': 15,
        'width': 960,
        'height' : 600,
        'centerX' : 480,
        'centerY' : 350,
        'ellipse_ratio' : 0.35,
        'main_ellipse_coef' : 470,
        'ellipse_fill' : '250 - #CACACA:0-#EEEEEE:100',
        'ellipse_stroke' : '#fff',
        'backgroundcolor': '#fff',
        'book_height': 115,
        'book_width' : 76,
        'book_zoomed_ratio' : 1.8 ,
        'book_fill' : '#444444',
        'book_stroke' : '#ECECEC',
        'book_margin' : 0,
        'white' : '#FFFFFF',
        'bookElements' : [],
        'imageElements': [], 
        'set': null,
        'ellipseRef': null,
        'scapeRef': null,
        'mouse_sensibility': 0.005,
        'loaded' : false,
        'groups' : [],
        'turnable' : false,
        'cos' : [],
        'sin' : []
        
    },
    
    'config': {
        //'data_url' : 'http://data.coeurhacker.org/web/app.php/',
        'data_url' : 'http://betasanspapier.com/web/app_dev.php/',
        'images_url' : 'http://sanspapier.com/images/books/'
    },
    
    
    'categories': {
        'highlighted': null,
        'offset': 0,
        'nb_of_categories': 10,
        'category': [],
        'container': [],
        'incr':0
    },
    
    'top': 0,
    'logged': false
}

window.onload = function() {
    
    rafael();   ////// drive the cible!!!!
    fixScrollBar();  
    initCategoryInteraction();
    userForm();
    tooltips();
}


