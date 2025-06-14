//@ts-check

import * as Cookie from '../libs/cookieManager.js';
import * as Storage from '../libs/localStorageManager.js';

//#region -- Declaración de variables y constantes --

/** @type {HTMLInputElement} */
const KEY_INPUT = /** @type {HTMLInputElement} */ (
    getUserControl( 'key-input' )
);

/** @type {HTMLInputElement} */
const VALUE_INPUT = /** @type {HTMLInputElement} */ (
    getUserControl( 'value-input' )
);

/**
 * Control de usuario para colocar el resultado.
 * @type {HTMLDivElement} */
const RESULT_CODE = /** @type {HTMLDivElement} */ (
    getUserControl( 'result-code' )
);

const CREATE_BUTTON = /** @type {HTMLButtonElement} */ (
    getUserControl( 'create-button' )
);

const READ_BUTTON = /** @type {HTMLButtonElement} */ (
    getUserControl( 'read-button' )
);

const DELETE_BUTTON = /** @type {HTMLButtonElement} */ (
    getUserControl( 'delete-button' )
);

const CLEAR_BUTTON = /** @type {HTMLButtonElement} */ (
    getUserControl( 'clear-button' )
);

//#endregion
function clearForm() {
    VALUE_INPUT.value = '';
    KEY_INPUT.value = '';
    KEY_INPUT.focus();
}
function getUserControl( id ) {
    return document.getElementById( id );
}

document.addEventListener( 'DOMContentLoaded', ev => {
    
    CREATE_BUTTON.onclick = ( ev ) => {
        Storage.setStore( KEY_INPUT.value, VALUE_INPUT.value );
        Cookie.setStore( KEY_INPUT.value, VALUE_INPUT.value );
        clearForm();
    }

    READ_BUTTON.onclick = ( ev ) => {
        const value = Storage.getStore( KEY_INPUT.value );

        value ? RESULT_CODE.textContent = `${ KEY_INPUT.value }: ${value}`
              : RESULT_CODE.textContent = '';
        
        clearForm();
    }
    
    DELETE_BUTTON.onclick = ( ev ) => {
        Storage.deleteStore( KEY_INPUT.value );
        Cookie.deleteStore( KEY_INPUT.value );
        clearForm();
    }

    CLEAR_BUTTON.onclick = ( ev ) => {
        Storage.clearStore();
        Cookie.clearStore();
    }
} );
