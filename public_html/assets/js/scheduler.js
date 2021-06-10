import { c as createCommonjsModule } from './bootstrap.native.js';

var scheduler_production_min = createCommonjsModule(function (module, exports) {

  var f, g, h, k, l;

  if ("undefined" === typeof window || "function" !== typeof MessageChannel) {
    var p = null,
        q = null,
        t = function t() {
      if (null !== p) try {
        var a = exports.unstable_now();
        p(!0, a);
        p = null;
      } catch (b) {
        throw setTimeout(t, 0), b;
      }
    },
        u = Date.now();

    exports.unstable_now = function () {
      return Date.now() - u;
    };

    f = function (a) {
      null !== p ? setTimeout(f, 0, a) : (p = a, setTimeout(t, 0));
    };

    g = function (a, b) {
      q = setTimeout(a, b);
    };

    h = function () {
      clearTimeout(q);
    };

    k = function () {
      return !1;
    };

    l = exports.unstable_forceFrameRate = function () {};
  } else {
    var w = window.performance,
        x = window.Date,
        y = window.setTimeout,
        z = window.clearTimeout;

    if ("undefined" !== typeof console) {
      var A = window.cancelAnimationFrame;
      "function" !== typeof window.requestAnimationFrame && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills");
      "function" !== typeof A && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills");
    }

    if ("object" === typeof w && "function" === typeof w.now) exports.unstable_now = function () {
      return w.now();
    };else {
      var B = x.now();

      exports.unstable_now = function () {
        return x.now() - B;
      };
    }
    var C = !1,
        D = null,
        E = -1,
        F = 5,
        G = 0;

    k = function () {
      return exports.unstable_now() >= G;
    };

    l = function () {};

    exports.unstable_forceFrameRate = function (a) {
      0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported") : F = 0 < a ? Math.floor(1E3 / a) : 5;
    };

    var H = new MessageChannel(),
        I = H.port2;

    H.port1.onmessage = function () {
      if (null !== D) {
        var a = exports.unstable_now();
        G = a + F;

        try {
          D(!0, a) ? I.postMessage(null) : (C = !1, D = null);
        } catch (b) {
          throw I.postMessage(null), b;
        }
      } else C = !1;
    };

    f = function (a) {
      D = a;
      C || (C = !0, I.postMessage(null));
    };

    g = function (a, b) {
      E = y(function () {
        a(exports.unstable_now());
      }, b);
    };

    h = function () {
      z(E);
      E = -1;
    };
  }

  function J(a, b) {
    var c = a.length;
    a.push(b);

    a: for (;;) {
      var d = c - 1 >>> 1,
          e = a[d];
      if (void 0 !== e && 0 < K(e, b)) a[d] = b, a[c] = e, c = d;else break a;
    }
  }

  function L(a) {
    a = a[0];
    return void 0 === a ? null : a;
  }

  function M(a) {
    var b = a[0];

    if (void 0 !== b) {
      var c = a.pop();

      if (c !== b) {
        a[0] = c;

        a: for (var d = 0, e = a.length; d < e;) {
          var m = 2 * (d + 1) - 1,
              n = a[m],
              v = m + 1,
              r = a[v];
          if (void 0 !== n && 0 > K(n, c)) void 0 !== r && 0 > K(r, n) ? (a[d] = r, a[v] = c, d = v) : (a[d] = n, a[m] = c, d = m);else if (void 0 !== r && 0 > K(r, c)) a[d] = r, a[v] = c, d = v;else break a;
        }
      }

      return b;
    }

    return null;
  }

  function K(a, b) {
    var c = a.sortIndex - b.sortIndex;
    return 0 !== c ? c : a.id - b.id;
  }

  var N = [],
      O = [],
      P = 1,
      Q = null,
      R = 3,
      S = !1,
      T = !1,
      U = !1;

  function V(a) {
    for (var b = L(O); null !== b;) {
      if (null === b.callback) M(O);else if (b.startTime <= a) M(O), b.sortIndex = b.expirationTime, J(N, b);else break;
      b = L(O);
    }
  }

  function W(a) {
    U = !1;
    V(a);
    if (!T) if (null !== L(N)) T = !0, f(X);else {
      var b = L(O);
      null !== b && g(W, b.startTime - a);
    }
  }

  function X(a, b) {
    T = !1;
    U && (U = !1, h());
    S = !0;
    var c = R;

    try {
      V(b);

      for (Q = L(N); null !== Q && (!(Q.expirationTime > b) || a && !k());) {
        var d = Q.callback;

        if (null !== d) {
          Q.callback = null;
          R = Q.priorityLevel;
          var e = d(Q.expirationTime <= b);
          b = exports.unstable_now();
          "function" === typeof e ? Q.callback = e : Q === L(N) && M(N);
          V(b);
        } else M(N);

        Q = L(N);
      }

      if (null !== Q) var m = !0;else {
        var n = L(O);
        null !== n && g(W, n.startTime - b);
        m = !1;
      }
      return m;
    } finally {
      Q = null, R = c, S = !1;
    }
  }

  function Y(a) {
    switch (a) {
      case 1:
        return -1;

      case 2:
        return 250;

      case 5:
        return 1073741823;

      case 4:
        return 1E4;

      default:
        return 5E3;
    }
  }

  var Z = l;
  exports.unstable_IdlePriority = 5;
  exports.unstable_ImmediatePriority = 1;
  exports.unstable_LowPriority = 4;
  exports.unstable_NormalPriority = 3;
  exports.unstable_Profiling = null;
  exports.unstable_UserBlockingPriority = 2;

  exports.unstable_cancelCallback = function (a) {
    a.callback = null;
  };

  exports.unstable_continueExecution = function () {
    T || S || (T = !0, f(X));
  };

  exports.unstable_getCurrentPriorityLevel = function () {
    return R;
  };

  exports.unstable_getFirstCallbackNode = function () {
    return L(N);
  };

  exports.unstable_next = function (a) {
    switch (R) {
      case 1:
      case 2:
      case 3:
        var b = 3;
        break;

      default:
        b = R;
    }

    var c = R;
    R = b;

    try {
      return a();
    } finally {
      R = c;
    }
  };

  exports.unstable_pauseExecution = function () {};

  exports.unstable_requestPaint = Z;

  exports.unstable_runWithPriority = function (a, b) {
    switch (a) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;

      default:
        a = 3;
    }

    var c = R;
    R = a;

    try {
      return b();
    } finally {
      R = c;
    }
  };

  exports.unstable_scheduleCallback = function (a, b, c) {
    var d = exports.unstable_now();

    if ("object" === typeof c && null !== c) {
      var e = c.delay;
      e = "number" === typeof e && 0 < e ? d + e : d;
      c = "number" === typeof c.timeout ? c.timeout : Y(a);
    } else c = Y(a), e = d;

    c = e + c;
    a = {
      id: P++,
      callback: b,
      priorityLevel: a,
      startTime: e,
      expirationTime: c,
      sortIndex: -1
    };
    e > d ? (a.sortIndex = e, J(O, a), null === L(N) && a === L(O) && (U ? h() : U = !0, g(W, e - d))) : (a.sortIndex = c, J(N, a), T || S || (T = !0, f(X)));
    return a;
  };

  exports.unstable_shouldYield = function () {
    var a = exports.unstable_now();
    V(a);
    var b = L(N);
    return b !== Q && null !== Q && null !== b && null !== b.callback && b.startTime <= a && b.expirationTime < Q.expirationTime || k();
  };

  exports.unstable_wrapCallback = function (a) {
    var b = R;
    return function () {
      var c = R;
      R = b;

      try {
        return a.apply(this, arguments);
      } finally {
        R = c;
      }
    };
  };
});
scheduler_production_min.unstable_now;
scheduler_production_min.unstable_forceFrameRate;
scheduler_production_min.unstable_IdlePriority;
scheduler_production_min.unstable_ImmediatePriority;
scheduler_production_min.unstable_LowPriority;
scheduler_production_min.unstable_NormalPriority;
scheduler_production_min.unstable_Profiling;
scheduler_production_min.unstable_UserBlockingPriority;
scheduler_production_min.unstable_cancelCallback;
scheduler_production_min.unstable_continueExecution;
scheduler_production_min.unstable_getCurrentPriorityLevel;
scheduler_production_min.unstable_getFirstCallbackNode;
scheduler_production_min.unstable_next;
scheduler_production_min.unstable_pauseExecution;
scheduler_production_min.unstable_requestPaint;
scheduler_production_min.unstable_runWithPriority;
scheduler_production_min.unstable_scheduleCallback;
scheduler_production_min.unstable_shouldYield;
scheduler_production_min.unstable_wrapCallback;

var scheduler_development = createCommonjsModule(function (module, exports) {

  if (process.env.NODE_ENV !== "production") {
    (function () {

      var enableSchedulerDebugging = false;
      var enableProfiling = true;
      var requestHostCallback;
      var requestHostTimeout;
      var cancelHostTimeout;
      var shouldYieldToHost;
      var requestPaint;

      if ( // If Scheduler runs in a non-DOM environment, it falls back to a naive
      // implementation using setTimeout.
      typeof window === 'undefined' || // Check if MessageChannel is supported, too.
      typeof MessageChannel !== 'function') {
        // If this accidentally gets imported in a non-browser environment, e.g. JavaScriptCore,
        // fallback to a naive implementation.
        var _callback = null;
        var _timeoutID = null;

        var _flushCallback = function _flushCallback() {
          if (_callback !== null) {
            try {
              var currentTime = exports.unstable_now();
              var hasRemainingTime = true;

              _callback(hasRemainingTime, currentTime);

              _callback = null;
            } catch (e) {
              setTimeout(_flushCallback, 0);
              throw e;
            }
          }
        };

        var initialTime = Date.now();

        exports.unstable_now = function () {
          return Date.now() - initialTime;
        };

        requestHostCallback = function (cb) {
          if (_callback !== null) {
            // Protect against re-entrancy.
            setTimeout(requestHostCallback, 0, cb);
          } else {
            _callback = cb;
            setTimeout(_flushCallback, 0);
          }
        };

        requestHostTimeout = function (cb, ms) {
          _timeoutID = setTimeout(cb, ms);
        };

        cancelHostTimeout = function () {
          clearTimeout(_timeoutID);
        };

        shouldYieldToHost = function () {
          return false;
        };

        requestPaint = exports.unstable_forceFrameRate = function () {};
      } else {
        // Capture local references to native APIs, in case a polyfill overrides them.
        var performance = window.performance;
        var _Date = window.Date;
        var _setTimeout = window.setTimeout;
        var _clearTimeout = window.clearTimeout;

        if (typeof console !== 'undefined') {
          // TODO: Scheduler no longer requires these methods to be polyfilled. But
          // maybe we want to continue warning if they don't exist, to preserve the
          // option to rely on it in the future?
          var requestAnimationFrame = window.requestAnimationFrame;
          var cancelAnimationFrame = window.cancelAnimationFrame; // TODO: Remove fb.me link

          if (typeof requestAnimationFrame !== 'function') {
            // Using console['error'] to evade Babel and ESLint
            console['error']("This browser doesn't support requestAnimationFrame. " + 'Make sure that you load a ' + 'polyfill in older browsers. https://fb.me/react-polyfills');
          }

          if (typeof cancelAnimationFrame !== 'function') {
            // Using console['error'] to evade Babel and ESLint
            console['error']("This browser doesn't support cancelAnimationFrame. " + 'Make sure that you load a ' + 'polyfill in older browsers. https://fb.me/react-polyfills');
          }
        }

        if (typeof performance === 'object' && typeof performance.now === 'function') {
          exports.unstable_now = function () {
            return performance.now();
          };
        } else {
          var _initialTime = _Date.now();

          exports.unstable_now = function () {
            return _Date.now() - _initialTime;
          };
        }

        var isMessageLoopRunning = false;
        var scheduledHostCallback = null;
        var taskTimeoutID = -1; // Scheduler periodically yields in case there is other work on the main
        // thread, like user events. By default, it yields multiple times per frame.
        // It does not attempt to align with frame boundaries, since most tasks don't
        // need to be frame aligned; for those that do, use requestAnimationFrame.

        var yieldInterval = 5;
        var deadline = 0; // TODO: Make this configurable

        {
          // `isInputPending` is not available. Since we have no way of knowing if
          // there's pending input, always yield at the end of the frame.
          shouldYieldToHost = function () {
            return exports.unstable_now() >= deadline;
          }; // Since we yield every frame regardless, `requestPaint` has no effect.


          requestPaint = function () {};
        }

        exports.unstable_forceFrameRate = function (fps) {
          if (fps < 0 || fps > 125) {
            // Using console['error'] to evade Babel and ESLint
            console['error']('forceFrameRate takes a positive int between 0 and 125, ' + 'forcing framerates higher than 125 fps is not unsupported');
            return;
          }

          if (fps > 0) {
            yieldInterval = Math.floor(1000 / fps);
          } else {
            // reset the framerate
            yieldInterval = 5;
          }
        };

        var performWorkUntilDeadline = function performWorkUntilDeadline() {
          if (scheduledHostCallback !== null) {
            var currentTime = exports.unstable_now(); // Yield after `yieldInterval` ms, regardless of where we are in the vsync
            // cycle. This means there's always time remaining at the beginning of
            // the message event.

            deadline = currentTime + yieldInterval;
            var hasTimeRemaining = true;

            try {
              var hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime);

              if (!hasMoreWork) {
                isMessageLoopRunning = false;
                scheduledHostCallback = null;
              } else {
                // If there's more work, schedule the next message event at the end
                // of the preceding one.
                port.postMessage(null);
              }
            } catch (error) {
              // If a scheduler task throws, exit the current browser task so the
              // error can be observed.
              port.postMessage(null);
              throw error;
            }
          } else {
            isMessageLoopRunning = false;
          } // Yielding to the browser will give it a chance to paint, so we can

        };

        var channel = new MessageChannel();
        var port = channel.port2;
        channel.port1.onmessage = performWorkUntilDeadline;

        requestHostCallback = function (callback) {
          scheduledHostCallback = callback;

          if (!isMessageLoopRunning) {
            isMessageLoopRunning = true;
            port.postMessage(null);
          }
        };

        requestHostTimeout = function (callback, ms) {
          taskTimeoutID = _setTimeout(function () {
            callback(exports.unstable_now());
          }, ms);
        };

        cancelHostTimeout = function () {
          _clearTimeout(taskTimeoutID);

          taskTimeoutID = -1;
        };
      }

      function push(heap, node) {
        var index = heap.length;
        heap.push(node);
        siftUp(heap, node, index);
      }

      function peek(heap) {
        var first = heap[0];
        return first === undefined ? null : first;
      }

      function pop(heap) {
        var first = heap[0];

        if (first !== undefined) {
          var last = heap.pop();

          if (last !== first) {
            heap[0] = last;
            siftDown(heap, last, 0);
          }

          return first;
        } else {
          return null;
        }
      }

      function siftUp(heap, node, i) {
        var index = i;

        while (true) {
          var parentIndex = index - 1 >>> 1;
          var parent = heap[parentIndex];

          if (parent !== undefined && compare(parent, node) > 0) {
            // The parent is larger. Swap positions.
            heap[parentIndex] = node;
            heap[index] = parent;
            index = parentIndex;
          } else {
            // The parent is smaller. Exit.
            return;
          }
        }
      }

      function siftDown(heap, node, i) {
        var index = i;
        var length = heap.length;

        while (index < length) {
          var leftIndex = (index + 1) * 2 - 1;
          var left = heap[leftIndex];
          var rightIndex = leftIndex + 1;
          var right = heap[rightIndex]; // If the left or right node is smaller, swap with the smaller of those.

          if (left !== undefined && compare(left, node) < 0) {
            if (right !== undefined && compare(right, left) < 0) {
              heap[index] = right;
              heap[rightIndex] = node;
              index = rightIndex;
            } else {
              heap[index] = left;
              heap[leftIndex] = node;
              index = leftIndex;
            }
          } else if (right !== undefined && compare(right, node) < 0) {
            heap[index] = right;
            heap[rightIndex] = node;
            index = rightIndex;
          } else {
            // Neither child is smaller. Exit.
            return;
          }
        }
      }

      function compare(a, b) {
        // Compare sort index first, then task id.
        var diff = a.sortIndex - b.sortIndex;
        return diff !== 0 ? diff : a.id - b.id;
      } // TODO: Use symbols?


      var NoPriority = 0;
      var ImmediatePriority = 1;
      var UserBlockingPriority = 2;
      var NormalPriority = 3;
      var LowPriority = 4;
      var IdlePriority = 5;
      var runIdCounter = 0;
      var mainThreadIdCounter = 0;
      var profilingStateSize = 4;
      var sharedProfilingBuffer = // $FlowFixMe Flow doesn't know about SharedArrayBuffer
      typeof SharedArrayBuffer === 'function' ? new SharedArrayBuffer(profilingStateSize * Int32Array.BYTES_PER_ELEMENT) : // $FlowFixMe Flow doesn't know about ArrayBuffer
      typeof ArrayBuffer === 'function' ? new ArrayBuffer(profilingStateSize * Int32Array.BYTES_PER_ELEMENT) : null // Don't crash the init path on IE9
      ;
      var profilingState = sharedProfilingBuffer !== null ? new Int32Array(sharedProfilingBuffer) : []; // We can't read this but it helps save bytes for null checks

      var PRIORITY = 0;
      var CURRENT_TASK_ID = 1;
      var CURRENT_RUN_ID = 2;
      var QUEUE_SIZE = 3;
      {
        profilingState[PRIORITY] = NoPriority; // This is maintained with a counter, because the size of the priority queue
        // array might include canceled tasks.

        profilingState[QUEUE_SIZE] = 0;
        profilingState[CURRENT_TASK_ID] = 0;
      } // Bytes per element is 4

      var INITIAL_EVENT_LOG_SIZE = 131072;
      var MAX_EVENT_LOG_SIZE = 524288; // Equivalent to 2 megabytes

      var eventLogSize = 0;
      var eventLogBuffer = null;
      var eventLog = null;
      var eventLogIndex = 0;
      var TaskStartEvent = 1;
      var TaskCompleteEvent = 2;
      var TaskErrorEvent = 3;
      var TaskCancelEvent = 4;
      var TaskRunEvent = 5;
      var TaskYieldEvent = 6;
      var SchedulerSuspendEvent = 7;
      var SchedulerResumeEvent = 8;

      function logEvent(entries) {
        if (eventLog !== null) {
          var offset = eventLogIndex;
          eventLogIndex += entries.length;

          if (eventLogIndex + 1 > eventLogSize) {
            eventLogSize *= 2;

            if (eventLogSize > MAX_EVENT_LOG_SIZE) {
              // Using console['error'] to evade Babel and ESLint
              console['error']("Scheduler Profiling: Event log exceeded maximum size. Don't " + 'forget to call `stopLoggingProfilingEvents()`.');
              stopLoggingProfilingEvents();
              return;
            }

            var newEventLog = new Int32Array(eventLogSize * 4);
            newEventLog.set(eventLog);
            eventLogBuffer = newEventLog.buffer;
            eventLog = newEventLog;
          }

          eventLog.set(entries, offset);
        }
      }

      function startLoggingProfilingEvents() {
        eventLogSize = INITIAL_EVENT_LOG_SIZE;
        eventLogBuffer = new ArrayBuffer(eventLogSize * 4);
        eventLog = new Int32Array(eventLogBuffer);
        eventLogIndex = 0;
      }

      function stopLoggingProfilingEvents() {
        var buffer = eventLogBuffer;
        eventLogSize = 0;
        eventLogBuffer = null;
        eventLog = null;
        eventLogIndex = 0;
        return buffer;
      }

      function markTaskStart(task, ms) {
        {
          profilingState[QUEUE_SIZE]++;

          if (eventLog !== null) {
            // performance.now returns a float, representing milliseconds. When the
            // event is logged, it's coerced to an int. Convert to microseconds to
            // maintain extra degrees of precision.
            logEvent([TaskStartEvent, ms * 1000, task.id, task.priorityLevel]);
          }
        }
      }

      function markTaskCompleted(task, ms) {
        {
          profilingState[PRIORITY] = NoPriority;
          profilingState[CURRENT_TASK_ID] = 0;
          profilingState[QUEUE_SIZE]--;

          if (eventLog !== null) {
            logEvent([TaskCompleteEvent, ms * 1000, task.id]);
          }
        }
      }

      function markTaskCanceled(task, ms) {
        {
          profilingState[QUEUE_SIZE]--;

          if (eventLog !== null) {
            logEvent([TaskCancelEvent, ms * 1000, task.id]);
          }
        }
      }

      function markTaskErrored(task, ms) {
        {
          profilingState[PRIORITY] = NoPriority;
          profilingState[CURRENT_TASK_ID] = 0;
          profilingState[QUEUE_SIZE]--;

          if (eventLog !== null) {
            logEvent([TaskErrorEvent, ms * 1000, task.id]);
          }
        }
      }

      function markTaskRun(task, ms) {
        {
          runIdCounter++;
          profilingState[PRIORITY] = task.priorityLevel;
          profilingState[CURRENT_TASK_ID] = task.id;
          profilingState[CURRENT_RUN_ID] = runIdCounter;

          if (eventLog !== null) {
            logEvent([TaskRunEvent, ms * 1000, task.id, runIdCounter]);
          }
        }
      }

      function markTaskYield(task, ms) {
        {
          profilingState[PRIORITY] = NoPriority;
          profilingState[CURRENT_TASK_ID] = 0;
          profilingState[CURRENT_RUN_ID] = 0;

          if (eventLog !== null) {
            logEvent([TaskYieldEvent, ms * 1000, task.id, runIdCounter]);
          }
        }
      }

      function markSchedulerSuspended(ms) {
        {
          mainThreadIdCounter++;

          if (eventLog !== null) {
            logEvent([SchedulerSuspendEvent, ms * 1000, mainThreadIdCounter]);
          }
        }
      }

      function markSchedulerUnsuspended(ms) {
        {
          if (eventLog !== null) {
            logEvent([SchedulerResumeEvent, ms * 1000, mainThreadIdCounter]);
          }
        }
      }
      /* eslint-disable no-var */
      // Math.pow(2, 30) - 1
      // 0b111111111111111111111111111111


      var maxSigned31BitInt = 1073741823; // Times out immediately

      var IMMEDIATE_PRIORITY_TIMEOUT = -1; // Eventually times out

      var USER_BLOCKING_PRIORITY = 250;
      var NORMAL_PRIORITY_TIMEOUT = 5000;
      var LOW_PRIORITY_TIMEOUT = 10000; // Never times out

      var IDLE_PRIORITY = maxSigned31BitInt; // Tasks are stored on a min heap

      var taskQueue = [];
      var timerQueue = []; // Incrementing id counter. Used to maintain insertion order.

      var taskIdCounter = 1; // Pausing the scheduler is useful for debugging.

      var currentTask = null;
      var currentPriorityLevel = NormalPriority; // This is set while performing work, to prevent re-entrancy.

      var isPerformingWork = false;
      var isHostCallbackScheduled = false;
      var isHostTimeoutScheduled = false;

      function advanceTimers(currentTime) {
        // Check for tasks that are no longer delayed and add them to the queue.
        var timer = peek(timerQueue);

        while (timer !== null) {
          if (timer.callback === null) {
            // Timer was cancelled.
            pop(timerQueue);
          } else if (timer.startTime <= currentTime) {
            // Timer fired. Transfer to the task queue.
            pop(timerQueue);
            timer.sortIndex = timer.expirationTime;
            push(taskQueue, timer);
            {
              markTaskStart(timer, currentTime);
              timer.isQueued = true;
            }
          } else {
            // Remaining timers are pending.
            return;
          }

          timer = peek(timerQueue);
        }
      }

      function handleTimeout(currentTime) {
        isHostTimeoutScheduled = false;
        advanceTimers(currentTime);

        if (!isHostCallbackScheduled) {
          if (peek(taskQueue) !== null) {
            isHostCallbackScheduled = true;
            requestHostCallback(flushWork);
          } else {
            var firstTimer = peek(timerQueue);

            if (firstTimer !== null) {
              requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
            }
          }
        }
      }

      function flushWork(hasTimeRemaining, initialTime) {
        {
          markSchedulerUnsuspended(initialTime);
        } // We'll need a host callback the next time work is scheduled.

        isHostCallbackScheduled = false;

        if (isHostTimeoutScheduled) {
          // We scheduled a timeout but it's no longer needed. Cancel it.
          isHostTimeoutScheduled = false;
          cancelHostTimeout();
        }

        isPerformingWork = true;
        var previousPriorityLevel = currentPriorityLevel;

        try {
          if (enableProfiling) {
            try {
              return workLoop(hasTimeRemaining, initialTime);
            } catch (error) {
              if (currentTask !== null) {
                var currentTime = exports.unstable_now();
                markTaskErrored(currentTask, currentTime);
                currentTask.isQueued = false;
              }

              throw error;
            }
          }
        } finally {
          currentTask = null;
          currentPriorityLevel = previousPriorityLevel;
          isPerformingWork = false;
          {
            var _currentTime = exports.unstable_now();

            markSchedulerSuspended(_currentTime);
          }
        }
      }

      function workLoop(hasTimeRemaining, initialTime) {
        var currentTime = initialTime;
        advanceTimers(currentTime);
        currentTask = peek(taskQueue);

        while (currentTask !== null && !enableSchedulerDebugging) {
          if (currentTask.expirationTime > currentTime && (!hasTimeRemaining || shouldYieldToHost())) {
            // This currentTask hasn't expired, and we've reached the deadline.
            break;
          }

          var callback = currentTask.callback;

          if (callback !== null) {
            currentTask.callback = null;
            currentPriorityLevel = currentTask.priorityLevel;
            var didUserCallbackTimeout = currentTask.expirationTime <= currentTime;
            markTaskRun(currentTask, currentTime);
            var continuationCallback = callback(didUserCallbackTimeout);
            currentTime = exports.unstable_now();

            if (typeof continuationCallback === 'function') {
              currentTask.callback = continuationCallback;
              markTaskYield(currentTask, currentTime);
            } else {
              {
                markTaskCompleted(currentTask, currentTime);
                currentTask.isQueued = false;
              }

              if (currentTask === peek(taskQueue)) {
                pop(taskQueue);
              }
            }

            advanceTimers(currentTime);
          } else {
            pop(taskQueue);
          }

          currentTask = peek(taskQueue);
        } // Return whether there's additional work


        if (currentTask !== null) {
          return true;
        } else {
          var firstTimer = peek(timerQueue);

          if (firstTimer !== null) {
            requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
          }

          return false;
        }
      }

      function unstable_runWithPriority(priorityLevel, eventHandler) {
        switch (priorityLevel) {
          case ImmediatePriority:
          case UserBlockingPriority:
          case NormalPriority:
          case LowPriority:
          case IdlePriority:
            break;

          default:
            priorityLevel = NormalPriority;
        }

        var previousPriorityLevel = currentPriorityLevel;
        currentPriorityLevel = priorityLevel;

        try {
          return eventHandler();
        } finally {
          currentPriorityLevel = previousPriorityLevel;
        }
      }

      function unstable_next(eventHandler) {
        var priorityLevel;

        switch (currentPriorityLevel) {
          case ImmediatePriority:
          case UserBlockingPriority:
          case NormalPriority:
            // Shift down to normal priority
            priorityLevel = NormalPriority;
            break;

          default:
            // Anything lower than normal priority should remain at the current level.
            priorityLevel = currentPriorityLevel;
            break;
        }

        var previousPriorityLevel = currentPriorityLevel;
        currentPriorityLevel = priorityLevel;

        try {
          return eventHandler();
        } finally {
          currentPriorityLevel = previousPriorityLevel;
        }
      }

      function unstable_wrapCallback(callback) {
        var parentPriorityLevel = currentPriorityLevel;
        return function () {
          // This is a fork of runWithPriority, inlined for performance.
          var previousPriorityLevel = currentPriorityLevel;
          currentPriorityLevel = parentPriorityLevel;

          try {
            return callback.apply(this, arguments);
          } finally {
            currentPriorityLevel = previousPriorityLevel;
          }
        };
      }

      function timeoutForPriorityLevel(priorityLevel) {
        switch (priorityLevel) {
          case ImmediatePriority:
            return IMMEDIATE_PRIORITY_TIMEOUT;

          case UserBlockingPriority:
            return USER_BLOCKING_PRIORITY;

          case IdlePriority:
            return IDLE_PRIORITY;

          case LowPriority:
            return LOW_PRIORITY_TIMEOUT;

          case NormalPriority:
          default:
            return NORMAL_PRIORITY_TIMEOUT;
        }
      }

      function unstable_scheduleCallback(priorityLevel, callback, options) {
        var currentTime = exports.unstable_now();
        var startTime;
        var timeout;

        if (typeof options === 'object' && options !== null) {
          var delay = options.delay;

          if (typeof delay === 'number' && delay > 0) {
            startTime = currentTime + delay;
          } else {
            startTime = currentTime;
          }

          timeout = typeof options.timeout === 'number' ? options.timeout : timeoutForPriorityLevel(priorityLevel);
        } else {
          timeout = timeoutForPriorityLevel(priorityLevel);
          startTime = currentTime;
        }

        var expirationTime = startTime + timeout;
        var newTask = {
          id: taskIdCounter++,
          callback: callback,
          priorityLevel: priorityLevel,
          startTime: startTime,
          expirationTime: expirationTime,
          sortIndex: -1
        };
        {
          newTask.isQueued = false;
        }

        if (startTime > currentTime) {
          // This is a delayed task.
          newTask.sortIndex = startTime;
          push(timerQueue, newTask);

          if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
            // All tasks are delayed, and this is the task with the earliest delay.
            if (isHostTimeoutScheduled) {
              // Cancel an existing timeout.
              cancelHostTimeout();
            } else {
              isHostTimeoutScheduled = true;
            } // Schedule a timeout.


            requestHostTimeout(handleTimeout, startTime - currentTime);
          }
        } else {
          newTask.sortIndex = expirationTime;
          push(taskQueue, newTask);
          {
            markTaskStart(newTask, currentTime);
            newTask.isQueued = true;
          } // Schedule a host callback, if needed. If we're already performing work,
          // wait until the next time we yield.

          if (!isHostCallbackScheduled && !isPerformingWork) {
            isHostCallbackScheduled = true;
            requestHostCallback(flushWork);
          }
        }

        return newTask;
      }

      function unstable_pauseExecution() {}

      function unstable_continueExecution() {
        if (!isHostCallbackScheduled && !isPerformingWork) {
          isHostCallbackScheduled = true;
          requestHostCallback(flushWork);
        }
      }

      function unstable_getFirstCallbackNode() {
        return peek(taskQueue);
      }

      function unstable_cancelCallback(task) {
        {
          if (task.isQueued) {
            var currentTime = exports.unstable_now();
            markTaskCanceled(task, currentTime);
            task.isQueued = false;
          }
        } // Null out the callback to indicate the task has been canceled. (Can't
        // remove from the queue because you can't remove arbitrary nodes from an
        // array based heap, only the first one.)

        task.callback = null;
      }

      function unstable_getCurrentPriorityLevel() {
        return currentPriorityLevel;
      }

      function unstable_shouldYield() {
        var currentTime = exports.unstable_now();
        advanceTimers(currentTime);
        var firstTask = peek(taskQueue);
        return firstTask !== currentTask && currentTask !== null && firstTask !== null && firstTask.callback !== null && firstTask.startTime <= currentTime && firstTask.expirationTime < currentTask.expirationTime || shouldYieldToHost();
      }

      var unstable_requestPaint = requestPaint;
      var unstable_Profiling = {
        startLoggingProfilingEvents: startLoggingProfilingEvents,
        stopLoggingProfilingEvents: stopLoggingProfilingEvents,
        sharedProfilingBuffer: sharedProfilingBuffer
      };
      exports.unstable_IdlePriority = IdlePriority;
      exports.unstable_ImmediatePriority = ImmediatePriority;
      exports.unstable_LowPriority = LowPriority;
      exports.unstable_NormalPriority = NormalPriority;
      exports.unstable_Profiling = unstable_Profiling;
      exports.unstable_UserBlockingPriority = UserBlockingPriority;
      exports.unstable_cancelCallback = unstable_cancelCallback;
      exports.unstable_continueExecution = unstable_continueExecution;
      exports.unstable_getCurrentPriorityLevel = unstable_getCurrentPriorityLevel;
      exports.unstable_getFirstCallbackNode = unstable_getFirstCallbackNode;
      exports.unstable_next = unstable_next;
      exports.unstable_pauseExecution = unstable_pauseExecution;
      exports.unstable_requestPaint = unstable_requestPaint;
      exports.unstable_runWithPriority = unstable_runWithPriority;
      exports.unstable_scheduleCallback = unstable_scheduleCallback;
      exports.unstable_shouldYield = unstable_shouldYield;
      exports.unstable_wrapCallback = unstable_wrapCallback;
    })();
  }
});
scheduler_development.unstable_now;
scheduler_development.unstable_forceFrameRate;
scheduler_development.unstable_IdlePriority;
scheduler_development.unstable_ImmediatePriority;
scheduler_development.unstable_LowPriority;
scheduler_development.unstable_NormalPriority;
scheduler_development.unstable_Profiling;
scheduler_development.unstable_UserBlockingPriority;
scheduler_development.unstable_cancelCallback;
scheduler_development.unstable_continueExecution;
scheduler_development.unstable_getCurrentPriorityLevel;
scheduler_development.unstable_getFirstCallbackNode;
scheduler_development.unstable_next;
scheduler_development.unstable_pauseExecution;
scheduler_development.unstable_requestPaint;
scheduler_development.unstable_runWithPriority;
scheduler_development.unstable_scheduleCallback;
scheduler_development.unstable_shouldYield;
scheduler_development.unstable_wrapCallback;

var scheduler = createCommonjsModule(function (module) {

  if (process.env.NODE_ENV === 'production') {
    module.exports = scheduler_production_min;
  } else {
    module.exports = scheduler_development;
  }
});

/** @license React v0.19.1
 * scheduler-tracing.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var b = 0;
var __interactionsRef = null;
var __subscriberRef = null;

var unstable_clear = function unstable_clear(a) {
  return a();
};

var unstable_getCurrent = function unstable_getCurrent() {
  return null;
};

var unstable_getThreadID = function unstable_getThreadID() {
  return ++b;
};

var unstable_subscribe = function unstable_subscribe() {};

var unstable_trace = function unstable_trace(a, d, c) {
  return c();
};

var unstable_unsubscribe = function unstable_unsubscribe() {};

var unstable_wrap = function unstable_wrap(a) {
  return a;
};

var schedulerTracing_production_min = {
  __interactionsRef: __interactionsRef,
  __subscriberRef: __subscriberRef,
  unstable_clear: unstable_clear,
  unstable_getCurrent: unstable_getCurrent,
  unstable_getThreadID: unstable_getThreadID,
  unstable_subscribe: unstable_subscribe,
  unstable_trace: unstable_trace,
  unstable_unsubscribe: unstable_unsubscribe,
  unstable_wrap: unstable_wrap
};

var schedulerTracing_development = createCommonjsModule(function (module, exports) {

  if (process.env.NODE_ENV !== "production") {
    (function () {

      var DEFAULT_THREAD_ID = 0; // Counters used to generate unique IDs.

      var interactionIDCounter = 0;
      var threadIDCounter = 0; // Set of currently traced interactions.
      // Interactions "stack"–
      // Meaning that newly traced interactions are appended to the previously active set.
      // When an interaction goes out of scope, the previous set (if any) is restored.

      exports.__interactionsRef = null; // Listener(s) to notify when interactions begin and end.

      exports.__subscriberRef = null;
      {
        exports.__interactionsRef = {
          current: new Set()
        };
        exports.__subscriberRef = {
          current: null
        };
      }

      function unstable_clear(callback) {
        var prevInteractions = exports.__interactionsRef.current;
        exports.__interactionsRef.current = new Set();

        try {
          return callback();
        } finally {
          exports.__interactionsRef.current = prevInteractions;
        }
      }

      function unstable_getCurrent() {
        {
          return exports.__interactionsRef.current;
        }
      }

      function unstable_getThreadID() {
        return ++threadIDCounter;
      }

      function unstable_trace(name, timestamp, callback) {
        var threadID = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_THREAD_ID;
        var interaction = {
          __count: 1,
          id: interactionIDCounter++,
          name: name,
          timestamp: timestamp
        };
        var prevInteractions = exports.__interactionsRef.current; // Traced interactions should stack/accumulate.
        // To do that, clone the current interactions.
        // The previous set will be restored upon completion.

        var interactions = new Set(prevInteractions);
        interactions.add(interaction);
        exports.__interactionsRef.current = interactions;
        var subscriber = exports.__subscriberRef.current;
        var returnValue;

        try {
          if (subscriber !== null) {
            subscriber.onInteractionTraced(interaction);
          }
        } finally {
          try {
            if (subscriber !== null) {
              subscriber.onWorkStarted(interactions, threadID);
            }
          } finally {
            try {
              returnValue = callback();
            } finally {
              exports.__interactionsRef.current = prevInteractions;

              try {
                if (subscriber !== null) {
                  subscriber.onWorkStopped(interactions, threadID);
                }
              } finally {
                interaction.__count--; // If no async work was scheduled for this interaction,
                // Notify subscribers that it's completed.

                if (subscriber !== null && interaction.__count === 0) {
                  subscriber.onInteractionScheduledWorkCompleted(interaction);
                }
              }
            }
          }
        }

        return returnValue;
      }

      function unstable_wrap(callback) {
        var threadID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_THREAD_ID;
        var wrappedInteractions = exports.__interactionsRef.current;
        var subscriber = exports.__subscriberRef.current;

        if (subscriber !== null) {
          subscriber.onWorkScheduled(wrappedInteractions, threadID);
        } // Update the pending async work count for the current interactions.
        // Update after calling subscribers in case of error.


        wrappedInteractions.forEach(function (interaction) {
          interaction.__count++;
        });
        var hasRun = false;

        function wrapped() {
          var prevInteractions = exports.__interactionsRef.current;
          exports.__interactionsRef.current = wrappedInteractions;
          subscriber = exports.__subscriberRef.current;

          try {
            var returnValue;

            try {
              if (subscriber !== null) {
                subscriber.onWorkStarted(wrappedInteractions, threadID);
              }
            } finally {
              try {
                returnValue = callback.apply(undefined, arguments);
              } finally {
                exports.__interactionsRef.current = prevInteractions;

                if (subscriber !== null) {
                  subscriber.onWorkStopped(wrappedInteractions, threadID);
                }
              }
            }

            return returnValue;
          } finally {
            if (!hasRun) {
              // We only expect a wrapped function to be executed once,
              // But in the event that it's executed more than once–
              // Only decrement the outstanding interaction counts once.
              hasRun = true; // Update pending async counts for all wrapped interactions.
              // If this was the last scheduled async work for any of them,
              // Mark them as completed.

              wrappedInteractions.forEach(function (interaction) {
                interaction.__count--;

                if (subscriber !== null && interaction.__count === 0) {
                  subscriber.onInteractionScheduledWorkCompleted(interaction);
                }
              });
            }
          }
        }

        wrapped.cancel = function cancel() {
          subscriber = exports.__subscriberRef.current;

          try {
            if (subscriber !== null) {
              subscriber.onWorkCanceled(wrappedInteractions, threadID);
            }
          } finally {
            // Update pending async counts for all wrapped interactions.
            // If this was the last scheduled async work for any of them,
            // Mark them as completed.
            wrappedInteractions.forEach(function (interaction) {
              interaction.__count--;

              if (subscriber && interaction.__count === 0) {
                subscriber.onInteractionScheduledWorkCompleted(interaction);
              }
            });
          }
        };

        return wrapped;
      }

      var subscribers = null;
      {
        subscribers = new Set();
      }

      function unstable_subscribe(subscriber) {
        {
          subscribers.add(subscriber);

          if (subscribers.size === 1) {
            exports.__subscriberRef.current = {
              onInteractionScheduledWorkCompleted: onInteractionScheduledWorkCompleted,
              onInteractionTraced: onInteractionTraced,
              onWorkCanceled: onWorkCanceled,
              onWorkScheduled: onWorkScheduled,
              onWorkStarted: onWorkStarted,
              onWorkStopped: onWorkStopped
            };
          }
        }
      }

      function unstable_unsubscribe(subscriber) {
        {
          subscribers.delete(subscriber);

          if (subscribers.size === 0) {
            exports.__subscriberRef.current = null;
          }
        }
      }

      function onInteractionTraced(interaction) {
        var didCatchError = false;
        var caughtError = null;
        subscribers.forEach(function (subscriber) {
          try {
            subscriber.onInteractionTraced(interaction);
          } catch (error) {
            if (!didCatchError) {
              didCatchError = true;
              caughtError = error;
            }
          }
        });

        if (didCatchError) {
          throw caughtError;
        }
      }

      function onInteractionScheduledWorkCompleted(interaction) {
        var didCatchError = false;
        var caughtError = null;
        subscribers.forEach(function (subscriber) {
          try {
            subscriber.onInteractionScheduledWorkCompleted(interaction);
          } catch (error) {
            if (!didCatchError) {
              didCatchError = true;
              caughtError = error;
            }
          }
        });

        if (didCatchError) {
          throw caughtError;
        }
      }

      function onWorkScheduled(interactions, threadID) {
        var didCatchError = false;
        var caughtError = null;
        subscribers.forEach(function (subscriber) {
          try {
            subscriber.onWorkScheduled(interactions, threadID);
          } catch (error) {
            if (!didCatchError) {
              didCatchError = true;
              caughtError = error;
            }
          }
        });

        if (didCatchError) {
          throw caughtError;
        }
      }

      function onWorkStarted(interactions, threadID) {
        var didCatchError = false;
        var caughtError = null;
        subscribers.forEach(function (subscriber) {
          try {
            subscriber.onWorkStarted(interactions, threadID);
          } catch (error) {
            if (!didCatchError) {
              didCatchError = true;
              caughtError = error;
            }
          }
        });

        if (didCatchError) {
          throw caughtError;
        }
      }

      function onWorkStopped(interactions, threadID) {
        var didCatchError = false;
        var caughtError = null;
        subscribers.forEach(function (subscriber) {
          try {
            subscriber.onWorkStopped(interactions, threadID);
          } catch (error) {
            if (!didCatchError) {
              didCatchError = true;
              caughtError = error;
            }
          }
        });

        if (didCatchError) {
          throw caughtError;
        }
      }

      function onWorkCanceled(interactions, threadID) {
        var didCatchError = false;
        var caughtError = null;
        subscribers.forEach(function (subscriber) {
          try {
            subscriber.onWorkCanceled(interactions, threadID);
          } catch (error) {
            if (!didCatchError) {
              didCatchError = true;
              caughtError = error;
            }
          }
        });

        if (didCatchError) {
          throw caughtError;
        }
      }

      exports.unstable_clear = unstable_clear;
      exports.unstable_getCurrent = unstable_getCurrent;
      exports.unstable_getThreadID = unstable_getThreadID;
      exports.unstable_subscribe = unstable_subscribe;
      exports.unstable_trace = unstable_trace;
      exports.unstable_unsubscribe = unstable_unsubscribe;
      exports.unstable_wrap = unstable_wrap;
    })();
  }
});
schedulerTracing_development.__interactionsRef;
schedulerTracing_development.__subscriberRef;
schedulerTracing_development.unstable_clear;
schedulerTracing_development.unstable_getCurrent;
schedulerTracing_development.unstable_getThreadID;
schedulerTracing_development.unstable_subscribe;
schedulerTracing_development.unstable_trace;
schedulerTracing_development.unstable_unsubscribe;
schedulerTracing_development.unstable_wrap;

var tracing = createCommonjsModule(function (module) {

  if (process.env.NODE_ENV === 'production') {
    module.exports = schedulerTracing_production_min;
  } else {
    module.exports = schedulerTracing_development;
  }
});

export { scheduler as s, tracing as t };
