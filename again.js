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



//----------------------------------------------------------------------------------------------------------------------------------------------------------------//


import { keyInSelect, question} from 'readline-sync';
import readline from 'readline';
import figlet from 'figlet';
import chalk from'chalk';



// create an interface for reading lines from standard input

// Code for using readline 
function ok(){
  let MAX_LINES = 7;
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
    constructor(name, health, attack, defense, speed, isAlive, playerClass) {
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
      this.distanceClosed = 0;
      this.enemyDefended = false;
      this.flee = false;
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
  
  
  // find a way to nerf
  class TitanBear extends Player {
    constructor(name) {
      super(name, 200, 20, 10, 20, true);
      this.playerClass = "Titan"
      this.attackName = "20";
      this.enemyDefended = false;
      this.firstStrike = false;
      this.secondStrike = false;
      this.gridLock = false;
      this.pursue = 20
      this.maxBuff = 50
    }
    
    attack(enemy) {
      if (this.health >= enemy.health) {
        this.defense += 5;
        this.maxDefense = this.defense 
        if(this.defense >= this.maxBuff){
          this.defense = this.maxBuff;
          this.maxDefense = this.defense 
        }
      }
      
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
    
    special(enemy) { // One-UP
      let damage;
      if (this.defense < enemy.defense) {
        this.maxDefense = enemy.defense + 1;
        this.defense = enemy.defense + 1;
        damage = this.attackPower + this.attackPower/2;
      } else {
        damage = this.attackPower /2;
      }
      
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
  
  // stealth -close combat. Passive is Dodge: Tempest has a X percent of dodgeing an incoming attack, Special is Pursue/Execute: on use tempest will pursue his enemy closing the distance between them.
  // Once in range, tempest perform an execute attack on the enemy.
  // The closer tempest gets to an enemy the more damage he will take, the change of dodge will also be lower when in close range.
  // When activly pursuing, the chance of dodge wil will be low. 
  class TempestPanther extends Player {
    constructor(name) {
      super(name, 150, 5, 30, 70, true);
      this.playerClass = "Tempest";
      
      this.attackName = "Lightning Strike-(30)";
      this.distanceFromEnemy = 100;
      this.pursue = 20
      this.firstStrike = false;
      this.secondStrike = false;
      this.gridLock = false;
      this.pursue = 20
      this.thunderboltCounter = 0
      this.secondStrikeCounter = 0
      this.dodged = false;
      this.dodgeChance = 0.6
      
      
    }
    attack(enemy, isDefending) {
      
      function abilityLands(chance) {
        return Math.random() < chance;
      }
      
      const dodgeLands = Math.random() < this.dodgeChance;
      
      if(dodgeLands){
        this.dodged = true
      }
      
      
      
      // Determine if ability A lands (80% chance)
      const abilityALands = Math.random() < 0.8;
      
      if (abilityALands) {
        this.thunderboltCounter++
        this.attackPower = 30;
        this.firstStrike = true;
        this.secondStrike = false;
        this.gridLock = false;
        addToOutput(this.thunderboltCounter);
        super.attack(enemy, isDefending);
        // Determine if ability B lands (60% chance)
        const abilityBLands = Math.random() < 0.6;
        
        if (abilityBLands) {
          this.attackPower = 10;
          this.secondStrike = true;
          this.firstStrike = false;
          this.gridLock = false;
          this.secondStrikeCounter++;
          addToOutput(this.secondStrikeCounter);
          super.attack(enemy, isDefending);
          // Determine if ability C lands (30% chance)
          const abilityCLands = Math.random() < 0.3;
          
          if (abilityCLands) {
            addToOutput("Enemy GridLocked!!!")
            this.gridLock = true;
            this.secondStrike = false;
            this.firstStrike = false;
            this.attackPower = 5;
            this.pursue = 100;
            super.attack(enemy, isDefending);
            
            console.log("Ability C landed");
          } else {
            addToOutput("Second Strike landed, but Third Strike missed");
            this.gridLock = false;
          }
        } else {
          addToOutput("ThunderBolt landed, but Second Strike missed");
          this.secondStrikeCounter = 0;
          this.secondStrike = false;
          this.gridLock = false;
        }
      } else {
        addToOutput("ThunderBolt missed");
        this.thunderboltCounter = 0
        this.firstStrike = false;
        this.secondStrike = false;
        this.gridLock = false;
      } 
    }
    special(enemy,isDefending) {
      let damage = this.attackPower;
      this.firstStrike = false;
      this.secondStrike = false;
      this.gridLock = false;
      
      if(this.distanceFromEnemy <= 0){
        addToOutput(`${enemy.name} Executed!`)
        
        damage = 999;
        this.distanceFromEnemy = 120;
      }
      this.distanceFromEnemy -= this.pursue;
      if(this.distanceFromEnemy < 0){
        this.distanceFromEnemy = 0;
      }
      
      
      //   this.dodgeChance -= .1   - this will lower the dodge chance each time Tempest gets closer to the enemy  //
      this.pursue = 20;
      this.distanceClosed = 100 - this.distanceFromEnemy
      
      addToOutput(`Closing Distance: ${this.distanceFromEnemy}`)
      addToOutput(this.distanceClosed);
      
      if (isDefending) {
        addToOutput('isDefending:'+ isDefending);
        addToOutput('damage:'+ damage);
        
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
  
  // Gardener, Special plants a tree, as the game progresses, the tree will grow. The tree will do different things based on it stage of growth.
  
  
  // ability unlocks after x amount damage done
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
  
  // nerf health special 
  
  
  class Ray extends Player {
    constructor(name) {
      super(name, 180, 10, 75, 50, true);
      this.playerClass = "Ray";
      this.attackName = "Illuminate-(22)";
      this.baseAttack = this.attackPower;
      this.flicker = false;
      this.radiate = false;
      this.flickerDamage = this.attackPower + 10;
      this.superNovaDamage = this.flickerDamage + 10;
      this.maxHealth = this.health;
      this.heal = 50;
      
    }
    //fix!// make it so that when low health damage is increased, when critical low health damage peirces defense straight to enemy hp. Playstlye is to try an be as low health as possible with out dying, ability allows you to health youself just incase. maybe lowker health amout every use
    
    attack(enemy) {
      let damage = this.attackPower;
      if(this.health > 99){
        this.flickerDamage = this.baseAttack + 10;        
        this.superNovaDamage = this.baseAttack + 20;            // RAY can stack his SuperNova damage by switching into and out of a unstable state. //
        this.flicker = false;
        this.radiate = false
        damage = this.baseAttack;
      }
      else if(this.health <= (player.maxHealth) * 0.5 && this.health >= (player.maxHealth) * 0.2 ){
        this.flicker = true;
        this.radiate = false;
        damage = this.flickerDamage;
        
      }
      else if(this.health <=  (player.maxHealth) * 0.2){
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
      //let count = 0
      if(this.heal <= 10){
        this.health += 1;
        this.heal = 1
      }
      
      else{
        this.heal -= 10
        this.health += this.heal;
        
      }
      if(this.health > this.maxHealth){
        this.health = this.maxHealth;
      }
    }
  }
  
  
  /* Introducing REO - REO is a utility character that take pride in precision. Though he may be low in health his special ability has many ways to make up for that.
  - The first part of his special ability is sharpen: While sharpening his tools REO is susceptible to damage, however once fully sharpened he deals a powerful attack!
  - The second part of his special ability is fortify: REO creates a shield and strengthens it each time
  - REO's passive is defense-mechanism: when low health REO breaks his own shield transferring it into health. If there is no shield he will transfer his own attack power into health!      */
  // have 'reflect ability/
  
  // !!!! maybe change to the study character (Mad Scientist)
  class REO extends Player { 
    constructor(name) {
      super(name, 120, 30, 0, 25, true);this.attackName = "30"; // Important to keep in mind that REO's standard attack is high, so it might be best to switch between sharped(to fortify) and then use the normal attack,  
      this.playerClass = "Reo"              
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
      //addToOutput(`Charge Count: ${this.chargeCount}`);
      if(this.chargeCount > 4){
        
        let damage = this.frenzyDamage;
        if (isDefending) {
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
        // addToOutput(`${this.name} used Frenzy ${enemy.name} for ${damage} damage!`);
        
        if (enemy.health <= 0) {
          //  addToOutput(`${enemy.name} has been defeated.`);
        }
        this.chargeCount = 0
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
      this.isDefending = false;
      
      
      if(player.dodged){
        addToOutput(`${player.name} dodged!`)
        player.dodged = false;
      }
      
      else if (player.isDefending) {
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
      } this.attackPower +=  player.distanceClosed
    }
    
    block(player){
      // addToOutput(`${this.name} is defending!`);
      this.isDefending = true;
      player.enemyDefended = true;
      this.attackPower +=  (player.distanceClosed * .1) // will increase damage based on how close it is to the player
    }
    
    
    
    makeDecision(player) {
      //addToOutput(`health: ${this.health}, maxHealth: ${this.maxHealth}, defense: ${this.defense}, maxDefense: ${this.maxDefense}`);
      
      const healthRatio = this.health / this.maxHealth;
      const defenseRatio = this.defense / this.maxDefense;
      
      if (healthRatio > 0.5 && defenseRatio < 0.2) {
        // If the enemy's health is above 50% and the player's defense is low, attack
        this.attack(player);
      } else if (healthRatio < 0.2) {
        // If the enemy's health is below 20%, always block
        this.block(player);
      } else {
        // Otherwise, make a random decision to attack or block
        const decision = Math.random() < 0.5 ? "attack" : "block";
        if (decision === "attack") {
          this.attack(player, false);
        } else {
          this.block(player);
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
      // maybe buff enemiy
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
  
  const classes = ["Titan-(Bear)", "Tempest", "Phoenix", "RAY", "REO"];
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
    case "Tempest":
    player = new TempestPanther(playerName);
    MAX_LINES = 10;
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
  const advance = question("Press 1 to continue...\n");
  
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
      
      // Display the titles for Player Health and Defense
      
      addToOutput(`\n                  PLAYER HEALTH: ${player.health}/${player.maxHealth}                 PLAYER DEFENSE: ${player.defense}/${player.maxDefense}` )
      
      // If playing as RAY, the Health UI will have visuals for current health/power indicators
      if(player.playerClass == "Ray"){
        addToOutput(generateHealthProgressBar(player.health, player.maxHealth, 50) + "  " + generateProgressBar(player.defense,player.maxDefense, 25)+ " \n\n" )
      }
      
      else{   
        if(player.defense == player.maxBuff){
          addToOutput(generateProgressBar(player.health, player.maxHealth, 50) + "  " + generateProgressBar(player.defense,player.maxDefense, 25)+ " MAX DEFENSE \n\n" )
        }
        else if(player.defense != player.maxBuff){
          addToOutput(generateProgressBar(player.health, player.maxHealth, 50) + "  " + generateProgressBar(player.defense,player.maxDefense, 25)+ " \n\n" )
        }
        
      }
      
      /*  create a UI for Tempest. for when the the hits stack or miss. Also add proximity to the UI and a indicator if they can execute or not!
      if(player.playerClass == "Tempest"){
        
      }
      */
      if(player.playerClass == "Tempest"){
        addToOutput("                                                               Proximity ")
        addToOutput(` ATTACK POWER: ${generateThunderboltBar(100, 100, 25)}            ${generateProximityProgressBar(player.distanceClosed, 100, 25)}\n` )
        
      }
      if(player.playerClass == "Ray"){
        addToOutput(" ATTACK POWER: " + player.attackPower +  "                                     Heal Power: " + (player.heal))
        
      }
      else{
        addToOutput(" ATTACK POWER: " + player.attackPower )
      }
      
      function generateHealthProgressBar(currentHealth, maxHealth, progressBarLength) {
        const progressChars = Math.floor((currentHealth / maxHealth) * progressBarLength);
        const emptyChars = progressBarLength - progressChars;
        let color = "\x1b[32m"; // default color is green
        
        if (currentHealth <= maxHealth * 0.2) {
          color = "\x1b[31m"; // change color to red if health is below 20%
        } else if (currentHealth <= maxHealth * 0.5) {
          color = "\x1b[33m"; // change color to yellow if health is below 50%
        }
        
        const progressBar = `[${color}${"█".repeat(progressChars)}\x1b[0m${" ".repeat(emptyChars)}]`;
        return progressBar;
      }
      function generateProximityProgressBar(value, total, size) {
        const progress = Math.floor(value / total * size);
        let progressBar = "█".repeat(progress) + " ".repeat(size - progress);
        if (value == total) {
          // Change color if execute is ready
          progressBar = `\x1b[35m${"█".repeat(progress)}\x1b[0m${" ".repeat(size - progress)}`;
          
        } else{
          progressBar = "█".repeat(progress) + " ".repeat(size - progress);
          
        }
        return "[" + progressBar + "]";
      }
      
      function generateThunderboltBar(currentHealth, maxHealth, progressBarLength) {
        const progressChars = Math.floor((currentHealth / maxHealth) * progressBarLength);
        const emptyChars = progressBarLength - progressChars;
        let color = "\x1b[36m"; // default color is cyan
        
        if(!player.firstStrike) {
          color = "\x1b[0m"
        }
        if(player.gridLock){
          color = "\x1b[31m"; // change color to red if execute is ready
        }
        
        if (player.secondStrike) {
          color = "\x1b[33m"; // change color to yellow if second strike hit
        }
        if (player.firstStrike) {
          color = "\x1b[36m"; // change color to red if first strike hit
        }
        else{
          //  color = "\x1b[0m"
        }
        
        
        
        const progressBar = `[${color}${"█".repeat(progressChars)}\x1b[0m${" ".repeat(emptyChars)}]`;
        return progressBar;
      }
      
      
      
      
      
      function generateProgressBar(currentValue, maxValue, barWidth) {
        const percentage = currentValue / maxValue;
        const progressChars = Math.floor(percentage * barWidth);
        const emptyChars = barWidth - progressChars;
        let progressBar = "[";
        for (let i = 0; i < progressChars; i++) {
          progressBar += "█";
        }
        for (let i = 0; i < emptyChars; i++) {
          progressBar += " ";
        }
        progressBar += "]";
        return progressBar;
      }
      
      addToOutput(`Number of enemies: ${this.enemyRemaining}`);
      // show "Enemy Defended" next to defense stat if enemy defended
      
      addToOutput("                   ENEMY HEALTH: "+this.dungeon.enemies[this.enemyCounter].health+"/"+  this.dungeon.enemies[this.enemyCounter].maxHealth +"                 ENEMY DEFENSE: " + this.dungeon.enemies[this.enemyCounter].defense+"/"+ this.dungeon.enemies[this.enemyCounter].maxDefense )
      if(this.dungeon.enemies[this.enemyCounter].isDefending) {
        addToOutput(`${generateProgressBar(this.dungeon.enemies[this.enemyCounter].health, this.dungeon.enemies[this.enemyCounter].maxHealth, 50)}  ${generateProgressBar(this.dungeon.enemies[this.enemyCounter].defense, this.dungeon.enemies[this.enemyCounter].maxDefense, 25)} Enemy Defended!\n\n` )
        
      }
      // addToOutput(`Current enemy Health: ${this.dungeon.enemies[this.enemyCounter].health}, Attack: ${this.dungeon.enemies[this.enemyCounter].attackPower}, Defense: ${this.dungeon.enemies[this.enemyCounter].defense}, Speed: ${this.dungeon.enemies[this.enemyCounter].speed} \n`);
      else{ addToOutput(generateProgressBar(this.dungeon.enemies[this.enemyCounter].health, this.dungeon.enemies[this.enemyCounter].maxHealth, 50) + "  " + generateProgressBar(this.dungeon.enemies[this.enemyCounter].defense,this.dungeon.enemies[this.enemyCounter].maxDefense, 25)+ " \n" )}
      
      addToOutput(" ATTACK POWER: " + this.dungeon.enemies[this.enemyCounter].attackPower )
      //addToOutput(`\n${this.dungeon.currentRoom.description}`);
    }
    
    
    
    handleUserInput() {
      
      const input = question("What would you like to do? Attack(1), Defend(2), Use Special Ability(3)\n");
      if (input === "1") {
        this.dungeon.enemies[this.enemyCounter].makeDecision(player, player.isDefending);
        this.player.attack(this.dungeon.enemies[this.enemyCounter],this.dungeon.enemies[this.enemyCounter].isDefending);
        
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
        this.player.special(this.dungeon.enemies[this.enemyCounter],this.dungeon.enemies[this.enemyCounter].isDefending);
        this.dungeon.enemies[this.enemyCounter].makeDecision(player, player.isDefending);
        if (this.dungeon.enemies[this.enemyCounter].health <= 0) {
          this.dungeon.enemies[this.enemyCounter].eliminated = true;
          addToOutput(`${this.dungeon.enemies[this.enemyCounter].name} defeated!`);
          this.enemyCounter++;
          this.enemyRemaining --;     
        }
      } else if (input === "4") {
        addToOutput(`${this.player.name} has fled from the battle!`);
        this.player.flee = true;
        this.gameOver = true;
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
      }
      else if(this.player.flee){
        // addToOutput( `${this.player.name} fled!`);
      }
      else {
        addToOutput("Congratulations, you have completed the dungeon! Game over.");
      }
    }
    
  }
  
  
  
  if(advance === "1"){
    const go = new Game(player,start);
    go.start();
  }
  //go.start();
  
}

ok();

/*----------------------------To Add------------------------------------------------------------------------------

! Enemy block doesnt time right fix so player and enemy action is stored, then compared, resuilts outputed appropriatly..   -kinda fixed

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

!-- Adjust both player and enemy stats accordingly so it is move balanced. 

!-- Implement Spacial Awareness :0,    Every character will be a distance away from another, certain abilities/ attack will deal more/less damage based on distance. Certain abilities will/ wont work.

--- gardener/mechaninc can build things (thing does something based on thing type)

-- in between dungeon/s player levels up - stats will increase, (prompt a skill tree for certain characters) // assasin level up(throwing knifes has percentage of hitting based on distance, higher damage if trown farther away though) 
--- An option to play as an enemy and verse hero

-- character that studies enemy, based how much knowledge it gained a certain defuff will happen.


potentially use the original code(at the very top) for player class descriptions (maybe by adding a 6th choice in the menu for more info(descriptions)
-if you are going to use 'AoE' it could be used by effecting enemies[current] && enemies[current+1] - basically deal damage to current enemy and next enemy in array (will have to handle out of bounds though..) 



------------------------------------------------------------------------------------------------------------------*/
