var mapArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
var gridNumber = 0;
var Grid = () => (
  <div id="grid">
    {mapArray.map((abox) =>
      <div className="gridbox" id={gridNumber++}>{abox}</div>
    )}
  </div>
);

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
