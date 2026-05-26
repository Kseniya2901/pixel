let field = document.querySelector('.field')



let CURRENT_COLOR = 'rgb(216, 29, 29)';
let DEFAULT_COLOR = 'rgb(255, 255, 255)';

let COLOR_MAP = {
    'red': 'rgb(216, 29, 29)',
    'green': 'rgb(32, 168, 32)',
    'yellow': 'rgb(253, 253, 99)',
    'blue': 'rgb(74, 74, 245)',
    'pink': 'rgb(250, 184, 195)'
};

let COLORS = [
    'rgb(255, 255, 255)',
    'rgb(216, 29, 29)',
    'rgb(32, 168, 32)',
    'rgb(253, 253, 99)',
    'rgb(74, 74, 245)',
    'rgb(250, 184, 195)'
]

function get_result_from_cookie() {
    let cookies = document.cookie.split('; ')
    for (let i = 0; i < cookies.length; i += 1) {
        let cookie = cookies[i].split('=')
        console.log(cookie)
        if(cookie[0] == 'pixel-result') {
            return cookie[1]
        }
    }           
    return '0'.repeat(450)
}

let temp_result = get_result_from_cookie()

for (let i = 0; i < 450; i += 1) {
    let cell = document.createElement('div')
    cell.style.backgroundColor = COLORS[temp_result[i]]
    cell.classList.add('cell')
    field.appendChild(cell)
}

setInterval(function() {
    let result = '';
    let temp_cells = document.querySelectorAll('.cell');

    for(let i = 0;  i < temp_cells.length; i += 1) {
        let cell = temp_cells[i];
        let color = cell.style.backgroundColor;

        let colorIndex = '0';
        for (let j = 0; j < COLORS.length; j++) {
            if (color === COLORS[j]) {
                colorIndex = j.toString();
                break;
            }
        }
        result += colorIndex;
    }
    document.cookie = `pixel-result=${result}; max-age=10000`;
},1000)

let IS_CLICKED = false;

document.addEventListener('mousedown',function(){
   IS_CLICKED = true;
})

document.addEventListener('mouseup', function(){
    IS_CLICKED = false;
})

let cells = document.querySelectorAll('.cell')
for (let i = 0; i < cells.length; i++) {
    let cell = cells[i];
    cell.addEventListener('mousedown', function(){
        if (FILL_MODE) {
            for(let j = 0; j < cells.length; j++) {
                cells[j].style.backgroundColor = CURRENT_COLOR;
            } 
            FILL_MODE = false;
        } else {
                cell.style.backgroundColor = CURRENT_COLOR;
            }
        cell.style.backgroundColor = CURRENT_COLOR;

    })

    cell.addEventListener('mouseover', function(){
        if(IS_CLICKED) {
            cell.style.backgroundColor = CURRENT_COLOR;
        }
    })
}

let color_cells = document.querySelectorAll('.color-cell')
for (let i = 0; i < color_cells.length; i++) {
    let color_cell = color_cells[i];
    color_cell.addEventListener('click', function(){
        let colorClass = '';
        if(color_cell.classList.contains('red')) colorClass = 'red';
        else if (color_cell.classList.contains('green')) colorClass = 'green';
        else if (color_cell.classList.contains('yellow')) colorClass = 'yellow';
        else if (color_cell.classList.contains('blue')) colorClass = 'blue';
        else if (color_cell.classList.contains('pink')) colorClass = 'pink';

        CURRENT_COLOR = COLOR_MAP[colorClass];

        document.querySelector('.selected').classList.remove('selected')
        color_cell.classList.add('selected')
    })
}
let eraser = document.querySelector('.eraser');

eraser.addEventListener('click', function() {
    CURRENT_COLOR = DEFAULT_COLOR;

    document.querySelector('.selected').classList.remove('selected')

    eraser.classList.add('selected')
})

let FILL_MODE = false;

let fillTool = document.querySelector('.fill-tool')

fillTool.addEventListener('click', function() {
    FILL_MODE = true;

    document.querySelector('.selected').classList.remove('selected')
    fillTool.classList.add('selected')
})