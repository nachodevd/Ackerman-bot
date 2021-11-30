/*import { Channel, Message, TextChannel, MessageEmbed } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { crearDB } from 'megadb'
import { g, b } from "../../../config/emoji.json";
import { readFile, readFileSync, writeFile, writeFileSync } from 'fs';


export default class TestCommand extends BaseCommand {
    constructor () {
        super( 'fix', '', [] );
    }
    async run( client: DiscordClient, message: Message, args: Array<string> ) {
        if ( !message.member.hasPermission( 'MANAGE_GUILD' ) ) return message.channel.send( 'Necesitas permisos de `MANAGE_GUILD` para reponer la configuracion del servidor.' )
        message.channel.send(
            "Estas seguro que quieres reestablecer la configuracion de este servidor? (`s`=si/`n`=no)"
        );
        message.channel
            .awaitMessages( m => m.author.id == message.author.id,
                {
                    max: 1
                } )
            .then( ( collected ) => {
                if ( collected.first().content.toLowerCase() == "n" ) {
                    return message.channel.send( `${ b } Se cancelo el reseteo de la configuracion de este servidor.` )
                } else if ( collected.first().content.toLowerCase() == "s" ) {

                    let a = readFileSync( 'C:/Users/Compumar/Desktop/shark/config/n.json' )
                    let ax = readFile( `C:/Users/Compumar/Desktop/shark/config/anti-flood/${message.guild.id}.json`, function data(err, data){
                        if(err) {return}else{
                            
                        }

                    })
                    function compareObjects(obj1, obj2) {
                        return JSON.stringify(obj1) === JSON.stringify(obj2);
                    }
                    if(compareObjects(a, ax) === true) return message.channel.send(`${b} Ya tienes la configuracion predeterminada.`)
                    message.channel.send( `---|  [    ]  |--- Renovando archivo de configuracion.` ).then( m => {
                        writeFile( `C:/Users/Compumar/Desktop/shark/config/anti-flood/${ message.guild.id }.json`, `${ a }`, function ( err ) {
                            setTimeout( () => { m.edit( '---|  [▄   ]  |--- Renovando archivo de configuracion.' ) }, 1000 );
                            setTimeout( () => { m.edit( '---|  [   ▀]  |--- Renovando archivo de configuracion.' ) }, 2000 );
                            setTimeout( () => { m.edit( '---|  [▄   ]  |--- Renovando archivo de configuracion.' ) }, 3000 );
                            setTimeout( () => { m.edit( '---|  [   ▀]  |--- Renovando archivo de configuracion.' ) }, 4000 );
                            setTimeout( () => { m.edit( '---|  [▄   ]  |--- Renovando archivo de configuracion.' ) }, 5000 );
                            setTimeout( () => { m.edit( '---|  [   ▀]  |--- Renovando archivo de configuracion.' ) }, 6000 );
                            setTimeout( () => { m.edit( '---|  [▄   ]  |--- Renovando archivo de configuracion.' ) }, 7000 );
                            setTimeout( () => { m.edit( '---|  [   ▀]  |--- Renovando archivo de configuracion.' ) }, 8000 );
                            if ( err ) {
                                return message.channel.send( `${ b } No se pudo reestablecer la configuracion. Si esto sigue asi, puedes hablar con mi creador.` )
                            } else {
                                setTimeout( () => { m.edit( `${ g } Se renovo el archivo de configuracion.` ) }, 9000 );

                            }
                        } )

                    } );

                }
            } );
    }

}
/*
let ax = readFile( `C:/Users/Compumar/Desktop/shark/config/anti-flood/${message.guild.id}.json`, function data(err, data){
                        if(err) {return}else{
                            if(a.includes(`${ax}`)) return message.channel.send(`${b} Ya tienes la configuracion predeterminada.`)
                        }

                    })
*/