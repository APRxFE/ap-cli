#!/usr/bin/env node

var Rx = require('rxjs/Rx')
var colors = require('colors')
var run = require('exec-cmd')
var ap = require('../ap-cli')

colors.setTheme({ colorCmd: ['green', 'bold'] })

var argv = process.argv.slice(2)
var cmd = argv[0]
var env = argv[1] || '[env]'

var _exec = (ex) => {
	console.log('ap-cli >'.gray, ex.green)
	run(ex, {stdio: 'inherit'}).then(res=>{}, err=>{})
}

var _help = () => {
	console.log('\n*****'.gray, 'ap-cli help'.yellow, '*****'.gray)
	console.log('\n> ap <cmd> [env]'.gray)
	for(let key in cmds) {
		if(key.length === 1) console.log(`\n ${cmds[key]}`.gray)
		else console.log('>'.gray, `ap ${key}`.colorCmd, '\t', cmds[key])
	}
}

var cmds = ap.cmds(env)


/////

if(['-h', '--help'].indexOf(cmd) > -1) return _help()
if(ap.checkEnv(cmd) && env === '[env]') return _help()
if(!cmds[cmd]) return _help()

if(cmds[cmd].indexOf('&') === -1) return _exec(cmds[cmd])


///// multi Cmd /////

var cmdSt = new Rx.Subject()

var multiCmd = cmds[cmd].split('&')
Rx.Observable.from(multiCmd)
.zip(cmdSt, (cmd, St) => cmd.trim())
.subscribe(cmd => {
	console.log('ap-cli >'.gray, cmd.green)
	run(cmd, {stdio: 'inherit'}).then(res=>{ !cmdSt.closed && cmdSt.next() }, err=>{})	
}, err => {
}, () => { cmdSt.unsubscribe() })

cmdSt.next()
