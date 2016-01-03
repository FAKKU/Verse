define(['character'], function(Character) {

  var NpcTalk = {
    "guard": [
      { "type": "random",
        "text": [
          "Hello there",
          "We don't need to see your identification",
          "You are not the player we're looking for",
          "Move along, move along...",
          "You must be over 18 to play this game.",
          "Excuse me is that chinese cartoon pornography?",
          "You better not be fapping to any loli...",
          "Please remove your hand from your pants"
        ]
      }
    ],
    "king": [
      "<span class=\"blinky\">RERROUUUUUCHHHH.</span>",
      "<span class=\"blinky\">PEOPLE ARE NOT EQUAL.</span>"
    ],
    "priest": [
      "My name is <b>Brittany</b>, I'm a typesetter at FAKKU!",
      "My favorite tag is vanilla. So far I've worked on both our Homunculus and Hisasi books.",
      "Right now I'm working on Napata, want to see the cover?",
      "<img src=\"https://t.fakku.net/images/upload/napata-cover-pixels.png\">",
      "What do you think of it?"
    ],
    "villager": [
      "My name is <b>Sera</b>, I'm a typesetter at FAKKU!",
      "In my free time I work on my own art, <a href=\"http://serastanton.com/\" target=\"_blank\">you can see some of my art here</a>.",
      "Rei Ayanami is my waifu and she is way better than Asuka.",
      "Be careful of the slime girls in the next area, they're tough!"
    ],
    "agent": [
      "こんにちは愚痴",
      "My name is <b>Andrew</b>, I am the lead translator at FAKKU!",
      "I translate all of our books releases.",
      "It's hard work reading hentai, but somebody's gotta do it.",
      "My favorite artist is Dr. P.",
      "Have you met my buddy Mike?"
    ],
    "scientist": [
        "I am Daiz.",
        "I work on digital distribution at FAKKU!",
        "But nevermind that, you should check out the potion on the right",
        "It turns you invincible for a while, there's just one downside...",
        "It also turns you into a furry.",
        "Use it at your own risk."
    ],
    "forestnpc": [
      "My name is <b>Mike</b>, I am the art director at FAKKU!",
      "I make sure the quality of our releases is as high as possible.",
      "I read a lot of hentai. A lot. Does that make me a pervert?",
      "Have you met my buddy Andrew?"
    ],
    "lavanpc": [
      "Ouch."
    ],
    "sorcerer": [
      "Behold mortal, the great wizard <b>Sindalf</b> stands before you.",
      "You will never be strong enough to defeat me, so don't even try.",
      "I have remained abstinent for 30 years to obtain these powers.",
      "Never knowing the touch of a woman... or a man...",
      "...",
      "Matthew... how I miss you..."
    ],
    "sorcererboss": [
      "I can't believe you've made it this far!",
      "Ahead is the final boss, you must be careful.",
      "Take these furry potions from my private collection, they will be of help.",
      "Good luck my friend, you shall need it."
    ],
    "octocat": [{
      "text": [
        "What do you want?!",
        "...",
        "You're not a high enough level to talk to me.",
        "... ...",
        "... ... ...",
        "Get away from me! You disgusting otaku scum."
      ]},
      { "condition": function(game){return (game.player.level >= 10);},
        "text": [
          "*name*... I... I mean..",
          "You've grown so strong.",
          "I've watched you since you were level 1",
          "I have something for you...",
          "Find me on FAKKU, I'll be waiting for you."
        ]
      },
      { "condition": function(game){return (game.player.level >= 7);},
        "text": [
          "*name*! Why do you keep talking to me!?",
          "Sure you're a little stronger now, but I'd never like a nerd like you.",
          "You'd have to be at least max level before I'd accept you"
        ]
      },
      { "condition": function(game){return (game.player.level >= 3);},
        "text": [
          "What do you want?!",
          "...",
          "Did you not listen to what I said?!!",
          "Oh.. you're already level *level*?",
          "Well you're still a disgusting weakling, please leave me alone."
        ]
      }
    ],
    "coder": [
      "Hello! My name is <b>Jacob</b>, I created FAKKU!",
      "You should know that Asuka is clearly the best waifu",
      "Rei is clearly inferior in comparison",
      "Woah, you're already level *level*!?",
      "Have you found the secret cave yet?"
    ],
    "beachnpc": [
      "Don't mind me, I'm just here on vacation.",
      "Are you looking for Tsujoi and Waar? They just left.",
      "I have to say...",
      "These giant crabs are somewhat annoying.",
      "Could you please get rid of them for me?"
    ],
    "desertnpc": [
      "Hello! My name is Taylor, or <b>Kisuka</b> if you prefer.",
      "I'm a web developer at FAKKU.",
      "How did this code even work before?",
      "Have you watched Naruto? Hinata is my waifu <3.",
      "I have an obsession for Plugsuits.",
      "Time to cook a pizza~!!"
    ],
    "nyan": [
      "What happens when your flame goes out?",
      "...I'd rather not find out",
      "But I can light you up again!"
    ],
    "rick": [
      "We're no strangers to love",
      "You know the rules and so do I",
      "A full commitment's what I'm thinking of",
      "You wouldn't get this from any other guy",
      "I just wanna tell you how I'm feeling",
      "Gotta make you understand",
      "Never gonna give you up",
      "Never gonna let you down",
      "Never gonna run around and desert you",
      "Never gonna make you cry",
      "Never gonna say goodbye",
      "Never gonna tell a lie and hurt you"
    ]
  };

  var Npc = Character.extend({
    init: function(id, kind) {
      this._super(id, kind, 1);
      this.itemKind = Types.getKindAsString(this.kind);
      if (typeof NpcTalk[this.itemKind][0] === 'string') {
        this.discourse = -1;
        this.talkCount = NpcTalk[this.itemKind].length;
      } else {
        this.discourse = 0;
        this.talkCount = NpcTalk[this.itemKind][this.discourse]["text"].length;
      }
      this.talkIndex = 0;
    },

    getName: function() {
      return [this.npcName || this.itemKind, this.npcColor || "white"];
    },

    selectTalk: function(game){
      var change = false;
      if (typeof this.x !== "undefined" && this.x === 2384) {
        this.itemKind = "sorcererboss";
        this.discourse = -1;
        this.talkCount = NpcTalk[this.itemKind].length;
      }
      if (this.discourse != -1) {
        var found = false;
        for (var i = 0; !found && i < NpcTalk[this.itemKind].length; i++) {
          if (typeof NpcTalk[this.itemKind][i]["condition"] !== "undefined") {
            if (NpcTalk[this.itemKind][i]["condition"](game)) {
              if (this.discourse != i) {
                change = true;
                this.discourse = i;
                this.talkCount = NpcTalk[this.itemKind][this.discourse]["text"].length;
              }
              found = true;
            }
          } else if (typeof NpcTalk[this.itemKind][i]["type"] !== "undefined") {
            this.talkIndex = Math.floor((Math.random() * NpcTalk[this.itemKind][i]["text"].length));
            this.discourse = 0;
            this.talkCount = this.talkIndex + 1;
            change = false;
            found = true;
          }
        }
        if (!found) {
          if (this.discourse != 0) {
            change = true;
            this.discourse = 0;
            this.talkCount = NpcTalk[this.itemKind][this.discourse]["text"].length;
          }
        }
      }
      return change;
    },

    talk: function(game) {
      var msg = "";

      if (this.selectTalk(game) || (this.talkIndex > this.talkCount) ){
        this.talkIndex = 0;
      }

      if (this.talkIndex < this.talkCount) {
        if (this.discourse == -1) {
          msg = NpcTalk[this.itemKind][this.talkIndex];
        } else {
          msg = NpcTalk[this.itemKind][this.discourse]["text"][this.talkIndex];
        }
      }
      this.talkIndex += 1;
      msg = msg.replace('*name*', game.player.name);
      msg = msg.replace('*level*', game.player.level);
      return msg;
    }

  });

  return Npc;

});
