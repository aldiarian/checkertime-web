var tiempoEspera = 2500;
var tiempoInicio = 0;
var storage = window.localStorage;
var dominio = "https://checkertime.elojografico.net";
var cambioObligado = false;
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener( 'deviceready', this.onDeviceReady, false );
        tiempoInicio = Date.now();
    },

    onDeviceReady: function() {
        $menuLateral = $( '.menu-lateral' );
        $( '.icono-menu--abrir' ).on( "click", function() {
          $menuLateral.addClass( 'abrir-menu' );
        } );
        $( '.icono-menu--cerrar' ).on( "click", function() {
          $menuLateral.removeClass( 'abrir-menu' );
        });

        $innerHeight = window.innerHeight;
        $innerWidth = window.innerWidth;

        $( "#loginButton" ).on( "click", app.handleLogin );
//        $( "#recuperarButton" ).on( "click", app.recuperarContrasena );
//        $( "#ficharButton" ).on( "click", app.ficharAMano );
//        $( "#cambiarButton" ).on( "click", app.cambiarContrasena );

        $( "#botonDesconectar" ).on ( "click", app.desconectar );
        $( "#botonSalir" ).on ( "click", app.salir );

        var actualizadorTiempo = setInterval( app.actualizarHora, 1000 );

        document.addEventListener( "backbutton", function( e ) {
            e.preventDefault();
            navigator.app.exitApp();
        }, false );

        $( "#botonSalir" ).click( function( e ) {
            e.preventDefault();
            navigator.app.exitApp();
        } );

        $('#login-fecha').dateDropper({});
        $("#login-hora").timeDropper({
            format:'HH:mm'
        });

        app.checkLogged();
    },

    desconectar: function( e ) {
        e.preventDefault();
        app.limpiarStorage();
        $menuLateral.removeClass( 'abrir-menu' );
        $( ":mobile-pagecontainer" ).pagecontainer( "change", "#pageLogin" );
    },

    salir: function( e ) {
        e.preventDefault();
        navigator.app.exitApp();
    },

    actualizarHora: function() {
        var date = new Date();
        var formattedYear = date.getFullYear().toString();
        var formattedMonth = ( '0' + ( date.getMonth() + 1 ) ).slice( -2 );
        var formattedDate = ( '0' + date.getDate() ).slice( -2 );
        var formattedHour = ( '0' + date.getHours() ).slice( -2 );
        var formattedMinute = ( '0' + date.getMinutes() ).slice( -2 );
        var formattedSecond = ( '0' + date.getSeconds() ).slice( -2 );
        var f = formattedDate + '/' + formattedMonth + '/' + formattedYear;
        var h = formattedHour + ':' + formattedMinute + ':' + formattedSecond;
        $( "#mainfecha" ).html( f );
        $( "#mainhora" ).html( h );
    },

    limpiarStorage: function() {
        storage.removeItem( "empresa" );
        storage.removeItem( "dni" );
        storage.removeItem( "razon" );
        storage.removeItem( "nombre" );
        storage.removeItem( "token" );
        storage.removeItem( "geolocalizar" );
        storage.removeItem( "manuales" );
        storage.removeItem( "estado" );
    },

    cambiaPagina: function( pagina ) {
        $menuLateral.removeClass( 'abrir-menu' );
        $( ":mobile-pagecontainer" ).pagecontainer( "change", pagina );

    },

    refrescaBotones: function( estado ) {
        if ( estado == 2 || estado == 0 ) {
            $( "#fichar_entrada" ).removeClass( "deshabilitado" );
            $( "#fichar_entrada" ).removeClass( "fichado" );
            $( "#fichar_salida" ).addClass( "deshabilitado" );
            $( "#fichar_salida" ).removeClass( "fichado" );
            $( "#fichar_entra_descanso" ).addClass( "deshabilitado" );
            $( "#fichar_entra_descanso" ).removeClass( "fichado" );
            $( "#fichar_fin_descanso" ).addClass( "deshabilitado" );
            $( "#fichar_fin_descanso" ).removeClass( "fichado" );
        }
        if ( estado == 1 || estado == 4 ) {
            $( "#fichar_entrada" ).removeClass( "deshabilitado" );
            $( "#fichar_entrada" ).addClass( "fichado" );
            $( "#fichar_salida" ).removeClass( "deshabilitado" );
            $( "#fichar_salida" ).removeClass( "fichado" );
            $( "#fichar_entra_descanso" ).removeClass( "deshabilitado" );
            $( "#fichar_entra_descanso" ).removeClass( "fichado" );
            $( "#fichar_fin_descanso" ).addClass( "deshabilitado" );
            $( "#fichar_fin_descanso" ).removeClass( "fichado" );
        }
        if ( estado == 3 ) {
            $( "#fichar_entrada" ).removeClass( "deshabilitado" );
            $( "#fichar_entrada" ).addClass( "fichado" );
            $( "#fichar_salida" ).addClass( "deshabilitado" );
            $( "#fichar_salida" ).removeClass( "fichado" );
            $( "#fichar_entra_descanso" ).removeClass( "deshabilitado" );
            $( "#fichar_entra_descanso" ).addClass( "fichado" );
            $( "#fichar_fin_descanso" ).addClass( "deshabilitado" );
            $( "#fichar_fin_descanso" ).removeClass( "fichado" );
        }
        app.addSliders();
    },

    addSliders: function() {
        $( '#slider_entrada' ).off( 'touchmove' );
        $( '#slider_entrada' ).off( 'touchend' );
        if ( ! $( '#slider_entrada' ).parent().hasClass( 'deshabilitado' ) && ! $( '#slider_entrada' ).parent().hasClass( 'fichado' ) ) {
            $( '#slider_entrada' ).on( 'touchmove', app.moveSlider );
            $( '#slider_entrada' ).on( 'touchend', app.stopSlider );
        }

        $( '#slider_salida' ).off( 'touchmove' );
        $( '#slider_salida' ).off( 'touchend' );
        if ( ! $( '#slider_salida' ).parent().hasClass( 'deshabilitado' ) && ! $( '#slider_salida' ).parent().hasClass( 'fichado' ) ) {
            $( '#slider_salida' ).on( 'touchmove', app.moveSlider );
            $( '#slider_salida' ).on( 'touchend', app.stopSlider );
        }

        $( '#slider_entra_descanso' ).off( 'touchmove' );
        $( '#slider_entra_descanso' ).off( 'touchend' );
        if ( ! $( '#slider_entra_descanso' ).parent().hasClass( 'deshabilitado' ) && ! $( '#slider_entra_descanso' ).parent().hasClass( 'fichado' ) ) {
            $( '#slider_entra_descanso' ).on( 'touchmove', app.moveSlider );
            $( '#slider_entra_descanso' ).on( 'touchend', app.stopSlider );
        }

        $( '#slider_fin_descanso' ).off( 'touchmove' );
        $( '#slider_fin_descanso' ).off( 'touchend' );
        if ( ! $( '#slider_fin_descanso' ).parent().hasClass( 'deshabilitado' ) && ! $( '#slider_fin_descanso' ).parent().hasClass( 'fichado' ) ) {
            $( '#slider_fin_descanso' ).on( 'touchmove', app.moveSlider );
            $( '#slider_fin_descanso' ).on( 'touchend', app.stopSlider );
        }
    },

    moveSlider: function( event ) {
        event.preventDefault();
        var tamanoPadre = $( this ).parent().width() - 80;
        var touch = event.originalEvent.touches[0];
        curX = touch.pageX - this.offsetLeft - 73;
        if ( curX <= 0 )
            return;
        if ( curX > tamanoPadre ) {
            this.style.webkitTransform = 'translateX(' + tamanoPadre + 'px)';
            this.style.left = 'inherit';
            $( this ).parent().find( '.texto_fichado' ).html( $( this ).data( 'tipoevento' ) );
            // app.fichar( false, this.data.tipoevento );
            $( this ).parent().addClass( 'fichado' );
            $( this ).off( 'touchmove' );
        } else {
            this.style.webkitTransform = 'translateX(' + curX + 'px)';
        }
    },

    stopSlider: function( event ) {
        this.addEventListener( 'webkitTransitionEnd', app.transition, false );
        this.style.webkitTransition = '-webkit-transform 0.1s ease-in';
        if ( ! $( this ).parent().hasClass( 'fichado' ) ) {
            this.style.webkitTransform = 'translateX(0px)';
        } else {
            $( this ).off( 'touchend' );
        }
    },

    transition: function() {
        this.removeEventListener( 'webkitTransitionEnd', app.transition, false );
        this.style.webkitTransition = 'none';
    },

    checkLogged: function() {
        if ( storage.getItem( "empresa" ) == undefined || storage.getItem( "dni" ) == undefined || storage.getItem( "token" ) == undefined ) {
            var restante = tiempoEspera - ( Date.now() - tiempoInicio );
            if ( restante > 0 ) {
                setTimeout( function() {
                    $( ":mobile-pagecontainer" ).pagecontainer( "change", "#pageLogin" );
                }, restante );
            } else {
                $( ":mobile-pagecontainer" ).pagecontainer( "change", "#pageLogin" );
            }
        } else {
            var e = storage.getItem( "empresa" );
            var d = storage.getItem( "dni" );
            var t = storage.getItem( "token" );
            $.ajax( {
                url: dominio + "/services/services.php",
                data: { referrer: "EOG_CT_App", action: "checklogin", empresa: e, dni: d, token: t },
                cache: false,
                type: 'POST',
                dataType: 'json'
            } )
                .done( function( res ) {
                    var nextPage = "#pageLogin";
                    if ( res.resultado ) {
                        $( "#resempresa").html( storage.getItem( "razon" ) );
                        $( "#resempresa2").html( storage.getItem( "razon" ) );
                        $( "#resnombre").html( storage.getItem( "nombre" ) );
                        $( "#resnombre2").html( storage.getItem( "nombre" ) );
                        storage.setItem( "empresa", e );
                        storage.setItem( "dni", d );
                        storage.setItem( "razon", res.razon );
                        storage.setItem( "nombre", res.nombre );
                        storage.setItem( "token", res.token );
                        storage.setItem( "geolocalizar", res.geolocalizar );
                        storage.setItem( "manuales", res.manuales );
                        storage.setItem( "estado", res.estado );
                        if ( res.tieneemail == 0 ) {
                            $( '#enlaceOlvidoContrasena' ).hide();
                        } else {
                            $( '#enlaceOlvidoContrasena' ).show();
                        }
                        if ( res.manuales == 0 ) {
                            $( '#fichado_manual' ).hide();
                        } else {
                            $( '#fichado_manual' ).show();
                        }
                        app.refrescaBotones( res.estado );
                        if ( res.changepass == 1 ) {
                            cambioObligado = true;
                            $( "#menu-cambio" ).hide();
                            $( "#atras-cambio" ).hide();
                            $( "#grupo-cambio-obligado" ).show();
                            $( "#grupo-cambio-no-obligado" ).hide();
                            nextPage = "#pageCambiarContrasena";
                        } else {
                            cambioObligado = false;
                            $( "#menu-cambio" ).show();
                            $( "#atras-cambio" ).show();
                            $( "#grupo-cambio-obligado" ).hide();
                            $( "#grupo-cambio-no-obligado" ).show();
                            nextPage = "#pageFichar";
                        }
                    }
                    var restante = tiempoEspera - ( Date.now() - tiempoInicio );
                    if ( restante > 0 ) {
                        setTimeout( function() {
                            $( ":mobile-pagecontainer" ).pagecontainer( "change", nextPage );
                        }, restante );
                    } else {
                        $( ":mobile-pagecontainer" ).pagecontainer( "change", nextPage );
                    }
                } )
                .fail( function( jqXHR, textStatus, errorThrown ) {
                    navigator.app.exitApp();
                } );
        }
    },

    handleLogin: function() {
        //disable the button so we can't resubmit while we wait
        $( "#loginButton" ).attr( "disabled", "disabled" );
        var e = $( "#login-empresa" ).val();
        var d = $( "#login-numeroId" ).val();
        var p = $( "#login-contrasena" ).val();
        var platform = device.platform;
        if ( e != '' && d != '' && p != '' ) {
            $.ajax( {
                url: dominio + "/services/services.php",
                data: { referrer: "EOG_CT_App", action: "login", empresa: e, dni: d, password: sha256( p ), plataforma: platform },
                cache: false,
                type: 'POST',
                dataType: 'json'
            } )
                .done( function( res ) {
                    if ( res.resultado === false ) {
                        navigator.notification.alert( "Credenciales incorrectas", function() {} );
                    } else {
                        var nextPage = "#pageFichar";
                        //store
                        storage.setItem( "empresa", e );
                        storage.setItem( "dni", d );
                        storage.setItem( "razon", res.razon );
                        storage.setItem( "nombre", res.nombre );
                        storage.setItem( "token", res.token );
                        storage.setItem( "geolocalizar", res.geolocalizar );
                        storage.setItem( "manuales", res.manuales );
                        storage.setItem( "estado", res.estado );
                        if ( res.changepass == 1 ) {
                            cambioObligado = true;
                            $( "#menu-cambio" ).hide();
                            $( "#atras-cambio" ).hide();
                            $( "#grupo-cambio-obligado" ).show();
                            $( "#grupo-cambio-no-obligado" ).hide();
                            nextPage = "#pageCambiarContrasena";
                        } else {
                            cambioObligado = false;
                            $( "#menu-cambio" ).show();
                            $( "#atras-cambio" ).show();
                            $( "#grupo-cambio-obligado" ).hide();
                            $( "#grupo-cambio-no-obligado" ).show();
                            nextPage = "#pageFichar";
                        }
                        $( "#resempresa").html( res.razon );
                        $( "#resempresa2").html( res.razon );
                        $( "#resnombre").html( res.nombre );
                        $( "#resnombre2").html( res.nombre );
                        $( "#login-empresa" ).val( "" );
                        $( "#login-numeroId" ).val( "" );
                        $( "#login-contrasena" ).val( "" );
                        if ( res.tieneemail == 0 ) {
                            $( '#enlaceOlvidoContrasena' ).hide();
                        } else {
                            $( '#enlaceOlvidoContrasena' ).show();
                        }
                        if ( res.manuales == 0 ) {
                            $( '#fichado_manual' ).hide();
                        } else {
                            $( '#fichado_manual' ).show();
                        }
                        app.refrescaBotones( res.estado );
                        $( ":mobile-pagecontainer" ).pagecontainer( "change", nextPage );
                    }
                    $( "#loginButton" ).removeAttr( "disabled" );
                } )
                .fail( function( jqXHR, textStatus, errorThrown ) {
                    $( "#loginButton" ).removeAttr( "disabled" );
                } );
        } else {
            navigator.notification.alert( "Debe rellenar los datos", function() {} );
            $( "#loginButton" ).removeAttr( "disabled" );
        }
        return false;
    },

    fichar: function( manual, tipoevento ) {
        $( "#ficharButton1" ).button( "disable" );
        $( "#ficharButton2" ).button( "disable" );
        $( "#ficharButton3" ).button( "disable" );
        $( "#ficharButton4" ).button( "disable" );
        $( "#ficharButton4" ).button( "refresh" );
        var e = storage.getItem( "empresa" );
        var d = storage.getItem( "dni" );
        var t = storage.getItem( "token" );
        var g = storage.getItem( "geolocalizar" );

        var date = new Date();
        var formattedYear = date.getFullYear().toString();
        var formattedMonth = ( '0' + ( date.getMonth() + 1 ) ).slice( -2 );
        var formattedDate = ( '0' + date.getDate() ).slice( -2 );
        var formattedHour = ( '0' + date.getHours() ).slice( -2 );
        var formattedMinute = ( '0' + date.getMinutes() ).slice( -2 );
        var formattedSecond = ( '0' + date.getSeconds() ).slice( -2 );
        var f = formattedYear + '-' + formattedMonth + '-' + formattedDate + ' ' + formattedHour + ':' + formattedMinute + ':' + formattedSecond;
        var fecha = formattedDate + "/" + formattedMonth + "/" + formattedYear;
        var hora = formattedHour + ':' + formattedMinute + ':' + formattedSecond;

        var lt = 0;
        var lg = 0;
        if ( g == 1 ) {
            navigator.geolocation.getCurrentPosition(
                function( position ) {
                    lt = position.coords.latitude;
                    lg = position.coords.longitude;
                    enviarEvento( e, d, t, f, lt, lg, manual, tipoevento, fecha, hora );
                },
                function( error ) {
                    lt = 0;
                    lg = 0;
                    enviarEvento( e, d, t, f, lt, lg, manual, tipoevento, fecha, hora );
                },
                {
                    maximumAge: 30000,
                    timeout: 5000,
                    enableHighAccuracy: true
                }
            );

        } else {
            enviarEvento( e, d, t, f, lt, lg, manual, tipoevento, fecha, hora );
        }
    },

    enviarEvento: function( e, d, t, f, lt, lg, m, te, fecha, hora ) {
        $.ajax( {
            url: dominio + "/services/services.php",
            data: { referrer: "EOG_CT_App", action: "fichar", empresa: e, dni: d, token: t, fecha: f, latitud: lt, longitud: lg, manual: m, evento: te },
            cache: false,
            type: 'POST',
            dataType: 'json'
        } )
            .done( function( res ) {
                if ( res.resultado === false ) {
                    navigator.notification.alert( "Error al fichar", function() {}, "Alerta" );
                } else {
                    var textoTipo = "";
                    switch( te ) {
                        case 1:
                            textoTipo = "ENTRADA";
                            break;
                        case 2:
                            textoTipo = "SALIDA";
                            break;
                        case 3:
                            textoTipo = "INICIO DESCANSO";
                            break;
                        case 4:
                            textoTipo = "FIN DESCANSO";
                            break;
                    }
                    navigator.notification.alert( "Fichado correctamente como " + textoTipo + ", el día " + fecha + ", a las " + hora + ".", function() {}, "Todo correcto");
                    storage.setItem( "estado", te );
                }
                refrescaBotones( te );
            } )
            .fail( function( jqXHR, textStatus, errorThrown ) {
                te = storage.getItem( "estado" );
                refrescaBotones( te );
            } );
    }

};
$( document ).ready( function() {
    app.initialize();
} );
