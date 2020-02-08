var vkId = 0;
var i = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN0PQRSTUVWXYZO123456789+/=";
var r = {
  v: function(e) {
    return e
      .split("")
      .reverse()
      .join("");
  },
  r: function(e, t) {
    e = e.split("");
    for (var n, r = i + i, o = e.length; o--; )
      ~(n = r.indexOf(e[o])) && (e[o] = r.substr(n - t, 1));
    return e.join("");
  },
  s: function(e, t) {
    var n = e.length;
    if (n) {
      var i = (function(e, t) {
          var n = e.length,
            i = [];
          if (n) {
            var r = n;
            for (t = Math.abs(t); r--; )
              (t = ((n * (r + 1)) ^ (t + r)) % n), (i[r] = t);
          }
          return i;
        })(e, t),
        r = 0;
      for (e = e.split(""); ++r < n; )
        e[r] = e.splice(i[n - 1 - r], 1, e[r])[0];
      e = e.join("");
    }
    return e;
  },
  i: function(e, t) {
    return r.s(e, t ^ vkId);
  },
  x: function(e, t) {
    var n = [];
    return (
      (t = t.charCodeAt(0)),
      e.split("").map(function(e, i) {
        n.push(String.fromCharCode(i.charCodeAt(0) ^ t));
      }),
      n.join("")
    );
  }
};

function o(e) {
  if (!e || e.length % 4 == 1) return !1;
  for (var t, n, r = 0, o = 0, a = ""; (n = e.charAt(o++)); )
    ~(n = i.indexOf(n)) &&
      ((t = r % 4 ? 64 * t + n : n), r++ % 4) &&
      (a += String.fromCharCode(255 & (t >> ((-2 * r) & 6))));
  return a;
}

export function audioUnmaskSource(_vkId: number, src: string): string {
  vkId = _vkId;

  if (src.indexOf("audio_api_unavailable")) {
    var t = src.split("?extra=")[1].split("#"),
      n = "" === t[1] ? "" : o(t[1]);
    if (((t = o(t[0])), "string" != typeof n || !t)) return src;
    for (
      var i, a, s = (n = n ? n.split(String.fromCharCode(9)) : []).length;
      s--;

    ) {
      if (
        ((a = n[s].split(String.fromCharCode(11))),
        (i = a.splice(0, 1, t)[0]),
        !r[i])
      )
        return src;
      t = r[i].apply(null, a);
    }
    if (t && "http" === t.substr(0, 4)) return t;
  }
  return src;
}
