	
;(function(){
	$menuLateral= $('.menu-lateral');
	$('.icono-menu--abrir').on( "click", function() {
	  $menuLateral.addClass('abrir-menu')
	});
	$('.icono-menu--cerrar').on( "click", function() {
	  $menuLateral.removeClass('abrir-menu')
	});
})();