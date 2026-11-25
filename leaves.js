/**
 * FallingLeavesEngine - Continuous Realistic Nature Leaves Canvas
 * Renders fluttering, swaying leaves across the presentation screen.
 * Automatically active on all slides EXCEPT Slide 1 (The Dry Earth).
 */

class FallingLeavesEngine {
  constructor(canvasId = 'leavesCanvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.id = canvasId;
      this.canvas.className = 'leaves-canvas';
      document.body.prepend(this.canvas);
    }

    this.ctx = this.canvas.getContext('2d');
    this.leaves = [];
    this.maxLeaves = 32;
    this.isRunning = false;
    this.animationFrameId = null;
    this.currentSlide = 1;
    this.userEnabled = true;

    // Palette of fresh forest greens with subtle warm sunlit accents
    this.leafColors = [
      '#52b788', // emerald leaf
      '#74c69d', // soft spring green
      '#40916c', // deep moss
      '#2d6a4f', // forest shade
      '#84a98c', // sage green
      '#d8f3dc', // light mint highlight
      '#e9c46a', // sunlit golden leaf
      '#f4a261'  // autumn warmth accent
    ];

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Generate initial leaves distributed across screen
    this.leaves = [];
    for (let i = 0; i < this.maxLeaves; i++) {
      this.leaves.push(this.createLeaf(true));
    }
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  createLeaf(randomY = false) {
    const size = 12 + Math.random() * 16;
    return {
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : -size * 2,
      size: size,
      speedY: 0.8 + Math.random() * 1.4,
      speedX: -0.4 + Math.random() * 0.8,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      flip: Math.random() * Math.PI,
      flipSpeed: 0.02 + Math.random() * 0.03,
      swayOffset: Math.random() * Math.PI * 2,
      swaySpeed: 0.015 + Math.random() * 0.02,
      swayWidth: 20 + Math.random() * 35,
      color: this.leafColors[Math.floor(Math.random() * this.leafColors.length)],
      shapeType: Math.floor(Math.random() * 3), // 0: simple oval, 1: pointed drip-tip, 2: serrated
      opacity: 0.35 + Math.random() * 0.45
    };
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.animate();
  }

  stop() {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  }

  onSlideChange(slideNum) {
    this.currentSlide = slideNum;
    // CRITICAL: Except 1st page, leaves fall continuously!
    if (slideNum === 1 || !this.userEnabled) {
      this.canvas.style.opacity = '0';
      this.canvas.style.pointerEvents = 'none';
      this.stop();
    } else {
      this.canvas.style.opacity = '1';
      this.start();
    }
  }

  toggleUserEnabled() {
    this.userEnabled = !this.userEnabled;
    this.onSlideChange(this.currentSlide);
    return this.userEnabled;
  }

  animate() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.leaves.length; i++) {
      const leaf = this.leaves[i];

      // Update physics
      leaf.y += leaf.speedY;
      leaf.swayOffset += leaf.swaySpeed;
      leaf.x += Math.sin(leaf.swayOffset) * 0.9 + leaf.speedX;
      leaf.rotation += leaf.rotationSpeed;
      leaf.flip += leaf.flipSpeed;

      // Wrap around bounds
      if (leaf.y > this.height + leaf.size * 2) {
        this.leaves[i] = this.createLeaf(false);
        continue;
      }
      if (leaf.x > this.width + leaf.size) leaf.x = -leaf.size;
      else if (leaf.x < -leaf.size) leaf.x = this.width + leaf.size;

      // Render Leaf
      this.ctx.save();
      this.ctx.translate(leaf.x, leaf.y);
      this.ctx.rotate(leaf.rotation);
      this.ctx.scale(Math.cos(leaf.flip), 1); // 3D flip effect

      this.ctx.globalAlpha = leaf.opacity;
      this.ctx.fillStyle = leaf.color;

      this.drawLeafShape(leaf);

      this.ctx.restore();
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  drawLeafShape(leaf) {
    const s = leaf.size;
    this.ctx.beginPath();

    if (leaf.shapeType === 0) {
      // Classic smooth elliptical leaf
      this.ctx.moveTo(0, -s);
      this.ctx.bezierCurveTo(s * 0.6, -s * 0.5, s * 0.6, s * 0.5, 0, s);
      this.ctx.bezierCurveTo(-s * 0.6, s * 0.5, -s * 0.6, -s * 0.5, 0, -s);
      this.ctx.fill();

      // Stem & mid-vein
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.moveTo(0, -s * 0.85);
      this.ctx.lineTo(0, s * 1.15);
      this.ctx.stroke();

    } else if (leaf.shapeType === 1) {
      // Peepal / sacred fig style with elongated drip tip
      this.ctx.moveTo(0, -s * 1.3); // tip
      this.ctx.quadraticCurveTo(s * 0.7, -s * 0.3, s * 0.5, s * 0.4);
      this.ctx.quadraticCurveTo(s * 0.2, s * 0.9, 0, s);
      this.ctx.quadraticCurveTo(-s * 0.2, s * 0.9, -s * 0.5, s * 0.4);
      this.ctx.quadraticCurveTo(-s * 0.7, -s * 0.3, 0, -s * 1.3);
      this.ctx.fill();

      this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.moveTo(0, -s * 1.2);
      this.ctx.lineTo(0, s * 1.05);
      this.ctx.stroke();

    } else {
      // Birch/Neem lanceolate leaf
      this.ctx.moveTo(0, -s * 1.1);
      this.ctx.quadraticCurveTo(s * 0.45, -s * 0.2, 0, s * 0.9);
      this.ctx.quadraticCurveTo(-s * 0.45, -s * 0.2, 0, -s * 1.1);
      this.ctx.fill();
    }
  }
}

// Global engine instance
window.leavesEngine = new FallingLeavesEngine();
