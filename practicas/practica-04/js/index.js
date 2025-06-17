//@ts-check

const Message = {

    /** @type {string} */
    INVALID_EMAIL: 'La dirección de correo electrónico no es válida.',

    /** @type {string} */
    MIN_LENGTH: 'La contraseña debe tener mínimo 8 caracteres.',

    /** @type {string} */
    REQUIRED_FIELD: 'Este es un campo obligatorio.',

    TERMS_AND_CONDITIONS: 'Debes aceptar los términos y condiciones.',

    NO_OPTION_SELECTED: 'Selecciona una opción.'
}

/**
 * Formulario de registro.
 * @type {HTMLFormElement}
 */
const REGISTRATION_FORM = /** @type {HTMLFormElement} */ (
    getFormControl( 'registration-form' )
);

//#endregion

/**
 * 
 * @param {string} id Identificador en el DOM del elemento HTML.
 * @returns {HTMLElement}
 */
function getFormControl( id ) {
    return /** @type {HTMLElement} */ ( document.getElementById( id ) );
}

/**
 * 
 * @param {HTMLElement} control Control de usuario que produjo el error.
 * @param {string} message Mensaje de error.
 */
function error( control, message ) {
    
    const span = document.createElement( 'span' );
    span.classList.add( 'error' );
    span.style.display = 'block';
    span.textContent = message;

    /** @type {HTMLDivElement} */ ( control.parentElement ).append( span );
}

const clearErrors = () => {
    document.querySelectorAll( 'span' ).forEach( span => span.remove() );
}

/**
 * 
 */
const validateForm = () => {
    let isValid = true;
    document.querySelectorAll( 'input' ).forEach( input => {
        switch( input.type ) {
            case 'text':
            case 'date':
                if ( input.value === '' ) {
                    isValid = false;
                    error( input, Message.REQUIRED_FIELD );
                }
                break;
            case 'password':
                if ( input.value === '' ) {
                    isValid = false;
                    error( input, Message.REQUIRED_FIELD );
                
                } else if ( input.value.length < 8 ) {
                    isValid = false;
                    error( input, Message.MIN_LENGTH );
                }
                break;
            case 'email': {
                const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                if ( input.value === '' ) {
                    isValid = false;
                    error( input, Message.REQUIRED_FIELD );
                
                } else if ( !pattern.test( input.value ) ) {
                    isValid = false;
                    error( input, Message.INVALID_EMAIL );
                }
                break;
            }
            case 'checkbox':
                if ( !input.checked ) {
                    isValid = false;
                    error( input, Message.TERMS_AND_CONDITIONS );
                }
                break;
        }

    } );

    const select = /** @type {HTMLSelectElement} */ (
        getFormControl( 'options-select' )
    );
    if ( select.selectedIndex === 0 ) {
        isValid = false
        error( select, Message.REQUIRED_FIELD );
    }
    return isValid;
}

document.addEventListener( 'DOMContentLoaded', ev => {
    
    REGISTRATION_FORM.addEventListener( 'submit', ev => {
        ev.preventDefault();
        clearErrors();
        validateForm();
    } );

} );
