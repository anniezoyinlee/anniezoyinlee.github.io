# General Assembly - Project 1

## Project Choice
>  Simon

[Colorful Simon](https://anniezoyinlee.github.io/GA-Projects/Project_1_Simon_Game/index.html)

#### Special Part
* Blocks change colors in every level
* Player can choose difficulties
* Sequence changes in each level, not repeats and adds on from the previous level
* The game would congrate the player with different words when a level is completed

#### What would you do differently?
>  I would add the media query after most of my function is done next time. I've included media query right after I created files and bolierplate, I spent a lot of time to fix it during keep adding new functions.
>  I would find ways to replace setTimeout function

#### What are you most proud of?
>  I like the game being so colorful, and it has protential to add on more difficulity options and make unlimited levels.

#### What would you do next?
>  I will make more difficulity options and make a ranking chart.

#### How did you plan your project?
>  I copy and paste all the MVP goal in my js file, then organize the sequence. When I came up ideas before finishing MVP goals, I comment out the idea at the bottom of the file and make it happen after I finish MVP goals 

#### What did you learn?
> I learned to finish small part of codes each time and commit it. It really helps knowing what I'm doing in each section and I feel accomplished when I look back my commit history and find that I already done a lot.

#### Unfixed Issues:
>  In smaller screens after player clicks on color blocks the effect to change back the color has delay.
>  [Violation] 'click' handler -> from setTimeOut
>  Error with Permissions-Policy header: Unrecognized feature: 'interest-cohort'. -> only in github

#### Future Goal
>  Make more difficulity options, like unlimited levels
>  With unlimited levels add timer-based scoring
>  Player can track scores across games (even if the page is reloaded)
>  Allow player to enter their name and show top level rank (local storage or database)
>  Add sound effect while a color block is clicked

## Project Description
>  My game app is called Simon. It's a game for testing memory. When the game starts the program creates a sequence of different colors at random and the user should repeat the sequence. The program should go next round if the player is successful. Once the user fails or the time limit runs out, the game is over. 

[Definition Reference from Wikipedia](https://en.wikipedia.org/wiki/Simon_(game))

## Wire Frames
#### Initial Landing View
![image](https://media.git.generalassemb.ly/user/37912/files/09677880-0120-11ec-914c-620148923fe1)

#### Results View
![image](https://media.git.generalassemb.ly/user/37912/files/16846780-0120-11ec-9cb8-ac638af81fcc)

## User Stories
#### MVP Goals
* As a player, I want to click on a button to start the game.    
* As a player, I want my game to show a sequence of different colors at random by changing the color blocks' opacity.
* As a player, I want to repeat the sequence of different colors by clicking on the color block, and the color block would change opacity just like what the game showed me.
* As a player, I want my game to show the next sequence of different colors after I repeat the sequence of colors.
* As a player, I would like to know which level I'm at
* As a player, I would like to know what is the highest level I ever at
* As a player, I would like to see the color block turn grey if I miss the repeat.
* As a player, I would like to see a message showing that I lose.
* As a player, I would like to be able to restart the game after I lose.
* As a player, I would like to know that I win the game if I complete level 10.

#### Stretch Goals
* As a player, I would like to decide the difficulty of the game(more color blocks or more levels)
* As a player, I would like a pop-up screen to show which level I'm at before the level starts
* As a player, I would like to hear different sounds while the app showing the sequence of different colors
* As a player, I would like to see a rank with other players name and their highest level