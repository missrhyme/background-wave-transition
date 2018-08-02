import * as React from 'react';
import {Component} from 'react';
import WaveTransition from './WaveTransition';

import './main.scss';

interface IPropType {
  width: number;
  height: number;
  textures?: string[];
  index?: number;
  children?: React.ReactChild;
}

interface IStateType {
}

export default class Example extends Component<IPropType, IStateType> {
  private dom: HTMLElement;
  private wt: WaveTransition;
  private timeout;

  public componentDidMount() {
    this.initApplication();
  }

  private initApplication = () => {
    this.wt = new WaveTransition({
      element: this.dom,
      width: 1280,
      height: 800,
      textures: [
        '/images/kon-min.jpeg',
        '/images/kon2-min.png',
        '/images/kon3-min.jpeg'
      ]
    });
    this.timeout = setInterval(
      () => {
        const r = Math.random() > 0.5;
        if (r) {
          this.wt.goNext();
        }
        this.wt.goPrev();
      },
      3000
    );
  }

  private handleChange = (prev: boolean = true) => {
    if (prev) {
      this.wt.goPrev();
    } else {
      this.wt.goNext();
    }
    clearInterval(this.timeout);
  }

  public render() {
    const {children} = this.props;
    return (
      <div
        ref={c => { this.dom = c; }}
        className='container'
      >
        {children}
        <button onClick={() => this.handleChange()} className='btn btn-prev'>Prev</button>
        <button onClick={() => this.handleChange(false)} className='btn btn-next'>Next</button>
      </div>
    );
  }
}
