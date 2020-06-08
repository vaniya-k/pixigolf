const app = new PIXI.Application({ backgroundColor: 0x75f542 });
document.body.appendChild(app.view);

const ballSource = PIXI.Texture.from('assets/circle.png');
const flagSource = PIXI.Texture.from('assets/flag.png');
const reedsSource = PIXI.Texture.from('assets/reeds.png');

const firstFlagXY = [null, null];
const secondFlagXY = [null, null];

drawStaticSprite(5, 5, ballSource);
drawStaticSprite(660, 450, reedsSource);
createFirstFlag(400, 200);
createSecondFlag(200, 400);
drawBezier();

function drawStaticSprite(x, y, source) {
    const item = new PIXI.Sprite(source);
    item.x = x;
    item.y = y;
    app.stage.addChild(item);
}

function createFirstFlag(x, y) {
    const flag = new PIXI.Sprite(flagSource);

    flag.interactive = true;
    flag.buttonMode = true;

    flag
        .on('pointerdown', onDragStart)
        .on('pointerup', updateFirstFlagXY)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', updateFirstFlagXY)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', updateDragXY);

    flag.x = x;
    flag.y = y;

    firstFlagXY[0] = x;
    firstFlagXY[1] = y;

    app.stage.addChild(flag);
};

function createSecondFlag(x, y) {
    const flag = new PIXI.Sprite(flagSource);

    flag.interactive = true;
    flag.buttonMode = true;

    flag
        .on('pointerdown', onDragStart)
        .on('pointerup', updateSecondFlagXY)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', updateSecondFlagXY)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', updateDragXY);

    flag.x = x;
    flag.y = y;

    secondFlagXY[0] = x;
    secondFlagXY[1] = y;

    app.stage.addChild(flag);
};

function onDragStart(event) {
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
};

function onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    this.data = null;
    drawBezier();
};

function updateDragXY() {
    if (this.dragging) {
        const newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;
    }
};

function updateSecondFlagXY() {
    secondFlagXY[0] = this.x;
    secondFlagXY[1] = this.y;
};

function updateFirstFlagXY() {
    firstFlagXY[0] = this.x;
    firstFlagXY[1] = this.y;
};

function drawBezier() {
    if(app.stage.children.length === 5) {
        app.stage.removeChildAt(4);
    }

    const bezier = new PIXI.Graphics();

    bezier.lineStyle(4, 0xAA0000, 0.3);
    bezier.bezierCurveTo(firstFlagXY[0], firstFlagXY[1], secondFlagXY[0], secondFlagXY[1], 711, 545);

    bezier.position.x = 15;
    bezier.position.y = 15;

    app.stage.addChild(bezier);
};

