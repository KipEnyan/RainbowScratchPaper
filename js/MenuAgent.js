/**
 * Creates an instance of MenuAgent. The agent manipulates already-existing 
 * HTML objects in the #menus element and modifies the body's .className to be
 * .mobile, .tablet, or .desktop depending on device type and screen 
 * resolution.
 * 
 * @constructor
 * @this {MenuAgent}
 */
function MenuAgent() {
    this.sourceDir = location.href.slice(0, location.href.lastIndexOf("/"));
    this.parent = document.body;
    
    // http://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
    this.agent = navigator.userAgent || navigator.vendor || window.opera;
    this.isMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(this.agent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(this.agent.substr(0, 4));
    
    this.checkMobile();
    this.getElements();
    this.setButtonEffects();
    
    this.toggleMenuClasses("menu-contracted", "menu-expanded");
    
    window.addEventListener("resize", this.checkMobile.bind(this));
}

/**
 * Hides the #menus container by giving it a .hidden className.
 * 
 * @this {MenuAgent}
 */
MenuAgent.prototype.hide = function () {
    this.container.className += " hidden";
};

/**
 * Shows the #menus container by removing the .hidden className.
 * 
 * @this {MenuAgent}
 */
MenuAgent.prototype.show = function () {
    this.container.className = this.container.className.replace(" hidden", "");
};

/**
 * Callback for when the page loads or the screen resizes. A set of rules for
 * determining optimal display is followed, generally giving larger / more
 * horizontal screens desktop, and smaller / more vertical screens mobile. The
 * outcome is reflected in the parent .className (which is normally the body).
 * 
 * @this {MenuAgent}
 */
MenuAgent.prototype.checkMobile = function () {
    // // Extremely skinny (<=350px or 1x2) windows are always mobile
    // if(innerWidth <= 350 || innerHeight > innerWidth * 2) {
        // this.parent.className = "mobile";
        // return;
    // }
    
    // // Extremely wide (2x1) windows are always desktop
    // if(innerWidth > innerHeight * 2) {
        // this.parent.className = "desktop";
        // return;
    // }
    
    // Mobile detected is either tablet or mobile, depending on orientation
    if(this.isMobile) {
        if(innerWidth > innerHeight) {
            this.parent.className = "tablet";
        } else {
            this.parent.className = "mobile";
        }
        return;
    }
    
    // Windows that are otherwise <= 560px should be tablet
    if(innerWidth < 560) {
        this.parent.className = "tablet";
        return;
    }
    
    // By default, everything else is desktop
    this.parent.className = "desktop";
};

/** 
 * Stores the required HTML elements as member variables. Also calls
 * this.getButtonsKeyed so they can be referenced by String id.
 * 
 * @this {MenuAgent}
 */
MenuAgent.prototype.getElements = function () {
    this.container = this.parent.querySelector("#menus");
    
    this.help = this.parent.querySelector("#help"),
    this.helpHead = this.help.querySelector("h1"),
    this.helpParagraph = this.help.querySelector("p"); 
    
    this.heads = this.parent.querySelectorAll(".menu h1");
    
    this.buttons = this.parent.querySelectorAll(".menu input[type=button]");
    
    this.buttonsKeyed = this.getButtonsKeyed();
    
    this.menuManualHide = this.parent.querySelector(".menu #mobile-exit");
};

/**
 * Converts the NodeList of button elements to an Object keying them by their
 * element ID.
 * 
 * @this {MenuAgent}
 * @return {Object}
 */
MenuAgent.prototype.getButtonsKeyed = function () {
    var output = {},
        i;
    
    for(i = 0; i < this.buttons.length; i += 1) {
        output[this.buttons[i].id] = this.buttons[i];
    }
    
    return output;
};

/**
 * Sets the interactive events for each button element. This involves having
 * their help content displayed and having their background images set.
 * 
 * @this {MenuAgent}
 */
MenuAgent.prototype.setButtonEffects = function () {
        /**
         * Generic callback for each button's onMouseOver. The button's help
         * content is displayed instead of the normal help blurb, such that
         * the first sentence is the title and the rest the body.
         * 
         * @this {MenuAgent}
         * @param {MouseEvent} event
         */
    var buttonMouseOver = (function (event) {
            var button = event.target,
                information = button.getAttribute("alt").split(/\.(.+)?/);
            
            this.helpHead.innerHTML = information[0];
            this.helpParagraph.innerHTML = information[1];
        }).bind(this),
        /**
         * Generic callback for each button's onMouseOut. The help section's
         * original content is displayed instead of the button's. 
         * 
         * @this {MenuAgent}
         * @param {MouseEvent} event
         * @remarks   This should be bound to setTimeout with a delay, so if 
         *            the user moves the mouse between non-touching icons there
         *            isn't a flicker between buttons.
         */
        buttonMouseOut = (function (event) {
            var button = event.target,
                information = button.getAttribute("alt").split(/\.(.+)?/);
            
            if(this.helpHead.innerHTML !== information[0]) {
                return;
            }
            
            this.helpHead.innerHTML = this.helpHead.getAttribute("alt");
            this.helpParagraph.innerHTML = this.helpParagraph.getAttribute("alt");
        }).bind(this),
        button, i;
    
    // Store the original content of the help elements as the alt version
    this.helpHead.setAttribute("alt", this.helpHead.innerHTML);
    this.helpParagraph.setAttribute("alt", this.helpParagraph.innerHTML);
    
    // Give each button the MouseOver and MouseOut attributes
    for(i = 0; i < this.buttons.length; i += 1) {
        button = this.buttons[i];
        
        button.onmouseover = buttonMouseOver;
        button.onmouseout = setTimeout.bind(window, buttonMouseOut, 140);
        
        button.style.backgroundImage = "url('"
            + this.sourceDir + "/assets/buttons/" + button.id + ".png')";
    }
    
    // The manual mobile closer is manual.
    this.menuManualHide.onclick = this.helpHead.click.bind(this.helpHead);
};

/**
 * Switches the menus between classes, and binds their head element's to a call
 * to the classes in reverse order. 
 * 
 * @this {MenuAgent}
 * @param {String} classOld
 * @param {String} classNew
 * @param {MouseEvent/TouchEvent} event
 * @remarks   Typically the classes will be "menu-contracted" and 
 *            "menu-expanded" in either order.
 */
MenuAgent.prototype.toggleMenuClasses = function (classOld, classNew, event) {
    var head, menu, i;
    
    for(i = 0; i < this.heads.length; i += 1) {
        head = this.heads[i];
        
        menu = head.parentElement;
        menu.className = menu.className.replace(classOld, classNew);
        
        head.onclick = this.toggleMenuClasses.bind(this, classNew, classOld);
    }
    
    if(event) {
        event.preventDefault();
        event.stopPropagation();
    }
};

/**
 * Sets the callbacks for "action"-style buttons (such as saving), where 
 * clicking a button has no affect on any other buttons. Callbacks are 
 * afterwords triggered by button onClicks.
 * 
 * @this {MenuAgent}
 * @param {Object} callbacks   An Object keying String button IDs to their
 *                             Function callbacks.
 */
MenuAgent.prototype.setButtonActionCallbacks = function (callbacks) {
    var button, i;
    
    for(i in callbacks) {
        if(!callbacks.hasOwnProperty(i)) {
            continue;
        }
        
        button = this.buttonsKeyed[i];
        button.onclick = button.ontouchstart = this.callButtonAction.bind(
            this, button, callbacks[i]
        );
    }
};

/**
 * Sets the callbacks for "status"-style buttons (such as brush size), where
 * enabling one disables all its siblings. Callbacks are afterwords triggered
 * by button onClicks.
 * 
 * @this {MenuAgent}
 * @param {Object} callbacks   An Object keying String button IDs to their
 *                             Function callbacks.
 */
MenuAgent.prototype.setButtonStatusCallbacks = function (callbacks) {
    var button, i;
    
    for(i in callbacks) {
        if(!callbacks.hasOwnProperty(i)) {
            continue;
        }
        
        button = this.buttonsKeyed[i];
        button.onclick = this.setButtonActive.bind(
            this, button, callbacks[i]
        );
    }
};

/**
 * Utility Function to visually deactivate a button's siblings and give it an
 * active .className. The callback Function is then called.
 * 
 * @this {MenuAgent}
 * @param {HTMLElement} button
 * @param {Function} callback
 * @param {MouseEvent/TouchEvent}} event
 */
MenuAgent.prototype.setButtonActive = function (button, callback, event) {
    var parent = button.parentElement,
        i;
    
    for(i = 0; i < parent.children.length; i += 1) {
        parent.children[i].className = parent.children[i].className.replace(" active", "");
    }
    button.className += " active";
    
    this.callButtonAction(button, callback, event);
};

/**
 * Utility Function to simply call a button's action. If an event is provided,
 * it has preventDefault() and stopPropagation() called.
 * 
 * @this {MenuAgent}
 * @param {HTMLElement} button
 * @param {Function} callback
 * @param {MouseEvent/TouchEvent}} event
 */
MenuAgent.prototype.callButtonAction = function (button, callback, event) {
    callback(event);
    if(event) {
        event.preventDefault();
        event.stopPropagation();
    }
};