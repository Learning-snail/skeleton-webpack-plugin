window.skeleton = (function () {
  const SMALLEST_BASE64 =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  const CLASS_NAME_PREFIX = "sk-";
  const $$ = document.querySelectorAll.bind(document);
  const REMOVE_TAGS = ["title", "meta", "script"];
  const Font_TAGS = ["p", "h1", "h2", "h3", "h4", "a"];
  const styleCache = new Map();
  let buttonList = [];
  let imgList = [];
  let fontList = [];
  function addButtonClass(element) {
    const className = CLASS_NAME_PREFIX + "button"; // sk-button
    const rule = `{
          color:#EFEFEF !important;
          background:#EFEFEF !important;
          border:none !important;
          box-shadow:none !important;
      }`;
    element.classList.add(className);
    addStyle('.'+className, rule);
  }
  function addImgClass(element) {
    const className = CLASS_NAME_PREFIX + "img"; // sk-img
    const { width, height } = element.getBoundingClientRect();
    const attr = {
      width,
      height,
      src: SMALLEST_BASE64,
    };
    const rule = `{
          background:#EFEFEF !important;
      }`;
    element.classList.add(className);
    addStyle('.'+className, rule);
    setAttrHandle(element, attr);
  }
  function addFontClass(element) {
    const className = CLASS_NAME_PREFIX + "font"; // sk-button
    const { height } = element.getBoundingClientRect();
    const rule = `{
        height:${height}px;
        background:#EFEFEF;
    }`;
    element.textContent = "";
    element.classList.add(className);
    addStyle('.'+className, rule);
  }
  function setAttrHandle(element, attr) {
    Object.keys(attr).forEach((item) => {
      element.setAttribute(item, attr[item]);
    });
  }
  function addStyle(selector, rule) {
    if (!styleCache.has(selector)) {
      //一个类名sk-button只会在缓存中出现一次
      styleCache.set(selector, rule);
    }
  }
  function genSkeleton() {
    const rootElement = document.documentElement;
    (function traverse(element) {
      if (element.children) {
        Array.from(element.children).forEach((item) => {
          traverse(item);
        });
      }
      const elementName = element.tagName;
      if (elementName.toLowerCase() == "button") {
        buttonList.push(element);
      }
      if (elementName.toLowerCase() == "img") {
        imgList.push(element);
      }
      if (Font_TAGS.includes(elementName.toLowerCase())) {
        fontList.push(element);
      }
    })(rootElement);
    buttonList.forEach((item) => {
      addButtonClass(item);
    });
    imgList.forEach((item) => {
      addImgClass(item);
    });
    fontList.forEach((item) => {
      addFontClass(item);
    });
    let style = ''
    for (const [name, rule] of styleCache) {
        style +=`${name} ${rule}\n`
    }
    const styleElement = document.createElement('style')
    styleElement.innerHTML = style
    $$('head')[0].appendChild(styleElement)
  }
  function getHtmlAndStyle() {
    Array.from($$(REMOVE_TAGS.join(','))).forEach(item => {
        item.parentNode.removeChild(item)
    })
    const style = Array.from($$('style')).map(item => {
        return item.innerHTML || item.innerText
    })
    const html = $$('body')[0].innerHTML
    return {html,style}
  }
  // function replaceDom(id,htmlContent) {
  //   const dom = document.getElementById(id)
  //   dom.parentNode.replaceChild(htmlContent,dom)
  // }
  return { genSkeleton, getHtmlAndStyle };
})();
