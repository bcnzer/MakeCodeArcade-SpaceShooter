function destroyAsteroid (missle: Sprite, asteroid: Sprite) {
    asteroid.destroy(effects.trail, 100)
    if (missle != asteroid) {
        missle.destroy()
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    missile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . c . . . . . . . . 
        . . . . . . . c . . . . . . . . 
        . . . . . . c c c . . . . . . . 
        . . . . . . c 9 c . . . . . . . 
        . . . . . . c 9 c . . . . . . . 
        . . . . . . c 9 c . . . . . . . 
        . . . . . . c c c . . . . . . . 
        . . . . . . 2 2 2 . . . . . . . 
        . . . . . . . 5 . . . . . . . . 
        . . . . . . . 5 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySpaceship, 0, -45)
    music.pewPew.play()
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    if (invincible == 1) {
        destroyAsteroid(sprite, sprite)
    } else {
        game.over(false, effects.dissolve)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    mySpaceship.startEffect(effects.halo, 5000)
    invincible = 1
    otherSprite.destroy()
    pause(5000)
    invincible = 0
    effects.clearParticles(mySpaceship)
})
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    destroyAsteroid(sprite, otherSprite)
})
let spaceRock: Sprite = null
let rockNumber = 0
let powerUp: Sprite = null
let missile: Sprite = null
let mySpaceship: Sprite = null
let invincible = 0
game.splash("Ben's Space Shooter", "ASTEROIDS INCOMING!")
invincible = 0
scene.setBackgroundColor(15)
effects.starField.startScreenEffect()
mySpaceship = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . 8 8 . . . . . . . 
    . . . . . . . 8 8 . . . . . . . 
    . . . . . . 8 8 8 8 . . . . . . 
    . . . . . . 8 8 8 8 . . . . . . 
    . . . . . 8 8 9 9 8 8 . . . . . 
    . . . . . 8 8 9 9 8 8 . . . . . 
    . . . . 8 8 8 9 9 8 8 8 . . . . 
    . . . 8 8 8 8 9 9 8 8 8 8 . . . 
    . . 8 8 8 8 8 8 8 8 8 8 8 8 . . 
    . . 8 8 8 8 8 8 8 8 8 8 8 8 . . 
    . . . 8 2 2 2 8 8 2 2 2 8 . . . 
    . . . . 2 5 2 . . 2 5 2 . . . . 
    . . . . 4 5 4 . . 4 5 4 . . . . 
    . . . . . 5 . . . . 5 . . . . . 
    . . . . . 5 . . . . 5 . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySpaceship)
mySpaceship.setStayInScreen(true)
mySpaceship.setPosition(80, 110)
game.onUpdateInterval(randint(5000, 7000), function () {
    powerUp = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . 4 4 4 4 . . . . . . 
        . . . . 4 4 4 5 5 4 4 4 . . . . 
        . . . 3 3 3 3 4 4 4 4 4 4 . . . 
        . . 4 3 3 3 3 2 2 2 1 1 4 4 . . 
        . . 3 3 3 3 3 2 2 2 1 1 5 4 . . 
        . 4 3 3 3 3 2 2 2 2 2 5 5 4 4 . 
        . 4 3 3 3 2 2 2 4 4 4 4 5 4 4 . 
        . 4 4 3 3 2 2 4 4 4 4 4 4 4 4 . 
        . 4 2 3 3 2 2 4 4 4 4 4 4 4 4 . 
        . . 4 2 3 3 2 4 4 4 4 4 2 4 . . 
        . . 4 2 2 3 2 2 4 4 4 2 4 4 . . 
        . . . 4 2 2 2 2 2 2 2 2 4 . . . 
        . . . . 4 4 2 2 2 2 4 4 . . . . 
        . . . . . . 4 4 4 4 . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Food)
    powerUp.setPosition(randint(10, 150), 0)
    powerUp.setVelocity(0, 50)
})
game.onUpdateInterval(500, function () {
    rockNumber = randint(0, 4)
    if (rockNumber == 0) {
        spaceRock = sprites.create(img`
            . . . . . . . . . c c 8 . . . . 
            . . . . . . 8 c c c f 8 c c . . 
            . . . c c 8 8 f c a f f f c c . 
            . . c c c f f f c a a f f c c c 
            8 c c c f f f f c c a a c 8 c c 
            c c c b f f f 8 a c c a a a c c 
            c a a b b 8 a b c c c c c c c c 
            a f c a a b b a c c c c c f f c 
            a 8 f c a a c c a c a c f f f c 
            c a 8 a a c c c c a a f f f 8 a 
            . a c a a c f f a a b 8 f f c a 
            . . c c b a f f f a b b c c 6 c 
            . . . c b b a f f 6 6 a b 6 c . 
            . . . c c b b b 6 6 a c c c c . 
            . . . . c c a b b c c c . . . . 
            . . . . . c c c c c c . . . . . 
            `, SpriteKind.Enemy)
    } else if (rockNumber == 1) {
        spaceRock = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . c c c c . . 
            . c c c c c . c c c c c f c c . 
            c c a c c c c c 8 f f c f f c c 
            c a f a a c c a f f c a a f f c 
            c a 8 f a a c a c c c a a a a c 
            c b c f a a a a a c c c c c c c 
            c b b a a c f 8 a c c c 8 c c c 
            . c b b a b c f a a a 8 8 c c . 
            . . . . a a b b b a a 8 a c . . 
            . . . . c b c a a c c b . . . . 
            . . . . b b c c a b b a . . . . 
            . . . . b b a b a 6 a . . . . . 
            . . . . c b b b 6 6 c . . . . . 
            . . . . . c a 6 6 b c . . . . . 
            . . . . . . . c c c . . . . . . 
            `, SpriteKind.Enemy)
    } else if (rockNumber == 2) {
        spaceRock = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . c c c . . . . . . 
            . . . . . . a b a a . . . . . . 
            . . . . . c b a f c a c . . . . 
            . . . . c b b b f f a c c . . . 
            . . . . b b f a b b a a c . . . 
            . . . . c b f f b a f c a . . . 
            . . . . . c a a c b b a . . . . 
            . . . . . . c c c c . . . . . . 
            . . . . . . . c . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy)
    } else {
        spaceRock = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . c c . . . . . . . . 
            . . . . c a f b c . . . . . . . 
            . . . . b f f b c c . . . . . . 
            . . . a a f b a b a c . . . . . 
            . . . c a c b b f f b . . . . . 
            . . . . b f f b f a b . . . . . 
            . . . . a f f b b b a . . . . . 
            . . . . . a b b c c . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy)
    }
    spaceRock.setPosition(randint(10, 150), 0)
    spaceRock.setVelocity(randint(-50, 50), randint(10, 50))
})
