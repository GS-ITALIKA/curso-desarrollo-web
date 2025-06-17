//@ts-check

//#region -- Definición de enumeraciones --
/**
 * Describe un error en la validación del formulario.
 * @readonly
 * @enum {string}
 */
const Message = {
    /**
     * Mensaje de error para una dirección de correo electrónica no válida.
     * @type {string}
     */
    INVALID_EMAIL: 'La dirección de correo electrónico no es válida.',
    /**
     * Mensaje de error para una contraseña con menos de 8 caracteres.
     *  @type {string}
     */
    MIN_LENGTH: 'La contraseña debe tener mínimo 8 caracteres.',
    /**
     * Mensaje de error para un campo requerido.
     * @type {string}
     */
    REQUIRED_FIELD: 'Este es un campo obligatorio.',
    /**
     * Mensaje de error para aceptar los términos y condiciones.
     * @type {string}
     */
    TERMS_AND_CONDITIONS: 'Debes aceptar los términos y condiciones.'
}
//#endregion

//#region -- Declaración de constantes --
/**
 * Elemento HTML que representa el formulario de registro.
 * @type {HTMLFormElement}
 */
const REGISTRATION_FORM = /** @type {HTMLFormElement} */ (
    getFormControl( 'registration-form' )
);
/**
 * Elemento HTML que representa el botòn para reestablecer el formulario.
 * @type {HTMLButtonElement}
 */
const RESET_BUTTON = /** @type {HTMLButtonElement} */ (
    getFormControl( 'reset-button' )
);
//#endregion

//#region -- Definición de funciones --
/**
 * Quita los mensajes de error que se hayan producido al validar el formulario.
 * @returns {void}
 */
function clearErrors() {
    document.querySelectorAll( 'span' ).forEach( span => span.remove() );
}
/**
 * Obtiene el elemento HTML que representa al control de usuario especificado
 * por su identificador.
 * @param {string} id Identificador del elemento HTML.
 * @returns {HTMLElement} El elemento 
 */
function getFormControl( id ) {
    return /** @type {HTMLElement} */ ( document.getElementById( id ) );
}
/**
 * Reestablece el valor inicial de los controles de usuario.
 * @returns {void}
 */
function resetFormControls() {
    document.querySelectorAll( 'input' ).forEach( input => {
        input.checked ? input.checked = false
                      : input.value = '';
    } );

    /** @type {HTMLSelectElement} */ (
        getFormControl( 'options-select' ) ).selectedIndex = 0;
    
    
}
/**
 * Crea un mensaje de error para un control cuyo valor no es válido.
 * @param {HTMLElement} control Control de usuario que produjo el error.
 * @param {string} message Mensaje de error.
 */
function setError( control, message ) {
    
    const span = document.createElement( 'span' );
    span.classList.add( 'error' );
    span.style.display = 'block';
    span.textContent = message;

    /** @type {HTMLDivElement} */ ( control.parentElement ).append( span );
}
/**
 * Valida los campos del formulario.
 * @returns {boolean}
 */
function validateForm() {
    let isValid = true;
    document.querySelectorAll( 'input' ).forEach( input => {
        switch( input.type ) {
            case 'text':
            case 'date':
                if ( input.value === '' ) {
                    isValid = false;
                    setError( input, Message.REQUIRED_FIELD );
                }
                break;
            case 'password':
                if ( input.value === '' ) {
                    isValid = false;
                    setError( input, Message.REQUIRED_FIELD );
                
                } else if ( input.value.length < 8 ) {
                    isValid = false;
                    setError( input, Message.MIN_LENGTH );
                }
                break;
            case 'email': {
                const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                if ( input.value === '' ) {
                    isValid = false;
                    setError( input, Message.REQUIRED_FIELD );
                
                } else if ( !pattern.test( input.value ) ) {
                    isValid = false;
                    setError( input, Message.INVALID_EMAIL );
                }
                break;
            }
            case 'checkbox':
                if ( !input.checked ) {
                    isValid = false;
                    setError( input, Message.TERMS_AND_CONDITIONS );
                }
                break;
        }

    } );

    const select = /** @type {HTMLSelectElement} */ (
        getFormControl( 'options-select' )
    );
    if ( select.selectedIndex === 0 ) {
        isValid = false
        setError( select, Message.REQUIRED_FIELD );
    }
    return isValid;
}
//#endregion

//#region -- Evento principal -- 
/**
 * Punto de entrada a la aplicación.
 */
document.addEventListener( 'DOMContentLoaded', ev => {
    
    REGISTRATION_FORM.addEventListener( 'submit', ev => {
        ev.preventDefault();
        clearErrors();
        if ( validateForm() ) {
            resetFormControls();
            alert( 'La información del formulario es válida.' );
        }
    } );

    RESET_BUTTON.addEventListener( 'click', ev => {
        clearErrors();
    } );
} );
//#endregion
