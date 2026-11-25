/**
 * NatureSoundscape - Procedural Web Audio Nature Generator
 * Completely offline, zero external dependencies, 100% royalty-free.
 * Synthesizes:
 *  1. Birds in a Forest (procedural bird calls + gentle canopy rustle)
 *  2. Gentle Flowing Water (resonant river babble & droplet nodes)
 *  3. Quiet Wind Through Leaves (LFO-modulated organic air currents)
 */

class NatureSoundscape {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.duckGain = null;
    this.currentMode = 'none'; // 'birds' | 'water' | 'wind' | 'none'
    this.isPlaying = false;
    this.volume = 0.25;
    this.isDucked = false;

    // Active nodes tracking
    this.activeNodes = [];
    this.schedulerTimer = null;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

    this.duckGain = this.ctx.createGain();
    this.duckGain.gain.setValueAtTime(1.0, this.ctx.currentTime);

    this.masterGain.connect(this.duckGain);
    this.duckGain.connect(this.ctx.destination);
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(this.volume, this.ctx.currentTime + 0.1);
    }
  }

  duck(shouldDuck = true) {
    this.isDucked = shouldDuck;
    if (!this.duckGain || !this.ctx) return;
    const target = shouldDuck ? 0.15 : 1.0;
    const now = this.ctx.currentTime;
    this.duckGain.gain.cancelScheduledValues(now);
    this.duckGain.gain.setTargetAtTime(target, now, 0.4);
  }

  async play(mode) {
    this.init();
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    if (this.currentMode === mode && this.isPlaying) return;

    this.stop();
    this.currentMode = mode;

    if (mode === 'none') {
      this.isPlaying = false;
      return;
    }

    this.isPlaying = true;

    switch (mode) {
      case 'birds':
        this._startBirds();
        break;
      case 'water':
        this._startWater();
        break;
      case 'wind':
        this._startWind();
        break;
    }
  }

  stop() {
    if (this.schedulerTimer) {
      clearInterval(this.schedulerTimer);
      this.schedulerTimer = null;
    }
    this.activeNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (e) {
        // ignore
      }
    });
    this.activeNodes = [];
    this.isPlaying = false;
  }

  // Helper: Create a continuous pink/brown noise buffer
  _createNoiseBuffer(type = 'pink', durationSec = 5) {
    const bufferSize = this.ctx.sampleRate * durationSec;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      if (type === 'pink') {
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      } else { // brown noise
        lastOut = (lastOut + (0.02 * white)) / 1.02;
        data[i] = lastOut * 3.5;
      }
    }
    return buffer;
  }

  // ----------------------------------------------------
  // 1. BIRDS IN A FOREST
  // ----------------------------------------------------
  _startBirds() {
    // A. Gentle background rustle of forest leaves
    const noiseBuffer = this._createNoiseBuffer('pink', 4);
    const noiseSrc = this.ctx.createBufferSource();
    noiseSrc.buffer = noiseBuffer;
    noiseSrc.loop = true;

    const rustleFilter = this.ctx.createBiquadFilter();
    rustleFilter.type = 'lowpass';
    rustleFilter.frequency.value = 550;

    const rustleGain = this.ctx.createGain();
    rustleGain.gain.value = 0.12;

    noiseSrc.connect(rustleFilter);
    rustleFilter.connect(rustleGain);
    rustleGain.connect(this.masterGain);

    noiseSrc.start();
    this.activeNodes.push(noiseSrc, rustleFilter, rustleGain);

    // B. Periodic procedural bird calls
    const triggerBirdSong = () => {
      if (!this.isPlaying || this.currentMode !== 'birds') return;
      this._synthesizeBirdChirp();
    };

    // First call soon, then random intervals
    setTimeout(triggerBirdSong, 600);
    this.schedulerTimer = setInterval(() => {
      if (Math.random() > 0.3) {
        triggerBirdSong();
      }
    }, 2800);
  }

  _synthesizeBirdChirp() {
    if (!this.ctx || this.ctx.state !== 'running') return;
    const now = this.ctx.currentTime;
    const pattern = Math.floor(Math.random() * 3);

    // Stereo panner for natural spatial feel
    let panner = null;
    if (this.ctx.createStereoPanner) {
      panner = this.ctx.createStereoPanner();
      panner.pan.value = (Math.random() * 1.6) - 0.8;
      panner.connect(this.masterGain);
    }

    const dest = panner || this.masterGain;

    if (pattern === 0) {
      // High-pitched two-tone warbler: Tu-wee!
      this._birdTone(dest, now, 2800, 3600, 0.12, 0.15);
      this._birdTone(dest, now + 0.16, 3200, 4400, 0.18, 0.22);
    } else if (pattern === 1) {
      // Rapid musical trill: 3-4 soft chirps
      const baseFreq = 3000 + Math.random() * 600;
      for (let i = 0; i < 4; i++) {
        const offset = i * 0.08;
        this._birdTone(dest, now + offset, baseFreq + (i * 120), baseFreq + 800, 0.06, 0.14);
      }
    } else {
      // Descending gentle forest whistle
      this._birdTone(dest, now, 4200, 2900, 0.25, 0.16);
      this._birdTone(dest, now + 0.3, 3800, 2600, 0.28, 0.13);
    }
  }

  _birdTone(dest, startTime, startFreq, endFreq, duration, peakGain) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq, startTime);
    osc.frequency.exponentialRampToValueAtTime(Math.max(100, endFreq), startTime + duration);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(peakGain, startTime + (duration * 0.3));
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(dest);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }

  // ----------------------------------------------------
  // 2. GENTLE FLOWING WATER (Stream & Bubbles)
  // ----------------------------------------------------
  _startWater() {
    const buffer = this._createNoiseBuffer('pink', 5);
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Resonant bandpass filter
    const bandpass = this.ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 680;
    bandpass.Q.value = 1.2;

    // Lowpass filter for smooth warmth
    const lowpass = this.ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 1400;

    // Subtle LFO modulating the water flow current
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.value = 0.35;
    lfoGain.gain.value = 180;
    lfo.connect(bandpass.frequency);

    const waterGain = this.ctx.createGain();
    waterGain.gain.value = 0.42;

    noise.connect(bandpass);
    bandpass.connect(lowpass);
    lowpass.connect(waterGain);
    waterGain.connect(this.masterGain);

    noise.start();
    lfo.start();

    this.activeNodes.push(noise, bandpass, lowpass, lfo, lfoGain, waterGain);

    // Random gentle bubbling water droplets
    this.schedulerTimer = setInterval(() => {
      if (Math.random() > 0.4 && this.isPlaying && this.currentMode === 'water') {
        this._waterPlop();
      }
    }, 700);
  }

  _waterPlop() {
    if (!this.ctx || this.ctx.state !== 'running') return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const startF = 400 + Math.random() * 450;
    const endF = startF + 250 + Math.random() * 300;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(startF, now);
    osc.frequency.exponentialRampToValueAtTime(endF, now + 0.09);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  // ----------------------------------------------------
  // 3. QUIET WIND THROUGH LEAVES
  // ----------------------------------------------------
  _startWind() {
    const buffer = this._createNoiseBuffer('pink', 6);
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 350;
    filter.Q.value = 2.0;

    // Slow organic gusts via 2 detuned LFOs
    const lfo1 = this.ctx.createOscillator();
    const lfoGain1 = this.ctx.createGain();
    lfo1.frequency.value = 0.12; // slow 8-second cycle
    lfoGain1.gain.value = 220;
    lfo1.connect(filter.frequency);

    const lfo2 = this.ctx.createOscillator();
    const lfoGain2 = this.ctx.createGain();
    lfo2.frequency.value = 0.07; // 14-second drift
    lfoGain2.gain.value = 150;
    lfo2.connect(filter.frequency);

    const windGain = this.ctx.createGain();
    windGain.gain.value = 0.38;

    noise.connect(filter);
    filter.connect(windGain);
    windGain.connect(this.masterGain);

    noise.start();
    lfo1.start();
    lfo2.start();

    this.activeNodes.push(noise, filter, lfo1, lfoGain1, lfo2, lfoGain2, windGain);
  }
}

// Global instance
window.natureAudio = new NatureSoundscape();
