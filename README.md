# World Cup Simulator 2022

This World Cup simulator allows you to simulate matches between any two international teams from the 2022 World Cup. The simulator uses a 5-star rating system to evaluate the quality of each team and predict the score. Additionally, it displays player lineups and uses a Progressive Web App (PWA) for enhanced functionality and user experience.

## Features

+ **Team Simulation**: Simulate matches between any two international teams.
+ **Team Ratings**: Teams are rated using a 5-star rating system based on their quality. 
+ **Player Lineups**: Displays the player lineups for both teams. 
+ **PWA Support**: The app includes PWA features for better performance and offline capabilities. 

## Installation

1. **Clone the repository**:
   ```sh
   git clone <repository-url>
   cd world-cup-simulator
   ```
2. **Install dependencies**:
   ```sh
   npm install
   ```
3. **Start the server**:
   ```sh
   node server.js
   ```

## Usage
+ Simulate a Match: 
    - Visit the /select route to select teams for simulation. 
    - The simulator will predict the match outcome based on the team's ratings and display the player lineups. 
+ Settings: 
    - Visit the /settings route to adjust the volume, chance, and interval settings for the simulation. 

## Data Management
+ Fetching Teams: 
    - **`mongoFind.js`** contains the logic for fetching the list of teams from the MongoDB database. 
+ Updating Teams: 
    - **`update.js`** and **`mongoReplace.js`** handle updating the team data by fetching the latest information from an external API and replacing the old data in the MongoDB database.

## Event Handling
The **`events.js`** file manages UI interactions, such as selecting teams and starting simulations. It also includes functions for preloading images and managing the UI elements related to team selection and match simulation.

## Simulation Logic
The **`game.js`** file contains the main logic for running the match simulations:

+ **Starting a Game**: Initializes the match and sets up the UI. 
+ **Simulation**: Uses random number generation (RNG) to simulate match events based on team rankings and player lineups. 
+ **Audio**: Plays sound effects during the match. 

## Example Routes
+ **Home**: */* - Main menu. 
+ **Select Team**: */select* - Select teams for simulation. 
+ **Settings**: */settings* - Adjust simulation settings. 
+ **Update Teams**: */update* - Update team data from the external API. 

## Example Commands
- **Simulate Match**: 
```sh
Copy code
curl -X POST http://localhost/simulate -H "Content-Type: application/json" -d '{"homeTeam": "Brazil", "awayTeam": "France"}'
```

- **Update Teams**: 
```sh
Copy code
curl http://localhost/update
```
