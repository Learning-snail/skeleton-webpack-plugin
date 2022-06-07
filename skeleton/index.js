const puppeteer = require("puppeteer");
const { readFileSync } = require("fs")
const {resolve} = require('path')
class Skeleton {
  constructor() {}
  async initialize() {
    this.browser = await puppeteer.launch({ headless: false });
  }
  async newPage() {
    let page = await this.browser.newPage();
    return page;
  }
  async genHTML() {
    let page = await this.newPage();
    let response = await page.goto("http://localhost:8081", {
      waitUntil: "networkidle2",
    });
    if (response && response._status == "200") {
        this.makeSkeleton(page);
    }
  }
  async makeSkeleton(page) {
       // 先读取脚本内容
       let scriptContent = await readFileSync(resolve(__dirname, '../skeletonScript/index.js'), 'utf8');
       // 通过addScriptTag方法向页面里注入这个脚本
       await page.addScriptTag({ content: scriptContent });
  }
  async destroy() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}
module.exports = Skeleton;
