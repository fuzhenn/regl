var GL_DEPTH_COMPONENT = 0x1902
var GL_DEPTH_STENCIL = 0x84F9

var gl2Extensions = {
  'WEBGL_depth_texture': {
    'UNSIGNED_INT_24_8_WEBGL': 0x84FA
  },
  'OES_element_index_uint': {}
}

module.exports = {
  gl2: function (gl, extensions) {
    gl[this.versionProperty] = 2
    for (var p in gl2Extensions) {
      extensions[p.toLowerCase()] = gl2Extensions[p]
    }
  },

  versionProperty: '___regl_gl_version___',

  getInternalFormat: function (gl, format) {
    if (gl[this.versionProperty] !== 2) {
      return format
    }
    // webgl2
    // depth internal format
    if (format === GL_DEPTH_COMPONENT) {
      // gl.DEPTH_COMPONENT24
      return 0x81A6
    } else if (format === GL_DEPTH_STENCIL) {
      // gl.DEPTH24_STENCIL8
      return 0x88F0
    }
    return format
  }
}
