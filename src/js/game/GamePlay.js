export default class GamePlay {
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
    const count = `
      <div class="count_health">Промах: ${this.health}</div>
      <div class="count_hit">Попадание: ${this.count}</div>
    `;

    this.container.innerHTML = count;
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