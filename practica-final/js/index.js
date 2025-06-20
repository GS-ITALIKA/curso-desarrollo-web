//@ts-nocheck

/**
 * Desarrollo Web | IT Academy
 * @author 891830 - Eric Adalberto Rodríguez Sánchez
 * @description Práctica final del curso.
 */

const CARD_TEMPLATE = document.getElementById( 'card-template' );;

async function getEmployees( limit = 10 ) {
    const response = await axios.get( `https://randomuser.me/api/?results=${limit}` );
    if ( response.status === 200 ) {
        return response.data.results;
    } else {
        throw new Error( `Error al consumir la API: ${response.statusText}` );
    }
}

async function addEmployeeCard( employee ) {

    const card = CARD_TEMPLATE.content.cloneNode( true );

}

function openRegistryForm() {
    window.location.href = './registry.html';
}

document.addEventListener( 'DOMContentLoaded', () => {

    getEmployees().then( ( employees ) => {

        const template = /** @type {HTMLTemplateElement} */ (
            document.getElementById( 'card-template' )
        );

        employees.forEach( ( employee ) => {
            const card = /** @type {HTMLTemplateElement} */ (
                template.content.cloneNode( true )
            );
            const img = /** @type {HTMLImageElement} */ (
                card.querySelector( '#employee-image' )
            );
            img.alt = `${employee.name.title} ${employee.name.first} ${employee.name.last}`;
            img.src = employee.picture.medium;

            const h2 = /** @type {HTMLHeadingElement} */ (
                card.querySelector( '#employee-name' )
            );
            h2.innerText = `${employee.name.title} ${employee.name.first} ${employee.name.last}`;

            const p = /** @type {HTMLParagraphElement} */ (
                card.querySelector( '#employee-email' )
            );
            p.innerText = employee.email;

            document.querySelector( '#employee-cards' )?.append( card );

        } );
    } );
} );