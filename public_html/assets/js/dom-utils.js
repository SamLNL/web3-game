const proto = window.Element.prototype;
const nativeMatches = proto.matches || proto.matchesSelector || proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector;
/**
 * Tests if a DOM elements matches any of the test DOM elements or selectors.
 * @param {Element} element The DOM element to test.
 * @param {Element|string|Array<Element|string>} test A DOM element, a CSS
 *     selector, or an array of DOM elements or CSS selectors to match against.
 * @return {boolean} True of any part of the test matches.
 */

function matches(element, test) {
  // Validate input.
  if (element && element.nodeType == 1 && test) {
    // if test is a string or DOM element test it.
    if (typeof test == 'string' || test.nodeType == 1) {
      return element == test || matchesSelector(element,
      /** @type {string} */
      test);
    } else if ('length' in test) {
      // if it has a length property iterate over the items
      // and return true if any match.
      for (let i = 0, item; item = test[i]; i++) {
        if (element == item || matchesSelector(element, item)) return true;
      }
    }
  } // Still here? Return false


  return false;
}
/**
 * Tests whether a DOM element matches a selector. This polyfills the native
 * Element.prototype.matches method across browsers.
 * @param {!Element} element The DOM element to test.
 * @param {string} selector The CSS selector to test element against.
 * @return {boolean} True if the selector matches.
 */

function matchesSelector(element, selector) {
  if (typeof selector != 'string') return false;
  if (nativeMatches) return nativeMatches.call(element, selector);
  const nodes = element.parentNode.querySelectorAll(selector);

  for (let i = 0, node; node = nodes[i]; i++) {
    if (node == element) return true;
  }

  return false;
}

/**
 * Returns an array of a DOM element's parent elements.
 * @param {!Element} element The DOM element whose parents to get.
 * @return {!Array} An array of all parent elemets, or an empty array if no
 *     parent elements are found.
 */
function parents(element) {
  const list = [];

  while (element && element.parentNode && element.parentNode.nodeType == 1) {
    element =
    /** @type {!Element} */
    element.parentNode;
    list.push(element);
  }

  return list;
}

/**
 * Gets the closest parent element that matches the passed selector.
 * @param {Element} element The element whose parents to check.
 * @param {string} selector The CSS selector to match against.
 * @param {boolean=} shouldCheckSelf True if the selector should test against
 *     the passed element itself.
 * @return {Element|undefined} The matching element or undefined.
 */

function closest(element, selector, shouldCheckSelf = false) {
  if (!(element && element.nodeType == 1 && selector)) return;
  const parentElements = (shouldCheckSelf ? [element] : []).concat(parents(element));

  for (let i = 0, parent; parent = parentElements[i]; i++) {
    if (matches(parent, selector)) return parent;
  }
}

/**
 * Delegates the handling of events for an element matching a selector to an
 * ancestor of the matching element.
 * @param {!Node} ancestor The ancestor element to add the listener to.
 * @param {string} eventType The event type to listen to.
 * @param {string} selector A CSS selector to match against child elements.
 * @param {!Function} callback A function to run any time the event happens.
 * @param {Object=} opts A configuration options object. The available options:
 *     - useCapture<boolean>: If true, bind to the event capture phase.
 *     - deep<boolean>: If true, delegate into shadow trees.
 * @return {Object} The delegate object. It contains a destroy method.
 */

function delegate(ancestor, eventType, selector, callback, opts = {}) {
  // Defines the event listener.
  const listener = function listener(event) {
    let delegateTarget; // If opts.composed is true and the event originated from inside a Shadow
    // tree, check the composed path nodes.

    if (opts.composed && typeof event.composedPath == 'function') {
      const composedPath = event.composedPath();

      for (let i = 0, node; node = composedPath[i]; i++) {
        if (node.nodeType == 1 && matches(node, selector)) {
          delegateTarget = node;
        }
      }
    } else {
      // Otherwise check the parents.
      delegateTarget = closest(event.target, selector, true);
    }

    if (delegateTarget) {
      callback.call(delegateTarget, event, delegateTarget);
    }
  };

  ancestor.addEventListener(eventType, listener, opts.useCapture);
  return {
    destroy: function () {
      ancestor.removeEventListener(eventType, listener, opts.useCapture);
    }
  };
}

/**
 * Gets all attributes of an element as a plain JavaScriot object.
 * @param {Element} element The element whose attributes to get.
 * @return {!Object} An object whose keys are the attribute keys and whose
 *     values are the attribute values. If no attributes exist, an empty
 *     object is returned.
 */
function getAttributes(element) {
  const attrs = {}; // Validate input.

  if (!(element && element.nodeType == 1)) return attrs; // Return an empty object if there are no attributes.

  const map = element.attributes;
  if (map.length === 0) return {};

  for (let i = 0, attr; attr = map[i]; i++) {
    attrs[attr.name] = attr.value;
  }

  return attrs;
}

const HTTP_PORT = '80';
const HTTPS_PORT = '443';
const DEFAULT_PORT = RegExp(':(' + HTTP_PORT + '|' + HTTPS_PORT + ')$');
const a = document.createElement('a');
const cache = {};
/**
 * Parses the given url and returns an object mimicing a `Location` object.
 * @param {string} url The url to parse.
 * @return {!Object} An object with the same properties as a `Location`.
 */

function parseUrl(url) {
  // All falsy values (as well as ".") should map to the current URL.
  url = !url || url == '.' ? location.href : url;
  if (cache[url]) return cache[url];
  a.href = url; // When parsing file relative paths (e.g. `../index.html`), IE will correctly
  // resolve the `href` property but will keep the `..` in the `path` property.
  // It will also not include the `host` or `hostname` properties. Furthermore,
  // IE will sometimes return no protocol or just a colon, especially for things
  // like relative protocol URLs (e.g. "//google.com").
  // To workaround all of these issues, we reparse with the full URL from the
  // `href` property.

  if (url.charAt(0) == '.' || url.charAt(0) == '/') return parseUrl(a.href); // Don't include default ports.

  let port = a.port == HTTP_PORT || a.port == HTTPS_PORT ? '' : a.port; // PhantomJS sets the port to "0" when using the file: protocol.

  port = port == '0' ? '' : port; // Sometimes IE incorrectly includes a port for default ports
  // (e.g. `:80` or `:443`) even when no port is specified in the URL.
  // http://bit.ly/1rQNoMg

  const host = a.host.replace(DEFAULT_PORT, ''); // Not all browser support `origin` so we have to build it.

  const origin = a.origin ? a.origin : a.protocol + '//' + host; // Sometimes IE doesn't include the leading slash for pathname.
  // http://bit.ly/1rQNoMg

  const pathname = a.pathname.charAt(0) == '/' ? a.pathname : '/' + a.pathname;
  return cache[url] = {
    hash: a.hash,
    host: host,
    hostname: a.hostname,
    href: a.href,
    origin: origin,
    pathname: pathname,
    port: port,
    protocol: a.protocol,
    search: a.search
  };
}

export { delegate as d, getAttributes as g, parseUrl as p };
