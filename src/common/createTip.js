class createTip {
  constructor() {
    this.longer = 0;
    this.target = null;
    this.exist = false;
    this.winEvent = window.event;
    this.boxHeight = 108;
    this.boxWidth = 376;
    this.maxWidth = 376;
    this.maxHeight = 398;
    this.tooltip = null;
    this.showTime = 3500;
    this.hoverTime = 300;
    this.displayText = "";
  }

  show(val, e) {
    "use strict";
    let me = this;
    if (e != null) {
      me.winEvent = e;
    }
    me.displayText = val;
    me.calculateBoxAndShow();

    me.createTimer();
  }

  calculateBoxAndShow() {
    "use strict";
    let me = this;
    let _x = 0;
    let _y = 0;
    let _w = document.documentElement.scrollWidth;
    let _h = document.documentElement.scrollHeight;
    let wScrollX = window.scrollX || document.body.scrollLeft;
    let wScrollY = window.scrollY || document.body.scrollTop;
    let xMouse = me.winEvent.x + wScrollX;
    if (_w - xMouse < me.boxWidth) {
      _x = xMouse - me.boxWidth - 10;
    } else {
      _x = xMouse;
    }

    let _yMouse = me.winEvent.y + wScrollY;
    if (_h - _yMouse < me.boxHeight + 18) {
      _y = _yMouse - me.boxHeight - 25;
    } else {

      _y = _yMouse + 18;
    }
    me.addTooltip(_x, _y);
  }

  addTooltip(page_x, page_y) {
    "use strict";
    let me = this;
    me.tooltip = document.createElement("div");
    me.tooltip.style.left = page_x + "px";
    me.tooltip.style.top = page_y + "px";
    me.tooltip.style.position = "absolute";

    me.tooltip.style.width = me.boxWidth + "px";
    me.tooltip.style.height = me.boxHeight + "px";
    me.tooltip.className = "three-tooltip";

    let divInnerHeader = me.createInner();
    divInnerHeader.innerHTML = me.displayText;
    me.tooltip.appendChild(divInnerHeader);
    document.body.appendChild(me.tooltip);
  }

  createInner() {
    "use strict";
    let me = this;
    let divInnerHeader = document.createElement('div');
    divInnerHeader.style.width = me.boxWidth + "px";
    divInnerHeader.style.height = me.boxHeight + "px";
    return divInnerHeader;
  }

  ClearDiv() {
    "use strict";
    let delDiv = document.body.getElementsByClassName("three-tooltip");
    for (let i = delDiv.length - 1; i >= 0; i--) {
      document.body.removeChild(delDiv[i]);
    }
  }

  createTimer(delTarget) {
    "use strict";
    let me = this;
    let delTip = me.tooltip;
    delTarget = me.target;
    let removeTimer = window.setTimeout(function () {
      try {
        if (delTip != null) {
          document.body.removeChild(delTip);
          if (me.target == delTarget) {
            me.exist = false;
          }
        }
        clearTimeout(removeTimer);
      } catch (e) {
        clearTimeout(removeTimer);
      }
    }, me.showTime);
  }

  hoverTimerFn(showTip, showTarget) {
    "use strict";
    let me = this;
    showTarget = me.target;
    let hoverTimer = window.setInterval(function () {
      try {
        if (me.target != showTarget) {
          clearInterval(hoverTimer);
        } else if (!me.exist && (new Date()).getTime() - me.longer > me.hoverTime) {
          //show
          me.show(showTip);
          me.exist = true;
          clearInterval(hoverTimer);
        }
      } catch (e) {
        clearInterval(hoverTimer);
      }
    }, me.hoverTime);
  }
}
export default  new createTip()