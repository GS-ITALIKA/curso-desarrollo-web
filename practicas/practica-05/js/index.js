//@ts-nocheck

/**
 * Desarrollo Web | IT Academy
 * @author Eric Adalberto Rodríguez Sánchez (891830)
 */

import * as yup from 'https://cdn.skypack.dev/yup';

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
 * Esquema para validar la información del formulario.
 * @type {ObjectSchema}
 */
const SCHEMA = yup.object().shape( {
    name: yup.string().required( Message.REQUIRED_FIELD ),
    password: yup.string().required( Message.REQUIRED_FIELD )
        .min( 8, Message.MIN_LENGTH ),
    email: yup.string().email( Message.INVALID_EMAIL )
        .required( Message.REQUIRED_FIELD ),
    bdate: yup.date().required( Message.REQUIRED_FIELD ),
    select: yup.string().required( Message.REQUIRED_FIELD ),
    number: yup.number().positive( '' ),
    checkbox: yup.boolean().oneOf( [true], Message.TERMS_AND_CONDITIONS )
} );

/**
 * Elemento HTML que representa el formulario de registro.
 * @type {HTMLFormElement}
 */
const REGISTRATION_FORM = /** @type {HTMLFormElement} */ (
    getFormControl( 'registration-form' )
);
//#endregion

/**
 * Obtiene el elemento HTML que representa al control de usuario especificado
 * por su identificador.
 * @param {string} id Identificador del elemento HTML.
 * @returns {HTMLElement} El elemento 
 */
function getFormControl( id ) {
    return /** @type {HTMLElement} */ ( document.getElementById( id ) );
}

//#region -- Evento principal --

/**
 * Punto de entrada a la aplicación.
 */
document.addEventListener( 'DOMContentLoaded', ev => {
    REGISTRATION_FORM.addEventListener( 'submit', ev => {
        ev.preventDefault();

        const data = {
            name: REGISTRATION_FORM.name.value,
            password: REGISTRATION_FORM.password.value,
            email: REGISTRATION_FORM.email.value,
            bdate: REGISTRATION_FORM.bdate.value,
            select: REGISTRATION_FORM.select.value,
            number: 2,
            checkbox: REGISTRATION_FORM.checkbox.checked
        };
        SCHEMA.validate( data, { abortEarly: false } )
            .then( () => REGISTRATION_FORM.submit() )
            .catch( reason => {
                const message = reason ? reason.errors.join( '\n' ) : reason.message;
                alert( message );
            } );
    } );
} );

//#endregion