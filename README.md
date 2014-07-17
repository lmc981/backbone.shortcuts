# Backbone.Shortcuts

Backbone.Shortcuts is a simple library that adds shortcut management to backbone

## Downloads

  * [Development Version](https://raw.github.com/lmc981/backbone.shortcuts/master/backbone.shortcuts.js) 3.262 kb
  * [Production Version](https://raw.github.com/lmc981/backbone.shortcuts/master/backbone.shortcuts.min.js) 1.357 kb

## Dependencies

Just the backbone dependencies

## Usage

Load the script

```html
<script src="backbone.shortcuts.min.js"></script>
```
Just define a new event with the sintax below,
just note that he modifiers must comply with their priority (`Ctrl`, `Alt`, `Shift`):

```javascript
var aView = Backbone.View.extend({
    events : {
        "onCtrlAltE" : function(){
            alert("Ctrl + Alt + E");
        },
        "onAltO" : function(){
            alert("Alt + O");
        },
        "onF5" : function(){
            alert("F5");
        },
        "onAltShiftR" : function(){
            alert("Alt + Shift + R");
        }
});
```

## Supported keys

Supports:
* modifiers `Ctrl`, `Alt`, `Shift`
* keys `[A-Z0-9]`
* function keys `F1` through `F12`
* `Enter`, `Esc`, `UpArrow`, `DownArrow`, `LeftArrow`, `RightArrow`, `Tab`, `Backspace`


## Author

LMC
