//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.factor = 1;
        _this.canvasW = 600;
        _this.canvasH = 600;
        _this.ROLL_RADIUS = 100;
        _this.ROLL_CENTER_X = 300;
        _this.rollArr1 = [];
        _this.rollArr2 = [];
        _this.rollArr3 = [];
        _this.rollArr4 = [];
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            context.onUpdate = function () {
            };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, RES.getResAsync("description_json")
                            // this.startAnimation(result);
                        ];
                    case 2:
                        result = _a.sent();
                        // this.startAnimation(result);
                        return [4 /*yield*/, platform.login()];
                    case 3:
                        // this.startAnimation(result);
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 4:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 2:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        var _this = this;
        this.world = new p2.World();
        this.world.gravity = [0, 10];
        this.world.defaultContactMaterial.friction = 0;
        this.world.defaultContactMaterial.frictionRelaxation = 0;
        this.world.defaultContactMaterial.frictionStuffness = 0;
        // this.world.defaultContactMaterial.stiffness = 0;
        this.world.defaultContactMaterial.restitution = 0;
        this.world.defaultContactMaterial.surfaceVelocity = 0;
        this.world.applyDamping = false;
        // var ballMaterial = new p2.Material(1);
        // var roadMaterial = new p2.Material(0);
        // var materialOpt: p2.ContactMaterialOptions = new p2.ContactMaterialOptions();
        // materialOpt.restitution = 0; // 设置反弹系数
        // materialOpt.friction = 0; // 设置摩擦系数
        // var ballRoadContactMaterial = new p2.ContactMaterial(ballMaterial, roadMaterial, <p2.ContactMaterialOptions>{friction: 100});
        // this.world.addContactMaterial(ballRoadContactMaterial);
        var floorShape = new p2.Box({ width: 1000 / this.factor, height: 10 / this.factor });
        var floorBody = new p2.Body({ mass: 0 });
        floorBody.position = [this.canvasW / 4 / this.factor, (this.canvasH + 15) / this.factor];
        // floorShape.material = roadMaterial;
        floorBody.addShape(floorShape);
        this.world.addBody(floorBody);
        var ballShape = new p2.Circle({ radius: 10 / this.factor });
        this.ballBody = new p2.Body({
            mass: 1
        });
        this.ballBody.position = [0 / this.factor, 600 / this.factor];
        // this.ballBody.damping = 0;
        // this.ballBody.angularDamping = 0;
        // ballShape.material = ballMaterial;
        this.ballBody.addShape(ballShape);
        this.ballBody.velocity = [300, 0];
        this.ballBody.applyDamping(0);
        this.world.addBody(this.ballBody);
        for (var x = this.ROLL_CENTER_X; x <= this.ROLL_CENTER_X + this.ROLL_RADIUS; x++) {
            var _a = this.calcY(x), y1 = _a.y1, y2 = _a.y2;
            this.rollArr1.push([x, y1]);
            this.rollArr2.push([x, y2]);
        }
        for (var x = this.ROLL_CENTER_X - this.ROLL_RADIUS; x <= this.ROLL_CENTER_X; x++) {
            var _b = this.calcY(x), y1 = _b.y1, y2 = _b.y2;
            this.rollArr3.push([x, y2]);
            this.rollArr4.push([x, y1]);
        }
        // this.rollArr2.reverse();
        // this.rollArr2.shift();
        // var path = [...this.rollArr1, ...this.rollArr2, [300, 300], [500, 300], [500, 600]];
        // var path = [[300, 600], [400, 500], [300, 500], [500, 500], [500, 600]]
        var path1 = this.rollArr1.concat([[500, 500], [500, 600]]);
        path1 = path1.map(function (item) { return [item[0] / _this.factor, item[1] / _this.factor]; });
        var path2 = this.rollArr2.concat([[500, 500], [500, 400]]);
        path2 = path2.map(function (item) { return [item[0] / _this.factor, item[1] / _this.factor]; });
        var path3 = this.rollArr3.concat([[100, 400], [100, 500]]);
        path3 = path3.map(function (item) { return [item[0] / _this.factor, item[1] / _this.factor]; });
        var path4 = this.rollArr4.concat([[100, 600], [100, 500]]);
        path4 = path4.map(function (item) { return [item[0] / _this.factor, item[1] / _this.factor]; });
        this.rollBody1 = new p2.Body({ mass: 0 });
        this.rollBody1.fromPolygon(path1);
        // optimalDecomp=false：是否进行最佳分解，默认false，开启该选项会降低计算速度 
        // skipSimpleCheck=false：是否进行顶点交叉的判断，如果确定不存在交叉点可设为true 
        // removeCollinearPoints=false：是否剔除共线顶点，false表示不剔除 
        this.rollBody1.position = [400, 565];
        // this.rollBody1.applyDamping(0);        
        this.world.addBody(this.rollBody1);
        this.rollBody2 = new p2.Body({ mass: 0 });
        this.rollBody2.fromPolygon(path2);
        this.rollBody2.position = [400, 465];
        // this.rollBody2.applyDamping(0);                
        this.world.addBody(this.rollBody2);
        this.rollBody3 = new p2.Body({ mass: 0 });
        this.rollBody3.fromPolygon(path3);
        this.rollBody3.position = [135, 465];
        // this.rollBody3.applyDamping(0);
        this.world.addBody(this.rollBody3);
        this.rollBody4 = new p2.Body({ mass: 0 });
        this.rollBody4.fromPolygon(path4);
        this.rollBody4.position = [135, 565];
        this.rollBody4.collisionResponse = false;
        // this.rollBody4.applyDamping(0);
        this.world.addBody(this.rollBody4);
        // new p2.LockConstraint(floorBody, this.ballBody, {maxForce: 10000});
        // new p2.LockConstraint(this.rollBody1, this.ballBody, {maxForce: 10000});
        // new p2.LockConstraint(this.rollBody2, this.ballBody, {maxForce: 10000});
        // new p2.LockConstraint(this.rollBody3, this.ballBody, {maxForce: 10000});
        // new p2.LockConstraint(this.rollBody4, this.ballBody, {maxForce: 10000});
        // var constraint = new p2.LockConstraint(floorBody, this.ballBody);
        // var constraint1 = new p2.LockConstraint(this.rollBody1, this.ballBody);
        // var constraint2 = new p2.LockConstraint(this.rollBody2, this.ballBody);
        // var constraint3 = new p2.LockConstraint(this.rollBody3, this.ballBody);
        // var constraint4 = new p2.LockConstraint(this.rollBody4, this.ballBody);
        // this.world.addConstraint(constraint);
        // this.world.addConstraint(constraint1);
        // this.world.addConstraint(constraint2);
        // this.world.addConstraint(constraint3);
        // this.world.addConstraint(constraint4);
        // var triangleShape: p2.Convex = new p2.Convex({vertices:[[-1,-1],[1,-1],[1,1],[-1,-1]]});
        // var body: p2.Body = new p2.Body({ mass: 1,position:[100/this.factor,100/this.factor] });
        // body.addShape(triangleShape);
        // this.world.addBody(body);
        var sprite = new egret.Sprite();
        this.addChild(sprite);
        this.debugDraw = new p2DebugDraw(this.world);
        this.debugDraw.setSprite(sprite);
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
        // let sky = this.createBitmapByName("bg_jpg");
        // this.addChild(sky);
        // let stageW = this.stage.stageWidth;
        // let stageH = this.stage.stageHeight;
        // sky.width = stageW;
        // sky.height = stageH;
        // let topMask = new egret.Shape();
        // topMask.graphics.beginFill(0x000000, 0.5);
        // topMask.graphics.drawRect(0, 0, stageW, 172);
        // topMask.graphics.endFill();
        // topMask.y = 33;
        // this.addChild(topMask);
        // let icon = this.createBitmapByName("egret_icon_png");
        // this.addChild(icon);
        // icon.x = 26;
        // icon.y = 33;
        // let line = new egret.Shape();
        // line.graphics.lineStyle(2, 0xffffff);
        // line.graphics.moveTo(0, 0);
        // line.graphics.lineTo(0, 117);
        // line.graphics.endFill();
        // line.x = 172;
        // line.y = 61;
        // this.addChild(line);
        // let colorLabel = new egret.TextField();
        // colorLabel.textColor = 0xffffff;
        // colorLabel.width = stageW - 172;
        // colorLabel.textAlign = "center";
        // colorLabel.text = "Hello Egret";
        // colorLabel.size = 24;
        // colorLabel.x = 172;
        // colorLabel.y = 80;
        // this.addChild(colorLabel);
        // let textfield = new egret.TextField();
        // this.addChild(textfield);
        // textfield.alpha = 0;
        // textfield.width = stageW - 172;
        // textfield.textAlign = egret.HorizontalAlign.CENTER;
        // textfield.size = 24;
        // textfield.textColor = 0xffffff;
        // textfield.x = 172;
        // textfield.y = 135;
        // this.textfield = textfield;
    };
    Main.prototype.loop = function () {
        this.world.step(1 / 60);
        if (250 / this.factor < this.ballBody.position[0] &&
            this.ballBody.position[0] < 300 / this.factor &&
            400 / this.factor < this.ballBody.position[1] &&
            this.ballBody.position[1] < 450 / this.factor) {
            this.rollBody1.collisionResponse = false;
            this.rollBody4.collisionResponse = true;
        }
        // this.ballBody.force = [400, 0]
        // this.ballBody.velocity = [400, 0]
        console.log(this.ballBody.velocity);
        this.debugDraw.drawDebug();
    };
    Main.prototype.calcY = function (x) {
        var delta = Math.sqrt(this.ROLL_RADIUS * this.ROLL_RADIUS -
            (x - this.ROLL_CENTER_X) * (x - this.ROLL_CENTER_X));
        var y1 = this.canvasH - this.ROLL_RADIUS + delta;
        var y2 = this.canvasH - this.ROLL_RADIUS - delta;
        return { y1: y1, y2: y2 };
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    Main.prototype.startAnimation = function (result) {
        var _this = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = result.map(function (text) { return parser.parse(text); });
        var textfield = this.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var textFlow = textflowArr[count];
            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, _this);
        };
        change();
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map