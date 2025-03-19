document.addEventListener("DOMContentLoaded", function () {
  const scoresDiv = document.getElementById("scores");
  const refreshBtn = document.getElementById("refresh-btn");

  // Show loading message
  scoresDiv.innerHTML = '<div class="loading">Loading cricket matches...</div>';

  // Fetch data when page loads
  fetchCricketData();

  // Set up refresh button with debounce
  let isRefreshing = false;

  refreshBtn.addEventListener("click", function () {
    if (isRefreshing) return;

    // Disable button during refresh
    isRefreshing = true;
    refreshBtn.disabled = true;

    scoresDiv.innerHTML = '<div class="loading">Refreshing data...</div>';

    fetchCricketData()
      .finally(() => {
        // Re-enable button after 2 seconds to prevent spam
        setTimeout(() => {
          refreshBtn.disabled = false;
          isRefreshing = false;
        }, 2000);
      });
  });
});

function fetchCricketData() {
  const apiKey = "c619878f-19d8-4528-ba7b-e53283526094";

  return fetch(`https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.status === "success") {
        displayMatches(data.data);
      } else {
        document.getElementById("scores").innerHTML =
          `<div class="error">Failed to get cricket data: ${data.message || 'Unknown error'}. Please try again later.</div>`;
      }
    })
    .catch(error => {
      console.error("Cricket API error:", error);
      document.getElementById("scores").innerHTML =
        `<div class="error">Error: ${error.message || 'Network error'}. Please check your connection.</div>`;
    });
}

function displayMatches(matches) {
  const scoresDiv = document.getElementById("scores");

  if (!matches || matches.length === 0) {
    scoresDiv.innerHTML = '<div class="no-matches">No matches available right now.</div>';
    return;
  }

  // Create HTML for matches
  let matchesHTML = '';

  // Define consistent date format options
  const dateOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  matches.forEach(match => {
    // Get basic match info
    const team1 = match.teams?.[0] || "Team 1";
    const team2 = match.teams?.[1] || "Team 2";

    // Format date with consistent formatting and fallback
    const matchDate = new Date(match.dateTimeGMT || Date.now()).toLocaleDateString(undefined, dateOptions);

    // Get scores if available
    let team1Score = "Yet to bat";
    let team2Score = "Yet to bat";

    if (match.score && Array.isArray(match.score)) {
      const team1Inning = match.score.find(s => s.inning && s.inning.startsWith(team1));
      const team2Inning = match.score.find(s => s.inning && s.inning.startsWith(team2));

      if (team1Inning) {
        const runs = team1Inning.r ?? 0;
        const wickets = team1Inning.w ?? 0;
        const overs = team1Inning.o ?? 0;
        team1Score = `${runs}/${wickets} (${overs} ov)`;
      }

      if (team2Inning) {
        const runs = team2Inning.r ?? 0;
        const wickets = team2Inning.w ?? 0;
        const overs = team2Inning.o ?? 0;
        team2Score = `${runs}/${wickets} (${overs} ov)`;
      }
    }

    // Determine match status for styling
    let statusClass = "status-upcoming";

    if (match.matchStarted && !match.matchEnded) {
      statusClass = "status-live";
    } else if (match.matchEnded) {
      statusClass = "status-completed";
    }

    const matchType = match.matchType ? match.matchType.toUpperCase() : "MATCH";
    const status = match.status || "Status unavailable";
    const venue = match.venue || "Venue not specified";

    // Create match card HTML
    matchesHTML += `
      <div class="match-card ${statusClass}">
        <div class="match-header">
          <div class="match-type">${matchType}</div>
          <div class="match-date">${matchDate}</div>
        </div>
        
        <div class="teams">
          <div class="team">
            <div class="team-name">${team1}</div>
            <div class="team-score">${team1Score}</div>
          </div>
          
          <div class="team-vs">VS</div>
          
          <div class="team">
            <div class="team-name">${team2}</div>
            <div class="team-score">${team2Score}</div>
          </div>
        </div>
        
        <div class="match-status ${statusClass}">
          ${status}
        </div>
        
        <div class="match-venue">
          ${venue}
        </div>
      </div>
    `;
  });

  scoresDiv.innerHTML = matchesHTML;
}