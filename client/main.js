console.log('main.js file recognized');


function main() {
  return;
}

const element = (
  <div>
  <h1>
    Learn React!
  </h1>
  <Grid />
  <Textfield />
  <Gameinfo />
  </div>
);

console.log(element);

ReactDOM.render(
  element,
  document.getElementById('main')
);