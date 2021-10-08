
module.exports = {
    democracy: (arrDislikes, shields, users) => {

        if (((arrDislikes.length * 100) / users) >= 20 && shields == 0) {
            return true;
        }
        else {
            return false
        }
    },

    democracySlander: (arrDislikes, arrLikes, users, shields) => {

        if (((arrDislikes.length * 100) / users) >= 20) {

            return -1;
        }
        else if (((arrLikes.length * 100) / users) >= 20) {

            return 1;
        }
        else {

            return 0
        }
    },

    hasCoins: (user) => {
        if (user.coins >= 5) {
            return true
        } else {
            return false
        }
    },

    hasMoreCoins: (user) => {
        if (user.coins >= 20) {
            return true
        } else {
            return false
        }
    }
}

