
DISLIKE_WEIGHT = 4
RATIO_MUL = 400

DECIMAL_PLACES_SHOWS = 3
FONT_SIZE = 5

INIT_TIMEOUT = 1_000 // in ms

function update_ratio(){
    like_btn = document.getElementById('segmented-like-button')
    dislike_btn = document.getElementById('segmented-dislike-button')
    views_elem = document.getElementById('info-container')
    join_btn = document.getElementById('sponsor-button')
    
    if(like_btn === null || dislike_btn === null || views_elem === null){
        setTimeout(update_ratio, INIT_TIMEOUT)
        return
    }

    dislike_num = dislike_btn.getElementsByClassName('cbox yt-spec-button-shape-next--button-text-content')
    dislike_num = dislike_num.item(0)
    if(dislike_num === null){
        // the other return dislikes addon has not loaded yet
        setTimeout(update_ratio, INIT_TIMEOUT)
        return
    }
    dislike_num = dislike_num.textContent
    dislike_num = shitnum_to_num(dislike_num)

    like_num = like_btn.getElementsByClassName('cbox yt-spec-button-shape-next--button-text-content')
    like_num = like_num.item(0).textContent
    like_num = shitnum_to_num(like_num)

    views = views_elem.textContent.trim().split(' ')[0]
    views = shitnum_to_num(views)

    ratio = like_num - (dislike_num * DISLIKE_WEIGHT)
    ratio *= RATIO_MUL
    ratio /= views // will be `RATIO_MUL` if every person liked it / disliked it
    ratio = ratio.toFixed(DECIMAL_PLACES_SHOWS);

    join_btn.innerHTML = '<font size=' + FONT_SIZE + '>' + ratio + '</font>'
}

function shitnum_to_num(num){
    if(num.endsWith('K')){
        mul = 1_000
        num = num.slice(0, -1)
    }else if(num.endsWith('M')){
        mul = 1_000_000
        num = num.slice(0, -1)
    }else{
        mul = 1
        // this will result in an error later on if there is an unhandled case
    }
    num = Number(num) * mul
    return num
}

update_ratio()
