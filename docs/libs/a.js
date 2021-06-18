(function () {
  'use strict';

  /**
   * Common utilities
   * @module glMatrix
   */
  var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
  if (!Math.hypot) Math.hypot = function () {
    var y = 0,
        i = arguments.length;

    while (i--) {
      y += arguments[i] * arguments[i];
    }

    return Math.sqrt(y);
  };

  /**
   * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
   * @module mat4
   */

  /**
   * Creates a new identity mat4
   *
   * @returns {mat4} a new 4x4 matrix
   */

  function create$1() {
    var out = new ARRAY_TYPE(16);

    if (ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
    }

    out[0] = 1;
    out[5] = 1;
    out[10] = 1;
    out[15] = 1;
    return out;
  }
  /**
   * Translate a mat4 by the given vector
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to translate
   * @param {ReadonlyVec3} v vector to translate by
   * @returns {mat4} out
   */

  function translate(out, a, v) {
    var x = v[0],
        y = v[1],
        z = v[2];
    var a00, a01, a02, a03;
    var a10, a11, a12, a13;
    var a20, a21, a22, a23;

    if (a === out) {
      out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
      out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
      out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
      out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
      a00 = a[0];
      a01 = a[1];
      a02 = a[2];
      a03 = a[3];
      a10 = a[4];
      a11 = a[5];
      a12 = a[6];
      a13 = a[7];
      a20 = a[8];
      a21 = a[9];
      a22 = a[10];
      a23 = a[11];
      out[0] = a00;
      out[1] = a01;
      out[2] = a02;
      out[3] = a03;
      out[4] = a10;
      out[5] = a11;
      out[6] = a12;
      out[7] = a13;
      out[8] = a20;
      out[9] = a21;
      out[10] = a22;
      out[11] = a23;
      out[12] = a00 * x + a10 * y + a20 * z + a[12];
      out[13] = a01 * x + a11 * y + a21 * z + a[13];
      out[14] = a02 * x + a12 * y + a22 * z + a[14];
      out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
  }
  /**
   * Rotates a matrix by the given angle around the X axis
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */

  function rotateX$1(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a10 = a[4];
    var a11 = a[5];
    var a12 = a[6];
    var a13 = a[7];
    var a20 = a[8];
    var a21 = a[9];
    var a22 = a[10];
    var a23 = a[11];

    if (a !== out) {
      // If the source and destination differ, copy the unchanged rows
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    } // Perform axis-specific matrix multiplication


    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
  }
  /**
   * Rotates a matrix by the given angle around the Y axis
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */

  function rotateY$1(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a00 = a[0];
    var a01 = a[1];
    var a02 = a[2];
    var a03 = a[3];
    var a20 = a[8];
    var a21 = a[9];
    var a22 = a[10];
    var a23 = a[11];

    if (a !== out) {
      // If the source and destination differ, copy the unchanged rows
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    } // Perform axis-specific matrix multiplication


    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
  }
  /**
   * Rotates a matrix by the given angle around the Z axis
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */

  function rotateZ$1(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a00 = a[0];
    var a01 = a[1];
    var a02 = a[2];
    var a03 = a[3];
    var a10 = a[4];
    var a11 = a[5];
    var a12 = a[6];
    var a13 = a[7];

    if (a !== out) {
      // If the source and destination differ, copy the unchanged last row
      out[8] = a[8];
      out[9] = a[9];
      out[10] = a[10];
      out[11] = a[11];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    } // Perform axis-specific matrix multiplication


    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
  }
  /**
   * Generates a perspective projection matrix with the given bounds.
   * Passing null/undefined/no value for far will generate infinite projection matrix.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {number} fovy Vertical field of view in radians
   * @param {number} aspect Aspect ratio. typically viewport width/height
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum, can be null or Infinity
   * @returns {mat4} out
   */

  function perspective(out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf;
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[15] = 0;

    if (far != null && far !== Infinity) {
      nf = 1 / (near - far);
      out[10] = (far + near) * nf;
      out[14] = 2 * far * near * nf;
    } else {
      out[10] = -1;
      out[14] = -2 * near;
    }

    return out;
  }

  /**
   * 3 Dimensional Vector
   * @module vec3
   */

  /**
   * Creates a new, empty vec3
   *
   * @returns {vec3} a new 3D vector
   */

  function create() {
    var out = new ARRAY_TYPE(3);

    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }

    return out;
  }
  /**
   * Set the components of a vec3 to the given values
   *
   * @param {vec3} out the receiving vector
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @returns {vec3} out
   */

  function set(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }
  /**
   * Rotate a 3D vector around the x-axis
   * @param {vec3} out The receiving vec3
   * @param {ReadonlyVec3} a The vec3 point to rotate
   * @param {ReadonlyVec3} b The origin of the rotation
   * @param {Number} rad The angle of rotation in radians
   * @returns {vec3} out
   */

  function rotateX(out, a, b, rad) {
    var p = [],
        r = []; //Translate point to the origin

    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2]; //perform rotation

    r[0] = p[0];
    r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
    r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad); //translate to correct position

    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];
    return out;
  }
  /**
   * Rotate a 3D vector around the y-axis
   * @param {vec3} out The receiving vec3
   * @param {ReadonlyVec3} a The vec3 point to rotate
   * @param {ReadonlyVec3} b The origin of the rotation
   * @param {Number} rad The angle of rotation in radians
   * @returns {vec3} out
   */

  function rotateY(out, a, b, rad) {
    var p = [],
        r = []; //Translate point to the origin

    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2]; //perform rotation

    r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
    r[1] = p[1];
    r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad); //translate to correct position

    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];
    return out;
  }
  /**
   * Rotate a 3D vector around the z-axis
   * @param {vec3} out The receiving vec3
   * @param {ReadonlyVec3} a The vec3 point to rotate
   * @param {ReadonlyVec3} b The origin of the rotation
   * @param {Number} rad The angle of rotation in radians
   * @returns {vec3} out
   */

  function rotateZ(out, a, b, rad) {
    var p = [],
        r = []; //Translate point to the origin

    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2]; //perform rotation

    r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
    r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
    r[2] = p[2]; //translate to correct position

    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];
    return out;
  }
  /**
   * Set the components of a vec3 to zero
   *
   * @param {vec3} out the receiving vector
   * @returns {vec3} out
   */

  function zero(out) {
    out[0] = 0.0;
    out[1] = 0.0;
    out[2] = 0.0;
    return out;
  }
  /**
   * Perform some operation over an array of vec3s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */

  (function () {
    var vec = create();
    return function (a, stride, offset, count, fn, arg) {
      var i, l;

      if (!stride) {
        stride = 3;
      }

      if (!offset) {
        offset = 0;
      }

      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }

      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
      }

      return a;
    };
  })();

  const PICO_COLORS = [
  	[0, 0, 0],
  	[29, 43, 83],
  	[126, 37, 83],
  	[0, 135, 81],
  	[171, 82, 54],
  	[95, 87, 79],
  	[194, 195, 199],
  	[255, 241, 232],
  	[255, 0, 77],
  	[255, 163, 0],
  	[255, 236, 39],
  	[0, 228, 54],
  	[41, 173, 255],
  	[131, 118, 156],
  	[255, 119, 168],
  	[255, 204, 170],
  ];

  class PicoCADModel {
  	/**
  	 * @param {PicoCADModelObject[]} objects
  	 * @param {object} [options]
  	 * @param {string} [options.name] The model name.
  	 * @param {number} [options.backgroundIndex] The PICO-8 color index used for the background. Defaults to 0.
  	 * @param {number} [options.alphaIndex] The PICO-8 color index used for the texture alpha. Defaults to 0.
  	 * @param {number} [options.zoomLevel] The preferred initial zoom level.
  	 * @param {number[]} [options.texture] The 128x120 texture as an array of PICO-8 color indices.
  	 */
  	constructor(objects, options={}) {
  		this.objects = objects;
  		/** The model name. */
  		this.name = options.name;
  		/** The PICO-8 color index used for the background. */
  		this.backgroundIndex = options.backgroundIndex ?? 0;
  		/** The PICO-8 color index used for the texture alpha. */
  		this.alphaIndex = options.alphaIndex ?? 0;
  		/** The PICO-8 color index used for the texture alpha. */
  		this.zoomLevel = options.zoomLevel;
  		/** The 128x120 texture as an array of PICO-8 color indices. */
  		this.texture = options.texture;
  	}

  	backgroundColor() {
  		return PICO_COLORS[this.backgroundIndex];
  	}
  	
  	alphaColor() {
  		return PICO_COLORS[this.alphaIndex];
  	}
  }

  class PicoCADModelObject {
  	/**
  	 * @param {string} name 
  	 * @param {number[]} position 
  	 * @param {number[]} rotation 
  	 * @param {number[][]} vertices Array of triplets of 3D vertices.
  	 * @param {PicoCADModelFace[]} faces 
  	 */
  	constructor(name, position, rotation, vertices, faces) {
  		this.name = name;
  		this.position = position;
  		this.rotation = rotation;
  		/** Array of triplets of 3D vertices. */
  		this.vertices = vertices;
  		this.faces = faces;
  	}
  }

  /**
   * The face of an object.
   */
  class PicoCADModelFace {
  	/**
  	 * @param {number[]} indices Indices that point to a vertex in the object vertices. 0 base index.
  	 * @param {number} colorIndex PICO-8 color index.
  	 * @param {number[][]} uvs Array of pairs of UVs. Range is [0, 16].
  	 * @param {object} [options]
  	 * @param {boolean} [options.shading] Defaults to true.
  	 * @param {boolean} [options.texture] Defaults to true.
  	 * @param {boolean} [options.doubleSided] Defaults to false.
  	 * @param {boolean} [options.renderFirst] Defaults to false.
  	 */
  	constructor(indices, colorIndex, uvs, options={}) {
  		/** Indices that point to a vertex in the object vertices. 0 base index. */
  		this.indices = indices;
  		/** PICO-8 color index. */
  		this.colorIndex = colorIndex;
  		/** Array of pairs of UVs. Range is [0, 16]. */
  		this.uvs = uvs;
  		/** If this face should be rendered with shading. */
  		this.shading = options.shading ?? true;
  		/** If this face should be rendered with it's texture, or just using it's face color. */
  		this.texture = options.texture ?? true;
  		this.doubleSided = options.doubleSided ?? false;
  		this.renderFirst = options.renderFirst ?? false;
  	}

  	color() {
  		return PICO_COLORS[this.colorIndex];
  	}
  }

  /**
   * A rendering pass.
   */
  class Pass {
  	/**
  	 * @param {WebGLRenderingContext} gl
  	 * @param {{cull?: boolean, shading?: boolean, texture?: boolean, clearDepth?: boolean}} [options] 
  	 */
  	constructor(gl, options={}) {
  		this.gl = gl;
  		this.cull = options.cull ?? true;
  		this.shading = options.shading ?? true;
  		this.texture = options.texture ?? true;
  		this.clearDepth = options.clearDepth ?? false;

  		/** @type {number[]} */
  		this.vertices = [];
  		/** @type {number[]} */
  		this.normals = [];
  		/** @type {number[]} */
  		this.uvs = [];
  		/** @type {number[]} */
  		this.colorUVs = [];
  		/** @type {number[]} */
  		this.triangles = [];
  	}

  	/**
  	 * Upload changes to the GL context.
  	 */
  	save() {
  		const gl = this.gl;

  		this.vertexCount = this.triangles.length;

  		if (!this.isEmpty()) {
  			this.vertexBuffer = gl.createBuffer();
  			this.uvBuffer = gl.createBuffer();
  			this.colorUVBuffer = gl.createBuffer();
  			this.triangleBuffer = gl.createBuffer();
  			
  			if (this.shading) {
  				this.normalBuffer = gl.createBuffer();
  			}

  			gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

  			gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
  			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.uvs), gl.STATIC_DRAW);
  		
  			gl.bindBuffer(gl.ARRAY_BUFFER, this.colorUVBuffer);
  			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colorUVs), gl.STATIC_DRAW);

  			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.triangleBuffer);
  			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.triangles), gl.STATIC_DRAW);
  			
  			if (this.shading) {
  				gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
  				gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normals), gl.STATIC_DRAW);
  			}
  		}

  		this.uvs = null;
  		this.colorUVs = null;
  		this.normals = null;
  		this.vertices = null;
  		this.triangles = null;
  	}

  	/**
  	 * If there is nothing to render.
  	 */
  	isEmpty() {
  		return this.vertexCount === 0;
  	}

  	free() {
  		const gl = this.gl;

  		gl.deleteBuffer(this.vertexBuffer);
  		gl.deleteBuffer(this.uvBuffer);
  		gl.deleteBuffer(this.colorUVBuffer);
  		gl.deleteBuffer(this.triangleBuffer);
  		
  		if (this.shading) {
  			gl.deleteBuffer(this.normalBuffer);
  		}
  	}
  }

  class WirePass {
  	/**
  	 * @param {WebGLRenderingContext} gl 
  	 */
  	constructor(gl) {
  		this.gl = gl;

  		/** @type {number[]} */
  		this.vertices = [];
  	}

  	save() {
  		const gl = this.gl;

  		this.vertexCount = Math.floor(this.vertices.length / 3);

  		this.vertexBuffer = gl.createBuffer();
  		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

  		this.vertices = null;
  	}

  	free() {
  		this.gl.deleteBuffer(this.vertexBuffer);
  	}
  }

  /**
   * @param {WebGLRenderingContext} gl
   * @param {PicoCADModel} model 
   * @param {number} tesselationCount Pass 0 to do no tesselation
   */
  function prepareModelForRendering(gl, model, tesselationCount) {
  	const { passes, wireframe } = loadModel$1(gl, model, tesselationCount + 1);

  	// Read texture.
  	const textures = convertTexture(model.texture, model.alphaIndex);

  	return {
  		passes: passes,
  		wireframe: wireframe,
  		texture: textures.colors,
  		textureIndices: textures.indices,
  	};
  }

  /**
   * @param {WebGLRenderingContext} gl
   * @param {PicoCADModel} model 
   * @param {number} tn Number of tessellations
   */
  function loadModel$1(gl, model, tn) {
  	const passes = [];

  	for (let i = 0; i < 16; i++) {
  		const doubleSided = i % 2  < 1;
  		const shading     = i % 4  < 2;
  		const texture     = i % 8  < 4;
  		// const priority = i      < 8;  // This flag is achieved using the ordering of the passes. That's why it's the last one :)
  		
  		passes.push(new Pass(gl, {
  			cull: !doubleSided,
  			shading: shading,
  			texture: texture,
  			clearDepth: i === 8,
  		}));
  	}

  	const wireframePass = new WirePass(gl);
  	const wireframeVertices = wireframePass.vertices;

  	for (const object of model.objects) {
  		const pos = object.position;
  		// const rot = object.rotation; // unused?

  		const rawVertices = object.vertices.map(xs => {
  			return [
  				-xs[0] - pos[0],
  				-xs[1] - pos[1],
  				xs[2] + pos[2],
  			];
  		});

  		// pioCAD stores each vertex once.
  		// But we'll have to duplicate vertices across faces!

  		for (const face of object.faces) {
  			const faceIndices = face.indices;
  			const rawUVs = face.uvs;

  			// Configure pass based on face props
  			const pass = passes[
  				(face.doubleSided       ? 0 : 1) +
  				(face.shading ? 0 : 2) +
  				(face.texture ? 0 : 4) +
  				(face.renderFirst   ? 0 : 8)
  			];

  			const vertices = pass.vertices;
  			const triangles = pass.triangles;
  			const normals = pass.normals;
  			const uvs = pass.uvs;
  			const colorUVs = pass.colorUVs;

  			// Color UVs
  			const colorU = 1/256 + face.colorIndex * (1/128);
  			const colorV = 1;

  			// Get current vertex index.
  			const vertexIndex0 = Math.floor(vertices.length / 3);

  			// Get faces vertices and uvs.
  			// Save face edges to wireframe buffer.
  			const faceVertices = [];
  			const faceUVs = [];

  			for (let i = 0; i < faceIndices.length; i++) {
  				const vertex = rawVertices[faceIndices[i]];
  				const vertex2 = rawVertices[faceIndices[i === 0 ? faceIndices.length - 1 : i - 1]];
  				const rawUV = rawUVs[i];

  				faceVertices.push(vertex);

  				wireframeVertices.push(
  					vertex[0], vertex[1], vertex[2],
  					vertex2[0], vertex2[1], vertex2[2],
  				);

  				faceUVs.push([
  					rawUV[0] / 16,
  					rawUV[1] / 16,
  				]);
  			}

  			// Calculate face normal (should be same for all triangles)
  			const faceNormal = calculateFaceNormal(faceVertices);

  			// Get triangles
  			if (faceIndices.length === 4 && face.texture && tn > 1) {
  				// Tesselate quad.
  				const c0 = faceVertices[0];
  				const c1 = faceVertices[1];
  				const c2 = faceVertices[2];
  				const c3 = faceVertices[3];

  				const uv0 = faceUVs[0];
  				const uv1 = faceUVs[1];
  				const uv2 = faceUVs[2];
  				const uv3 = faceUVs[3];

  				for (let xi = 0; xi <= tn; xi++) {
  					const xt = xi / tn;

  					const p0 = [
  						lerp(c0[0], c1[0], xt),
  						lerp(c0[1], c1[1], xt),
  						lerp(c0[2], c1[2], xt),
  						lerp(uv0[0], uv1[0], xt),
  						lerp(uv0[1], uv1[1], xt),
  					];
  					const p1 = [
  						lerp(c3[0], c2[0], xt),
  						lerp(c3[1], c2[1], xt),
  						lerp(c3[2], c2[2], xt),
  						lerp(uv3[0], uv2[0], xt),
  						lerp(uv3[1], uv2[1], xt),
  					];

  					for (let yi = 0; yi <= tn; yi++) {
  						const yt = yi / tn;

  						vertices.push(
  							lerp(p0[0], p1[0], yt),
  							lerp(p0[1], p1[1], yt),
  							lerp(p0[2], p1[2], yt),
  						);
  						uvs.push(
  							lerp(p0[3], p1[3], yt),
  							lerp(p0[4], p1[4], yt),
  						);
  						colorUVs.push(colorU, colorV);
  						normals.push(faceNormal[0], faceNormal[1], faceNormal[2]);
  					}
  				}

  				for (let xi = 0; xi < tn; xi++) {
  					for (let yi = 0; yi < tn; yi++) {
  						const dy = yi * (tn + 1);

  						// add two triangles for each subdivided quad
  						const n1 = vertexIndex0 + dy + xi + 1;
  						const n2 = vertexIndex0 + dy + xi + tn + 1;
  						triangles.push(
  							// 1
  							vertexIndex0 + dy + xi,
  							n1,
  							n2,
  							// 2
  							n2,
  							n1,
  							vertexIndex0 + dy + xi + tn + 2,
  						);
  					}
  				}
  			} else {
  				// Save vertices used by this face.
  				for (const vertex of faceVertices) {
  					vertices.push(vertex[0], vertex[1], vertex[2]);

  					normals.push(faceNormal[0], faceNormal[1], faceNormal[2]);
  				}

  				// Save UVs used by this face.
  				// We always save both texture and color info, since models can be rendered in color mode.

  				for (let i = 0; i < faceUVs.length; i++) {
  					// Save color.
  					colorUVs.push(colorU, colorV);

  					// Save texture UVs.
  					if (face.texture) {
  						const uv = faceUVs[i];
  						uvs.push(uv[0], uv[1]);
  					} else {
  						// Re-use color UV.
  						uvs.push(colorU, colorV);
  					}
  				}

  				// Triangulate polygon.
  				// This just uses fan triangulation :)
  				for (let i = 0, n = faceIndices.length - 2; i < n; i++) {
  					triangles.push(
  						vertexIndex0 + 1 + i,
  						vertexIndex0,
  						vertexIndex0 + 2 + i,
  					);
  				}
  			}
  		}
  	}

  	// Init and return passes.
  	for (const pass of passes) {
  		pass.save();
  	}

  	wireframePass.save();

  	return {
  		passes: passes,
  		wireframe: wireframePass,
  	};
  }

  /**
   * @param {number} a 
   * @param {number} b 
   * @param {number} t 
   */
  function lerp(a, b, t) {
  	return a + (b - a) * t;
  }

  /**
   * @param {number[][]} vertices 
   */
  function calculateFaceNormal(vertices) {
  	for (let i = 0; i < vertices.length; i++) {
  		const v0 = vertices[i];
  		const v1 = vertices[(i + 1) % vertices.length];
  		const v2 = vertices[(i + 2) % vertices.length];

  		const d0 = [
  			v0[0] - v1[0],
  			v0[1] - v1[1],
  			v0[2] - v1[2],
  		];
  		const d1 = [
  			v1[0] - v2[0],
  			v1[1] - v2[1],
  			v1[2] - v2[2],
  		];

  		const c = cross(d1, d0);
  		const len = length(c);
  		if (len > 0) {
  			return [
  				c[0] / len,
  				c[1] / len,
  				c[2] / len,
  			];
  		}
  	}

  	// All edges are parallel (a line)... Just return any vector :)
  	return [1, 0, 0];
  }

  /**
   * @param {number[]} a 
   * @param {number[]} b 
   */
   function cross(a, b) {
  	return [
  		a[1] * b[2] - a[2] * b[1],
  		a[2] * b[0] - a[0] * b[2],
  		a[0] * b[1] - a[1] * b[0],
  	];
  }

  /**
   * @param {number[]} a 
   */
  function length(a) {
  	return Math.hypot(a[0], a[1], a[2]);
  }


  /**
   * @param {number[]} sourceIndices 
   * @param {number} alphaIndex
   * @returns A 128x128 image, and a array of 16 booleans indicating if the give color is used in the model.
   */
   function convertTexture(sourceIndices, alphaIndex) {
  	const imgData = new ImageData(128, 128);
  	const data = imgData.data;
  	const indexArray = /** @type {number[]} */(Array(16384)).fill(255);

  	let i = 0;
  	let ti = 0;
  	for (let y = 0; y < 120; y++) {
  		for (let x = 0; x < 128; x++) {
  			const index = sourceIndices[i];
  			
  			if (index === alphaIndex) {
  				// this is transparent
  				indexArray[i] = 255;
  			} else {
  				indexArray[i] = index;

  				const rgb = PICO_COLORS[index];

  				data[ti    ] = rgb[0];
  				data[ti + 1] = rgb[1];
  				data[ti + 2] = rgb[2];
  				data[ti + 3] = 255;
  			}

  			i++;
  			ti += 4;
  		}
  	}

  	// Add hidden indices on bottom row for single color faces.
  	for (let i = 0; i < 16; i++) {
  		indexArray[16256 + i] = i;

  		const rgb = PICO_COLORS[i];

  		const ti = 65024 + i * 4;
  		data[ti    ] = rgb[0];
  		data[ti + 1] = rgb[1];
  		data[ti + 2] = rgb[2];
  		data[ti + 3] = 255;
  	}

  	return {
  		colors: imgData,
  		indices: indexArray,
  	};
  }

  class ShaderProgram {
  	/**
  	 * @param {WebGLRenderingContext} gl
  	 * @param {string} vertexShader 
  	 * @param {string} fragmentShader 
  	 */
  	constructor(gl, vertexShader, fragmentShader) {
  		this.gl = gl;

  		// create shaders
  		const vs = this.createShader(gl.VERTEX_SHADER, vertexShader);
  		const fs = this.createShader(gl.FRAGMENT_SHADER, fragmentShader);

  		this.program = gl.createProgram();
  		gl.attachShader(this.program, vs);
  		gl.attachShader(this.program, fs);
  		gl.linkProgram(this.program);

  		gl.deleteShader(vs);
  		gl.deleteShader(fs);

  		if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
  			const msg = gl.getProgramInfoLog(this.program);
  			gl.deleteProgram(this.program);
  			throw Error("program compilation failed: " + msg);
  		}

  		this.vertexLocation = this.getAttribLocation("vertex");
  	}

  	/**
  	 * @param {number} type 
  	 * @param {string} source 
  	 */
  	createShader(type, source) {
  		const gl = this.gl;

  		const shader = gl.createShader(type);

  		gl.shaderSource(shader, source);
  		gl.compileShader(shader);

  		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
  			const msg = gl.getShaderInfoLog(shader);
  			gl.deleteShader(shader);
  			throw Error(`${type === gl.FRAGMENT_SHADER ? "fragment" : "vertex"} shader compilation failed: ${msg}`);
  		}

  		return shader;
  	}

  	/**
  	 * @param {string} name 
  	 */
  	getAttribLocation(name) {
  		return this.gl.getAttribLocation(this.program, name);
  	}
  	
  	/**
  	 * @param {string} name 
  	 */
  	getUniformLocation(name) {
  		return this.gl.getUniformLocation(this.program, name);
  	}

  	use() {
  		this.gl.useProgram(this.program);
  	}
  	
  	free() {
  		this.gl.deleteProgram(this.program);
  	}
  }

  // Hex format as an image of pico8 colors, as array of indexes.
  // Each group of 2x4 pixels represents the gradient for a given color.
  // Top -> bottom = light -> dark.
  // The two columns are for dithering: there may be two different colors for a given light level.
  // (This is based directly off picoCAD's lighting).

  /**
   * @param {number} w
   * @param {number} h
   * @param {string} hexData 
   * @returns {ImageData}
   */
  function createImage(w, h, hexData) {
  	const img = new ImageData(w, h);
  	
  	// init data
  	const data = img.data;

  	const n = w * h;
  	let index = 0;
  	for (let i = 0; i < n; i++) {
  		const color = PICO_COLORS[parseInt(hexData.charAt(i), 16)];

  		data[index    ] = color[0];
  		data[index + 1] = color[1];
  		data[index + 2] = color[2];
  		data[index + 3] = 255;
  		index += 4;
  	}

  	return img;
  }

  function createTextureLightMap() {
  	return createImage(32, 4, "00112233445566778899aabbccddeeff0010213542516d768294a9b3cdd5e8fe000011552211dd6622449933dd55889900000011110055dd1122445555112244");
  }

  function createColorLightMap() {
  	return createImage(32, 7, "00112233445566778899aabbccddeeff0011223542556d768894a9bbccddeefe001122552255dd66884499bbccddeeee001021512251d56d824294b3cdd5e8e800001111221155dd22224433dd55888800001010211151d521224235d551828200000000111111551122225555112222");
  }

  const userAgent = navigator.userAgent;

  const isSafari = userAgent.includes("Safari/") && !userAgent.includes("Edg/");

  /**
   * @param {string} s 
   * @returns {LuaPicoCADModel}
   */
  function parsePicoCADData(s) {
  	return /** @type {any} */(parseLua(s));
  }

  /**
   * @param {string} s 
   * @returns {LuaTable}
   */
  function parseLua(s) {
  	let i = 0;

  	return readObject();

  	function readValue() {
  		const c = s.charAt(i);
  		if (c === "{") {
  			return readObject();
  		} else if (c === "'") {
  			return readString();
  		} else if (c === "-" || c === "." || (c >= "0" && c <= "9")) {
  			return readNumber();
  		} else {
  			throw Error("Unkown value (" + i + "): " + "\"" + c + "\" = " + c.charCodeAt(0));
  		}
  	}

  	function readObject() {
  		i++; // {

  		const obj = {
  			array: [],
  			dict: Object.create(null),
  		};

  		skipWhitespace();
  		
  		while (true) {
  			const c = s.charAt(i);

  			if (c === "}") {
  				i++;
  				break;
  			}

  			let key;

  			if (c >= "a" && c <= "z") {
  				// key-value pair
  				let start = i;
  				i++;

  				while (true) {
  					const c = s.charAt(i);
  					if (c === "=") {
  						break;
  					} else {
  						i++;
  					}
  				}

  				key = s.slice(start, i);
  				i++; // =
  			}

  			const value = readValue();

  			if (key == null) {
  				obj.array.push(value);
  			} else {
  				obj.dict[key] = value;
  			}

  			skipWhitespace();

  			const cc = s.charAt(i);

  			if (cc === ",") {
  				i++;
  				skipWhitespace();
  			}
  		}

  		return obj;
  	}

  	function readString() {
  		// assuming no escapes
  		const start = i;
  		const j = s.indexOf("'", i + 1);
  		if (j < 0) {
  			throw Error("No end!!!");
  		}
  		i = j + 1;
  		if (i === start) {
  			throw Error("!!!!");
  		}
  		return s.slice(start + 1, j);
  	}

  	function readNumber() {
  		const start = i;

  		while (true) {
  			const c = s.charAt(i);
  			
  			if (c === "-" || c === "." || (c >= "0" && c <= "9")) {
  				i++;
  			} else {
  				break;
  			}
  		}

  		if (i === start) {
  			throw Error("!!!!");
  		}

  		return Number(s.slice(start, i));
  	}

  	function skipWhitespace() {
  		while (true) {
  			const c = s.charAt(i);

  			if (c === " " || c === "\n" || c === "\r" || c === "\t") {
  				i++;
  			} else {
  				break;
  			}
  		}
  	}
  }

  /** @typedef {string | number | LuaTable} LuaValue */
  /** @typedef {{array: LuaValue[], dict: Record<string, LuaValue>}} LuaTable */
  /** @typedef {{array: T[], dict: Record<string, LuaValue>}} LuaArray<T> @template T */
  /** @typedef {{array: LuaValue[], dict: T}} LuaDict<T> @template T */
  /** @typedef {{array: T[], dict: U}} LuaArrayDict<T> @template T @template U */
  /** @typedef {LuaArray<LuaDict<{name: string, pos: LuaArray<number>, rot: LuaArray<number>, v: LuaArray<LuaArray<number>>, f: LuaArray<LuaArrayDict<number, {c: number, dbl?: number, noshade?: number, notex?: number, prio?: number, uv: LuaArray<number>}>>}>>} LuaPicoCADModel */

  /**
   * @param {string} s
   * @param {string} sep
   * @returns {[string, string]}
   */
  function splitString(s, sep) {
  	const i = s.indexOf(sep);
  	return i < 0 ? [s, ""] : [s.slice(0, i), s.slice(i + sep.length)];
  }

  /**
   * @param {string} s 
   * @returns {[string, string]}
   */
  function readLine(s) {
  	let i = 0;
  	let end = s.length;
  	while (i < s.length) {
  		const c = s.charAt(i);
  		i++;
  		if (c === "\n") {
  			end = i - 1;
  			break;
  		} else if (c === "\r") {
  			end = i - 1;
  			if (s.charAt(i) === "\n") {
  				i++;
  			}
  			break;
  		}
  	}

  	return [s.slice(0, end), s.slice(i)];
  }

  /**
   * @param {string} source 
   * @returns {PicoCADModel}
   */
  function parsePicoCADModel(source) {
  	if (!source.startsWith("picocad;")) {
  		throw Error("Not a picoCAD file.");
  	}

  	// Read header.
  	const [header, body] = readLine(source);

  	const headerValues = header.split(";");
  	const fileName = headerValues[1];
  	const [bestZoom, bgIndex, alphaIndex] = headerValues.slice(2).map(s => Number(s));

  	const [dataStr, texStr] = splitString(body, "%"); 

  	// Read data.
  	const luaData = parsePicoCADData(dataStr);
  	const objects = parseLuaData(luaData);

  	// Read texture.
  	const texIndices = parseTexture(readLine(texStr)[1]);

  	// Done!
  	return new PicoCADModel(objects, {
  		name: fileName,
  		alphaIndex: alphaIndex,
  		backgroundIndex: bgIndex,
  		zoomLevel: bestZoom,
  		texture: texIndices,
  	});
  }

  /**
   * @param {import("./model-data-parser").LuaPicoCADModel} lua 
   * @returns {PicoCADModelObject[]}
   */
  function parseLuaData(lua) {
  	return lua.array.map(luaObject => {
  		const name = luaObject.dict.name;
  		const pos = luaObject.dict.pos.array;
  		const rot = luaObject.dict.rot.array;

  		const vertices = luaObject.dict.v.array.map(la => la.array);

  		const faces = luaObject.dict.f.array.map(luaFace => {
  			const indices = luaFace.array.map(x => x - 1);
  			const color = luaFace.dict.c;

  			const flatUVs = luaFace.dict.uv.array;
  			const uvs = [];
  			for (let i = 1; i < flatUVs.length; i += 2) {
  				uvs.push([
  					flatUVs[i - 1],
  					flatUVs[i],
  				]);
  			}

  			return new PicoCADModelFace(indices, color, uvs, {
  				shading: luaFace.dict.noshade !== 1,
  				texture: luaFace.dict.notex !== 1,
  				doubleSided: luaFace.dict.dbl === 1,
  				renderFirst: luaFace.dict.prio === 1,
  			});
  		});

  		return new PicoCADModelObject(name, pos, rot, vertices, faces);
  	});
  }

  /**
   * @param {string} s 
   * @returns {number[]}
   */
  function parseTexture(s) {
  	const indices = /** @type {number[]} */(Array(15360));

  	let i = 0;
  	let line;
  	for (let y = 0; y < 120; y++) {
  		[line, s] = readLine(s);

  		for (let x = 0; x < 128; x++) {
  			indices[i] = Number.parseInt(line.charAt(x), 16);
  			i++;
  		}
  	}

  	return indices;
  }

  class PicoCADViewer {
  	/**
  	 * @param {object} [options]
  	 * @param {HTMLCanvasElement} [options.canvas] The canvas to render to. If not provided one will be created.
  	 * @param {number} [options.fov] The camera FOV (degrees). Defaults to 90;
  	 * @param {boolean} [options.drawWireframe] If the wireframe should be drawn. Defaults to false.
  	 * @param {number[]} [options.wireframeColor] The wireframe color as [R, G, B] (each component [0, 1]). Defaults to white.
  	 * @param {number[]} [options.wireframeXray] If the wireframe should be drawn "through" the model. Defaults to true.
  	 * @param {number} [options.tesselationCount] Quads can be tessellated to reduce the effect of UV distortion. Pass 1 or less to do no tessellation. Defaults to 3.
  	 * @param {boolean} [options.shading] If all faces should be draw without lighting. Defaults to true.
  	 * @param {PicoCADRenderMode} [options.renderMode] The style draw the model. Defaults to "texture".
  	 * @param {{x: number, y: number, z: number}} [options.lightDirection] Defaults to {x: 1, y: -1, z: 0}.
  	 * @param {{width: number, height: number, scale?: number}} [options.resolution] Defaults to {width: 128, height: 128, scale: 1}.
  	 * @param {boolean} [options.preserveDrawingBuffer] If the true, the browser will not clear the buffer after drawing as completed. This is needed for `getPixelIndices` to work asynchronously. May have performance impact. Defaults to false.
  	 */
  	constructor(options={}) {
  		this.canvas = options.canvas;
  		if (this.canvas == null) {
  			this.canvas = document.createElement("canvas");
  		}

  		/** The webGL rendering context. */
  		const gl = this.gl = this.canvas.getContext("webgl", {
  			antialias: false,
  			preserveDrawingBuffer: options.preserveDrawingBuffer ?? false,
  		});
  		
  		/** Camera position in scene. */
  		this.cameraPosition = {
  			x: 0,
  			y: 0,
  			z: 0,
  		};

  		/** Camera rotation as Euler angles (radians). */
  		this.cameraRotation = {
  			x: 0,
  			y: 0,
  			z: 0,
  		};

  		/** The camera field-of-view in degrees. */
  		this.cameraFOV = options.fov ?? 90;

  		/** If a model has been loaded. */
  		this.loaded = false;
  		/** The current loaded model. @type {PicoCADModel} */
  		this.model = null;
  		/** The current loaded texture as an image. See `viewer.model.texture` for the raw indices. @type {ImageData} */
  		this.modelTexture = null;

  		/** If the model should be drawn with lighting. */
  		this.shading = options.shading ?? true;
  		/** The style draw the model. */
  		this.renderMode = options.renderMode ?? "texture";
  		/** If the wireframe should be drawn. */
  		this.drawWireframe = options.drawWireframe ?? false;
  		/** If the wireframe should be drawn "through" the model. */
  		this.wireframeXray = options.wireframeXray ?? true;
  		/** The wireframe color as [R, G, B] (each component [0, 1]). */
  		this.wireframeColor = options.wireframeColor ?? [1, 1, 1];
  		/** Quads can be tessellated to reduce the effect of UV distortion. Pass 0 to do no tessellation. */
  		this.tesselationCount = options.tesselationCount ?? 3;
  		/** The lighting direction. Does not have to be normalized. */
  		this.lightDirection = options.lightDirection ?? {x: 1, y: -1, z: 0};

  		/** @private @type {Pass[]} */
  		this._passes = [];
  		/** @private @type {WebGLTexture} */
  		this._mainTex = null;
  		/** @private @type {WebGLTexture} */
  		this._indexTex = null;
  		/** @private */
  		this._lightMapTex = this._createTexture(null, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, createTextureLightMap());
  		/** @private */
  		this._colorLightMapTex = this._createTexture(null, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, createColorLightMap());
  		/** @private */
  		this._programTexture = createTextureProgram(gl);
  		/** @private */
  		this._programUnlitTexture = createUnlitTextureProgram(gl);
  		/** @private @type {WirePass} */
  		this._wireframe = null;
  		/** @private */
  		this._programWireframe = createWireframeProgram(gl);

  		// Handle pixel scaling.
  		if (isSafari) {
  			// Safari does not support `image-rendering: pixelated` on a WebGL canvas.
  			// Need to render to a texture, then draw that scaled up texture to the screen.
  			/** @private */
  			this._programFramebuffer = createFramebufferProgram(gl);

  			/** @private */
  			this._depthBuffer = gl.createRenderbuffer();

  			/** @private */
  			this._frameBuffer = gl.createFramebuffer();

  			/** @private */
  			this._screenQuads = gl.createBuffer();
  			gl.bindBuffer(gl.ARRAY_BUFFER, this._screenQuads);
  			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
  				-1, -1,
  				+1, -1,
  				-1, +1,
  				-1, +1,
  				+1, -1,
  				+1, +1,
  			]), gl.STATIC_DRAW);
  		} else {
  			const className = "pico-cad-viewport";

  			this.canvas.classList.add(className);

  			/** @private */
  			this._style = document.createElement("style");
  			this._style.textContent = `.${className} { image-rendering: -moz-crisp-edges; image-rendering: pixelated; }`;
  			document.head.append(this._style);
  		}

  		// Set resolution. Internally this will also setup Safari framebuffers.
  		const res = options.resolution;
  		if (res == null) {
  			this.setResolution(128, 128, 1);
  		} else {
  			this.setResolution(res.width, res.height, res.scale ?? 1);
  		}

  		// Init GL.
  		gl.enable(gl.DEPTH_TEST);
  		gl.depthFunc(gl.LEQUAL);
  	}

  	/**
  	 * Set the size and scale of the viewport.
  	 * @param {number} width 
  	 * @param {number} height 
  	 * @param {number} [scale] The level of scaling, e.g. '3' means three times as big as the native resolution.
  	 */
  	setResolution(width, height, scale=1) {
  		if (this._resolution != null && this._resolution[0] === width && this._resolution[1] === height && this._resolution[2] === scale) return;
  		this._resolution = [width, height, scale, 0, 0];

  		const widthScreen = width * scale;
  		const heightScreen = height * scale;

  		const gl = this.gl;
  		const canvas = this.canvas;

  		if (isSafari) {
  			canvas.width = widthScreen;
  			canvas.height = heightScreen;

  			// Update framebuffer resolution.
  			/** @private */
  			this._frameBufferTex = this._createTexture(this._frameBufferTex, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, null, width, height);

  			gl.bindRenderbuffer(gl.RENDERBUFFER, this._depthBuffer);
  			gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);

  			gl.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);
  			gl.framebufferTexture2D(
  				gl.FRAMEBUFFER,
  				gl.COLOR_ATTACHMENT0,
  				gl.TEXTURE_2D,
  				this._frameBufferTex,
  				0,
  			);
  			gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this._depthBuffer);
  		} else {
  			canvas.width = width;
  			canvas.height = height;
  		}

  		canvas.style.width = `${widthScreen}px`;
  		canvas.style.height = `${heightScreen}px`;
  	}

  	getResolution() {
  		return {
  			width: this._resolution[0],
  			height: this._resolution[1],
  			scale: this._resolution[2],
  		};
  	}

  	/**
  	 * Creates a nearest neighbor texture with the given formats.
  	 * @private
  	 * @param {WebGLTexture} tex 
  	 * @param {number} internalFormat 
  	 * @param {number} format 
  	 * @param {number} type 
  	 * @param {TexImageSource|ArrayBufferView} source
  	 * @param {number} [width]
  	 * @param {number} [height]
  	 */
  	_createTexture(tex, internalFormat, format, type, source, width, height) {
  		const gl = this.gl;

  		if (tex == null) {
  			tex = gl.createTexture();
  		}

  		gl.bindTexture(gl.TEXTURE_2D, tex);

  		if (width == null) {
  			gl.texImage2D(
  				gl.TEXTURE_2D,
  				0,
  				internalFormat,
  				format,
  				type,
  				/** @type {TexImageSource} */(source)
  			);
  		} else {
  			gl.texImage2D(
  				gl.TEXTURE_2D,
  				0,
  				internalFormat,
  				width,
  				height,
  				0,
  				format,
  				type,
  				/** @type {ArrayBufferView} */(source)
  			);
  		}
  		
  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  		return tex;
  	}

  	/**
  	 * Load a picoCAD model.
  	 * @param {PicoCADSource} model The string can be a file's contents or a URL to a file.
  	 * @returns {Promise<PicoCADModel>}
  	 */
  	async load(model) {
  		if (typeof model === "string") {
  			if (model.startsWith("picocad;")) {
  				this._loadString(model);
  			} else {
  				await this._loadUrl(model);
  			}
  		} else if (model instanceof URL) {
  			await this._loadUrl(model);
  		} else if (model instanceof Blob) {
  			await this._loadBlob(model);
  		} else if (model instanceof PicoCADModel) {
  			this._loadModel(model);
  		} else {
  			throw TypeError();
  		}

  		return this.model;
  	}

  	/**
  	 * @private
  	 * @param {string | URL} url 
  	 */
  	async _loadUrl(url) {
  		const response = await fetch(String(url));

  		if (response.ok) {
  			this._loadString(await response.text());
  		} else {
  			throw Error(`${response.status}: ${response.statusText}`);
  		}
  	}
  	
  	/**
  	 * @private
  	 * @param {Blob} blob 
  	 */
  	_loadBlob(blob) {
  		return new Promise((resolve, reject) => {
  			if (!blob.type.startsWith("text")) {
  				throw Error("picoCAD file must be a text file");
  			}
  	
  			const fr = new FileReader();
  			fr.onload = () => {
  				resolve(this._loadString(/** @type {string} */(fr.result)));
  			};
  			fr.onerror = () => {
  				reject(fr.error);
  			};
  			fr.readAsText(blob);
  		});
  	}

  	/**
  	 * @private
  	 * @param {string} source
  	 */
  	_loadString(source) {
  		this._loadModel(parsePicoCADModel(source));
  	}

  	/**
  	 * @private
  	 * @param {PicoCADModel} model
  	 */
  	_loadModel(model) {
  		const gl = this.gl;

  		this.loaded = false;
  		this.model = null;

  		// Free old model resources.
  		if (this.loaded) {
  			for (const pass of this._passes) {
  				pass.free();
  			}
  			this._passes = [];

  			this._wireframe.free();

  			gl.deleteTexture(this._mainTex);
  			this._mainTex = null;

  			gl.deleteTexture(this._indexTex);
  			this._indexTex = null;
  		}

  		// Prepare model for WebGL rendering.
  		const rendering = prepareModelForRendering(gl, model, this.tesselationCount);

  		this._passes = rendering.passes;
  		this._wireframe = rendering.wireframe;
  		this._mainTex = this._createTexture(this._mainTex, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, rendering.texture);
  		this._indexTex = this._createTexture(this._indexTex, gl.LUMINANCE, gl.LUMINANCE, gl.UNSIGNED_BYTE, new Uint8Array(rendering.textureIndices), 128, 128);
  		this.modelTexture = rendering.texture;

  		this.loaded = true;
  		this.model = model;
  	}

  	/**
  	 * Draw the scene once.
  	 */
  	draw() {
  		const doDrawModel = this.renderMode !== "none";
  		const forceColor = this.renderMode === "color";

  		if (!this.loaded || (!doDrawModel && !this.drawWireframe)) {
  			return;
  		}

  		const gl = this.gl;
  		const canvas = this.canvas;

  		// Set viewport and framebuffer.
  		if (isSafari) {
  			gl.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);

  			gl.viewport(0, 0, this._resolution[0], this._resolution[1]);
  		} else {
  			gl.viewport(0, 0, canvas.width, canvas.height);
  		}

  		// Clear screen.
  		const bgColor = this.model.backgroundColor();

  		gl.clearColor(bgColor[0] / 255, bgColor[1] / 255, bgColor[2] / 255, 1);
  		gl.clearDepth(1.0); 
  		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  		// Setup camera
  		const mat = create$1();
  		perspective(
  			mat,
  			this.cameraFOV * Math.PI / 180,
  			this._resolution[0] / this._resolution[1],
  			0.1,
  			400,
  		);
  		rotateX$1(mat, mat, this.cameraRotation.x);
  		rotateY$1(mat, mat, this.cameraRotation.y);
  		rotateZ$1(mat, mat, this.cameraRotation.z);
  		translate(mat, mat, [ this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z ]);

  		// Setup lighting
  		const lightVector = normalized(this.lightDirection);

  		// Draw model
  		if (doDrawModel) {
  			// Render each pass
  			for (const pass of this._passes) {
  				if (pass.clearDepth) {
  					gl.clear(gl.DEPTH_BUFFER_BIT);
  				}

  				if (pass.isEmpty()) {
  					continue;
  				}

  				const useColor = forceColor || !pass.texture;
  				const programInfo = (this.shading && pass.shading) ? this._programTexture : this._programUnlitTexture;

  				programInfo.program.use();

  				// Uniforms
  				gl.uniformMatrix4fv(
  					programInfo.locations.mvp,
  					false,
  					mat,
  				);

  				// Vertex and UV attrib
  				gl.bindBuffer(gl.ARRAY_BUFFER, pass.vertexBuffer);
  				gl.vertexAttribPointer(
  					programInfo.program.vertexLocation,
  					3,
  					gl.FLOAT,
  					false,
  					0,
  					0,
  				);
  				gl.enableVertexAttribArray(programInfo.program.vertexLocation);

  				gl.bindBuffer(gl.ARRAY_BUFFER, useColor ? pass.colorUVBuffer : pass.uvBuffer);
  				gl.vertexAttribPointer(
  					programInfo.locations.uv,
  					2,
  					gl.FLOAT,
  					false,
  					0,
  					0,
  				);
  				gl.enableVertexAttribArray(programInfo.locations.uv);

  				// Shader specific data
  				if (programInfo === this._programUnlitTexture) {
  					// Main texture
  					gl.activeTexture(gl.TEXTURE0);
  					gl.bindTexture(gl.TEXTURE_2D, this._mainTex);
  					gl.uniform1i(programInfo.locations.mainTex, 0);
  				} else if (programInfo === this._programTexture) {
  					// Index texture
  					gl.activeTexture(gl.TEXTURE0);
  					gl.bindTexture(gl.TEXTURE_2D, this._indexTex);
  					gl.uniform1i(programInfo.locations.indexTex, 0);

  					// Light-map texture
  					gl.activeTexture(gl.TEXTURE1);
  					gl.bindTexture(gl.TEXTURE_2D, useColor ? this._colorLightMapTex : this._lightMapTex);
  					gl.uniform1i(programInfo.locations.lightMap, 1);

  					// Light map curve
  					gl.uniform1f(programInfo.locations.lightMapOffset, useColor ? -0.316326530612245 : -0.3571428571428572);
  					gl.uniform1f(programInfo.locations.lightMapGradient, useColor ? 1.63265306122449 : 2.857142857142857);

  					// Light direction
  					gl.uniform3f(programInfo.locations.lightDir, lightVector.x, lightVector.y, lightVector.z);

  					// Normal attrib
  					gl.bindBuffer(gl.ARRAY_BUFFER, pass.normalBuffer);
  					gl.vertexAttribPointer(
  						programInfo.locations.normal,
  						3,
  						gl.FLOAT,
  						false,
  						0,
  						0,
  					);
  					gl.enableVertexAttribArray(programInfo.locations.normal);
  				}

  				// Configure culling
  				if (pass.cull) {
  					gl.enable(gl.CULL_FACE);
  				} else {
  					gl.disable(gl.CULL_FACE);
  				}

  				// Draw!
  				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pass.triangleBuffer);

  				gl.drawElements(gl.TRIANGLES, pass.vertexCount, gl.UNSIGNED_SHORT, 0);

  				// Clean up attributes
  				gl.disableVertexAttribArray(programInfo.program.vertexLocation);
  				gl.disableVertexAttribArray(programInfo.locations.uv);
  				
  				if (programInfo === this._programTexture) {
  					gl.disableVertexAttribArray(programInfo.locations.normal);
  				}
  			}
  		}

  		// Draw wireframe
  		if (this.drawWireframe) {
  			if (doDrawModel && this.wireframeXray) {
  				gl.clear(gl.DEPTH_BUFFER_BIT);
  			}

  			this._programWireframe.program.use();

  			// Uniforms
  			gl.uniformMatrix4fv(
  				this._programWireframe.locations.mvp,
  				false,
  				mat,
  			);

  			gl.uniform4fv(
  				this._programWireframe.locations.color,
  				[
  					this.wireframeColor[0],
  					this.wireframeColor[1],
  					this.wireframeColor[2],
  					1
  				],
  			);

  			// Bind vertex data
  			gl.bindBuffer(gl.ARRAY_BUFFER, this._wireframe.vertexBuffer);
  			gl.vertexAttribPointer(
  				this._programWireframe.program.vertexLocation,
  				3,
  				gl.FLOAT,
  				false,
  				0,
  				0,
  			);
  			gl.enableVertexAttribArray(this._programWireframe.program.vertexLocation);

  			gl.drawArrays(gl.LINES, 0, this._wireframe.vertexCount);
  		}

  		// Render framebuffer to canvas.
  		if (isSafari) {
  			gl.bindFramebuffer(gl.FRAMEBUFFER, null);

  			gl.viewport(0, 0, canvas.width, canvas.height);

  			this._programFramebuffer.program.use();

  			gl.activeTexture(gl.TEXTURE0);
  			gl.bindTexture(gl.TEXTURE_2D, this._frameBufferTex);
  			gl.uniform1i(this._programFramebuffer.locations.mainTex, 0);

  			gl.bindBuffer(gl.ARRAY_BUFFER, this._screenQuads);
  			gl.vertexAttribPointer(
  				this._programFramebuffer.program.vertexLocation,
  				2,
  				gl.FLOAT,
  				false,
  				0,
  				0,
  			);
  			gl.enableVertexAttribArray(this._programFramebuffer.program.vertexLocation);

  			gl.drawArrays(gl.TRIANGLES, 0, 6);
  		}
  	}

  	/**
  	 * @param {(dt: number) => void} [preDrawCallback] Called before the start of every draw. `dt` is the seconds since last draw.
  	 * @param {(dt: number) => void} [postDrawCallback] Called after every draw. `dt` is the seconds since last draw completed.
  	 */
  	startDrawLoop(preDrawCallback, postDrawCallback) {
  		let then = performance.now();
  		let drawThen = then;

  		const loop = () => {
  			if (preDrawCallback != null) {
  				const now = performance.now();
  				const dt = (now - then) / 1000;
  				preDrawCallback(dt);
  				then = now;
  			}

  			this.draw();

  			if (postDrawCallback != null) {
  				const now = performance.now();
  				const dt = (now - drawThen) / 1000;
  				postDrawCallback(dt);
  				drawThen = now;
  			}

  			/** @private */
  			this._rafID = requestAnimationFrame(loop);
  		};
  		this._rafID = requestAnimationFrame(loop);
  	}

  	stopDrawLoop() {
  		if (this._rafID != null) {
  			cancelAnimationFrame(this._rafID);
  		}
  	}

  	getCameraRight() {
  		return this._transformDirection(1, 0, 0);
  	}
  	getCameraUp() {
  		return this._transformDirection(0, -1, 0);
  	}
  	getCameraForward() {
  		return this._transformDirection(0, 0, -1);
  	}

  	/**
  	 * Set the light direction from the camera, matching native picoCAD's shading.
  	 */
  	setLightDirectionFromCamera() {
  		const du = 0.4;
  		const up = this.getCameraUp();
  		const forward = this.getCameraForward();

  		this.lightDirection = {
  			x: forward.x - up.x * du,
  			y: forward.y - up.y * du,
  			z: forward.z - up.z * du,
  		};
  	}

  	/**
  	 * The number of colors used in the texture.
  	 * (There may more used by face colors.)
  	 */
  	getTextureColorCount(includeAlpha=false) {
  		/** @type {boolean[]} */
  		const flags = Array(16).fill(false);
  		let count = 0;

  		for (const index of this.model.texture) {
  			if (!flags[index]) {
  				flags[index] = true;
  				count++;
  			}
  		}

  		return count;
  	}

  	getTriangleCount() {
  		let count = 0;
  		for (const pass of this._passes) {
  			count += Math.floor(pass.vertexCount / 3);
  		}
  		return count;
  	}

  	getDrawCallCount() {
  		let count = 0;
  		for (const pass of this._passes) {
  			if (!pass.isEmpty()) count++;
  		}
  		if (this.drawWireframe) count++;
  		if (isSafari) count++;
  		return count;
  	}

  	/**
  	 * @param {number} x
  	 * @param {number} y
  	 * @param {number} z
  	 * @returns {{x: number, y: number, z: number}}
  	 * @private
  	 */
  	_transformDirection(x, y, z) {
  		const vec = create();
  		set(vec, x, y, z);

  		const zero$1 = zero(create());

  		rotateX(vec, vec, zero$1, Math.PI + this.cameraRotation.x);
  		rotateY(vec, vec, zero$1, this.cameraRotation.y);
  		rotateZ(vec, vec, zero$1, Math.PI + this.cameraRotation.z);

  		return {
  			x: vec[0],
  			y: vec[1],
  			z: vec[2],
  		};
  	}

  	/**
  	 * Set the camera rotation and position to look at the model a certain radius from the center.
  	 * @param {number} radius 
  	 * @param {number} spin The horizontal position (radians).
  	 * @param {number} roll The vertical position (radians).
  	 * @param {{x: number, y: number, z: number}} [center] Defaults to {x: 0, y: 1.5, z: 0}
  	 */
  	setTurntableCamera(radius, spin, roll, center={ x: 0, y: 1.5, z: 0}) {
  		const a = Math.PI - spin;
  		roll = -roll;

  		this.cameraPosition = {
  			x: radius * Math.cos(roll) * Math.sin(a) - center.x,
  			y: radius * Math.sin(roll) - center.y,
  			z: radius * Math.cos(roll) * Math.cos(a) - center.z,
  		};
  		this.cameraRotation = {
  			y: spin,
  			x: -roll,
  			z: 0,
  		};
  	}

  	/**
  	 * Get the rendered pixels as PICO-8 indices (top to bottom, left to right).
  	 * 
  	 * By default this only works if called right after the frame is drawn (e.g. after `draw()` or in the post draw callback of `startDrawLoop()`).
  	 * 
  	 * Set `preserveDrawingBuffer: true` in the viewer options to allow calling this method asynchronously.
  	 * @param {number} [scale] Upscale by repeating indices. Defaults to 1.
  	 * @returns {Uint8Array}
  	 */
  	getPixelIndices(scale=1) {
  		const gl = this.gl;
  		const [width, height] = this._resolution;
  		const count = width * height;
  		const outWidth1 = width * scale;
  		const outWidth2 = outWidth1 * scale;
  		const scaleMultiple = scale * scale;
  		scale = Math.max(1, Math.floor(scale));

  		const buffer = new Uint8Array(count * 4);
  		
  		if (isSafari) {
  			gl.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);
  		}

  		gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, buffer);

  		if (isSafari) {
  			gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  		}

  		// Just use green channel to map from color => index.
  		// (Each green value is unique except for black/red both 0).
  		const greens = PICO_COLORS.map(color => color[1]);

  		// Convert.
  		// Note the WebGL buffer is top to bottom.
  		const indices = new Uint8Array(count * scaleMultiple);

  		let bufRowIndex = (count - width) * 4;
  		let outRowIndex = 0;

  		for (let y = 0; y < height; y++) {
  			let bufIndex = bufRowIndex;
  			let outIndex = outRowIndex;

  			for (let x = 0; x < width; x++) {
  				const r = buffer[bufIndex];
  				const g = buffer[bufIndex + 1];
  				const index = (r === 0 && g === 0) ? 0 : greens.indexOf(g, 1);

  				if (scale === 1) {
  					indices[outIndex] = index;
  				} else {
  					// Repeat index in square region.
  					let outIndexLoc = outIndex;
  					for (let sy = 0; sy < scale; sy++) {
  						for (let sx = 0; sx < scale; sx++) {
  							indices[outIndexLoc + sx] = index;
  						}
  						outIndexLoc += outWidth1;
  					}
  				}
  				
  				outIndex += scale;
  				bufIndex += 4;
  			}

  			bufRowIndex -= width * 4;
  			outRowIndex += outWidth2;
  		}

  		return indices;
  	}

  	/**
  	 * Frees resources used by this viewer.
  	 */
  	free() {
  		const gl = this.gl;
  		
  		this.stopDrawLoop();

  		for (const pass of this._passes) {
  			pass.free();
  		}
  		this._passes = [];

  		gl.deleteTexture(this._lightMapTex);
  		gl.deleteTexture(this._colorLightMapTex);
  		gl.deleteTexture(this._mainTex);
  		gl.deleteTexture(this._indexTex);
  		this._lightMapTex = null;
  		this._colorLightMapTex = null;
  		this._mainTex = null;
  		this._indexTex = null;

  		this._programTexture.program.free();
  		this._programWireframe.program.free();
  		this._programTexture = null;
  		this._programWireframe = null;

  		if (isSafari) {
  			gl.deleteFramebuffer(this._frameBuffer);
  			gl.deleteTexture(this._frameBufferTex);
  			gl.deleteBuffer(this._screenQuads);
  			gl.deleteRenderbuffer(this._depthBuffer);
  			this._programFramebuffer.program.free();
  			this._frameBuffer = null;
  			this._frameBufferTex = null;
  			this._screenQuads = null;
  			this._depthBuffer = null;
  			this._programFramebuffer = null;
  		}
  	}
  }

  /**
   * @param {WebGLRenderingContext} gl 
   */
   function createTextureProgram(gl) {
  	const program = new ShaderProgram(gl, `
		attribute vec4 vertex;
		attribute vec3 normal;
		attribute vec2 uv;

		varying highp vec2 v_uv;
		varying highp vec3 v_normal;

		uniform mat4 mvp;

		void main() {
			v_normal = normal;
			v_uv = uv;
			gl_Position = mvp * vertex;
		}
	`, `
		varying highp vec2 v_uv;
		varying highp vec3 v_normal;
		
		uniform sampler2D indexTex;
		uniform sampler2D lightMap;
		uniform highp vec3 lightDir;
		uniform highp float lightMapOffset;
		uniform highp float lightMapGradient;

		void main() {
			highp float index = texture2D(indexTex, v_uv).r;
			if (index == 1.0) discard;
			// highp float intensity = clamp(4.0 * abs(dot(v_normal, lightDir)) - 1.0, 0.0, 1.0);
			highp float intensity = clamp(lightMapGradient * abs(dot(v_normal, lightDir)) + lightMapOffset, 0.0, 1.0);
			gl_FragColor = texture2D(lightMap, vec2(index * 15.9375 + mod(gl_FragCoord.x + gl_FragCoord.y, 2.0) * 0.03125, 1.0 - intensity));
		}
	`);
  	
  	return {
  		program: program,
  		locations: {
  			uv: program.getAttribLocation("uv"),
  			normal: program.getAttribLocation("normal"),
  			indexTex: program.getUniformLocation("indexTex"),
  			lightMap: program.getUniformLocation("lightMap"),
  			lightDir: program.getUniformLocation("lightDir"),
  			mvp: program.getUniformLocation("mvp"),
  			lightMapOffset: program.getUniformLocation("lightMapOffset"),
  			lightMapGradient: program.getUniformLocation("lightMapGradient"),
  		}
  	};
  }


  /**
   * @param {WebGLRenderingContext} gl 
   */
   function createUnlitTextureProgram(gl) {
  	const program = new ShaderProgram(gl, `
		attribute vec4 vertex;
		attribute vec2 uv;

		varying highp vec2 v_uv;

		uniform mat4 mvp;

		void main() {
			v_uv = uv;
			gl_Position = mvp * vertex;
		}
	`, `
		varying highp vec2 v_uv;
		
		uniform sampler2D mainTex;

		void main() {
			lowp vec4 color = texture2D(mainTex, v_uv);
			if (color.a == 0.0) discard;
			gl_FragColor = color;
		}
	`);
  	
  	return {
  		program: program,
  		locations: {
  			uv: program.getAttribLocation("uv"),
  			mvp: program.getUniformLocation("mvp"),
  			mainTex: program.getUniformLocation("mainTex"),
  		}
  	};
  }

  /**
   * @param {WebGLRenderingContext} gl 
   */
   function createWireframeProgram(gl) {
  	const program = new ShaderProgram(gl, `
		attribute vec4 vertex;

		uniform mat4 mvp;

		void main() {
			gl_Position = mvp * vertex;
		}
	`, `
		uniform lowp vec4 color;

		void main() {
			gl_FragColor = color;
		}
	`);
  	
  	return {
  		program: program,
  		locations: {
  			mvp: program.getUniformLocation("mvp"),
  			color: program.getUniformLocation("color"),
  		}
  	};
  }

  /**
   * @param {WebGLRenderingContext} gl 
   */
   function createFramebufferProgram(gl) {
  	const program = new ShaderProgram(gl, `
		attribute vec4 vertex;

		varying highp vec2 v_uv;

		void main() {
			v_uv = 0.5 + vertex.xy * 0.5;
			gl_Position = vertex;
		}
	`, `
		varying highp vec2 v_uv;
		
		uniform sampler2D mainTex;

		void main() {
			gl_FragColor = texture2D(mainTex, v_uv);
		}
	`);
  	
  	return {
  		program: program,
  		locations: {
  			mainTex: program.getUniformLocation("mainTex"),
  		}
  	};
  }

  /**
   * @param {{x: number, y: number, z: number}} vec 
   */
  function normalized(vec) {
  	let len = Math.hypot(vec.x, vec.y, vec.z);
  	if (len === 0) len = 1;
  	return {
  		x: vec.x / len,
  		y: vec.y / len,
  		z: vec.z / len,
  	};
  }

  /** @typedef {string | URL | Blob | PicoCADModel} PicoCADSource */
  /** @typedef {"texture" | "color" | "none"} PicoCADRenderMode */

  /*
   * @license
   * Adapted from lzwCompress.js
   *
   * Copyright (c) 2012-2021 floydpink
   * Licensed under the MIT license.
   */
  const _self = {};

  // KeyOptimize
  // http://stackoverflow.com/questions/4433402/replace-keys-json-in-javascript
  (function (self) {
  	let _keys = [];
  	const comparer = function (key) {
  			return function (e) {
  				return e === key;
  			};
  		},
  		inArray = function (array, comparer) {
  			for (let i = 0; i < array.length; i++) {
  				if (comparer(array[i])) {
  					return true;
  				}
  			}
  			return false;
  		},
  		pushNew = function (array, element, comparer) {
  			if (!inArray(array, comparer)) {
  				array.push(element);
  			}
  		},
  		_extractKeys = function (obj) {
  			if (typeof obj === 'object') {
  				for (let key in obj) {
  					if (!Array.isArray(obj)) {
  						pushNew(_keys, key, comparer(key));
  					}
  					_extractKeys(obj[key]);
  				}
  			}
  		},
  		_encode = function (obj) {
  			if (typeof obj !== 'object') {
  				return obj;
  			}
  			for (let prop in obj) {
  				if (!Array.isArray(obj)) {
  					if (obj.hasOwnProperty(prop)) {
  						obj[_keys.indexOf(prop)] = _encode(obj[prop]);
  						delete obj[prop];
  					}
  				} else {
  					obj[prop] = _encode(obj[prop]);
  				}
  			}
  			return obj;
  		},
  		_decode = function (obj) {
  			if (typeof obj !== 'object') {
  				return obj;
  			}
  			for (let prop in obj) {
  				if (!Array.isArray(obj)) {
  					if (obj.hasOwnProperty(prop) && _keys[prop]) {
  						obj[_keys[prop]] = _decode(obj[prop]);
  						delete obj[prop];
  					}
  				} else {
  					obj[prop] = _decode(obj[prop]);
  				}
  			}
  			return obj;
  		},
  		compress = function (json) {
  			_keys = [];
  			const jsonObj = JSON.parse(json);
  			_extractKeys(jsonObj);
  			return JSON.stringify({__k : _keys, __v : _encode(jsonObj)});
  		},
  		decompress = function (minifiedJson) {
  			const obj = minifiedJson;
  			if (typeof (obj) !== 'object') {
  				return minifiedJson;
  			}
  			if (!obj.hasOwnProperty('__k')) {
  				return JSON.stringify(obj);
  			}
  			_keys = obj.__k;
  			return _decode(obj.__v);
  		};

  	self.KeyOptimize = {
  		pack   : compress,
  		unpack : decompress
  	};
  }(_self));

  // LZWCompress
  // http://stackoverflow.com/a/2252533/218882
  // http://rosettacode.org/wiki/LZW_compression#JavaScript
  (function (self) {
  	const compress = function (uncompressed) {
  			if (typeof (uncompressed) !== 'string') {
  				return uncompressed;
  			}
  			let i;
  			const dictionary = Object.create(null);
  			let c,
  				wc,
  				w = '';
  			const result = [];
  			let dictSize = 256;
  			for (i = 0; i < 256; i += 1) {
  				dictionary[String.fromCharCode(i)] = i;
  			}
  			for (i = 0; i < uncompressed.length; i += 1) {
  				c = uncompressed.charAt(i);
  				wc = w + c;
  				if (dictionary[wc]) {
  					w = wc;
  				} else {
  					if (dictionary[w] === undefined) {
  						return uncompressed;
  					}
  					result.push(dictionary[w]);
  					dictionary[wc] = dictSize++;
  					w = String(c);
  				}
  			}
  			if (w !== '') {
  				result.push(dictionary[w]);
  			}
  			return result;
  		},
  		decompress = function (compressed) {
  			if (!Array.isArray(compressed)) {
  				return compressed;
  			}
  			let i;
  			const dictionary = [];
  			let w,
  				result,
  				k,
  				entry = '',
  				dictSize = 256;
  			for (i = 0; i < 256; i += 1) {
  				dictionary[i] = String.fromCharCode(i);
  			}
  			w = String.fromCharCode(compressed[0]);
  			result = w;
  			for (i = 1; i < compressed.length; i += 1) {
  				k = compressed[i];
  				if (dictionary[k]) {
  					entry = dictionary[k];
  				} else {
  					if (k === dictSize) {
  						entry = w + w.charAt(0);
  					} else {
  						return null;
  					}
  				}
  				result += entry;
  				dictionary[dictSize++] = w + entry.charAt(0);
  				w = entry;
  			}
  			return result;
  		};

  	self.LZWCompress = {
  		pack   : compress,
  		unpack : decompress
  	};
  }(_self));

  /**
   * @param {string} obj 
   * @returns {number[]}
   */
  function compress(obj) {
  	if (!obj || obj === true || obj instanceof Date) {
  		return obj;
  	}
  	let result = obj;
  	if (typeof obj === 'object') {
  		result = _self.KeyOptimize.pack(JSON.stringify(obj));
  	}
  	const packedObj = _self.LZWCompress.pack(result);
  	return packedObj;
  }

  /**
   * @param {number[]} compressedObj 
   * @returns {string}
   */
  function decompress(compressedObj) {
  	if (!compressedObj || compressedObj === true || compressedObj instanceof Date) {
  		return compressedObj;
  	}
  	let probableJSON, result = _self.LZWCompress.unpack(compressedObj);
  	try {
  		probableJSON = JSON.parse(result);
  	} catch (e) {
  		return result;
  	}
  	if (typeof probableJSON === 'object') {
  		result = _self.KeyOptimize.unpack(probableJSON);
  	}
  	return result;
  }

  /**
   * @param {PicoCADModel} model 
   * @returns {string}
   */
  function urlCompressModel(model) {
  	const bytes = modelToBytes(model);
  	console.log("binary: " + bytes.length + " bytes");

  	const lzw = compress(toByteString(bytes));

  	const lzwBitstream = lzwNumbersToBitStream(lzw);

  	let s = btoa(toByteString(lzwBitstream));

  	// trim "=" from end
  	let lastEq = s.indexOf("=", s.length - 4);
  	if (lastEq >= 0) s = s.slice(0, lastEq);
  	
  	return s;
  }

  /**
   * @param {string} s
   * @returns {PicoCADModel}
   */
  function urlDecompressModel(s) {
  	const lzwBitstream = fromByteString(atob(s));

  	const lzw = bitStreamToLZWNumbers(lzwBitstream);

  	const bytes = fromByteString(decompress(lzw));

  	return bytesToModel(bytes);
  }

  /**
   * @param {number[]} bytes 
   * @returns {string}
   */
  function toByteString(bytes) {
  	let s = "";
  	for (const byte of bytes) {
  		s += String.fromCharCode(byte);
  	}
  	return s;
  }

  /**
   * @param {string} s 
   * @returns {number[]}
   */
  function fromByteString(s) {
  	const bytes = Array(s.length);
  	for (let i = 0; i < s.length; i++) {
  		bytes[i] = s.charCodeAt(i);
  	}
  	return bytes;
  }


  // Encoding/Decoding

  const ENCODING_VERSION_1_0 = 1;

  const ALPHABET = "\0abcdefghijklmnopqrstuvwxyz0123456789_ ";

  const TEXTURE_ENCODING_RLE = 0;
  const TEXTURE_ENCODING_PACKED = 1;

  /**
   * @param {PicoCADModel} model 
   */
  function modelToBytes(model) {
  	// Utils
  	/**
  	 * @param {string} s
  	 */
  	function putPackedString(s) {
  		s = s.toLowerCase();

  		for (let i = 0; i < s.length; i++) {
  			const n = ALPHABET.indexOf(s.charAt(i));
  			if (n > 0) putPacked(n, 6);
  		}

  		putPacked(0, 6);
  	}

  	/**
  	 * @param {number[]} xs
  	 */
  	function putFloats(xs) {
  		for (const x of xs) {
  			putFloat(x);
  		}
  	}

  	/**
  	 * @param {number} x 
  	 */
  	function putFloat(x) {
  		const r = Math.round(x * 64) / 64;

  		if (r >= -16 && r <= 15.75 && Number.isInteger(r * 4)) {
  			bytes.push(192 + r * 4);
  		} else {
  			const n = 8192 + r * 64;
  			if (n >= 32768) throw Error(`can't encode float "${x}"`);

  			bytes.push((n & 65280) >> 8);
  			bytes.push((n & 255));
  		}
  	}

  	let packByte = 0;
  	let packIndex = 0;

  	function packEnd() {
  		if (packIndex > 0) {
  			bytes.push(packByte);
  		}
  		packByte = 0;
  		packIndex = 0;
  	}

  	/**
  	 * @param {number} x
  	 * @param {number} bits Bits per integer
  	 */
  	function putPacked(x, bits) {
  		for (let bit_i = 0; bit_i < bits; bit_i++) {
  			const bit = 1 << bit_i;
  			const b = (x & bit) >> bit_i;
  			
  			putPackedBit(b);
  		}
  	}

  	/**
  	 * @param {number} b 
  	 */
  	function putPackedBit(b) {
  		packByte += b << packIndex;
  		packIndex++;

  		if (packIndex >= 8) {
  			bytes.push(packByte);
  			packIndex = 0;
  			packByte = 0;
  		}
  	}


  	// Start encoding.
  	const bytes = /** @type {number[]} */([]);

  	// Put encoding version (future proofing).
  	bytes.push(ENCODING_VERSION_1_0);

  	//Put model meta.
  	putPackedString(model.name);

  	putPacked(model.zoomLevel, 7);
  	putPacked(model.backgroundIndex, 4);
  	putPacked(model.alphaIndex, 4);

  	packEnd();

  	// Put object data.
  	if (model.objects.length >= 256) throw Error("Too many objects");
  	bytes.push(model.objects.length);

  	for (const object of model.objects) {
  		putPackedString(object.name);
  		packEnd();
  		putFloats(object.position);

  		// Put vertices
  		if (object.vertices.length >= 256) throw Error("Too many vertices on object");
  		bytes.push(object.vertices.length);

  		for (const vertex of object.vertices) {
  			putFloats(vertex);
  		}

  		// Put faces
  		const bpi = bitsToStore(object.vertices.length - 1);

  		if (object.faces.length >= 256) throw Error("Too many faces on object");
  		bytes.push(object.faces.length);

  		for (const face of object.faces) {
  			// Put face meta
  			putPacked(face.colorIndex, 4);
  			putPackedBit(face.texture ? 1 : 0);
  			putPackedBit(face.shading ? 1 : 0);
  			putPackedBit(face.doubleSided ? 1 : 0);
  			putPackedBit(face.renderFirst ? 1 : 0);

  			// We know the max index value based on the number of vertices.
  			// So we can pack them more for smaller number of vertices.
  			for (const index of face.indices) {
  				putPacked(index, bpi);
  			}
  			putPacked(face.indices[0], bpi);

  			// UVs are usually between -1 and 17, at a 0.25 resolution.
  			// => ~72 possible values => 7bits per U/V value
  			if (face.texture) {
  				for (const uv of face.uvs) {
  					putPacked(32 + uv[0] * 4, 7);
  					putPacked(32 + uv[1] * 4, 7);
  				}
  			}
  		}

  		packEnd();
  	}

  	// Put texture data.
  	let final_i = model.texture.length - 1;
  	const finalIndex = model.texture[final_i];
  	while (final_i >= 1) {
  		if (model.texture[final_i - 1] === finalIndex) {
  			final_i--;
  		} else {
  			break;
  		}
  	}

  	/** @type {number[]} */
  	const rleBytes = [];

  	// generate 1byte per pixel w/ run length encoding
  	for (let i = 0; i <= final_i; ) {
  		const index = model.texture[i];
  		let repeats = 0;

  		i++;
  		while (i <= final_i) {
  			if (model.texture[i] === index) {
  				i++;
  				repeats++;
  				if (repeats == 15) break;
  			} else {
  				break;
  			}
  		}

  		rleBytes.push((index << 4) + repeats);
  	}

  	// Use run length encoding version if it's shorter!
  	if (rleBytes.length < final_i / 2) {
  		bytes.push(TEXTURE_ENCODING_RLE);

  		for (const byte of rleBytes) {
  			bytes.push(byte);
  		}
  	} else {
  		// 4bits per pixel
  		bytes.push(TEXTURE_ENCODING_PACKED);

  		if (final_i % 2 == 0) final_i++;

  		for (let i = 1; i <= final_i; i += 2) {
  			bytes.push((model.texture[i - 1] << 4) + model.texture[i]);
  		}
  	}

  	return bytes;
  }


  /**
   * @param {number[]} bytes 
   * @returns {PicoCADModel}
   */
   function bytesToModel(bytes) {
  	// Utils
  	function getPackedString() {
  		let s = "";

  		while (true) {
  			const n = getPacked(6);
  			if (n === 0) break;
  			if (n >= ALPHABET.length) throw Error("invalid encoded string");
  			s += ALPHABET.charAt(n);
  		}

  		return s;
  	}

  	/**
  	 * @returns {number}
  	 */
  	function getByte() {
  		if (byte_i < bytes.length) {
  			return bytes[byte_i++];
  		} else {
  			throw Error("unexpected of input");
  		}
  	}
  	
  	/**
  	 * @returns {number}
  	 */
  	function getOptionalByte() {
  		if (byte_i < bytes.length) {
  			return bytes[byte_i++];
  		} else {
  			return -1;
  		}
  	}

  	/**
  	 * @returns {number}
  	 */
  	function getFloat() {
  		const b0 = getByte();

  		if (b0 >= 128) {
  			return ((b0 & 127) - 64) / 4;
  		}
  		
  		const n = (b0 << 8) + getByte();

  		return (n - 8192) / 64;
  	}

  	/**
  	 * @param {number} n
  	 * @returns {number[]}
  	 */
  	function getFloats(n) {
  		const out = Array(n);
  		for (let i = 0; i < n; i++) {
  			out[i] = getFloat();
  		}
  		return out;
  	}

  	let packIndex = 0;

  	function packEnd() {
  		if (packIndex > 0) {
  			byte_i++;
  			packIndex = 0;
  		}
  	}

  	/**
  	 * @param {number} bits
  	 * @returns {number}
  	 */
  	function getPacked(bits) {
  		let byte = bytes[byte_i];
  		let packValue = 0;

  		for (let bit_i = 0; bit_i < bits; bit_i++) {
  			const bit = 1 << packIndex;
  			const b = (byte & bit) >> packIndex;
  			packValue += b << bit_i;
  			packIndex++;

  			if (packIndex >= 8) {
  				packIndex = 0;
  				byte_i++;
  				if (byte_i >= bytes.length) {
  					throw Error("Unexpected end of input");
  				}
  				byte = bytes[byte_i];
  			}
  		}

  		return packValue;
  	}


  	// Start decoding.
  	let byte_i = 0;

  	// Get encoding version (unused at the moment).
  	const encodingVersion = getByte();
  	if (encodingVersion !== ENCODING_VERSION_1_0) throw Error(`invalid encoding version ${encodingVersion}`);

  	// Get model meta.
  	const modelName = getPackedString();

  	const zoomLevel = getPacked(7);
  	const backgroundIndex = getPacked(4);
  	const alphaIndex = getPacked(4);

  	packEnd();

  	// Get object data.
  	const objectCount = getByte();
  	const objects = /** @type {PicoCADModelObject[]} */(Array(objectCount));

  	for (let object_i = 0; object_i < objectCount; object_i++) {
  		const objectName = getPackedString();
  		packEnd();
  		const objectPos = getFloats(3);

  		// Get vertices
  		const vertexCount = getByte();
  		const vertices = /** @type {number[][]} */(Array(vertexCount));

  		for (let vertex_i = 0; vertex_i < vertexCount; vertex_i++) {
  			vertices[vertex_i] = getFloats(3);
  		}

  		// Get faces
  		const bpi = bitsToStore(vertexCount - 1);
  		
  		const faceCount = getByte();

  		const faces = /** @type {PicoCADModelFace[]} */(Array(faceCount));

  		for (let face_i = 0; face_i < faceCount; face_i++) {
  			// Get face meta.
  			const colorIndex = getPacked(4);
  			const texture = getPacked(1) === 1;
  			const shading = getPacked(1) === 1;
  			const doubleSided = getPacked(1) === 1;
  			const renderFirst = getPacked(1) === 1;

  			// Get Indices.
  			const index0 = getPacked(bpi);
  			const indices = [index0];
  			while (true) {
  				const index = getPacked(bpi);
  				
  				if (index === index0) break;

  				indices.push(index);
  			}
  			const index_count = indices.length;
  			
  			// Get UVs
  			let uvs = /** @type {number[][]} */(Array(index_count));

  			if (texture) {
  				for (let uv_i = 0; uv_i < index_count; uv_i++) {
  					const p0 = getPacked(7);
  					const p1 = getPacked(7);

  					uvs[uv_i] = [
  						(p0 - 32) / 4,
  						(p1 - 32) / 4,
  					];
  				}
  			} else {
  				for (let uv_i = 0; uv_i < index_count; uv_i++) {
  					uvs[uv_i] = [0, 0];
  				}
  			}

  			faces[face_i] = new PicoCADModelFace(
  				indices,
  				colorIndex,
  				uvs,
  				{
  					texture: texture,
  					shading: shading,
  					doubleSided: doubleSided,
  					renderFirst: renderFirst,
  				}
  			);
  		}

  		packEnd();

  		// Got object!
  		objects[object_i] = new PicoCADModelObject(
  			objectName,
  			objectPos,
  			[0, 0, 0],
  			vertices,
  			faces,
  		);
  	}

  	// Get texture data.
  	const textureEncoding = getByte();

  	/** @type {number[]} */
  	let textureIndices = [];

  	if (textureEncoding === TEXTURE_ENCODING_RLE) {
  		for (let i = 0; i <= 15360; ) {
  			const byte = getOptionalByte();
  			if (byte < 0) break;

  			const index = (byte & 0b11110000) >> 4;
  			const count = (byte & 0b00001111) + 1;

  			for (let j = 0; j < count; j++) {
  				textureIndices.push(index);
  			}
  		}
  	} else if (textureEncoding === TEXTURE_ENCODING_PACKED) {
  		for (let i = 0; i < 7680; i++) {
  			const byte = getOptionalByte();
  			if (byte < 0) break;

  			textureIndices.push(
  				(byte & 0b11110000) >> 4,
  				byte & 0b1111,
  			);
  		}
  	} else {
  		throw Error(`Invalid texture encoding code: ${textureEncoding}`);
  	}

  	// Add repeated trailing index
  	if (textureIndices.length < 15360) {
  		const index = textureIndices[textureIndices.length - 1];

  		while (textureIndices.length < 15360) {
  			textureIndices.push(index);
  		}
  	}

  	// Done!
  	return new PicoCADModel(objects, {
  		name: modelName,
  		alphaIndex: alphaIndex,
  		backgroundIndex: backgroundIndex,
  		zoomLevel: zoomLevel,
  		texture: textureIndices,
  	});
  }

  /**
   * @param {number[]} xs 
   */
  function lzwNumbersToBitStream(xs) {
  	const bytes = [];
  	let byte = 0;
  	let byte_i = 0;

  	let maxSize = 512;
  	let bits = 9;

  	for (let i = 0; i < xs.length; i++) {
  		if (256 + i >= maxSize) {
  			bits++;
  			maxSize *= 2;
  		}

  		const x = xs[i];

  		for (let bit_i = 0; bit_i < bits; bit_i++) {
  			let bit = 1 << bit_i;
  			let b = (x & bit) >> bit_i;
  			byte += b << byte_i;
  			byte_i++;

  			if (byte_i >= 8) {
  				bytes.push(byte);
  				byte_i = 0;
  				byte = 0;
  			}
  		}
  	}

  	if (byte_i > 0) {
  		bytes.push(byte);
  	}

  	return bytes;
  }

  /**
   * @param {number[]} bytes 
   */
   function bitStreamToLZWNumbers(bytes) {
  	const xs = [];
  	let x = 0;
  	let x_i = 0;

  	let maxSize = 512;
  	let bits = 9;

  	for (let i = 0; i < bytes.length; i++) {
  		const byte = bytes[i];

  		for (let bit_i = 0; bit_i < 8; bit_i++) {
  			let bit = 1 << bit_i;
  			let b = (byte & bit) >> bit_i;
  			x += b << x_i;
  			x_i++;

  			if (x_i >= bits) {
  				xs.push(x);
  				x_i = 0;
  				x = 0;

  				if (256 + xs.length >= maxSize) {
  					bits++;
  					maxSize *= 2;
  				}
  			}
  		}
  	}

  	return xs;
  }

  /**
   * Get the min number of bits required to store `x`.
   * @param {number} x 
   */
  function bitsToStore(x) {
  	return Math.floor(Math.log2(x) + 1);
  }

  /*
  @licence https://github.com/mattdesl/gifenc
  The MIT License (MIT)
  Copyright (c) 2017 Matt DesLauriers

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
  OR OTHER DEALINGS IN THE SOFTWARE.
  */
  var X={signature:"GIF",version:"89a",trailer:59,extensionIntroducer:33,applicationExtensionLabel:255,graphicControlExtensionLabel:249,imageSeparator:44,signatureSize:3,versionSize:3,globalColorTableFlagMask:128,colorResolutionMask:112,sortFlagMask:8,globalColorTableSizeMask:7,applicationIdentifierSize:8,applicationAuthCodeSize:3,disposalMethodMask:28,userInputFlagMask:2,transparentColorFlagMask:1,localColorTableFlagMask:128,interlaceFlagMask:64,idSortFlagMask:32,localColorTableSizeMask:7};function F(t=256){let e=0,s=new Uint8Array(t);return {get buffer(){return s.buffer},reset(){e=0;},bytesView(){return s.subarray(0,e)},bytes(){return s.slice(0,e)},writeByte(r){n(e+1),s[e]=r,e++;},writeBytes(r,o=0,i=r.length){n(e+i);for(let c=0;c<i;c++)s[e++]=r[c+o];},writeBytesView(r,o=0,i=r.byteLength){n(e+i),s.set(r.subarray(o,o+i),e),e+=i;}};function n(r){var o=s.length;if(o>=r)return;var i=1024*1024;r=Math.max(r,o*(o<i?2:1.125)>>>0),o!=0&&(r=Math.max(r,256));let c=s;s=new Uint8Array(r),e>0&&s.set(c.subarray(0,e),0);}}var O=12,J=5003,lt=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535];function at(t,e,s,n,r=F(512),o=new Uint8Array(256),i=new Int32Array(J),c=new Int32Array(J)){let x=i.length,a=Math.max(2,n);o.fill(0),c.fill(0),i.fill(-1);let l=0,f=0,g=a+1,h=g,b=!1,w=h,_=(1<<w)-1,u=1<<g-1,k=u+1,B=u+2,p=0,A=s[0],z=0;for(let y=x;y<65536;y*=2)++z;z=8-z,r.writeByte(a),I(u);let d=s.length;for(let y=1;y<d;y++){t:{let m=s[y],v=(m<<O)+A,M=m<<z^A;if(i[M]===v){A=c[M];break t}let V=M===0?1:x-M;for(;i[M]>=0;)if(M-=V,M<0&&(M+=x),i[M]===v){A=c[M];break t}I(A),A=m,B<1<<O?(c[M]=B++,i[M]=v):(i.fill(-1),B=u+2,b=!0,I(u));}}return I(A),I(k),r.writeByte(0),r.bytesView();function I(y){for(l&=lt[f],f>0?l|=y<<f:l=y,f+=w;f>=8;)o[p++]=l&255,p>=254&&(r.writeByte(p),r.writeBytesView(o,0,p),p=0),l>>=8,f-=8;if((B>_||b)&&(b?(w=h,_=(1<<w)-1,b=!1):(++w,_=w===O?1<<w:(1<<w)-1)),y==k){for(;f>0;)o[p++]=l&255,p>=254&&(r.writeByte(p),r.writeBytesView(o,0,p),p=0),l>>=8,f-=8;p>0&&(r.writeByte(p),r.writeBytesView(o,0,p),p=0);}}}var $=at;function ct(t={}){let{initialCapacity:e=4096,auto:s=!0}=t,n=F(e),r=5003,o=new Uint8Array(256),i=new Int32Array(r),c=new Int32Array(r),x=!1;return {reset(){n.reset(),x=!1;},finish(){n.writeByte(X.trailer);},bytes(){return n.bytes()},bytesView(){return n.bytesView()},get buffer(){return n.buffer},get stream(){return n},writeHeader:a,writeFrame(l,f,g,h={}){let{transparent:b=!1,transparentIndex:w=0,delay:_=0,palette:u=null,repeat:k=0,colorDepth:B=8,dispose:p=-1}=h,A=!1;if(s?x||(A=!0,a(),x=!0):A=Boolean(h.first),f=Math.max(0,Math.floor(f)),g=Math.max(0,Math.floor(g)),A){if(!u)throw new Error("First frame must include a { palette } option");pt(n,f,g,u,B),it(n,u),k>=0&&dt(n,k);}let z=Math.round(_/10);wt(n,p,z,b,w);let d=Boolean(u)&&!A;ht(n,f,g,d?u:null),d&&it(n,u),yt(n,l,f,g,B,o,i,c);}};function a(){ft(n,"GIF89a");}}function wt(t,e,s,n,r){t.writeByte(33),t.writeByte(249),t.writeByte(4),r<0&&(r=0,n=!1);var o,i;n?(o=1,i=2):(o=0,i=0),e>=0&&(i=e&7),i<<=2;let c=0;t.writeByte(0|i|c|o),S(t,s),t.writeByte(r||0),t.writeByte(0);}function pt(t,e,s,n,r=8){let o=1,i=0,c=Z(n.length)-1,x=o<<7|r-1<<4|i<<3|c,a=0,l=0;S(t,e),S(t,s),t.writeBytes([x,a,l]);}function dt(t,e){t.writeByte(33),t.writeByte(255),t.writeByte(11),ft(t,"NETSCAPE2.0"),t.writeByte(3),t.writeByte(1),S(t,e),t.writeByte(0);}function it(t,e){let s=1<<Z(e.length);for(let n=0;n<s;n++){let r=[0,0,0];n<e.length&&(r=e[n]),t.writeByte(r[0]),t.writeByte(r[1]),t.writeByte(r[2]);}}function ht(t,e,s,n){if(t.writeByte(44),S(t,0),S(t,0),S(t,e),S(t,s),n){let r=0,o=0,i=Z(n.length)-1;t.writeByte(128|r|o|0|i);}else t.writeByte(0);}function yt(t,e,s,n,r=8,o,i,c){$(s,n,e,r,t,o,i,c);}function S(t,e){t.writeByte(e&255),t.writeByte(e>>8&255);}function ft(t,e){for(var s=0;s<e.length;s++)t.writeByte(e.charCodeAt(s));}function Z(t){return Math.max(Math.ceil(Math.log2(t)),1)}

  // Get elements
  const texCanvas = /** @type {HTMLCanvasElement} */(document.getElementById("texture"));
  const viewportCanvas = /** @type {HTMLCanvasElement} */(document.getElementById("viewport"));
  const inputResolution = /** @type {HTMLSelectElement} */(document.getElementById("input-resolution"));
  const inputAutoTurn = /** @type {HTMLInputElement} */(document.getElementById("input-auto-turn"));
  const inputWireframe = /** @type {HTMLInputElement} */(document.getElementById("input-wireframe"));
  const inputWireframeColor = /** @type {HTMLInputElement} */(document.getElementById("input-wireframe-color"));
  const inputRenderMode = /** @type {HTMLSelectElement} */(document.getElementById("input-render-mode"));
  const inputShading = /** @type {HTMLInputElement} */(document.getElementById("input-shading"));
  const inputFOV = /** @type {HTMLInputElement} */(document.getElementById("input-fov"));
  const btnShowControls = /** @type {HTMLButtonElement} */(document.getElementById("btn-show-controls"));
  const inputGifFps = /** @type {HTMLInputElement} */(document.getElementById("input-gif-fps"));
  const btnRecordGIF = /** @type {HTMLButtonElement} */(document.getElementById("btn-record-gif"));
  const popupControls = document.getElementById("popup-controls");
  const statsTable = document.getElementById("stats");

  // Create viewer
  const pcv = new PicoCADViewer({
  	canvas: viewportCanvas,
  });
  window["viewer"] = pcv;

  // App/renderer state
  let cameraSpin = -Math.PI / 2;
  let cameraRoll = 0.2;
  let cameraRadius = 12;
  let cameraTurntableSpeed = 0.75;
  let cameraTurntableCenter = {x: 0, y: 1.5, z: 0};
  let cameraTurntableAuto = true;
  let cameraMode = 0;


  // Model load wrapper.

  /**
   * @param {import("../src/index").PicoCADSource} source 
   */
  async function loadModel(source, saveToURL=true) {
  	// Load the model.
  	const model = await pcv.load(source);
  	window["model"] = model;

  	console.log(`=== load "${model.name}" ===`);

  	// Enable UI hints.
  	viewportCanvas.classList.add("loaded");

  	// Set turntable radius from zoom level.
  	cameraRadius = model.zoomLevel;

  	// Draw texture.
  	texCanvasCtx.putImageData(pcv.modelTexture, 0, 0);

  	// Show stats
  	const faceCount = model.objects.reduce((acc, obj) => acc + obj.faces.length, 0);

  	while (statsTable.lastChild != null) statsTable.lastChild.remove();

  	statsTable.append(h("li", {}, pcv.model.name));

  	const stats = {
  		"Colors": pcv.getTextureColorCount(),
  		"Objects": model.objects.length,
  		"Faces": faceCount,
  	};

  	console.log(`${pcv.getTriangleCount()} triangles, ${pcv.getDrawCallCount()} draw calls`);

  	for (const [key, value] of Object.entries(stats)) {
  		statsTable.append(h("li", {}, `${key}: ${value}`));
  	}

  	// Add compressed model text to URL.
  	if (saveToURL) {
  		const compressed = urlCompressModel(model);
  		history.pushState(null, "", "#" + compressed);
  		console.log(`lzw base64: ${compressed.length} bytes`);
  	}
  }


  // Example model.

  function loadExample(saveToURL=true) {
  	loadModel("./example.txt", saveToURL);
  }


  // Extra model loading steps + stats

  const texCanvasCtx = texCanvas.getContext("2d");


  // Popups

  document.querySelectorAll(".popup").forEach(popup => {
  	popup.addEventListener("click", () => {
  		popupControls.hidden = !popupControls.hidden;
  	});
  });


  btnShowControls.onclick = () => {
  	popupControls.hidden = !popupControls.hidden;
  };

  popupControls.querySelectorAll("kbd").forEach(kbd => {
  	kbd.onclick = () => keyPressed(kbd.textContent.toLowerCase());
  });


  // GIF recording

  /** @type {import("./gifenc").GIFPalette} */
  const gifPalette = PICO_COLORS.slice();
  const GIF_MAX_LEN = 30; // seconds
  const gifRecorder = new ct();

  let gifDelay = 0.02;
  let gifRecording = false;
  let gifTime = 0;
  let gifInitialSpin = 0;

  function toggleGifRecording() {
  	if (gifRecording) {
  		stopRecordingGif();
  	} else {
  		startRecordingGif();
  	}
  }

  function startRecordingGif() {
  	gifRecording = true;
  	gifTime = 0;
  	gifInitialSpin = cameraSpin;

  	btnRecordGIF.textContent = "Recording GIF...";
  	btnRecordGIF.classList.add("recording");
  	viewportCanvas.classList.add("recording");
  	inputGifFps.disabled = true;
  }

  function stopRecordingGif() {
  	gifRecording = false;

  	btnRecordGIF.textContent = "Record GIF";
  	btnRecordGIF.classList.remove("recording");
  	viewportCanvas.classList.remove("recording");
  	inputGifFps.disabled = false;

  	// Render GIF
  	const res = pcv.getResolution();
  	console.log(gifFrames.length);

  	for (let i = 0; i < gifFrames.length; i++) {
  		gifRecorder.writeFrame(gifFrames[i], res.width * res.scale, res.height * res.scale, {
  			palette: i === 0 ? gifPalette : null,
  			delay: gifDelay * 1000,
  		});
  	}

  	gifRecorder.finish();

  	downloadGif();

  	gifRecorder.reset();
  	gifFrames = [];
  }

  function downloadGif() {
  	const fileName = `${pcv.model.name}.gif`;

  	const file = new File([ gifRecorder.bytesView() ], fileName, {
  		type: "image/gif",
  	});

  	const url = URL.createObjectURL(file);

  	const a = document.createElement("a");
  	a.href = url;
  	a.download = fileName;
  	document.body.append(a);
  	a.click();

  	a.remove();
  	URL.revokeObjectURL(url);
  	
  	console.log(`downloaded ${fileName} ${file.size / 1024}kb`);
  }

  /** @type {Uint8Array[]} */
  let gifFrames = [];

  function putGifFrame() {
  	const res = pcv.getResolution();
  	const indices = pcv.getPixelIndices(res.scale);

  	gifFrames.push(indices);
  }


  // Input

  /**
   * @param {string} key 
   */
  function keyPressed(key) {
  	if (key === "r") {
  		inputWireFrameHandler(!pcv.drawWireframe);
  	} else if (key === "t") {
  		inputAutoTurnHandler(!cameraTurntableAuto);
  	} else if (key === "m") {
  		inputRenderModeHandler(inputRenderMode.value === "texture" ? "color" : "texture");
  	} else if (key === "l") {
  		inputShadingHandler(!inputShading.checked);
  	} else if (key === "/" || key === "?") {
  		loadExample();
  	} else if (key === "g") {
  		toggleGifRecording();
  	}
  }

  const keys = Object.create(null);

  window.onkeydown = event => {
  	if (!event.ctrlKey && !event.metaKey) {
  		event.preventDefault();
  		const key = event.key.toLowerCase();
  		keys[key] = true;

  		keyPressed(key);
  	}
  };
  window.onkeyup = event => {
  	if (!event.ctrlKey && !event.metaKey) {
  		event.preventDefault();
  		keys[event.key.toLowerCase()] = false;
  	}
  };

  viewportCanvas.ondblclick = () => {
  	if (pcv.loaded) {
  		viewportCanvas.requestPointerLock();
  	}
  };

  viewportCanvas.oncontextmenu = (event) => {
  	event.preventDefault();
  };

  document.onpointerlockchange = (event) => {
  	if (document.pointerLockElement === viewportCanvas) {
  		cameraMode = 1;
  	} else {
  		cameraMode = 0;
  	}
  };


  // Viewport mouse controls.

  let mouseDown = /** @type {boolean[]} */(Array(5)).fill(false);
  let mouseDownViewport = /** @type {boolean[]} */(Array(5)).fill(false);
  let mouse = [0, 0];

  window.onmousedown = (event) => {
  	const button = event.button;
  	const isViewport = event.target == viewportCanvas;

  	mouseDown[button] = true;
  	mouseDownViewport[button] = isViewport;

  	if (isViewport) {
  		event.preventDefault();

  		viewportCanvas.classList.add("grabbing");

  		if (cameraMode === 0 && button === 0) {
  			inputAutoTurnHandler(false);
  		}
  	}
  };

  window.onmouseup = (event) => {
  	const button = event.button;

  	mouseDown[button] = false;
  	mouseDownViewport[button] = false;

  	viewportCanvas.classList.remove("grabbing");
  };

  window.onmousemove = (event) => {
  	const mouseNow = [event.clientX, event.clientY];
  	const mouseDelta = [mouseNow[0] - mouse[0], mouseNow[1] - mouse[1]];

  	if (cameraMode === 1 && document.pointerLockElement === viewportCanvas) {
  		const sensitivity = 0.003;

  		cameraSpin += event.movementX * sensitivity;
  		cameraRoll += event.movementY * sensitivity;
  	} else if (cameraMode == 0) {
  		if (mouseDownViewport[0]) {
  			const sensitivity = 0.005;

  			cameraSpin += mouseDelta[0] * sensitivity;
  			cameraRoll += mouseDelta[1] * sensitivity;
  		} else if (mouseDownViewport[1] || mouseDownViewport[2]) {
  			const sensitivity = 0.005;

  			const up = pcv.getCameraUp();
  			const right = pcv.getCameraRight();
  			const rightDelta = mouseDelta[0] * sensitivity;
  			const upDelta = -mouseDelta[1] * sensitivity;

  			cameraTurntableCenter.x += right.x * rightDelta + up.x * upDelta;
  			cameraTurntableCenter.y += right.y * rightDelta + up.y * upDelta;
  			cameraTurntableCenter.z += right.z * rightDelta + up.z * upDelta;
  		}
  	}

  	mouse = mouseNow;
  };

  viewportCanvas.onwheel = (event) => {
  	event.preventDefault();

  	const dy = clamp(-6, 6, event.deltaY);

  	if (cameraMode === 1 || (cameraMode === 0 && event.altKey)) {
  		inputFOVUpdate(pcv.cameraFOV + dy);
  	} else if (cameraMode === 0) {
  		cameraRadius = clamp(0, 200, cameraRadius + dy * 0.5);
  	}
  };


  // Viewport touch controls.

  let currTouch = [0, 0, -1];
  let touchViewport = false;

  document.addEventListener("touchstart", (event) => {
  	touchViewport = event.target == viewportCanvas;

  	const touch = event.changedTouches[0];

  	currTouch = [touch.clientX, touch.clientY, touch.identifier];

  	if (touchViewport) {
  		event.preventDefault();

  		inputAutoTurnHandler(false);
  	}
  }, { passive: false });

  document.addEventListener("touchmove", (event) => {
  	const touch = Array.from(event.changedTouches).find(touch => touch.identifier === currTouch[2]);

  	if (touch != null) {
  		const newTouch = [touch.clientX, touch.clientY, touch.identifier];

  		if (touchViewport) {
  			const delta = [newTouch[0] - currTouch[0], newTouch[1] - currTouch[1]];
  			const sensitivity = 0.01;

  			cameraSpin += delta[0] * sensitivity;
  			cameraRoll += delta[1] * sensitivity;
  		}

  		currTouch = newTouch;
  	}
  });

  document.addEventListener("touchend", (event) => {
  	const touch = Array.from(event.changedTouches).find(touch => touch.identifier === currTouch[2]);

  	if (touch != null) {
  		touchViewport = false;
  	}
  });


  // Controls.

  if (window.innerWidth < 700) {
  	inputResolution.value = "128,128,2";
  }

  inputHandler(inputResolution, value => {
  	const [w, h, scale] = value.split(",").map(s => Number(s));

  	pcv.setResolution(w, h, scale);
  });

  const inputFOVUpdate = inputHandler(inputFOV, () => {
  	pcv.cameraFOV = inputFOV.valueAsNumber;
  	inputFOV.nextElementSibling.textContent = inputFOV.value;
  });

  const inputWireFrameHandler = inputHandler(inputWireframe, () => {
  	pcv.drawWireframe = inputWireframe.checked;
  });

  const inputAutoTurnHandler = inputHandler(inputAutoTurn, () => {
  	cameraTurntableAuto = inputAutoTurn.checked;
  });

  inputHandler(inputWireframeColor, (value) => {
  	pcv.wireframeColor = [
  		value.slice(1, 3),
  		value.slice(3, 5),
  		value.slice(5, 7),
  	].map(s => parseInt(s, 16) / 255);
  });

  const inputRenderModeHandler = inputHandler(inputRenderMode, value => {
  	pcv.renderMode = /** @type {import("../src/index").PicoCADRenderMode} */(value);
  });

  const inputShadingHandler = inputHandler(inputShading, () => {
  	pcv.shading = inputShading.checked;
  });

  inputHandler(inputGifFps, value => {
  	gifDelay = Number(value) / 100;
  });

  btnRecordGIF.onclick = () => {
  	toggleGifRecording();
  };


  // Render loop

  pcv.startDrawLoop((dt) => {
  	// Camera controls
  	const lookSpeed = 1.2 * dt;

  	let inputLR = 0;
  	let inputFB = 0;
  	let inputUD = 0;
  	let inputCameraLR = 0;
  	let inputCameraUD = 0;
  	if (keys["w"]) inputFB += 1;
  	if (keys["s"]) inputFB -= 1;
  	if (keys["a"]) inputLR -= 1;
  	if (keys["d"]) inputLR += 1;
  	if (keys["q"] || keys["shift"] || keys["control"]) inputUD -= 1;
  	if (keys["e"] || keys[" "]) inputUD += 1;
  	if (keys["arrowleft"]) inputCameraLR -= 1;
  	if (keys["arrowright"]) inputCameraLR += 1;
  	if (keys["arrowup"]) inputCameraUD -= 1;
  	if (keys["arrowdown"]) inputCameraUD += 1;

  	if (cameraMode === 0) {
  		// turntable
  		cameraRoll += (inputFB + inputCameraUD) * lookSpeed;
  		cameraTurntableCenter.y += inputUD * 3 * dt;

  		if (cameraTurntableAuto) {
  			cameraTurntableSpeed -= (inputLR + inputCameraLR) * 2 * dt;
  			cameraTurntableSpeed = clamp(-2, 2, cameraTurntableSpeed);

  			cameraSpin += cameraTurntableSpeed * dt;
  		} else {
  			cameraSpin += (inputLR + inputCameraLR) * lookSpeed;
  		}

  		pcv.setTurntableCamera(cameraRadius, cameraSpin, cameraRoll, cameraTurntableCenter);
  	} else if (cameraMode === 1) {
  		// fps
  		cameraSpin += inputCameraLR * lookSpeed;
  		cameraRoll += inputCameraUD * lookSpeed;
  		cameraRoll = clamp(-Math.PI / 2, Math.PI / 2, cameraRoll);
  		
  		pcv.cameraRotation.x = cameraRoll;
  		pcv.cameraRotation.y = cameraSpin;

  		if (inputLR !== 0 || inputUD !== 0 || inputFB !== 0) {
  			const speed = 6 * dt;

  			const right = pcv.getCameraRight();
  			const up = pcv.getCameraUp();
  			const forward = pcv.getCameraForward();

  			const pos = pcv.cameraPosition;
  			pos.x += (right.x * inputLR + forward.x * inputFB + up.x * inputUD) * speed;
  			pos.y += (right.y * inputLR + forward.y * inputFB + up.y * inputUD) * speed;
  			pos.z += (right.z * inputLR + forward.z * inputFB + up.z * inputUD) * speed;
  		}
  	}

  	pcv.setLightDirectionFromCamera();
  }, (dt) => {
  	if (gifRecording) {
  		const prev = gifTime;
  		gifTime += dt;

  		if (gifTime >= GIF_MAX_LEN || (inputAutoTurn && Math.abs(gifInitialSpin - cameraSpin) >= Math.PI * 2)) {
  			stopRecordingGif();
  		} else if (prev === 0 || Math.floor(prev / gifDelay) !== Math.floor(gifTime / gifDelay)) {
  			putGifFrame();
  		}
  	}
  });


  // Handle file dropping.

  window.addEventListener("dragover", (event) => {
  	event.preventDefault();
  });

  let dragDepthCount = 0;

  window.addEventListener("dragenter", (event) => {
  	if (dragDepthCount === 0) {
  		if (event.dataTransfer.types.includes("Files")) {
  			document.body.classList.add("drag");
  		}
  	}

  	dragDepthCount++;
  });


  window.addEventListener("dragleave", (event) => {
  	dragDepthCount--;

  	if (dragDepthCount === 0) {
  		dragEnd();
  	}
  });


  function dragEnd() {
  	document.body.classList.remove("drag");
  }

  window.addEventListener("drop", (event) => {
  	event.preventDefault();

  	dragDepthCount = 0;

  	dragEnd();

  	const file = event.dataTransfer.files[0];
  	if (file != null) {
  		loadModel(file);
  	}
  });

  // Handling pasting.
  document.body.addEventListener("paste", (event) => {
  	const s = event.clipboardData.getData("text/plain");
  	if (s != null) {
  		loadModel(s);
  	} else {
  		const file = event.clipboardData.files[0];
  		if (file != null) {
  			loadModel(file);
  		}
  	}
  });

  /**
   * @param {number} a 
   * @param {number} b 
   * @param {number} x 
   */
  function clamp(a, b, x) {
  	return x < a ? a : (x > b ? b : x);
  }

  /**
   * @param {string|Element} tag 
   * @param {*} attributes 
   * @param  {...any} nodes 
   */
  function h(tag, attributes, ...nodes) {
  	tag = tag instanceof Element ? tag : document.createElement(tag);
  	if (attributes != null) {
  		for (const k in attributes) {
  			tag.setAttribute(k, attributes[k]);
  		}
  	}
  	tag.append(...nodes);
  	return tag;
  }

  /**
   * @param {HTMLSelectElement|HTMLInputElement} input 
   * @param {(value: string, init: boolean) => void} onchange
   * @returns {(value: any) => void} Call to change value
   */
  function inputHandler(input, onchange) {
  	function listener() {
  		onchange(input.value, false);
  	}

  	input[input instanceof HTMLSelectElement ? "onchange" : "oninput"] = listener;

  	onchange(input.value, true);

  	if (input instanceof HTMLInputElement) {
  		return (value) => {
  			if (input.disabled) return;
  			if (typeof value === "boolean") {
  				input.checked = value;
  			} else {
  				input.value = value;
  			}
  			listener();
  		};
  	} else {
  		return (value) => {
  			if (input.disabled) return;
  			input.value = value;
  			listener();
  		};
  	}
  }

  // Load starting model.

  if (!loadModelFromURL()) {
  	loadExample(false);
  }

  function loadModelFromURL() {
  	if (location.hash.length > 1) {
  		loadModel(urlDecompressModel(location.hash.slice(1)), false);
  		return true;
  	}
  }

  onhashchange = (event) => {
  	loadModelFromURL();
  };

  window["loadModel"] = loadModel;

}());
