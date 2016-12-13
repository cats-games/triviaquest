// https://github.com/unstoppablecarl/escape-from-ecma-labs/blob/gh-pages/js/item.js

(function(root) {
    'use strict';

    /**
    * Represents an item in the game map.
    * @class Item
    * @constructor
    * @param {Object} game - Game instance this obj is attached to.
    * @param {String} type - Type of tile. When created this object is merged with the value of Item.Types[type].
    * @param {Number} x - The map tile coordinate position of this tile on the x axis.
    * @param {Number} y - The map tile coordinate position of this tile on the y axis.
    */
    var Item = function Item(game, type, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.type = type;

        var typeData = Item.Types[type];
        RL.Util.merge(this, typeData);
    };

    Item.prototype = {
        constructor: Item,

        /**
        * Game instance this obj is attached to.
        * @property game
        * @type Game
        */
        game: null,

        /**
        * The type of entity this is.
        * When created this object is merged with the value of Item.Types[type].
        * @property type
        * @type Object
        */
        type: null,

        /**
        * Display name for this item.
        * @property name
        * @type {String}
        */
        name: null,

        /**
        * The tile map coordinate position on the x axis.
        * @property x
        * @type Number
        */
        x: null,

        /**
        * The tile map coordinate position on the y axis.
        * @property y
        * @type Number
        */
        y: null,

        /**
        * The character displayed when rendering this tile.
        * @property char
        * @type String
        */
        char: null,

        /**
        * The color of the character displayed when rendering this tile. Not rendered if false.
        * @property color
        * @type String|bool
        */
        color: null,

        /**
        * The background color the character displayed when rendering this tile. Not rendered if false.
        * @property bgColor
        * @type String|bool
        */
        bgColor: false,
        charStrokeColor: '#000',
        charStrokeWidth: 2,
        // consoleColor: RL.Util.COLORS.blue_alt,

        /**
         * Checks if this item can be attached to an entity.
         * @method canAttachTo
         * @param {Entity} entity
         * @return {Bool}
         */
        canAttachTo: function(entity){

        },

        /**
         * Resolves the effects of attaching this item to an entity.
         * @method attachTo
         * @param {Entity} entity
         */
        attachTo: function(entity){
            this.game.console.logPickUp(entity, this);
        },

        getConsoleName: function(){
            return {
                name: this.name,
                color: this.consoleColor
            };
        },
    };


    var Defaults = {
        healing: {
            consoleColor: 'pink',
            canAttachTo: function(entity){
                if(this.game.player !== entity){
                    return false;
                }
                if(entity.hp >= entity.hpMax){
                    this.game.console.logCanNotPickupHealing(entity, this);
                    return false;
                }
                return true;
            },
            attachTo: function(entity){
                this.game.console.logPickUpHealing(entity, this);
                entity.heal(this.healAmount);
            },
            getConsoleName: function(){
                return {
                    name: this.name + ' [+' + this.healAmount + ' HP]',
                    color: this.consoleColor
                };
            }
        },
        meleeWeapon: {
            canAttachTo: function(entity){
                if(this.game.player !== entity){
                    return false;
                }
                if(this.damage < entity.meleeWeapon.damage){
                    this.game.console.logCanNotPickupWeapon(entity, entity.meleeWeapon, this);
                    return false;
                }
                return true;
            },
            attachTo: function(entity){
                Item.prototype.attachTo.call(this, entity);
                entity.meleeWeapon = this;
            },
            getConsoleName: function(){
                return {
                    name: this.name,
                    stats: '[Damage: ' + this.damage + ']',
                    color: this.consoleColor
                };
            }
        },
        rangedWeapon: {
            canAttachTo: function(entity){
                if(this.game.player !== entity){
                    return false;
                }
                if(this.damage < entity.rangedWeapon.damage){
                    this.game.console.logCanNotPickupWeapon(entity, entity.rangedWeapon, this);
                    return false;
                }
                return true;
            },
            attachTo: function(entity){
                Item.prototype.attachTo.call(this, entity);
                entity.rangedWeapon = this;
            },
            getConsoleName: function(){
                return {
                    name: this.name,
                    stats: '[Damage: ' + this.damage + ', Range: ' + this.range + ']',
                    color: this.consoleColor
                };
            }
        }
    };

    RL.Util.merge(Item.prototype, RL.Mixins.TileDraw);


    var makeHealingItem = function(obj){
        return RL.Util.merge(obj, Defaults.healing);
    };

    var makeMeleeWeapon = function(obj){
        return RL.Util.merge(obj, Defaults.meleeWeapon);
    };

    var makeRangedWeapon = function(obj){
        return RL.Util.merge(obj, Defaults.rangedWeapon);
    };

    /**
    * Describes different types of tiles. Used by the Item constructor 'type' param.
    *
    *     Item.Types = {
    *         floor: {
    *            name: 'Floor',
    *            char: '.',
    *            color: '#333',
    *            bgColor: '#111',
    *            blocksLos: false
    *         },
    *         // ...
    *     }
    *
    * @class Item.Types
    * @static
    */
    Item.Types = {

        // healing items
        potion: makeHealingItem({
            name: 'Potion',
            color: '#fff',
            bgColor: false,
            char: ":",
            healAmount: 20,
        })
    };


    root.RL.Item = Item;

}(this));