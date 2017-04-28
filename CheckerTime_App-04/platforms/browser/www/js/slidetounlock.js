$(function() {

	$('.slider').on('touchmove click', function(e){

			var elemento = $(this);
			var tamanoPadre = elemento.parent().width();
			var padre = tamanoPadre - 80;

					elemento.on('touchmove click',  function(event) {
						var estafichado = elemento.parent().hasClass('fichado');
						if(!estafichado){
						    event.preventDefault();
						    var el = event.target;
						    var touch = event.touches[0];
						    curX = touch.pageX - this.offsetLeft - 73;
						    if(curX <= 0) return;
						    if(curX > padre){
						    	el.style.webkitTransform = 'translateX(' + padre + 'px)'; 
						    	el.style.left = 'inherit';
						    	elemento.parent().toggleClass('fichado');
						    } else{
						   		el.style.webkitTransform = 'translateX(' + curX + 'px)'; 
						    }
						}

					});
					
					elemento.on('touchend click', function (){
						this.style.webkitTransition = '-webkit-transform 0.1s ease-in';
						this.addEventListener( 'webkitTransitionEnd', function( event ) { this.style.webkitTransition = 'none'; }, false );
						if(!elemento.parent().hasClass('fichado')){
							this.style.webkitTransform = 'translateX(0px)';
						}
					});


	});
	$('.deshabilitado').on('touchmove click', function(event) {
		$(this).find('.slider').off('touchmove click');
	});

});