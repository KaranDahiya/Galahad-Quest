class SpriteData {
  constructor(spritesheet, numFrames, imageHeight, imageWidth, reversed = false) {
    this.spritesheet = spritesheet
    this.numFrames = numFrames
    this.imageHeight = imageHeight
    this.imageWidth = imageWidth
    this.animation = []
    this.reversed = reversed
  }

  getAnimation() {
    for (let i = 0; i < this.numFrames; i++) {
      let img = this.spritesheet.get(this.imageWidth * i, 0, this.imageWidth, this.imageHeight)
      this.animation.push(img)
    }
    return this.animation
  }

}

class Sprite {
  constructor(animation, x, y, speed, character = 'none') {
    this.x = x;
    this.y = y;
    this.animation = animation;
    this.w = this.animation[0].width;
    this.len = this.animation.length;
    this.speed = speed;
    this.index = 0;
    this.intIndex = 0;
    this.character = character
  }

  show() {
    imageMode(CENTER)
    this.intIndex = floor(this.index) % this.len;
    image(this.animation[this.intIndex], this.x, this.y);
    imageMode(CORNERS)
  }

  animate() {
    this.index += this.speed;
  }

  moveRight() {
    if (this.x < canvasWidth) {
      switch (this.character) {
        case 'player':
          if (this.x < enemyX[sceneLevel] - playerWidth / 4) {
            this.x += this.speed * 5;
            playerX = this.x
          }
          break;
        case 'enemy':
          this.x += this.speed * 5;
          enemyX[sceneLevel] = this.x
          break;
        case 'none':
          break;
      }
    }
  }

  moveLeft() {
    if (this.x > 0) {
      switch (this.character) {
        case 'player':
          this.x -= this.speed * 5;
          playerX = this.x
          break;
        case 'enemy':
          if (this.x > playerX + enemyWidth[sceneLevel] / 4) {
            this.x -= this.speed * 5;
            enemyX[sceneLevel] = this.x
          }
          break;
        case 'none':
          break;
      }
    }
  }

  update(x, y) {
    this.x = x
    this.y = y
  }
}