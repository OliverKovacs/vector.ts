
//////////////////////////
//  vector.ts           //
//  Oliver Kovacs 2019  //
//  CC-BY-NC-SA 4.0     //
//////////////////////////

/**
 * *vector.ts/
 * *2D/3D Vector framework
 * *import vector.js with import statement
 * 
 * ?Documenation
 * ?Note: self is the vector on which the method is called
 * ?Note: p is accuracy when rounding
 * 
 * ? Vector2(x, y, p?)
 * - getLen()                   // returns length
 * - getLenSqr()                // returns length square
 * - getAngleDeg()              // returns the angle of vector2 in degrees
 * - getAngleRad()              // returns the angle of vector2 in radians
 * - getAngleToVecDeg()         // returns angle to another vector2 in degrees
 * - getAngleToVecRad()         // returns angle to another vector2 in radians
 * - getDotProd(vec)            // returns dot product of self and vec
 * - getCrossProd(vec)          // returns new vector3, cross prod from self and vec
 * - getUnit()                  // returns unit vector2 of self
 * - getMagnitude()             // returns length
 * - getAdd(vec)                // returns new vector2, adds self to vec
 * - getMod(vec)                // returns new vector2, multiplies self with vec
 * - getScalar(c)               // returns new vector2, scalar self with c
 * - getByPos(x1, y1, x2, y2)   // retruns vector2 between x1|y1 and x2|y2
 * - getByAngleDeg(angle, len)  // retruns vector2 with angle and length angle in degrees
 * - getByAngleRad(angle, len)  // retruns vector2 with angle and length angle in radians
 * - set(vec)                   // sets self to vec
 * - setAdd(vec)                // sets self to sum of self and vec
 * - setMod(vec)                // sets self to produkt to self and vec
 * - setScalar(c)               // sets self to scalar of self and c
 * - setUnit()                  // sets self to unit vector of self
 * - setByPos(x1, y1, x2, y2)   // sets self to vector2 between x1|y1 and x2|y2
 * - setByAngleDeg(angle, len)  // sets self to vector2 with angle and length angle in degrees
 * - setByAngleRad(angle, len)  // sets self to vector2 with angle and length angle in radians
 * - isOrth(vec)                // returns true if self and vec are orthogonal
 * - extend()                   // returns vector3 with self.x, self.y, 0
 * 
 * ? Vector3(x, y, z, p?)
 * - getLen()                   // returns length
 * - getLenSqr()                // returns length square
 * - getDotProd(vec)            // returns dot product of self and vec
 * - getCrossProd(vec)          // returns new vector3, cross prod from self and vec
 * - getUnit()                  // returns unit vector3 of self
 * - getMagnitude()             // returns length
 * - getAdd(vec)                // returns new vector3, adds self to vec
 * - getMod(vec)                // returns new vector3, multiplies self with vec
 * - getScalar(c)               // returns new vector3, scalar self with c
 * - getByPos(x1, y1, z1, x2, y2, z2) // retruns vector2 between x1|y1 and x2|y2
 * - getByAngleDeg(angle, len)  // retruns vector2 with angle and length angle in degrees
 * - getByAngleRad(angle, len)  // retruns vector2 with angle and length angle in radians
 * - set(vec)                   // sets self to vec
 * - setAdd(vec)                // sets self to sum of self and vec
 * - setMod(vec)                // sets self to produkt to self and vec
 * - setScalar(c)               // sets self to scalar of self and c
 * - setUnit()                  // sets self to unit vector of self
 * - setByPos(x1, y1, z1, x2, y2, z2) // sets self to vector3 between x1|y1|z1 and x2|y2|z2
 * - isOrth(vec)                // returns true if self and vec are orthogonal
 * 
 * ? Matrix2x2(a, b, c, d)
 * - getDeterminant()           //returns determinant of matrix
 * 
 * - round(p)                   //rounds number to p
 * 
 * ?End of documentation
 * 
 * *Oliver Kovacs 2019
 * *GitHub: https://github.com/OliverKovacs
 */



class Vector2 {
    x: number;
    y: number;

    p: number

    constructor(x: number, y: number, p?: number) {
        this.x = x;
        this.y = y;

        if(p == undefined) p = 5;
        this.p = p;
    }

    getLen() :number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    getLenSqr() :number {
        return this.x * this.x + this.y * this.y;
    }

    getAngleDeg() :number {
        return (Math.atan2(this.y, this.x)) * 180 / Math.PI;
    }

    getAngleRad() :number {
        return Math.atan2(this.y, this.x);
    }

    getAngleToVecDeg(vec: Vector2) :number {
        return round(((Math.acos(this.getDotProd(vec) / (this.getLen() * vec.getLen()))) * 180 / Math.PI), this.p);
    }

    getAngleToVecRad(vec: Vector2) :number {
        return round((Math.acos(this.getDotProd(vec) / (this.getLen() * vec.getLen()))), this.p);
    }

    getDotProd(vec: Vector2) :number {
        return this.x * vec.x + this.y * vec.y;
    }

    getCrossProd(vec: Vector2) :Vector3 {
        let i1 = this.x;
        let j1 = this.y;
        let k1 = 0;
        let i2 = vec.x;
        let j2 = vec.y;
        let k2 = 0;

        let a1 = new Matrix2x2(j1, k1, j2, k2);
        let a2 = new Matrix2x2(i1, k1, i2, k2);
        let a3 = new Matrix2x2(i1, j1, i2, j2);

        let detA1 = a1.getDeterminant();
        let detA2 = a2.getDeterminant();
        let detA3 = a3.getDeterminant();

        return new Vector3(detA1, -detA2, detA3);
    }

    getUnit() :Vector2 {
        return this.getScalar(1 / this.getLen());
    }

    getMagnitude() :number {
        return this.getLen();
    }

    getAdd(vec: Vector2) :Vector2 {
        return new Vector2(
            this.x + vec.x,
            this.y + vec.y
        );
    }

    getMod(vec: Vector2) :Vector2 {
        return new Vector2(
            this.x * vec.x,
            this.y * vec.y
        );
    }

    getScalar(c: number) :Vector2{
        return new Vector2(
            this.x * c,
            this.y * c
        );
    }

    getByPos(x1: number, y1: number, x2: number, y2: number) :Vector2 {
        return new Vector2(
            x2 - x1,
            y2 - y1
        );
    }

    getByAngleDeg(angle: number, len?: number) :Vector2 {
        if (len == undefined) len = 1;

        return new Vector2(
            round((Math.sin(angle / 180 * Math.PI)), this.p) * len,
            round((Math.cos(angle / 180 * Math.PI)), this.p) * len
        );
    }

    getByAngleRad(angle: number, len?: number) :Vector2 {
        if (len == undefined) len = 1;

        return new Vector2(
            round(Math.sin(angle), this.p) * len,
            round(Math.cos(angle), this.p) * len
        );
    }

    set(vec: Vector2) :void {
        this.x = vec.x;
        this.y = vec.y;
    }

    setAdd(vec: Vector2) :void {
        this.x += vec.x;
        this.y += vec.y;
    }

    setMod(vec: Vector2) :void {
        this.x *= vec.x;
        this.y *= vec.y;
    }

    setScalar(c: number) :void {
        this.x *= c;
        this.y *= c;
    }

    setUnit() {
        let length = this.getLen();
        this.x = this.x / length;
        this.y = this.y / length;
    }

    setByPos(x1: number, y1: number, x2: number, y2: number) :void {
        this.x = x2 - x1;
        this.y = y2 - y1;
    }

    setByAngleDeg(angle: number, length: number) :void {
        if (length == undefined) length = 1;
        this.x = round((Math.sin(angle / 180 * Math.PI)), this.p) * length;
        this.y = round((Math.cos(angle / 180 * Math.PI)), this.p) * length;
    }

    setByAngleRad(angle: number, length: number) :void {
        if (length == undefined) length = 1;
        this.x = round((Math.sin(angle)), this.p) * length;
        this.y = round((Math.cos(angle)), this.p) * length;
    }

    isOrth(vec: Vector2) :boolean {
        if (this.getDotProd(vec) == 0) return true;
        return false;
    }

    extend(z?: number) :Vector3 {
        if(z == undefined) z = 0;
        return new Vector3(this.x, this.y, z);
    }
}

class Vector3 {
    x: number;
    y: number;
    z: number;

    p: number;

    constructor(x: number, y: number, z: number, p?: number) {
        this.x = x;
        this.y = y;
        this.z = z;

        if(p == undefined) p = 5;
        this.p = p;
    }

    getLen() :number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    getLenSqr() :number {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    getDotProd(vec: Vector3) :number {
        return this.x * vec.x + this.y * vec.y + this.z * vec.z;
    }

    getCrossProd(vec: Vector3) :Vector3 {
        let i1 = this.x;
        let j1 = this.y;
        let k1 = this.z;
        let i2 = vec.x;
        let j2 = vec.y;
        let k2 = vec.z;

        let a1 = new Matrix2x2(j1, k1, j2, k2);
        let a2 = new Matrix2x2(i1, k1, i2, k2);
        let a3 = new Matrix2x2(i1, j1, i2, j2);

        console.log(a1);
        console.log(a2);
        console.log(a3);

        let detA1 = a1.getDeterminant();
        let detA2 = a2.getDeterminant();
        let detA3 = a3.getDeterminant();

        return new Vector3(detA1, -detA2, detA3);
    }

    getUnit() :Vector3 {
        return this.getScalar(1 / this.getLen());
    }

    getMagnitude() :number {
        return this.getLen();
    }

    getAdd(vec: Vector3) :Vector3 {
        return new Vector3(
            this.x + vec.x,
            this.y + vec.y,
            this.z + vec.z
        );
    }

    getMod(vec: Vector3) :Vector3 {
        return new Vector3(
            this.x * vec.x,
            this.y * vec.y,
            this.z * vec.z
        );
    }

    getScalar(c: number) :Vector3{
        return new Vector3(
            this.x * c,
            this.y * c,
            this.z * c
        );
    }

    getByPos(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number) :Vector3 {
        return new Vector3(
            x2 - x1,
            y2 - y1,
            z2 - z1
        );
    }

    setUnit() {
        let length = this.getLen();
        this.x = this.x / length;
        this.y = this.y / length;
        this.z = this.z / length;
    }

    setAdd(vec: Vector3) :void {
        this.x += vec.x;
        this.y += vec.y;
        this.z += vec.z
    }

    setMod(vec: Vector3) :void {
        this.x *= vec.x;
        this.y *= vec.y;
        this.z *= vec.z;
    }

    set(vec: Vector3) :void {
        this.x = vec.x;
        this.y = vec.y;
        this.z = vec.z;
    }

    setScalar(c: number) :void {
        this.x *= c;
        this.y *= c;
        this.z *= c;
    }

    setByPos(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number) :void {
        this.x = x2 - x1;
        this.y = y2 - y1;
        this.z = z2 - z1;
    }

    isOrth(vec: Vector3) :boolean {
        if (this.getDotProd(vec) == 0) return true;
        return false;
    }
}

class Matrix2x2 {
    m: number[];
    a: number;
    b: number;
    c: number;
    d: number;

    constructor(a: number, b: number, c: number, d: number) {
        this.m = [];

        this.a = 0;
        this.b = 1;
        this.c = 2;
        this.d = 3;

        this.m[this.a] = a;
        this.m[this.b] = b;
        this.m[this.c] = c;
        this.m[this.d] = d;
    }

    getDeterminant() :number {
        return (this.m[this.a] * this.m[this.d]) - (this.m[this.b] * this.m[this.c]);
    }
}

let round = (num: number, p: number) :number => {
    return parseFloat(num.toFixed(p));
}

export { Vector2, Vector3 };