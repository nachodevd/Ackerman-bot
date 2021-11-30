const sqlite3 = require('sqlite3').verbose(),
  base = new sqlite3.Database('./.sqlite');
import logColor from 'chalk'

export function agregarCooldown(comando: string, value: string, tiempo, cb) {
  base.run("CREATE TABLE IF NOT EXISTS cooldowns (value TEXT, comando TEXT, tiempo TEXT, estado INTEGER)", select);

  function select() {
    let cmd = comando.toLowerCase();

    base.get("SELECT * FROM cooldowns WHERE value = ? AND comando = ?", [value, cmd], function (err, filas) {
      if (err) {
        throw logColor.red('[ERROR]: ' + err);

      } else {
        if (!filas) {

          let prepare = base.prepare("INSERT INTO cooldowns VALUES (?, ?, ?, ?)", update);
          prepare.run(value, cmd, Date.now(), 0);

          function update() {
            cb(true)
          }

        } else {

          let hh, mm, ss;

          if (!tiempo.horas) {
            hh = 0;

          } else {
            hh = (parseInt(tiempo.horas) * 3600000);

          }

          if (!tiempo.minutos) {
            mm = 0;

          } else {
            mm = (parseInt(tiempo.minutos) * 60000);

          }

          if (!tiempo.segundos) {
            ss = 0;

          } else {
            ss = parseInt(tiempo.segundos) * 1000;

          }

          let totalpre = hh + mm + ss;

          let time = totalpre;
          let total = time + parseInt(filas.tiempo);

          if (total < Date.now()) {

            base.run(`UPDATE cooldowns SET tiempo = ${Date.now()} WHERE value=? AND comando=?`,
              [filas.value, filas.comando],
              function (err) {
                if (err) {
                  throw logColor.red('[ERROR]: ' + err);
                } else {
                  cb(true)

                }
              })

          } else {

            let cdTiempo = Math.abs((Date.now() - (parseInt(filas.tiempo) + time)));

            let tiempoMili = cdTiempo;
            let segundos = parseInt(`${tiempoMili = tiempoMili / 1000}`) % 60;
            let minutos = parseInt(`${tiempoMili = tiempoMili / 60}`) % 60;
            let horas = parseInt(`${tiempoMili = tiempoMili / 60}`) % 24;

            let tiempo = {
              'horas': horas,
              'minutos': minutos,
              'segundos': segundos

            };
            const verificar = false
            cb(verificar, tiempo);

          }

        }

      }

    });
  }
}
export function removerCooldown(comando, value, cb) {
  base.run("CREATE TABLE IF NOT EXISTS cooldowns (value TEXT, comando TEXT, tiempo TEXT, estado INTEGER)", select);

  function select() {
    base.run(`DELETE FROM cooldowns WHERE value=? AND comando=?`, [value, comando], function (err) {
      if (err) {
        throw logColor.red('[ERROR]: ' + err.message);
      } else {

        cb(this.changes)
      }
    })
  }
}

export function resetCooldown(cb) {
  base.run("CREATE TABLE IF NOT EXISTS cooldowns (value TEXT, comando TEXT, tiempo TEXT, estado INTEGER)", select);

  function select() {
    base.run(`DELETE FROM cooldowns `, function (err) {
      if (err) {
        throw logColor.red('[ERROR]: ' + err.message);
      } else {

        cb(this.changes)
      }
    })
  }
}