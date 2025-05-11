export default class Character {
    constructor() {
        this.character = null;
    }

    drawCharacter(index, positions) {
        this.createCharacter();
        this.addCharacter(index, positions);
    }

    createCharacter() {
        this.character = document.createElement('img');
        this.character.src = 'pic/goblin.png';
        this.character.classList.add('goblin');
        this.character.alt = 'Goblin character';
        }

    addCharacter(index, positions) {
        //console.log(positions, index);
        const cell = positions[index];
        
        if (cell) {
            cell.appendChild(this.character);
        }
    }

    removeCharacter(index, positions) {
        const cell = positions[index];

        if(cell.hasChildNodes()){
            cell.removeChild(this.character);
        }
        
    }
}
