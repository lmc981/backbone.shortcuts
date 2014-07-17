(function(){
    var keys = {
    	"8" : "Backspace",
    	"9" : "Tab",
    	"13" : "Enter",
    	"27" : "Esc",
    	"37" : "LeftArrow",
    	"38" : "UpArrow",
    	"39" : "RightArrow",
    	"40" : "DownArrow",
    	"48" : "0",
    	"49" : "1",
    	"50" : "2",
    	"51" : "3",
    	"52" : "4",
    	"53" : "5",
    	"54" : "6",
    	"55" : "7",
    	"56" : "8",
    	"57" : "9",
    	"65" : "A",
    	"66" : "B",
    	"67" : "C",
    	"68" : "D",
    	"69" : "E",
    	"70" : "F",
    	"71" : "G",
    	"72" : "H",
    	"73" : "I",
    	"74" : "J",
    	"75" : "K",
    	"76" : "L",
    	"77" : "M",
    	"78" : "N",
    	"79" : "O",
    	"80" : "P",
    	"81" : "Q",
    	"82" : "R",
    	"83" : "S",
    	"84" : "T",
    	"85" : "U",
    	"86" : "V",
    	"87" : "W",
    	"88" : "X",
    	"89" : "Y",
    	"90" : "Z",
    	"112" : "F1" ,
    	"113" : "F2" ,
    	"114" : "F3" ,
    	"115" : "F4" ,
    	"116" : "F5" ,
    	"117" : "F6" ,
    	"118" : "F7" ,
    	"119" : "F8" ,
    	"120" : "F9" ,
    	"121" : "F10",
    	"122" : "F11",
    	"123" : "F12"
    }

    var modifiers = {
        "ctrl" : "Ctrl",
        "alt" : "Alt",
        "shift" : "Shift"
    }

    // on(?:Ctrl|Alt|Shift){0,3}(?:Backspace|Tab|Enter|Esc|LeftArrow|UpArrow|RightArrow|DownArrow|0|1|2|3|4|5|6|7|8|9|A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z|F1|F2|F3|F4|F5|F6|F7|F8|F9|F10|F11|F12)$
    var shortcutDetector = new RegExp('on(?:' + _.values(modifiers).join('|') + '){0,3}(?:' + _.values(keys).join('|') + ')$');

    var getEventName = function(key, ctrl, alt, shift){
		var ret = 'on';
		if (ctrl) ret += modifiers.ctrl;
		if (alt) ret += modifiers.alt;
        if (shift) ret += modifiers.shift;
		ret += keys[key];
		return ret;
	}

    $(document).keyup(function(e) {
        var keycode, alt, ctrl, shift, eventName;
        if (window.event)
            keycode = window.event.keyCode;
        else if (e)
            keycode = e.which;
        alt = window.event.altKey;
        ctrl = window.event.ctrlKey;
        shift = window.event.shiftKey
        eventName = getEventName(keycode, ctrl, alt, shift);
        $(document).trigger(eventName);
    });

    _.extend(Backbone.View.prototype, {
        delegateEvents: function(events) {
            var delegateEventSplitter = /^(\S+)\s*(.*)$/;
            if (!(events || (events = _.result(this, 'events')))) return this;
            this.undelegateEvents();
            for (var key in events) {
                var method = events[key];
                if (!_.isFunction(method)) method = this[events[key]];
                if (!method) continue;
                var match = key.match(delegateEventSplitter);
                var eventName = match[1], selector = match[2];
                if (shortcutDetector.test(eventName)){
                    $(document).bind(eventName, method);
                    return this;
                }
                method = _.bind(method, this);
                eventName += '.delegateEvents' + this.cid;
                if (selector === '') {
                    this.$el.on(eventName, method);
                } else {
                    this.$el.on(eventName, selector, method);
                }
            }
            return this;
        }
    });
})();
