;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-liebiao" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M148.171599 256.903068 875.804864 256.903068c11.044996 0 19.975755-10.05296 19.975755-22.442128 0-12.389168-8.930759-22.398126-19.975755-22.398126L148.171599 212.062813c-11.022483 0-19.952218 10.008958-19.952218 22.398126C128.21938 246.850108 137.149116 256.903068 148.171599 256.903068zM875.804864 482.691487 148.171599 482.691487c-11.022483 0-19.952218 10.228969-19.952218 22.838148 0 12.588713 8.928712 22.794146 19.952218 22.794146L875.804864 528.32378c11.044996 0 19.975755-10.206456 19.975755-22.794146C895.779596 492.920456 886.849861 482.691487 875.804864 482.691487zM875.804864 754.133689 148.171599 754.133689c-11.022483 0-19.952218 10.031471-19.952218 22.419616 0 12.389168 8.928712 22.443152 19.952218 22.443152L875.804864 798.996456c11.044996 0 19.975755-10.05296 19.975755-22.443152C895.779596 764.16516 886.849861 754.133689 875.804864 754.133689z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-iconfontcolor97" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512 0C229.248 0 0 229.248 0 512s229.248 512 512 512 512-229.248 512-512S794.752 0 512 0zM590.928 548.688l-222.096 146.72c-34.944 20.192-63.52 3.664-63.52-36.688L305.312 365.312c0-40.336 28.576-56.88 63.52-36.688l222.096 146.72C625.856 495.504 625.856 528.496 590.928 548.688zM718.688 688c0 17.68-14.336 32-32 32s-32-14.32-32-32L654.688 336c0-17.664 14.336-32 32-32s32 14.336 32 32L718.688 688z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-iconfontcolor98" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512 0C229.248 0 0 229.248 0 512s229.248 512 512 512 512-229.248 512-512S794.752 0 512 0zM369.312 688c0 17.68-14.32 32-32 32-17.664 0-32-14.32-32-32L305.312 336c0-17.664 14.336-32 32-32 17.68 0 32 14.336 32 32L369.312 688zM718.688 658.72c0 40.336-28.56 56.88-63.504 36.688l-222.096-146.72c-34.976-20.192-34.976-53.184 0-73.344l222.096-146.72c34.944-20.192 63.504-3.664 63.504 36.688L718.688 658.72z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-ic_pause_circle_fill_px" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512 85.333333C276.48 85.333333 85.333333 276.48 85.333333 512s191.146667 426.666667 426.666667 426.666667 426.666667-191.146667 426.666667-426.666667S747.52 85.333333 512 85.333333z m-42.666667 597.333334H384V341.333333h85.333333v341.333334z m170.666667 0h-85.333333V341.333333h85.333333v341.333334z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-ic_play_circle_fill_px" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512 85.333333C276.48 85.333333 85.333333 276.48 85.333333 512s191.146667 426.666667 426.666667 426.666667 426.666667-191.146667 426.666667-426.666667S747.52 85.333333 512 85.333333z m-85.333333 618.666667v-384l256 192-256 192z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)