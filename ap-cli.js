exports.cmds = (env) => ({
	// npm
	n : 'npm',
	ns: 'npm start',
	nb: 'npm run prod',
	no: 'npm outdate',
	nog: 'npm outdate -g',
	nl: 'npm ls --depth=0',
	nlg: 'npm ls -g --depth=0',

	// ionic
	i: 'ionic',
	is: 'ionic serve -w chrome',
	ib: 'ionic build android --prod',

	// git
	g: 'git',
	gclone: `git clone https://github.com/APRxFE/${env}.git`,
	gcloneBare: `git clone D:/_BARE_/${env}`,
	gS: 'git status',
	gsS: 'git submodule status',
	gb: 'git branch -v',
	gsFor: 'git submodule foreach git checkout master',
	gsu: 'git submodule update',
	gc: `git checkout ${env}`,
	gcM: 'git checkout master',
	gcOM: 'git checkout origin/master',
	gcW:'git checkout work',
	gbW: 'git checkout -b work',
	gdW: 'git branch -D work',
	gmW: 'git merge work',
	gr: 'git remote -v',
	gl: 'git log --pretty=short -1',
	gL: 'git status & git branch -v & git log --pretty=short -1',

	// firebase
	f: 'firebase',
	fd: 'firebase deploy',

	// window
	w: 'window',
	ws: 'services.msc'
})

exports.checkEnv = (cmd) => {
	return !!([
		'gclone', 'gcloneBare'
	].indexOf(cmd) > -1)
}