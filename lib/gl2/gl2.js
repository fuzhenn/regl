var GL_DEPTH_COMPONENT = 0x1902
var GL_DEPTH_STENCIL = 0x84F9
var HALF_FLOAT_OES = 0x8D61

var gl2Extensions = {
  'WEBGL_depth_texture': {
    'UNSIGNED_INT_24_8_WEBGL': 0x84FA
  },
  'OES_element_index_uint': {},
  'OES_texture_float': {},
  'OES_texture_float_linear': {},
  'OES_texture_half_float': {
    'HALF_FLOAT_OES': 0x8D61
  },
  'OES_texture_half_float_linear': {},
  'EXT_color_buffer_float': {},
  'OES_standard_derivatives': {},
  'EXT_frag_depth': {},
  'EXT_blend_minmax': {
    'MIN_EXT': 0x8007,
    'MAX_EXT': 0x8008
  },
  'EXT_shader_texture_lod': {}
}

module.exports = {
  gl2: function (gl, extensions) {
    gl[this.versionProperty] = 2
    for (var p in gl2Extensions) {
      extensions[p.toLowerCase()] = gl2Extensions[p]
    }

    // to support float and half-float textures
    gl.getExtension('EXT_color_buffer_float')

    // mocks of draw buffers's functions
    extensions['webgl_draw_buffers'] = {
      drawBuffersWEBGL: function () {
        return gl.drawBuffers.apply(gl, arguments)
      },
      
      // 'COLOR_ATTACHMENT0_WEBGL': 0x8CE0,
      // 'COLOR_ATTACHMENT1_WEBGL': 0x8CE1,
      // 'COLOR_ATTACHMENT2_WEBGL': 0x8CE2,
      // 'COLOR_ATTACHMENT3_WEBGL': 0x8CE3,
      // 'COLOR_ATTACHMENT4_WEBGL': 0x8CE4,
      // 'COLOR_ATTACHMENT5_WEBGL': 0x8CE5,
      // 'COLOR_ATTACHMENT6_WEBGL': 0x8CE6,
      // 'COLOR_ATTACHMENT7_WEBGL': 0x8CE7,
      // 'COLOR_ATTACHMENT8_WEBGL': 0x8CE8,
      // 'COLOR_ATTACHMENT9_WEBGL': 0x8CE9,
      // 'COLOR_ATTACHMENT10_WEBGL': 0x8CE10,
      // 'COLOR_ATTACHMENT11_WEBGL': 0x8CE11,
      // 'COLOR_ATTACHMENT12_WEBGL': 0x8CE12,
      // 'COLOR_ATTACHMENT13_WEBGL': 0x8CE13,
      // 'COLOR_ATTACHMENT14_WEBGL': 0x8CE14,
      // 'COLOR_ATTACHMENT15_WEBGL': 0x8CE15,

      // 'DRAW_BUFFER0_WEBGL': 0x8825,
      // 'DRAW_BUFFER1_WEBGL': 0x8826,
      // 'DRAW_BUFFER2_WEBGL': 0x8827,
      // 'DRAW_BUFFER3_WEBGL': 0x8828,
      // 'DRAW_BUFFER4_WEBGL': 0x8829,
      // 'DRAW_BUFFER5_WEBGL': 0x882A,
      // 'DRAW_BUFFER6_WEBGL': 0x882B,
      // 'DRAW_BUFFER7_WEBGL': 0x882C,
      // 'DRAW_BUFFER8_WEBGL': 0x882D,
      // 'DRAW_BUFFER9_WEBGL': 0x882E,
      // 'DRAW_BUFFER10_WEBGL': 0x882F,
      // 'DRAW_BUFFER11_WEBGL': 0x8830,
      // 'DRAW_BUFFER12_WEBGL': 0x8831,
      // 'DRAW_BUFFER13_WEBGL': 0x8832,
      // 'DRAW_BUFFER14_WEBGL': 0x8833,
      // 'DRAW_BUFFER15_WEBGL': 0x8834,
      // 'MAX_COLOR_ATTACHMENTS_WEBGL': 0x8CDF,
      // 'MAX_DRAW_BUFFERS_WEBGL': 0x8824
    }

    // mocks of vao functions
    extensions['oes_vertex_array_object'] = {
      'VERTEX_ARRAY_BINDING_OES':   0x85B5,
      'createVertexArrayOES': function () {
        return gl.createVertexArray()
      },
      'deleteVertexArrayOES': function () {
        return gl.deleteVertexArray.apply(gl, arguments)
      },
      'isVertexArrayOES': function () {
        return gl.isVertexArray.apply(gl, arguments)
      },
      'bindVertexArrayOES': function () {
        return gl.bindVertexArray.apply(gl, arguments)
      }
    }

    extensions['angle_instanced_arrays'] = {
      'VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE': 0x88FE,
      'drawArraysInstancedANGLE': function () {
        return gl.drawArraysInstanced.apply(gl, arguments)
      },
      'drawElementsInstancedANGLE': function () {
        return gl.drawElementsInstanced.apply(gl, arguments)
      },
      'vertexAttribDivisorANGLE': function () {
        return gl.vertexAttribDivisor.apply(gl, arguments)
      }
    }
  },

  versionProperty: '___regl_gl_version___',

  getInternalFormat: function (gl, format, type) {
    if (gl[this.versionProperty] !== 2) {
      return format
    }
    // webgl2
    // reference:
    // https://webgl2fundamentals.org/webgl/lessons/webgl-data-textures.html
    if (format === GL_DEPTH_COMPONENT) {
      // gl.DEPTH_COMPONENT24
      return 0x81A6
    } else if (format === GL_DEPTH_STENCIL) {
      // gl.DEPTH24_STENCIL8
      return 0x88F0
    } else if (type === HALF_FLOAT_OES && format === gl.RGBA) {
      // gl.RGBA16F
      return 0x881A
    } else if (type === HALF_FLOAT_OES && format === gl.RGB) {
      // gl.RGB16F
      return 0x881B
    } else if (type === gl.FLOAT && format === gl.RGBA) {
      // gl.RGBA32F
      return 0x8814
    } else if (type === gl.FLOAT && format === gl.RGB) {
      // gl.RGB32F
      return 0x8815
    }
    return format
  },

  getTextureType: function (gl, type) {
    if (gl[this.versionProperty] !== 2) {
      return type
    }
    if (type === HALF_FLOAT_OES) {
      return gl.HALF_FLOAT
    }
    return type
  }
}
