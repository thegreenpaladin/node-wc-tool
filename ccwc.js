import { argv } from "process";
import fs from "fs";
import readline from "readline";

class ccwc {
  constructor() {
    this.args = argv.slice(2);
    this.fs = fs;
  }

  getByteCount(files) {
    if (files.length < 1) {
      let byteCount = 0;
      let stream = "";

      process.stdin.setEncoding("utf8");
      process.stdin.on("data", (res) => {
        stream += res;
      });

      process.stdin.on("end", () => {
        byteCount = Buffer.byteLength(stream, "utf8");
        console.log(`${byteCount}`);
      });
    }

    for (let file of files) {
      if (!this.fs.existsSync(file)) {
        console.log(`${file}: No such file or directory`);
        process.exit(1);
      }

      let fileBytes = this.fs.statSync(file).size;
      console.log(`${fileBytes} ${file}`);
    }
    if (files.length > 1) {
      console.log(`${totalBytes} bytes total`);
    }
  }

  getLineCount(files) {
    if (files.length < 1) {
      let lineCount = 0;
      let stream = "";

      process.stdin.setEncoding("utf8");
      process.stdin.on("data", (res) => {
        stream += res;
      });

      process.stdin.on("end", () => {
        lineCount = stream.split(/\r\n|\r|\n/).length;
        console.log(`${lineCount}`);
      });
    }

    for (let file of files) {
      if (!this.fs.existsSync(file)) {
        console.log(`${file}: No such file or directory`);
        process.exit(1);
      }

      let fileLines = this.fs
        .readFileSync(file, "utf8")
        .split(/\n|\r\n/).length;
      console.log(`${fileLines} ${file}`);
    }
    if (files.length > 1) {
      console.log(`${totalLines} lines total`);
    }
  }

  getWordCount(files) {
    if (files.length < 1) {
      let wordCount = 0;
      let stream = "";

      process.stdin.setEncoding("utf8");
      process.stdin.on("data", (res) => {
        stream += res;
      });
      process.stdin.on("end", () => {
        wordCount = stream.replace(/\s+\n/, "").split(" ").length;
        console.log(`${wordCount}`);
      });
    }
    for (let file of files) {
      if (!this.fs.existsSync(file)) {
        console.log(`${file}: No such file or directory`);
        process.exit(1);
      }

      let fileWords = this.fs.readFileSync(file, "utf8").split(/\s+/).length;
      console.log(`${fileWords} ${file}`);
    }
    if (files.length > 1) {
      console.log(`${totalWords} words total`);
    }
  }

  getCharCount(files) {
    if (files.length < 1) {
      let charCount = 0;
      let stream = "";

      process.stdin.setEncoding("utf8");
      process.stdin.on("data", (res) => {
        stream += res;
      });

      process.stdin.on("end", () => {
        charCount = stream.replace(/\s+\n/, "").length;
        console.log(`${charCount}`);
      });
    }
    for (let file of files) {
      if (!this.fs.existsSync(file)) {
        console.log(`${file}: No such file or directory`);
        process.exit(1);
      }

      let fileChars = this.fs.readFileSync(file, "utf8").split("").length;
      console.log(`${fileChars} ${file}`);
    }
    if (files.length > 1) {
      console.log(`${totalChars} chars total`);
    }
  }

  getDefaultCount(files) {
    // if (files.length < 1) { in case you want to support the standard input case with default option
    //   let totalBytes = 0;
    //   let totalLines = 0;
    //   let totalWords = 0;
    //   let stream = "";

    //   process.stdin.setEncoding("utf8");
    //   process.stdin.on("data", (res) => {
    //     stream += res;
    //   });

    //   process.stdin.on("end", () => {
    //     totalBytes = Buffer.byteLength(stream, "utf8");
    //     totalLines = stream.split(/\n|\r\n/).length;
    //     totalWords = stream.split(/\s+/).length;
    //     console.log(`${totalBytes} ${totalLines} ${totalWords} total`);
    //   });
    // }
    for (let file of files) {
      if (!this.fs.existsSync(file)) {
        console.log(`${file}: No such file or directory`);
        process.exit(1);
      }

      let fileBytes = this.fs.statSync(file).size;
      let fileLines = this.fs
        .readFileSync(file, "utf8")
        .split(/\n|\r\n/).length;
      let fileWords = this.fs.readFileSync(file, "utf8").split(/\s+/).length;
      console.log(`${fileBytes} ${fileLines} ${fileWords} ${file}`);
    }
    if (files.length > 1) {
      console.log(
        `${totalBytes} bytes ${totalLines} lines ${totalWords} words total`
      );
    }
  }
}

(() => {
  const ccwcObj = new ccwc();

  if (ccwcObj.args.length < 1) {
    console.error(
      "usage: ccwc <option> <filepaths> || ccwc <filepaths> || type <filepaths> | ccwc <options>"
    );
    process.exit(1);
  } else {
    switch (ccwcObj.args[0]) {
      case "-c":
        ccwcObj.getByteCount(ccwcObj.args.slice(1));
        break;
      case "-l":
        ccwcObj.getLineCount(ccwcObj.args.slice(1));
        break;
      case "-w":
        ccwcObj.getWordCount(ccwcObj.args.slice(1));
        break;
      case "-m":
        ccwcObj.getCharCount(ccwcObj.args.slice(1));
        break;
      default:
        ccwcObj.getDefaultCount(ccwcObj.args);
        break;
    }
  }
})();
