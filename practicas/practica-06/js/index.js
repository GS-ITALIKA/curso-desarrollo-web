//@ts-check

//#region -- Elementos HTML --

/**
 * @type {HTMLButtonElement}
 */
const SEARCH_BUTTON = /** @type {HTMLButtonElement} */ (
    document.getElementById( 'search-button' )
);

//#endregion

//#region -- Funciones de comportamiento --

async function getData() {
    const response = await axios.get( 'https://dragonball-api.com/api/characters?limit=10' );
    return response.data.items;
}

//#endregion

//#region -- Manejadores de eventos --

/**
 * Punto de entrada a la aplicación.
 */
document.addEventListener( 'DOMContentLoaded', () => {
    SEARCH_BUTTON.addEventListener( 'click', () => {
        const template = /** @type {HTMLTemplateElement} */ (
            document.getElementById( 'character-template' )
        );
        getData().then( items => {
            items.forEach(character => {
                const card = /** @type {HTMLDivElement} */ (
                    template.content.cloneNode( true )
                );
                card.querySelector( '#character-image' ).src = character.image;
                card.querySelector( '#name-span' ).textContent = character.name;
                document.querySelector( '.content' ).append( card );
            });
        } );
    } );
} );

//#endregion