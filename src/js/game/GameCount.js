export default class GameCount {
  constructor() {
    this.count = null;
    this.health = null;
    this.container = document.querySelector('.count_container');
  }

  init() {
    this.count = 0;
    this.health = 0;
    this.drawCount();
  }

  drawCount() {
    this.container.innerHTML = '';
    
    const countHealth = document.createElement('div');
    countHealth.classList.add('count_health');
    countHealth.textContent = `Промах: ${this.health}`;

    const countHit = document.createElement('div');
    countHit.classList.add('count_hit');
    countHit.textContent = `Попадание: ${this.count}`;

    this.container.appendChild(countHealth);
    this.container.appendChild(countHit);
  }

  hit() {
    this.count++;
    this.drawCount();
  }

  miss() {
    this.health++;
    this.drawCount()
  }
}