import * as React from 'react';
import {Component} from 'react';
import WaveTransition from './WaveTransition';

// import './index.scss';

interface IPropType {
  width: number;
  height: number;
  textures?: string[];
  index?: number;
  children?: React.ReactChild;
}

interface IStateType {
}

export default class Test extends Component<IPropType, IStateType> {
  private dom;
  private app;
  private wt;

  public componentDidMount() {
    this.initApplication();
  }

  public componentWillUnmount() {
    // this.destroyApplication();
  }

  private initApplication = () => {
    this.wt = new WaveTransition({
      element: this.dom,
      width: 1280,
      height: 800,
      textures: [
        'images/kon.jpeg',
        'images/kon2.png',
        'images/kon3.jpeg'
      ]
    });
  }

  // private destroyApplication = () => {
  //   this.app.desdroy();
  // }

  public render() {
    const {children} = this.props;
    return (
      <div ref={c => { this.dom = c; }}>
        {children}
        <button onClick={() => this.wt.changePrev()}>0</button>
        <button onClick={() => this.wt.changeNext()}>1</button>
      </div>
    );
  }
}
