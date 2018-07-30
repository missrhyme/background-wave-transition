# Background Wave Transition
- A background wave transition component with pixi.js.
- [Here](https://missrhyme.github.io/background-wave-transition/) is a example.

# How to use
```
npm install background-wave-transition
```

```javascript
import WaveTransition from 'background-wave-transition';

const transition = new WaveTransition({
  element: document.getElementById('container'),
  width: 1280,
  height: 800,
  textures: [
    'https://i.loli.net/2018/07/30/5b5e8b9a44128.jpeg',
    'https://i.loli.net/2018/07/30/5b5e8b9a44b4b.jpeg',
    'https://i.loli.net/2018/07/30/5b5e8b9a50b36.png'
  ],
  animationOptions: {}
});
```

attribute | defaultValue | description
---- | --- | ---
element | none | target element
width |  document.body.clientWidth  |  canvas width
height |  window.innerHeight  |  canvas height
textures | [] | background image array
animationOptions.duration | 2 | animation duration
animationOptions.initialTime | 1 | first shockwave's time
animationOptions.timePulse | 0.02 | shockwave's time increase per frame
animationOptions.initialAmplitude | 30 | shockwave's amplitude
animationOptions.amplitudePulse | 0.6 | shockwave's amplitude decrease per frame
animationOptions.alphaPulse | 0.01 | layer's alpha change per frame
animationOptions.wavelength | 300 | shockwave's wavelength
animationOptions.waveCount | 3 | shockwave count
animationOptions.radius | 2000 | shockwave's radius