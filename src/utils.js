
const COM_COLOR = '#959BA3'
const HIGHTLIGHT_COLOR = '#FF4D4D'
const DIV_WIDTH = '200px'
const DIV_FONTSIZE = '12px'



/**
 * 只匹配一次
 * @param {*} text 
 * @param {*} keyword 
 */
export const getMatchedList = (text, keyword) => {
    let reg = new RegExp('([\\s\\S]{0,}?)(' + keyword +')([\\s\\S]{0,})')
    return text.match(reg)
}



/**
 * 文本是否超出限定宽度
 * @param {string} text 文本
 * @param {function} cb 回调函数
 */
export const isOverflowText = (text) => {
     // 判断整行文字是否可以全部显示
     let el = document.createElement("div")
     el.style = `position:fixed;z-index:-99;left:-1000px;overflow:auto;white-space: nowrap;`;
     el.style.width = DIV_WIDTH;
     el.style.fontSize = DIV_FONTSIZE;
     document.body.appendChild(el);
     el.innerText = text;
     if (el.scrollWidth == el.offsetWidth) {
       // 如果可以容纳所有字符串，直接返回
       document.body.removeChild(el);
       return false
     }

     document.body.removeChild(el);
     return true
}



export const getHighlightList = (text = '', keyword = '', label = '', comC = COM_COLOR, hlc = HIGHTLIGHT_COLOR ) =>{
    let list = [], isMatched = false

    let data = getMatchedList(text, keyword)

    if(data && keyword){
        isMatched = true
        let before = data[1], len1 = before.length
        let match = data[2], len2 = match.length
        let after = data[3], len3 = after.length
    
        // 判断整行文字是否可以全部显示
        let isOverflow = isOverflowText(text)

        if(!isOverflow){
            list =  [
                {
                text:before,
                color: comC
                },
                {
                text:match,
                color: hlc
                },
                {
                text:after,
                color: comC
                }
            ]
        }else{
            if(len1 <= 5){
                list = [
                  {
                    text:before,
                    color: comC
                  },
                  {
                    text:match,
                    color: hlc
                  },
                  {
                    text:after,
                    color: comC
                  }
                ]
              }else if( len3 <= 5   ){
                list = [
                  {
                    text:text.substr(0,3) + '...',
                    color: comC
                  },
                  {
                    text:match,
                    color: hlc
                  },
                  {
                    text:after.substr(0, 5-len3),
                    color: comC
                  },
                ]
              }else {
                list = [
                  {
                    text:text.substr(0,3) + '...',
                    color: comC
                  },
                  {
                    text:match,
                    color: hlc
                  },
                  {
                    text:after,
                    color: comC
                  }
                ]
              }
        }
    
        
    }else{
        list = [
            {
            text:text,
            color: comC
            }
        ]
    }
    
    return {
        isMatched,
        list
    }

}

/**
 * 该方法使用逐个匹配塞取字段的方法， 作为一种思路进行参考
 * @param {*} source 
 * @param {*} el 
 */
export const getMarkHtml = (source, el) => {
    // 获取标红的html
    let mark = this.searchTxt,
      result = "",
      index = source.indexOf(mark);
    const getTruncateTxt = (str, mark, style) => {
      let el = document.createElement("div"),
        markLength = mark.length;
      el.style = `position:fixed;z-index:-99;left:-1000px;overflow:auto;`;
      el.style.width = style.width;
      el.style.fontSize = style.fontSize;
      document.body.appendChild(el);
      el.innerHtml = str;
      if (el.scrollWidth == el.offsetWidth) {
        // 如果可以容纳所有字符串，直接返回
        return str;
      }
      let index = str.indexOf(mark);
      if (index == -1) {
        // 如果不包含搜索的字符串，直接返回
        return str;
      }
      let text = "",
        exceedIndex = 0;
      // 在头尾加字，直到溢出。不可能存在加完都不溢出的情况，之前已有判断
      for (; ; exceedIndex++) {
        let startIndex = Math.max(index - exceedIndex, 0);
        text =
          str.slice(startIndex, index) +
          mark +
          str.substr(index + markLength, exceedIndex + 1); // 先从后面开始添加字
        el.innerHtml = text;
        if (el.scrollWidth > el.offsetWidth) {
          break;
        }
      }
      // 逐个减少加的字，直到可以容纳
      for (; exceedIndex >= 0; exceedIndex--) {
        let startIndex = Math.max(index - exceedIndex, 0);
        text = `...${str.slice(startIndex, index) +
        mark +
        str.substr(index + markLength, exceedIndex)}...`;
        el.innerHtml = text;
        if (el.scrollWidth == el.offsetWidth) {
          return text.slice(0, -3);
        }
      }
      document.body.removeChild(el);
      // 如果只加...都会溢出
      return `...${mark}`;
    };
    const wrapText = (text, mark) => {
      let index = text.indexOf(mark);
      return (
        text.slice(0, index) +
        `<span style="color:#ff4b55;">${mark}</span>` +
        text.slice(index + mark.length)
      );
    };
    let truncateTxt = getTruncateTxt(
      source,
      mark,
      window.getComputedStyle(el)
    );
    return wrapText(truncateTxt, mark);
  }