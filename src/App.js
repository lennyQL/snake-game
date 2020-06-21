import React from 'react';
import './App.css';
// import { render } from 'react-dom';

function Square(props) {
  return (
    <div className="square" style={props.blockStyle}>
      {/* {props.value} */}
    </div>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    const color = {
      background: '',
    };

    this.state = {
      square: Array.from(new Array(30), () => new Array(18).fill(color)),
      posx: 10,
      posy: 10,
      key: 'left',
      interval: 300,
      /**
       * TODO
       * * snakeとappleの座標とかを格納するリストを作る
       * * snake gameの作り方を調べる(codingtrainとかで)
       */
      snake: [], 
      apple: [],
    };

    this.gameStart();
  }

  /**
   * ゲームスタート
   */
  gameStart() {
    this.intervalTimer = setInterval(() => this.update(), this.state.interval);
  }

  /**
   * ゲーム終了
   */
  gameEnd() {
    clearInterval(this.intervalTimer);
  }

  /**
   * 状態遷移のインターバルの変更
   * @param {*} interval 遷移の間隔(ms)
   */
  changeInterval(interval) {
    clearInterval(this.intervalTimer);
    this.intervalTimer = setInterval(() => this.update(), interval);
  }

  /**
   * 状態更新
   */
  update() {
    const oldColor = { background: '' };
    const newColor = { background: 'red' };
    let newSquare = this.state.square.slice();
    // 前の位置の色をクリア
    newSquare[this.state.posx][this.state.posy] = oldColor;
    this.setState({ square: newSquare });
    // keypressedイベント
    if (this.state.key === 'up') {
      if (this.state.posy === 0) {
        return;
      }
      this.setState({ posy: this.state.posy - 1 });
    } else if (this.state.key === 'down') {
      if (this.state.posy === this.state.square[0].length - 1) {
        return;
      }
      this.setState({ posy: this.state.posy + 1 });
    } else if (this.state.key === 'left') {
      if (this.state.posx === 0) {
        return;
      }
      this.setState({ posx: this.state.posx - 1 });
    } else if (this.state.key === 'right') {
      if (this.state.posx === this.state.square.length - 1) {
        return;
      }
      this.setState({ posx: this.state.posx + 1 });
    }
    // 位置の更新
    newSquare[this.state.posx][this.state.posy] = newColor;
    this.setState({ square: newSquare });
  }

  /**
   * keyが押された時
   */
  handleKeyDown(e) {
    // 上
    if (e.keyCode === 38) {
      this.setState({ key: 'up' });
    }
    // 下
    else if (e.keyCode === 40) {
      this.setState({ key: 'down' });
    }
    // 左
    else if (e.keyCode === 37) {
      this.setState({ key: 'left' });
    }
    // 右
    else if (e.keyCode === 39) {
      this.setState({ key: 'right' });
    }
    // スペース
    else if (e.keyCode === 32) {
      this.setState({ interval: 500 });
      this.changeInterval(this.state.interval);
    }
    // エンター
    else if (e.keyCode === 13) {
      this.setState({ interval: 300 });
      this.changeInterval(this.state.interval);
    }
  }

  /**
   *  イベントリスナ
   */
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  /**
   * それぞれのブロックの描画
   * @param {*} i x座標, i番目
   * @param {*} j y座標, j番目
   */
  renderSquare(i, j) {
    return <Square blockStyle={this.state.square[i][j]} />;
  }

  /**
   * 列を決める
   * @param {*} j 列のkey
   */
  row(j) {
    const rows = [];
    for (let i = 0; i < 30; i++) {
      rows.push(<div key={i}>{this.renderSquare(i, j)}</div>);
    }
    return rows;
  }

  render() {
    // 行を決める
    const cols = [];
    for (let i = 0; i < 18; i++) {
      cols.push(
        <div class="board-row" key={i}>
          {this.row(i)}
          {/* {rows} */}
        </div>
      );
    }
    return (
      <div>
        <div>{cols}</div>
        <p>key: {this.state.key}</p>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      history: Array.from(new Array(30), () => new Array(18).fill(0)),
    };
  }

  /**
   * keyが押された時
   */
  handleKeyDown(e) {
    // 上
    if (e.keyCode === 38) {
      this.setState({ key: 'up' });
    }
    // 下
    else if (e.keyCode === 40) {
      this.setState({ key: 'down' });
    }
    // 左
    else if (e.keyCode === 37) {
      this.setState({ key: 'left' });
    }
    // 右
    else if (e.keyCode === 39) {
      this.setState({ key: 'right' });
    }
  }

  /**
   *  イベントリスナ
   */
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  render() {
    return (
      <div>
        <Board whichKey={this.state.key} />
        <p>{this.state.key}</p>
        {/* <p>{this.state.history}</p> */}
        <p>{this.state.history[3][1]}</p>
      </div>
    );
  }
}

export default App;
