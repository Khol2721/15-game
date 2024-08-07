const game = document.createElement('div');
game.className = 'game';
document.body.prepend(game);

const header = document.createElement('header');
game.append(header)

const play = document.createElement('button');
play.className = 'btn-play'
play.innerHTML = 'Новая игра'
header.append(play)

const field = document.createElement('div');
field.className = 'field';
game.append(field)


const cellSize = 100;
const empty = {
  value: 0,
  top: 0,
  left: 0
};


const cells = [];

function move(index) {
  const cell = cells[index];
  //соседние ячейки
  const leftDiff = Math.abs(empty.left - cell.left);
  const topDiff = Math.abs(empty.top - cell.top);

  if (leftDiff + topDiff > 1) {
    return;
  }
  //координаты пустых ячеек
  cell.element.style.left = `${empty.left * cellSize}px`
  cell.element.style.top = `${empty.top * cellSize}px`
  //промежуточные переменные координаты пустых ячеек 
  const emptyLeft = empty.left;
  const emptyTop = empty.top;
  // в координаты пустой клетки, координаты текущей ячейки 
  empty.left = cell.left;
  empty.top = cell.top;
  //в тек. ячейку координаты пустой
  cell.left = emptyLeft;
  cell.top = emptyTop;

  const isFinished = cells.every(cell => {
    return cell.value === cell.top * 4 + cell.left;
  });

  if (isFinished) {
    win()
  }
}

play.addEventListener('click', () => {
  newGame()
})

function newGame() {
  field.innerHTML = '';
  cells.length = 0;
  empty.top = 0;
  empty.left = 0;
  cells.push(empty);

  //сортировка массива
  const numbers = [...Array(15).keys()]
    .sort(() => Math.random() - 0.5);
  for (let i = 1; i <= 15; i++) {
    const cell = document.createElement('div');
    const value = numbers[i - 1] + 1;
    cell.className = 'cell';
    cell.innerHTML = value;
    //вычисление координат
    const left = i % 4;
    const top = (i - left) / 4;

    cells.push({
      value: value,
      left: left,
      top: top,
      element: cell
    })

    cell.style.left = `${left * cellSize}px`;
    cell.style.top = `${top * cellSize}px`;

    field.append(cell);

    cell.addEventListener('click', () => {
      move(i);
    })
  }
}