Vue.component("sidebar", {
    template: `
    <div class="bar">
        <div class="sidebar" :class="{ activeBar: menu }">
            <div class="view">
            <button v-on:click="menu = !menu">
                <img src="images/icons/menu.svg">
            </button>
            </div>
            <ul>
                <li v-for="(page, index) in pages"  v-bind:class="{ active: index == selectedPage }">
                    <button v-on:click="selectPage(index)">
                        <img v-bind:src="'images/icons/' + page.image">
                        <p>{{page.title}}</p>
                    </button>
                </li>
            </ul>
        </div>
    </div>
    `,
    data() {
        return {
            menu: false,
            selectedPage: 0,
            pages: [{
                    title: 'Aplikace',
                    image: 'apps.svg'
                },
                {
                    title: 'Statistiky',
                    image: 'chart.svg'
                },
                {
                    title: 'Hlášení',
                    image: 'alert-triangle.svg'
                },
                {
                    title: 'Kalendář',
                    image: 'calendar.svg'
                },
                {
                    title: 'Chaty',
                    image: 'chat-dots.svg'
                },
                {
                    title: 'Nastavení',
                    image: 'settings.svg'
                },
            ]
        }
    },
    methods: {
        selectPage: function (index) {
            console.log("Vybraná stránka: " + this.pages[index].title + "\n" +
                "index: " + index)
            this.$emit('actual', index)
            this.selectedPage = index;
        }
    },
    created() {
        this.selectedPage = 4;
        this.selectPage(4)
    }
});

Vue.component("user-data", {
    template:`
    <div class="user-data-settings">
        <div class="data">
            <div class="inputs">
                <p>Vaše jméno</p>
                <input type="text" v-model="name"  placeholder="Vaše jméno">
                <p>Vaš obrázek</p>
                <input type="text" v-model="profileImage" placeholder="Vaš obrázek">
                <p>Barva chatu</p>
                <input class="color-input" type="color" v-model="messageColor">
            </div>
            <button v-on:click="changeSettings()">
                <p>
                    Přidat kontakt
                </p>
            </button>
        </div>
    </div>
    `,
    data() {
        return {
            name: 'Salvador Dalí',
            profileImage: 'images/users/me.JPG',
            messageColor: '#4545A5',
        }
    },
    methods: {
        changeSettings: function(){

        }
    },
});


Vue.component("startchat", {
    template: `
    <div class="content">
        <h2>Začni {{title}} už teď!</h2>
        <img src="images/gifs/chating.gif"> 
    </div>
`,
    data() {
        return {
            titles: [
                "chatovat",
                "poznávat",
                "se bavit",
                "se sdružovat",
            ],
            titlePaused: false,
            titleTime: 12,
            titleAdding: true,
            titleIndex: 0,
            title: "",
            titleLength: 0
        }
    },

    created() {
        this.title = this.titles[0][0];
        setInterval(this.changeTitle, 75);
    },

    methods: {
        changeTitle: function () {
            if (this.titleAdding) {
                if (this.titlePaused) {
                    if (this.titleTime > 0) {
                        this.titleTime -= 1;
                    } else {
                        this.titleTime = 12;
                        this.titleAdding = false;
                        this.titlePaused = false;
                    }
                } else {
                    this.titleLength += 1;
                }

                if (this.titleLength === this.titles[this.titleIndex].length && this.titleAdding) {
                    this.titlePaused = true;
                }
            } else {
                this.titleLength -= 1;

                if (this.titleLength === 0) {
                    this.titleAdding = true;

                    if (this.titleIndex < this.titles.length - 1) {
                        this.titleIndex += 1;
                    } else {
                        this.titleIndex = 0;
                    }
                }
            }
            this.title = this.titles[this.titleIndex].slice(0, this.titleLength);
        }
    }
});

Vue.component("settings", {
    template: `
        <div class="page-selected">
            <div class="heading">
                <h1>
                    Nastavení
                </h1>
            </div>
            <div class="content-page">
                <user-data></user-data>
            </div>
        </div>
    `,
});


Vue.component("stats", {
    template: `
        <div class="page-selected">
           <h1>
            Statistiky
           </h1>
        </div>
    `,
});
Vue.component("applications", {
    template: `
        <div class="page-selected">
           <h1>
            Aplikace
           </h1>
        </div>
    `,
});
Vue.component("reports", {
    template: `
        <div class="page-selected">
           <h1>
            Hlášení
           </h1>
        </div>
    `,
});
Vue.component("calendar", {
    template: `
        <div class="page-selected">
           <h1>
            Kalendář
           </h1>
        </div>
    `,
});




Vue.component("dialog-contact", {
    template: `
        <div class="dialog-contact">
            <div class="data">
                <div class="inputs">
                    <input type="text" v-model="nameData"  placeholder="Název kontaktu">
                    <input type="text" v-model="imageData" placeholder="Obrázek kontaktu">
                    <input type="text" v-model="messageData" placeholder="zpráva">
                    <input type="text" v-model="emojiData" placeholder="emoji">
                </div>
                <button v-on:click="addData()">
                    <p>
                        Přidat kontakt
                    </p>
                </button>
            </div>
        </div>
    `,

    data() {
        return {
            nameData: '',
            imageData: '',
            messageData: '',
            emojiData: '',
        }
    },
    methods: {
        addData: function () {
            if (this.nameData != '' || this.imageData != '') {
                this.$emit('add-contact', {
                    name: this.nameData,
                    image: this.imageData,
                    message: this.messageData,
                    emoji: this.emojiData
                });
            }
        }
    }
});


Vue.component("chat", {
    template: `
    <div class="chat-window">
        <div class="chat">
            <div class="operators">
            <div class="top">
                    <div class="header">
                        <h2>Chat</h2>
                    </div>
                    <div class="sort">
                        <button>
                            <img src="images/icons/sort.svg">
                            <p>
                                Nejnovější
                            </p>
                        </button>
                    </div>
            </div>
            <div class="bottom">
                    <input  v-model="inputContact" type="text" placeholder="Hledat"/>
            </div>
            </div>
            <div class="contacts">
                <ul v-if="filteredContacts.length > 0">
                    <li v-for="(user, index) in filteredContacts" v-bind:class="{ active: index == selectedChat }">
                        <button class="contact" v-on:click="selectChat(user, index)">
                            <div class="image">
                                <img v-bind:src="user.image"> 
                            </div>
                            <div class="title">
                                <h3 v-if="user.name.length > 20">{{user.name.substr(0,20)}}...</h3>
                                <h3 v-else>{{user.name}}</h3>
                                <p v-if="user.messages[user.messages.length - 1].message.length > 20">{{user.messages[user.messages.length - 1].message.substr(0,25)}}...</p>
                                <p v-else>{{user.messages[user.messages.length - 1].message.substr(0,25)}}</p>
                            </div>
                        </button>
                    </li>
                </ul>
                <div v-else class="empty">
                    Bohužel, ve vašich kontaktech neexistuje takový kontakt.
                </div>
            </div>
        </div>
        <div class="chat-inner">
            <div class="account">
                <div class="operators">
                    <button v-on:click="newContactDialog()" class="message">
                        <p>+ Nová zpráva</p>
                    </button>
                    <button class="alerts">
                        <img src="images/icons/bell-notification.svg">
                    </button>
                </div>
                <div class="account-user">
                    <img class="user-image" src="images/users/me.JPG">
                    <p>Salvador Dalí</p>
                    <button>
                        <img src="images/icons/chevron-down.svg">
                    </button>
                </div>
            </div>
            <div v-if="selectedChat == null" class="chat-empty">
                <startchat></startchat>
            </div>
            <div v-else class="chat-data">
                <div class="heading-chat">
                    <img v-bind:src="usersChat[selectedChat].image">
                    <div class="title">
                        <h3>
                            {{usersChat[selectedChat].name}}
                        </h3>
                        <p v-if="usersChat[selectedChat].online == true" class="online">
                          online
                        </p>
                        <p v-else >
                            offline
                        </p>
                    </div>
                </div>
                <div class="chat-messages">
                    <ul id="chat-window">
                        <li v-for="message in usersChat[selectedChat].messages" v-bind:class="message.type">
                            <div class="image" v-if="message.type =='from'">
                                <img v-bind:src="usersChat[selectedChat].image"> 
                            </div>
                            <div class="message-content">
                                {{message.message}}
                            </div>
                            <div class="image"  v-if="message.type =='to'">
                                <img src="images/users/me.JPG"> 
                            </div>
                        </li>
                    </ul>
                    <div class="send-message-bar">
                        <input v-on:keyup.enter="sendMessage('enter',usersChat[selectedChat].emoji)" id="input-chat" type="text" placeholder="Tvá zpráva" v-model="inputChat">
                        <button class="send-button" v-on:click="sendMessage('btn',usersChat[selectedChat].emoji)">
                            <p v-if="inputChat.trim().length <= 0" class="emoji">
                                {{usersChat[selectedChat].emoji}}
                            </p>
                            <img  v-else src="images/icons/send-2.svg"> 
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <dialog-contact v-if="contactDialog" @add-contact="addContact"></dialog-contact>
        <button title="Zavřít okno"  v-if="contactDialog" v-on:click="contactDialog = !contactDialog" class="close-dialog">
            <img src="images/icons/close.svg"> 
        </button>
    </div>
    `,
    data() {
        return {
            menu: false,
            inputContact: '',
            inputChat: '',
            selectedChat: null,
            contactDialog: false,
            usersChat: [{
                    name: 'Pepa Vomáčka',
                    image: 'images/users/u1.png',
                    online: true,
                    emoji: "🍲",
                    messages: [{
                            message: 'Ahoj Salvadore, co je u tebe nového?',
                            type: 'from',
                        },
                        {
                            message: 'Toto je můj oblíbený citát: Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque quibusdam ipsum laborum! Quasi, ratione quaerat voluptatum a impedit animi alias deserunt tempore facilis voluptates dolorum eveniet ipsum, odit, numquam quae?',
                            type: 'from',
                        },
                        {
                            message: 'Už nikdy mi nepiš, ty jedno 🐷',
                            type: 'to',
                        }
                    ]
                },
                {
                    name: 'Marta Slabá',
                    image: 'images/users/u2.png',
                    online: true,
                    emoji: "💪",
                    messages: [{
                            message: 'Pane jste geniální malíř. 🎨🖼',
                            type: 'from',
                        },
                        {
                            message: 'Nenamaloval byste mě někdy, kdybyste měl čas? děkuji',
                            type: 'from',
                        }
                    ]
                },
                {
                    name: 'Vincent van Gogh',
                    image: 'images/users/u3.png',
                    online: false,
                    emoji: "🖼",
                    messages: [{
                            message: 'Tak co jak je v Nizozemsku? A co ten tvůj slavnej realismus?',
                            type: 'to',
                        },
                        {
                            message: 'Jo u mě dobré, spíše povídej co u tebe!',
                            type: 'from',
                        },
                        {
                            message: 'Ah u mě všechno při starém, teď frčí Surrealismus, víš, jako čas plyne 😀🕐🌊',
                            type: 'to'
                        }
                    ]
                },
                {
                    name: 'Gala Dalí',
                    image: 'images/users/u4.png',
                    online: false,
                    emoji: "💘",
                    messages: [{
                            message: 'Tak co ty moje Galo? kdy si vyrazíme?',
                            type: 'to',
                        },
                        {
                            message: 'Za to minulé zobrazeno asi nikdy.',
                            type: 'from',
                        }
                    ]
                },
                {
                    name: 'Cecílie Návrátilečková',
                    image: 'images/users/u5.png',
                    online: true,
                    emoji: "🤑",
                    messages: [{
                            message: 'Pane Salvadore nemáte náhodou zaplatit tu naši věcičku?',
                            type: 'from',
                        },
                        {
                            message: 'OK.',
                            type: 'to',
                        }
                    ]
                },
                {
                    name: 'Jan Cvrček',
                    image: 'images/users/u6.png',
                    online: true,
                    emoji: "🦗",
                    messages: [{
                            message: 'Zahrajeme si hru! Budeme psát jen OK🆗👌',
                            type: 'from',
                        },
                        {
                            message: 'Ok',
                            type: 'to',
                        },
                        {
                            message: 'Počkat ještě ne!',
                            type: 'from',
                        },
                        {
                            message: 'Ok',
                            type: 'to',
                        },
                        {
                            message: 'Ne takto jsem to nemyslel!!!',
                            type: 'from',
                        },
                        {
                            message: 'Ok',
                            type: 'to',
                        },
                        {
                            message: 'Ok',
                            type: 'from',
                        },
                        {
                            message: 'Ok',
                            type: 'to',
                        },
                        {
                            message: 'Ok 😁',
                            type: 'from',
                        },
                        {
                            message: 'Už mě to nebaví, nazdar, jdu malovat.',
                            type: 'to',
                        },
                    ]
                },
                {
                    name: 'Klaus Von Mullermilch',
                    image: 'images/users/u7.png',
                    online: true,
                    emoji: "🍼",
                    messages: [{
                            message: 'Stáhni si tu novou appku na malování je skvělá!',
                            type: 'from',
                        },
                        {
                            message: 'Radíš profesionálovi co dělat? radši si táhni prodávat  to své mléko',
                            type: 'to',
                        }
                    ]
                },
                {
                    name: 'Folcvágn Tiguan',
                    image: 'images/users/u8.png',
                    online: true,
                    emoji: "🚗",
                    messages: [{
                            message: 'Hallo, wir haben eine exklusive Auswahl an Volkswagen Fahrzeugen für Sie',
                            type: 'from',
                        },
                        {
                            message: 'Спасибо, но я не хочу, хорошего дня😎',
                            type: 'to',
                        }
                    ]
                },
                {
                    name: 'Ernie Bernie',
                    image: 'images/users/u9.png',
                    online: true,
                    emoji: "🌊",
                    messages: [{
                            message: 'Ernie and Bernie are (former) antagonists turned supporting characters in the 2004 DreamWorks film, Shark Tale.They are jellyfish brothers with Jamaican accents who are the henchmen of Sykes.',
                            type: 'from',
                        },
                        {
                            message: 'cool.😎',
                            type: 'to',
                        }
                    ]
                },
                {
                    name: 'Pablo Dino',
                    image: 'images/users/u10.jpg',
                    online: true,
                    emoji: "🍸",
                    messages: [{
                            message: 'Máš tu novou dodávku štětců?',
                            type: 'from',
                        },
                        {
                            message: 'Haló odepiš!',
                            type: 'from',
                        }
                    ]
                },
                {
                    name: 'Robo Družić',
                    image: 'images/users/u11.png',
                    online: true,
                    emoji: "🎶",
                    messages: [{
                            message: 'Žádám o nahrávku písně The Notorious B.I.G. & 2Pac - Sideways, děkuji.',
                            type: 'to',
                        },
                        {
                            message: 'Bohužel, toto nemohu zařídit.',
                            type: 'from',
                        },
                        {
                            message: 'Hm.',
                            type: 'to',
                        }
                    ]
                },
                {
                    name: 'František Kouřil',
                    image: 'images/users/u12.png',
                    online: true,
                    emoji: "🚬",
                    messages: [{
                            message: 'Sis pěkně zakouřil Franto s těmi doutníky co?',
                            type: 'to',
                        },
                        {
                            message: 'Nojo, jdou po mně pořád policajti...',
                            type: 'from',
                        },
                        {
                            message: 'Haha!🤣🤣🤣',
                            type: 'to',
                        },
                    ]
                },
                {
                    name: 'Arnold Skott',
                    image: 'images/users/u13.png',
                    online: true,
                    emoji: "🐄",
                    messages: [{
                        message: 'Tak co nového?',
                        type: 'from',
                    }, ]
                },
                {
                    name: 'Štefan CoolM',
                    image: 'images/users/u14.png',
                    online: true,
                    emoji: "🎬",
                    messages: [{
                            message: 'Ty jsi to CoolM co dělá graffiti z filmu ve filmu Gympl?',
                            type: 'to',
                        },
                        {
                            message: 'Nevím, záleží kolik bude stát odpověď.',
                            type: 'from',
                        }
                    ]
                },
                {
                    name: 'Vien Vue',
                    image: 'images/users/u15.png',
                    online: true,
                    emoji: "💻",
                    messages: [{
                        message: 'Víš že jsi už napsal 1400 řádků?',
                        type: 'from',
                    }]
                },
            ]
        }
    },
    methods: {
        selectChat: function (chat, index) {
            console.log(
                "Vybraný chat: " + chat.name + "\n" +
                "Index: " + index
            )
            this.selectedChat = index;

            // zatím jsem nepřišel na lepší řešení, kde by se nemusel
            // použít timeout, kvůli načtení chatu

            setTimeout(() => {
                var chatWindow = document.getElementById("chat-window");
                chatWindow.scrollTop = chatWindow.scrollHeight;
            }, 1)
        },
        newContactDialog: function () {
            this.contactDialog = true;
        },
        addContact: function (data) {
            if(data.message != ''){
                this.usersChat.push({
                    name: data.name,
                    online: true,
                    image: data.image,
                    emoji: data.emoji ? data.emoji : '😁',
                    messages: [{
                        message: data.message,
                        type: 'to'
                    }]
                });
            } else{
                this.usersChat.push({
                    name: data.name,
                    online: true,
                    image: data.image,
                    emoji: data.emoji ? data.emoji : '😁',
                    messages: [
                        {
                            message: 'Ahoj, vítej v mé síti!',
                            type: 'to'
                        }
                    ]
                });
            }
            this.contactDialog = false;
        },
        sendMessage: function (type, emoji) {
            var shortedInput = this.inputChat.trim();

            if (type == 'enter') {
                if (shortedInput.length > 0) {
                    this.usersChat[this.selectedChat].messages.push({
                        message: this.inputChat,
                        type: 'to'
                    })
                }
            } else {
                if (shortedInput.length > 0) {
                    this.usersChat[this.selectedChat].messages.push({
                        message: this.inputChat,
                        type: 'to'
                    })
                } else {
                    this.usersChat[this.selectedChat].messages.push({
                        message: emoji,
                        type: 'to'
                    })
                }
            }

            this.inputChat = '';

            // zatím jsem nepřišel na lepší řešení, kde by se nemusel
            // použít timeout, kvůli načtení chatu

            setTimeout(() => {
                var chatWindow = document.getElementById("chat-window");
                chatWindow.scrollTop = chatWindow.scrollHeight;
            }, 1)
        }
    },
    created() {

    },
    computed: {
        filteredContacts: function () {
            return this.usersChat.filter(data => {
                return data.name.toLowerCase().includes(this.inputContact.toLowerCase());
            })
        },
    }
});

var vue = new Vue({
    el: "#app",
    data() {
        return {
            pageSelectedToShow: 0,
        }
    },
    methods: {
        selectedPage: function (index) {
            this.pageSelectedToShow = index;
        }
    }
})