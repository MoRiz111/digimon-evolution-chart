import { digimons } from "../data/digimons.js";
import { evolutions } from "../data/evolutions.js";


function getDigimonById(id) {

    return Object.values(digimons)
        .find(digimon => digimon.id === id);

}


function getEvolutionsFrom(id) {

    return evolutions.filter(
        evolution => evolution.from === id
    );

}


function createDigimonCard(digimon, onClick) {

    const card = document.createElement("div");

    card.className = "digimon-card";


    const image = document.createElement("img");

    image.src = digimon.image;

    image.alt = digimon.name;


    const name = document.createElement("h3");

    name.textContent = digimon.name;


    const stage = document.createElement("span");

    stage.className = "stage";

    stage.textContent = digimon.stage;


    card.appendChild(image);

    card.appendChild(name);

    card.appendChild(stage);


    card.addEventListener(
        "click",
        () => onClick(digimon.id)
    );


    return card;
}


function createDigimonNode(
    digimonId,
    onDigimonClick,
    expandedDigimons,
    path
) {

    const digimon =
        getDigimonById(digimonId);

    if (!digimon) {
        return null;
    }


    /*
     * This wrapper represents one Digimon
     * and everything that evolves from it.
     */
    const node =
        document.createElement("div");

    node.className = "digimon-node";


    /*
     * Create the Digimon card.
     */
    const card =
        createDigimonCard(
            digimon,
            onDigimonClick
        );

    node.appendChild(card);


    /*
     * If this Digimon has not been expanded,
     * stop here.
     */
    if (!expandedDigimons.has(digimonId)) {
        return node;
    }


    /*
     * Prevent infinite recursion if the data
     * eventually contains a cycle.
     */
    if (path.has(digimonId)) {
        return node;
    }


    const currentPath =
        new Set(path);

    currentPath.add(digimonId);


    const evolutionList =
        getEvolutionsFrom(digimonId);


    if (evolutionList.length === 0) {
        return node;
    }


    /*
     * Container for all possible
     * evolution branches.
     */
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


        /*
         * Each evolution gets its own branch.
         */
        const branch =
            document.createElement("div");

        branch.className =
            "evolution-branch";


        /*
         * Requirement label.
         */
        const requirement =
            document.createElement("div");

        requirement.className =
            `requirement ${evolution.requirement.type}`;

        requirement.textContent =
            evolution.requirement.label;


        /*
         * Arrow between the requirement
         * and the next Digimon.
         */
        const arrow =
            document.createElement("div");

        arrow.className = "arrow";

        arrow.textContent = "↓";


        /*
         * Recursively create the next Digimon.
         */
        const childNode =
            createDigimonNode(
                target.id,
                onDigimonClick,
                expandedDigimons,
                currentPath
            );


        branch.appendChild(requirement);

        branch.appendChild(arrow);

        branch.appendChild(childNode);


        evolutionContainer.appendChild(branch);

    });


    node.appendChild(evolutionContainer);


    return node;
}


export function renderInitialDigimons(
    container,
    onDigimonClick,
    expandedDigimons
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

        const node =
            createDigimonNode(
                digimon.id,
                onDigimonClick,
                expandedDigimons,
                new Set()
            );

        rootContainer.appendChild(node);

    });


    container.appendChild(rootContainer);
}