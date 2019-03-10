(() => {
  'use strict';
  const _ = require("losand");
  const {offing, ansing} = {offing: _([]), ansing: _([])};
  module.exports = (dir, file, port, ip) => _(require('http').createServer(
    _(require('express'))
    .endo($ => ({
      app: $(),
      "static": $.static
    }))
    .endo($ => _($.app).been
        .use(require('cors')())
        .use($.static(dir))
        .set('view options', {layout: false})
        .get('/', (req, res) => res.status(200).render(file))
        ._
      )._
    )._
  )
  .use(sv => _(new (require('ws').Server)({server : sv})).on(
    'connection', ws => _(
      offing._.length <= 0
      ? offing.pushR(
        _(ws).been
        .on('message', sdp => _(ws).put({sdp}))
        .send(_(false).json._)
        ._
      )
      : ansing.pushR(
        _(ws).been
        .on('message', m => ansing.use(
            a => (
              _(a.findIndex(v => v === ws))
              .endo(i => a.splice(i, 1))
              .use(s => s[0].close()),
              offing.use(
                o => _(o.shift()).been.send(m).close()
              )
            )
          )
        )
        .send(offing._[0].sdp)
        ._
      )
    )
    .use(a => _(ws).on(
      'close', m => a.map($ => $.filter(v => v !== ws))
    ))
  ))._.listen(port || process.env.PORT, ip || process.env.IP);
})();
