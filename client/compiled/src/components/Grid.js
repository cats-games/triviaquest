"use strict";

var mapArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
var gridNumber = 0;
var Grid = function Grid() {
  return React.createElement(
    "div",
    { id: "grid" },
    mapArray.map(function (abox) {
      return React.createElement(
        "div",
        { className: "gridbox", id: gridNumber++ },
        abox
      );
    })
  );
};

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0dyaWQuanN4Il0sIm5hbWVzIjpbIm1hcEFycmF5IiwiZ3JpZE51bWJlciIsIkdyaWQiLCJtYXAiLCJhYm94Iiwid2luZG93Il0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFdBQVcsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixFQUFuQixFQUFzQixFQUF0QixFQUF5QixFQUF6QixFQUE0QixFQUE1QixFQUErQixFQUEvQixFQUFrQyxFQUFsQyxFQUFxQyxFQUFyQyxFQUF3QyxFQUF4QyxFQUEyQyxFQUEzQyxFQUE4QyxFQUE5QyxFQUFpRCxFQUFqRCxFQUFvRCxFQUFwRCxFQUF1RCxFQUF2RCxFQUEwRCxFQUExRCxFQUE2RCxFQUE3RCxFQUFnRSxFQUFoRSxDQUFmO0FBQ0EsSUFBSUMsYUFBYSxDQUFqQjtBQUNBLElBQUlDLE9BQU8sU0FBUEEsSUFBTztBQUFBLFNBQ1Q7QUFBQTtBQUFBLE1BQUssSUFBRyxNQUFSO0FBQ0dGLGFBQVNHLEdBQVQsQ0FBYSxVQUFDQyxJQUFEO0FBQUEsYUFDWjtBQUFBO0FBQUEsVUFBSyxXQUFVLFNBQWYsRUFBeUIsSUFBSUgsWUFBN0I7QUFBNENHO0FBQTVDLE9BRFk7QUFBQSxLQUFiO0FBREgsR0FEUztBQUFBLENBQVg7O0FBUUE7QUFDQTtBQUNBQyxPQUFPSCxJQUFQLEdBQWNBLElBQWQ7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOzs7Ozs7Ozs7OztBQVdBOztBQUVBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0EiLCJmaWxlIjoiR3JpZC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBtYXBBcnJheSA9IFsxLDIsMyw0LDUsNiw3LDgsOSwxMCwxMSwxMiwxMywxNCwxNSwxNiwxNywxOCwxOSwyMCwyMSwyMiwyMywyNCwyNV07XG52YXIgZ3JpZE51bWJlciA9IDA7XG52YXIgR3JpZCA9ICgpID0+IChcbiAgPGRpdiBpZD1cImdyaWRcIj5cbiAgICB7bWFwQXJyYXkubWFwKChhYm94KSA9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkYm94XCIgaWQ9e2dyaWROdW1iZXIrK30+e2Fib3h9PC9kaXY+XG4gICAgKX1cbiAgPC9kaXY+XG4pO1xuXG4vLyAgSW4gdGhlIEVTNiBzcGVjLCBmaWxlcyBhcmUgXCJtb2R1bGVzXCIgYW5kIGRvIG5vdCBzaGFyZSBhIHRvcC1sZXZlbCBzY29wZVxuLy8gYHZhcmAgZGVjbGFyYXRpb25zIHdpbGwgb25seSBleGlzdCBnbG9iYWxseSB3aGVyZSBleHBsaWNpdGx5IGRlZmluZWRcbndpbmRvdy5HcmlkID0gR3JpZDtcblxuXG4vLyB2YXIgYm94Q291bnQgPSAwO1xuLy8gdmFyIHRoZUdyaWQgPSAoe21hcEFycmF5fSkgPT4gKFxuLy8gICBtYXBBcnJheS5tYXAoZnVuY3Rpb24oYWJveCl7XG4vLyAgICAgPGRpdiBjbGFzc25hbWU9XCJncmlkYm94XCIgaWQ9e2dyaWRudW1iZXJ9PjwvZGl2PlxuLy8gICAgIGJveENvdW50Kys7XG4vLyAgIH0pO1xuLy8gKTtcblxuXG4vKlxudmFyIEZpc2hUYWJsZSA9ICh7ZmlzaERhdGF9KSA9PiAoXG4gIDx0YWJsZT5cbiAgICA8dGJvZHk+XG4gICAgICB7ZmlzaERhdGEubWFwKGZ1bmN0aW9uKGZpc2gpe1xuICAgICAgICA8RmlzaFRhYmxlUm93IGZpc2g9e2Zpc2h9Lz5cbiAgICAgIH0pO31cbiAgICA8L3Rib2R5PlxuICA8L3RhYmxlPlxuKTtcbiovXG4vLyB2YXIgQm94ID0gKHt9KSA9PihcblxuLy8gPGRpdiBjbGFzc25hbWU9XCJncmlkYm94XCIgaWQ9Z3JpZG51bWJlcj57cHJvcHMud3V0ZXZlcn08L2Rpdj5cblxuLy8gKTtcblxuXG4vL2dldCBkYXRhIHNlcnZlclxuLy9yYW5kb21seSBwb3BsYXRlIG1hcGFycmF5XG4vL21hcGFycmF5Lm1hcChmdW5jdGlvbi4uLi8vZ2VuZXJlYXRlcyBlYWNoIGRpdilcbiJdfQ==