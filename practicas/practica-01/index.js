/**
 * Atributos CSS para el estilo de un botón.
 * @readonly
 * @type {string}
 */
const BUTTON_STYLE = 'background-color:lightblue; '
    + 'border-radius:5px; '
    + 'border:1px solid #CCC; '
    + 'padding:10px;';

/**
 * Enumeración de colores para el fondo de pantalla.
 * @readonly
 * @enum {string}
 */
const Color = {
    /** Color aleatorio. */
    ANY: '',
    /** Color rojo. */
    RED: 'red',
    /** Color blanco. */
    WHITE: 'white'
}

/**
 * Genera un color aleatorio.
 * @returns {number} Valor numérico del color.
 */
function getColor() {
    const MAX_VALUE = 255;
    return Math.floor( Math.random() * MAX_VALUE );
}

/**
 * Obtiene el valor RGB para un color de fondo aleatorio.
 * @returns {string} El valor numérico de un color RGB.
 */
function getRGB() {
    const red = getColor();
    const green = getColor();
    const blue = getColor();
    return `rgb(${red}, ${green}, ${blue})`;
}

/**
 * Cambia el color de fondo de la aplicaciòn.
 * @param {string} color Nuevo color de fondo.
 * @returns {void}
 */
function setBackgroundColor( color ) {
    if ( color === Color.ANY )
        color = getRGB();
    document.body.style.backgroundColor = color;
}

/**
 * Establece el estilo para los botones de la aplicación.
 * @returns {void}
 */
function setButtonStyle() {
    const buttons = document.querySelectorAll( 'button' );
    buttons.forEach( button => button.style.cssText = BUTTON_STYLE );
}

/**
 * Obtiene del DOM el botón que coincida con el identificador especificado.
 * @param {string} id 
 * @returns {HTMLButtonElement}
 */
function getButton( id ) {
    return /** @type {HTMLButtonElement} */ (
        document.getElementById( id )
    );
}

/** Punto de inico. */
document.addEventListener( 'DOMContentLoaded', () => {
    setButtonStyle();
    
    let button = getButton( 'random-bg-btn' );
    button.addEventListener( 'click', () => setBackgroundColor( Color.ANY ) );
    
    button = getButton( 'red-bg-btn' );
    button.onclick = () => setBackgroundColor( Color.RED );
} );