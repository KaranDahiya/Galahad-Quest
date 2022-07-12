function showStory() {
    background('#073B3A')

    textFont(secularFont)

    textSize(14)
    fill('#DDB771')
    text(storyText[storyLevel], 25, 25, canvasWidth - 50, canvasHeight - 60)

    textSize(24)
    fill('#6BBF59')
    text("Press 'enter' to continue", 25, 3 * canvasHeight / 4, canvasWidth - 25, canvasHeight / 2)
}

function showGameOver() {
    enemyTheme.stop()
    bossTheme.stop()
    musicIsPlaying = false

    background('#BA3F1D')

    textFont(secularFont)

    textSize(148)
    fill('#A77E58')
    text("GAME OVER", 25, 25, canvasWidth - 25, canvasHeight / 2)

    textSize(24)
    fill('#EEE3AB')
    text("Press 'enter' to try again", canvasWidth / 2.7, 3 * canvasHeight / 4, canvasWidth - 25, canvasHeight / 2)
}

function transitionToLevel() {
    if (keyIsDown(13)) {
        if (storyLevel < storyText.length - 1) {
            menuTheme.stop()

            // boss fight incoming
            if (sceneLevel == numLevels - 1) {
                playerMaxHealth = 5
                menuTheme.stop()
                enemyTheme.stop()
                bossTheme.stop()
                bossTheme.play()
            } else {
                menuTheme.stop()
                enemyTheme.stop()
                bossTheme.stop()
                enemyTheme.play()
            }
            
            gameMode = 'scene'
            playerHealth = playerMaxHealth
            enemyHealth = enemyMaxHealth[sceneLevel]
            playerX = playerStartX
            playerDied = false
            enemyDied = false
            hasInteracted = false
            beginInteraction = false
            interactionLevel = 0
            musicIsPlaying = false
        } else {
            gameMode = 'ending'
            shouldPlayPowerup = true
        } 
    }
}

function showEnding() {
    menuTheme.stop()
    if (shouldPlayPowerup) {
        powerupSound.play()
        shouldPlayPowerup = false
    }

    if (badEnding) {
        background('#C83E4D')
    } else {
        background('#F4D6CC')
    }

    textFont(secularFont)
    textSize(14)
    fill('#32373B')

    if (badEnding) {
        text(endingText[1], 25, 25, canvasWidth - 50, canvasHeight - 60)
    } else {
        text(endingText[0], 25, 25, canvasWidth - 50, canvasHeight / 2)
    }

    textSize(24)
    fill('#4A5859')
    text("Reload to restart (try to get both endings!)", canvasWidth / 2.7, 3 * canvasHeight / 4, canvasWidth - 25, canvasHeight / 2)
}