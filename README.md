
<h1 align="center">Subaru</h1>
<div align="center">
	<!-- I got addicted to these things -->
	<a href="https://david-dm.org/Gamerein/Subaru"><img src="https://img.shields.io/david/Gamerein/Subaru.svg?style=flat-square" alt="dependencies"></a>
	<a href="https://github.com/Gamerein/Subaru/issues"><img src="https://img.shields.io/github/issues/Gamerein/Subaru.svg?style=flat-square" alt="issues"></a>
	<a href="https://github.com/Gamerein/Subaru/stargazers"><img src="https://img.shields.io/github/stars/Gamerein/Subaru.svg?style=flat-square&logo=github&label=Stars" alt="stars"></a>
	<a href="https://github.com/Gamerein/Subaru/commits/master"><img src="https://img.shields.io/github/last-commit/Gamerein/Subaru.svg?style=flat-square">  
	</div>

<h2>Features</h2>
<ul>
	<li>Custom prefix</i>
	<li>Autoroles</li>
	<li>AFK messages</li>
	<li>Autoroles</li>
	<li>Music</li>
	<li>Easy emoji management</li>
	<li>Image commands</li>
	<li><b>wip</b> currency system</li>
	<li>Simple utilities</li>
	<li>Basic moderation</li>
	<li>Other shit</li>
</ul>
<i>Note: I Can call anything a feature if I want to</i>

<h2>Self-Hosting</h2>
<p>Subaru was made with the intention to be easy to self-host. Things you'll need:
	<ul>
	<li><a href="https://nodejs.org">Node.js</a></li>
	</ul>
	That should be about it....
	Now download this repo either by doing <code>git clone</code> Or by downloading it manually. 
<h5>Editing the config</h5>
Once downloaded go into <code>config/config.js</code>. Here you should choose your preferred prefix and set your token. You can get your bot token <a href="https://discordapp.com/developers/applications/me/">here</a> by creating a bot application if you haven't already. At the admin space enter your own id. Mentioning yourself with a <code>\</code> in front displays it. What show_invite does is if anyone runs <code>bot</code> command an invite for the bit will display depending on the value of that setting. Set to false if you don't want anyone to be able to invite the bot to their server. The rest of the settings are API keys, without these the bot won't be able to communicate with some services. If these are left at <code>false</code> the bot will automatically disable any command using these services.
<h5>Installing the dependencies</h5>
When you installed node.js you also installed npm which we'll use to install some packages. Simply run <code>npm install</code> in the root of the Subaru folder. If you encounter any <code>node gyp rebuild</code> errors and you are on windows run <code>npm install -g windows-build-tools</code>. Then rerun <code>npm install</code>. When on linux you should install <code>build-essential</code> from your package manager. 

<h5>Running the bot</h5>
After inviting the bot with <a href="https://discordapi.com/permissions.html">this</a> tool we can finally run the bot. We must do so with a terminal located in Subaru's root directory and running <code>node .</code> You should see some fun stuff popping up in the console. When there are no errors you should be good to go!</p>

<h2>Links:</h2>
<h4><a href="https://trello.com/b/rpCewUOX">Trello board</a></h4>
<h4><a href="https://discordbots.org/bot/383258557598007296">Discord Bots list</a></h4>
<h4><a href="https://discordapp.com/oauth2/authorize?client_id=383258557598007296&scope=bot&permissions=8">Invite</a></h4>
<h2>Developer</h2>
LevitatingBusinessMan#0504
