import { digimons } from "../data/digimons.js";
import { evolutions } from "../data/evolutions.js";


// --------------------------------------------------
// Find Digimon by ID
// --------------------------------------------------

function getDigimonById(id) {

    return Object.values(digimons)
        .find(digimon => digimon.id === id);
}


// --------------------------------------------------
// Get evolutions from a Digimon
// --------------------------------------------------

function getEvolutionsFrom(id) {

    return evolutions.filter(
        evolution => evolution.from === id
    );
}


// --------------------------------------------------
// Create Digimon Card
// --------------------------------------------------

function createDigimonCard(
    digimon,
    onClick
) {

    const card =
        document.createElement("div");

    card.className = "digimon-card";


    // Image

    const image =
        document.createElement("img");

    image.src = digimon.image;

    image.alt = digimon.name;


    // Name

    const name =
        document.createElement("h3");

    name.textContent =
        digimon.name;


    // Stage

    const stage =
        document.createElement("span");

    stage.className = "stage";

    stage.textContent =
        digimon.stage;


    card.appendChild(image);

    card.appendChild(name);

    card.appendChild(stage);


    // Click

    card.addEventListener(
        "click",
        () => onClick(digimon.id)
    );


    return card;
}


// --------------------------------------------------
// Render Root Digimons
// --------------------------------------------------

export function renderInitialDigimons(
    container,
    onDigimonClick
) {

    container.innerHTML = "";


    const rootDigimons =
        Object.values(digimons)
            .filter(
                digimon =>
                    digimon.stage === "In-Training II"
            );


    const rootContainer =
        document.createElement("div");

    rootContainer.className =
        "root-container";


    rootDigimons.forEach(digimon => {

        const card =
            createDigimonCard(
                digimon,
                onDigimonClick
            );

        rootContainer.appendChild(card);

    });


    container.appendChild(rootContainer);
}


// --------------------------------------------------
// Render Evolutions
// --------------------------------------------------

export function renderEvolutions(
    digimonId,
    container,
    onDigimonClick
) {

    const evolutionList =
        getEvolutionsFrom(digimonId);


    if (evolutionList.length === 0) {

        return;

    }


    const evolutionContainer =
        document.createElement("div");

    evolutionContainer.className =
        "evolution-container";


    evolutionList.forEach(evolution => {

        const target =
            getDigimonById(evolution.to);


        if (!target) {

            return;

        }


        const branch =
            document.createElement("div");

        branch.className =
            "evolution-branch";


        // Requirement

        const requirement =
            document.createElement("div");

        requirement.className =
            `requirement ${evolution.requirement.type}`;

        requirement.textContent =
            evolution.requirement.label;


        // Arrow

        const arrow =
            document.createElement("div");

        arrow.className =
            "arrow";

        arrow.textContent =
            "↓";


        // Target card

        const targetCard =
            createDigimonCard(
                target,
                onDigimonClick
            );


        branch.appendChild(requirement);

        branch.appendChild(arrow);

        branch.appendChild(targetCard);


        evolutionContainer.appendChild(branch);

    });


    container.appendChild(
        evolutionContainer
    );
}