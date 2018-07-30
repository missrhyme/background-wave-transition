import * as PIXI from 'pixi.js';
import {ShockwaveFilter} from '@pixi/filter-shockwave';
import assign  = require('lodash/assign'); // tslint:disable-line

export interface IAnimationOptions {
  duration?: number;
  initialTime?: number;
  timePulse?: number;
  initialAmplitude?: number;
  amplitudePulse?: number;
  alphaPulse?: number;
  wavelength?: number;
  waveCount?: number;
  radius?: number;
}

export interface IOptions {
  element: HTMLElement;
  width?: number;
  height?: number;
  textures?: string[];
  index?: number;
  animationOptions?: IAnimationOptions;
}

export default class WaveTransition {
  constructor(options: IOptions) {
    this.options = assign(
      {},
      {
        width: document.body.clientWidth,
        height: window.innerHeight
      },
      options
    );
    this.index = options.index || 0;
    this.animationOptions = assign(
      {},
      {
        duration: 2,
        initialTime: 1,
        timePulse: 0.02,
        initialAmplitude: 30,
        amplitudePulse: 0.6,
        alphaPulse: 0.01,
        wavelength: 300,
        waveCount: 3,
        radius: 2000
      },
      options.animationOptions
    );
    this.init();
  }

  private app: PIXI.Application;
  public container: PIXI.Container;
  public options: IOptions;
  public index: number;
  public animationOptions: IAnimationOptions;
  public textureList: PIXI.Texture[];
  public currentSprite: PIXI.Sprite;
  public nextSprite: PIXI.Sprite;
  public waves = [];
  private ticker;
  public isAnimating = false;

  private init = () => {
    const {width, height, element} = this.options;
    this.app = new PIXI.Application({
      width,
      height,
      transparent: true
    });
    element.appendChild(this.app.view);

    this.initTexture();
    this.initSprite();
    this.initWaves();
    this.initContainer();
  }

  private initTexture = () => {
    const {textures} = this.options;
    this.textureList = textures.map(i => PIXI.Texture.fromImage(i));
  }

  private initSprite = () => {
    this.currentSprite = new PIXI.Sprite(this.textureList[this.index || 0]);
    this.currentSprite.texture.baseTexture.on('loaded', () => {
      this.resizeSprite(this.currentSprite);
    });
    this.nextSprite = new PIXI.Sprite();
  }

  private initWaves = () => {
    const {initialAmplitude, waveCount, wavelength, radius} = this.animationOptions;
    const arr = [];
    for (let index = 0; index < waveCount; index++) {
      arr.push(new ShockwaveFilter([-10000, -10000], {
        amplitude: initialAmplitude,
        wavelength,
        radius
      }));
    }
    this.waves = arr;
  }

  private initContainer = () => {
    this.container = new PIXI.Container();
    this.container.filters = this.waves;
    this.container.addChild(this.currentSprite, this.nextSprite);
    this.app.stage.addChild(this.container);
  }

  private resizeSprite = (sprite: PIXI.Sprite) => {
    const {width, height} = this.options;
    const {orig} = sprite.texture;

    if (orig.width <= 1 && orig.height <= 1) {
      return;
    }

    const containerRatio = width / height;
    const imageRatio = orig.width / orig.height;

    if (containerRatio > imageRatio) {
      sprite.height = orig.height / (orig.width / width);
      sprite.width = width;
      sprite.position.x = 0;
      sprite.position.y = (height - sprite.height) / 2;
    } else {
      sprite.width = orig.width / (orig.height / height);
      sprite.height = height;
      sprite.position.y = 0;
      sprite.position.x = (width - sprite.width) / 2;
    }
  }

  private checkIndex = (index: number): number => {
    const len = this.textureList.length;
    if (index >= len) {
      return 0;
    } else if (index < 0) {
      return len - 1;
    }
    return index;
  }

  public changePrev = () => {
    const index = this.checkIndex(this.index  - 1);
    this.changeTo(index, 'left');
  }

  public changeNext = () => {
    const index = this.checkIndex(this.index  + 1);
    this.changeTo(index);
  }

  public changeTo = (index: number, from?: 'left' | 'right') => {
    if (this.isAnimating) {
      return;
    }
    this.isAnimating = true;
    this.ticker = new PIXI.ticker.Ticker();
    this.ticker.stop();

    const {width, height} = this.options;
    const {
      duration, initialAmplitude, initialTime,
      amplitudePulse, timePulse, alphaPulse
    } = this.animationOptions;
    const center = from === 'left' ?
      new PIXI.Point(-0.5 * width, height / 2) :
      new PIXI.Point(1.5 * width, height / 2);

    this.waves.forEach((wave, waveIndex) => {
      wave.center = center;
      wave.time = initialTime + (0.8 * initialTime * waveIndex);
      wave.amplitude = initialAmplitude;
    });

    this.currentSprite.alpha = 1;
    this.nextSprite.alpha = 0;
    this.nextSprite.texture = this.textureList[index];
    this.resizeSprite(this.nextSprite);

    this.ticker.add((deltaTime) => {
      if (this.waves[0].time <= duration) {
        this.waves.forEach((wave) => {
          wave.time += deltaTime * timePulse;
          wave.amplitude -= deltaTime * amplitudePulse;
          this.currentSprite.alpha -= deltaTime * alphaPulse;
          this.nextSprite.alpha += deltaTime * alphaPulse;
        });
      } else {
        this.ticker.stop();
        this.ticker.destroy();
        this.ticker = null;
        this.currentSprite.texture = this.textureList[index];
        this.resizeSprite(this.currentSprite);
        this.currentSprite.alpha = 1;
        this.index = index;
        this.isAnimating = false;
      }
    });
    this.ticker.start();
  }
}
