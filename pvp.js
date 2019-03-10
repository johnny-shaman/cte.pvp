(() => {
  'use strict';
  const _ = require('cte');
  const {offing, ansing} = {offing: _([]), ansing: _([])};
  module.exports = (dir, file, port, ip) => _(require('http').createServer(
    _(require('express'))
    .endo($ => ({
      app: $(),
      static: $.static
    }))
    .endo($ => _($.app).been
      .use(require('cors')())
      .use($.static(dir))
      .set('view options', {layout: false})
      .get('/', (req, res) => res.status(200).render(file))
      ._
    )._
  ))
  .use(sv => _(new (require('ws').Server)({server : sv})).been
    .on('connection', ws => _(
      offing._.length <= 0
      ? offing.pushR(
        _(ws).been
        .send(_(false).json)
        .on('message', sdp => _(ws).put({sdp}))
        ._
      )
      : ansing.pushR(
        _(ws).been
        .send(offing._[0].sdp)
        .on('message', m => ansing.use(a => (
          _(a.findIndex(v => v === ws)).endo(
            i => a.splice(i, 1).pop().close()
          ),
          offing.popL.been.send(m).close()
        )))
        ._
      )).use(a => ws.on('close', m => a.map($ => $.filter(v => v !== ws))))
    )
  )
  ._
  .listen(port || process.env.PORT, ip || process.env.IP);
})();
