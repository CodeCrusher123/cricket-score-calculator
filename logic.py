import copy


def overs_to_balls(overs):
    # new helper function (safety + correctness)
    parts = str(overs).split(".")
    whole_overs = int(parts[0])
    balls = int(parts[1]) if len(parts) == 2 else 0
    return whole_overs * 6 + balls


def run_rate(data):

    # using .get() to handle mistakes in inputs
    m = data.get("metrics", {})

    crr = 0.0
    rrr = 0.0

    # run rate calculated using balls (cricket-safe)
    if m.get("balls_bowled", 0) > 0:
        crr = round((m.get("current_score", 0) / m["balls_bowled"]) * 6, 2)

    if m.get("remaining_balls", 0) > 0:
        rrr = round((m.get("required_runs",0) / m["remaining_balls"]) * 6, 2)
    return {
        "current_rr" : crr,
        "required_rr" : rrr
    }

def match_calculations(inputs):

    data = copy.deepcopy(inputs)
    m = data.get("metrics", {})

    # Moved the logic from inputs() to here
    # We must calculate these before the IF/ELIF logic starts
    m["total_balls"] = overs_to_balls(m.get("total_overs", 0))
    m["balls_bowled"] = overs_to_balls(m.get("current_over", 0))
    m["remaining_balls"] = max(0, m["total_balls"] - m["balls_bowled"])
    m["required_runs"] = max(0, m["target"] - m.get("current_score", 0))

    target = int(m["target"])
    current_score = int(m["current_score"])
    wickets = int(m["wickets"])
    remaining_balls = int(m["remaining_balls"])

    if current_score == 0 and target == 0 and wickets == 0 :
        data["status"] = "pending"
        data["match_over"] = False
        data["message"] = "Match NOT STARTED yet"    
    elif current_score >= target:
        data["status"] = "completed"
        data["match_over"] = True
        data["message"] = "Match WON"

    elif wickets == 10 or remaining_balls == 0:
        data["status"] = "completed"
        data["match_over"] = True
        if current_score == target - 1:
            data["message"] = "Match TIED"
        else:
            data["message"] = "Match LOST"

    else:
        data["status"] = "ongoing"
        data["match_over"] = False
        data["message"] = "Match still going"                
    
    data["run_rates"].update(run_rate(data))

    return data
 



