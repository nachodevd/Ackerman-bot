/*import { Channel, Message, TextChannel, MessageEmbed } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { crearDB } from 'megadb'
import { g, b } from "../../../config/emoji.json";
import { readFile, writeFile } from 'fs';
import { extname } from "path";
import {filledBar,splitBar} from "string-progressbar";
import request from "request";
export default class TestCommand extends BaseCommand {
  constructor () {
    super( 'exportar', '', [] );
  }
  async run( client: DiscordClient, message: Message, args: Array<string> ) {

    const { configuracionDelBot } = require( `../../../config/anti-flood/${ message.guild.id }.json` )
    let prefix = configuracionDelBot.prefix || ">"
    let embed = new MessageEmbed()
    .setColor( '#6666cc' )
    .setDescription(`Se ha cambiado la configuracion de **${message.guild.id}**`)
    .addField( "Miembro", `**${ message.author.id }**x**${ message.author.tag }**` )
    .addField( "Servidor", `**${ message.guild.id }**x**${ message.guild.name }**` )
    .addField( "Canal", `**${ message.channel.id }**x**${ ( message.channel as TextChannel ).name }**` )
    .setAuthor(message.author.username, message.author.avatarURL())
    .setFooter(message.author.username, message.author.avatarURL())
    .setTimestamp()
    if ( !message.member.hasPermission( 'MANAGE_GUILD' ) ) return message.channel.send( 'Necesitas permisos de `MANAGE_GUILD` para exportar la configuracion.' )
    let si = new crearDB( { carpeta: "database", nombre: "setup" } )
    if ( si.tiene( message.guild.id ) ) {
      let file = message.attachments.first()
      if ( !file ) return message.channel.send( `${ b } Debes ingresar el archivo de configuracion.` )
      if ( !/json/.test( extname( file.name ) ) ) return message.channel.send( `${ b } La configuracion debe estar en formato \`.JSON\`.` )
      if ( file.name.slice( 0, file.name.length - 5 ) !== message.guild.id ) return message.channel.send( `${ b } La configuracion debe tener el mismo nombre que la ID de tu servidor.` )
      request( file.url, function ( err, response, body ) {
        
        (client.channels.cache.get('864466730469163008') as TextChannel).send(embed)
        writeFile( `C:/Users/Compumar/Desktop/shark/config/anti-flood/${ message.guild.id }.json`, body, function ( err ) {
          if ( !err ) return
            return message.channel.send( `${ g } Se cambio correctamente su configuracion del servidor. Si su bot a quedado inutilizable debido a poner mal la configuracion, usted debe de sacar y volver a poner el bot. Puede leer mas acerca de eso ingresando \`${ prefix }ayuda configuracion\`` )
        } )
      } )
    }
  }
}

/*


*/