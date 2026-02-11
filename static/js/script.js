const target = document.getElementById("target");
const current_score = document.getElementById("current_score");
const wickets = document.getElementById("wickets");
const total_overs = document.getElementById("total_overs");
const current_over = document.getElementById("current_over");

// Grabbing the button and the display spans
const calcBtn = document.getElementById("calc-btn");
const statusMsg = document.getElementById("status_msg");
const crrVal = document.getElementById("crr_val");
const rrrVal = document.getElementById("rrr_val");


// --- Validators ---

function runsValidator(data) {
    let runs = data.trim();
    if (runs === "") return "Cannot be empty";
    if (isNaN(runs)) return "Must be a valid number";
    if (parseInt(runs) < 0) return "Cannot be negative";
    return null;
}

function overValidator(data) {
    let over = data.toString().trim();
    if (over === "") return "Cannot be empty";
    if (over < 0) return "Cannot be negative";
    if (isNaN(over)) return "Must be a number";

    if (!over.includes(".")) return null;

    const parts = over.split(".");
    // Check if there's actually a number after the dot
    if (parts[1] === undefined || parts[1].length === 0) return null; 
    
    if (parts[1].length !== 1) return "Use format .1 through .5 (single digit)";

    const balls = parseInt(parts[1]);
    if (balls >= 0 && balls <= 5) return null;

    return "Balls should be between 0 to 5";
}

function wicketValidator(data) {
    let val = data.trim();
    if (val === "") return "Cannot be empty";
    if (isNaN(val)) return "Must be a number";
    if (val.includes(".")) return "Wickets cannot be decimals";
    
    let w = parseInt(val);
    if (w >= 0 && w <= 10) return null;
    return "Must be between 0 to 10";
}


// --- Event Listeners ---

target.addEventListener("input", () => {
    const error = runsValidator(target.value);
    document.getElementById("target_error").innerText = error || "";
});

current_score.addEventListener('input', () => {
    const error = runsValidator(current_score.value);
    document.getElementById("current_score_error").innerText = error || "" ;
});

wickets.addEventListener("input", () => {
    const error = wicketValidator(wickets.value);
    document.getElementById("wickets_error").innerText = error || "";
});

total_overs.addEventListener("input", () => {
    const error = overValidator(total_overs.value);
    document.getElementById("total_overs_error").innerText = error || "";
});

current_over.addEventListener("input", () => {
    const error = overValidator(current_over.value);
    document.getElementById("current_over_error").innerText = error || "";
});





// 2. The click event
calcBtn.addEventListener("click", () => {

    // 1. Run all validations and collect errors
    const errors = [
        runsValidator(target.value),
        runsValidator(current_score.value),
        wicketValidator(wickets.value),
        overValidator(total_overs.value),
        overValidator(current_over.value)
    ];

    const fields = [
        "target",
        "current_score",
        "wickets",
        "total_overs",
        "current_over"
    ];

    // 2. THE STOPPER: Check if any of those results are strings (errors)
    // .find(e => e !== null) looks for the first error message
    const index = errors.findIndex(Boolean);
    const firstError = index === -1 ? null : {
    error: errors[index],
    field: fields[index]
    };
    errorName = errors[index];
    

    if (firstError) {
        // This stops the code from reaching the fetch()!
        alert(`Error in "${firstError.field}": ${firstError.error}`);
        return; 
    }

    const targetRuns = Number(target.value);
    const currentRuns = Number(current_score.value);

    if ((currentRuns > targetRuns) && (targetRuns === 0)){
        alert("Target cannot be 0");
        return;
    }

    const totalOvers = Number(total_overs.value);
    const currentOver = Number(current_over.value);

    if (currentOver > totalOvers){
        alert("Current Over cannot exceed Total Overs")
        return;
    }
    
    // Wrap the numbers inside a 'metrics' object to match logic.py
    const matchData = {
        "metrics": {
            "target": Number(document.getElementById("target").value),
            "current_score": Number(document.getElementById("current_score").value),
            "wickets": Number(document.getElementById("wickets").value),
            "total_overs": Number(document.getElementById("total_overs").value),
            "current_over": Number(document.getElementById("current_over").value)
        },
        "run_rates": {}, // logic.py uses .update() on this, so we must provide it
        "status": "",
        "message": ""
    };

    fetch('/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(matchData)
    })
    .then(response => response.json())
    .then(result => {
        // Updated to match the keys your logic.py returns
        document.getElementById("status_msg").innerText = result.message;
        document.getElementById("crr_val").innerText = result.run_rates.current_rr;
        document.getElementById("rrr_val").innerText = result.run_rates.required_rr;
    })
    .catch(err => console.error("Error:", err));
});