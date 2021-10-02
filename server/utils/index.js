
module.exports = {

    democracy: (arrDislikes, shields, users) => {

        if (((arrDislikes.length * 100) / users) >= 75 && shields == 0) {
            return true;
        }
        else {
            return false
        }
    },
}

