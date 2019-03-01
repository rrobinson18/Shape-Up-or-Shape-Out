class Shape {
    constructor(x, y, numShapes) {
        this.x = x;
        this.y = y;
        this.top;
        this.left;
        this.area;
        this.perimeter;
        this.shapeId;
        this.desc;
        this.div;
    }

    calArea() {
        this.area = this.x * this.y;
    }
    calPerimeter() {
        this.perimeter = 2 * this.x + 2 * this.y;
    }

    printStats() {
        let paragraphs = `<p> Description: ${this.desc}><p> Width: ${this.width}></p><p> Height: ${this.height}></p><p> Radius: ${this.radius}</p><p> Area: ${this.area}></p><p> Perimeter: ${this.perimeter}></p>`;

        $('.info-box').replaceWith(`${paragraphs}`);
    }

    randomPlace() {
        this.top = Math.floor(Math.random() * (600 - this.y) + 1);
        this.left = Math.floor(Math.random() * (600 - this.x) + 1);
    }

    drawShape() {
        let xwidth = this.x + 'px';
        let yheight = this.y + 'px';

        let divPara = `<div id="rptStatsId"></div>`;
        $('#rptStatsId').replaceWith(`${divPara}`);

        $(`#${numShapes}`).css({ position: "absolute", width: xwidth, height: yheight, top: this.top, left: this.left});

        this.div = document.getElementById(this.shapeId);

        this.calPerimeter();
        this.calArea();

        this.div.addEventListener('click', () => {
            let theShape = document.getElementById('rptStatsId');
            let divPara = `<div id='rptStatsId'><p>Description: ${this.desc}<p> Width: ${this.x}px</p><p> Height: ${this.y}px</p><p> Radius: ${this.radius}px</p><p> Perimeter: ${this.perimeter}px</p></div>`; 

            $('#rptStatsId').replaceWith(`${divPara}`);
        });

        this.div.addEventListener('dblclick', () => {
            let divPara = `<div id='rptStatsId'></div>`;
            $('#rptStatsId').replaceWith(`${divPara}`);
            $(`#${this.shapeId}`).remove();
        });
    }
}

class Rectangle extends Shape {
    constructor(x, y) {
        super(x, y, numShapes);
    }

    draw() {

        let xwidth = this.x + 'px';
        let yheight = this.y + 'px';
        this.randomPlace();

        this.shapeId = numShapes;
        let div = `<div id="${numShapes}" class="aRec"></div>`;

        $('.canvas').append(`${div}`);

        this.drawShape();
        $(`#${numShapes}`).css({ backgroundColor: 'green'});

        this.desc = 'Rectangle';
        this.radius = 'N/A - ';
    }
}; //end of rectangle

class Square extends Shape {
    constructor(x) {
        let y = x;
        super(x, y, numShapes);
    }

    draw() {

        let xwidth = this.x + 'px';
        let yheight = xwidth;

        this.randomPlace();

        this.shapeId = numShapes;
        let div = `<div id="${numShapes}" class="aSqr"></div>`;

        $('.canvas').append(`${div}`);

        this.drawShape();
        $(`#${numShapes}`).css({ backgroundColor: 'red'});

        this.desc = 'Square';
        this.radius = 'N/A - ';
    }

}; //end of square

class Triangle extends Shape {
    constructor(x) {
        let y = x;
        super(x, y, numShapes);
    }
    draw() {
        let xwidth = this.x + 'px';
        let yheight = xwidth;

        this.randomPlace();

        this.shapeId = numShapes;
        let div = `<div id="${numShapes}" class="aTri">`;

        $('.canvas').append(`${div}`);

        this.drawShape();
        $(`#${numShapes}`).css({ position: 'absolute', width: 0, height: 0, top: this.top, left: this.left});

        this.randomTriangle();
        this.computeTriPerimeter();
        this.computeTriArea();
        this.desc = 'Triangle';
        this.radius = 'N/A - ';
    }

    computeTriArea() {
        this.area = .5 * this.x * this.x;
    }
    computeTriPerimeter() {
        this.perimeter = 2 * this.x + Math.sqrt(2) * this.x;
    }

    randomTriangle() {
        let triType = Math.floor(Math.random() * (4) + 1);
        let xwidth = this.x + 'px';

        if (triType == 1) {
            //top left
            $(`#${numShapes}`).css({ borderTop: `${xwidth} solid yellow`});
            $(`#${numShapes}`).css({ borderRight: `${xwidth} solid transparent`});
        } else if (triType == 2) {
            //top right
            $(`#${numShapes}`).css({ borderTop: `${xwidth} solid yellow`});
            $(`#${numShapes}`).css({ borderLeft: `${xwidth} solid transparent`});
        } else if (triType == 3) {
            //bottom left
            $(`#${numShapes}`).css({ borderBottom: `${xwidth} solid yellow`});
            $(`#${numShapes}`).css({ borderRight: `${xwidth} solid transparent`});
        } else {
            $(`#${numShapes}`).css({ borderBottom: `${xwidth} solid yellow`});
            $(`#${numShapes}`).css({ borderLeft: `${xwidth} solid transparent`});
        }
    }
}; //end of triangle

class Circle extends Shape {
    constructor(radius) {
        let x = radius * 2;
        let y = x;
        super(x, y, numShapes);
        this.radius = radius;
    }

    draw() {
        let theRadius = this.radius + 'px';

        let xwidth = this.x + 'px';
        let yheight = xwidth;

        this.randomPlace();

        this.shapeId = numShapes;
        let div = `<div id='${numShapes}' class='aCircle'></div>`;

        $('.canvas').append(`${div}`);

        this.drawShape();
        $(`#${numShapes}`).css({ borderRadius: theRadius, backgroundColor: 'purple'});

        this.cirPerimeter();
        this.cirArea();

        this.desc = 'Circle';
    }

    cirArea() {
        this.area = Math.PI * this.radius ** 2;
    }

    cirPerimeter() {
        this.perimeter = 2 * Math.PI * this.radius;
    }
}; //end circle class

$('#rectBtn').click(function(e) { //add rectangle
    e.preventDefault();

    let x = $('#recWidth').val();
    let y = $('#recHeight').val();

    let rec = new Rectangle(x, y);

    rec.draw(x, y, numShapes);
    numShapes++
});

$('#squBtn').click(function (e) { //add square
    e.preventDefault();

    let x = $('#sqWidth').val();

    let sqr = new Square(x);

    sqr.draw(x, numShapes);
    numShapes++;
});

let numShapes = 0;

$('#triBtn').click(function(e) { //add triangle
    e.preventDefault();

    let x = $('#triWidth').val();

    let tri = new Triangle(x);

    tri.draw(x, numShapes);
    numShapes++;
});

$('#cirBtn').click(function(e) { //add circle
    e.preventDefault();

    let radius = $('#cirRadius').val();

    let cir = new Circle(radius);

    cir.draw(radius, numShapes);

    numShapes++
});
