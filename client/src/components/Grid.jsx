class Grid extends React.Component {
  constructor() {
    super();
    this.mapArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
    this.gridNumber = 0;
  }

  componentWillMount() {
    this.setState({activeNumber: 1});
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  handleKeyDown(e) {
    var rows = Math.sqrt(this.mapArray.length);
    if (e.which === 72) {
      // h / move left
      if ((this.state.activeNumber - 1) % 5 !== 0) {
        this.setState({activeNumber: this.state.activeNumber - 1});
      }
    } else if (e.which === 74) {
      // j / move down
      if (this.state.activeNumber < rows * (rows - 1)) {
        this.setState({activeNumber: this.state.activeNumber + 5});
      }
    } else if (e.which === 75) {
      // k / move up
      if (this.state.activeNumber > rows) {
        this.setState({activeNumber: this.state.activeNumber - 5});
      }
    } else if (e.which === 76) {
      // l/ move right
      if (this.state.activeNumber % 5 !== 0) {
        this.setState({activeNumber: this.state.activeNumber + 1});
      }
    }
  }

  render() {
    this.gridNumber = 1;
    return (
      <div id="grid" onKeyDown={this.setActiveNumber}>
      {this.mapArray.map((abox) => <div className={"gridbox " + (this.state.activeNumber === (this.gridNumber) ? "activated" : "")} id={this.gridNumber++}>{abox}</div>
      )}
    </div>
    );
  }
}

//  In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.Grid = Grid;


// var boxCount = 0;
// var theGrid = ({mapArray}) => (
//   mapArray.map(function(abox){
//     <div classname="gridbox" id={gridnumber}></div>
//     boxCount++;
//   });
// );


/*
var FishTable = ({fishData}) => (
  <table>
    <tbody>
      {fishData.map(function(fish){
        <FishTableRow fish={fish}/>
      });}
    </tbody>
  </table>
);
*/
// var Box = ({}) =>(

// <div classname="gridbox" id=gridnumber>{props.wutever}</div>

// );


//get data server
//randomly poplate maparray
//maparray.map(function...//genereates each div)
