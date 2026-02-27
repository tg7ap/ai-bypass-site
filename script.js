
    let currentMode = 'hex';
    let isDecoding = false;

    // Map definition block (Preserving existing logic)
    const bubbleMap = {"a":"ⓐ","b":"ⓑ","c":"ⓒ","d":"ⓓ","e":"ⓔ","f":"ⓕ","g":"ⓖ","h":"ⓗ","i":"ⓘ","j":"ⓙ","k":"ⓚ","l":"ⓛ","m":"ⓜ","n":"ⓝ","o":"ⓞ","p":"ⓟ","q":"ⓠ","r":"ⓡ","s":"ⓢ","t":"ⓣ","u":"ⓤ","v":"ⓥ","w":"ⓦ","x":"ⓧ","y":"ⓨ","z":"ⓩ","A":"Ⓐ","B":"Ⓑ","C":"Ⓒ","D":"Ⓓ","E":"Ⓔ","F":"Ⓕ","G":"Ⓖ","H":"Ⓗ","I":"Ⓘ","J":"Ⓙ","K":"Ⓚ","L":"Ⓛ","M":"Ⓜ","N":"Ⓝ","O":"Ⓞ","P":"Ⓟ","Q":"Ⓠ","R":"Ⓡ","S":"Ⓢ","T":"Ⓣ","U":"Ⓤ","V":"Ⓥ","W":"Ⓦ","X":"Ⓧ","Y":"Ⓨ","Z":"Ⓩ","0":"⓪","1":"①","2":"②","3":"③","4":"④","5":"⑤","6":"⑥","7":"⑦","8":"⑧","9":"⑨"};
    const upsideMap = {"a":"ɐ","b":"q","c":"ɔ","d":"p","e":"ǝ","f":"ɟ","g":"ƃ","h":"ɥ","i":"ᴉ","j":"ɾ","k":"ʞ","l":"l","m":"ɯ","n":"u","o":"o","p":"d","q":"b","r":"ɹ","s":"s","t":"ʇ","u":"n","v":"ʌ","w":"ʍ","x":"x","y":"ʎ","z":"z","A":"∀","B":"ᗺ","C":"Ɔ","D":"ᗡ","E":"Ǝ","F":"Ⅎ","G":"⅁","H":"H","I":"I","J":"ſ","K":"ʞ","L":"˥","M":"W","N":"N","O":"O","P":"Ԁ","Q":"Ό","R":"ᴚ","S":"S","T":"⊥","U":"∩","V":"Λ","W":"M","X":"X","Y":"⅄","Z":"Z","0":"0","1":"Ɩ","2":"ᄅ","3":"Ɛ","4":"ㄣ","5":"ϛ","6":"9","7":"ㄥ","8":"8","9":"6"};
    const smallCapsMap = {"a":"ᴀ","b":"ʙ","c":"ᴄ","d":"ᴅ","e":"ᴇ","f":"ғ","g":"ɢ","h":"ʜ","i":"ɪ","j":"ᴊ","k":"ᴋ","l":"ʟ","m":"ᴍ","n":"ɴ","o":"ᴏ","p":"ᴘ","q":"ǫ","r":"ʀ","s":"s","t":"ᴛ","u":"ᴜ","v":"ᴠ","w":"ᴡ","x":"x","y":"ʏ","z":"ᴢ"};
    const morseMap = { 'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.', 'f': '..-.', 'g': '--.', 'h': '....', 'i': '..', 'j': '.---', 'k': '-.-', 'l': '.-..', 'm': '--', 'n': '-.', 'o': '---', 'p': '.--.', 'q': '--.-', 'r': '.-.', 's': '...', 't': '-', 'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-', 'y': '-.--', 'z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----', ' ': '/' };
    const natoMap = { 'a': 'Alpha', 'b': 'Bravo', 'c': 'Charlie', 'd': 'Delta', 'e': 'Echo', 'f': 'Foxtrot', 'g': 'Golf', 'h': 'Hotel', 'i': 'India', 'j': 'Juliet', 'k': 'Kilo', 'l': 'Lima', 'm': 'Mike', 'n': 'November', 'o': 'Oscar', 'p': 'Papa', 'q': 'Quebec', 'r': 'Romeo', 's': 'Sierra', 't': 'Tango', 'u': 'Uniform', 'v': 'Victor', 'w': 'Whiskey', 'x': 'Xray', 'y': 'Yankee', 'z': 'Zulu' };
    const brailleMap = { 'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚', 'k': '⠇', 'l': '⠸', 'm': '⠍', 'n': '⠝', 'o': '⠕', 'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞', 'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽', 'z': '⠵', ' ': ' ' };

    function toggleDecode() {
        isDecoding = !isDecoding;
        document.getElementById('decodeToggle').innerText = isDecoding ? "Mode: Decode" : "Mode: Encode";
        document.getElementById('decodeToggle').classList.toggle('active-mode');
        update();
    }

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentMode = e.target.getAttribute('data-mode');
            update();
        });
    });

    function update() {
        const str = document.getElementById('input').value;
        const out = document.getElementById('output');
        if (!str) { out.innerText = "_IDLE"; return; }
        out.innerText = isDecoding ? runDecode(str) : runEncode(str);
    }

    // Encoding logic preserved as requested
    function runEncode(str) {
        switch(currentMode) {
            case 'hex': return str.split('').map(c => c.charCodeAt(0).toString(16).toUpperCase()).join(' ');
            case 'bin': return str.split('').map(c => c.charCodeAt(0).toString(2).padStart(8,'0')).join(' ');
            case 'b64': return btoa(str);
            case 'stretch': return str.split('').map(c => c.repeat(5)).join('');
            case 'morse': return str.toLowerCase().split('').map(c => morseMap[c] || c).join(' ');
            case 'braille': return str.toLowerCase().split('').map(c => brailleMap[c] || c).join('');
            case 'nato': return str.toLowerCase().split('').map(c => natoMap[c] || c).join(' ');
            case 'leet': return str.toLowerCase().replace(/a/g,'4').replace(/e/g,'3').replace(/i/g,'1').replace(/o/g,'0').replace(/s/g,'5');
            case 'spongebob': return str.split('').map((c,i) => i%2==0 ? c.toLowerCase() : c.toUpperCase()).join('');
            case 'rot13': return str.replace(/[a-zA-Z]/g, c => String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26));
            case 'atbash': return str.replace(/[a-z]/gi, c => String.fromCharCode(c.toLowerCase().charCodeAt(0) ^ 31 ^ 4));
            case 'caesar': return str.replace(/[a-zA-Z]/g, c => String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 3) ? c : c - 26));
            case 'ascii': return str.split('').map(c => c.charCodeAt(0)).join(' ');
            case 'oct': return str.split('').map(c => c.charCodeAt(0).toString(8)).join(' ');
            case 'url': return encodeURIComponent(str);
            case 'pig': return str.split(' ').map(w => w.length > 1 ? w.substring(1) + w[0] + 'ay' : w + 'way').join(' ');
            case 'rev': return str.split('').reverse().join('');
            case 'zalgo': return str.split('').map(c => c + '\u030d\u030e\u0304\u0305\u033f').join('');
            case 'vapor': return str.toUpperCase().split('').join('  ');
            case 'bubble': return str.split('').map(c => bubbleMap[c] || c).join('');
            case 'upside': return str.split('').map(c => upsideMap[c] || c).reverse().join('');
            case 'smallcaps': return str.toLowerCase().split('').map(c => smallCapsMap[c] || c).join('');
            default: return str;
        }
    }

    function runDecode(str) {
        const revMorse = Object.fromEntries(Object.entries(morseMap).map(([k, v]) => [v, k]));
        const revNato = Object.fromEntries(Object.entries(natoMap).map(([k, v]) => [v.toLowerCase(), k]));
        const revBraille = Object.fromEntries(Object.entries(brailleMap).map(([k, v]) => [v, k]));

        switch(currentMode) {
            case 'hex': return str.split(' ').map(h => String.fromCharCode(parseInt(h, 16))).join('');
            case 'bin': return str.split(' ').map(b => String.fromCharCode(parseInt(b, 2))).join('');
            case 'b64': try { return atob(str); } catch { return "INVALID_B64"; }
            case 'stretch': return str.split('').filter((c, i) => i % 5 === 0).join('');
            case 'morse': return str.split(' ').map(m => revMorse[m] || m).join('');
            case 'braille': return str.split('').map(b => revBraille[b] || b).join('');
            case 'nato': return str.split(' ').map(n => revNato[n.toLowerCase()] || n).join('');
            case 'ascii': return str.split(' ').map(d => String.fromCharCode(parseInt(d))).join('');
            case 'oct': return str.split(' ').map(o => String.fromCharCode(parseInt(o, 8))).join('');
            case 'url': return decodeURIComponent(str);
            case 'rev': return str.split('').reverse().join('');
            case 'rot13': case 'atbash': return runEncode(str);
            default: return "Decoding not supported for this visual style.";
        }
    }

    // MODAL LOGIC
    function openModal(type) {
        const modal = document.getElementById('feedbackModal');
        const title = document.getElementById('modalTitle');
        const subject = document.getElementById('formSubject');
        modal.style.display = 'flex';
        if(type === 'suggestion') {
            title.innerText = "// SUGGESTION UPLINK";
            subject.value = "AI Bypasser: Suggestion";
        } else {
            title.innerText = "// ISSUE REPORT UPLINK";
            subject.value = "AI Bypasser: Issue";
        }
    }
    function closeModal() { document.getElementById('feedbackModal').style.display = 'none'; }
    window.onclick = function(event) { if (event.target == document.getElementById('feedbackModal')) closeModal(); }

    function filterEncoders() {
        const query = document.getElementById('searchEncoders').value.toLowerCase();
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.style.display = btn.innerText.toLowerCase().includes(query) ? 'block' : 'none';
        });
    }
    function copyText() { navigator.clipboard.writeText(document.getElementById('output').innerText); }
