const { ascii } = require('./lib/ascii')
const danishWords = require('./lib/danishWords')

// Messages to decrypts
let encryptedMessage00 =
	'$Jxqt"fqi"xgtfgp"gt"uvqt#$"ucifg"cnng"wpigtpg="vjk"fg"jcxfg"pw"tkivkipqm"icpumg"cpfgtngfgu"rncfu."gpf"fc"fg"n|"kpfg"k"åiigv0'
let encryptedMessage01 =
	"Rjs%ijs%xyfppjqx%}qqnsl1%xtr%xnixy%æfw%ptrrjy%zi%fk%}lljy1%tl%x %x %k}q%zi1%gqjæ%gniy1%uzkkjy%tl%lotwy%sfw%fk1%tl%ijy%g ij%fk%}sijwsj%tl%m~sxjsj3%'Mfs%jw%ktw%xytw&'%xflij%ij%fqqj%xfrrjs1%tl%ijs%pfqpzsxpj%mfsj1%ijw%æfw%k~iy%rji%xutwjw%tl%ywtjij%ijwktw1%fy%mfs%æfw%js%pjoxjw1%uzxyjij%xnl%tu%xtr%jy%kfwy~o%ktw%kzqij%xjoq1%lnp%qnlj%nsi%u %mfr%tl%x %uqziwjij%ijs%tl%gqjæ%lfsxpj%w~i%n%mtæjijy3%Ijs%xyfppjqx%}qqnsl%ænixyj%mæjwpjs1%mætw%ijs%yzwij%xy %jqqjw%l 1%ijs%æfw%x %gjiw~æjy1%ktwin%ijs%x %x %xy{l%zi%tl%æfw%ynq%xuty%ktw%mjqj%fsijl wijs3"
let encryptedMessage02 =
	'>a0),<})!<0~,}~(<~,<-.),=><-å!}~<å&&~</(!~,(~W<."#<}~<"å0}~<(/<,#!.#!()%<!å(-%~<å(}~,&~}~-<*&å}-H<~(}<}å<}~<&7<#(}~<#<5!!~.J'

// Arrays to hold all the different possible messages, and the ones that has potential
// potentialMessages[] rarely ever has anything else in it, then the correct messages
savedMessages = []
potentialMessages = []

function decrypt(msg) {
	// Looping throug the different potential n-values (1-30)
	for (let n = 1; n < 31; n++) {
		let decryptedMessage = ''
		// Looping through all the chars in the encrypted messages
		for (let i = 0; i < msg.length; i++) {
			target = ascii.indexOf(msg[i])
			// Wrap-around handler
			if (target - n < 0) {
				target = target + ascii.length
			}
			decryptedMessage += ascii[target - n]
		}
		savedMessages.push(decryptedMessage)
		console.log('Key #' + n + ':', decryptedMessage)
	}
}

decrypt(encryptedMessage02)

function findCorrectMesssage() {
	count = 0
	// Looping through the messages and the danish word list.
	for (let i = 0; i < savedMessages.length; i++) {
		for (let j = 0; j < danishWords.length; j++) {
			// Checks if the messages has any of the danish words in it
			if (savedMessages[i].split(' ').includes(danishWords[j])) {
				potentialMessages.push('Key #' + (i + 1) + ' ' + savedMessages[i])
			}
		}
	}
}

findCorrectMesssage()
// Remove duplicates
// - If a word has 28 matches from the danishWords it would add 28 duplicates
let correctMessage = [...new Set(potentialMessages)]
console.log(correctMessage)
