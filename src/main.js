import "./index.css";

const keywords = {
    //===== 核心元素 =====//
    // 自然景觀 (單字+雙字詞)
    natural: {
        single: ["海", "峰", "山", "灣", "景", "林", "泉", "雲", "天", "星", "翠", "碧", "嵐", "浪", "灘", "森", "湖", "河", "島", "岸", "堤", "園", "谷", "嶺", "巒", "汀", "洲", "浦", "澤", "霄", "穹", "曦", "霽", "玥", "珀", "瑋", "珒", "璿", "瓏", "臻", "峯", "崧", "岱", "岫", "崴", "崙"],
        double: ["翠峰", "碧海", "雲頂", "天峰", "星灣", "嵐山", "浪濤", "湖景", "星河", "晨曦", "皓月", "金輝", "銀灘", "青洲", "藍灣", "綠洲", "丹霞", "皓海", "澄天", "瀅波", "灝景", "瀚洋", "穹宇", "瓏璽", "瑆華", "玥湖", "珀林", "臻峰", "岱嵐", "岫雲", "崴景", "崙庭", "嵿峰", "臨港", "臨海", "港灣", "灣畔"]
    },

    // 奢華意象 (單字+雙字詞)
    luxury: {
        single: ["御", "皇", "帝", "豪", "璽", "尊", "逸", "鉑", "逸", "鉑", "臻", "晶", "鑽", "金", "鼎", "爵", "龍", "華", "耀", "頌", "悅", "銘", "逸", "鉑", "臻", "晶", "鑽", "金", "鼎", "爵", "龍", "華", "耀", "頌", "悅", "銘"],
        double: ["君臨", "御皇", "帝豪", "尊爵", "鉑金", "臻品", "晶鑽", "金鼎", "龍璽", "華耀", "頌悅", "銘邸", "逸境", "鉑悅", "臻峰", "晶華", "鑽苑", "金域", "鼎峰", "爵邸", "龍庭", "華府", "耀庭", "頌庭", "悅璽", "銘峰"]
    },

    //===== 結構元素 =====//
    // 前綴 (強化氣勢)
    prefix: ["THE", "ONE", "GRAND", "ROYAL", "PEAK", "MOUNT", "VISTA", "SKY", "CENTRAL", "UPPER", "LUXE", "ELITE", "PRESTIGE", "OLYMPIA", "PACIFIC", "OCEAN", "HARBOUR"],

    // 後綴 (建築類型/意境)
    suffix: {
        chinese: ["豪庭", "軒", "臺", "居", "灣", "莊", "邸", "峰", "庭", "苑", "閣", "山莊", "名門", "豪苑", "雅居", "御苑", "華庭", "名邸", "豪邸", "壹號", "府", "第", "殿", "匯", "坊", "岸", "滙", "薈", "都", "灣畔", "名鑄", "居庭", "庭園", "名第", "御府", "御殿", "尊邸", "名軒", "御園", "名庭", "御所"],
        english: ["Residence", "Villa", "Park", "Mansion", "Court", "Tower", "Place", "Crest", "Heights", "Garden", "Palace", "Cottage", "Manor", "View", "Horizon", "Peak", "Bay", "Hills", "Cove", "Terrace", "Gate", "Haven", "Rise", "Square", "Chateau", "Domain", "Quay", "Pinnacle", "Paragon", "Legacy", "Haven", "Oasis", "Enclave", "Vista", "Aura", "Elysium", "Eden", "Harmony", "Serenity"]
    },

    luckyNumbers: ["18", "28", "38", "88", "168", "888", "壹號", "1號", "III", "VIII", "88號", "ONE"],

    uncommon: ["嵐", "曦", "霽", "岫", "灝", "泓", "曄", "晞", "瑋", "璟", "瓏", "瑜", "璇", "瑢", "璘", "璨", "珺", "逸", "臻", "蘊", "睿", "熙", "綽", "胤", "暄"]
};

function generateName(style) {
    const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const getLayer = (category, layer) => getRandom(keywords[category][layer]);

    const firstUncommon = getRandom(keywords.uncommon)
    const secondUncommon =
        getRandom([getRandom(keywords.uncommon.filter((value) => value !== firstUncommon)), getRandom(keywords.suffix.chinese.filter(onlyOne))])
    const uncommonDouble = [firstUncommon, secondUncommon].join("")

    function getChineseDouble(firstArr, SecondArr) {
        const firstUncommon = getRandom(firstArr)
        const secondUncommon =
            getRandom(SecondArr.filter((value) => value !== firstUncommon))
        const result = [firstUncommon, secondUncommon].join("")
        return result;
    }

    let name = '';

    switch (style) {
        case 'luxury':
            name = [
                getRandom([getChineseDouble(keywords.luxury.single, keywords.luxury.single), getLayer("luxury", "single") + getLayer("natural", "single"), getLayer("natural", "double"), getLayer("luxury", "single")]),
                getRandom(keywords.suffix.chinese),
            ].join('');
            break;

        case 'international':
            name = [
                getRandom(keywords.prefix),
                getRandom(keywords.suffix.english)
            ].join(' ');
            break;
        case 'number':
            name = [
                getRandom([uncommonDouble, getChineseDouble(keywords.luxury.single, keywords.luxury.single), getLayer("luxury", "single") + getLayer("natural", "single"), getLayer("natural", "double")]),
                getRandom(keywords.luckyNumbers)
            ].join('');
            break;
        case 'uncommon':
            name = getRandom([uncommonDouble, uncommonDouble + "·" + getRandom(keywords.suffix.chinese.filter(onlyDouble))])
            break;
    }

    return name.replace(/\s+/g, ' ').trim(); // 清理多餘空格
}

function onlyOne(value) {
    return value.length === 1;
}

function onlyDouble(value) {
    return value.length === 2
}


function generateNames() {
    const style = document.getElementById('style-select').value;
    const results = document.getElementById('results');
    results.innerHTML = '';

    for (let i = 0; i < 5; i++) {
        let name = '';
        name = generateName(style);

        const card = document.createElement('div');
        card.className = 'name-card';
        card.innerHTML = `
                    <p class="name-text">${name}</p>
                    <p class="name-style">${getStyleLabel(style)}</p>
                `;
        card.addEventListener('click', () => copyToClipboard(name));
        results.appendChild(card);
    }
}

function getStyleLabel(style) {
    const labels = {
        luxury: '🏰 奢華尊貴系列',
        international: '🌍 國際風尚系列',
        number: '🔢 數字系列',
        uncommon: '生僻字系列',
    };
    return labels[style] || '';
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    showCopyNotice();
}

function showCopyNotice() {
    const notice = document.getElementById('copyNotice');
    notice.style.opacity = '1';
    setTimeout(() => notice.style.opacity = '0', 2000);
}


document.getElementById("generate").addEventListener("click", generateNames);