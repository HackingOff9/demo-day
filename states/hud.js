export default class HUD {
    preload() {
        this.load.image('heart', 'src/games/firstgame/assets/heart.png');
    }
    init(play) {
        this.scoreText = undefined;
        this.hearts = undefined;
        this.play = play;

        play.events.addListener("updateHUD", () => {
            console.log("Hud updated", play.score)
            this.scoreText.setText('Score: ' + play.score);
        })
    }
    create() {
        this.scoreText = this.add.text(800, 20, 'Score: 0', { 
            fontSize: '32px', 
            color: 'white' 
        });

        this.healthText = this.add.text(200, 20, `Health: ${this.play.health}`, {
            fontSize: '32px',
            color: "red"
        });

        this.hearts = this.add.group();
        this.hearts.defaultKey = "heart";

        /*
         * Code used for debugging
         */
        window.fun = x => {
            this.play.health += x
        }
        window.hearts = this.hearts;
    }
    update() {
        //this.reconcileHearts();
        this.healthText.setText(`Health: ${this.play.health}`)
    }
    reconcileHearts() {
        //console.log("hearts updating")
        const hearts = this.hearts;
        const health = this.play.health;

        const diff = health - hearts.getChildren().length;
        console.log(diff)

        // Positive diff, spawn more hearts
        if (diff > 0) {
            for (let i = 0; i < diff; i++) {
                const spawnedHearts = hearts.getChildren().length;
                const heartNumber = spawnedHearts + 1;
                hearts.create(25+50*heartNumber, 50)
            }
        } 

        // Negative diff, reduce hearts
        else if (diff < 0) {
            const deleteNumber = -diff;
            const spawnedHearts = hearts.getChildren();
            const toDestroy = [];
            for (let i = 0; i < deleteNumber; i++) {
              toDestroy.push(spawnedHearts[spawnedHearts.length -i -1])
            }
            //setInterval(() => {
                toDestroy.forEach(h => {
                    console.log(this)
                    h.destroy() 
                })
            //}, 0)
            /*
            for (let heart of toDestroy) {
                setInterval(() => {
                    //hearts.killAndHide(heart)
                    //heart.destroy();
                }, 0)
            }
            */
        }
    }
}