var Input = {
    keyboard: {
        up: [],
        down: [],
        now: [],
        list: {
            "LEFT" : 37,
            "RIGHT" : 39,
            "UP" : 38,
            "DOWN" : 40,
            "SPACE" : 32,
            "CTRL" : 17,
            "SHIFT" : 16,
            "ALT" : 18,
            "ESC" : 27,
            "ENTER" : 13,
            "MINUS" : 189,
            "PLUS" : 187,
            "CAPS_LOCK" : 20,
            "BACKSPACE" : 8,
            "TAB" : 9,
            "Q" : 81,
            "W" : 87,
            "E" : 69,
            "R" : 82,
            "T" : 84,
            "Y" : 89,
            "U" : 85,
            "I" : 73,
            "O" : 79,
            "P" : 80,
            "A" : 65,
            "S" : 83,
            "D" : 68,
            "F" : 70,
            "G" : 71,
            "H" : 72,
            "J" : 74,
            "K" : 75,
            "L" : 76,
            "Z" : 90,
            "X" : 88,
            "V" : 86,
            "B" : 66,
            "N" : 78,
            "M" : 77,
            "0" : 48,
            "1" : 49,
            "2" : 50,
            "3" : 51,
            "4" : 52,
            "5" : 53,
            "6" : 54,
            "7" : 55,
            "8" : 56,
            "C" : 67,
            "9" : 57,
            "F1" : 112,
            "F2" : 113,
            "F3" : 114,
            "F4" : 115,
            "F5" : 116,
            "F6" : 117,
            "F7" : 118,
            "F8" : 119,
            "F9" : 120,
            "F10" : 121,
            "F11" : 122,
            "F12" : 123,
            "NUMPAD0": 96,
            "NUMPAD1": 97,
            "NUMPAD2": 98,
            "NUMPAD3": 99,
            "NUMPAD4": 100,
            "NUMPAD5": 101,
            "NUMPAD6": 102,
            "NUMPAD7": 103,
            "NUMPAD8": 104,
            "NUMPAD9": 105,
            "NUMLOCK": 144,
            "NUMPAD_DIVIDE": 111,
            "NUMPAD_MULTIPLY": 106,
            "NUMPAD_SUBSTRACT": 109,
            "NUMPAD_ADD": 107,
            "NUMPAD_ENTER": 13
        },
        ignored: []
    },
    mouse: {
        x: undefined,
        y: undefined,

        down: undefined,
        up: undefined,
        isDown: undefined,
        isUp: undefined,

        isctxdown: undefined,
        isctxup: undefined,
        getctxdown: undefined,
        getctxup: undefined,

        ignore: undefined
    },
    axis: {
        Vertical: {
            value: 0,
            positive: "S",
            negative: "W"
        },
        Horizontal: {
            value: 0,
            positive: "D",
            negative: "A"
        },
        Arrows: {
            value: 0,
            positive: "RIGHT",
            negative: "LEFT"
        }
    },

    getButton: function(button) {
        return this.keyboard.now[this.GetKeyCode(button)];
    },
    getButtonDown: function(button) {
        return this.keyboard.down[this.GetKeyCode(button)];
    },
    getButtonUp: function(button) {
        return this.keyboard.up[this.GetKeyCode(button)];
    },
    getKeyCode: function(code) {
        if (typeof code == "number") return code;
        return this.keyboard.list[code];
    },
    ignoreKeys: function() {
        for (var i in arguments) {
            this.keyboard.ignored.push(this.GetKeyCode(arguments[i]));
        }
    },
    stopIgnoreKeys: function() {
        for (var i in arguments) 
            for (var j in this.keyboard.ignored) {
                if (this.GetKeyCode(this.keyboard.ignored[j]) == this.GetKeyCode(arguments[i])) this.keyboard.ignored.splice(j, 1);
            }
    },

    getMousePosition: function() {
        return {
            x: this.mouse.x,
            y: this.mouse.y
        }
    },
    getMouseButton: function() {
        return this.mouse.isDown;
    },
    getMouseUp: function() {
        return this.mouse.isUp;
    },
    getMouseButtonDown: function() {
        return this.mouse.down;
    },
    getMouseButtonUp: function() {
        return this.mouse.up;
    },
    getCtxMenu: function() {
        return this.mouse.isctxdown;
    },
    getCtxUp: function() {
        return this.mouse.isctxup;
    },
    getCtxMenuDown: function() {
        return this.mouse.getctxdown;
    },
    getCtxMenuUp: function() {
        return this.mouse.getctxup;
    },
    setCursorStyle: function(style) {
        if (style.indexOf(".") !== -1 ||
            style.indexOf("/") !== -1) {
            document.body.style.cursor = "url(" + style + ")";
        } else {
            document.body.style.cursor = style;
        }
    },
    ignoreMouse: function() {
        mouse.ignore = true;       
    },
    stopIgnoreMouse: function() {
        mouse.ignore = false;
    },
    hideCursor: function() {
        this.SetCursorStyle("none");
    },
    unHideCursor: function(style) {
        if (!style) style = "default";

        this.SetCursorStyle(style);
    },

    getAxis: function(name) {
        if (this.axis[name].value) return this.axis[name].value;
    },
    createNewAxis: function(name, positive, negative) {
            this.axis[name] = {
                value: 0,
                positive: positive,
                negative: negative
            }
    },
    removeAxis: function(name) {
        if (this.axis[name]) delete this.axis[name];
    }
}

document.body.addEventListener("keydown", function(e) {

    for (var j in Input.keyboard.ignored) {
        if (Input.keyboard.ignored[j] == e.keyCode) return;
    }

    Input.keyboard.now[e.keyCode] = true;
    Input.keyboard.down[e.keyCode] = true;

    setTimeout(function() {
        Input.keyboard.down[e.keyCode] = false;
    }, 25);

    for (var i in Input.axis) {
        if (e.keyCode == Input.GetKeyCode(Input.axis[i].positive)) Input.axis[i].value = 1;
        if (e.keyCode == Input.GetKeyCode(Input.axis[i].negative)) Input.axis[i].value = -1;
    }
})
document.body.addEventListener("keyup", function(e) {

    for (var j in Input.keyboard.ignored) {
        if (Input.keyboard.ignored[j] == e.keyCode) return;
    }

    Input.keyboard.now[e.keyCode] = false;
    Input.keyboard.down[e.keyCode] = false;
    Input.keyboard.up[e.keyCode] = true;

    setTimeout(function() {
        Input.keyboard.up[e.keyCode] = false;
    }, 25);

    for (var i in Input.axis) {
        if (e.keyCode == Input.GetKeyCode(Input.axis[i].positive) || e.keyCode == Input.GetKeyCode(Input.axis[i].negative)) Input.axis[i].value = 0;
    }
})
document.body.addEventListener("mousemove", function(e) {

    if (Input.mouse.ignore) return;

    Input.mouse.x = e.clientX;
    Input.mouse.y = e.clientY;
})
document.body.addEventListener("mousedown", function(e) {

    if (Input.mouse.ignore) return;

    if (e.which == 3) {
        Input.mouse.isctxup = false;
        Input.mouse.isctxdown = true;

        Input.mouse.getctxdown = true;

        setTimeout(function() {
            Input.mouse.getctxdown = false;
        }, 25)
    }

    Input.mouse.isDown = true;
    Input.mouse.isUp = false;

    Input.mouse.down = true;

    setTimeout(function() {
        Input.mouse.down = false;
    }, 25)
})
document.body.addEventListener("mouseup", function(e) {

    if (Input.mouse.ignore) return;

    if (e.which == 3) {
        Input.mouse.isctxdown = false;
        Input.mouse.isctxup = true;

        Input.mouse.getctxup = true;

        setTimeout(function() {
            Input.mouse.getctxup = false;
        }, 25)
    }

    Input.mouse.isDown = false;
    Input.mouse.isUp = true;

    Input.mouse.up = true;

    setTimeout(function() {
        Input.mouse.up = false;
    }, 25)
})
