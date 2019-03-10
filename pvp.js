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
        .on('message', sdp => _(ws).put({sdp}))
        .send(_(false).json._)
        ._
      )
      : ansing.pushR(
        _(ws).been
        .on('message', m => ansing.use(a => (
          a.splice(a.findIndex(v => v === ws), 1).pop().close(),
          offing.popL.been.send(m).close()
        )))
        .send(_(offing._[0].sdp).json._)
        ._
      )).use(a => ws.on('close', m => a.map($ => $.filter(v => v !== ws))))
    )._
  )
  ._
  .listen(port || process.env.PORT, ip || process.env.IP);
})();
