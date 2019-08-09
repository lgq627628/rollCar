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

class Main extends egret.DisplayObjectContainer {



    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })



    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        // this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private textfield: egret.TextField;
    private world:p2.World;
    private factor:number=1;
    private canvasW:number=600;
    private canvasH:number=600;
    private ROLL_RADIUS:number=100;
    private ROLL_CENTER_X:number=300;
    private ballBody:p2.Body;    
    private rollArr1=[];
    private rollArr2=[];
    private rollArr3=[];
    private rollArr4=[];
    private rollBody1:p2.Body;
    private rollBody2:p2.Body;
    private rollBody3:p2.Body;
    private rollBody4:p2.Body;
    private planeBody:p2.Body;
    private debugDraw:p2DebugDraw;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        this.world=new p2.World();
        this.world.gravity=[0,10];
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

       


        var floorShape:p2.Box=new p2.Box({width:1000/this.factor, height:10/this.factor}); 
        var floorBody:p2.Body=new p2.Body({mass:0}); 
        floorBody.position=[this.canvasW/4/this.factor, (this.canvasH+15)/this.factor];
        // floorShape.material = roadMaterial;
        floorBody.addShape(floorShape);
        this.world.addBody(floorBody);


        var ballShape:p2.Circle=new p2.Circle({radius:10/this.factor});
        this.ballBody = new p2.Body({
            mass:1
        });
        this.ballBody.position=[0/this.factor, 600/this.factor];
        // this.ballBody.damping = 0;
        // this.ballBody.angularDamping = 0;
        // ballShape.material = ballMaterial;
        this.ballBody.addShape(ballShape); 
        this.ballBody.velocity = [300,0];
        this.ballBody.applyDamping(0);
        this.world.addBody(this.ballBody);


        




        for (var x = this.ROLL_CENTER_X; x <= this.ROLL_CENTER_X + this.ROLL_RADIUS; x++) {
            var { y1, y2 } = this.calcY(x);
            this.rollArr1.push([x, y1]);
            this.rollArr2.push([x, y2]);
        }
        for (var x = this.ROLL_CENTER_X - this.ROLL_RADIUS; x <= this.ROLL_CENTER_X; x++) {
            var { y1, y2 } = this.calcY(x);
            this.rollArr3.push([x, y2]);
            this.rollArr4.push([x, y1]);
        }
        // this.rollArr2.reverse();
        // this.rollArr2.shift();
        // var path = [...this.rollArr1, ...this.rollArr2, [300, 300], [500, 300], [500, 600]];
        // var path = [[300, 600], [400, 500], [300, 500], [500, 500], [500, 600]]
        var path1 = [...this.rollArr1, [500, 500], [500, 600]];
        path1 = path1.map(item => [item[0]/this.factor, item[1]/this.factor])

        var path2 = [...this.rollArr2, [500, 500], [500, 400]];
        path2 = path2.map(item => [item[0]/this.factor, item[1]/this.factor])

        var path3 = [...this.rollArr3, [100, 400], [100, 500]];
        path3 = path3.map(item => [item[0]/this.factor, item[1]/this.factor])

        var path4 = [...this.rollArr4, [100, 600], [100, 500]];
        path4 = path4.map(item => [item[0]/this.factor, item[1]/this.factor])


        this.rollBody1 = new p2.Body({ mass: 0 });
        this.rollBody1.fromPolygon(path1);
        // optimalDecomp=false：是否进行最佳分解，默认false，开启该选项会降低计算速度 
        // skipSimpleCheck=false：是否进行顶点交叉的判断，如果确定不存在交叉点可设为true 
        // removeCollinearPoints=false：是否剔除共线顶点，false表示不剔除 
        this.rollBody1.position = [400, 565]
        // this.rollBody1.applyDamping(0);        
        this.world.addBody(this.rollBody1);

        this.rollBody2 = new p2.Body({ mass: 0 });
        this.rollBody2.fromPolygon(path2);
        this.rollBody2.position = [400, 465]
        // this.rollBody2.applyDamping(0);                
        this.world.addBody(this.rollBody2);

        this.rollBody3 = new p2.Body({ mass: 0 });
        this.rollBody3.fromPolygon(path3);
        this.rollBody3.position = [135, 465]
        // this.rollBody3.applyDamping(0);
        this.world.addBody(this.rollBody3);

        this.rollBody4 = new p2.Body({ mass: 0 });
        this.rollBody4.fromPolygon(path4);
        this.rollBody4.position = [135, 565]
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

        var sprite: egret.Sprite = new egret.Sprite();
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


    }

    private loop():void{ 
        this.world.step(1/60);
        if ( 250/this.factor < this.ballBody.position[0] && 
            this.ballBody.position[0] < 300/this.factor &&
            400/this.factor < this.ballBody.position[1] &&
            this.ballBody.position[1] < 450/this.factor
        ) {
            this.rollBody1.collisionResponse = false;
            this.rollBody4.collisionResponse = true;
        }
        // this.ballBody.force = [400, 0]
        // this.ballBody.velocity = [400, 0]
        console.log(this.ballBody.velocity)
        this.debugDraw.drawDebug();
    }

    private calcY(x) {
        var delta = Math.sqrt(
            this.ROLL_RADIUS * this.ROLL_RADIUS -
            (x - this.ROLL_CENTER_X) * (x - this.ROLL_CENTER_X)
        );
        var y1 = this.canvasH - this.ROLL_RADIUS + delta;
        var y2 = this.canvasH - this.ROLL_RADIUS - delta;
        return { y1, y2 };
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: string[]) {
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };

        change();
    }
}