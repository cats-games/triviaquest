console.log('main.js file recognized');


function main() {
  return;
}

const element = (
  <div>
  <h1>
    REACT
  </h1>
  <nav>LUXURY NAV</nav>
  <Grid />
  <Textfield />
  </div>
);

console.log(element);

ReactDOM.render(
  element,
  document.getElementById('main')
);