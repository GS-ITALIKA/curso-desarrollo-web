//@ts-check

/**
 * Desarrollo Web | IT Academy
 * @author 891830 - Eric Adalberto Rodríguez Sánchez
 * @description Práctica final del curso.
 */

/**
 * 
 * @param {number} limit 
 */
async function getEmployees( limit ) {
    const response = await fetch( `https://randomuser.me/api/?results=${limit}` );
    if ( !response.ok ) {
        throw new Error( 'Network response was not ok' );
    }
    const data = await response.json();
    return data.results;
}

document.addEventListener( 'DOMContentLoaded', () => {
    
} );