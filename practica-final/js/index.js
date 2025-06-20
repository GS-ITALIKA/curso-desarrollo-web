//@ts-nocheck

/**
 * Desarrollo Web | IT Academy
 * @author 891830 - Eric Adalberto Rodríguez Sánchez
 * @description Práctica final del curso.
 */

import * as Storage from '../libs/localStorageManager.js';

const KEY = 'employees';
const RESULTS = 5;

async function fromLocalStorage() {
    const promise = new Promise( function ( resolve ) {
        let employees = Storage.getStore( KEY );
        if ( !employees )
            employees = [];
        resolve( employees );
    } );
    return await promise;
}

async function fromApi( limit ) {
    const response = await axios.get( `https://randomuser.me/api/?results=${limit}` );
    if ( response.status === 200 ) {
        return response.data.results;
    } else {
        throw new Error( `Error al consumir la API: ${response.statusText}` );
    }
}

async function getEmployees( results = 5 ) {
    let employees = await fromLocalStorage();
    if ( employees.length === 0 )
        employees = await fromApi( results );
    else
        employees = employees.concat( await fromApi( results ) );
    return employees;
}

function addCard( employee ) {

    const card = document.createElement( 'div' );
    card.classList.add( 'card' );

    const image = document.createElement( 'img' );
    image.alt = `${employee.name.title} ${employee.name.first} ${employee.name.last}`;
    image.classList.add( 'img-center-round' );
    image.height = 72;
    image.loading = 'lazy';
    image.src = employee.picture.medium;
    image.width = 72;

    card.append( image );
    
    const name = document.createElement( 'h3' );
    name.innerText = `${employee.name.title} ${employee.name.first} ${employee.name.last}`;

    card.append( name );

    const contact = document.createElement( 'p' );
    contact.classList.add( 'label' );

    card.append( contact );

    const email = document.createElement( 'p' );
    email.innerText = employee.email;

    card.append( email );

    document.getElementById( 'employee-cards' ).append( card );
}

function openRegistryForm() {
    window.location.href = './registry.html';
}

document.addEventListener( 'DOMContentLoaded', () => {

    getEmployees( RESULTS ).then( employees => {
        employees.forEach( employee => addCard( employee ) );
    } );

    document.getElementById( 'registry-button' )
        .addEventListener( 'click', () => openRegistryForm() );
} );