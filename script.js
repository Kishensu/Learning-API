//Using "axios, async await and try & catch" to retrieve information from the WEB API based on a given input.
//Used the onClick() event handler attribute in the HTML

//async function declaration
async function searchPlayer() {
    
    const playerName = document.getElementById('playerInput').value;

    if (playerName === '') {
        alert('Please enter the player name.');
        return;
    }

    //using the dynamic parameter: "playerName" as the API endpoint 
    const playerUrl = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${playerName}`;

    try {
        
        const response = await axios.get(playerUrl);

        //Extracting the response "data" from the axios response. Because Axios
        //response includes other properties
        const data = response.data;

        //Getting the 'player' array from the data object.
        const players = data.player;

        
        if (!players) {
            document.getElementById('playerDetails').innerHTML = '<p>Player not found. Please try again.</p>';
            return;
        }

        //When a user inputs a player name,
        //it calls the first "Player Object" from the 'players' array.
        const player = players[0];

        // selecting the data I want from the Web API object array
        const playerDetails = `
            <h2>${player.strPlayer}</h2>
            <p>Current Team: ${player.strTeam}</p>
            <p>Salary: ${player.strWage}</p>
            <p>Description: ${player.strDescriptionEN}</p>

        `;

        document.getElementById('playerDetails').innerHTML = playerDetails;
    } catch (error) {
        document.getElementById('playerDetails').innerHTML = '<p>Could not fetch player data.</p>';
    }
}
