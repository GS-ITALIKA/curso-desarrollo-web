window.onloadstart = ( ev: Event ) => {
    console.log( 'Iniciando carga...' );    
};

document.addEventListener( 'DOMContentLoaded', ( ev: Event ) => {
    console.log('DOM cargado.');
} );