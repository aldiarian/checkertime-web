	
;( function() {
	$menuLateral= $( '.menu-lateral' );
	$( '.icono-menu--abrir' ).on( "click", function() {
	  $menuLateral.addClass( 'abrir-menu' );
	} );
	$( '.icono-menu--cerrar' ).on( "click", function() {
	  $menuLateral.removeClass( 'abrir-menu' );
	});

	$innerHeight = window.innerHeight;
	$innerWidth = window.innerWidth;
	
	if( window.innerWidth > window.innerHeight ){
	    $( 'body' ).toggleClass( 'horizontal' );
	}
} )();

