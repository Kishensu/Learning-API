async function searchPlayers() {
    const playerInputs = document.querySelectorAll('.playerInput');
    const playerDetailsContainers = document.querySelectorAll('.playerDetails');
    const weightComparisonContainer = document.getElementById('weightComparison');

    if (playerInputs.length !== 2 || playerDetailsContainers.length !== 2 || !weightComparisonContainer) {
        console.error('Invalid HTML structure for two players or missing weight comparison container.');
        return;
    }

    try {
        
        playerDetailsContainers.forEach(container => {
            container.innerHTML = '';
        });
        weightComparisonContainer.innerHTML = '';

        for (let i = 0; i < playerInputs.length; i++) {
            const playerName = playerInputs[i].value.trim();

            if (playerName === '') {
                alert('Please enter both player names.');
                return;
            }

            const playerUrl = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${playerName}`;

            const response = await axios.get(playerUrl);
            const players = response.data.player;

            if (!players || players.length === 0) {
                playerDetailsContainers[i].innerHTML = `<p>Player '${playerName}' not found. Please try again.</p>`;
            } else {
                const player = players[0];
                const playerDetails = `
                    <h2>${player.strPlayer}</h2>
                    <p>Current Team: ${player.strTeam}</p>
                    <p>Salary: ${player.strWage}</p>
                    <p>Description: ${player.strDescriptionEN}</p>
                    <p>Weight: ${player.strWeight}</p>
                `;
                playerDetailsContainers[i].innerHTML = playerDetails;

                // Display weight comparison using horizontal bars
                const weightComparisonItem = document.createElement('div');
                weightComparisonItem.classList.add('weightComparisonItem');

                const weightLabel = document.createElement('p');
                weightLabel.classList.add('weightLabel');
                weightLabel.textContent = `${player.strPlayer}'s Weight`;

                const progressBarContainer = document.createElement('div');
                progressBarContainer.classList.add('progressBarContainer');

                const progressBar = document.createElement('div');
                progressBar.classList.add('progressBar');
                const weightPercentage = parseFloat(player.strWeight) || 0; 
                progressBar.style.width = `${weightPercentage}%`;

                progressBarContainer.appendChild(progressBar);
                weightComparisonItem.appendChild(weightLabel);
                weightComparisonItem.appendChild(progressBarContainer);

                weightComparisonContainer.appendChild(weightComparisonItem);
            }
        }
    } catch (error) {
        console.error('Could not fetch player data.', error);
        playerDetailsContainers.forEach(container => {
            container.innerHTML = '<p>Could not fetch player data.</p>';
        });
    }
}
