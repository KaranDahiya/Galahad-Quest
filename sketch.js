// scene variables
let canvasWidth = 900
let canvasHeight = 400
let gameMode = 'story'
let storyLevel = 0
let sceneLevel = 0
let interactionLevel = 0
let bg
let secularFont
let startTime
let startTimeSound
let numLevels = 6

// story variables
let badEnding = false
let endLevel = false
let beginInteraction = false
let hasInteracted = false
let hasSelectedOption = false
const storyText = [
    "I am Gahalad, knight of the round table, and this is my story.\n\n\nYears ago, I began hearing the voice of a maiden cry out for help in my dreams. Her cries were accompanied by visions of a forest in a distant, cursed land. I was hesistant to venture out there. But there was something about these dreams I could not ignore. Something familiar.\n\n\nEventually, I set off to the cursed woods in the south-east. My arrival had disturbed the birds, I could not hide my presence here. But this was the treeline from my nightmares, I was certain...\n\n[CONTROLS:  attack: (space),  move: (a, d)]",

    "After routing a group of bandits on the outskirts of the woods, I sought to interrogate their chief. What were they doing here? Could they hear her too?\n\n\nWhat I heard disturbed me, 'Those who hear the maiden's cries are cursed to follow her voice deeper into the dangers of the forest, as the dark wizard desires...Turn back I urge you!'\n\n\nI, however, was not willing to leave it alone. Besides, not many would miss me if I were to perish. My mother had already abandoned me, and although I am the son of a renowned knight, I had never met my father. For he disapeared before I came of age. I had nothing to lose, so I pressed on...",

    "As I got deeper into the forest, I began to hear the maiden's voice in my ears. I was not sure if it was hallucination, or she was out there calling to me. I followed that voice, but the further I travelled, the more unnatural the landscape and its inhabitants became...",

    "I was tired. I stopped to rest at a stream when I saw a motionless shadow looming in the corner of my eye. I drew my blade and approached carefully. When I got close I realized it was the statue of a knight. It was lifelike and noble, but also sad and heartbroken.\n\n\nI was moved to pay my respects by offering flowers to this idol of what must have been some brave man in life. That is when I saw that it carried an object I have long desired within its stone hands...",

    "Once past the stream, I began to feel the presence of this wizard of whom the bandit chieftan spoke. I had not yet had sight of him, but I could feel it: the scent of foul magics in the air.\n\n\nI knew I was hot on his trail when I was confronted by undead abominations, surely summoned by his dark arts.",

    "There he was! After dispatching his creations, I confronted the dark mage. He had a lady clad in white as his captive. 'This must be the maiden from my dreams,' I was certain!\n\n\nI tossed her my second blade and she managed to cut off his escape. Her strength surprised me. There again was that familiar feeling. But I had no time to waste. I engaged the wizard...",

    "I managed to put an end to the evil wizard who had been draining the forest of its life and beauty. I then turned to the maiden. What she said shook me to my very core. This was Guinevere, wife of King Arthur. She had disappeared on an expedition to the south years ago.\n\n\nSir Lancelot, my father, and her secret lover, had been sent to find her and never returned! The wizard turned him to stone during their battle in the forest. However, Lady Guinevere had secretly crafted an antidote from the wizard's supplies while she had been held captive!"
]
const interactionText = [
    "A statue of a knight holding a golden chalice in its hands.",
    "Steal the chalice. (press '1')",
    "Offer flowers. (press '2')",
    "You pry the chalice out of the statues hands, but the statue tips over and shatters into two pieces in the process. You now own the holy grail!",
    "You place flowers at the feet of the statue and feel a sense of comfort and safety in its presence.",
    "Press 'enter' to continue"
]
const endingText = [
    "I was elated. The statue of the noble knight had been my father. Lady Guinevere revived him and we were reunited at last! That is the tale of how I found Lady Guinevere, my father, Sir Lancelot, and the Holy Grail.",

    "'No...It cannot be!' I was devastated. The statue by the stream had been my father. I had damaged it beyond repair but I hoped Lady Guinevere's potion would work to revive him. It did not. He became human only long enough to die with tormented screams over having his body severed in two.\n\n\n'I will join you my love!' Lady Guinevere could not bear the seperation from her lover and fell on Sir Lancelot's sword, ending her life. Upon seeing this I lost my composure and dropped the Holy Grail into the river, where it was swept off by a great eagle.\n\n\nThat is the tale of how I lost Lady Guinevere, my father, Sir Lancelot, and the Holy Grail."
]

// player variables
let playerWidth = 135
let playerHeight = 135 / 2
let playerStartX = playerWidth / 2
let playerX = playerStartX
let playerY = canvasHeight - playerHeight * 1.2
let playerMaxHealth = 3
let playerHealth = playerMaxHealth
let playerFacingForward = true
let playerDied = false
let playerIsAttacking = false

// enemy variables
let enemyWidth = [126, 150, 150, 180, 150, 250]
let enemyHeight = [126, 150, 150, 180, 150, 250]
let enemyStartX = canvasWidth - enemyWidth[sceneLevel]
let enemyX = [
    canvasWidth - enemyWidth[sceneLevel], 
    canvasWidth - enemyWidth[sceneLevel], 
    canvasWidth - enemyWidth[sceneLevel], 
    canvasWidth - enemyWidth[sceneLevel], 
    canvasWidth - enemyWidth[sceneLevel], 
    canvasWidth - enemyWidth[sceneLevel]
]
let enemyY = [
    canvasHeight - enemyHeight[0] / 1.6, 
    canvasHeight - enemyHeight[1] / 1.75, 
    canvasHeight - enemyHeight[2] / 1.75, 
    canvasHeight - enemyHeight[3] / 2.2, 
    canvasHeight - enemyHeight[4] / 1.75, 
    canvasHeight - enemyHeight[5] / 2.5
]
let enemyMaxHealth = [5, 6, 7, 1, 8, 10]
let enemyHealth = enemyMaxHealth[sceneLevel]
let enemyDied = false
let enemyIsAttacking = false

// player animation variables
let playerIdle, playerRun, playerAttack, playerGetHit, playerDeath, playerIdleFlipped, playerRunFlipped

// enemy animation variables
let enemyIdleSpritesheets = []
let enemyAttackSpritesheets = []
let enemyRunSpritesheets = []
let enemyDeathSpritesheets = []
let enemyIdle = []
let enemyRun = []
let enemyAttack = [] 
let enemyDeath = []
let enemyIdleFrames = [10, 4, 4, 1, 4, 8]
let enemyRunFrames = [8, 8, 8, 1, 4, 8]
let enemyAttackFrames = [7, 8, 8, 1, 8, 8]
let enemyDeathFrames = [11, 4, 4, 1, 4, 7]
let enemyAttackExactFrame = [2, 1, 1, -1, 1, 3]
let enemyCurrentAction
let enemyCurrentFrames = 0

// audio variables
let enemyTheme, bossTheme, menuTheme, playerAttackSound, playerWalkSound, enemyAttackSound, enemyWalkSound, powerupSound, playerDeathSound, enemyDeathSound
let shouldPlayAttack = false
let shouldPlayEnemyAttack = false
let shouldPlayRun = false
let shouldPlayEnemyRun = false
let shouldPlayDeath = false
let shouldPlayEnemyDeath = false
let shouldPlayPowerup = false

function preload() {
    bg = loadImage('assets/scenes/01.png')
    secularFont = loadFont('assets/SecularOne-Regular.ttf')

    // player sprites
    playerIdleSpritesheet = loadImage('assets/player-sprites/Idle.png')
    playerRunSpritesheet = loadImage('assets/player-sprites/Run.png')
    playerAttackSpritesheet = loadImage('assets/player-sprites/Attack1.png')
    playerGetHitSpritesheet = loadImage('assets/player-sprites/GetHit.png')
    playerDeathSpritesheet = loadImage('assets/player-sprites/Death.png')
    playerIdleFlippedSpritesheet = loadImage('assets/player-sprites/Idle-flipped.png')
    playerRunFlippedSpritesheet = loadImage('assets/player-sprites/Run-flipped.png')

    // bandit sprites
    enemyIdleSpritesheets.push(loadImage('assets/bandit-sprites/Idle.png'))
    enemyRunSpritesheets.push(loadImage('assets/bandit-sprites/Run.png'))
    enemyAttackSpritesheets.push(loadImage('assets/bandit-sprites/Attack.png'))
    enemyDeathSpritesheets.push(loadImage('assets/bandit-sprites/Death.png'))

    // mushroom sprites
    enemyIdleSpritesheets.push(loadImage('assets/mushroom-sprites/Idle.png'))
    enemyRunSpritesheets.push(loadImage('assets/mushroom-sprites/Run.png'))
    enemyAttackSpritesheets.push(loadImage('assets/mushroom-sprites/Attack.png'))
    enemyDeathSpritesheets.push(loadImage('assets/mushroom-sprites/Death.png'))

    // goblin sprites
    enemyIdleSpritesheets.push(loadImage('assets/goblin-sprites/Idle.png'))
    enemyRunSpritesheets.push(loadImage('assets/goblin-sprites/Run.png'))
    enemyAttackSpritesheets.push(loadImage('assets/goblin-sprites/Attack.png'))
    enemyDeathSpritesheets.push(loadImage('assets/goblin-sprites/Death.png'))

    // knight sprites
    enemyIdleSpritesheets.push(loadImage('assets/knight-sprites/Idle.png'))
    enemyRunSpritesheets.push(loadImage('assets/knight-sprites/Idle.png'))
    enemyAttackSpritesheets.push(loadImage('assets/knight-sprites/Idle.png'))
    enemyDeathSpritesheets.push(loadImage('assets/knight-sprites/Idle.png'))

    // skeleton sprites
    enemyIdleSpritesheets.push(loadImage('assets/skeleton-sprites/Idle.png'))
    enemyRunSpritesheets.push(loadImage('assets/skeleton-sprites/Run.png'))
    enemyAttackSpritesheets.push(loadImage('assets/skeleton-sprites/Attack.png'))
    enemyDeathSpritesheets.push(loadImage('assets/skeleton-sprites/Death.png'))

    // wizard sprites
    enemyIdleSpritesheets.push(loadImage('assets/boss-sprites/Idle.png'))
    enemyRunSpritesheets.push(loadImage('assets/boss-sprites/Run.png'))
    enemyAttackSpritesheets.push(loadImage('assets/boss-sprites/Attack.png'))
    enemyDeathSpritesheets.push(loadImage('assets/boss-sprites/Death.png'))

    // boss sprites
    bossIdleSpritesheet = loadImage('assets/boss-sprites/Idle.png')
    bossRunSpritesheet = loadImage('assets/boss-sprites/Run.png')
    bossAttackSpritesheet = loadImage('assets/boss-sprites/Attack.png')
    bossDeathSpritesheet = loadImage('assets/boss-sprites/Death.png')

    // audio files
    soundFormats('wav')
    enemyTheme = loadSound('assets/sounds/dungeon_theme.wav')
    bossTheme = loadSound('assets/sounds/cave_theme.wav')
    menuTheme = loadSound('assets/sounds/night_theme.wav')
    playerAttackSound = loadSound('assets/sounds/player_attack.wav')
    playerWalkSound = loadSound('assets/sounds/grass_footstep.wav')
    enemyWalkSound = loadSound('assets/sounds/gravel_footstep.wav')
    enemyAttackSound = loadSound('assets/sounds/enemy_attack.wav')
    powerupSound = loadSound('assets/sounds/powerup.wav')
    playerDeathSound = loadSound('assets/sounds/player_death.wav')
    enemyDeathSound = loadSound('assets/sounds/enemy_death.wav')
}

function setup() {
    createCanvas(canvasWidth, canvasHeight)
    startTime = millis() - 3000
    startTimeSound = millis() - 1000
    // sprite setup
    setupAnimations()
}

function draw() {
    let timeElapsed = (millis() - startTime)
    let timeElapsedSound = (millis() - startTimeSound)
    switch (gameMode) {
        case 'scene':
            // scene background
            background(bg)

            // animate player
            showPlayer()

            // animate health
            showPlayerHealth()

            // animate enemy health
            showEnemyHealth()

            // animate enemy
            showEnemy()

            // calculate combat information
            checkCombat()

            // NPC interaction
            handleInteraction()

            // if combat ends (let death animations play out)
            if (timeElapsed > 3000) {
                transitionToGameOver()
                transitionToStory()
                startTime = millis()
            }

            // play sounds (max frequency of once per second)
            if (timeElapsedSound > 250) {
                playSounds()
                startTimeSound = millis()
            }
            break
        case 'story':
            // progress narrative
            showStory()
            transitionToLevel()
            break
        case 'gameover':
            // show game over screen
            showGameOver()
            transitionToLevel()
            break
        case 'ending':
            showEnding()
            break
    }

}