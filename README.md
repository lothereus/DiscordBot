# DiscordBot

Un **Bot** pour les serveurs **Discord** basé sur l'API *Discord.js*

(minimal version : https://github.com/lothereus/DiscordBotLite)

## Installation

Ce Bot nécessite **Node.js** pour fonctionner. Pour l'installer : https://nodejs.org/en/download/

* Copier les sources du Bot sur votre serveur
* A la **racine** des sources exécuter la commande `npm install`
(cette commande installera tous les modules node.js nécessaire au Bot dans un dossier `node_modules`)

**_ATTENTION_**: pour une installation sur **Raspberry Pi**, le support audio n'étant pas disponible, exécuter la commande `npm install --no-optional`

## Configuration

* Copier le fichier template `config.json.tpl` vers un nouveau fichier `config.json`
* Copier le fichier template `auth.json.tpl` vers un nouveau fichier `auth.json`

Dans le fichier `config.json` dans le champ _self_, il s'agit d'accepter (true) ou non (false) que le **Bot** interprète ses propres messages.

Il est conseillé de garder cette option à _false_ afin d'éviter que le **Bot** ne se réponde à lui même, sauf en phase de développement si vous souhaitez tester le **Bot** avec votre propre compte **Discord**.

### Twitter

Afin que le plugin Twitter fonctionne, il faut créer une application Twitter sur https://apps.twitter.com/ .

Copier les valeurs des clés d'authentification obtenues dans le fichier `auth.json` tel que: 

auth.json
```
"consumer_key": "#consumer_key#",
"consumer_secret": "#consumer_secret#",
"access_token_key": "#access_token_key#",
"access_token_secret": "#access_token_secret#"
```
(sans les ##, garder les "")

## Authentification

Il existe 2 méthodes pour qu'un Bot se connecte à votre serveur **Discord**.

Ces 2 méthodes sont compatibles l'une avec l'autre et nécessite seulement le changement de l'option _connection_ dans le fichier `config.json`:
* _account_ pour une authentification par compte utilisateur
* _token_ pour une authentification par token d'application

### Authentification par compte utilisateur

Créer un compte utilisateur **Discord** sur https://discordapp.com/register

Copier votre email et votre mot de passe dans le fichier `auth.json` précédemment créé tel que:

auth.json
```
"email": "#email#",
"password": "#mot_de_passe#"
```
(sans les ##, garder les "")

Dans le fichier `config.json` précédemment créé, ne garder que _account_ dans le champ _connection_
```
"connection": "account"
```

### Authentification par token d'application

Créer une application **Discord** sur https://discordapp.com/developers/applications/me

* Cliquer sur **"Create a Bot User"** et accepter
* Cliquer sur **"click to reveal"** en face de ligne **Token** pour l'obtenir
* Copier ce token dans le fichier `auth.env` précédemment créé, tel que:

auth.json
```
"token": "#token#"
```
(sans les ##, garder les "")

Dans le fichier `config.json` précédemment créé, ne garder que _token_ dans le champ _connection_
```
"connection": "token"
```

Ensuite il est nécessaire d'_inviter_ le Bot sur votre serveur **Discord**.

Utiliser le lien plus bas en remplaçant les champs comme précisé ci-dessous:
* [id_application] : l'id de l'application que **Discord** qui a été créée précédemment
* [permission] : la valeur des permissions à accorder au Bot (utiliser 66321471 par défaut)

(facultatif: si vous souhaitez personnaliser vos permissions, rendez vous à l'adresse suivante https://discordapp.com/developers/docs/topics/permissions#bitwise-permission-flags)

Lien d'invitation: `https://discordapp.com/oauth2/authorize?client_id=[id_application]&scope=bot&permissions=[permission]`

Puis sélectionner le serveur sur lequel inviter le Bot.

## Exécution

A partir de là le Bot est exécutable avec la commande `node bot.js`

## Personnalisation

### Commandes

Il est possible d'ajouter des commandes via les fichiers `.json` présent dans le dossier `commands`:
* `basics.json` : pour les commandes simples qui ne font qu'envoyer un message
* `advanced.json` : pour les commandes avancées qui font appel à un plugin, envoient un fichier ou sont des alias.

(**_TODO: expliquer la syntaxe des commandes et les différents champs..._**)

### Dialogues

Il est possible d'ajouter des réponses au Bot. Ces réponses, sont en général des textes courts que le Bot répondra suite à la détection d'un texte précis.

Exemple: lorsqu'un utilisateur dit "Bonjour", le Bot répond "Bonjour"

Ces ajouts se font pour le moment via le fichier `main.json` du dossier `dialogs`. La partie dialogue sera étoffée avec le temps.

(**_TODO: améliorer la détection des textes, ajouter des dialogues, ajouter un stack de message (limitera le spam)..._**)

## Plugins

Nous parlions précédemment de commandes utilisant des plugins, ils permettent de centraliser toutes les commandes d'un même type et d'en modifier leur comportement si nécessaire.

Ces plugins se trouvent dans le dossier `plugins` ordonnés tous de la manière suivante:
* [plugins]
  * [Nom_du_plugin]
    * nom_du_plugin.js
    * package.json
    * api.json
	
* le fichier js contiendra le fonctionnement de plugin avec au moins une fonction `help` qui affiche une aide lorsque la commande principale du plugin est utilisée sans argument et une fonction `get` qui répondra à toutes les sous-commandes du plugin.
* le fichier package.json contient les modules à charger automatiquement pour le plugin
* le fichier api.json contient toutes les sous-commandes utilisable avec le plugin

(**_TODO: détailler un peu plus les plugins, leurs commandes et la syntaxe de description des sous commandes dans api.json_**)

Il existe actuellement 2 plugins: Twitter et Twitch