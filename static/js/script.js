const OFFSET_X = window.innerWidth;
const OFFSET_Y = window.innerHeight;
const LADO_QUADRADO = OFFSET_Y/6;
let img1;
let img2;
let theta = 0;
let valor = 0.2;
function setup() {
    createCanvas(OFFSET_X, OFFSET_Y, WEBGL);
    img1 = loadImage('/static/img.jpeg');
    img2 = loadImage('/static/img2.jpg');
}
function change_image() {
    if (theta > 20) {
        texture(img2);
    }
    else {
        texture(img1);
    }
    if (theta > 40 || theta < 0) {
        valor = - valor;
    }
    theta += valor;
}

function draw() {
    background("#c6dff9");
    push();
    rotateZ(theta * 0.1);
    rotateX(theta * 0.1);
    rotateY(theta * 0.1);
    change_image();
    box(LADO_QUADRADO, LADO_QUADRADO, LADO_QUADRADO);
    pop();
}

function render() {
    var txin = $('#txin').val();
    var txout = svc_latex_render(txin);
    $('#txout').html(txout);
}
function svc_latex_render(str) {
    var textIn = str;
    if (str != null && str != undefined && str != '') {
        var textOut = textIn; // prepara string de saída
        textOut = textOut.replace(/(?:\r\n|\r|\n)/g, '<br>'); // substitui quebras de linha por <br>
        if (textIn.match(/\[latex\].*?\[\/latex\]/g)) {
            textIn.match(/\[latex\].*?\[\/latex\]/g).forEach((element) => { // faz loop nos matches []
                element = element.replace('[latex]', '');
                element = element.replace('[/latex]', '');
                var newElement = katex.renderToString(element, { throwOnError: false }); // renderiza cada elemento [] encontrado
                textOut = textOut.replace('[latex]' + element + '[/latex]', newElement); // substitui no string de saída
            });
        }
        textOut = textOut.replace(/\[code\]/g, '<pre>'); // substitui [code] por <pre>
        textOut = textOut.replace(/\[\/code\]/g, '</pre>'); // substitui [/code] por </pre>
    }
    return textOut;
}