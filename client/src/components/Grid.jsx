class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mapArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
      gridNumber: 0,
      playerPosition: 0
    };
  }

  componentWillMount() {

    $.get('/api/challenges')
      .done(challenges => { // An array of challenge objects
        this.setState({
          challenges: challenges
        });
      })
      .fail(function(error) {
        console.error('Could not get challenges:', error);
      });
  }

  render() {
    return (<div id="grid">
      {this.state.mapArray.map((abox) =>
          <div className="gridbox" id={this.state.gridNumber++}>{this.state.gridNumber}</div>
      )}
    </div>);
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

//get data server
//randomly poplate maparray
//maparray.map(function...//genereates each div)
