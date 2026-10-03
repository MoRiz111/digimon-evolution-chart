import {
    renderInitialDigimons,
    renderEvolutions
} from "./graph.js";


const chart =
    document.getElementById("chart");

const resetButton =
    document.getElementById("resetButton");


// --------------------------------------------------
// Track which Digimons have been expanded
// --------------------------------------------------

const expandedDigimons =
    new Set();


// --------------------------------------------------
// Start application
// --------------------------------------------------

renderInitialDigimons(
    chart,
    handleDigimonClick
);


// --------------------------------------------------
// Digimon clicked
// --------------------------------------------------

function handleDigimonClick(
    digimonId
) {

    // If already expanded -> collapse

    if (
        expandedDigimons.has(digimonId)
    ) {

        expandedDigimons.delete(
            digimonId
        );

    }

    // Otherwise -> expand

    else {

        expandedDigimons.add(
            digimonId
        );

    }


    renderChart();
}


// --------------------------------------------------
// Render entire chart
// --------------------------------------------------

function renderChart() {

    chart.innerHTML = "";


    // Render root Digimons

    renderInitialDigimons(
        chart,
        handleDigimonClick
    );


    /*
     * Later we will replace this with
     * a proper graph/tree renderer.
     *
     * For now this gives us the first
     * interactive version.
     */
}


// --------------------------------------------------
// Reset
// --------------------------------------------------

resetButton.addEventListener(
    "click",
    () => {

        expandedDigimons.clear();

        renderChart();

    }
);