---
{"dg-publish":true,"sticker":"emoji//1f47e","permalink":"/test/test1/","dgPassFrontmatter":true,"noteIcon":"","updated":"2024-10-31T22:31:38.400+08:00"}
---




<script src="//cdn.jsdelivr.net/npm/phaser@3.86.0/dist/phaser.js"></script>
<script>
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            backgroundColor: '#008eb0',
            parent: 'phaser-example',
            scene: [ Boot, Preloader, MainMenu, MainGame ]
        };

        let game = new Phaser.Game(config);

        class Boot extends Phaser.Scene {
            constructor () {
                super('Boot');
            }

            create () {
                this.registry.set('highscore', 0);
                this.scene.start('Preloader');
            }
        }

        class Preloader extends Phaser.Scene {
            constructor () {
                super('Preloader');
            }

            preload () {
                this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
                this.loadText = this.add.text(400, 360, 'Loading ...', { fontFamily: 'Arial', fontSize: 64, color: '#e3f2ed' });

                this.loadText.setOrigin(0.5);
                this.loadText.setStroke('#203c5b', 6);
                this.loadText.setShadow(2, 2, '#2d2d2d', 4, true, false);

                this.load.setPath('assets/games/emoji-match/');
                this.load.image(['background', 'logo']);
                this.load.atlas('emojis', 'emojis.png', 'emojis.json');

                // Audio
                this.load.setPath('assets/games/emoji-match/sounds/');
                this.load.audio('music', ['music.ogg', 'music.m4a', 'music.mp3']);
                this.load.audio('countdown', ['countdown.ogg', 'countdown.m4a', 'countdown.mp3']);
                this.load.audio('match', ['match.ogg', 'match.m4a', 'match.mp3']);
            }

            create () {
                if (this.sound.locked) {
                    this.loadText.setText('Click to Start');
                    this.input.once('pointerdown', () => {
                        this.scene.start('MainMenu');
                    });
                } else {
                    this.scene.start('MainMenu');
                }
            }
        }

        class MainMenu extends Phaser.Scene {
            constructor () {
                super('MainMenu');
            }

            create () {
                let background = this.add.image(400, 300, 'background');
                this.tweens.add({
                    targets: background,
                    alpha: { from: 0, to: 1 },
                    duration: 1000
                });

                const fontStyle = {
                    fontFamily: 'Arial',
                    fontSize: 48,
                    color: '#ffffff',
                    fontStyle: 'bold',
                    padding: 16,
                    shadow: {
                        color: '#000000',
                        fill: true,
                        offsetX: 2,
                        offsetY: 2,
                        blur: 4
                    }
                };

                this.add.text(20, 20, 'High Score: ' + this.registry.get('highscore'), fontStyle);
                let logo = this.add.image(400, -200, 'logo');

                this.music = this.sound.play('music', { loop: true });

                this.tweens.add({
                    targets: logo,
                    y: 300,
                    ease: 'bounce.out',
                    duration: 1200
                });

                this.input.once('pointerdown', () => {
                    this.scene.start('MainGame');
                });
            }
        }

        class MainGame extends Phaser.Scene {
            constructor () {
                super('MainGame');
                this.emojis;
                this.circle1;
                this.circle2;
                this.selectedEmoji = null;
                this.matched = false;
                this.score = 0;
                this.highscore = 0;
                this.scoreText;
                this.timer;
                this.timerText;
            }

            create () {
                this.add.image(400, 300, 'background');
                this.circle1 = this.add.circle(0, 0, 42).setStrokeStyle(3, 0xf8960e);
                this.circle2 = this.add.circle(0, 0, 42).setStrokeStyle(3, 0x00ff00);
                this.circle1.setVisible(false);
                this.circle2.setVisible(false);

                this.emojis = this.add.group({
                    key: 'emojis',
                    frameQuantity: 1,
                    repeat: 15,
                    gridAlign: {
                        width: 4,
                        height: 4,
                        cellWidth: 90,
                        cellHeight: 90,
                        x: 280,
                        y: 200
                    }
                });

                const fontStyle = {
                    fontFamily: 'Arial',
                    fontSize: 48,
                    color: '#ffffff',
                    fontStyle: 'bold',
                    padding: 16,
                    shadow: {
                        color: '#000000',
                        fill: true,
                        offsetX: 2,
                        offsetY: 2,
                        blur: 4
                    }
                };

                this.timerText = this.add.text(20, 20, '30:00', fontStyle);
                this.scoreText = this.add.text(530, 20, 'Found: 0', fontStyle);

                let children = this.emojis.getChildren();
                children.forEach((child) => {
                    child.setInteractive();
                });

                this.input.on('gameobjectdown', this.selectEmoji, this);
                this.input.once('pointerdown', this.start, this);
                this.highscore = this.registry.get('highscore');
                this.arrangeGrid();
            }

            start () {
                this.score = 0;
                this.matched = false;
                this.timer = this.time.addEvent({ delay: 30000, callback: this.gameOver, callbackScope: this });
                this.sound.play('countdown', { delay: 27 });
            }

            selectEmoji (pointer, emoji) {
                if (this.matched) {
                    return;
                }
                if (!this.selectedEmoji) {
                    this.circle1.setPosition(emoji.x, emoji.y);
                    this.circle1.setVisible(true);
                    this.selectedEmoji = emoji;
                } else if (emoji !== this.selectedEmoji) {
                    if (emoji.frame.name === this.selectedEmoji.frame.name) {
                        this.circle1.setStrokeStyle(3, 0x00ff00);
                        this.circle2.setPosition(emoji.x, emoji.y);
                        this.circle2.setVisible(true);
                        this.tweens.add({
                            targets: [ this.selectedEmoji, emoji ],
                            scale: 1.4,
                            angle: '-=30',
                            yoyo: true,
                            ease: 'sine.inout',
                            duration: 200,
                            completeDelay: 200,
                            onComplete: () => this.newRound()
                        });
                        this.sound.play('match');
                    } else {
                        this.circle1.setPosition(emoji.x, emoji.y);
                        this.circle1.setVisible(true);
                        this.selectedEmoji = emoji;
                    }
                }
            }

            newRound () {
                this.matched = false;
                this.score++;
                this.scoreText.setText('Found: ' + this.score);
                this.arrangeGrid();
            }

            arrangeGrid () {
                // Arrange the emoji grid, implement your own logic here
            }

            gameOver () {
                // Implement game over logic here
                console.log('Game Over!');
            }
        }
    </script>

