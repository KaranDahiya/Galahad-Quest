function showPlayer() {
    if (playerDied) return

    playerIsAttacking = false

    // no health: death 
    if (playerHealth <= 0) {
        playerDeath.update(playerX, playerY)
        playerDeath.show()
        playerDeath.animate()
        if (playerDeath.intIndex == playerDeath.len - 1) {
            playerDied = true
            shouldPlayDeath = true
        }
    }

    // a: left
    else if (keyIsDown(65)) {
        playerFacingForward = false
        playerRunFlipped.update(playerX, playerY)
        playerRunFlipped.show()
        playerRunFlipped.animate()
        playerRunFlipped.moveLeft()
        if (playerRunFlipped.intIndex == playerRunFlipped.len - 1) shouldPlayRun = true
    }

    // d: right
    else if (keyIsDown(68)) {
        playerFacingForward = true
        playerRun.update(playerX, playerY)
        playerRun.show()
        playerRun.animate()
        playerRun.moveRight()
        if (playerRun.intIndex == playerRun.len - 1) shouldPlayRun = true
    }

    // space: attack
    else if (keyIsDown(32)) {

        // NPC interaction
        if (sceneLevel == 3 && (playerX + enemyWidth[sceneLevel] / 2) > enemyX[sceneLevel]) {
            if (playerFacingForward) {
                playerIdle.update(playerX, playerY)
                playerIdle.show()
                playerIdle.animate()
            } else {
                playerIdleFlipped.update(playerX, playerY)
                playerIdleFlipped.show()
                playerIdleFlipped.animate()
            }

            beginInteraction = true
            return
        }

        // actual attack
        playerAttack.update(playerX, playerY)
        playerAttack.show()
        playerAttack.animate()
        if (playerAttack.intIndex == 2) {
            playerIsAttacking = true
            shouldPlayAttack = true
        }
    }

    // nothing: idle
    else {
        if (playerFacingForward) {
            playerIdle.update(playerX, playerY)
            playerIdle.show()
            playerIdle.animate()
        } else {
            playerIdleFlipped.update(playerX, playerY)
            playerIdleFlipped.show()
            playerIdleFlipped.animate()
        }
    }
}

function showEnemy() {
    if (enemyDied) return

    // NPC (not really an enemy)
    if (sceneLevel == 3) {
        enemyIdle[sceneLevel].show()
        return
    }

    enemyIsAttacking = false

    // respond to player attack
    if (enemyHealth <= 0) {
        enemyDeath[sceneLevel].update(enemyX[sceneLevel], enemyY[sceneLevel])
        enemyDeath[sceneLevel].show()
        enemyDeath[sceneLevel].animate()
        enemyCurrentFrames = 0
        if (enemyDeath[sceneLevel].intIndex == enemyDeath[sceneLevel].len - 1) {
            shouldPlayEnemyDeath = true
            enemyDied = true
        }
    }

    // continue current enemy action
    else if (enemyCurrentFrames > 0) {
        switch (enemyCurrentAction) {
            case 'idle':
                enemyIdle[sceneLevel].update(enemyX[sceneLevel], enemyY[sceneLevel])
                enemyIdle[sceneLevel].show()
                enemyIdle[sceneLevel].animate()
                enemyCurrentFrames -= enemyIdle[sceneLevel].speed
                break
            case 'left':
                enemyRun[sceneLevel].update(enemyX[sceneLevel], enemyY[sceneLevel])
                enemyRun[sceneLevel].show()
                enemyRun[sceneLevel].animate()
                enemyRun[sceneLevel].moveLeft()
                enemyCurrentFrames -= enemyRun[sceneLevel].speed
                break
            case 'right':
                enemyRun[sceneLevel].update(enemyX[sceneLevel], enemyY[sceneLevel])
                enemyRun[sceneLevel].show()
                enemyRun[sceneLevel].animate()
                enemyRun[sceneLevel].moveRight()
                enemyCurrentFrames -= enemyRun[sceneLevel].speed
                break
            case 'attack':
                enemyAttack[sceneLevel].update(enemyX[sceneLevel], enemyY[sceneLevel])
                enemyAttack[sceneLevel].show()
                enemyAttack[sceneLevel].animate()
                enemyCurrentFrames -= enemyAttack[sceneLevel].speed
                if (enemyAttack[sceneLevel].intIndex == enemyAttackExactFrame[sceneLevel]) enemyIsAttacking = true
                break
        }
    }

    // random new enemy action
    else {
        let randomAction = generateEnemyAction()
        enemyIsAttacking = false
        switch (randomAction) {
            case 'idle':
                enemyIdle[sceneLevel].update(enemyX[sceneLevel], enemyY[sceneLevel])
                enemyIdle[sceneLevel].show()
                enemyIdle[sceneLevel].animate()
                enemyCurrentFrames = enemyIdle[sceneLevel].len - 1
                enemyCurrentAction = 'idle'
                break
            case 'left':
                enemyRun[sceneLevel].update(enemyX[sceneLevel], enemyY[sceneLevel])
                enemyRun[sceneLevel].show()
                enemyRun[sceneLevel].animate()
                enemyRun[sceneLevel].moveLeft()
                enemyCurrentFrames = enemyRun[sceneLevel].len - 1
                enemyCurrentAction = 'left'
                // shouldPlayEnemyRun = true
                break
            case 'right':
                enemyRun[sceneLevel].update(enemyX[sceneLevel], enemyY[sceneLevel])
                enemyRun[sceneLevel].show()
                enemyRun[sceneLevel].animate()
                enemyRun[sceneLevel].moveRight()
                enemyCurrentFrames = enemyRun[sceneLevel].len - 1
                enemyCurrentAction = 'right'
                // shouldPlayEnemyRun = true
                break
            case 'attack':
                enemyAttack[sceneLevel].update(enemyX[sceneLevel], enemyY[sceneLevel])
                enemyAttack[sceneLevel].show()
                enemyAttack[sceneLevel].animate()
                enemyCurrentFrames = enemyAttack[sceneLevel].len - 1
                enemyCurrentAction = 'attack'
                shouldPlayEnemyAttack = true
                break
        }
    }
}

function setupAnimations() {
    // player idle
    let spriteData = new SpriteData(playerIdleSpritesheet, 10, 135, 135)
    let animation = spriteData.getAnimation()
    playerIdle = new Sprite(animation, playerX, playerY, 0.25)

    // player run
    spriteData = new SpriteData(playerRunSpritesheet, 6, 135, 135)
    animation = spriteData.getAnimation()
    playerRun = new Sprite(animation, playerX, playerY, 0.5, 'player')

    // player attack
    spriteData = new SpriteData(playerAttackSpritesheet, 4, 135, 135)
    animation = spriteData.getAnimation()
    playerAttack = new Sprite(animation, playerX, playerY, 0.25)

    // player get hit
    spriteData = new SpriteData(playerGetHitSpritesheet, 3, 135, 135)
    animation = spriteData.getAnimation()
    playerGetHit = new Sprite(animation, playerX, playerY, 0.25)

    // player death
    spriteData = new SpriteData(playerDeathSpritesheet, 9, 135, 135)
    animation = spriteData.getAnimation()
    playerDeath = new Sprite(animation, playerX, playerY, 0.1)

    // player idle flipped
    spriteData = new SpriteData(playerIdleFlippedSpritesheet, 10, 135, 135)
    animation = spriteData.getAnimation()
    playerIdleFlipped = new Sprite(animation, playerX, playerY, 0.25)

    // player run flipped
    spriteData = new SpriteData(playerRunFlippedSpritesheet, 6, 135, 135)
    animation = spriteData.getAnimation()
    playerRunFlipped = new Sprite(animation, playerX, playerY, 0.5, 'player')

    // enemies for all levels
    for (let i = 0; i < numLevels; i++) {

        // enemy idle
        spriteData = new SpriteData(enemyIdleSpritesheets[i], enemyIdleFrames[i], enemyHeight[i], enemyWidth[i])
        animation = spriteData.getAnimation()
        enemyIdle.push(new Sprite(animation, enemyX[i], enemyY[i], 0.25))

        // enemy run
        spriteData = new SpriteData(enemyRunSpritesheets[i], enemyRunFrames[i], enemyHeight[i], enemyWidth[i])
        animation = spriteData.getAnimation()
        enemyRun.push(new Sprite(animation, enemyX[i], enemyY[i], 0.25, 'enemy'))

        // enemy attack
        spriteData = new SpriteData(enemyAttackSpritesheets[i], enemyAttackFrames[i], enemyHeight[i], enemyWidth[i])
        animation = spriteData.getAnimation()
        enemyAttack.push(new Sprite(animation, enemyX[i], enemyY[i], 1.0 / enemyAttackFrames[i]))

        // enemy death
        spriteData = new SpriteData(enemyDeathSpritesheets[i], enemyDeathFrames[i], enemyHeight[i], enemyWidth[i])
        animation = spriteData.getAnimation()
        enemyDeath.push(new Sprite(animation, enemyX[i], enemyY[i], 0.1))
    }
}

function showPlayerHealth() {
    strokeWeight(4);
    for (let i = 0; i < playerMaxHealth; i++) {
        // boss
        if (i < playerHealth && playerMaxHealth == 5) fill('gold')

        // regular
        else if (i < playerHealth && playerMaxHealth == 3) fill ('red')

        // damaged
        else fill('black')

        circle(30 + i * 25, 30, 20)
    }
}

function showEnemyHealth() {

    // NPC (no enemy)
    if (sceneLevel == 3) return

    strokeWeight(4);
    for (let i = 0; i < enemyMaxHealth[sceneLevel]; i++) {
        // boss
        if (i < enemyHealth && playerMaxHealth == 5) fill('purple')

        // regular
        else if (i < enemyHealth && playerMaxHealth == 3) fill('green')
        
        // damaged
        else fill('black')

        circle(canvasWidth - (30 + i * 25), 30, 20)
    }
}

function checkCombat() {

    if (playerDied) {
        playerX = 0
        return
    }

    if (enemyDied) {
        enemyX[sceneLevel] = canvasWidth
        return
    }

    // player attacks
    if (playerIsAttacking) {
        // enemy was hit
        if (playerFacingForward && (playerX + playerWidth / 2) > enemyX[sceneLevel]) {
            enemyHealth -= 0.25
        }
    }

    // enemy attacks
    if (enemyIsAttacking) {
        // player was hit
        if (playerX + playerWidth / 2 > enemyX[sceneLevel]) {
            playerHealth -= 1.5 / enemyAttackFrames[sceneLevel]
            background('red')
        }
    }
}

function transitionToGameOver() {
    if (playerDied) {
        playerX = playerStartX
        enemyX[sceneLevel] = enemyStartX
        gameMode = 'gameover'
        enemyTheme.stop()
        bossTheme.stop()
    }
}

function transitionToStory() {
    if (enemyDied || interactionLevel == 2) {
        endLevel = false
        storyLevel += 1
        sceneLevel += 1
        gameMode = 'story'
        enemyTheme.stop()
        bossTheme.stop()
        menuTheme.stop()
        enemyDeathSound.stop()
        menuTheme.play()   
    }
}

function generateEnemyAction() {
    let actions

    // enemy is adjacent to player
    if (playerX + playerWidth / 2 > enemyX[sceneLevel]) {
        actions = ['attack']
    }

    // enemy is far away
    else {
        if (sceneLevel == numLevels -  1) actions = ['left']
        else actions = ['left', 'left', 'idle']
    }

    return random(actions)
}

function handleInteraction() {
    if (beginInteraction) {
        switch (interactionLevel) {
            // display pre-interaction text
            case 0:
                fill('#F4D6CC')
                rect(50, 50, 300, 200, 15)
                textFont(secularFont)
                textSize(12)
                fill('#32373B')
                text(interactionText[0], 70, 70, 200, 150)
                fill('#4A5859')
                text(interactionText[1], 70, 160, 200, 150)
                text(interactionText[2], 70, 200, 200, 150)

                // check user response
                if (keyIsDown(49)) {
                    // option 1               
                    interactionLevel += 1
                    badEnding = true
                    shouldPlayPowerup = true
                } else if (keyIsDown(50)) {
                    // option 2
                    interactionLevel += 1
                    badEnding = false
                    shouldPlayPowerup = true
                }
                break

            // display post-interaction text
            case 1:
                if (badEnding) {
                    // option 1   
                    fill('#F4D6CC')
                    rect(50, 50, 300, 200, 15)
                    textFont(secularFont)
                    textSize(12)
                    fill('#32373B')
                    text(interactionText[3], 70, 70, 200, 150)
                    fill('#4A5859')
                    text(interactionText[5], 70, 160, 200, 150)
                } else {
                    // option 2
                    fill('#F4D6CC')
                    rect(50, 50, 300, 200, 15)
                    textFont(secularFont)
                    textSize(12)
                    fill('#32373B')
                    text(interactionText[4], 70, 70, 200, 150)
                    fill('#4A5859')
                    text(interactionText[5], 70, 160, 200, 150)
                }

                // check user ready to proceed
                if (keyIsDown(13)) {
                    // end level
                    enemyDied = true
                }
                break
        }
    }
}

function playSounds() {
    if (shouldPlayAttack) {
        playerAttackSound.play()
        shouldPlayAttack = false
    }
    if (shouldPlayDeath) {
        playerDeathSound.play()
        shouldPlayDeath = false
    }
    if (shouldPlayRun) {
        playerWalkSound.play()
        playerWalkSound.setVolume(0.5)
        shouldPlayRun = false
    }
    if (shouldPlayEnemyAttack) {
        enemyAttackSound.play()
        shouldPlayEnemyAttack = false
    }
    if (shouldPlayEnemyDeath) {
        enemyDeathSound.play()
        shouldPlayEnemyDeath = false
    }
    if (shouldPlayEnemyRun) {
        enemyWalkSound.play()
        shouldPlayEnemyRun = false
    }
    if (shouldPlayPowerup) {
        powerupSound.play()
        shouldPlayPowerup = false
    }
                    
}