const puppeteer = require("puppeteer");
const { readFileSync } = require("fs");
const { resolve } = require("path");
class Skeleton {
  constructor(options) {
    this.options = options;
  }
  // 创建无头浏览器的配置
  async initialize() {
    this.browser = await puppeteer.launch({ headless: false });
  }
  async newPage() {
    let page = await this.browser.newPage();
    return page;
  }
  async genHTML() {
    let page = await this.newPage();
    // 打开一个无头浏览器，地址与node服务启动的地址一样
    let response = await page.goto(`${this.options.origin}/index.html`, {
      waitUntil: "networkidle2",
    });
    if (response && response._status == "200") {
      await this.makeSkeleton(page);
      const { style, html } = await page.evaluate(() =>
        skeleton.getHtmlAndStyle()
      );
      const result = `
        <style>${style.join()}</style>
        ${html}
      `;
      // 重写dist下的index.html文件
      let htmlContent = readFileSync(
        resolve(__dirname, "../dist/index.html"),
        "utf8"
      );
      // 提前在pubilc下的index.html文件中写上<!--shell-->用于元素替换
      htmlContent = htmlContent.replace('<!--shell-->', result);
      return htmlContent;
    }
  }
  async makeSkeleton(page) {
    // 先读取脚本内容
    let scriptContent = await readFileSync(
      resolve(__dirname, "../skeletonScript/index.js"),
      "utf8"
    );
    // 通过addScriptTag方法向页面里注入这个脚本，将skeleton方法注入到window上
    await page.addScriptTag({ content: scriptContent });
    page.evaluate((options) => {
      // 对dom元素进行操作
      skeleton.genSkeleton(options);
    },this.options);
  }
  // 销毁无头浏览器
  async destroy() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}
module.exports = Skeleton;
