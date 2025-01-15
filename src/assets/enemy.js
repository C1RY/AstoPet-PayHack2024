export class Enemy {
    constructor(name, maxHealth, phases) {
        this.name = name;
        this.health = maxHealth;
        this.maxHealth = maxHealth;
        this.phases = phases; // Each phase defines unique behavior
        this.currentPhase = 0;
    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= this.phases[this.currentPhase]?.threshold) {
            this.advancePhase();
        }
    }

    advancePhase() {
        if (this.currentPhase < this.phases.length - 1) {
            this.currentPhase++;
            const phase = this.phases[this.currentPhase];
            this.health += phase.healthBoost;
            console.log(`${this.name} evolved to Phase ${this.currentPhase + 1}!`);
        }
    }

    isAlive() {
        return this.health > 0;
    }
}
