//@ts-nocheck

import * as Storage from '../libs/localStorageManager.js';

/**
 * Desarrollo Web | IT Academy
 * @author 891830 - Eric Adalberto Rodríguez Sánchez
 * @description Práctica final del curso.
 */


//#region -- Declaración de constantes --

const KEY = 'employees';

//#endregion

function changeImage( title ) {
    const img = document.getElementById( 'employee-image' );
    switch ( title ) {
        case 'Miss':
            img.src = './images/02.png';
            break;
        case 'Mrs':
            img.src = './images/03.png';
            break;
        default:
            img.src = './images/01.png';
            break;
    }
}

function addEmployee( employees, form ) {
    employees.push( {
        name: {
            title: form.title.value,
            first: form.first.value,
            last: form.last.value
        },
        email: form.email.value,
        picture: {
            medium: form.querySelector('#employee-image').src
        }
    } );
    Storage.setStore( KEY, employees );
    return true;
}

function getEmployees() {
    let employees = Storage.getStore( KEY );
    if ( !employees )
        employees = [];
    return employees;
}

document.addEventListener( 'DOMContentLoaded', () => {

    const form = document.getElementById( 'registry-form' );
    form.addEventListener( 'submit', function( ev ) {
        ev.preventDefault();
        let employees = getEmployees();
        if ( addEmployee( employees, this ) ) {
            alert( 'El empleado se ha registrado correctamente.' );
            window.location.href = './index.html';    
        }
    } );
    form.querySelector( '#title' ).addEventListener( 'change', function () {
        changeImage( this.value );
    } );

} );
