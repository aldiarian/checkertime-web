$(function() {

	var tamano = $("#fichar_entrada").width();
	console.log('tamaño del slider: ' + tamano );
	var pararen = tamano - 80;
	var parar = true;
	
	$('#slider_entrada')[0].addEventListener('touchmove', function(event) {
	    event.preventDefault();
	    var el = event.target;
	    var touch = event.touches[0];
	    curX = touch.pageX - this.offsetLeft - 73;
	    if(curX <= 0) return;
	    if(curX > pararen){
	    	el.style.webkitTransform = 'translateX(' + pararen + 'px)'; 
	    	parar=false;
	    } else{
	   		el.style.webkitTransform = 'translateX(' + curX + 'px)'; 
	    }

	
	}, false);
	
	$('#slider_entrada')[0].addEventListener('touchend', function(event) {	
	    this.style.webkitTransition = '-webkit-transform 0.3s ease-in';
	    this.addEventListener( 'webkitTransitionEnd', function( event ) { this.style.webkitTransition = 'none'; }, false );
	    if(parar){
		    this.style.webkitTransform = 'translateX(0px)';
		    this.addClass('cambiar');
	    }
	}, false);

});