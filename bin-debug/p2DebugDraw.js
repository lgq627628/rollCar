var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
//////////////////////////////////////////////////////////////////////////////
var p2DebugDraw = (function () {
    function p2DebugDraw(world) {
        this.COLOR_D_SLEEP = 0x999999;
        this.COLOR_D_WAKE = 0xe5b2b2;
        this.COLOR_K = 0x9d9df5;
        this.COLOR_S = 0x7fe57f;
        this.lineWidth = 1;
        this.world = world;
    }
    p2DebugDraw.prototype.setSprite = function (sprite) {
        this.sprite = sprite;
    };
    p2DebugDraw.prototype.setLineWidth = function (value) {
        this.lineWidth = value;
    };
    p2DebugDraw.prototype.drawDebug = function () {
        this.sprite.graphics.clear();
        var l = this.world.bodies.length;
        for (var i = 0; i < l; i++) {
            var body = this.world.bodies[i];
            for (var j = 0; j < body.shapes.length; j++) {
                var shape = body.shapes[j];
                if (shape instanceof p2.Box) {
                    this.drawBox(shape, body);
                }
                else if (shape instanceof p2.Convex) {
                    this.drawConvex(shape, body);
                }
                else if (shape instanceof p2.Circle) {
                    this.drawCircle(shape, body);
                }
                else if (shape instanceof p2.Line) {
                    this.drawLine(shape, body);
                }
                else if (shape instanceof p2.Particle) {
                    this.drawParticle(shape, body);
                }
                else if (shape instanceof p2.Plane) {
                    this.drawPlane(shape, body);
                }
                else if (shape instanceof p2.Capsule) {
                    this.drawCapsule(shape, body);
                }
                else if (shape instanceof p2.Heightfield) {
                    this.drawHeightfield(shape, body);
                }
            }
        }
    };
    p2DebugDraw.prototype.drawRay = function (start, end, color) {
        // Draw line
        var g = this.sprite.graphics;
        g.lineStyle(this.lineWidth, color);
        g.moveTo(start[0], start[1]);
        g.lineTo(end[0], end[1]);
        g.endFill();
    };
    p2DebugDraw.prototype.drawBox = function (shape, b) {
        this.drawConvex(shape, b);
    };
    p2DebugDraw.prototype.drawCircle = function (shape, b) {
        var color = this.getColor(b);
        var g = this.sprite.graphics;
        g.lineStyle(this.lineWidth, color);
        g.beginFill(color, 0.5);
        //支持复合刚体
        var x = shape.position[0];
        var y = shape.position[1];
        var p = [];
        b.toWorldFrame(p, [x, y]);
        g.drawCircle(p[0], p[1], shape.radius);
        var edgeX = x + shape.radius;
        var edgeY = y + 0;
        var edge = new Array();
        b.toWorldFrame(edge, [edgeX, edgeY]);
        g.moveTo(p[0], p[1]);
        g.lineTo(edge[0], edge[1]);
        g.endFill();
    };
    p2DebugDraw.prototype.drawCapsule = function (shape, b) {
        var color = this.getColor(b);
        //支持复合刚体
        var x = shape.position[0];
        var y = shape.position[1];
        var angle = shape.angle;
        var len = shape.length;
        var radius = shape.radius;
        var pt1 = new Array(), pt2 = new Array(), pt3 = new Array(), pt4 = new Array();
        var a1 = new Array(), a2 = new Array();
        //支持Shape内部的旋转变换
        p2.vec2.rotate(pt1, [-len / 2, -radius], angle);
        p2.vec2.rotate(pt2, [len / 2, -radius], angle);
        p2.vec2.rotate(pt3, [len / 2, radius], angle);
        p2.vec2.rotate(pt4, [-len / 2, radius], angle);
        p2.vec2.rotate(a1, [len / 2, 0], angle);
        p2.vec2.rotate(a2, [-len / 2, 0], angle);
        var globalpt1 = new Array(), globalpt2 = new Array(), globalpt3 = new Array(), globalpt4 = new Array();
        var globala1 = new Array(), globala2 = new Array();
        b.toWorldFrame(globalpt1, [x + pt1[0], y + pt1[1]]);
        b.toWorldFrame(globalpt2, [x + pt2[0], y + pt2[1]]);
        b.toWorldFrame(globalpt3, [x + pt3[0], y + pt3[1]]);
        b.toWorldFrame(globalpt4, [x + pt4[0], y + pt4[1]]);
        b.toWorldFrame(globala1, [x + a1[0], y + a1[1]]);
        b.toWorldFrame(globala2, [x + a2[0], y + a2[1]]);
        var g = this.sprite.graphics;
        g.lineStyle(this.lineWidth, color);
        g.beginFill(color, 0.5);
        g.drawCircle(globala1[0], globala1[1], radius);
        g.endFill();
        g.lineStyle(this.lineWidth, color);
        g.beginFill(color, 0.5);
        g.drawCircle(globala2[0], globala2[1], radius);
        g.endFill();
        g.lineStyle(this.lineWidth, color);
        g.beginFill(color, 0.5);
        g.moveTo(globalpt1[0], globalpt1[1]);
        g.lineTo(globalpt2[0], globalpt2[1]);
        g.lineTo(globalpt3[0], globalpt3[1]);
        g.lineTo(globalpt4[0], globalpt4[1]);
        g.endFill();
    };
    p2DebugDraw.prototype.drawLine = function (shape, b) {
        var color = this.getColor(b);
        //支持复合刚体
        var x = shape.position[0];
        var y = shape.position[1];
        var angle = shape.angle;
        var len = shape.length;
        var point1 = new Array(), point2 = new Array();
        //支持Shape内部的旋转变换
        p2.vec2.rotate(point1, [-len / 2, 0], angle);
        p2.vec2.rotate(point2, [len / 2, 0], angle);
        var finalpoint1 = [];
        var finalpoint2 = [];
        b.toWorldFrame(finalpoint1, [x + point1[0], y + point1[1]]);
        b.toWorldFrame(finalpoint2, [x + point2[0], y + point2[1]]);
        var g = this.sprite.graphics;
        g.lineStyle(this.lineWidth, color);
        g.moveTo(finalpoint1[0], finalpoint1[1]);
        g.lineTo(finalpoint2[0], finalpoint2[1]);
        g.endFill();
    };
    p2DebugDraw.prototype.drawHeightfield = function (shape, b) {
        var color = this.getColor(b);
        var heights = shape.heights;
        var len = heights.length;
        var elementWidth = shape.elementWidth;
        if (len > 0) {
            //支持复合刚体
            var x = shape.position[0];
            var y = shape.position[1];
            var p = [];
            var initP = [];
            var initX = 0;
            var g = this.sprite.graphics;
            g.lineStyle(this.lineWidth, color);
            g.beginFill(color, 0.5);
            //底部的左侧起点
            b.toWorldFrame(initP, [x + initX, y - 100]);
            g.moveTo(initP[0], initP[1]);
            //遍历上部的每个点
            for (var i = 0; i < len; i++) {
                var tmpY = heights[i];
                b.toWorldFrame(p, [x + initX + i * elementWidth, y + tmpY]);
                g.lineTo(p[0], p[1]);
            }
            //底部右侧的最后一个点
            b.toWorldFrame(p, [x + initX + len * elementWidth, y - 100]);
            g.lineTo(p[0], p[1]);
            //填充形成闭合的块
            g.endFill();
        }
    };
    p2DebugDraw.prototype.drawParticle = function (shape, b) {
        var color = this.getColor(b);
        var g = this.sprite.graphics;
        g.lineStyle(this.lineWidth, color);
        g.beginFill(color, 0.5);
        //支持复合刚体
        var x = shape.position[0];
        var y = shape.position[1];
        var centerX = b.position[0] + x;
        var centerY = b.position[1] + y;
        g.drawCircle(centerX, centerY, this.lineWidth);
        g.endFill();
        g.lineStyle(this.lineWidth, color);
        g.drawCircle(centerX, centerY, this.lineWidth * 5);
        g.endFill();
    };
    p2DebugDraw.prototype.drawConvex = function (shape, b) {
        var color = this.getColor(b);
        var l = shape.vertices.length;
        var g = this.sprite.graphics;
        g.lineStyle(this.lineWidth, color);
        g.beginFill(color, 0.5);
        //支持复合刚体
        var x = shape.position[0];
        var y = shape.position[1];
        var centerP = new Array();
        b.toWorldFrame(centerP, [x, y]);
        var localP = shape.vertices[0];
        var p = [x + localP[0], y + localP[1]];
        var worldPoint = new Array();
        b.toWorldFrame(worldPoint, p);
        g.moveTo(centerP[0], centerP[1]);
        g.lineTo(worldPoint[0], worldPoint[1]);
        for (var i = 1; i <= l; i++) {
            localP = shape.vertices[i % l];
            p = [x + localP[0], y + localP[1]];
            b.toWorldFrame(worldPoint, p);
            g.lineTo(worldPoint[0], worldPoint[1]);
        }
        g.endFill();
    };
    p2DebugDraw.prototype.drawPlane = function (shape, b) {
        var color = this.COLOR_D_SLEEP;
        var g = this.sprite.graphics;
        g.lineStyle(this.lineWidth, color);
        g.beginFill(color, 1);
        //支持复合刚体
        var x = shape.position[0];
        var y = shape.position[1];
        var angle = shape.angle;
        var start = new Array();
        var end = new Array();
        var startGlobal = [];
        var endGlobal = [];
        //支持Shape内部的旋转变换
        p2.vec2.rotate(start, [-1000, 0], angle);
        b.toWorldFrame(startGlobal, [x + start[0], y + start[1]]);
        g.moveTo(startGlobal[0], startGlobal[1]);
        p2.vec2.rotate(end, [1000, 0], angle);
        b.toWorldFrame(endGlobal, [x + end[0], y + end[1]]);
        g.lineTo(endGlobal[0], endGlobal[1]);
        p2.vec2.rotate(end, [1000, -1000], angle);
        b.toWorldFrame(endGlobal, [x + end[0], y + end[1]]);
        g.lineTo(endGlobal[0], endGlobal[1]);
        p2.vec2.rotate(end, [-1000, -1000], angle);
        b.toWorldFrame(endGlobal, [x + end[0], y + end[1]]);
        g.lineTo(endGlobal[0], endGlobal[1]);
        p2.vec2.rotate(end, [-1000, -0], angle);
        b.toWorldFrame(endGlobal, [x + end[0], y + end[1]]);
        g.lineTo(endGlobal[0], endGlobal[1]);
        g.endFill();
    };
    p2DebugDraw.prototype.getColor = function (b) {
        var color = this.COLOR_D_SLEEP;
        if (b.type == p2.Body.KINEMATIC) {
            color = this.COLOR_K;
        }
        else if (b.type == p2.Body.STATIC) {
            color = this.COLOR_S;
        }
        else if (b.sleepState == p2.Body.AWAKE) {
            color = this.COLOR_D_WAKE;
        }
        return color;
    };
    return p2DebugDraw;
}());
__reflect(p2DebugDraw.prototype, "p2DebugDraw");
//# sourceMappingURL=p2DebugDraw.js.map