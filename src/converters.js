function convertWei(num, decimals, displayDecimals) {
    let str = BigInt(num).toString()
    let wholeDigits
    let smallDigits
    let formattedNumb
    let negative

    if (str.charAt(0) === '-') {
        str = str.substring(1)
        negative = true
    } else {
        negative = false
    }

    if (str.length > decimals) {
        wholeDigits = str.substring(0, str.length - decimals)

        // Reverse the string for easier manipulation
        wholeDigits = wholeDigits.split('').reverse().join('')

        // Insert commas after every three characters
        wholeDigits = wholeDigits.replace(/(\d{3})/g, '$1,')

        // Remove trailing comma if present
        if (wholeDigits.slice(-1) === ',') {
            wholeDigits = wholeDigits.slice(0, -1)
        }

        // Reverse the string back to its original order
        wholeDigits = wholeDigits.split('').reverse().join('')

        // selects only the decimals
        smallDigits = str.substring(str.length - decimals, str.length)
        //truncating digits
        smallDigits = smallDigits.substring(0, displayDecimals)
        // Insert commas after every three characters
        smallDigits = smallDigits.replace(/(\d{3})/g, '$1,')

        // Remove trailing comma if present
        if (smallDigits.slice(-1) === ',') {
            smallDigits = smallDigits.slice(0, -1)
        }

        formattedNumb = wholeDigits + '.' + smallDigits

        // Adds negatives back in
        if (negative) {
            formattedNumb = '-' + formattedNumb
        }

        // Remove trailing period if present
        if (formattedNumb.slice(-1) === '.') {
            formattedNumb = formattedNumb.slice(0, -1)
        }

        return formattedNumb
    } else {
        // selects only the decimals
        smallDigits = str.substring(str.length - decimals, str.length)
        //truncating digits
        smallDigits = smallDigits.substring(0, displayDecimals)

        smallDigits = smallDigits.padStart(displayDecimals, '0')

        // Insert commas after every three characters
        smallDigits = smallDigits.replace(/(\d{3})/g, '$1,')

        // Remove trailing comma if present
        if (smallDigits.slice(-1) === ',') {
            smallDigits = smallDigits.slice(0, -1)
        }

        formattedNumb = '0.' + smallDigits

        // Adds negatives back in
        if (negative) {
            formattedNumb = '-' + formattedNumb
        }

        // Remove trailing period if present
        if (formattedNumb.slice(-1) === '.') {
            formattedNumb = formattedNumb.slice(0, -1)
        }

        return formattedNumb
    }
}

function convertHex(preConverted) {
    let convertedStr = preConverted
    if (preConverted.length % 2) {
        convertedStr = '0' + preConverted
    }
    convertedStr = BigInt('0x' + convertedStr)
    return convertedStr
}

function convertUnix(preConverted) {
    const timeInMills = preConverted * 1000 // convert to mili
    let currentTimeZone = new Date(timeInMills) // convert new time
    const UTC = currentTimeZone.toUTCString()

    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
    }
    currentTimeZone = currentTimeZone.toLocaleDateString('en-GB', options)

    return {
        currentTimeZone,
        UTC,
    }
}

async function lookupFourByte(hexSignature) {
    const selector = hexSignature.replace(/^0x/i, '').toLowerCase()
    const url = `https://www.4byte.directory/api/v1/signatures/?hex_signature=0x${selector}`
    const response = await fetch(url)
    const data = await response.json()
    return data.results.map((r) => r.text_signature)
}

function converter(str, decimals, displayDecimals, type) {
    if (type === 'hex') {
        return convertWei(convertHex(str), decimals, displayDecimals)
    } else if (type === 'unixTime') {
        return convertUnix(str)
    } else {
        return convertWei(str, decimals, displayDecimals)
    }
}

module.exports = {
    convertWei,
    convertHex,
    convertUnix,
    converter,
    lookupFourByte,
}
