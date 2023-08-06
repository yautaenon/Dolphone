window_5209hbf298hew9jfiowg_Dolpthone_version = "1.1.0";
var window_b9012ye1by98ryn98dy1_Dolpthone_BranchID;
var dolphoneJS, dolphoneCSS, dolphoneIndicator;
$.getJSON("https://script.google.com/macros/s/AKfycbyQVJL5Uj3pqJLGSGJTctONz4OIN5xVi_1DLFOy8Qe-n4nt8dSq84laKWZf3Ey4iUKM/exec?id=" + ProductKey, (data) => {
  dolphoneJS = data.url;
  dolphoneCSS = data.css;
  dolphoneIndicator = data.indicator;
  window_5209hbf298hew9jfiowg_Dolpthone_patch = data.version;
  // if (window_b9012ye1by98ryn98dy1_Dolpthone_BranchID === undefined) window_b9012ye1by98ryn98dy1_Dolpthone_BranchID = "1114918";
  window_ony98gvayn9fj8hg98ha_Dolpthone_versionType = "_Beta";
  // main script
  subsound = new Audio("https://aika-toki.github.io/others/library/NotiSound/003_1s.wav");
  notifsound = new Audio("https://aika-toki.github.io/others/library/NotiSound/002_3s.wav");
  patchsound = new Audio("https://aika-toki.github.io/others/library/NotiSound/001_2s.wav");
  alertsound = new Audio("https://raw.githubusercontent.com/yautaenon/Dolphone/main/Dolphone/alert_2315_002.wav");
  startup();
  setTimeout(() => {
    subscribe();
    styleChecker();
    if (!document.querySelector("iframe")) {
      next();
    }
  }, 1000);
});
function subscribe() {
  mainalert("Trying to subscribe.");
  subsound.load();
  subsound.volume = 0.2;
  if (document.querySelector("#modal-inner-iframe")) {
    let inneriframeObserver = new MutationObserver((_mutations) => {
      // console.log(_mutations[0]);
      libalert("InnerIframeObserver", "Successfully detected. {Attributes:0}");
      setTimeout(() => {
        inneriframeObserver.disconnect();
        // if (
        //   window.top.document
        //     .querySelector("#modal-inner-iframe")
        //     .contentDocument.querySelector("#video-player")
        // ) {
        // let video = window.top.document
        //   .querySelector("#modal-inner-iframe")
        //   .contentDocument.querySelector("#video-player");
        // video.addEventListener("ended", done);
        // videochecker(0);
        subsound.play();
        // }
      }, 800);
    });
    inneriframeObserver.observe(document.querySelector("#modal-inner-iframe"), {
      attributes: true,
    });
  } else {
    let modalObserver = new MutationObserver((mutations) => {
      let inneriframeObserver = new MutationObserver((_mutations) => {
        // console.log(_mutations[0]);
        libalert("InnerIframeObserver", "Successfully detected. {Attributes:1}");
        setTimeout(() => {
          inneriframeObserver.disconnect();
          // let video = window.top.document
          //   .querySelector("#modal-inner-iframe")
          //   .contentDocument.querySelector("#video-player");
          // video.addEventListener("ended", done);
          // videochecker(1);
          subsound.play();
        }, 800);
      });
      // console.log(mutations[0]);
      libalert("AppModalObserver", "Successfully detected.");
      inneriframeObserver.observe(document.querySelector("#modal-inner-iframe"), {
        attributes: true,
      });
    });
    modalObserver.observe(document.querySelector('div[data-react-class="App.Modal"]'), {
      childList: true,
    });
  }
}
function styleChecker() {
  let proc = setInterval(() => {
    // if (!window.top.document.querySelector("iframe")) return;
    let element = window.top.document.querySelector("iframe").contentDocument;
    element.querySelector("link#renewedStyle") || styleApply(element);
    let iniframe = Array.from(element.querySelectorAll("iframe"));
    if (iniframe)
      iniframe.forEach((e) => {
        e.contentDocument.querySelector("link#renewedStyle") || styleApply(e.contentDocument);
      });
  }, 1000);
  libalert("StyleChecker", `Process started and observing nodes. id: ${proc}`);
  return proc;
}
function styleApply(element) {
  let renewedStyle = document.createElement("link");
  renewedStyle.rel = "stylesheet";
  renewedStyle.href = dolphoneCSS;
  renewedStyle.id = "renewedStyle";
  element.head.appendChild(renewedStyle);
}
function videochecker(fromid) {
  setTimeout(() => {
    // styleApply();
    let selectedItemType = Array.from(document.querySelector("a.is-selected").parentElement.classList);
    selectedItemType.includes("good") ? selectedItemType.splice(selectedItemType.indexOf("good")) : selectedItemType;
    selectedItemType = selectedItemType[0];
    libalert("SelectedTypeDetecter", 'Selected Item Type is: "' + selectedItemType + '".');
    if (selectedItemType == "movie") {
      let process = setInterval(() => {
        let video = window.top.document.querySelector("iframe").contentDocument.querySelector("#video-player");
        // console.log(video.currentTime + "/" + video.duration);
        if (video.duration <= video.currentTime) {
          done();
          libalertimportant("VideoDurationChecker", "process ended.");
          clearInterval(process);
        }
      }, 200);
      setTimeout(() => {
        let video = window.top.document.querySelector("iframe").contentDocument.querySelector("#video-player");
        if (video.paused) {
          video.play();
        }
      }, 5000);
      libalertimportant("VideoDurationChecker", "process started. by process " + fromid);
    }
  }, 100);
}
function done() {
  // console.log("DONE!");
  mainalert("Content ended.");
  setTimeout(() => {
    next();
    // console.log("Next");
  }, 1000);
  let sub = setTimeout(() => {
    reinject();
    // subscribe();
    mainalert("Subscribe");
    clearTimeout(sub);
  }, 10000);
}
function next() {
  mainalert("Trying to access next content.");
  const caps = window.top.document.getElementsByClassName("u-list")[0].getElementsByTagName("li");
  let lastIndex = 0;
  for (const item in caps) {
    const cl = caps[item].classList;
    if (!cl.contains("good")) {
      if (cl.contains("movie") && !cl.contains("supplement")) {
        break;
      } else if (cl.contains("evaluation-test") || cl.contains("essay-test")) {
        notifsound.load();
        notifsound.volume = 0.2;
        notifsound.play();
        notifsound.addEventListener("ended", () => {
          notifsound = "";
        });
        break;
      }
    }
    lastIndex += 1;
  }
  let beforeLastIndex = lastIndex != 0 ? lastIndex - 1 : 0;
  caps[lastIndex].querySelector("a").click();
  setTimeout(() => {
    caps[beforeLastIndex].querySelector("a").scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    indicatorUpdate();
  }, 3000);
}
function startup() {
  if (!document.body.classList.contains("izialready")) {
    let swalsc = window.top.document.createElement("script");
    swalsc.src = "//aika-toki.github.io/others/library/iziToast/iziToast.min.js";
    swalsc.id = "iziToastScript";
    window.top.document.querySelector("script#di").before(swalsc);
    let swalst = document.createElement("link");
    swalst.rel = "stylesheet";
    swalst.href = "//aika-toki.github.io/others/library/iziToast/iziToast.min.css";
    swalst.id = "iziToastStyle";
    window.top.document.head.appendChild(swalst);
    let indicatorStyle = document.createElement("link");
    indicatorStyle.rel = "stylesheet";
    indicatorStyle.href = dolphoneIndicator;
    indicatorStyle.id = "indicatorStyle";
    window.top.document.head.appendChild(indicatorStyle);
    let renewedStyle = document.createElement("link");
    renewedStyle.rel = "stylesheet";
    renewedStyle.href = dolphoneCSS;
    renewedStyle.id = "renewedStyle";
    window.top.document.head.appendChild(renewedStyle);
    document.body.classList.add("izialready");
  }
  let version = window_5209hbf298hew9jfiowg_Dolpthone_version;
  let re = document.querySelector("script#di").className == "reinjected" ? "re" : "";
  //console.log("\u001b[33m[Dolpthone]Ver." + version + " " + re + "loaded.");
  if (re == "re") {
    mainalert("reinjected.");
  }
  patchsound.load();
  patchsound.volume = 0.2;
  if (window.top.document.querySelector("script#di").className == "") {
    setTimeout(() => {
      patchsound.play();
      window.top.veralart(version, window_5209hbf298hew9jfiowg_Dolpthone_patch, re);
      window.top.indicatorsetup();
    }, 1000);
  }
}
function calculateFontColor(colorstr) {
  const bgColor = {
    red: parseInt(colorstr.substr(0, 2), 16),
    green: parseInt(colorstr.substr(2, 2), 16),
    blue: parseInt(colorstr.substr(4, 2), 16),
  };

  const getRGBForCalculateLuminance = (_color) => {
    const color = _color / 255;
    if (color <= 0.03928) {
      return color / 12.92;
    } else {
      return Math.pow((color + 0.055) / 1.055, 2.4);
    }
  };

  const getRelativeLuminance = (color) => {
    const { red, green, blue } = color;
    let R = getRGBForCalculateLuminance(red);
    let G = getRGBForCalculateLuminance(green);
    let B = getRGBForCalculateLuminance(blue);
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  };

  const getContrastRatio = (color1, color2) => {
    const luminance1 = getRelativeLuminance(color1);
    const luminance2 = getRelativeLuminance(color2);
    const bright = Math.max(luminance1, luminance2);
    const dark = Math.min(luminance1, luminance2);
    return (bright + 0.05) / (dark + 0.05);
  };

  const getFontColor = (color) => {
    const BLACK = { red: 0, green: 0, blue: 0 };
    const WHITE = { red: 255, green: 255, blue: 255 };
    const whiteRatio = getContrastRatio(color, WHITE);
    const blackRatio = getContrastRatio(color, BLACK);
    return whiteRatio > blackRatio ? WHITE : BLACK;
  };

  const toHexColor = ({ red, green, blue }) => [`0${Number(red).toString(16)}`.slice(-2), `0${Number(green).toString(16)}`.slice(-2), `0${Number(blue).toString(16)}`.slice(-2)].join("");
  const fontColor = getFontColor(bgColor);

  return toHexColor(fontColor);
}
function calculateAverageColor(color1, color2) {
  color1 = [parseInt(color1.substr(0, 2), 16), parseInt(color1.substr(2, 2), 16), parseInt(color1.substr(4, 2), 16)];
  color2 = [parseInt(color2.substr(0, 2), 16), parseInt(color2.substr(2, 2), 16), parseInt(color2.substr(4, 2), 16)];
  let result = [];
  for (let i = 0; i < 3; i++) {
    result.push(
      Number(Math.round((color1[i] + color2[i]) / 2))
        .toString(16)
        .padStart(2, "0")
    );
  }
  return result.join("");
}
function veralart(version, patch, re) {
  let version_sentense = `version ${version}-%c${patch.substr(0, 3)}%c${patch.substr(3, 1)}%c${patch.substr(4, 3)}%c has ${re}applied.`;
  let toast_sentense = `version ${version}-${patch.substr(0, 3)}${patch.substr(3, 1)}${patch.substr(4, 3)} has ${re}applied.`;
  let version_color = [patch.substr(0, 6), patch.substr(1, 6)];
  version_color.push(calculateAverageColor(version_color[0], version_color[1]));
  let version_content_color = [calculateFontColor(version_color[0]), calculateFontColor(version_color[1]), calculateFontColor(version_color[2])];
  iziToast.show({
    position: "bottomRight",
    title: "Dolphone",
    message: toast_sentense,
    timeout: 5000,
    messageColor: "#00c541",
  });
  console.debug(
    "%cDolphone%c " + version_sentense,
    "color:#000;background-image:linear-gradient(90deg,#00c541,#4f73e3,#e3734f);padding:2px 4px;border-radius:4px;",
    "",
    `color:#${version_content_color[0]};background-color:#${version_color[0]};padding:2px 0 2px 4px;border-radius:10px 0 0 10px;`,
    `color: #${version_content_color[2]})};background-image: linear-gradient(90deg,#${version_color[0]},#${version_color[2]},#${version_color[1]});padding: 2px 0 2px 0;`,
    `color:#${version_content_color[1]};background-color:#${version_color[1]};padding:2px 4px 2px 0;border-radius:0 10px 10px 0;`,
    ""
  );
}
function libalert(procn, msg) {
  iziToast.show({
    position: "bottomRight",
    title: "DolphoneLib - " + procn,
    message: msg,
    timeout: 1000,
    messageColor: "#4f73e3",
  });
  console.debug("%cDolphoneLib - " + procn + "%c " + msg, "color:#000;background-color:#4f73e3;padding:2px 4px;border-radius:4px;", "");
  // console.log(`[DolphoneLib - ${procn}] ${msg}`);
}
function libalertimportant(procn, msg) {
  iziToast.show({
    position: "topRight",
    title: "DolphoneLib - " + procn,
    message: msg,
    timeout: 20000,
    messageColor: "#e3734f",
  });
  console.debug("%cDolphoneLib - " + procn + "%c " + msg, "color:#000;background-color:#e3734f;padding:2px 4px;border-radius:4px;", "");
  // console.log(`[DolphoneLib - ${procn}] ${msg}`);
}
function mainalert(msg) {
  iziToast.show({
    position: "bottomRight",
    title: "Dolphone",
    message: msg,
    timeout: 1000,
    messageColor: "#00c541",
  });
  // console.log(`[Dolphone] ${msg}`);
  console.debug("%cDolphone%c " + msg, "color:#000;background-color:#00c541;padding:2px 4px;border-radius:4px;", "");
}
function reinject() {
  let p = document.querySelector("script#di");
  if (p != null) {
    document.querySelector("script#di").remove();
  }
  let e = document.createElement("script");
  e.src = dolphoneJS;
  e.id = "di";
  e.className = "reinjected";
  window.top.document.head.appendChild(e);
}
function indicatorsetup() {
  setTimeout(() => {
    let indic = setInterval(() => {
      let listel = document.querySelectorAll("li"),
        nowel = null;
      for (let i = 0; i < listel.length; i++) {
        let lcls = listel[i].classList;
        if (lcls.contains("movie")) {
          if (listel[i].querySelector("a").classList.contains("is-selected")) {
            nowel = i;
          }
        }
      }
      if (nowel !== null) {
        nowel = listel[nowel];
        //nowel.style.background = `linear-gradient(90deg, #ddd 0%,#ddd 100%)`
        movieel = document.querySelector("iframe").contentDocument.querySelector("video");
        let percent = Math.round((movieel.currentTime / movieel.duration) * 1000) / 10;
        nowel.querySelector("a").style.setProperty("--movie-progress", `${percent}%`);
        //nowel.style.background = `linear-gradient(90deg, #9fb 0%, #9fb ${percent}%,#ffffff ${percent}%,#ffffff 100%)`;
        //   document
        //     .querySelector(".progress-circle-color")
        //     .setAttribute("stroke-dashoffset", String(100 - percent));
      }
    }, 20);
    libalert("Indicator", `Process started; id: ${indic}`);
  }, 10000);
}
function indicatorUpdate() {
  let listel = document.querySelectorAll("li");
  if (document.querySelector("div.u-card.has-no-padding").querySelector(".u-filter")) {
    if (!document.querySelector("#sections-contents > div.l-column-common.section > div.u-card.has-no-padding > div.u-filter > div > div:nth-child(1)").classList.contains("u-filter-active")) {
      document.querySelector("#sections-contents > div.l-column-common.section > div.u-card.has-no-padding > div.u-filter > div > div:nth-child(1)").click();
    }
  }
  for (let i = 0; i < listel.length; i++) {
    let lcls = listel[i].classList;
    if (lcls.contains("movie")) {
      if (lcls.contains("good")) {
        //listel[i].style.backgroundColor = "#9fb";
      }
    } else if (lcls.contains("evaluation-test") || lcls.contains("essay-test")) {
      if (lcls.contains("good")) {
        // listel[i].style.background = "#adbdeb";
      }
      if (listel[i].querySelector("a").classList.contains("is-selected")) {
        listel[i].classList.add("now");
        alertsound.load();
        alertsound.loop = true;
        alertsound.volume = 0.2;
        alertsound.play();
        let alertnot = setInterval(() => {
          alertsound.volume = 0.2;
        }, 1000);
        finishChecker(i, alertnot, alertsound);
      }
    }
  }
  setTimeout(videochecker(2), 2000);
  libalert("Indicator", "Indicator Updated.");
}
function finishChecker(pos, indiid, alert) {
  let renewedStyle = document.createElement("link");
  renewedStyle.rel = "stylesheet";
  renewedStyle.href = dolphoneCSS;
  renewedStyle.id = "renewedStyle";
  window.top.document.querySelector("#modal-inner-iframe").contentDocument.head.appendChild(renewedStyle);
  let listel = document.querySelectorAll("li")[pos];
  let checker = setInterval(() => {
    if (listel.classList.contains("good")) {
      clearInterval(indiid);
      clearInterval(checker);
      libalert("TestCorrectChecker", "process ended.");
      if (listel.classList.contains("now")) listel.classList.remove("now");
      alert.loop = false;
      setTimeout(() => {
        done();
      }, 5000);
    }
  }, 500);
  libalert("TestCorrectChecker", "process started.");
}
