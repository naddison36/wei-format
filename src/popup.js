import { convertWei, convertHex, convertUnix, lookupFourByte } from './converters.js'

document.addEventListener('DOMContentLoaded', function () {
    let preConverted
    let conversionType

    chrome.storage.local.get(['selectedStr', 'conversionType']).then(async (result) => {
        preConverted = result.selectedStr
        conversionType = result.conversionType

        if (conversionType === 'wei' || conversionType === 'hex') {
            chrome.storage.local.get(['decimals', 'displayDecimals']).then((result) => {
                document.getElementById('displayDecimals').value = result.displayDecimals
                document.getElementById('decimals').value = result.decimals

                let convertedWei = preConverted
                if (conversionType === 'hex') {
                    convertedWei = convertHex(convertedWei)
                }
                convertedWei = convertWei(convertedWei, result.decimals, result.displayDecimals)
                document.getElementById('convertedStr').textContent = convertedWei
            })
        } else if (conversionType === 'unixTime') {
            document.getElementById('decimalsForm').style.display = 'none'
            const { currentTimeZone, UTC } = convertUnix(preConverted)
            console.log(currentTimeZone)
            console.log(UTC)
            document.getElementById('convertedStr').textContent = currentTimeZone
            document.getElementById('convertedStr2').textContent = UTC
        } else if (conversionType === 'fourByte') {
            document.getElementById('decimalsForm').style.display = 'none'
            const container = document.getElementById('convertedStr')
            try {
                const signatures = await lookupFourByte(preConverted)
                if (signatures.length === 0) {
                    container.textContent = 'No signatures found'
                } else if (signatures.length === 1) {
                    const label = document.createElement('p')
                    label.className = 'signature-label'
                    label.textContent = 'Function signature'
                    const code = document.createElement('code')
                    code.textContent = signatures[0]
                    container.appendChild(label)
                    container.appendChild(code)
                } else {
                    const label = document.createElement('p')
                    label.className = 'signature-label'
                    label.textContent = `${signatures.length} matching signatures`
                    const ol = document.createElement('ol')
                    ol.className = 'signature-list'
                    for (const sig of signatures) {
                        const li = document.createElement('li')
                        const code = document.createElement('code')
                        code.textContent = sig
                        li.appendChild(code)
                        ol.appendChild(li)
                    }
                    container.appendChild(label)
                    container.appendChild(ol)
                }
            } catch {
                container.textContent = 'Lookup failed'
            }
        }
    })

    document.getElementById('decimalsForm').addEventListener('submit', function (event) {
        event.preventDefault() // Prevent the default form submission
        const decimals = document.getElementById('decimals').value
        const displayDecimals = document.getElementById('displayDecimals').value
        chrome.storage.local.set({ decimals: decimals, displayDecimals: displayDecimals })

        let convertedWei = preConverted
        if (conversionType === 'hex') {
            convertedWei = convertHex(convertedWei)
        }
        convertedWei = convertWei(convertedWei, decimals, displayDecimals)
        document.getElementById('convertedStr').textContent = convertedWei
    })
})
