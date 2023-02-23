const dateFormat = (date) => {
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    if (parseInt(month) < 10) {
        month = `0${month}`
    }
    if (parseInt(day) < 10) {
        day = `0${day}`
    }
    return `${year}-${month}-${day}`
}

module.exports = { dateFormat }