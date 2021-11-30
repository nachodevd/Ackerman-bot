/*import { Channel, Message, TextChannel, MessageEmbed, MessageAttachment } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { crearDB } from 'megadb'
import { g, b } from "../../../config/emoji.json";
import { readFile, readFileSync, writeFile } from 'fs';

export default class TestCommand extends BaseCommand {
  constructor () {
    super( 'importar', '', [] );
  }
  async run( client: DiscordClient, message: Message, args: Array<string> ) {
    if ( !message.guild.me.hasPermission( 'ATTACH_FILES' ) ) return message.channel.send( 'Necesito permisos de `ATTACH_FILES` para ejecutar este comando' )
    if ( !message.member.hasPermission( 'MANAGE_GUILD' ) ) return message.channel.send( 'Necesitas permisos de `MANAGE_GUILD` para importar la configuracion.' )
    let si = new crearDB( { carpeta: "database", nombre: "setup" } )
    const { configuracionDelBot, ajustesExtrasflood } = require( `../../../config/anti-flood/${ message.guild.id }.json` )
    let prefix = configuracionDelBot.prefix || ">"
    if ( !si.tiene( message.guild.id ) ) {
      //Hace archivo de config
      message.channel.send( '<:cargando:859897726467440660> Haciendo archivo de configuracion.' ).then( e => {
        //Lee n.json
        readFile( `C:/Users/Compumar/Desktop/shark/config/n.json`, function data( err, data ) {
          //Si falla error 
          if ( err ) { return }
          //Guardamos data como "a"
          let a = data
          //Creamos el archivo
          writeFile( `C:/Users/Compumar/Desktop/shark/config/anti-flood/${ message.guild.id }.json`, `${ a }`, function ( err ) {
            if ( err ) { return } else {
              //Borramos el mensaje de la linea 19
              e.delete()
              //Mandamos el json
              message.channel.send( `Por favor no cambies el nombre del archivo, si no, nunca funcionara la configuracion. Tampoco cambies las "ID" de "infracciones"`, { files: [`C:/Users/Compumar/Desktop/shark/config/anti-flood/${ message.guild.id }.json`] } )
              //Seteamos true
              si.set( message.guild.id, true )
            }
          } )
        } )
      } )
      //Pero si tiene message.guild.id
    } else if ( si.tiene( message.guild.id ) ) {
      //Leemos el archivo
      readFile( `C:/Users/Compumar/Desktop/shark/config/anti-flood/${ message.guild.id }.json`, function data( err, data ) {
        //Si hay un error, osea si no encuentra el archivo a leer
        if ( err ) {

          //Lee n.json
          readFile( `C:/Users/Compumar/Desktop/shark/config/n.json`, function data( err, data ) {
            //Si falla error 
            if ( err ) { return }
            //Guardamos data como "a" 
            let a = data
            //Mandamos que se esta haciendo un archivo
            message.channel.send( `---|  [    ]  |--- Renovando archivo de configuracion.` ).then( m => {
              writeFile( `C:/Users/Compumar/Desktop/shark/config/anti-flood/${ message.guild.id }.json`, `${ a }`, function ( err ) {
                let random = Math.floor( Math.random() * 7000 )
                setTimeout( () => { m.edit( '---|  [▄   ]  |--- Renovando archivo de configuracion.' ) }, 1000 );
                setTimeout( () => { m.edit( '---|  [   ▀]  |--- Renovando archivo de configuracion.' ) }, 2000 );
                setTimeout( () => { m.edit( '---|  [▄   ]  |--- Renovando archivo de configuracion.' ) }, 3000 );
                setTimeout( () => { m.edit( '---|  [   ▀]  |--- Renovando archivo de configuracion.' ) }, 4000 );
                setTimeout( () => { m.edit( '---|  [▄   ]  |--- Renovando archivo de configuracion.' ) }, 5000 );
                setTimeout( () => { m.edit( '---|  [   ▀]  |--- Renovando archivo de configuracion.' ) }, 6000 );
                setTimeout( () => { m.edit( '---|  [▄   ]  |--- Renovando archivo de configuracion.' ) }, 7000 );
                setTimeout( () => { m.edit( '---|  [   ▀]  |--- Renovando archivo de configuracion.' ) }, 8000 );
                //Hacemos el archivo
                //si hay un error retorna, pero si no
                if ( err ) { return } else {
                  //Borra el mensaje
                  setTimeout( () => { m.delete() }, 8000 );

                  //Manda el json

                  setTimeout( () => { m.channel.send( `${ g } No cambies el nombre del archivo, si no, nunca funcionara la configuracion. Tampoco cambies las "ID" de "AutoMod". Para mas informacion utilice \`${ prefix }ayuda configuracion\`.`, { files: [`C:/Users/Compumar/Desktop/shark/config/anti-flood/${ message.guild.id }.json`] } ).catch( () => { return } ) }, 9000 );


                  //Setea

                  setTimeout( () => { si.set( message.guild.id, true ) }, 11000 );


                }
              } )
            } )

          } )


        }//44 
        //Si no pasa nada de lo anterior simplemente manda el archivo.
        else {
          message.channel.send( `${ g } No cambies el nombre del archivo, si no, nunca funcionara la configuracion. Tampoco cambies las "ID" de "AutoMod". Para mas informacion utilice \`${ prefix }ayuda configuracion\`.`, { files: [`C:/Users/Compumar/Desktop/shark/config/anti-flood/${ message.guild.id }.json`] } )

        }
      } )
    }
  }
}
/*
          if ( err ) return
        } )
        e.delete()
      } )

    } else {
    }
*/