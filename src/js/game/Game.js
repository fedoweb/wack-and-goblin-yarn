import Character from './Character';
import GamePlay from './GamePlay';

export default class Game {
    constructor() {
    this.boardSize = 4;
    this.container = null;
    this.character = null;
    this.randomPosition = null;
    this.gamePlay = null;
    this.intervalID = null;
    this.clicked = false;

    //this.onClick = this.onClick.bind(this);
    }

    init() {
        this.character = new Character();
        this.gamePlay = new GamePlay();
        this.newGame();
        this.gamePlay.init();

        this.container.addEventListener('click', this.onClick);
        this.changePosition();
    }

    newGame() {
        this.drawBoard(this.boardSize);
        this.getRandomPosition(this.getMaxPosition());
        this.character.drawCharacter(this.randomPosition, this.getPositions());   
    }

    changePosition() {
        

        this.intervalID = setInterval(() => {
            this.character.removeCharacter(this.randomPosition, this.getPositions());
            this.getRandomPosition(this.getMaxPosition());
            this.character.drawCharacter(this.randomPosition, this.getPositions());
            
            if (!this.clicked) {
                this.gamePlay.miss();
                this.checkGameOver();
            }
            this.clicked = false;
        }, 1000);
    }

    drawBoard(boardSize) {
        const gameContainer = document.querySelector('.game_container');
        gameContainer.innerHTML = '';

        this.container = document.createElement('div');
        this.container.classList.add('board_container');
        this.container.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
        this.container.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;

        for (let i = 0; i < this.boardSize * this.boardSize; i += 1) {
            const cell = document.createElement('div');
            cell.classList.add('board_cell');
            //cell.setAttribute('data-id', i);
            this.container.appendChild(cell);
        }

        gameContainer.appendChild(this.container);
    }

    onClick = (event) => {        
        this.clicked = true;

        const clickCell = event.target.closest('.board_cell');

        if(!clickCell) {
            return;
        }

        const clickPosition = this.getPositions().indexOf(clickCell);

        if (clickPosition === this.randomPosition) {
            this.gamePlay.hit();
            console.log('yes')
            this.character.removeCharacter(this.randomPosition, this.getPositions());
        } else {
            this.gamePlay.miss(this.intervalID);
            this.checkGameOver();
        }
    }

    getPositions() {
        const positions = document.querySelectorAll('.board_cell');
        return Array.from(positions);
    }

    getMaxPosition() {
        return (this.boardSize ** 2) - 1;
    }

    getRandomPosition(maxPosition) {
        const position = Math.floor(Math.random() * maxPosition);

        if (position !== this.randomPosition) {
            this.randomPosition = position;
        } else {
            this.getRandomPosition(maxPosition);
        }
    }

    checkGameOver() {
    if (this.gamePlay.health === 5) {
      clearInterval(this.intervalID);

      const newGame = confirm('Игра окончена! Начать новую игру?');

      if (newGame) {
        this.init();
      }
    }
  }
}
