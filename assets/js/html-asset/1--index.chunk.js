(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["html-asset/1--index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var C_Users_maple3142_Documents_GitHub_mergemp4_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var C_Users_maple3142_Documents_GitHub_mergemp4_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_Users_maple3142_Documents_GitHub_mergemp4_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = __webpack_require__(/*! @ffmpeg/ffmpeg */ "./node_modules/@ffmpeg/ffmpeg/src/index.js"),
    createWorker = _require.createWorker;

var readFile = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/C_Users_maple3142_Documents_GitHub_mergemp4_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(file) {
    return C_Users_maple3142_Documents_GitHub_mergemp4_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = Uint8Array;
            _context.next = 3;
            return new Response(file).arrayBuffer();

          case 3:
            _context.t1 = _context.sent;
            return _context.abrupt("return", new _context.t0(_context.t1));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function readFile(_x) {
    return _ref.apply(this, arguments);
  };
}();

var download = function download(url) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'file';
  var a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

var $ = function $(s) {
  return document.querySelector(s);
};

var $video = $('.video');
$video.addEventListener('drop', function (e) {
  e.preventDefault();
  $('#video').files = e.dataTransfer.files;
});
$video.addEventListener('dragover', function (e) {
  e.preventDefault();
});
var $audio = $('.audio');
$audio.addEventListener('drop', function (e) {
  e.preventDefault();
  $('#audio').files = e.dataTransfer.files;
});
$audio.addEventListener('dragover', function (e) {
  e.preventDefault();
});
var worker = createWorker({
  logger: function logger(m) {
    if (m.type === 'stderr') {
      stderr.textContent += m.message + '\n';
    }
  }
});
worker.load().then(function () {
  return console.log('load done');
});

var ext = function ext(name) {
  return name.split('.').pop();
};

var $form = $('.form');
$form.addEventListener('submit', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/C_Users_maple3142_Documents_GitHub_mergemp4_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(e) {
    var video, audio, vidName, audName, outExt, _ref3, data, url;

    return C_Users_maple3142_Documents_GitHub_mergemp4_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            e.preventDefault();
            video = $('#video').files[0];
            audio = $('#audio').files[0];

            if (!(!video || !audio)) {
              _context2.next = 6;
              break;
            }

            alert('Either video or audio does not exist.');
            return _context2.abrupt("return");

          case 6:
            vidName = 'video.' + ext(video.name);
            audName = 'audio.' + ext(audio.name);
            outExt = ext(video.name);
            _context2.t0 = worker;
            _context2.t1 = vidName;
            _context2.next = 13;
            return readFile(video);

          case 13:
            _context2.t2 = _context2.sent;
            _context2.next = 16;
            return _context2.t0.write.call(_context2.t0, _context2.t1, _context2.t2);

          case 16:
            _context2.t3 = worker;
            _context2.t4 = audName;
            _context2.next = 20;
            return readFile(audio);

          case 20:
            _context2.t5 = _context2.sent;
            _context2.next = 23;
            return _context2.t3.write.call(_context2.t3, _context2.t4, _context2.t5);

          case 23:
            _context2.next = 25;
            return worker.run("-i ".concat(vidName, " -i ").concat(audName, " -c copy output.").concat(outExt), {
              input: [vidName, audName],
              output: 'output.' + outExt
            });

          case 25:
            _context2.next = 27;
            return worker.read('output.' + outExt);

          case 27:
            _ref3 = _context2.sent;
            data = _ref3.data;
            _context2.next = 31;
            return worker.remove('output.' + outExt);

          case 31:
            url = URL.createObjectURL(new Blob([data]));
            download(url, $('.form>input[name=filename]').value);

          case 33:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());

/***/ })

}]);
//# sourceMappingURL=1--index.chunk.js.map