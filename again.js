// import { questionInt } from 'readline-sync';
// import * as readline from 'node:readline/promises';

// // Define the available character classes
// const characterClasses = [
//   {
//     name: 'Titan - (Bear)',
//     description: 'A powerful tank with high defense and HP.'
//   },
//   {
//     name: 'Tempest - (Panther)',
//     description: 'A nimble rogue with high speed and evasion.'
//   },
//   {
//     name: 'Phoenix',
//     description: 'A magical mage with powerful spells and AoE attacks.'
//   },
//   {
//     name: 'Aurora - (Swan)',
//     description: 'A graceful healer with powerful support abilities.'
//   },
//   {
//     name: 'REO',
//     description: 'A savage berserker with high attack and critical hit rate.'
//   }
// ];

// // Display the welcome message
// addToOutput('Welcome to the dungeon crawler game!\n');

// // Prompt the user to choose a character class
// addToOutput('Please select a character class:');
// for (let i = 0; i < characterClasses.length; i++) {
//   addToOutput(`${i + 1}. ${characterClasses[i].name} - ${characterClasses[i].description} \n`);
// }
// const selection = questionInt('> ');

// // Validate the user's selection
// if (selection < 1 || selection > characterClasses.length) {
//   addToOutput('Invalid selection. Please try again.');
// } else {
//   const chosenClass = characterClasses[selection - 1];
//   addToOutput(`You have chosen the ${chosenClass.name} class.`);
//   // TODO: Add logic to start the game with the chosen character class
// }


// Truuu//
//----------------------------------------------------------------------------------------------------------------------------------------------------------------//


import { keyInSelect, question} from 'readline-sync';
import readline from 'readline';
import { messageHistory, addToMessageHistory } from './messageHistory.js';

//const readline = require('readline');

// create an interface for reading lines from standard input

// Your code using readline goes here
function ok(){
  const MAX_LINES = 10;
  const output = [];
  
  function addToOutput(text) {
    output.push(text);
    if (output.length > MAX_LINES) {
      output.shift();
    }
    console.clear();
    console.log(output.join('\n'));
  }
  
  
  
  
  
  
  // keep track of the last 20 lines of output
  // add dodge function -- could be related to speed
  
  
  
  class Player {
    constructor(name, health, attack, defense, speed, isAlive) {
      this.name = name;
      this.health = health;
      this.attackPower = attack;
      this.defense = defense;
      this.speed = speed;
      this.isAlive = isAlive;
      this.isDefending = false;
      this.maxHealth = health;
      this.maxDefense = defense;
      this.isAttacking = false;
    }
    
    attack(enemy) {
      let damage = this.attackPower;
      
      if (enemy.isDefending) {
        if (enemy.defense >= damage) {
          enemy.defense -= damage;
        } else {
          let left = damage - enemy.defense;
          enemy.defense = 0;
          enemy.health -= left;
        }
      } else {
        enemy.health -= damage;
      }
      
      console.log(`${this.name} attacks ${enemy.name} for ${damage} damage.`);
      
      if (enemy.health <= 0) {
        console.log(`${enemy.name} has been defeated.`);
      }
    }
    
    block() {
      console.log(`${this.name} is defending!`);
      this.isDefending = true;
    }
  }
  
  /* Introducing TITAN - Titan is a showman that will do everything to be on top. Titan's passive is INTIMIDATE: if Titan's health is higher than his enemy's health his defense will increase.
  --Titan's Special Ability is One-UP: if Titan's opponent has more defense than him he buffs himself to have +1 defense then them. After regaining his dominance Titan unleashes a powerful attack on his now weaker enemy */
  
  class TitanBear extends Player {
    constructor(name) {
      super(name, 200, 20, 10, 20, true);
      this.attackName = "20";
    }
    
    attack(enemy, isDefending) {
      addToOutput(`${this.name} uses Shoulder Charge on ${enemy.name}`);
      addToOutput(`${this.name}'s defense increased by 20!`);
      if(this.health >= enemy.health) {
        this.defense += 5
      }
      //this.defense += 20;
      
      super.attack(enemy, isDefending);
      
    }
    special(enemy) { // One-UP
      let damage;
      if(this.defense < enemy.defense) {
        this.defense = enemy.defense + 1;
        damage = this.attackPower + 50 ;
      }
      else{ damage = this.attackPower}
      
      
      if (enemy.isDefending) {
        if (enemy.defense >= damage) {
          enemy.defense -= damage;
        } else {
          let left = damage - enemy.defense;
          enemy.defense = 0;
          enemy.health -= left;
        }
      } else {
        enemy.health -= damage;
      }
      
      console.log(`${this.name} attacks ${enemy.name} for ${damage} damage.`);
      
      if (enemy.health <= 0) {
        console.log(`${enemy.name} has been defeated.`);
      }
    }
  }
  
  // Crit damage || 'exposed' damage
  
  class TempestPanther extends Player {
    constructor(name) {
      super(name, 150, 30, 30, 70, true);
      this.attackName = "Lightning Strike-(30)";
      
    }
    attack(enemy, isDefending) {
      addToOutput(`${this.name} uses Shoulder Charge on ${enemy.name}`);
      addToOutput(`${this.name}'s defense increased by 20!`);
      //this.defense += 20;
      
      super.attack(enemy, isDefending);
    }
    special(enemy) {
      
    }
  }
  
  
  class Phoenix extends Player {
    constructor(name) {
      super(name, 150, 27, 25, 55, true);
      this.attackName = "Blaze-(27)";
    }
    attack(enemy, isDefending) {
      addToOutput(`${this.name} uses Shoulder Charge on ${enemy.name}`);
      addToOutput(`${this.name}'s defense increased by 20!`);
      //this.defense += 20;
      
      super.attack(enemy, isDefending);
    }
  }
  
  /* Introducing RAY - Ray has a very unique passive and play-style. The more critical his health is, the more powerful he will become. 
  - As he takes damage he begins to flicker, dealing more damage. Once he reaches critical health he becomes unstable, causing a supernova - his damage radiates, piercing through enemy's defense.
  - RAY can heal himself, making him more stable, however in his default state he is much weaker. */
  
  class Ray extends Player {
    constructor(name) {
      super(name, 180, 10, 75, 50, true);
      this.attackName = "Illuminate-(22)";
      this.baseAttack = this.attackPower;
      this.flicker = false;
      this.radiate = false;
      this.flickerDamage = this.attackPower + 10;
      this.superNovaDamage = this.flickerDamage + 10;
      
      
    }
    //fix!// make it so that when low health damage is increased, when critical low health damage peirces defense straight to enemy hp. Playstlye is to try an be as low health as possible with out dying, ability allows you to health youself just incase. maybe lowker health amout every use
    
    attack(enemy) {
      let damage = this.attackPower;
      if(this.health > 99){
        this.flickerDamage = this.baseAttack + 10;        
        this.superNovaDamage = this.baseAttack + 10;            // RAY can stack his SuperNova damage by switching into and out of a unstable state. //
        this.flicker = false;
        this.radiate = false
        damage = this.baseAttack;
      }
      else if(this.health <= 99 && this.health > 35){
        this.flicker = true;
        this.radiate = false;
        damage = this.flickerDamage;
        
      }
      else if(this.health <= 35){
        this.radiate = true
        this.flicker = false
        damage = this.superNovaDamage
      }
      
      if (enemy.isDefending) {
        if(this.radiate){
          enemy.health -= this.superNovaDamage;
        }
        if (enemy.defense >= damage) {
          enemy.defense -= damage;
        } else {
          let left = damage - enemy.defense;
          enemy.defense = 0;
          enemy.health -= left;
        }
      } else {
        enemy.health -= damage;
      }
      
      console.log(`${this.name} attacks ${enemy.name} for ${damage} damage.`);
      
      if (enemy.health <= 0) {
        console.log(`${enemy.name} has been defeated.`);
      }
    }
    
    special(enemy) {
      this.health += 50;  
    }
  }
  
  
  /* Introducing REO - REO is a utility character that take pride in precision. Though he may be low in health his special ability has many ways to make up for that.
  - The first part of his special ability is sharpen: While sharpening his tools REO is susceptible to damage, however once fully sharpened he deals a powerful attack!
  - The second part of his special ability is fortify: REO creates a shield and strengthens it each time
  - REO's passive is defense-mechanism: when low health REO breaks his own shield transferring it into health. If there is no shield he will transfer his own attack power into health!      */
  class REO extends Player {
    constructor(name) {
      super(name, 120, 30, 0, 25, true);this.attackName = "30";               // Important to keep in mind that REO's standard attack is high, so it might be best to switch between sharped(to fortify) and then use the normal attack,  
      this.chargeCount = 1 ;            
      this.baseAttack = this.attackPower;                                      // relying on extra health protection from special ability. Strategic play-style with delayed gratification
      this.frenzyDamage = this.attackPower;
      if(this.attackPower == this.baseAttack) {
        
        this.replenished = true;                                                         //** ,aybe allow for his  */
      }
    }
    
    attack(enemy, isDefending) {
      addToOutput(`${this.name} attacked ${enemy.name}`);   
      super.attack(enemy, isDefending);
      if(this.health <= 1) {
        this.health = this.defense;
      }
      
      
    }
    special(enemy,isDefending){ 
      addToOutput(`Charge Count: ${this.chargeCount}`);
      if(this.chargeCount > 4){
        
        let damage = this.frenzyDamage;
        if (enemy.isDefending) {
          if (enemy.defense >= damage) {
            enemy.defense -= damage;
          } else {
            let left = damage - enemy.defense;
            enemy.defense = 0;
            enemy.health -= left;
          }
        } else {
          enemy.health -= damage;
        }
        this.defense += 10
        addToOutput(`${this.name} used Frenzy ${enemy.name} for ${damage} damage!`);
        
        if (enemy.health <= 0) {
          addToOutput(`${enemy.name} has been defeated.`);
        }
        this.chargeCount = 1
        this.frenzyDamage = this.attackPower;
      }
      if(!this.replenished) {
        this.attackPower += 10;
      } 
      this.chargeCount++;
      this.frenzyDamage += (this.attackPower - 12.25);  
      this.defense += 5;
      
      if(this.health < 20){
        this.health += this.defense;
        this.defense = 0
        this.health += this.frenzyDamage;
      }
      if (this.defense > this.health + 20) {
        this.health = this.defense;
        this.defense = 0;
      }
      
      
    }
    
  }
  
  
  // class Room {
  //   constructor() {
  //     this.enemies = [];
  //   }
  
  //   addEnemy(enemy) {
  //     this.enemies.push(enemy);
  //   }
  
  //   removeEnemy(enemy) {
  //     const index = this.enemies.indexOf(enemy);
  //     if (index !== -1) {
  //       this.enemies.splice(index, 1);
  //     }
  //   }
  
  //   hasEnemies() {
  //     return this.enemies.length > 0;
  //   }
  
  //   getEnemyAbilities() {
  //     const abilities = [];
  //     for (const enemy of this.enemies) {
  //       abilities.push(enemy.ability());
  //     }
  //     return abilities;
  //   }
  // }
  
  // class Enemy {
  //   constructor(name, health, attack, defense, ability) {
  //     this.name = name;
  //     this.health = health;
  //     this.attack = attack;
  //     this.defense = defense;
  //     this.ability = ability;
  //   }
  // }
  
  // // Example enemy abilities
  // const abilities = {
  //   fireball: () => {
  //     addToOutput('Enemy casts fireball!');
  //     Player.health -= 20;
  //   },
  //   heal: () => {
  //     addToOutput('Enemy casts heal!');
  //     Enemy.health += 15;
  //   },
  //   poison: () => {
  //     addToOutput('Enemy casts poison!');
  //     Player.health -= 10;
  //     Player.attack -= 5;
  //   }
  // };
  // Example room with enemies
  // const room = new Room();
  // room.addEnemy(new Enemy('Goblin', 50, 10, 5, abilities.fireball));
  // room.addEnemy(new Enemy('Orc', 75, 15, 10, abilities.poison));
  // room.addEnemy(new Enemy('Skeleton', 40, 8, 3, abilities.poison));
  class Enemy{
    constructor(name, health, attackPower, defense,){
      this.name = name;
      this.health = health;
      this.attackPower = attackPower;
      this.defense = defense;
      this.isDefending = false;
      this.maxHealth = health;
      this.maxDefense = defense;
      
    }
    attack(player) {
      let damage = this.attackPower;
      
      if (player.isDefending) {
        if (player.defense >= damage) {
          player.defense -= damage;
        } else {
          let left = damage - player.defense;
          player.defense = 0;
          player.health -= left;
        }
      } else {
        player.health -= damage;
      }
      
      console.log(`${this.name} attacks ${player.name} for ${damage} damage.`);
      
      if (player.health <= 0) {
        console.log(`${player.name} has been defeated.`);
      }
    }
    
    block(){
      addToOutput(`${this.name} is defending!`);
      this.isDefending = true;
    }
    
    
    // only works if players first choice id defend...... 
    makeDecision(player) {
      //addToOutput(`health: ${this.health}, maxHealth: ${this.maxHealth}, defense: ${this.defense}, maxDefense: ${this.maxDefense}`);
      
      const healthRatio = this.health / this.maxHealth;
      const defenseRatio = this.defense / this.maxDefense;
      
      if (healthRatio > 0.5 && defenseRatio < 0.2) {
        // If the enemy's health is above 50% and the player's defense is low, attack
        this.attack(player);
      } else if (healthRatio < 0.2) {
        // If the enemy's health is below 20%, always block
        this.block();
      } else {
        // Otherwise, make a random decision to attack or block
        const decision = Math.random() < 0.5 ? "attack" : "block";
        if (decision === "attack") {
          this.attack(player, false);
        } else {
          this.block();
        }
      }
    }
    
    
    
    
    
  }
  
  
  
  function generateEnemies() {
    const numEnemies = Math.floor(Math.random() * 3) + 2; // Generate a random number of enemies (1-4)
    const enemies = [];
    
    for (let i = 0; i < numEnemies; i++) {
      // Generate a random enemy type
      //const enemyType = Math.floor(Math.random() * 5);
      const enemy = new Enemy("enemy1",Math.floor(Math.random() * 61) + 150,Math.floor(Math.random() * 10) + 10,Math.floor(Math.random() * 25) + 25 )
      enemies.push(enemy);
      // Generate an enemy object with a name, health, attack, and defense
    }
    
    
    return enemies;
  }
  
  let enemies = generateEnemies();
  class Dungeon {
    constructor(name, enemies) {
      this.name = name;
      /// this.maxRooms = maxRooms;
      this.enemies = enemies;
      this.currentRoom = 1;
      
    }
    
    
  }
  
  
  
  
  
  addToOutput("Welcome to the game! Choose your character class:");
  
  const classes = ["Titan-(Bear)", "Tempest-(Panther)", "Phoenix", "RAY", "REO"];
  const index = keyInSelect(classes, "Select a class:");
  
  if (index === -1) {
    addToOutput("Exiting game...");
    process.exit();
  }
  
  const selectedClass = classes[index];
  const playerName = question("Enter your name: ");
  
  let player;
  
  switch (selectedClass) {
    case "Titan-(Bear)":
    player = new TitanBear(playerName);
    break;
    case "Tempest-(Panther)":
    player = new TempestPanther(playerName);
    break;
    case "Phoenix":
    player = new Phoenix(playerName);
    break;
    case "RAY":
    player = new Ray(playerName);
    break;
    case "REO":
    player = new REO(playerName);
    break;
  }
  
  addToOutput(`Welcome ${player.name}! You have selected the ${selectedClass} class. \n` );
  
  
  const start= new Dungeon("first", enemies);
  // Now you can use the `player` object to implement the actual gameplay.
  class Game {
    
    constructor(player, dungeon) {
      this.player = player;
      this.dungeon = dungeon;
      this.gameOver = false;
      this.enemyCounter = 0;
      this.enemyRemaining = this.dungeon.enemies.length;
      this.messageHistory = []
    }
    displayMessage(message) {
      this.messageHistory.push(message);
      if (this.messageHistory.length > 10) {
        this.messageHistory.shift();
      }
      
      readline.cursorTo(process.stdout, 0, 0);
      readline.clearScreenDown(process.stdout);
      addToOutput(this.messageHistory.join('\n'));
    }
    
    async start() {
      addToOutput("The game has begun!");
      
      
      while (!this.gameOver) {
        this.displayGameState();
        this.handleUserInput();
      }
      
      this.displayGameOver();
    }
    
    displayGameState() {
      addToOutput(` \n ${this.player.name} stats are: Health: ${player.health}, Attack: ${player.attackName}, Defense: ${player.defense}, Speed: ${player.speed}.\n`);
      
      let i = this.enemyCounter;
      
      addToOutput(`Number of enemies: ${this.enemyRemaining}`);
      addToOutput(`Current enemy Health: ${this.dungeon.enemies[this.enemyCounter].health}, Attack: ${this.dungeon.enemies[this.enemyCounter].attackPower}, Defense: ${this.dungeon.enemies[this.enemyCounter].defense}, Speed: ${this.dungeon.enemies[this.enemyCounter].speed} \n`);
      
      
      //addToOutput(`\n${this.dungeon.currentRoom.description}`);
    }
    
    handleUserInput() {
      
      const input = question("What would you like to do? Attack(1), Defend(2), Use Special Ability(3)\n");
      if (input === "1") {
        this.player.attack(this.dungeon.enemies[this.enemyCounter],this.dungeon.enemies[this.enemyCounter].isDefending);
        
        this.dungeon.enemies[this.enemyCounter].makeDecision(player, player.isDefending);
        if (this.dungeon.enemies[this.enemyCounter].health <= 0) {
          this.dungeon.enemies[this.enemyCounter].eliminated = true;
          addToOutput(`${this.dungeon.enemies[this.enemyCounter].name} defeated!`);
          this.enemyCounter++;
          this.enemyRemaining --;
          
          
        }
        
      } 
      else if (input === "2") {
        this.player.block();
        this.dungeon.enemies[this.enemyCounter].makeDecision(player, player.isDefending);
        if (this.dungeon.enemies[this.enemyCounter].health <= 0) {
          this.dungeon.enemies[this.enemyCounter].eliminated = true;
          addToOutput(`${this.dungeon.enemies[this.enemyCounter].name} defeated!`);
          this.enemyCounter++;
          this.enemyRemaining --;
        }
      } 
      else if (input === "3") {
        this.player.special(this.dungeon.enemies[this.enemyCounter]);
        this.dungeon.enemies[this.enemyCounter].makeDecision(player, player.isDefending);
        if (this.dungeon.enemies[this.enemyCounter].health <= 0) {
          this.dungeon.enemies[this.enemyCounter].eliminated = true;
          addToOutput(`${this.dungeon.enemies[this.enemyCounter].name} defeated!`);
          this.enemyCounter++;
          this.enemyRemaining --;     
        }
      } else if (input === "flee") {
        addToOutput(`${this.player.name} has fled from the battle!`);
        this.dungeon.currentRoom.enemy = null;
      } else {
        addToOutput(`Invalid input: ${input}`);
      }
      
      if (this.player.health <= 0 || this.dungeon.enemies[enemies.length -1].eliminated) {
        this.gameOver = true;
      } 
    }
    getEnemyAction(enemy){
      addToOutput(enemy.attackName)
    }
    
    displayGameOver(){
      if (this.player.health <= 0) {
        addToOutput("You have been defeated! Game over.");
      } else {
        addToOutput("Congratulations, you have completed the dungeon! Game over.");
      }
    }
    
  }
  
  
  
  const go = new Game(player,start);
  go.start();
  
}


function enemyAction( defense, speed, health, moves) {
  if (Math.random() < speed / 100) {
    return moves[0];
  } else if (health < 45 || defense > 0) {
    if (Math.random() < 0.55) {
      return moves[1];;
    } else {
      return moves[2];
    }
  } else {
    return moves[2];
  }
}

// const input = question("What would you like to do? \n");
// // Set up initial game state
// let pplayer = new Player("Bob", 100, 10, 5, 20, true);
// let eenemy = new enemy("Goblin", 50, 5, 2, 10, true);

// // Game loop
// while (pplayer.isAlive && eenemy.isAlive) {
//   // Player turn
//   let playerAction = input
//   switch (playerAction) {
//     case "attack":
//      pplayer.attack(eenemy);
//       break;
//     case "defend":
//       pplayer.block();
//       break;
//     case "ability":
//       player.ability(eenemy);
//       break;
//     default:
//       // Handle invalid input
//       break;
//   }

//   // Enemy turn
//   let enemyAction = getEnemyAction();
//   switch (enemyAction) {
//     case "attack":
//       enemy.attack(pplayer);
//       break;
//     case "defend":
//       enemy.block();
//       break;
//     case "ability":
//       enemy.ability(pplayer);
//       break;
//     default:
//       // Handle invalid input
//       break;
//   }
// }


// // Check win/lose conditions
// if (!pplayer.isAlive) {
//   // Player lost
// } else if (!eenemy.isAlive) {
//   // Player won
// }
// }

ok();
// const defense = 10;
// const speed = 70;
// const health = 50;

// const action = enemyAction(defense, speed, health);
// console.log(action); // "dodge", "block", or "attack"

/*----------------------------To Add------------------------------------------------------------------------------

- Make the defense and speed attack relevant to the game-play, (potentially remove speed idk)
-- for if player choses to defend then the incoming damage is go to (be subtracted from) the player's defense stat, likewise for the enemy.
-- add decisions for enemy on when is should use certain moves or not.

-add different abilities ( maybe later for now)

--have environment effects for hero and
-- think of sacrifice ability
-- reo can be a cook drink maker, 
-- other fun idea like project planner, developer 
-- Maybe add that REO can add his defense stat to an attack, to promote aggressive play-style
-- I think make Titan's description better
!!!!!-- !DO  the second and third character

!--Adjust both player and enemy stats accordingly so it is move balanced. 


potentially use the original code(at the very top) for player class descriptions (maybe by adding a 6th choice in the menu for more info(descriptions)
-if you are going to use 'AoE' it could be used by effecting enemies[current] && enemies[current+1] - basically deal damage to current enemy and next enemy in array (will have to handle out of bounds though..) 
------------------------------------------------------------------------------------------------------------------*/
